## Plan: Update Plan AI (Sun Nuclear) per vendor feedback

Single file edit: `src/data/products/treatment-planning/sun-nuclear.ts`

### 1. Regulatory
- `ce.status`: `"ce_mark"`, `ce.class`: `"Class IIb"`, `ce.notes`: `"CE Marked, Class IIb. Notified body: BSI."`
- `certification`: `"FDA 510(k) Cleared, CE Marked Class IIb"`

### 2. Training data
- `institutions: 2` (Hopkins + external site for abdomen model per Shade et al.)
- `disclosureLevel: "full"` (Shade et al. discloses feature/protocol distributions)
- Keep FDA summary as primary `source`; add Shade et al. URL as supplementary note in `description`.

### 3. Evaluation data
Rewrite to reflect Shade et al. 2026 (Adv Radiat Oncol):
- `studyDesign`: "Retrospective external validation: 72 re-planned cases across 4 anatomic regions at Johns Hopkins"
- `primaryEndpoint`: "Non-inferiority of mean OAR dose vs. clinical plans; PTV coverage and conformity"
- `results`: "Non-inferiority demonstrated for mean OAR dose across all 51 OARs evaluated; no significant decrease in PTV coverage or conformity."
- `source`: "Shade et al., Adv Radiat Oncol 2026"
- `sourceUrl`: "https://www.advancesradonc.org/article/S2452-1094(26)00043-6/fulltext/"

### 4. Evidence entries (add 4 new, keep existing)
Add as `type: "Validation"`:
- ESTRO 2025 poster — H&N personalized planning external validation — https://user-swndwmf.cld.bz/ESTRO-2025-Abstract-Book/2724/
- AAPM 2025 oral — Personalized & automated H&N planning with AI-guided optimization — https://aapm.confex.com/aapm/2025am/meetingapp.cgi/Paper/15133
- AAPM 2024 poster — Knowledge-based planning on static IMRT H&N plans — https://aapm.confex.com/aapm/2024am/meetingapp.cgi/Paper/11902
- ICCR 2024 paper — AI-guided unattended plan generation (external validation) — https://www.iccr2024.org/papers/523444.pdf

Reclassify existing Shade et al. entry from `"Introductory"` to `"Peer-reviewed Validation"`.

### 5. Evidence axes
- `evidenceRigor: "E2"` (peer-reviewed + multiple external validations)
- `clinicalImpact: "I2"` (workflow-level external validation; per user)
- `evidenceExternalValidation: true`
- `evidenceMultiCenter: true`
- `adoptionReadiness: "R2"` with updated notes
- Update `evidenceRigorNotes` and `clinicalImpactNotes` accordingly

### 6. Limitations
Remove:
- `"Available in the United States only"`
- `"CE marking not available (not for sale in EU)"`

Keep cloud + DICOM TPS items. (Per vendor: now sold in EU where CE required.)

### 7. Bookkeeping
- `lastUpdated`/`lastRevised`: `"2026-06-22"`
- `source`: append `", Sun Nuclear company representative (verified 2026-06-22)"`
- `clinicalEvidence`: rewrite to reference Shade et al. + 4 conference validations.
