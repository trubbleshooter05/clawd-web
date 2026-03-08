"use client";

import { useEffect, useState } from "react";

type Draft = {
  id: string;
  title: string;
  body: string;
  status: "draft" | "ready" | "posted";
  createdAt: string;
};

const LS_KEY = "mission_drafts_v1";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function ContentCreationTool() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setDrafts(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(drafts));
    } catch {}
  }, [drafts]);

  const addDraft = () => {
    const t = title.trim();
    const b = body.trim();
    if (!t || !b) return;

    setDrafts((prev) => [
      { id: uid(), title: t, body: b, status: "draft", createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setTitle("");
    setBody("");
  };

  const setStatus = (id: string, status: Draft["status"]) => {
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  return (
    <section style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
      <h2 style={{ margin: 0 }}>Content Creation Tool</h2>
      <p style={{ marginTop: 8, color: "#6b7280" }}>
        Create and manage content after completing tasks.
      </p>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 10 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Content title"
        />
        <textarea
          style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 10, minHeight: 90 }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your draft..."
        />
        <div>
          <button
            onClick={addDraft}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
          >
            Save Draft
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {drafts.length === 0 ? (
          <div style={{ color: "#6b7280" }}>No drafts yet.</div>
        ) : (
          drafts.map((d) => (
            <div
              key={d.id}
              style={{
                padding: 12,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Status: {d.status} • Created: {new Date(d.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setStatus(d.id, "draft")}
                    style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => setStatus(d.id, "ready")}
                    style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
                  >
                    Ready
                  </button>
                  <button
                    onClick={() => setStatus(d.id, "posted")}
                    style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
                  >
                    Posted
                  </button>
                </div>
              </div>
              <div style={{ whiteSpace: "pre-wrap", color: "#111827" }}>{d.body}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
