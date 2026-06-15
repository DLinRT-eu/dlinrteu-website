# Source disclosure policy + full product audit

Three threads: (1) make "every claim has a disclosed source" a first-class, enforced policy; (2) add a small pattern for vendor-provided, non-public information with a retrieval date; (3) run the product audit swarm and deliver a per-product worklist (no in-place edits in the same pass).

## 1. Source-disclosure policy (common ground)

Single normative statement, mirrored everywhere it can influence behavior:

- **Every product field that asserts a fact (training data, evaluation data, structures, evidence, regulatory, dose models, safety actions) must be traceable to a disclosed source.**
- **Public sources are preferred** (peer-reviewed paper, DOI, FDA 510(k), CE summary of safety, vendor public web page, GitHub).
- **If the source is not publicly accessible** (vendor email, NDA briefing, conference handout, login-gated portal), it must be marked as such and carry a **retrieval date** in `YYYY-MM-DD`.
- Applies equally to: the website (UI badges + tooltips), human reviewers (review guide), and AI agents (audit swarm, edit-draft assistants, future automations).

Where this gets written / surfaced:

- `docs/FIELD_REFERENCE.md` — new top-level "Source disclosure" section, plus a row added to every `source` / `sourceUrl` row table referencing it.
- `docs/review/GUIDE.md` — new "Sourcing rules" subsection; reviewers reject edits that add factual fields without a source.
- `README.md` (Product addition guide) — short paragraph + link.
- `knowledge://skill/product-audit-swarm/references/inclusion-policy.md` and `roles.md` — Transparency role gains a "missing/undisclosed source" error class.
- New `mem://policy/source-disclosure` memory + Core index line so every future agent action enforces it by default.

## 2. Vendor-provided / non-public source pattern

Extend the existing `source` / `sourceUrl` convention with two optional, additive fields on any block that already has `source`:

```
source: "Vendor-provided (Synaptiq, email to maintainers)"
sourceUrl: undefined                       // omitted because not public
sourceAccess: "vendor-provided" | "public" | "regulatory" | "restricted"
sourceRetrievedOn: "2026-06-13"            // YYYY-MM-DD, required when sourceAccess !== "public"
```

- Added to `ProductDetails` blocks that already carry `source`: `trainingData`, `evaluationData`, `supportedStructures[]` (new optional `provenance` sub-object), `keyPapers[]` (optional), `safetyCorrectiveActions[]`, and the top-level `evidence` entries.
- Strictly additive — existing entries without these fields stay valid; the audit treats missing `sourceAccess` as `"public"` only if `sourceUrl` resolves.
- UI: small "Vendor-provided · retrieved YYYY-MM-DD" chip on the product detail page next to the affected section, using existing tooltip primitives. No new design tokens.

### Apply to Synaptiq Mediq RT

- Locate the Synaptiq product (likely `src/data/products/auto-contouring/synaptiq.ts` or similar — confirm during build phase).
- Mark its `supportedStructures` block with `sourceAccess: "vendor-provided"`, `sourceRetrievedOn: "2026-06-13"`, `source: "Vendor disclosure (Synaptiq), structures list not on public website as of retrieval date"`.

## 3. Full product audit swarm

Run the bundled `product-audit-swarm` skill across all active products (~93 files, excluding `archived/` and `examples/`). Focus areas per user request:

- Accuracy and completeness of `trainingData` and `evaluationData` (sizes, geography, modality, source disclosure).
- Per-task evidence (use existing `categoryEvidence`; flag products where a secondary category lacks its own E/I/R when the rubric warrants it).
- Regulatory ↔ certification consistency.
- Structure nomenclature ("Region: Structure Name", status suffixes).
- DICOM nomenclature drift.
- New: every factual field has a disclosed source per §1; warn on missing `sourceAccess`/`sourceRetrievedOn` for non-public sources.

Deliverables to `/mnt/documents/`:

- `product-audit-2026-06-15.md` — per-product report, all eight role sections.
- `product-audit-2026-06-15.csv` — one row per finding (id, field, severity, message).
- `product-audit-2026-06-15-rescoring.csv` — id, task/category, current vs proposed E/I/R, rationale.

Surfaced via `<presentation-artifact>` tags. **No `.ts` product files edited in the audit pass** — per Minimal Intervention, a follow-up confirmed edit pass (ideally one PR per category wave) applies the fixes.

## Order of execution

1. Policy docs + memory + audit-swarm references updated (§1).
2. Type addition + UI chip + Synaptiq Mediq RT edit (§2).
3. Audit swarm run, artefacts delivered (§3).

## Technical details

- Type change in `src/types/productDetails.d.ts`: add optional `sourceAccess` and `sourceRetrievedOn` to the existing `source`-bearing interfaces; introduce a small `SourceProvenance` helper type to avoid repetition.
- UI: extend the existing source-rendering helper (search for current `source` / `sourceUrl` rendering under product detail components) to render the provenance chip; no new components if an existing badge primitive fits.
- Memory: `mem://policy/source-disclosure` (constraint type) + one Core line in `mem://index.md`.
- Audit: run roles in parallel per product as the skill prescribes; cap PubMed/DOI lookups via `websearch--web_search` with a per-product timebox; record the retrieval date in each product's "Sources Consulted" section.

## Open question before build

Two scope choices worth confirming so the audit doesn't have to re-run:

- Should the audit also re-score `categoryEvidence` per task where warranted, or only flag mismatches and leave re-scoring to a later pass?
- For the vendor-provided chip in the UI: show it only on the product detail page, or also as a small marker on product cards in list views?
