"use client";

import { useEffect, useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  createdAt: string;
  dueDate?: string;
  done: boolean;
};

const LS_KEY = "mission_tasks_v1";

export default function CalendarTool() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {}
    const onStorage = () => {
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) setTasks(JSON.parse(raw));
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const scheduled = useMemo(() => {
    const withDates = tasks
      .filter((t) => t.dueDate)
      .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : 1));
    return withDates;
  }, [tasks]);

  return (
    <section style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
      <h2 style={{ margin: 0 }}>Calendar Tool</h2>
      <p style={{ marginTop: 8, color: "#6b7280" }}>
        Shows tasks scheduled (based on due dates).
      </p>

      {scheduled.length === 0 ? (
        <div style={{ color: "#6b7280" }}>No scheduled tasks yet. Add due dates in Task Tool.</div>
      ) : (
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {scheduled.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: 12,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, textDecoration: t.done ? "line-through" : "none" }}>
                  {t.title}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Due: {t.dueDate} • Status: {t.done ? "Done" : "Open"}
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Created: {new Date(t.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
