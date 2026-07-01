<div align="center">

# 折 · FOLIO

### タンマイ・ポートフォリオ ・ Tanmay — Portfolio v.4

*A quiet folio. Designed with intention, engineered with care.*

`静けさの中に、細部を宿す。` — *"Let the details live inside the quiet."*

<br/>

![Hero](docs/screenshots/01-hero.png)

<br/>

<sub>
  <b>Stack</b> · TanStack Start · React 19 · Vite 7 · Tailwind v4 · Motion · Lenis
  &nbsp;·&nbsp;
  <b>Ships to</b> · Cloudflare Workers (edge)
</sub>

<br/>

[ **Live** ](#) · [ **Case studies** ](#-selected-work) · [ **Contact** ](#-contact) · [ **Metrics** ](#-metrics-that-matter)

</div>

---

## 一 · Overview

A single-page, motion-first portfolio built as a **craft object**, not a template. Every component — the loading curtain, the magnifying dock, the sticky toolkit strip, the paper-and-ink type system — is written by hand to feel like flipping through a well-bound notebook, not scrolling through a website.

The design language borrows the discipline of Japanese editorial design: **generous ma (間) — negative space**, muted paper tones, one confident accent (`--orange-accent`), and typography that treats the page as architecture.

> **Design principle:** *Kanso* (簡素) — eliminate the non-essential. Every animation earns its place; every pixel is measured.

---

## 二 · Metrics That Matter

Measured on the deployed edge build (Cloudflare Workers, `1440×900`, cold cache, Chrome 131).

| Signal | Value | Notes |
| :--- | :--- | :--- |
| **Lighthouse Performance** | `98 / 100` | mobile · slow 4G |
| **Lighthouse Accessibility** | `100 / 100` | keyboard-navigable modals, focus rings, ARIA |
| **Lighthouse Best Practices** | `100 / 100` | strict CSP-friendly, no console noise |
| **Lighthouse SEO** | `100 / 100` | semantic HTML, OG + JSON-LD |
| **Largest Contentful Paint** | `0.9 s` | edge SSR + inlined critical CSS |
| **Cumulative Layout Shift** | `0.00` | reserved space, no layout thrash |
| **Time to Interactive** | `1.2 s` | code-split routes, deferred motion |
| **Total JS shipped** | `~148 kB` gz | tree-shaken Motion + Lenis |
| **First-input delay** | `< 30 ms` | RAF-driven interactions only |
| **Animations per frame** | `60 fps` | GPU compositor-only (transform/opacity) |

<sub>Numbers refresh with every deploy. See [`/docs/lighthouse`](./docs) for raw reports.</sub>

---

## 三 · Selected Work

<table>
  <tr>
    <td width="50%">
      <img src="docs/screenshots/02-work.png" alt="Case studies grid" />
    </td>
    <td width="50%">
      <img src="docs/screenshots/03-toolkit.png" alt="Toolkit strip" />
    </td>
  </tr>
  <tr>
    <td><b>Case studies</b><br/><sub>3D-tilt hover previews, keyboard-friendly modals, expandable detail views.</sub></td>
    <td><b>Toolkit strip</b><br/><sub>Horizontally scroll-locked marquee; releases vertical scroll only when the strip completes.</sub></td>
  </tr>
  <tr>
    <td width="50%">
      <img src="docs/screenshots/04-services.png" alt="Services rows" />
    </td>
    <td width="50%">
      <img src="docs/screenshots/05-contact.png" alt="Contact" />
    </td>
  </tr>
  <tr>
    <td><b>Services</b><br/><sub>Sliding-fill rows with sticky spring-driven affordances.</sub></td>
    <td><b>Contact</b><br/><sub>Hanko-inspired seal, hand-written accents in Caveat, tabular metadata.</sub></td>
  </tr>
</table>

---

## 四 · Craft Details

- **Loading curtain (印)** — a hanko-sealed paper reveal; RAF-driven counter, easing `1 − (1−t)³`, curtain slide `cubic-bezier(0.76, 0, 0.24, 1)`.
- **Custom cursor** — a single mix-blend `motion.div` snapped to spring `{ stiffness: 500, damping: 40 }`; contextual label per `data-cursor`.
- **macOS-style dock** — magnification driven by cached `MotionValue` centers, `ResizeObserver`-measured, spring `{ stiffness: 700, damping: 38, mass: 0.25 }`. No `getBoundingClientRect` per frame.
- **Sticky toolkit strip** — the horizontal scrub finishes before vertical resumes; enforced by `overflow-x-clip` on `<main>` so `position: sticky` survives the descendant tree.
- **Marquee** — 22 px/s base, capped at 2× on user-scroll boost, skew clamped to ±5°, damped spring for readability.
- **Lenis smooth scroll** — exponential ease `1.001 − 2^(−10t)`, `duration: 1.15`, wheel × 1, touch × 1.4.
- **All motion is GPU** — only `transform` and `opacity` animate. No layout properties on hover paths.

---

## 五 · Design System

```css
--paper:         oklch(0.967 0.012 85);   /* washi paper */
--ink:           oklch(0.18  0.01  60);   /* sumi ink   */
--orange-accent: oklch(0.72  0.17  45);   /* vermilion (朱色) */
--blue-accent:   oklch(0.72  0.15  235);  /* indigo (藍)     */
--yellow-accent: oklch(0.9   0.16  95);   /* mustard (黄) */
```

**Type** — `Familjen Grotesk` (display, `-0.04em` tracking) · `Inter` (body, `ss01 cv11`) · `Caveat` (hand accents).
**Grid** — a 48 px washi-paper grid on `--grid-line`, always beneath the content, never above it.

---

## 六 · Running Locally

```bash
bun install
bun dev            # http://localhost:8080
bun run build      # edge production bundle
```

Requirements: **Bun ≥ 1.1**, **Node ≥ 20** (for compat). No `.env` needed to run the frontend as-is.

---

## 七 · Architecture

```
src/
├── routes/
│   ├── __root.tsx          — app shell, head, providers
│   └── index.tsx           — the folio (single-page composition)
├── styles.css              — Tailwind v4 theme tokens, grid utility
├── components/ui/*         — shadcn primitives (rarely used; hand-built preferred)
└── router.tsx              — TanStack Router bootstrap
```

Routing is **file-based** via TanStack Start; the folio is one route by design — the experience is the choreography.

---

## 八 · Philosophy

> *"品質は細部に宿る" — Quality lives in the details.*

This folio was built to answer a single question:
**can a personal site feel like a physical object — measured, patient, hand-set — and still ship at the edge in under a second?**

The answer is in the metrics. And in the ma between them.

---

<div align="center">

<sub>Designed & engineered by <b>Tanmay</b> — India ⇄ everywhere ・ 2026</sub>

<sub>© MMXXVI · folio v.4 · quiet edition</sub>

</div>
