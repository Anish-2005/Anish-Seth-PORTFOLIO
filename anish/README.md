# Portfolio 2025 — Anish Seth (v0)

Build v0 of a professional Next.js portfolio for Anish Seth (Full-Stack Web & App Developer, ML & Blockchain experience). Use his LinkedIn / existing portfolio for content. The site is minimal, ultra-professional, and visually rich — inspired by angular.dev for interaction quality but original in layout, design psychology, and animations.

## Tech
- Next.js (App Router) + TypeScript + Tailwind
- Motion: Framer Motion (`src/components/motion/Reveal.tsx`)
- Data viz: D3 (`src/components/visuals/*`)
- 3D: three.js via `@react-three/fiber` (lazy-loaded)

## Run
```bash
cd anish
npm install
npm run dev
```

## Content (replace placeholders)
- Global config: `src/lib/site.config.ts`
- Projects: `src/content/projects/*.mdx`
- Notes: `src/content/notes/*.mdx`
- Skills data for D3: `src/data/skills.json`
- Resume: `public/resume.pdf` (v0 includes a placeholder PDF)

## Deploy (Vercel)
Prereq: `vercel login`.

```bash
npm run deploy:preview
npm run deploy:prod
```

## CI
GitHub Actions runs: lint → typecheck → test → build (`.github/workflows/ci.yml`).

## Demo GIF
Add `demo.gif` at repo root (v0 requirement). Suggested flow:
- Record the hero + header hide/show on scroll using ScreenToGif (Windows)
- Save as `demo.gif`

## Design psychology (what’s unique)
This design uses hierarchical calmness: composition that reduces cognitive load by guiding attention through layered motion and content density. Instead of aggressive micro-interactions, motion is used as a pacing tool — brief reveals, subtle depth parallax, and “stops” where the layout breathes and the D3 story can speak. The result aims to feel authoritative and quietly modern.

While the interaction quality is inspired by angular.dev (smoothness, responsiveness, disciplined animation), the layout is intentionally different: less UI chrome, fewer competing focal points, and a more editorial rhythm. The motion language prioritizes clarity over novelty — always interruptible, keyboard-safe, and reduced-motion friendly. The portfolio is designed to read like a product narrative: who I am → what I built → how the skills connect → how to contact.

## v1 TODO
See `todo.md`.
