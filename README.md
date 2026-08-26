<!-- ══════════════════════════ TÍTULO ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="Header Scan"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-1987F0?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-555555?style=for-the-badge" alt="Español"/></a>
</div>

<h1 align="center">HeaderScan</h1>
<p align="center"><em>Analisa os cabeçalhos de segurança HTTP de um site, dá uma nota (A–F) e mostra como corrigir o que falta</em></p>
<p align="center"><strong>URL → fetch server-side → checagem de headers → nota + recomendações</strong></p>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="tailwind"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#sobre"><img src="https://img.shields.io/badge/▸_SOBRE-1987F0?style=for-the-badge" alt="sobre"/></a>
<a href="#o-que-verifica"><img src="https://img.shields.io/badge/▸_O_QUE_VERIFICA-000000?style=for-the-badge" alt="verifica"/></a>
<a href="#como-funciona"><img src="https://img.shields.io/badge/▸_COMO_FUNCIONA-1987F0?style=for-the-badge" alt="funciona"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 🛡️ **Ferramenta defensiva.** Só lê os headers de resposta que uma URL pública já devolve — não sonda portas nem envia payloads.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="HeaderScan — análise de headers de segurança"/>
</div>

## Sobre

**HeaderScan** analisa os **cabeçalhos de segurança HTTP** de um site, atribui uma nota (A–F) e mostra exatamente como corrigir o que estiver faltando. Roda em uma **route handler** Node.js (fetch server-side), então não há limitação de CORS.

## O que verifica

| Header | Por que importa |
|---|---|
| Strict-Transport-Security (HSTS) | Força HTTPS; bloqueia ataques de downgrade |
| Content-Security-Policy (CSP) | Mitiga XSS e injeção |
| X-Content-Type-Options | Impede MIME sniffing |
| X-Frame-Options | Previne clickjacking |
| Referrer-Policy | Limita vazamento de referrer |
| Permissions-Policy | Restringe recursos poderosos do navegador |

Cada header presente contribui para uma pontuação ponderada; a nota é derivada do total. Headers ausentes vêm com um valor recomendado pronto pra copiar.

## Como Funciona

`POST /api/scan` com `{ "url": "example.com" }`:

1. Normaliza a URL (adiciona `https://` se necessário, valida o esquema).
2. Busca a URL no servidor com timeout de 10s, seguindo redirects.
3. Inspeciona os headers da resposta e retorna um relatório com nota.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
```

## Licença

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desenvolvido por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
