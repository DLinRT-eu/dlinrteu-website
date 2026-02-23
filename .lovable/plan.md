

# Two-Part Update: Logo Grid Simplification + Evidence Levels for All Remaining Categories

## Part 1: CompanyLogoGrid Simplification

### Current State
The `CompanyLogoGrid` component shows logos inside a bordered square container (`w-24 h-24 bg-muted rounded-lg`) with the company name displayed below each logo.

### Changes to `src/components/CompanyLogoGrid.tsx`
- Remove the square container (`bg-muted rounded-lg` wrapper div) -- logos render directly
- Increase logo size from `w-24 h-24` to `w-32 h-32`
- Remove the company name `<span>` below each logo
- Keep the fallback text for companies without logos (otherwise they'd be invisible)
- Keep the export button and grid layout intact

---

## Part 2: Evidence Levels for All Remaining Product Categories

Add `evidenceRigor`, `clinicalImpact`, `evidenceRigorNotes`, `clinicalImpactNotes` and structured `evidence` entries with DOI/links to all non-auto-contouring products. Pipeline products (developmentStage: "pipeline") will be skipped as they have no published evidence.

### Evidence Scale Reference
- **E0**: No peer-reviewed evidence
- **E1**: Single-center / FDA validation only
- **E2**: Multi-center / comparative studies
- **E3**: Systematic reviews / independent validation / RCTs
- **I0**: No clinical impact demonstrated
- **I1**: QA / monitoring (indirect patient benefit)
- **I2**: Workflow improvement (time savings, efficiency)
- **I3**: Dosimetric / diagnostic improvement
- **I4**: Clinical outcome improvement
- **I5**: Patient outcome / survival benefit

---

### Image Enhancement (8 products, 7 files)

| Product | File | Rigor | Impact | Key Evidence | Link |
|---------|------|-------|--------|--------------|------|
| **Siemens Dual Energy Optimizer AI** | `siemens.ts` | E1 | I2 | Part of syngo.via platform. Limited independent RT-specific publications | FDA K191468 |
| **Philips SmartDose CT** | `philips-smartdose.ts` | E1 | I2 | FDA validation K203020. No independent peer-reviewed publications found for RT-specific use | FDA K203020 |
| **GE Precision DL** | `ge-healthcare.ts` | E1 | I2 | FDA validation K230082. Limited independent peer-reviewed publications | FDA K230082 |
| **GE AIR Recon DL Enhancement** | `ge-healthcare.ts` | E2 | I2 | Multiple peer-reviewed publications (Lee et al. 2022 MR enterography; Karaarslan et al. 2022 prostate MRI). Part of broader AIR Recon DL platform with 30+ publications | DOI: 10.1002/jmri.28239 (Lee 2022) |
| **SwiftMR (AIRS Medical)** | `airs-medical.ts` | E2 | I2 | Multi-reader study showing diagnostic equivalence with accelerated protocols. Jeong et al. Eur Radiol 2023 | DOI: 10.1007/s00330-023-09678-3 |
| **SubtleMR** | `subtle-medical.ts` | E2 | I2 | Andre et al. JACR 2021 multi-reader study. FDA validation K191688, K223623 | DOI: 10.1016/j.jacr.2021.07.024 |
| **SubtlePET** | `subtle-medical.ts` | E2 | I2 | Katsari et al. Eur J Nucl Med 2021 low-dose PET validation. Liang et al. 2023 multi-tracer validation | DOI: 10.1007/s00259-021-05478-x |
| **AiMIFY** | `subtle-medical.ts` | E1 | I2 | FDA validation K240290 only. New product (2024), limited independent publications | FDA K240290 |
| **SubtleHD** | `subtle-medical.ts` | E0 | I0 | FDA validation K243250 only. Very new product (Feb 2025), no independent publications | FDA K243250 |
| **PixelShine (AlgoMedica)** | `algomedica.ts` | E1 | I2 | Published case studies on company website. FDA K161625. Limited indexed peer-reviewed publications | Company case studies link |
| **ClariCT.AI** | `claripi.ts` | E2 | I2 | Multiple publications in Eur Radiology and Radiology. Validation in pediatric, coronary CTA, liver imaging | DOI: 10.1007/s00330-020-07081-4 (Kim 2020) |
| **uCS-AI (United Imaging)** | `united-imaging.ts` | E0 | I0 | No independent peer-reviewed publications found. CE marked but limited external validation | N/A |

### Reconstruction (12 products, 6 files)

| Product | File | Rigor | Impact | Key Evidence | Link |
|---------|------|-------|--------|--------------|------|
| **Canon AiCE CT** | `canon.ts` | E2 | I3 | Higaki et al. Eur Radiol 2020 multi-phantom; Tatsugami et al. Radiology 2019 coronary CTA | DOI: 10.1007/s00330-019-06523-0 |
| **Canon AiCE MR** | `canon.ts` | E1 | I2 | FDA K192574 validation. Limited independent publications for MR application | FDA K192574 |
| **Canon PIQE** | `canon.ts` | E0 | I0 | FDA K243335 (Jan 2025). Very new, no independent publications | FDA K243335 |
| **Elekta IRIS Evo** | `elekta.ts` | E1 | I2 | FDA cleared Jan 2026. Too new for independent publications. Press release only | Elekta press release |
| **GE TrueFidelity Pro** | `ge-healthcare.ts` | E2 | I3 | Greffier et al. Diagn Interv Imaging 2020; multiple phantom and clinical studies. GE white paper | DOI: 10.1016/j.diii.2019.10.007 |
| **GE AIR Recon DL** | `ge-healthcare.ts` | E3 | I2 | 30+ peer-reviewed publications. Bash et al. Radiol Adv 2025 multi-sequence validation (113 pairs, 51.6% time reduction) | DOI: 10.1093/radadv/umaf029 |
| **Philips Precise Image** | `philips.ts` | E1 | I2 | FDA K210760 validation. Limited independent peer-reviewed publications specific to Precise Image | FDA K210760 |
| **Philips SmartSpeed** | `philips.ts` | E2 | I2 | Bonn University clinical case study (cardiac MRI 60 to 20 min). FDA K251397 | Philips case study |
| **Siemens Deep Resolve** | `siemens.ts` | E3 | I2 | Bash et al. Radiol Adv 2025 (113 sequence pairs, 51.6% scan time reduction). Multiple independent validations across institutions | DOI: 10.1093/radadv/umaf029 |
| **United Imaging uAIFI (CT)** | `united-imaging.ts` | E0 | I0 | No independent peer-reviewed publications. Cleared as integrated system feature | N/A |
| **United Imaging uAIFI (MR)** | `united-imaging.ts` | E0 | I0 | No independent peer-reviewed publications found | N/A |
| **United Imaging HD TOF 2.0** | `united-imaging.ts` | E0 | I0 | No independent peer-reviewed publications. Company product descriptions only | N/A |

### Treatment Planning (4 active products, 4 files)

| Product | File | Rigor | Impact | Key Evidence | Link |
|---------|------|-------|--------|--------------|------|
| **MOZI TPS (Manteia)** | `manteia-mozi.ts` | E1 | I2 | FDA K223724 validation (18 patients end-to-end, 187 patients auto-contouring). Limited independent publications | FDA K223724 |
| **RPA (MD Anderson)** | `md-anderson.ts` | E3 | I4 | Netherton et al. JCO GO 2023 (DOI: 10.1200/GO.22.00431). Demonstrates improved access to quality RT in LMICs. Multiple publications on rpa.mdanderson.org/publications | DOI: 10.1200/GO.22.00431 |
| **RayStation DL Dose Prediction** | `raysearch-planning.ts` | E2 | I2 | Eriksson et al. Phys Med 2024 prostate dose prediction study. FDA K240398 validation. DLP Model Catalogue | DOI: 10.1016/j.ejmp.2024.103419 |
| **Plan AI (Sun Nuclear)** | `sun-nuclear.ts` | E2 | I2 | Trained on 5000+ plans from Johns Hopkins. Appenzoller et al. Med Phys 2012 (Oncospace foundation). FDA K222803, K202284 | DOI: 10.1118/1.4752212 |

### Performance Monitor (5 products, 5 files)

| Product | File | Rigor | Impact | Key Evidence | Link |
|---------|------|-------|--------|--------------|------|
| **MVision Verify** | `mvision.ts` | E0 | I1 | QA visualization tool. No peer-reviewed publications. MDR exempt | N/A |
| **PTW AIQUALIS** | `ptw.ts` | E0 | I1 | QA monitoring tool. MDR exempt. No peer-reviewed publications yet. New product (2024) | N/A |
| **Radformation ClearCheck** | `radformation.ts` | E1 | I1 | Published TG-275 compliance automation studies. Limited indexed publications specific to ClearCheck | Company website |
| **Sun Nuclear SunCHECK Patient** | `sun-nuclear.ts` | E1 | I1 | Established QA platform. Some peer-reviewed publications on pre-treatment QA workflows | Company website |
| **Varian Mobius3D** | `varian.ts` | E2 | I1 | Multiple peer-reviewed publications on independent dose verification. Czarnecki et al. Med Phys 2018. Fontenot Med Phys 2014 | DOI: 10.1002/mp.12736 |

### Registration (2 active products)

| Product | File | Rigor | Impact | Key Evidence | Link |
|---------|------|-------|--------|--------------|------|
| **PyMedix Autofuse** | `pymedix.ts` | E1 | I2 | FDA K233572 validation. Limited independent peer-reviewed publications | FDA K233572 |
| **Therapanacea SmartFuse** | `therapanacea.ts` | E1 | I2 | FDA K242822 validation as part of ART-Plan+ platform. Limited independent publications for registration module specifically | FDA K242822 |

### Tracking (1 product)

| Product | File | Rigor | Impact | Key Evidence | Link |
|---------|------|-------|--------|--------------|------|
| **Accuray Synchrony** | `accuray.ts` | E2 | I3 | Pepin et al. JACMP 2020 motion tracking accuracy. Multiple studies on CyberKnife and Radixact integration. FDA K182687 | DOI: 10.1002/acm2.12847 |

### Platform (3 active products)

| Product | File | Rigor | Impact | Key Evidence | Link |
|---------|------|-------|--------|--------------|------|
| **MVision Workspace+** | `platform/mvision.ts` | E1 | I2 | CE Mark IIa (Oct 2025). FDA K250064 for Dose+ module. Evidence primarily through individual module publications (Contour+ evidence covered in auto-contouring) | FDA K250064 |
| **GE Healthcare iRT** | `platform/ge-healthcare.ts` | E0 | I2 | Platform product (2025). No independent publications. Evidence through integrated component clearances | Company website |
| **MedLever Workflow Management** | `platform/medlever.ts` | E0 | I1 | Non-Device-MDDS. Workflow management tool. No clinical outcome publications | Company website |

### Products to SKIP (pipeline / empty)

- `treatment-planning/mvision.ts` -- empty (redirects to platform)
- `registration/mvision.ts` -- empty (redirects to platform)
- `image-synthesis/mvision.ts` -- empty (redirects to platform)
- `pipeline/therapanacea.ts` -- 3 pipeline products (SmartPlan, TumorBox, BrachyBox)
- `pipeline/medlever.ts` -- 2 pipeline products (Assistant, Copilot)

---

## Files to Modify

### Part 1 (1 file)
1. `src/components/CompanyLogoGrid.tsx`

### Part 2 (26 files)

**Image Enhancement (7 files):**
1. `src/data/products/image-enhancement/siemens.ts`
2. `src/data/products/image-enhancement/philips-smartdose.ts`
3. `src/data/products/image-enhancement/ge-healthcare.ts`
4. `src/data/products/image-enhancement/airs-medical.ts`
5. `src/data/products/image-enhancement/subtle-medical.ts` (4 products)
6. `src/data/products/image-enhancement/algomedica.ts`
7. `src/data/products/image-enhancement/claripi.ts`
8. `src/data/products/image-enhancement/united-imaging.ts`

**Reconstruction (6 files):**
9. `src/data/products/reconstruction/canon.ts` (3 products)
10. `src/data/products/reconstruction/elekta.ts`
11. `src/data/products/reconstruction/ge-healthcare.ts` (2 products)
12. `src/data/products/reconstruction/philips.ts` (2 products)
13. `src/data/products/reconstruction/siemens.ts`
14. `src/data/products/reconstruction/united-imaging.ts` (3 products)

**Treatment Planning (4 files):**
15. `src/data/products/treatment-planning/manteia-mozi.ts`
16. `src/data/products/treatment-planning/md-anderson.ts`
17. `src/data/products/treatment-planning/raysearch-planning.ts`
18. `src/data/products/treatment-planning/sun-nuclear.ts`

**Performance Monitor (5 files):**
19. `src/data/products/performance-monitor/mvision.ts`
20. `src/data/products/performance-monitor/ptw.ts`
21. `src/data/products/performance-monitor/radformation.ts`
22. `src/data/products/performance-monitor/sun-nuclear.ts`
23. `src/data/products/performance-monitor/varian.ts`

**Registration (2 files):**
24. `src/data/products/registration/pymedix.ts`
25. `src/data/products/registration/therapanacea.ts`

**Tracking (1 file):**
26. `src/data/products/tracking/accuray.ts`

**Platform (3 files):**
27. `src/data/products/platform/mvision.ts`
28. `src/data/products/platform/ge-healthcare.ts`
29. `src/data/products/platform/medlever.ts`

**Total: 30 files modified (1 UI + 29 data)**

## Technical Notes

- All modified product files will have `lastRevised` updated to `2026-02-23`
- Existing `evidence` arrays will be preserved and expanded (not replaced)
- Existing `clinicalEvidence` text fields kept for backward compatibility
- E0 products will still get the fields set to document the assessment was completed
- Pipeline products are excluded as they have no published evidence
- Performance Monitor products with `usesAI: false` get I1 (QA/monitoring) impact level per the dual-axis framework

