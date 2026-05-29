## Dark Mode Contrast Audit

### Problems found

1. **TaskTaxonomy pastel buttons unreadable in dark mode.** Cards use hardcoded pastels (`bg-blue-100`, `bg-yellow-100`, `bg-purple-100`, …) that are NOT remapped by the dark retrofit. The button label uses `text-slate-900`, which the retrofit forces to near-white (`hsl(210 30% 94%)`) in dark mode → light text on light pastel = invisible. The inner `Badge` (`bg-white text-slate-900`) works because `bg-white` is remapped to `--card`, but the surrounding button background isn't.

2. **`text-slate-300` / `text-slate-400` mapped too dim.** Retrofit maps them to `hsl(215 14% 42%)` and `hsl(215 12% 52%)` — used for dividers, "Try:" labels, micro captions in `OrbitHero` and TaskTaxonomy description — all fail WCAG against the dark background.

3. **`text-slate-500` / `text-slate-600`** also borderline against `--background` (5% lightness). Should sit closer to `--muted-foreground` (65%).

4. **`text-slate-700`** maps to 82% — fine, but TaskTaxonomy's per-card description (`text-slate-700 dark:text-slate-300`) is double-targeted; the `dark:text-slate-300` wins and drops to 42% → unreadable.

5. **Pastel surfaces elsewhere** (e.g. `bg-blue-100`, `bg-emerald-100`, badges across the app) aren't remapped at all in `.dark`.

### Fix plan

**A. `src/index.css` — strengthen the dark retrofit (no per-component refactor).**

- Raise mapped lightness of dim text utilities:
  - `text-slate-300/gray-300` → `hsl(215 18% 70%)` (was 42%)
  - `text-slate-400/gray-400` → `hsl(215 16% 65%)` (was 52%)
  - `text-slate-500/gray-500` → `hsl(215 15% 72%)` (was 62%)
  - `text-slate-600/gray-600` → `hsl(215 16% 80%)` (was 72%)
  - Keep `slate-700/800/900` as-is.
- Add dark overrides for hardcoded pastel surfaces so foreground text remains legible. Map every `bg-{color}-100` used in the catalog (blue, yellow, green, purple, pink, orange, indigo, emerald, violet, cyan, gray) to a tinted dark surface using `--muted` plus a low-alpha accent of the original hue, e.g.:
  ```css
  .dark .bg-blue-100   { background-color: hsl(217 35% 18%) !important; }
  .dark .bg-yellow-100 { background-color: hsl(45 30% 18%) !important; }
  /* …same for green/purple/pink/orange/indigo/emerald/violet/cyan/gray */
  ```
  Lightness ~16–20%, saturation kept low so the existing `text-slate-900` (remapped to near-white) reaches AA contrast.
- Soften the connector line in TaskTaxonomy: under `.dark`, replace `from-blue-300 via-[#00A6D6] to-blue-300` visibility by leaving it as-is (it already shows on dark) — no change needed.

**B. `src/components/TaskTaxonomy.tsx` — minimal local fix.**

- Per-card description: remove the conflicting `dark:text-slate-300` and rely on a single `text-muted-foreground` (or keep `text-slate-700`, which the retrofit handles correctly). Single line change.
- Inner `Badge` already uses `bg-white text-slate-900` — works via retrofit; no change.
- Button border `border-gray-200` already remapped to `--border`; no change.

**C. Spot fixes in homepage components (optional, only if A still leaves issues).**

- `OrbitHero` "Try:" label (`text-slate-400`) and small badges (`text-slate-500`) will be lifted by change A; no edit required.
- `Footer` (`text-gray-500/600`) lifted by change A; no edit required.
- `StatsRow` and `FeatureCards` already use slate-600/700/900, all in the safe range after A.

### Out of scope

- No restructuring of homepage layout or copy.
- No changes to light mode tokens or component APIs.
- No new dependencies; all edits stay in `src/index.css` (primary) and one className tweak in `TaskTaxonomy.tsx`.

### Verification

After edits, switch the preview to dark mode and visually confirm:
- All ten TaskTaxonomy category buttons show legible label + badge + description.
- Hero subtext, "Try:" chips, stat sub-labels, and footer links are clearly readable.
- Light mode is unchanged (all overrides are scoped under `.dark`).
