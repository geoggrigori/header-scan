"use client";

import { useEffect, useRef, useState } from "react";
import type { ScanResult } from "@/lib/checks";

const GRADE_COLOR: Record<string, string> = {
  A: "bg-emerald-500",
  B: "bg-emerald-500",
  C: "bg-amber-500",
  D: "bg-rose-500",
  F: "bg-rose-600",
};

export default function Page() {
  const [url, setUrl] = useState("github.com");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const ran = useRef(false);

  // Auto-escaneia um exemplo na primeira carga, pra demonstrar a ferramenta.
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    scan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function scan() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error?.message ?? "Scan failed.");
      else setResult(json.data);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <header className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-emerald-400">🛡️</span> HeaderScan
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Analyze a site&apos;s HTTP security headers, get a grade, and see exactly
          how to fix what&apos;s missing.
        </p>
      </header>

      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && scan()}
          placeholder="example.com"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
        />
        <button
          onClick={scan}
          disabled={loading}
          className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? "Scanning…" : "Scan"}
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-rose-800 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8">
          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div
              className={`grid h-16 w-16 place-items-center rounded-xl text-3xl font-black text-slate-950 ${
                GRADE_COLOR[result.grade]
              }`}
            >
              {result.grade}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium">{result.finalUrl}</p>
              <p className="text-sm text-slate-400">
                Score {result.score}/100 ·{" "}
                {result.checks.filter((c) => c.present).length}/
                {result.checks.length} headers present
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {result.checks.map((c) => (
              <li
                key={c.key}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <span className={c.present ? "text-emerald-400" : "text-rose-400"}>
                      {c.present ? "✓" : "✗"}
                    </span>
                    {c.label}
                  </span>
                  <span className="text-xs text-slate-500">+{c.weight}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{c.description}</p>
                {c.present ? (
                  <code className="mt-2 block overflow-x-auto rounded bg-slate-950 px-3 py-2 text-xs text-emerald-300">
                    {c.value}
                  </code>
                ) : (
                  <code className="mt-2 block overflow-x-auto rounded bg-slate-950 px-3 py-2 text-xs text-slate-400">
                    {c.recommendation}
                  </code>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="mt-12 text-center text-xs text-slate-600">
        Defensive security tool · built with Next.js &amp; TypeScript
      </footer>
    </main>
  );
}
