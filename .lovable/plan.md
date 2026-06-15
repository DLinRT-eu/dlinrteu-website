## Goal

Sweep every active product's `evidence[]`, `keyPapers[]`, `trainingData.source(Url)`, `evaluationData.source(Url)`, and free-text `clinicalEvidence` / `evidenceRigorNotes` / `clinicalImpactNotes` to confirm every cited reference **directly evaluates the specific product at hand**. Flag and remove/relabel any reference that:

- evaluates a *different* product in the same category (e.g. MR-OPERA cited under Philips MRCAT — MR-OPERA studied a different sCT pipeline),
- is a generic methodology / category review,
- cannot be verified against an accessible abstract,
- is a hallucinated DOI / title / author combination.

No invented replacements. If a product loses its only direct reference, its `evidenceRigor` is re-scored accordingly (typically down to E0/E1 with explicit notes).

## Scope

All ~91 active products under `src/data/products/**` (exclude `archived/`, `examples/`, `pipeline/` unless flagged in prior wave). Per-category waves to keep PRs small:

1. Image Synthesis (start here — MRCAT issue lives here)
2. Auto-Contouring
3. Treatment Planning
4. Registration, Reconstruction, Tracking, Image Enhancement
5. Clinical Prediction, Performance Monitor, Platform

## Workflow per product

1. **Extract citations**: enumerate every reference object in `evidence[]`, `keyPapers[]`, plus `source` / `sourceUrl` on `trainingData` and `evaluationData` (and per-category overrides in `categoryEvidence`).
2. **Verify product specificity** for each citation:
   - Resolve DOI / URL → fetch abstract via `websearch--web_search` + `code--fetch_website`.
   - Decide: **direct** (paper names/uses this product or its model build), **indirect** (same category, different product/pipeline), **methodology** (generic technique paper), **unverifiable** (404, behind paywall with no abstract match), **hallucinated** (DOI does not resolve or metadata does not match cited title/authors).
3. **Record outcome** per citation in a CSV row: `product_id, citation_index, type, title, doi/url, verdict, evidence_quote, action`.
4. **Propose actions** (no edits yet):
   - `keep` — direct reference, accurately labelled.
   - `relabel` — keep but mark `level: "indirect"` / move to `limitations` or notes when it's a category-level reference (only if the product entry itself already framed it that way).
   - `remove` — indirect, methodology, unverifiable, or hallucinated → remove from `evidence[]`/`keyPapers[]`.
   - `rescore` — if removal changes the evidence base, propose new `evidenceRigor` / `clinicalImpact` with rationale.
5. **No hallucinated replacements.** Do not add new papers in this sweep. If a product ends with zero direct evidence, that is reported truthfully.

## Deliverables (per wave)

Written to `/mnt/documents/`:

- `evidence-verification-<DATE>-<wave>.md` — per-product report (citations table + verdicts + rescoring proposals).
- `evidence-verification-<DATE>-<wave>.csv` — one row per citation with verdict + suggested action.
- `evidence-verification-<DATE>-<wave>-rescoring.csv` — id, current E/I, proposed E/I, rationale.

## Implementation (build mode)

- New script `scripts/evidence-verification-sweep.ts` that:
  - loads a category (reusing `scripts/audit-swarm.ts` loader pattern),
  - emits a worklist of citations to a JSON file,
  - prints a per-product summary;
  the actual abstract lookup / verdict is then done by the agent using `websearch--web_search` + `code--fetch_website` and recorded back into the CSV. (LLM-in-the-loop, not auto-LLM, to avoid hallucinated verdicts.)
- Edits to product `.ts` files happen **only in a follow-up confirmed pass**, one PR per category, after you sign off on the worklist — consistent with the Minimal Intervention policy.

## Hard rules (anti-hallucination)

- Every `remove` verdict must cite the abstract URL + a quoted sentence proving the paper does not study this product.
- Every `keep` verdict must cite the abstract URL + a quoted sentence naming the product or its model.
- No citation is added in this sweep. Period.
- No score is raised in this sweep; only lowered or held.

## Open questions before I start

1. **Wave 1 scope** — start with **Image Synthesis only** (4 MRCAT + sCT peers, ~10 products) as a pilot, then expand? Or run all 91 in one batch?
2. **Treatment of "indirect but plausibly informative" papers** (e.g. a multi-vendor sCT benchmark that *includes* MRCAT alongside others) — `keep` with a `level: "indirect-comparative"` label, or `remove`?
3. **Pipeline products** (`src/data/products/pipeline/`) — include or skip?
