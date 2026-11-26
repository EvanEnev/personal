# bubenev.su

Personal resume site of **Ivan Bubenev**, full-stack developer — [bubenev.su](https://bubenev.su).

[![Docker](https://github.com/EvanEnev/personal/actions/workflows/docker.yml/badge.svg)](https://github.com/EvanEnev/personal/actions/workflows/docker.yml)

Editorial-style one-pager in English and Russian, plus a matching one-page PDF resume generated from the same content.

## Stack

- **Next.js 16** (App Router, Cache Components, static prerendering) · **React 19** · **TypeScript**
- **Tailwind CSS 4** — almost no custom CSS
- **Motion** for scroll-driven effects; the rest is plain CSS (scroll-driven animations, View Transitions)
- **Docker** standalone image, built and pushed to GHCR by GitHub Actions

## Features

- `/en` and `/ru` routes, both fully static; `/` redirects to `/en`
- Light / dark theme that follows the system and never flashes on load
- Animations: hero entrance, scroll reveals, counters, a marquee that reacts to scroll speed, a hiding header, an accordion and cross-fades between languages — all off with `prefers-reduced-motion`
- SEO: canonical and `hreflang`, OpenGraph images per language, JSON-LD `Person`, `sitemap.xml`, `robots.txt`
- [`llms.txt`](https://bubenev.su/llms.txt) — the whole profile as Markdown for AI assistants
- PDF resume rendered from `/[lang]/cv` with headless Chromium

## Structure

```
app/
├── [lang]/
│   ├── content.ts            all copy, EN + RU — edit here
│   ├── layout.tsx            fonts, metadata, theme script
│   ├── page.tsx              the site
│   ├── cv/page.tsx           print layout for the PDF resume
│   └── opengraph-image.tsx   social preview images
├── motion.tsx                client components: counter, ticker, header, accordion
├── theme-toggle.tsx
├── llms.txt/route.ts
├── robots.ts
└── sitemap.ts
```

## Development

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

### Updating the PDF resume

With the dev server running (needs `chromium` in `PATH`):

```bash
pnpm cv
```

This prints `/en/cv` and `/ru/cv` to `public/Ivan-Bubenev-CV-{en,ru}.pdf`.

## Docker

```bash
docker build -t bubenev-site .
docker run -p 3000:3000 bubenev-site
```

Every push to `main` publishes `ghcr.io/evanenev/personal:latest` (plus a `sha-…` tag; `v*` git tags become version tags):

```bash
docker run -p 3000:3000 ghcr.io/evanenev/personal:latest
```

## License

No license is granted: the code is public to read, and the content — texts, photo and resume — is personal.
