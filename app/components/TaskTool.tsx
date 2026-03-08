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

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function TaskTool() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const addTask = () => {
    const t = title.trim();
    if (!t) return;

    setTasks((prev) => [
      {
        id: uid(),
        title: t,
        createdAt: new Date().toISOString(),
        dueDate: dueDate || undefined,
        done: false,
      },
      ...prev,
    ]);

    setTitle("");
    setDueDate("");
  };

  const toggleDone = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    return { total, done, open: total - done };
  }, [tasks]);

  return (
    <section style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>Task Tool</h2>
        <div style={{ color: "#4b5563" }}>Total: {stats.total} • Open: {stats.open} • Done: {stats.done}</div>
      </header>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 10, minWidth: 260 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <input
          style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 10 }}
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          onClick={addTask}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
        >
          Add Task
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.length === 0 ? (
          <div style={{ color: "#6b7280" }}>No tasks yet.</div>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: 12,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontWeight: 600, textDecoration: t.done ? "line-through" : "none" }}>
                  {t.title}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Created: {new Date(t.createdAt).toLocaleString()}
                  {t.dueDate ? ` • Due: ${t.dueDate}` : ""}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => toggleDone(t.id)}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
                >
                  {t.done ? "Reopen" : "Done"}
                </button>
                <button
                  onClick={() => removeTask(t.id)}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
