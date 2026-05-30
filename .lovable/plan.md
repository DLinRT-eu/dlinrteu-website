# Revise `intendedUseStatement` to verbatim vendor declarations

## Goal

For every active product whose `intendedUseStatement` is missing or a generic stub (e.g. "For automatic segmentation of organs at risk in radiation therapy planning."), replace it with the vendor's own declared intended use — verbatim, quoted, with the source cited.

## Scope

Audit identified **~49 candidates** across active product files:

- **~41 products** with generic stub statements (length < 120 chars, e.g. boilerplate "For automatic segmentation…", "For use in treatment planning…", "For radiation therapy treatment planning and dose calculation.").
- **~8 pipeline products** missing the field entirely (`pipeline/ge-healthcare.ts`, `pipeline/medlever.ts` ×2, `pipeline/synaptiq.ts`, `pipeline/therapanacea.ts` ×3, `pipeline/united-imaging.ts`).
- Out of scope: products already carrying a substantial vendor-derived statement (≥ ~120 chars and product-specific), archived products, and `examples/` stubs.

## Source hierarchy (per user)

1. **Regulatory filings first** — FDA 510(k) Summary "Indications for Use", CE IFU/Declaration of Conformity, TGA/TFDA equivalents.
2. **Vendor product page** if no public regulatory text is accessible.
3. **Pre-market / pipeline products** — vendor disclosure (press release, ESTRO booth communication, product website "Coming soon"). Mark explicitly as developmental.
4. If neither is accessible → leave the existing text but flag in audit notes; do **not** invent.

## Format (per user)

- Verbatim quote inside double quotes inside the string, e.g.:
  ```ts
  intendedUseStatement: "\"<verbatim vendor wording>\" (Source: FDA 510(k) K232799 Summary)."
  ```
- Append a short parenthetical source citation: 510(k) number, CE IFU section, or URL with retrieval date for vendor pages.
- Update the product's existing `source` field if the new citation adds a reference not yet listed.
- Where the vendor wording exceeds ~2 sentences, quote the operative indications-for-use sentence(s) only; do not paraphrase.

## Execution plan — waves

Because this touches ~49 product files across 8+ category folders and each lookup requires a web/regulatory search, ship as sequential category waves. Each wave = one user-confirmed PR-sized batch.

1. **Wave 1 — Pipeline** (8 products, missing field). Verbatim from vendor press releases / product pages already cited in `source`. Lowest risk: most have explicit "not for clinical use" disclaimers to quote.
2. **Wave 2 — Auto-Contouring** (largest cluster of generic stubs). Prioritise products with FDA 510(k) clearance numbers already in `regulatory.fda.clearanceNumber` — fetch the Summary from accessdata.fda.gov.
3. **Wave 3 — Image Synthesis + Reconstruction + Image Enhancement**.
4. **Wave 4 — Treatment Planning + Registration + Tracking**.
5. **Wave 5 — Performance Monitor + Clinical Prediction + Platform**.

Each wave will:
- Use `acp_subagent--spawn_agent` in parallel (one agent per ~5 products) to fetch FDA 510(k) Summaries (preferred) or vendor product pages and return the verbatim "Indications for Use" / "Intended Purpose" text + source URL.
- Apply edits via `code--line_replace` per file.
- Update `lastRevised` on each touched product (consistent with project convention).
- Produce a per-wave summary listing: product id, old text, new text, source URL.

## Technical details

- Field lives on `ProductDetails.regulatory.intendedUseStatement` (string). No schema change needed.
- Edits are data-only under `src/data/products/**`; no UI, type, or runtime code is touched.
- Build remains green: field is already optional / free-text.
- "Minimal Intervention" memory respected: only `intendedUseStatement`, `lastRevised`, and (when adding a new citation) `source` are modified per product.

## What this plan does NOT do

- Does not regenerate or auto-edit the entire product catalogue.
- Does not re-score evidence (E/I/R) — separate workflow.
- Does not touch products whose current statement is already substantive and clearly vendor-derived.
- Does not invent text when the vendor source is inaccessible — those products are listed in the wave report for manual follow-up.

## Deliverable for approval

On approval, I will start with **Wave 1 (Pipeline, 8 products)** and return:
- The edited files,
- A short table of `id | source | verbatim quote` for your review,
before proceeding to Wave 2.
