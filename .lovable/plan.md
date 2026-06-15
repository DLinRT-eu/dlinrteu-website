## What the appendix actually discloses (pp. 134–138)

Vendor verification & validation (V&V), with data "obtained from clinical partner sites":

| Metric | Prostate | Pelvis | Brain | Head & Neck |
|---|---|---|---|---|
| Evaluated RTgo version | 3.0 | 4.1 | 4.0 | 5.0 |
| **Hospitals contributing data (dose)** | **2** | **4** | **3** | **6** |
| **Patients across all hospitals (dose)** | **62** | **103** | **138** | **85** |
| (D_MRCAT − D_CT)/D_CT to PTV — Mean ± SD [%] | −0.23 ± 0.22 | −0.31 ± 0.51 | −0.02 ± 0.24 | 0.02 ± 0.27 |
| Min / Max [%] | −0.87 / +0.92 | −1.71 / +0.46 | +0.97 / +0.82 | +0.82 / +0.97 |
| Primary gamma criterion | 3%/3 mm | 3%/3 mm | 2%/2 mm | 2%/2 mm |
| Median gamma | 0.10 (0.03) | 0.15 (0.09) | 0.07 (0.03) | 0.09 (0.02) |
| % voxels passing gamma | 100 (0.01) | 99.9 (0.64) | 99.9 (0.22) | 99.7 (0.50) |
| Additional 1%/1 mm gamma — % voxels passing | – | – | 99.0 (2.2) | 97.9 (2.3) |
| Body-outline matching applied? | No | No | No | Yes |
| Positioning study — hospitals / patients | 1 / 9 | 1 / 11 | 2 / 138 | 6 / 85 |
| Setup vehicle | DRR | DRR | DRR + CBCT | DRR + CBCT |

(Source: Philips Ingenia MR-RT IFU, RTgo 5.12, 3000 113 93922/781, 2024-06, "Performance overview of MRCAT", Tables 14–17, pp. 134–138.)

## Impact on evidence levels (per DLinRT rubric)

This is **vendor V&V data**, not independent peer-reviewed evidence, so it does not by itself promote `evidenceRigor`. But it materially improves transparency and changes several attribute flags.

| Product | Current E / I / R | Proposed E / I / R | Rationale |
|---|---|---|---|
| MRCAT Brain | E1 / I1 / R3 | **E1 / I1 / R3 (unchanged); flip `evidenceMultiCenter` → true** | IFU now discloses 3 hospitals × 138 patients vendor V&V. Rigor remains E1: independent peer-reviewed study (Aljaafari 2025) is still single-centre; vendor V&V adds multi-centre quantitative results but isn't independent. |
| MRCAT Head & Neck | E1 / I2 / R2 | **E1 / I2 / R2 (unchanged); flip `evidenceMultiCenter` → true; bump `adoptionReadiness` to R3** | IFU discloses 6 hospitals × 85 patients vendor V&V with stringent 1%/1 mm gamma. Combined with Buschmann 2026 peer-reviewed evidence, this justifies R3 (moderate effort) rather than R2. Rigor stays E1 (peer-reviewed evidence is still single-centre n=10). |
| MRCAT Pelvis | E1 / I1 / R3 | **E1 / I1 / R3 (unchanged); keep `evidenceMultiCenter: true`** | Already E1 with MR-OPERA. IFU adds vendor V&V (4 hospitals × 103 patients) — strengthens transparency but doesn't change rubric placement. |
| MRCAT Prostate (Image-Synthesis category) | E2 / I1 (categoryEvidence) | **E2 / I1 (unchanged)** | Already E2 from multiple independent peer-reviewed studies. IFU vendor V&V (2 hospitals × 62 patients) is consistent with and complements those results. No score change; quantitative numbers added for transparency. |

No `clinicalImpact` changes — these are technical V&V results, not clinical outcomes.

## File-by-file edits

For each of the four files, in the existing `evaluationData` (and `categoryEvidence["Image Synthesis"].evaluationData` for Prostate), append a sentence summarising vendor V&V cohort size, sites, dose-difference numbers, and gamma pass rates, with explicit IFU citation. Add or set the multi-centre attribute flags. Bump `lastRevised` to 2026-06-15.

**MRCAT Brain (`philips-mrcat-brain.ts`)**
- Extend `evaluationData.results` and `evaluationData.description` with: "Vendor V&V (Philips IFU RTgo 5.12 appendix): 3 hospitals × 138 patients; mean (D_MRCAT−D_CT)/D_CT to PTV = −0.02 ± 0.24%; primary 2%/2 mm gamma pass rate 99.9 ± 0.22%; additional 1%/1 mm pass 99.0 ± 2.2%."
- Add `evidenceMultiCenter: true` and a short note on the rigor field.
- Append IFU URL + retrieval date to `source`.

**MRCAT Head & Neck (`philips-mrcat-head-neck.ts`)**
- Extend `evaluationData.results`/`description` with: "Vendor V&V (Philips IFU appendix): 6 hospitals × 85 patients; mean PTV dose difference 0.02 ± 0.27%; 2%/2 mm gamma pass 99.7 ± 0.50%; stricter 1%/1 mm pass 97.9 ± 2.3% (body-outline matched)."
- Add `evidenceMultiCenter: true`; raise `adoptionReadiness` from R2 → R3 with updated `adoptionReadinessNotes`.
- Append IFU citation to `source`.

**MRCAT Pelvis (`philips-mrcat-pelvis.ts`)**
- Extend `evaluationData.results`/`description` with: "Vendor V&V (Philips IFU appendix): 4 hospitals × 103 patients; mean PTV dose difference −0.31 ± 0.51% (range −1.71 to +0.46%); 3%/3 mm gamma pass 99.9 ± 0.64%."
- Keep `evidenceMultiCenter: true` (already set).
- Append IFU citation to `source`.

**MRCAT Prostate (`philips-mrcat-prostate.ts`)**
- Extend `categoryEvidence["Image Synthesis"].evaluationData.results` and `.description` with: "Vendor V&V (Philips IFU RTgo 5.12 appendix): 2 hospitals × 62 patients; mean PTV dose difference −0.23 ± 0.22% (range −0.87 to +0.92%); 3%/3 mm gamma pass 100.0 ± 0.01%."
- No flag changes (already multi-center, multi-national, vendor-independent).
- Append IFU citation to `categoryEvidence` `source` and top-level `source`.

## What I will not change

- `trainingData` cohorts — the IFU appendix is a **validation** cohort from "clinical partner sites", not a training cohort. Philips still does not disclose the training set composition for any MRCAT variant.
- `evidenceRigor` for any product — vendor V&V does not satisfy DLinRT's vendor-independent requirement for E ≥ E2 by itself. Prostate already had E2 from independent peer-reviewed studies.
- `clinicalImpact` — V&V results are technical, not clinical outcomes.

If you approve, I'll switch to build mode and apply the four file edits with the above edits and bump `lastRevised`.