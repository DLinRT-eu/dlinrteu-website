

# Image Synthesis Product Recheck: ECR 2026 and Recent Evidence

## Research Findings

### New Products
**No new image synthesis products for radiotherapy** were announced at ECR 2026 or since the last update:
- **SyntheticMR at ECR 2026**: Showcased SyMRI Neuro+ with focus on neurology (dementia, MS, iNPH). No new radiotherapy-specific product or version.
- **Philips**: Unveiled Rembra CT scanner and Verida spectral CT at ECR 2026 — these are hardware platforms, not new synthetic CT software. At ASTRO 2025, they showed new RT CT/MR systems but no MRCAT updates.
- **Siemens**: syngo.via RT Image Suite remains at VB80. No new version announced.
- **Therapanacea**: No new products beyond current ART-Plan+ v3.1.2 modules.
- **Spectronic Medical**: GE HealthCare partnership (May 2025) to distribute MRIplanner confirmed — already captured in database.

### New Evidence Found

**1. Philips MRCAT Brain — Large clinical validation (93 patients)**
- Aljaafari et al. "Clinical validation of using a commercial synthetic-computed tomography solution for brain MRI-only radiotherapy treatment planning." *Tech Innov Patient Support Radiat Oncol* 2025;35:100328.
- DOI: 10.1016/j.tipsro.2025.100328 | PMC12446756
- 93 patients, 572 CBCT registrations. PTV dose differences <0.4%, positioning within ±1mm/±1°.
- **Vendor-independent** study (Leeds Teaching Hospitals NHS Trust, UK)
- This is the **largest MRCAT Brain validation to date**

**2. Earwong et al. — Clinical implementation of DL-based synthetic CT for H&N and pelvic VMAT**
- *Radiat Oncol* 2025;20:166. DOI: 10.1186/s13014-025-02744-2 | PMC12613521
- From Mahidol University, Thailand — vendor-independent
- Covers H&N and pelvic regions — relevant to multiple products but need to confirm which commercial product was used

**3. MR-OPERA multicenter study** (Spectronic/MRIplanner)
- Already known (Persson et al.), published earlier — likely already captured or should be verified

## Planned Changes

### 1. Update Philips MRCAT Brain — Add evidence and classify
- Add Aljaafari 2025 study to evidence array (93-patient vendor-independent validation)
- Set `evidenceRigor: "E1"` (single-center vendor-independent clinical study, large cohort)
- Set `evidenceRigorNotes` with citation
- Set `evidenceVendorIndependent: true`
- Set `clinicalImpact: "I1"` (technical efficacy — dosimetric accuracy demonstrated)
- Set `clinicalImpactNotes` with citation
- Update `lastUpdated` and `lastRevised` to `2026-03-08`

### 2. Update Philips MRCAT Pelvis — Add evidence classification
- The MR-OPERA multicenter study (Persson et al., Int J Radiat Oncol Biol Phys 2020) and step-by-step MRI-only pelvic RT feasibility study (La Radiologia Medica 2025) provide vendor-independent evidence
- Set `evidenceRigor: "E1"`, `evidenceVendorIndependent: true`, `evidenceMultiCenter: true`
- Set `clinicalImpact: "I1"` (technical efficacy)
- Add evidence entries
- Update `lastUpdated` and `lastRevised` to `2026-03-08`

### 3. Update Philips MRCAT Head and Neck — Add evidence classification
- Based on the Earwong 2025 clinical implementation study (if confirmed to use MRCAT H&N)
- At minimum set baseline `evidenceRigor: "E0"` with notes pending further vendor-specific studies
- Update `lastRevised` to `2026-03-08`

### 4. Update Spectronic MRIplanner — Add evidence classification
- MR-OPERA multicenter study (Persson et al.) + Lerner 2021 brain validation provide strong evidence base
- Set `evidenceRigor: "E2"` (multicenter, multivendor, vendor-independent)
- Set `evidenceVendorIndependent: true`, `evidenceMultiCenter: true`
- Set `clinicalImpact: "I1"`
- Add evidence entries
- Update `lastUpdated` and `lastRevised` to `2026-03-08`

### 5. Add baseline evidence classification to remaining products
- **Siemens syngo.via RT**: `evidenceRigor: "E1"` based on published clinical studies referenced in Aljaafari 2025 review
- **SyntheticMR SyMRI Neuro/Spine**: No RT-specific evidence changes; SyMRI focus is diagnostic neuro
- **Therapanacea MR-Box/AdaptBox**: `evidenceRigor: "E0"` — no independent clinical validation studies found yet

### Summary
- **0 new products** to add
- **4 products** get evidence upgrades with new publications (MRCAT Brain, MRCAT Pelvis, MRIplanner, Siemens syngo.via RT)
- **All 8 active image synthesis products** will receive evidence classification fields (evidenceRigor, clinicalImpact, etc.) for the first time

