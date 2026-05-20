## Execute the Product Audit Swarm — Full Sweep + Implementation Plan

Full sweep across all 90 active product files (~107 ProductDetails entries) using the `product-audit-swarm` skill. Output is report-only (no `.ts` edits this round), plus a phased execution plan for the follow-up edit waves.

### Why this needs to be staged

One turn cannot:
- Read 90 TS files in full + 50+ docs/memories + 90+ PubMed queries.
- Synthesise 90 per-product Markdown blocks + two CSVs.
- Stay within reasonable web-search and runtime budgets.

So the sweep runs in **6 category waves**, each self-contained, with intermediate artefacts merged at the end.

### Wave breakdown (by category folder under `src/data/products/`)

```text
Wave 1  Auto-Contouring          ~22 files   heaviest (structures + evidence)
Wave 2  Treatment Planning       ~7  files   evidence-heavy (dose prediction)
Wave 3  Image Synthesis +         ~12 files   transparency-heavy
        Image Enhancement +
        Reconstruction
Wave 4  Registration + Tracking  ~6  files
Wave 5  Clinical Prediction +    ~15 files   evidence-heavy
        Performance Monitor
Wave 6  Platform + Pipeline +    ~28 files   varied; cross-check intensive
        residual (companies xref)
```

Wave membership is finalised by running `bash /tmp/enumerate_products.sh <category>` at the start of each wave.

### Per-wave procedure (per the skill)

1. **Bootstrap once per wave**: cache `docs/FIELD_REFERENCE.md`, `docs/review/GUIDE.md`, `src/data/evidence-impact-levels.ts`, and the skill references.
2. **Enumerate** the wave's worklist.
3. **Per product**, run the 8 roles per `references/roles.md`:
   - Parallel batch: Identity, Inclusion, Regulatory, Technical, Structures, Transparency.
   - Then: 1 timeboxed PubMed query for Evidence (skipped when `evidenceRigor === 'E0'` and `lastRevised` < 90 days).
   - Cross-check uses the in-memory registry built in step 1.
4. **Compile** Markdown block + CSV rows per `references/output-format.md`.
5. **Append** to wave artefacts:
   - `/mnt/documents/product-audit-2026-05-20-wave<N>.md`
   - `/mnt/documents/product-audit-2026-05-20-wave<N>.csv`
   - `/mnt/documents/product-audit-2026-05-20-wave<N>-rescoring.csv`

### Final merge (after wave 6)

A short Python script concatenates the six wave artefacts into the three canonical files referenced by the skill:
- `product-audit-2026-05-20.md`
- `product-audit-2026-05-20.csv`
- `product-audit-2026-05-20-rescoring.csv`

Plus a top-level summary block: total files, total findings by severity, count of proposed score changes, and a per-category breakdown table.

### Deliverables this turn

This planning turn does **not** start wave 1 (plan mode forbids edits and large execution). The next turn (build mode) starts at Wave 1.

After the user approves this plan, each subsequent build-mode turn executes **one wave** and surfaces its three artefacts via `<presentation-artifact>`. The user can then say "continue" to proceed to the next wave. This keeps each turn within budget and lets the user spot-check before committing to the next wave.

### Implementation plan for the follow-up edit passes (out of scope this round)

Once all six waves are complete and the merged report is reviewed, edits land in **6 PRs**, one per wave, each scoped to a single category. Each PR:

1. Applies the `error`-severity fixes from that wave's CSV (broken URLs, regulatory mismatches, structure-naming violations, inclusion violations).
2. Applies the `warn`-severity fixes the user confirms (E/I/R re-scoring, `keyPapers` additions, DICOM nomenclature normalisation, transparency-schema gaps).
3. Bumps `lastRevised` on every product in that wave.
4. Adds a `changelog_entries` row summarising the wave.
5. Opens a review round in `/admin/review-rounds` with that wave's products and a 4-week deadline (reusing the round infrastructure from the prior plan).

The user has already approved this 4-wave reviewer-round structure in an earlier turn; this audit just makes it 6 waves and gives each round a concrete findings worklist.

### Out of scope

- Editing any `.ts` product files this round.
- Re-running the evidence rubric definitions.
- Company-only audit.
- In-app feature work.
