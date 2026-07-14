# Product Audit Swarm — Quick Sweep

Run the static audit swarm across all active product categories to see if anything needs updating. No product `.ts` files will be edited in this pass — output is a worklist only, per the skill's Minimal Intervention policy.

## Scope

- All active categories under `src/data/products/` (excluding `archived/` and `examples/`).
- Wave label: `quick-<YYYY-MM-DD>`.

## Steps

1. Enumerate the product worklist and print counts per category.
2. Run `scripts/audit-swarm.ts` across every active category. This performs the static role checks (Identity, Inclusion, Regulatory, Technical, Structures, Evidence, Transparency, Cross-check) with no PubMed lookups.
3. Emit three artefacts to `/mnt/documents/`:
   - `product-audit-<DATE>-quick.md` — per-product findings
   - `product-audit-<DATE>-quick.csv` — one row per finding
   - `product-audit-<DATE>-quick-rescoring.csv` — placeholder rescoring rows
4. Summarise: totals by severity, top offending products, categories with the most warnings, and any freshness (`lastRevised > 180 days`) hotspots.
5. Recommend follow-up: whether a deep-review re-scoring pass is warranted, and which category to tackle first.

## Out of scope

- No edits to product `.ts` files.
- No PubMed/DOI re-scoring (deep review is a separate confirmed pass).
- No company or non-product content.

## Deliverables

Three files under `/mnt/documents/` surfaced back to you, plus a short summary in chat with recommended next actions.
