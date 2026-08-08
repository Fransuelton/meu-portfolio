# Fransuelton Francisco — Personal Portfolio

<div align="center">

![Last Commit](https://img.shields.io/github/last-commit/Fransuelton/my-portfolio?color=00ff88&labelColor=0e0e0e)
![Repo Size](https://img.shields.io/github/repo-size/Fransuelton/my-portfolio?color=00ff88&labelColor=0e0e0e)
![License](https://img.shields.io/github/license/Fransuelton/my-portfolio?color=00ff88&labelColor=0e0e0e)
![Stars](https://img.shields.io/github/stars/Fransuelton/my-portfolio?style=flat&color=00ff88&labelColor=0e0e0e)

![Astro](https://img.shields.io/badge/Astro-5-ff5a03?logo=astro&logoColor=white&labelColor=0e0e0e)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white&labelColor=0e0e0e)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white&labelColor=0e0e0e)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white&labelColor=0e0e0e)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f38020?logo=cloudflare&logoColor=white&labelColor=0e0e0e)

**Live:** [fransuelton.dev](https://fransuelton.dev)

</div>

---

## Tech Stack

| Layer              | Technologies                                        |
| ------------------ | --------------------------------------------------- |
| Framework          | Astro 5 — prerendered pages + one SSR API route      |
| Hosting            | Cloudflare Workers (`@astrojs/cloudflare`)          |
| Styling            | Tailwind CSS v4 + CSS custom properties             |
| Language           | TypeScript                                          |
| UI Islands         | React 18 (`client:idle`)                            |
| Contact backend    | Astro API route + Resend                            |
| OG images          | `astro-og-canvas` (generated at build)              |
| Fonts              | Inter + JetBrains Mono via Fontsource               |
| Icons              | Lucide React                                        |
| Package Manager    | Bun                                                 |
| Analytics          | Cloudflare Web Analytics (opt-in)                   |

---

## Features

- **i18n** — PT, EN, ES with per-language routes and hreflang alternates
- **Command Palette** — `⌘K` / `Ctrl+K` with navigation, theme, language controls and easter egg
- **Scroll Animations** — Entrance reveals and hero stagger (`prefers-reduced-motion` aware)
- **View Transitions** — Cross-document fade via CSS `@view-transition { navigation: auto }`
- **Theme Toggle** — Dark / Light / System with `startViewTransition` smooth switch
- **Scrollspy** — Active nav link highlight based on visible section
- **Toast System** — Global `window.toast()` used by contact form and copy actions
- **Spotlight Effect** — Radial gradient that follows the cursor on service and project cards
- **Web App Manifest** — `manifest.webmanifest` (SVG icon only; add 192/512 PNG icons for real Android installability)
- **Custom 404** — Branded page with character scramble animation
- **SEO** — Canonical URLs, hreflang, OG/Twitter tags, JSON-LD structured data, sitemap
- **OG Images** — One 1200×630 card per page × language, rendered at build time
- **Rate Limiting** — Per-IP throttle on the contact endpoint (Cloudflare `ratelimits` binding)

---

## Getting Started

**Requirements:** Bun 1+ or Node.js 18+

```bash
git clone https://github.com/Fransuelton/my-portfolio.git
cd my-portfolio
bun install
bun dev
```

Open [http://localhost:4321](http://localhost:4321).

### Build for production

```bash
bun run build     # outputs to dist/
bun run preview   # serve the production build locally
```

### Environment variables

There are two kinds, and they are set in different places.

**Build-time (public, baked into the client bundle)** — copy `.env.example` to `.env`:

```env
# Cloudflare Web Analytics beacon token (optional — analytics only in production)
# Get it: Cloudflare Dashboard → Web Analytics → Sites → Manage site
PUBLIC_CF_ANALYTICS_TOKEN=
```

**Runtime secrets (contact form)** — read by `src/pages/api/contact.ts` from the
Cloudflare runtime env, never exposed to the browser:

```bash
# Local dev — Wrangler reads .dev.vars, not .env
echo 'RESEND_API_KEY="re_..."' >> .dev.vars

# Production — Worker secrets
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put EMAIL_FROM
bunx wrangler secret put EMAIL_TO
```

> Without `RESEND_API_KEY` set on the Worker, `/api/contact` answers `503` and the
> contact form silently fails for every visitor. There is no separate backend —
> the endpoint runs inside the same Worker.

---

## Project Structure

```
src/
├── components/
│   ├── islands/       # React client islands
│   │   ├── BriefingModal.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── ContactForm.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── ThemeToggle.tsx
│   ├── sections/      # Page sections (Astro)
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── Projects.astro
│   │   └── Contact.astro
│   └── ui/            # Shared components
│       ├── Header.astro
│       ├── Footer.astro
│       ├── ProjectCard.astro
│       └── RepoCard.astro
├── assets/
│   └── avatar.webp    # Optimized at build by astro:assets
├── fonts/
│   └── JetBrainsMono-*.ttf  # Build-only, for OG image rendering
├── i18n/
│   ├── ui.ts          # All translations (PT / EN / ES)
│   └── utils.ts       # useTranslations, getAlternateUrls
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── github.ts      # GitHub API fetch + types
│   └── toast.ts       # Global toast system
├── pages/
│   ├── index.astro
│   ├── projetos.astro
│   ├── 404.astro
│   ├── api/
│   │   └── contact.ts # SSR endpoint — validation, rate limit, Resend
│   ├── og/
│   │   └── [...route].ts  # Build-time OG images, one per page × language
│   ├── en/
│   │   ├── index.astro
│   │   └── projects.astro
│   └── es/
│       ├── index.astro
│       └── proyectos.astro
└── styles/
    └── global.css     # Design tokens, animations, Tailwind config
public/
├── images/
├── manifest.webmanifest
├── favicon.ico
└── logo.svg
```

---

## Contact

**Fransuelton Francisco** — Fullstack Developer & Shopify Specialist

- Email: contato@fransuelton.dev
- Portfolio: [fransuelton.dev](https://fransuelton.dev)
- GitHub: [github.com/Fransuelton](https://github.com/Fransuelton)
- LinkedIn: [linkedin.com/in/fransuelton](https://linkedin.com/in/fransuelton)
