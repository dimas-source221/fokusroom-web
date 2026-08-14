import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { DoorOpen, LayoutGrid, BookOpen, CheckSquare, CalendarDays, StickyNote } from "lucide-react";

import DashboardPage from "./pages/DashboardPage";
import KalenderPage from "./pages/KalenderPage";
import AkademikPage from "./pages/AkademikPage";
import CatatanPage from "./pages/CatatanPage";
import TodoPage from "./pages/TodoPage";
import NotificationToggle from "./components/NotificationToggle";

type TabKey = "dashboard" | "akademik" | "todo" | "kalender" | "catatan";

interface TabConfig {
  key: TabKey;
  label: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

const TABS: TabConfig[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid, component: DashboardPage },
  { key: "akademik", label: "Tracker Kuliah", icon: BookOpen, component: AkademikPage },
  { key: "todo", label: "To-Do", icon: CheckSquare, component: TodoPage },
  { key: "kalender", label: "Kalender", icon: CalendarDays, component: KalenderPage },
  { key: "catatan", label: "Catatan", icon: StickyNote, component: CatatanPage },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

  const ActivePage = TABS.find((tab) => tab.key === activeTab)?.component ?? DashboardPage;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar / bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 md:static md:w-56 md:h-[calc(100vh-1.5rem)] md:m-3">
        <div className="glass-card-solid flex md:flex-col justify-around md:justify-start gap-1 p-2 md:p-4">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex md:flex-row flex-col items-center gap-0.5 md:gap-3 px-3 py-2 rounded-xl text-xs md:text-sm transition-all
                  ${active ? "bg-focus-500 text-white shadow-soft" : "text-ink-700 hover:bg-white/60"}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <header className="sticky top-0 z-20 glass-card-solid mx-3 mt-3 md:mx-6 md:mt-4 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-focus-500 flex items-center justify-center">
              <DoorOpen size={18} className="text-white" />
            </div>
            <span className="font-display font-semibold text-lg text-ink-900">Fokusroom</span>
          </div>

          <NotificationToggle />
        </header>

        <main className="flex-1 p-3 md:p-6">
          <ActivePage />
        </main>
      </div>
    </div>
  );
}