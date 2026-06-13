# Per-category evidence on multi-category products

## Goal
Products that span multiple categories (`category` + `secondaryCategories[]`) should be able to carry **separate evidence per category** — different training data, evaluation data, evidence rigor / clinical impact / readiness, evidence list, and `usesAI` flag. MRCAT Prostate + Auto-Contouring is the motivating example: synthetic CT (no DL) + auto-contouring (DL) bundled in one product.

## Scope
- Backbone: extend the schema + display so any multi-category product can declare per-category evidence.
- Data: reclassify MRCAT Prostate; sweep the 19 products that already use `secondaryCategories[]` and split evidence where it makes sense. Most will keep a single shared block (no real per-task evidence exists) — only split when sources support it.
- Out of scope: editing single-category products, changing the E/I/R rubric, the visual editor flows (read-only consumers only).

## Schema change (`src/types/productDetails.d.ts`)
Add one optional field:

```ts
categoryEvidence?: Partial<Record<string /* category name */, {
  usesAI?: boolean;
  trainingData?: ProductDetails['trainingData'];
  evaluationData?: ProductDetails['evaluationData'];
  evidence?: ProductDetails['evidence'];
  evidenceRigor?: ProductDetails['evidenceRigor'];
  evidenceRigorNotes?: string;
  clinicalImpact?: ProductDetails['clinicalImpact'];
  clinicalImpactNotes?: string;
  adoptionReadiness?: ProductDetails['adoptionReadiness'];
  adoptionReadinessNotes?: string;
  notes?: string;
}>>;
```

Keys are the category strings already used in `category` / `secondaryCategories[]` (e.g. `"Image Synthesis"`, `"Auto-Contouring"`). Top-level fields stay as the default / aggregate so existing single-category logic is unchanged.

## Resolution helper
New `src/utils/productCategoryEvidence.ts`:

- `getCategoriesForProduct(p)` → `[p.category, ...p.secondaryCategories ?? []]` deduped.
- `resolveCategoryEvidence(p, cat)` → returns the per-category block merged onto the top-level defaults (per-category wins, falls back to top-level).
- `productUsesAIInCategory(p, cat)` → category override → top-level `usesAI` → `true`.

All consumers go through these helpers — no component reads `categoryEvidence` directly.

## UI changes (read-only, minimal)
On `ProductDetails.tsx` and any evidence/training/evaluation panels that today render the top-level blocks:

1. If `categoryEvidence` is absent → render exactly as today (no visual change).
2. If present → render a tabbed view (shadcn `Tabs`) with one tab per category from `getCategoriesForProduct`. Each tab shows that category's resolved Training Data, Evaluation Data, Evidence list, and the E/I/R chips + notes.
3. Category filtering on `Products.tsx` / `categories/*` already uses `category` + `secondaryCategories`; update the evidence chips shown on cards to use the **resolved values for the currently filtered category** when one is active (otherwise show top-level).

No changes to the edit/draft flow in this pass — visual editor keeps writing the top-level fields; per-category edits are a follow-up.

## Data changes

### MRCAT Prostate + Auto-Contouring (`src/data/products/auto-contouring/philips.ts`)
- Move file to `src/data/products/image-synthesis/philips-mrcat-prostate.ts` (primary category becomes Image Synthesis — MRCAT is the headline capability and is non-AI; auto-contouring is the AI add-on).
- `category: "Image Synthesis"`, `secondaryCategories: ["Auto-Contouring"]`.
- Top-level `usesAI: true` (product as a whole ships a DL component).
- New `categoryEvidence`:
  - `"Image Synthesis"`: `usesAI: false`, notes "MRCAT uses a model-based (atlas/Bayesian) bulk-density approach, not deep learning"; training/evaluation grounded in K150965 + Köhler 2015 white paper.
  - `"Auto-Contouring"`: `usesAI: true`, keeps the existing K150965 < 1.5 mm average-distance evaluation; flags that no DL-specific peer-reviewed validation exists (E0).
- Update `src/data/products/auto-contouring/index.ts` and `src/data/products/image-synthesis/index.ts` exports accordingly.
- Verify `usesAI: false` does not exclude the product from the catalogue (top-level stays `true`); the inclusion gate operates on top-level `usesAI` per project memory.

### Sweep of the 19 multi-category products
Triaged into three buckets — no fabrication, only split when public sources exist.

**Add `categoryEvidence` (split is meaningful, sources exist):**
- `image-synthesis/spectronic.ts` — sCT (Persson MR-OPERA 2017, Bird 2024) vs auto-contouring add-on (sparse).
- `image-synthesis/therapanacea-adaptbox.ts` — sCT vs Annotate auto-contour module.
- `platform/mvision.ts` — Image Synthesis vs Registration vs Treatment Planning vs Auto-Contouring; each has its own publication trail.
- `auto-contouring/varian-ethos.ts` — Ethos contouring (Sibolt 2021 etc.) vs IOE planning evidence.
- `auto-contouring/varian-siemens-healthineers.ts` — contouring vs planning.
- `treatment-planning/wisdom-tech.ts` — planning vs auto-contouring add-on.
- `auto-contouring/synaptiq.ts` — contouring vs registration.

**Keep shared (no real per-task split available):** the remaining archived/pipeline/performance-monitor entries. Mark with a one-line `notes` in the relevant block instead of inventing `categoryEvidence`.

For each split: training/evaluation entries are pulled from the existing `evidence[]` array on the product (which already has DOIs/K-numbers) — no new external lookups required beyond what is already cited.

### Bump dates
`lastUpdated` and `lastRevised` → `2026-06-13` on every edited product file.

## Verification
- `tsc` clean (build is auto-run).
- Open the MRCAT product page in preview, confirm the two-tab evidence view and that the Image Synthesis tab shows `usesAI: false`.
- Open one of the spectronic / mvision / ethos pages, confirm tabs render and per-tab E/I/R chips reflect overrides.
- Filter `/products?category=Image+Synthesis`, confirm MRCAT now appears.
- Filter `/products?category=Auto-Contouring`, confirm MRCAT still appears (via secondary).
- Spot-check a single-category product (e.g. `philips-mrcat-brain`) — no tabs, no visual change.

## Memory update
Add a `mem://data/category-scoped-evidence` memory describing the `categoryEvidence` field and the resolution rule (per-category overrides top-level; top-level remains the aggregate / default).
