# Audit & Fix Recently Merged Product PRs

## Scope

48 PRs merged between 2026-05-13 and 2026-06-13 touched **25 product files** across `src/data/products/`. Most were `[Visual Edit]` PRs (auto-applied via the visual editor) plus ~10 hand-authored edits. Auditing the resulting *files* (not the diffs) ensures any drift, partial fixes, or schema regressions are caught regardless of which PR introduced them.

## Standard reference

Each touched product is checked against four pillars from project memory + docs:

1. **Field schema** — `docs/FIELD_REFERENCE.md`: required fields present, enums valid, URLs live, `lastRevised` recent, `githubUrl` correct, `usesAI`/`monitorsAIProducts` set correctly per category.
2. **Structure naming** — `mem://data/structure-naming-convention-v3`: every entry uses `Region: Structure Name`; `CTVn*` → Elective; `(investigational)` / `(unverified)` suffixes preserved; DICOM nomenclature respected.
3. **Evidence classification** — `docs/review/GUIDE.md` dual-axis (E0–E3 / I0–I5) with study-quality attributes (`vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`); `keyPapers` populated when E ≥ E1; DOIs/links resolve and actually concern the product (several merged PRs explicitly flagged wrong DOIs).
4. **Regulatory & inclusion gate** — `hasRegulatoryApproval` true only for recognized authorities (CE/FDA/MDR-exempt/NMPA/TGA/TFDA/PMDA/MFDS/Health Canada/ANVISA/MHRA/UKCA); AI/DL threshold (no classical/general QA misclassified as AI); `certification` summary matches `regulatory.*`.

## Method

Run the bundled **product-audit-swarm** skill scoped to the 25 touched files. Per product, execute the 8 roles (Identity, Inclusion, Regulatory, Technical, Structures, Transparency, Evidence, Cross-check), severity-tagged (error/warn/info).

### Files in scope (25)

```
auto-contouring/    ai-medical, brainlab, carina-ai, ever-fortune-ai, ge-healthcare,
                    manteia, medmind-technology-co-ltd, oncosoft, radformation,
                    raysearch-laboratories, synaptiq, taiwan-medical-imaging,
                    therapanacea, varian-siemens-healthineers, vysioneer
image-synthesis/    philips, philips-mrcat-head-neck, syntheticmr
performance-monitor/ mvision-ai, ptw
reconstruction/     canon-medical-systems, elekta, philips
platform/           manteia
pipeline/           ge-healthcare
```

## Deliverables

Written to `/mnt/documents/` and surfaced via `<presentation-artifact>`:

1. `pr-audit-2026-06-13.md` — per-product findings (8 sections each, severity-tagged).
2. `pr-audit-2026-06-13.csv` — one row per finding for triage.
3. `pr-audit-2026-06-13-rescoring.csv` — current vs. proposed E/I/R with rationale.

## Fixes

After the report, apply corrective edits in batches **grouped by category** (one logical change set per category folder) to keep diffs reviewable and respect the Minimal Intervention policy:

- **Errors first** — invalid enums, broken/wrong DOIs (already flagged in merged PRs like #75, #79, #84), missing required fields, regulatory↔certification mismatches, AI/DL inclusion violations.
- **Warns next** — `Region: Structure Name` reformat, CTVn → Elective reclassification, missing `keyPapers` at E ≥ E1, stale `lastRevised`.
- **Info** — re-scoring suggestions surfaced for your approval before applying (rescoring CSV).

No structural refactors, no UI changes, no edits outside the 25 files unless an error there points to a shared util (in which case it's called out separately for confirmation).

## Out of scope

- Visual-editor approval pipeline behavior
- Company files, news, changelog
- Products *not* touched by a merged PR in the window

Approve to switch to build mode and run the audit + apply fixes.
