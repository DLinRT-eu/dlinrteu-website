# Transparency audit — trainingData & evaluationData

## Goal
Audit every active `ProductDetails` entry for the `trainingData` and `clinicalEvaluation` / `evaluationData` fields and produce a worklist of what is missing, weak, or fixable from public sources (peer-reviewed papers, FDA 510(k) summaries, CE technical briefs, vendor white papers). No product `.ts` files are edited in this pass — per the Minimal Intervention policy, edits happen in a separate, user-confirmed wave.

## Scope
- ~108 active products in `src/data/products/**` (excluding `archived/` and `examples/`).
- Baseline: only 3 files currently reference `trainingData` / `evaluationData` — the gap is large.
- "Where it makes sense" filter: AI/DL products whose function depends on a trained model (auto-contouring, image enhancement, image synthesis, dose/clinical prediction, registration, treatment planning, reconstruction, tracking). Pure orchestration/QA platforms without a trained model are marked `n/a — non-model product`.

## Approach
Use the **product-audit-swarm** skill (`knowledge://skill/product-audit-swarm/`), scoped to two roles only — **Transparency** and **Evidence** (for the clinical-evaluation cross-check) — instead of the full 8-role sweep.

Per product the audit captures:

**trainingData**
- presence (yes / partial / missing / n/a)
- dataset name(s), size (patients / images), modality, anatomy
- multi-centre / multi-national / vendor-independent flags
- public source citation (DOI, FDA K-number, vendor URL)
- proposed value if a defensible public source exists

**evaluationData / clinicalEvaluation**
- presence (yes / partial / missing / n/a)
- cohort size, sites, prospective vs retrospective, external validation
- endpoints (DSC/HD for contouring, MAE/PSNR for synthesis, dose metrics, clinical outcomes)
- linked `keyPapers` already in the record vs new candidates
- alignment with current `(E, I)` score — flag mismatches

## Workflow
1. **Bootstrap** — read `docs/FIELD_REFERENCE.md`, `docs/review/GUIDE.md`, `src/data/evidence-impact-levels.ts`, and the skill's `references/*` once.
2. **Enumerate** with the skill's `enumerate_products.sh` to get the worklist (~108 ids).
3. **Per product** run Transparency + Evidence roles. Use `websearch--web_search` (PubMed, DOI, FDA 510(k) DB, vendor docs) only when the product is plausibly model-backed and no in-repo source exists. Time-boxed: ≤2 lookups per product.
4. **Parallelism** — spawn `acp_subagent--explore` background tasks in waves of ~10 products to keep context lean.
5. **Compile** per the skill's output format. Severity rubric:
   - `error` — claims a clinical-evaluation paper that doesn't exist / doesn't match.
   - `warn` — model-backed product with empty `trainingData` or `evaluationData` while a public source clearly exists.
   - `info` — neutral observation, or genuine absence of public info (vendor never disclosed).

## Deliverables (to `/mnt/documents/`)
- `transparency-audit-<YYYY-MM-DD>.md` — per-product report (8-role stubs collapsed to Transparency + Evidence)
- `transparency-audit-<YYYY-MM-DD>.csv` — one row per finding (`id, field, status, severity, proposed_value, source`)
- `transparency-audit-<YYYY-MM-DD>-fillable.csv` — subset where a defensible public source exists, ready to drive a follow-up edit PR wave

Surfaced via `<presentation-artifact>` tags. No product files modified in this turn.

## Follow-up (separate, user-confirmed)
After review, edit in category-sized waves (auto-contouring first — largest gap), one PR per wave, preserving existing UX and only adding the two transparency fields plus any missed `keyPapers`.

## Open questions
1. **Scope cap** — full ~108 products in one run, or start with auto-contouring (~30) as a pilot to validate the format before fanning out?
2. **Source strictness** — accept vendor white papers / regulatory summaries as `trainingData` source, or restrict to peer-reviewed publications only?
3. **n/a products** — confirm that pure platforms / non-AI performance monitors should appear in the report as explicit `n/a` rows (for completeness) rather than be silently skipped.
