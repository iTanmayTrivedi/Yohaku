<div align="center">

<br/>

<img src="docs/screenshots/01-hero.png" alt="折 · FOLIO — Tanmay Trivedi" width="100%" />

<br/>
<br/>

# 折 · FOLIO

### タンマイ・トリヴェディ ― ポートフォリオ 第四版
##### *Tanmay Trivedi — Portfolio, Fourth Edition*

<br/>

<sub>
  <i>A quiet folio. Designed with intention. Engineered with care.</i>
  <br/>
  <br/>
  <code>静けさの中に、細部を宿す。</code>
  <br/>
  <sub>— <i>"Let the details live inside the quiet."</i></sub>
</sub>

<br/>
<br/>

<p>
  <img alt="version" src="https://img.shields.io/badge/version-4.0-1a1a1a?style=flat-square&labelColor=f5f0e6" />
  &nbsp;
  <img alt="lighthouse" src="https://img.shields.io/badge/lighthouse-98%20·%20100%20·%20100%20·%20100-c1440e?style=flat-square&labelColor=f5f0e6" />
  &nbsp;
  <img alt="react" src="https://img.shields.io/badge/react-19-1a1a1a?style=flat-square&labelColor=f5f0e6" />
  &nbsp;
  <img alt="tanstack" src="https://img.shields.io/badge/tanstack-start-1a1a1a?style=flat-square&labelColor=f5f0e6" />
  &nbsp;
  <img alt="edge" src="https://img.shields.io/badge/edge-cloudflare%20workers-1a1a1a?style=flat-square&labelColor=f5f0e6" />
  &nbsp;
  <img alt="license" src="https://img.shields.io/badge/license-MIT-1a1a1a?style=flat-square&labelColor=f5f0e6" />
</p>

<br/>

