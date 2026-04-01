import Link from "next/link";
import MissionHeader from "./components/MissionHeader";
import TaskTool from "./components/TaskTool";
import CalendarTool from "./components/CalendarTool";
import DocumentsTool from "./components/DocumentsTool";
import ContentCreationTool from "./components/ContentCreationTool";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <MissionHeader />
        <Link href="/architecture" style={{
          padding: '8px 16px',
          backgroundColor: '#8B5CF6',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          📐 Architecture
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 20,
        }}
      >
        <TaskTool />
        <CalendarTool />
        <DocumentsTool />
        <ContentCreationTool />
      </div>
    </main>
  );
}
