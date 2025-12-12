# Portfolio v0 — Design Specs

## Summary
A minimal, ultra-professional portfolio with “hierarchical calmness”: reduced cognitive load through layered composition, deliberate motion, and strong typographic rhythm.

## Palette (tokens)
Defined in `src/app/globals.css`.

- Surfaces: `--surface-0`, `--surface-1`, `--surface-2` (cool charcoal tones)
- Text: `--text-0`, `--text-1`, `--text-2`
- Border: `--border`
- Accent: `--accent`, `--accent-contrast` (bright cyan)
- Glow: `--glow` used for premium hover shadows

Single accent strategy: one accent color only, used for focus rings, key CTAs, and a small number of highlights.

## Typography
- Headings: Inter (`--font-heading`)
- Body: Roboto (`--font-body`)
- Mono: Roboto Mono (`--font-mono`)

## Spacing + rhythm
- 8px baseline spacing.
- Container: `max-w-6xl` with responsive paddings.
- Card radius: `rounded-2xl`.

## Motion tokens
- Reveal: y: 16 → 0, opacity 0 → 1, duration 420ms, ease: cubic-bezier(.2,.9,.3,1)
- Header behavior: hide on scroll down, show on scroll up.
- Reduced motion: respects `prefers-reduced-motion`.
- Buttons/cards: slight lift + glow on hover, kept within 1–2px to stay calm.

## Accessibility
- Keyboard focus visible for all interactive elements.
- Color contrast targets: WCAG AA.
- D3 viz: focusable nodes + “Show data table” equivalent.

## Notes
This is v0: content is placeholders until you paste canonical LinkedIn/portfolio copy into `src/content/**`.
Layered background adds glamor: dual radial gradients + fine line pattern; 3D micro-scene is gated by capability and reduced-motion.
