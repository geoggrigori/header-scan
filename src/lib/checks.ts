export interface HeaderCheck {
  key: string;
  label: string;
  present: boolean;
  value: string | null;
  weight: number;
  description: string;
  recommendation: string;
}

export interface ScanResult {
  url: string;
  finalUrl: string;
  score: number;
  grade: string;
  checks: HeaderCheck[];
}

const DEFS = [
  {
    key: "strict-transport-security",
    label: "Strict-Transport-Security (HSTS)",
    weight: 25,
    description:
      "Forces browsers to use HTTPS, preventing protocol-downgrade and cookie-hijacking attacks.",
    recommendation:
      "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "content-security-policy",
    label: "Content-Security-Policy (CSP)",
    weight: 25,
    description:
      "Mitigates cross-site scripting (XSS) and data injection by controlling which resources may load.",
    recommendation: "Content-Security-Policy: default-src 'self'; object-src 'none'",
  },
  {
    key: "x-content-type-options",
    label: "X-Content-Type-Options",
    weight: 12,
    description:
      "Stops MIME-type sniffing, which can turn user uploads into executable content.",
    recommendation: "X-Content-Type-Options: nosniff",
  },
  {
    key: "x-frame-options",
    label: "X-Frame-Options",
    weight: 12,
    description:
      "Prevents clickjacking by disallowing the page from being embedded in a frame.",
    recommendation: "X-Frame-Options: DENY (or CSP frame-ancestors 'none')",
  },
  {
    key: "referrer-policy",
    label: "Referrer-Policy",
    weight: 13,
    description:
      "Limits how much referrer information leaks to other origins on navigation.",
    recommendation: "Referrer-Policy: strict-origin-when-cross-origin",
  },
  {
    key: "permissions-policy",
    label: "Permissions-Policy",
    weight: 13,
    description:
      "Restricts access to powerful browser features such as camera, microphone and geolocation.",
    recommendation: "Permissions-Policy: geolocation=(), camera=(), microphone=()",
  },
] as const;

function gradeFor(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function evaluate(
  headers: Headers,
  url: string,
  finalUrl: string,
): ScanResult {
  let score = 0;
  const checks: HeaderCheck[] = DEFS.map((def) => {
    const value = headers.get(def.key);
    const present = value !== null;
    if (present) score += def.weight;
    return {
      key: def.key,
      label: def.label,
      present,
      value,
      weight: def.weight,
      description: def.description,
      recommendation: def.recommendation,
    };
  });

  return { url, finalUrl, score, grade: gradeFor(score), checks };
}
