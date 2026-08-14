import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end();
  }

  const now = new Date();
  const in30min = new Date(now.getTime() + 30 * 60 * 1000);

  const { data: agendas } = await supabaseAdmin
    .from("agendas")
    .select("id, user_id, title, event_date, event_time")
    .eq("is_notified", false)
    .eq("event_date", now.toISOString().slice(0, 10))
    .not("event_time", "is", null);

  if (!agendas?.length) return res.status(200).json({ checked: 0 });

  const due = agendas.filter((a) => {
    const eventDateTime = new Date(`${a.event_date}T${a.event_time}`);
    return eventDateTime >= now && eventDateTime <= in30min;
  });

  for (const agenda of due) {
    const { data: subs } = await supabaseAdmin
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth")
      .eq("user_id", agenda.user_id);

    if (subs?.length) {
      const payload = JSON.stringify({
        title: "Fokusroom — Pengingat Agenda",
        body: `${agenda.title} dimulai pukul ${agenda.event_time?.slice(0, 5)}`,
        url: "/kalender",
      });
      await Promise.allSettled(
        subs.map((s) =>
          webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload)
        )
      );
    }

    await supabaseAdmin.from("agendas").update({ is_notified: true }).eq("id", agenda.id);
  }

  res.status(200).json({ notified: due.length });
}