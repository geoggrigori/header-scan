# HeaderScan

A defensive-security tool that **analyzes a website's HTTP security headers**,
assigns a grade (A–F), and shows exactly how to fix what's missing.

Built with **Next.js 16, TypeScript and Tailwind CSS**. The scan runs in a
Node.js **route handler** (server-side fetch), so there are no CORS limitations.

## What it checks

| Header | Why it matters |
| ------ | -------------- |
| Strict-Transport-Security (HSTS) | Forces HTTPS; blocks downgrade attacks |
| Content-Security-Policy (CSP) | Mitigates XSS and injection |
| X-Content-Type-Options | Stops MIME sniffing |
| X-Frame-Options | Prevents clickjacking |
| Referrer-Policy | Limits referrer leakage |
| Permissions-Policy | Restricts powerful browser features |

Each present header contributes to a weighted score; the grade is derived from
the total. Missing headers come with a copy-ready recommended value.

## How it works

`POST /api/scan` with `{ "url": "example.com" }`:

1. Normalizes the URL (adds `https://` if needed, validates the scheme).
2. Fetches it server-side with a 10s timeout, following redirects.
3. Inspects the response headers and returns a graded report.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Notes

This is an educational, defensive tool — it only reads publicly returned
response headers of a URL you submit. It does not probe, scan ports, or send
any payloads.

## License

MIT
