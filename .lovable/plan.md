## Part 1 — Revise United Imaging in `src/data/news/estro-2026-announcements.ts`

The current "United Imaging" pre-congress section (lines 40–44) states that the *only* AI/DL-specific component disclosed is the uCT 610 Sim Deep Learning Full-FOV reconstruction, and that other portfolio items "do not currently isolate an AI/DL component."

This is now inconsistent with the catalogue, which already includes three United Imaging entries with AI/DL components:

- `united-urt-auto-contouring` — Auto-Contouring, CE-marked (component of uRT-linac 506c)
- `united-urt-auto-planning` — Treatment Planning + GPU Monte Carlo, CE-marked (component of uRT-linac 506c)
- `united-uct610-sim-dl-recon-pipeline` — pipeline (pre-market)
- Existing `united-ucs-ai` (CBCT enhancement, CE) already in catalogue from earlier

### Edits

Rewrite the United Imaging pre-congress section to:

1. Keep the booth + microsite reference and the "AI-driven software ecosystem" framing.
2. List the AI/DL components now tracked in the catalogue:
   - **uRT Auto-Contouring** (CE, integrated in uRT-linac 506c; structure list unavailable)
   - **uRT Auto-Planning** + GPU Monte Carlo dose calculation (CE, powering the ~15-min uCT-ART online adaptive workflow)
   - **uCS-AI** (existing CBCT enhancement entry, CE)
   - **uCT 610 Sim — Deep Learning Full-FOV Reconstruction** (pipeline, "under development; not for sale or clinical use")
3. Keep the neutrality caveats: integrated components of the system-level CE marking, no model card / training-data / standalone intended-use documents published; performance claims are vendor-reported and not independently validated.
4. Keep the hardware-only items (uRT-linac 506c, uLinac HalosTx, uMR Omega, uMI Panorama) explicitly excluded per inclusion criteria.
5. Update the "Post-ESTRO catalogue updates" bullet for United Imaging to also reference the auto-contouring and auto-planning entries (already present today, just acknowledged).

### Revision-date check

All four United Imaging product files carry `lastRevised: "2026-05-19"` (or `2026-03-08` for `uCS-AI`). Using `src/utils/revisionUtils.ts` (`needsRevision` = >180 days):

- `united-urt-auto-contouring` — fresh, no revision needed
- `united-urt-auto-planning` — fresh, no revision needed
- `united-uct610-sim-dl-recon-pipeline` — fresh, no revision needed
- `united-ucs-ai` — ~73 days since last revision → not yet due, but flag for the next sweep

No `lastRevised` bumps are needed for the news edit (per the minimal-intervention policy).

---

## Part 2 — Full re-review of all 107 products against the updated dual-axis rubric

The dual-axis rubric in `src/data/evidence-impact-levels.ts` (Evidence Rigor E0–E3, Clinical Impact I0–I5, Adoption Readiness R0–R4, plus study-quality sub-attributes: `vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`) is now the canonical scoring system. Many existing entries were scored against an earlier rubric and need a structured pass.

### Scope

All 107 products under `src/data/products/<category>/`, excluding `archived/` and `examples/`. Pipeline entries stay E0/I0/R0 unless new evidence appears.

### Methodology (apply per product)

1. Re-read `evidenceRigorNotes`, `clinicalImpactNotes`, `adoptionReadinessNotes`, `clinicalEvidence`, `evidence[]`, `keyPapers[]`.
2. Re-score against the current rubric:
   - **Evidence Rigor (E0–E3)** using `EVIDENCE_RIGOR_LEVELS` criteria.
   - **Clinical Impact (I0–I5)** using `CLINICAL_IMPACT_LEVELS` (technical → workflow → clinical-process → patient-outcome → health-system).
   - **Adoption Readiness (R0–R4)** derived from (E, I, regulatory status).
3. Fill in the study-quality sub-attributes (`vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`) wherever evidence exists; these power the Evidence Impact Matrix dashboard.
4. Update `evidenceRigorNotes`, `clinicalImpactNotes`, `adoptionReadinessNotes` with the current rationale (1–3 sentences each, citing the strongest paper if any).
5. Bump `lastRevised` (and `lastUpdated` only if the underlying content actually changed) per `docs/review/GUIDE.md`.
6. Where peer-reviewed evidence is missing, do a targeted PubMed / vendor-site check (timeboxed) before defaulting to E0; record the search date in the notes.

### Batching strategy

Group by category to amortise reviewer context-switching:

```text
Wave 1 (largest, most published):     Auto-Contouring, Treatment Planning
Wave 2 (high-impact AI literature):   Image Synthesis, Image Enhancement, Reconstruction
Wave 3 (workflow + monitoring):       Registration, Tracking, Performance Monitor, Platform
Wave 4 (smaller, specialised):        Clinical Prediction, Pipeline (verify still pre-market)
```

Each wave ends with a short summary entry in `news/` (or as part of a quarterly changelog) describing the scoring deltas — no per-product news posts.

### Tooling / supporting work

- Extend `scripts/update-revisions.mjs` (or add a new `scripts/audit-evidence-scores.mjs`) to print, per product: current `(E, I, R)`, days since `lastRevised`, presence of `keyPapers`, and missing sub-attributes. This gives a worklist.
- Add a one-off CSV export of the worklist (e.g. `/tmp/evidence-audit.csv`) so reviewers can claim products in `ReviewAssignment` admin UI without re-deriving the list.
- Reuse the existing reviewer-round workflow (`/admin/review-rounds`) — create one round per wave, deadline 4 weeks out, assigned to the active reviewer pool.

### Out of scope for this plan

- Editing the rubric definitions themselves (`src/data/evidence-impact-levels.ts`).
- Re-running the matrix dashboard logic — it already reads the new fields.
- Changes to UI components.

### Deliverables

- News edit committed (Part 1).
- Audit script + CSV worklist.
- Four review rounds created in the admin UI, one per wave, with the worklist split across reviewers.
- A short "Evidence rubric re-review — Wave N complete" changelog entry after each wave closes.
