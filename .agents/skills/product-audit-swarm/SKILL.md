---
name: product-audit-swarm
description: Use when the user asks to audit, sweep, re-review, re-score, compile a report on, or check the consistency of DLinRT.eu products. Triggers on "audit the products", "run the product swarm", "compile a product review", "re-score evidence for all products", "check products for inconsistencies", "product QA pass". Runs a multi-role agent swarm over `src/data/products/<category>/*.ts`, aligned to `docs/FIELD_REFERENCE.md`, `docs/review/GUIDE.md`, the inclusion policy, and the dual-axis evidence rubric, and emits Markdown + CSV audit artefacts under /mnt/documents/.
---

# Product Audit Swarm

Coordinated audit of every active `ProductDetails` entry. Specialised roles each check one slice of the schema; a Compiler merges their findings into one report per product. No product files are auto-edited — output is a worklist for a separate, confirmed edit pass.

## When to use

- "Audit the products" / "run the product audit swarm" / "compile a product report".
- "Re-score evidence for all products" after the rubric changes.
- "Check products for inconsistencies" or pre-release QA sweeps.
- Optionally scoped to one `--category` folder or one product `id`.

Do not use for company-only audits, in-app feature work, or auto-editing product `.ts` files.

## Workflow

1. **Bootstrap** — read once per session and cache:
   - `docs/FIELD_REFERENCE.md` (field semantics)
   - `docs/review/GUIDE.md` (review rubric)
   - `src/data/evidence-impact-levels.ts` (E/I/R definitions)
   - `references/scoring-rubric.md`, `references/inclusion-policy.md`, `references/roles.md`, `references/output-format.md` from this skill
2. **Enumerate** the worklist:
   ```bash
   code--copy knowledge://skill/product-audit-swarm/scripts/enumerate_products.sh /tmp/enumerate_products.sh
   code--exec bash /tmp/enumerate_products.sh             # all categories
   code--exec bash /tmp/enumerate_products.sh auto-contouring   # one category
   code--exec bash /tmp/enumerate_products.sh --id raysearch-raystation
   ```
   Excludes `archived/` and `examples/`.
3. **Per product, run roles** (definitions in `references/roles.md`). Roles independent of each other run in parallel within a single `code--exec` batch:
   - Independent: Identity, Inclusion, Regulatory, Technical, Structures, Transparency.
   - Sequential: Evidence (after `websearch--web_search` PubMed/DOI lookup), then Cross-check (uses cached registry).
4. **Compile** one Markdown block per product following `references/output-format.md`. Each finding carries a severity (`error|warn|info`) per the rubric below.
5. **Aggregate** three artefacts to `/mnt/documents/`:
   - `product-audit-<YYYY-MM-DD>.md` — full per-product report
   - `product-audit-<YYYY-MM-DD>.csv` — one row per finding
   - `product-audit-<YYYY-MM-DD>-rescoring.csv` — id, current E/I/R, proposed E/I/R, rationale
6. **Hand off** the artefacts with `<presentation-artifact>` tags. Stop. Do not edit product `.ts` files in the same turn — the Minimal Intervention policy requires a separate, user-confirmed edit pass, ideally one PR per category wave.

## Severity rubric

- **error** — invalid enum, broken URL, duplicate `id`, archived-company reference from a live entry, AI/DL inclusion violation, `certification` summary disagrees with `regulatory.*`, missing required field.
- **warn** — recommended field missing for the assigned `(E,I,R)` (e.g. `keyPapers` empty at E ≥ E1), `lastRevised` > 180 days, DICOM nomenclature drift, structure name not in `Region: Structure Name` form.
- **info** — neutral observation or a re-scoring suggestion where the current score is defensible.

## Composability

When re-scoring requires summarising several abstracts, defer to the bundled AI Gateway skill: `knowledge://skill/ai-gateway/SKILL.md`. Fall back to `websearch--web_search` and `code--fetch_website` when the gateway is unavailable. Keep all queries timeboxed; record the search date in the per-product Sources Consulted section.

## Success criteria

- Worklist enumerated and product count printed.
- For every product in scope, the per-product Markdown block contains all eight role sections (or an explicit "n/a — reason" stub).
- Both CSVs parse cleanly and the row counts match the Markdown report.
- Artefacts surfaced via `<presentation-artifact>`; no product `.ts` files modified in this turn.
