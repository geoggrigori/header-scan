import { NextResponse } from "next/server";
import { evaluate } from "@/lib/checks";

export const runtime = "nodejs";

function normalize(input: string): URL | null {
  let raw = input.trim();
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const url = normalize(String(body?.url ?? ""));
  if (!url) {
    return NextResponse.json(
      { error: { code: "bad_request", message: "Informe uma URL valida." } },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; HeaderScan/1.0; +https://github.com/geoggrigori/header-scan)",
      },
    });

    const result = evaluate(res.headers, url.toString(), res.url || url.toString());
    return NextResponse.json({ data: result });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: {
          code: aborted ? "timeout" : "fetch_failed",
          message: aborted
            ? "A requisicao expirou (10s)."
            : "Nao foi possivel acessar a URL.",
        },
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
