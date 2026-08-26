<!-- ══════════════════════════ TITLE ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="Header Scan"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-555555?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-1987F0?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-555555?style=for-the-badge" alt="Español"/></a>
</div>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="tailwind"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#about"><img src="https://img.shields.io/badge/▸_ABOUT-1987F0?style=for-the-badge" alt="about"/></a>
<a href="#what-it-checks"><img src="https://img.shields.io/badge/▸_WHAT_IT_CHECKS-000000?style=for-the-badge" alt="checks"/></a>
<a href="#how-it-works"><img src="https://img.shields.io/badge/▸_HOW_IT_WORKS-1987F0?style=for-the-badge" alt="howitworks"/></a>
<a href="#usage"><img src="https://img.shields.io/badge/▸_USAGE-000000?style=for-the-badge" alt="usage"/></a>
</div>

<br/>

> 🛡️ **Defensive tool.** It only reads the publicly returned response headers of a URL you submit — no port probing, no payloads sent.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="HeaderScan — security header analysis"/>
</div>

## About

**HeaderScan** analyzes a website's **HTTP security headers**, assigns a grade (A–F), and shows exactly how to fix what's missing. The scan runs in a Node.js **route handler** (server-side fetch), so there are no CORS limitations.

## What it checks

| Header | Why it matters |
|---|---|
| Strict-Transport-Security (HSTS) | Forces HTTPS; blocks downgrade attacks |
| Content-Security-Policy (CSP) | Mitigates XSS and injection |
| X-Content-Type-Options | Stops MIME sniffing |
| X-Frame-Options | Prevents clickjacking |
| Referrer-Policy | Limits referrer leakage |
| Permissions-Policy | Restricts powerful browser features |

Each present header contributes to a weighted score; the grade is derived from the total. Missing headers come with a copy-ready recommended value.

## How it works

`POST /api/scan` with `{ "url": "example.com" }`:

1. Normalizes the URL (adds `https://` if needed, validates the scheme).
2. Fetches it server-side with a 10s timeout, following redirects.
3. Inspects the response headers and returns a graded report.

## Usage

```bash
npm install
npm run dev      # http://localhost:3000
```

## License

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Built by <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
