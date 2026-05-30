## Goal

Bring `OrbitHero` into visual lockstep with the task taxonomy used across the catalogue, swap the center text pill for the real DLinRT.eu logo, and publish a news entry crediting Mustafa Kadhim for the suggestion.

## 1. Taxonomy-aligned colors in `src/components/homepage/OrbitHero.tsx`

Single source of truth: `TASK_COLORS` from `src/utils/chartColors.ts`. These solid hex values render identically in light and dark mode, so no theme branching is needed.

**Legend dots (category tag rail at the bottom)** — currently every chip uses the same `from-sky-400 to-violet-400` gradient dot. Replace with a per-category solid swatch driven by `getTaskColor(t)`:

```text
[●] Auto-Contouring      → #3B82F6
[●] Treatment Planning   → #EC4899
[●] Image Synthesis      → #10B981
[●] Reconstruction       → #A855F7
[●] Performance Monitor  → #6B7280
```

Each dot becomes an inline-styled `span` with `backgroundColor` from `TASK_COLORS`. Hover keeps the existing sky-700 text/ring accent.

**Orbiting blobs (planets)** — replace the arbitrary tailwind gradient strings with the taxonomy palette. Each planet is bound to one task so the visual matches what users see on product cards:

```text
Outer ring  Auto-Contouring      #3B82F6
Outer ring  Treatment Planning   #EC4899
Outer ring  Image Synthesis      #10B981
Outer ring  Performance Monitor  #6B7280
Inner ring  Reconstruction       #A855F7
Inner ring  Clinical Prediction  #F97316
Inner ring  Registration         #6366F1
```

The `Planet` type changes from a tailwind `gradient` string to a `task: keyof typeof TASK_COLORS` (resolved through `getTaskColor`). The blob renders as a radial gradient built from that single hex (lighter top-left highlight → solid color), preserving the current glossy look. The shine, hover scale, and ring overlay stay identical.

**Traveling SVG satellites** also switch from `#5090D0 / #22d3ee / #a78bfa` to three taxonomy colors (`#3B82F6`, `#10B981`, `#A855F7`) so the moving dots feel like the same family.

Brand accent (`#5090D0`) used for the underline, ring strokes, glows, halo, and core remains untouched — the steel-blue identity stays, only the planets and legend dots become taxonomy-colored.

## 2. Center logo

Replace the gradient text pill that currently reads "DLinRT.eu" with the actual logo at `/LogoDLinRT.eu.png`, keeping:

- the rounded pill shape (`rounded-full`),
- the soft sky glow halo + pulse rings around it,
- the "The hub" meta caption below.

Implementation: a `rounded-full` white container with the same shadow/ring as today, holding `<img src="/LogoDLinRT.eu.png" alt="DLinRT.eu" />` sized to roughly match the current pill footprint (≈ 56–64 px tall, auto width capped). The image is set to `object-contain` so the wordmark doesn't distort, and the container gets `overflow-hidden` so the rounded edges clip the logo.

No other content (search, headline, chips, category rail) changes.

## 3. News item: stylistic upgrade announcement

Create `src/data/news/orbit-hero-style-refresh.ts` and register it in `src/data/news.ts` at the top of `NEWS_ITEMS`.

Content outline (matching existing news shape — id, date `2026-05-30`, title, summary, markdown content):

- Title: "Homepage Refresh: Taxonomy-Consistent Orbit and New DLinRT.eu Hub Logo"
- Summary: one sentence about the orbit + legend now sharing the catalogue's task colors and the centerpiece switching to the real logo.
- Body sections:
  - What changed (legend dots, orbiting blobs, central logo).
  - Why it matters — same color a user sees on a "Auto-Contouring" product card is the same color orbiting the hub and labelling the category chip, reinforcing the taxonomy across the site.
  - Acknowledgement: "Many thanks to **Mustafa Kadhim** for suggesting this stylistic upgrade." (spelling verified against the About page entry).

## Verification

- Build passes (auto).
- Visual check on `/`: hero shows 7 differently colored orbiting blobs, 5 legend dots each matching their category color, central DLinRT.eu logo inside the rounded pill with halo intact.
- News page `/news` lists the new entry first; detail page renders the markdown body and credits Mustafa Kadhim.

## Out of scope

No dark-mode work (homepage hero is light-only today), no changes to `TASK_COLORS`, no edits elsewhere in the app.
