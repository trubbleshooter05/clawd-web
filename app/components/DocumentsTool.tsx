"use client";

import { useEffect, useState } from "react";

type DocItem = {
  id: string;
  title: string;
  type: "report" | "output" | "note";
  createdAt: string;
};

const LS_KEY = "mission_docs_v1";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function DocumentsTool() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<DocItem["type"]>("output");
  const [docs, setDocs] = useState<DocItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setDocs(JSON.parse(raw));
      else {
        setDocs([
          { id: uid(), title: "Competitor Insights (auto)", type: "report", createdAt: new Date().toISOString() },
          { id: uid(), title: "Opportunity Scan Output (auto)", type: "output", createdAt: new Date().toISOString() },
        ]);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(docs));
    } catch {}
  }, [docs]);

  const addDoc = () => {
    const t = title.trim();
    if (!t) return;
    setDocs((prev) => [{ id: uid(), title: t, type, createdAt: new Date().toISOString() }, ...prev]);
    setTitle("");
    setType("output");
  };

  return (
    <section style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
      <h2 style={{ margin: 0 }}>Documents Tool</h2>
      <p style={{ marginTop: 8, color: "#6b7280" }}>
        Shows documents/outputs created by agents (local demo list).
      </p>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 10, minWidth: 260 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a document title"
        />
        <select
          style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 10 }}
          value={type}
          onChange={(e) => setType(e.target.value as DocItem["type"])}
        >
          <option value="output">Output</option>
          <option value="report">Report</option>
          <option value="note">Note</option>
        </select>
        <button
          onClick={addDoc}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", cursor: "pointer" }}
        >
          Add
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {docs.map((d) => (
          <div
            key={d.id}
            style={{
              padding: 12,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{d.title}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Type: {d.type} • Created: {new Date(d.createdAt).toLocaleString()}
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>(viewer hookup later)</div>
          </div>
        ))}
      </div>
    </section>
  );
}
