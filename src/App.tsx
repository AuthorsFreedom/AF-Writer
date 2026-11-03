import { useEffect, useState } from "react";
import { commands } from "./core/ipc/bindings";

export default function App() {
  const [coreStatus, setCoreStatus] = useState<string>(
    "Connecting to Rust core...",
  );
  const [theme, setTheme] = useState<"dark-academia" | "e-ink">(
    "dark-academia",
  );

  useEffect(() => {
    commands
      .pingCore("Studio Client Active")
      .then((res) => setCoreStatus(res))
      .catch((err) => setCoreStatus(`IPC Error: ${String(err)}`));
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark-academia" ? "e-ink" : "dark-academia";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface-base)",
        color: "var(--text-primary)",
      }}
      className="flex h-screen w-screen flex-col items-center justify-center p-8 transition-colors duration-200"
    >
      <div
        style={{
          backgroundColor: "var(--surface-raised)",
          borderColor: "var(--border-subtle)",
        }}
        className="w-full max-w-md rounded-xl border p-6 shadow-2xl"
      >
        <h1
          style={{ color: "var(--accent-brand)" }}
          className="mb-1 text-xl font-bold tracking-tight"
        >
          Narrative Studio & Worldbuilding
        </h1>
        <p
          style={{ color: "var(--text-muted)" }}
          className="mb-4 text-xs font-mono"
        >
          Phase 0: Foundations & Architecture Skeleton
        </p>

        <div
          style={{
            backgroundColor: "var(--surface-base)",
            borderColor: "var(--border-subtle)",
          }}
          className="mb-6 rounded-lg border p-3 font-mono text-sm"
        >
          <span
            style={{ color: "var(--text-muted)" }}
            className="block text-xs uppercase mb-1"
          >
            Rust Core IPC Bridge
          </span>
          {coreStatus}
        </div>

        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: "var(--button-bg)",
            borderColor: "var(--border-subtle)",
            color: "var(--text-primary)",
          }}
          className="w-full rounded-lg border px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:opacity-90 active:scale-[0.98]"
        >
          Switch Theme (Active: {theme})
        </button>
      </div>
    </div>
  );
}
