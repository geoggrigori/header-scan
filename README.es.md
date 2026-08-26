<!-- ══════════════════════════ PORTADA ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="Header Scan"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-555555?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-1987F0?style=for-the-badge" alt="Español"/></a>
</div>

<h1 align="center">HeaderScan</h1>
<p align="center"><em>Analiza los headers de seguridad HTTP de un sitio, da una nota (A–F) y muestra cómo corregir lo que falta</em></p>
<p align="center"><strong>URL → fetch en el servidor → chequeo de headers → nota + recomendaciones</strong></p>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="tailwind"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#acerca-de"><img src="https://img.shields.io/badge/▸_ACERCA_DE-1987F0?style=for-the-badge" alt="acerca"/></a>
<a href="#qué-verifica"><img src="https://img.shields.io/badge/▸_QUÉ_VERIFICA-000000?style=for-the-badge" alt="verifica"/></a>
<a href="#cómo-funciona"><img src="https://img.shields.io/badge/▸_CÓMO_FUNCIONA-1987F0?style=for-the-badge" alt="funciona"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 🛡️ **Herramienta defensiva.** Solo lee los headers de respuesta que una URL pública ya devuelve — no sondea puertos ni envía payloads.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="HeaderScan — análisis de headers de seguridad"/>
</div>

## Acerca de

**HeaderScan** analiza los **headers de seguridad HTTP** de un sitio, asigna una nota (A–F) y muestra exactamente cómo corregir lo que falta. Corre en una **route handler** de Node.js (fetch en el servidor), así que no hay limitación de CORS.

## Qué verifica

| Header | Por qué importa |
|---|---|
| Strict-Transport-Security (HSTS) | Fuerza HTTPS; bloquea ataques de downgrade |
| Content-Security-Policy (CSP) | Mitiga XSS e inyección |
| X-Content-Type-Options | Evita MIME sniffing |
| X-Frame-Options | Previene clickjacking |
| Referrer-Policy | Limita la fuga de referrer |
| Permissions-Policy | Restringe funciones poderosas del navegador |

Cada header presente contribuye a una puntuación ponderada; la nota se deriva del total. Los headers ausentes vienen con un valor recomendado listo para copiar.

## Cómo funciona

`POST /api/scan` con `{ "url": "example.com" }`:

1. Normaliza la URL (agrega `https://` si es necesario, valida el esquema).
2. La busca en el servidor con timeout de 10s, siguiendo redirects.
3. Inspecciona los headers de la respuesta y devuelve un reporte con nota.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
```

## Licencia

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desarrollado por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
