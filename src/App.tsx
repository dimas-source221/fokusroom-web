import React, { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import KalenderPage from "./pages/KalenderPage";
import AkademikPage from "./pages/AkademikPage";
import CatatanPage from "./pages/CatatanPage";
import TodoPage from "./pages/TodoPage";
import NotificationToggle from "./components/NotificationToggle";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "kalender" | "akademik" | "catatan" | "todo">("dashboard");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif" }}>
      {/* Header & Navigasi */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "#1e293b", borderBottom: "1px solid #334155" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#38bdf8" }}>🎯 Fokusroom</h1>
        
        <nav style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setActiveTab("dashboard")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: activeTab === "dashboard" ? "#0284c7" : "#334155", color: "white", cursor: "pointer" }}>Dashboard</button>
          <button onClick={() => setActiveTab("kalender")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: activeTab === "kalender" ? "#0284c7" : "#334155", color: "white", cursor: "pointer" }}>Kalender</button>
          <button onClick={() => setActiveTab("akademik")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: activeTab === "akademik" ? "#0284c7" : "#334155", color: "white", cursor: "pointer" }}>Akademik</button>
          <button onClick={() => setActiveTab("catatan")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: activeTab === "catatan" ? "#0284c7" : "#334155", color: "white", cursor: "pointer" }}>Catatan</button>
          <button onClick={() => setActiveTab("todo")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: activeTab === "todo" ? "#0284c7" : "#334155", color: "white", cursor: "pointer" }}>To-Do</button>
        </nav>

        <NotificationToggle />
      </header>

      {/* Konten Utama Aplikasi */}
      <main style={{ padding: "2rem" }}>
        {activeTab === "dashboard" && <DashboardPage />}
        {activeTab === "kalender" && <KalenderPage />}
        {activeTab === "akademik" && <AkademikPage />}
        {activeTab === "catatan" && <CatatanPage />}
        {activeTab === "todo" && <TodoPage />}
      </main>
    </div>
  );
}