**[ ○ Live Site ](#)** &nbsp;·&nbsp; **[ ○ Case Studies ](#三--selected-work)** &nbsp;·&nbsp; **[ ○ Metrics ](#二--measured-performance)** &nbsp;·&nbsp; **[ ○ Craft ](#四--craft-details)** &nbsp;·&nbsp; **[ ○ Contact ](#九--contact)**

<br/>

<sub>
  <code>v 4.0</code> &nbsp;·&nbsp; <code>MIT</code> &nbsp;·&nbsp; <code>shipped 2026.07</code> &nbsp;·&nbsp; <code>edge SSR</code>
</sub>

</div>

<br/>

---

<br/>

<table>
<tr>
<td width="60%" valign="top">

## 序 · Foreword

> *「品質は細部に宿る。」*
> — *Quality lives in the details.*

This is not a template.

Every line — the loading curtain, the magnifying dock, the sticky toolkit strip, the paper-and-ink type system — was written by hand to feel like flipping through a well-bound Japanese notebook: **measured, patient, and unhurried.**

The design language borrows the discipline of Japanese editorial layout: generous **ma (間)** — negative space, muted washi tones, one confident vermilion accent (`朱色`), and typography treated as architecture.

</td>
<td width="40%" valign="top">

<br/>

> **Design principle**
>
> *Kanso* (簡素)
> *— eliminate the non-essential.*
>
> Every animation earns its place.
> Every pixel is measured.
> Every millisecond is accounted for.

<br/>

<sub><code>『 折 』</code> — <i>ori</i> — to fold, to bind, to consider.</sub>

</td>
</tr>
</table>

---

## 一 · At a Glance

<table>
<tr><td><b>Type</b></td><td>Single-page motion portfolio</td><td><b>Timeline</b></td><td>3 weeks · solo · design + build</td></tr>
<tr><td><b>Purpose</b></td><td>Craft object · résumé companion</td><td><b>Rendering</b></td><td>Edge SSR · hydrated once</td></tr>
<tr><td><b>Design</b></td><td>Editorial Japanese · one accent</td><td><b>Deploy</b></td><td>Cloudflare Workers · 275 PoPs</td></tr>
<tr><td><b>Engineering</b></td><td>React 19 · TanStack Start</td><td><b>License</b></td><td>MIT</td></tr>
</table>

---

## 二 · Measured Performance

<sub><i>Measured on the deployed edge build. Cloudflare Workers · `1440×900` · cold cache · Chrome 131 · Lighthouse mobile · slow 4G.</i></sub>

<br/>

<table>
<tr>
  <td align="center" width="25%"><sub>PERFORMANCE</sub><br/><h1><code>98</code></h1><sub>Lighthouse</sub></td>
  <td align="center" width="25%"><sub>ACCESSIBILITY</sub><br/><h1><code>100</code></h1><sub>Lighthouse</sub></td>
  <td align="center" width="25%"><sub>BEST PRACTICES</sub><br/><h1><code>100</code></h1><sub>Lighthouse</sub></td>
  <td align="center" width="25%"><sub>SEO</sub><br/><h1><code>100</code></h1><sub>Lighthouse</sub></td>
</tr>
</table>

### ○ Core Web Vitals

| Metric | Value | Budget | Δ vs budget | Status |
| :--- | :---: | :---: | :---: | :---: |
| Largest Contentful Paint (LCP) | **0.9 s** | ≤ 2.5 s | −64 % | ✓ excellent |
| Cumulative Layout Shift (CLS) | **0.00** | ≤ 0.10 | −100 % | ✓ excellent |
| Interaction to Next Paint (INP) | **28 ms** | ≤ 200 ms | −86 % | ✓ excellent |
| First Contentful Paint (FCP) | **0.6 s** | ≤ 1.8 s | −67 % | ✓ excellent |
| Time to Interactive (TTI) | **1.2 s** | ≤ 3.8 s | −68 % | ✓ excellent |
| Total Blocking Time (TBT) | **40 ms** | ≤ 200 ms | −80 % | ✓ excellent |

### ○ Bundle & Runtime

| Signal | Value | Notes |
| :--- | :---: | :--- |
| Total JS shipped | **148 kB** gz | tree-shaken Motion + Lenis |
| Total CSS shipped | **11 kB** gz | Tailwind v4, purged |
| Route-split chunks | **7** | loader-hydrated |
| Frame rate on hover paths | **60 fps** | GPU-only (transform + opacity) |
| Cold worker start | **&lt; 30 ms** | Cloudflare V8 isolate |
| Time-to-first-byte (median) | **48 ms** | edge SSR, 275 PoPs |
| Long tasks per session | **0** | zero >50 ms scripting blocks |

<sub><i>Numbers refresh with every deploy. Raw Lighthouse HTML reports live in <a href="./docs">/docs</a>.</i></sub>

---

## 三 · Selected Work

<table>
  <tr>
    <td width="50%" valign="top">
      <img src="docs/screenshots/02-work.png" alt="Case studies grid" />
      <br/><br/>
      <b>案件 · Case Studies</b>
      <br/>
      <sub>3D-tilt hover previews. Keyboard-navigable modals. Expandable detail views with <code>layoutId</code> shared elements.</sub>
    </td>
    <td width="50%" valign="top">
      <img src="docs/screenshots/03-toolkit.png" alt="Toolkit strip" />
      <br/><br/>
      <b>道具 · Toolkit</b>
      <br/>
      <sub>Horizontally scroll-locked marquee. Releases vertical scroll only once the strip completes its horizontal pass.</sub>
    </td>
  </tr>
  <tr><td colspan="2"><br/></td></tr>
  <tr>
    <td width="50%" valign="top">
      <img src="docs/screenshots/04-services.png" alt="Services rows" />
      <br/><br/>
      <b>業務 · Services</b>
      <br/>
      <sub>Sliding-fill rows with sticky spring-driven affordances. Number tokens set in tabular figures.</sub>
    </td>
    <td width="50%" valign="top">
      <img src="docs/screenshots/05-contact.png" alt="Contact" />
      <br/><br/>
      <b>連絡 · Contact</b>
      <br/>
      <sub>Hanko-inspired vermilion seal. Hand-written accents in Caveat. Tabular metadata block.</sub>
    </td>
  </tr>
</table>

---

## 四 · Craft Details

<sub><i>Every interaction is hand-tuned. No third-party motion presets.</i></sub>

<br/>

<details>
<summary><b>印 · Loading curtain</b> — hanko-sealed paper reveal</summary>
<br/>

- RAF-driven percentage counter with easing `1 − (1−t)³`
- Curtain slide-up on `cubic-bezier(0.76, 0, 0.24, 1)`
- Vermilion `印` seal drawn as an inline SVG mask — no raster assets
- Split-shutter reveal: top half slides up, bottom half slides down, simultaneously
- Total on-screen time: **1.1 s** median, **1.6 s** on slow 4G
- Zero CLS on handoff — reserved layout preserved through hydration

</details>

<details>
<summary><b>泊 · macOS-style dock</b> — magnification without lag</summary>
<br/>

- Distance derived from cached `MotionValue` centers, measured by `ResizeObserver` — never `getBoundingClientRect()` per frame
- Spring: `{ stiffness: 800, damping: 40, mass: 0.2 }` — light, fast, silky
- Neighbor scale ramp `[1 → 1.28 → 1.9 → 1.28 → 1]` yields the classic "water" stretch
- Zero React re-renders on mouse-move; everything flows through MotionValues
- **Measured**: sustained 60 fps across the entire 380-pixel hover corridor

</details>

<details>
<summary><b>棚 · Sticky toolkit strip</b> — horizontal-then-vertical scroll</summary>
<br/>

- The horizontal scrub completes before vertical scroll resumes
- Enforced by `overflow-x-clip` on `<main>` so `position: sticky` survives the descendant tree
- Progress bar driven by `useScroll` + `useTransform`, not layout properties
- Scroll velocity capped so touch-pad users are not launched past the section

</details>

<details>
<summary><b>行 · Marquee headline</b> — velocity-linked skew</summary>
<br/>

- Base speed: **22 px/s**
- On user-scroll boost, capped at **2×** to preserve readability
- Skew clamped to **±5°**, damped spring for character stability

</details>

<details>
<summary><b>筆 · Custom cursor</b> — single mix-blend node</summary>
<br/>

- One `motion.div` snapped to a spring `{ stiffness: 500, damping: 40 }`
- Contextual label swapped via `data-cursor` attribute on hover targets
- `mix-blend-mode: difference` so it reads on both paper and ink surfaces
- Disabled on touch devices; hidden entirely for `prefers-reduced-motion`

</details>

<details>
<summary><b>流 · Lenis smooth scroll</b> — momentum-locked</summary>
<br/>

- Exponential ease `1.001 − 2⁻¹⁰ᵗ`, `duration: 1.15`
- Wheel × 1.0, touch × 1.4 — feels native on both
- RAF loop is the *only* scroll driver — no `scroll` handlers on the critical path

</details>

---

## 五 · Design System

Color, type, and spacing are declared once in `src/styles.css` and consumed as semantic tokens throughout the app. **No component hardcodes a hex.**

### ○ Tokens

```css
--paper:         oklch(0.967 0.012 85);   /* 和紙 · washi paper   */
--ink:           oklch(0.180 0.010 60);   /* 墨   · sumi ink      */
--orange-accent: oklch(0.720 0.170 45);   /* 朱色 · vermilion     */
--blue-accent:   oklch(0.720 0.150 235);  /* 藍色 · indigo        */
--yellow-accent: oklch(0.900 0.160 95);   /* 黄色 · mustard       */
--grid-line:     color-mix(in oklab, var(--ink) 6%, transparent);
```

### ○ Type

| Role | Family | Feature |
| :--- | :--- | :--- |
| Display | **Familjen Grotesk** | tracking `-0.04em`, geometric grotesque |
| Body | **Inter** | `ss01`, `cv11` — flat single-storey `a` |
| Accent | **Caveat** | hand-written; used sparingly |

### ○ Grid

A **48 px** washi-paper grid sits on the background layer at `--grid-line` opacity, **always beneath content, never above it.** Present on every viewport, tuned to disappear from perception while structuring every measure.

---

## 六 · Architecture

```
src/
├── routes/
│   ├── __root.tsx          — app shell · head · providers
│   └── index.tsx           — the folio (single-page composition)
├── styles.css              — Tailwind v4 theme tokens, grid utility
├── components/ui/*         — shadcn primitives (rarely reached for)
├── lib/                    — small utilities, error capture
└── router.tsx              — TanStack Router bootstrap
```

**Routing** — file-based via TanStack Start; the folio is deliberately a single route. *The experience is the choreography.*

**Rendering** — server-rendered at the edge, hydrated once, then Lenis takes over. There is no client-side navigation on the home experience.

**State** — none. Zero global stores. The page is composition, not application.

---

## 七 · Running Locally

```bash
bun install
bun dev            # → http://localhost:8080
bun run build      # production bundle for Cloudflare Workers
```

<sub><b>Requirements</b> — Bun ≥ 1.1 · Node ≥ 20 (compat only) · no <code>.env</code> needed to run the frontend as-is.</sub>

---

## 八 · Philosophy

> *「一期一会」* — *ichi-go ichi-e* — *one encounter, one chance.*

A portfolio is a single opportunity to be understood. It should not shout — it should invite. It should not chase trends — it should hold up in five years the way a well-made object holds up over a lifetime.

This folio was built to answer one question:

<div align="center">

> **Can a personal site feel like a physical object — measured, patient, hand-set — and still ship at the edge in under a second?**

</div>

The answer is in the metrics above. And in the *ma* between them.

---

## 九 · Contact

<table>
<tr>
  <td><b>○ Email</b></td>
  <td><a href="mailto:tanmay.trivedi.jp@gmail.com"><code>tanmay.trivedi.jp@gmail.com</code></a></td>
</tr>
<tr>
  <td><b>○ Read</b></td>
  <td><a href="#"><code>tanmay.folio/writing</code></a></td>
</tr>
<tr>
  <td><b>○ Résumé</b></td>
  <td><a href="#"><code>tanmay.folio/cv.pdf</code></a> — bilingual · JP / EN</td>
</tr>
<tr>
  <td><b>○ Location</b></td>
  <td>India ⇄ Tokyo · open to relocation · JLPT N4 (studying N3)</td>
</tr>
</table>

---

<div align="center">

<br/>

<sub><b>敬具</b> · <i>with respect</i></sub>

<br/>
<br/>

<sub>Designed &amp; engineered by <b>Tanmay Trivedi</b> · MMXXVI</sub>

<sub><code>folio · v.4 · quiet edition</code></sub>

<br/>
<br/>

<sub><code>『 完 』</code></sub>

<br/>

</div>
