# Step 2: Add Evidence Levels to Auto-Contouring Products

## Overview

Add `evidenceRigor` (E0-E3) and `clinicalImpact` (I0-I5) fields with supporting `evidence` entries (DOI links) to all auto-contouring products. Each classification is motivated by specific peer-reviewed publications found through systematic search.  
consider also to add the following  
  



| **#** | **Product Name**                | **Evidence Level** | **Impact Level** | **DOI / Publication Link**                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----- | ------------------------------- | ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Limbus Contour**              | **E2** (was E1)    | I2               | **DOI: 10.1093/bjr/tqae077** • **Publication:** Starke et al. (2024). *Clinical evaluation of the efficacy of limbus artificial intelligence software to augment contouring for prostate and nodes radiotherapy*. British Journal of Radiology, 97(1158), 1125-1131. • **Summary:** Multi-institution study? (Canada & UK) evaluating time savings and geometric accuracy for prostate and lymph node contours. Found time savings of 13-26 minutes.                              |
| 2     | **Contour+**                    | **E2** (was E1)    | I2               | **DOI: 10.5603/rpor.104144** • **Publication:** Isobe et al. (2025). *Performance evaluation of MVision AI Contour+ in gastric MALT lymphoma segmentation*. Reports of Practical Oncology and Radiotherapy, 30(1), 122-125. • **Summary:** Independent evaluation of Contour+ for abdominal organs (stomach, liver, kidneys). Showed good agreement (DSC 0.92-0.99).                                                                                                              |
| 4     | Deep Learning Segmentation      | E2                 | I2               | No DOI found in search. RaySearch likely has internal publications.                                                                                                                                                                                                                                                                                                                                                                                                               |
| 7     | Jazz                            | E2                 | I2               | *Medical Physics Journal* 2023, ESTRO 2022 abstract cited. DOI not found in search.                                                                                                                                                                                                                                                                                                                                                                                               |
| 8     | INTContour                      | E2                 | I2               | *Medical Physics Journal* 2023, ESTRO 2022 abstract cited. DOI not found in search.                                                                                                                                                                                                                                                                                                                                                                                               |
| 12    | **Auto Segmentation (GE)**      | E2                 | I2               | **FDA 510(k) Summary K230082** • **Link:** [FDA 510(k) Summary](http://510k.innotics.com/device/K230082) • **Summary:** FDA clearance document details validation study with **302 retrospective CT exams** (2552 contours) from 9 global sites. Dice coefficients reported for 40+ organs.                                                                                                                                                                                       |
| 18    | **AI-Rad Companion Organs RT**  | **E3** (was E2)    | I2               | **DOI: 10.1002/acm2.14090** • **Publication:** Tchistiakova et al. (2023). *Feasibility evaluation of novel AI-based deep-learning contouring algorithm for radiotherapy*. Journal of Applied Clinical Medical Physics, 24(11), e14090. • **Summary:** Independent evaluation by SUNY Upstate Medical University. 30 CT datasets (pelvis, thorax, H&N). Found time-saving efficiency of **67-84%**.                                                                               |
| 23    | **OncoStudio**                  | **E3** (was E2)    | I2               | **New Study in Japan (2025)** • **Link:** [Anzai Medical LinkedIn Announcement](https://www.linkedin.com/posts/anzaimedical_geometric-accuracy-assessment-of-ai-based-activity-7381646683341983744-zD-B) • **Publication:** *Geometric Accuracy Assessment of AI-Based Auto-contouring Using OncoStudio for Prostate Cancer Treatment Planning*. Tokyo Medical University Ibaraki Medical Center. (Full paper not yet indexed, but evidence of peer-reviewed publication exists). |
| 27    | **MRCAT Brain**                 | **E3** (was E2)    | I3               | **DOI: 10.1016/j.radonc.2018.08.016** (search result) • **Publication:** Bratova et al. (2019). *Validation of dose distribution computation on sCT images generated from MRI scans by Philips MRCAT*. Radiotherapy and Oncology, 130(Suppl 1), S51-S52. • **Summary:** Conference abstract evaluating MRCAT for prostate. Dose calculation accuracy within 1-10% vs CT.                                                                                                          |
| 28    | **MRCAT Pelvis**                | **E3** (was E2)    | I3               | Same as MRCAT Brain above.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 45    | **SmartSpeed**                  | E2                 | I2               | **Bonn University Hospital Case Study** • **Link:** [Philips Video Case Study](https://www.philips.com.sg/healthcare/video/philips-mri-enhancement-smartspeed-precise) • **Summary:** Prof. Dr. Julian Luetkens (Bonn University) reports cardiac MRI time reduced from **60 to 20 minutes** using SmartSpeed.                                                                                                                                                                    |
| 47    | **GE AIR Recon DL**             | E2                 | I2               | **Multiple publications** • **Link:** [GE SIGNAPulse Article](https://signapulse.gehealthcare.com/spring-2022/ge-healthcare-air-recon-dl-technology) • **Summary:** Multiple peer-reviewed studies cited in GE literature. Lee et al. (2022) evaluated for MR enterography; Karaarslan et al. (2022) for prostate MRI.                                                                                                                                                            |
| 48    | **Deep Resolve**                | **E3** (was E2)    | I2               | **DOI: 10.1093/radadv/umaf029** • **Publication:** Bash et al. (2025). *Deep learning MRI halves scan time and preserves image quality across routine neuroradiologic examinations*. Radiology Advances, 2(5), umaf029. • **Summary:** Multi-sequence study (113 sequence pairs) at a tertiary academic center. Found mean scan time reduction of **51.6%** with maintained image quality.                                                                                        |
| 62    | SubtleMR                        | E2                 | I2               | Multiple peer-reviewed studies cited. DOI not found in search.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 63    | SubtlePET                       | E2                 | I2               | Multiple peer-reviewed studies cited. DOI not found in search.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 67    | [ClariCT.AI](http://ClariCT.AI) | E2                 | I2               | Multiple peer-reviewed publications in *European Radiology*, *Radiology*. DOI not found in search.                                                                                                                                                                                                                                                                                                                                                                                |


  


## Evidence Level Assignments

### Products with Multi-Center / Comparative Studies (E2)


| Product                      | File              | Rigor | Impact | Key Publication                                                                                                                                            | Rationale                                                                                                                                                                                             |
| ---------------------------- | ----------------- | ----- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MVision Contour+**         | `mvision.ts`      | E2    | I2     | Doolan et al., Front Oncol 2023 (10.3389/fonc.2023.1213068) + 11 peer-reviewed studies across 17 clinics, 12 countries                                     | Multi-center comparative study of 5 AI systems on 80 patients (breast, H&N, lung, prostate). Demonstrates workflow time savings. Additional studies: Kiljunen (Diagnostics 2020), Langmack (BJR 2024) |
| **Therapanacea Annotate**    | `therapanacea.ts` | E2    | I2     | Doolan et al., Front Oncol 2023 (10.3389/fonc.2023.1213068); Gregoire et al. 2020 blinded prospective evaluation; Young et al. 2024 H&N blinded assessment | Multi-center evaluation. Blinded prospective study by Gregoire et al. shows clinical acceptability and time savings                                                                                   |
| **RaySearch DLS**            | `raysearch.ts`    | E2    | I2     | Doolan et al., Front Oncol 2023 (10.3389/fonc.2023.1213068); Acta Oncologica 2023 (10.1080/0284186X.2023.2270152) breast/thorax validation                 | Multi-center comparative + dedicated validation study in Acta Oncologica showing clinical usability                                                                                                   |
| **Radformation AutoContour** | `radformation.ts` | E2    | I2     | Doolan et al., Front Oncol 2023 (10.3389/fonc.2023.1213068)                                                                                                | Included in multi-center 5-system comparison. Also Chuang et al. geometric/dosimetric comparison                                                                                                      |
| **Mirada DLC Expert**        | `mirada.ts`       | E2    | I2     | Doolan et al., Front Oncol 2023 (10.3389/fonc.2023.1213068)                                                                                                | Included in multi-center comparison. Product discontinued but evidence is historical                                                                                                                  |
| **Siemens AI-Rad Companion** | `siemens.ts`      | E2    | I2     | Peng JL, Clin Onco 2022 (COO-v6-1406); FDA K242745 validation on 579 cases across 5 continents                                                             | Multi-continental FDA validation dataset. Published clinical validation study                                                                                                                         |
| **MIM Contour ProtegeAI+**   | `mim-software.ts` | E2    | I2     | Front Oncol 2024 (10.3389/fonc.2024.1375096) H&N validation; J Med Phys 2025 comparison with Therapanacea                                                  | Multi-center H&N validation comparing AccuContour and ProtegeAI                                                                                                                                       |
| **Manteia AccuContour**      | `manteia.ts`      | E2    | I2     | Front Oncol 2024 (10.3389/fonc.2024.1375096) H&N validation; npj Digital Medicine 2025 multi-centre H&N evaluation                                         | Multi-center validation studies across institutions                                                                                                                                                   |


### Products with Single-Center / Smaller Studies (E1)


| Product                     | File                        | Rigor | Impact | Key Publication                                                                                                                                   | Rationale                                                                                                    |
| --------------------------- | --------------------------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Limbus Contour**          | `limbus.ts`                 | E1    | I2     | Starke et al., BJR 2024 (10.1093/bjr/tqae077) - 30 prostate patients, single center                                                               | Single institution, 30 patients. Shows meaningful time savings for prostate contouring                       |
| **Carina INTContour**       | `carina.ts`                 | E1    | I2     | Kibudde et al., Adv Radiat Oncol 2024 (10.1016/j.adro.2024.101638) - impact in LMICs                                                              | Single-center study focusing on LMIC impact. Also Medical Physics 2023 publication                           |
| **Vysioneer VBrain**        | `vysioner.ts`               | E1    | I2     | Wang et al., Radiat Oncol 2023 (10.1186/s13014-023-02246-z) - stratified SRS assessment; Liang et al., IJROBP 2021 (10.1016/j.ijrobp.2021.03.060) | Single-center retrospective studies showing improved contouring accuracy and efficiency for brain metastases |
| **Coreline Aview RT ACS**   | `coreline.ts`               | E1    | I2     | Limited independent peer-reviewed evidence. FDA validation data (K200714). Single-center evaluations                                              | FDA validation data available but limited independent publications                                           |
| **Siemens DirectORGANS**    | `directorgans.ts`           | E1    | I2     | White paper (ASTRO 2021). FDA validation (K233650, K250822). Limited independent peer-reviewed data                                               | Vendor white paper and FDA validation. Novel CT-integrated approach but limited independent publications     |
| **GE Auto Segmentation**    | `ge-healthcare.ts`          | E1    | I2     | FDA validation K230082 (302 patients, 9 sites). Limited independent peer-reviewed publications                                                    | Large FDA validation dataset but primarily vendor-submitted data                                             |
| **Ever Fortune Seg Pro V3** | `everfortune.ts` (Seg Pro)  | E1    | I2     | Liu et al. 2023 hippocampal avoidance WBRT (pubmed/36773828); cardiac substructures study (pubmed/37585426)                                       | Single-center studies on specific applications                                                               |
| **Brainlab AI Tumor Seg**   | `brainlab.ts` (tumor)       | E1    | I0     | FDA validation: 412 patients, 595 scans. Dice >= 0.75. No independent peer-reviewed clinical validation yet                                       | FDA validation only. Technical performance demonstrated but no workflow/outcome studies                      |
| **Brainlab RT Seg (APM)**   | `brainlab.ts` (APM)         | E1    | I0     | FDA validation K243633. No independent peer-reviewed publications found                                                                           | FDA validation data only. No published clinical impact data                                                  |
| **Taiwan DeepMets**         | `taiwan-medical-imaging.ts` | E1    | I0     | FDA validation K250427 only. No peer-reviewed publications found                                                                                  | FDA validation only, no independent clinical evidence                                                        |


### Products with No Peer-Reviewed Evidence (E0)


| Product                      | File                      | Rigor | Impact | Rationale                                                                                                                                             |
| ---------------------------- | ------------------------- | ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Oncosoft OncoStudio**      | `oncosoft.ts`             | E0    | I2     | Claims 4M contours for 80K patients but no peer-reviewed publications found. Clinical use demonstrated but not independently validated                |
| **Hura DV.TARGET**           | `hura-imaging.ts`         | E0    | I0     | FDA cleared (K202928) but no peer-reviewed publications found                                                                                         |
| **Wisdom Tech DeepContour**  | `wisdom-tech.ts`          | E0    | I0     | FDA cleared (K232928) but no peer-reviewed publications found                                                                                         |
| **Philips MRCAT Prostate**   | `philips.ts`              | E0    | I0     | Legacy product. No auto-contouring-specific peer-reviewed publications found (MRCAT synthetic CT studies exist but not for auto-contouring component) |
| **Ever Fortune RT Suite v1** | `everfortune.ts` (v1)     | E0    | I0     | Superseded product. FDA cleared (K220264) but no independent validation                                                                               |
| **AI Medical Jazz**          | `ai-medical.ts`           | E0    | I0     | Mentions "Medical Physics Journal 2023, ESTRO 2022 abstract" in clinicalEvidence but no specific DOI found. Conference abstract only                  |
| **Synaptiq Mediq RT**        | `synaptiq.ts`             | E0    | I0     | Not certified. Investigation use only. Internal studies (Doolan 2024) only                                                                            |
| **Manteia AccuLearning**     | `manteia-acculearning.ts` | N/A   | N/A    | Training platform, not a clinical product. Skip evidence classification                                                                               |


## Data to Add Per Product

For each product, add three fields:

```typescript
evidenceRigor: "E2",          // E0, E1, E2, or E3
clinicalImpact: "I2",         // I0, I1, I2, I3, I4, or I5
evidenceRigorNotes: "Multi-center comparative study...",
clinicalImpactNotes: "Demonstrates workflow time savings...",
```

Also add/update the `evidence` array with structured DOI-linked entries where publications exist:

```typescript
evidence: [
  {
    type: "Peer-reviewed Publication",
    description: "Multi-center comparison of 5 AI auto-contouring systems on 80 patients",
    link: "https://doi.org/10.3389/fonc.2023.1213068"
  }
]
```

## Key Reference Publications

The following landmark studies cover multiple products simultaneously:

1. **Doolan et al., Front Oncol 2023** (10.3389/fonc.2023.1213068) - Compares MVision, Radformation, RayStation, Therapanacea, Mirada on 80 patients across 4 anatomies
2. **Front Oncol 2024** (10.3389/fonc.2024.1375096) - Validates AccuContour and ProtegeAI for H&N
3. **npj Digital Medicine 2025** (10.1038/s41746-025-01624-z) - Multi-centre H&N evaluation

## Files to Modify (20 files)


| File                                        | Products                 |
| ------------------------------------------- | ------------------------ |
| `auto-contouring/mvision.ts`                | Contour+                 |
| `auto-contouring/therapanacea.ts`           | Annotate                 |
| `auto-contouring/raysearch.ts`              | DLS                      |
| `auto-contouring/radformation.ts`           | AutoContour              |
| `auto-contouring/mirada.ts`                 | DLC Expert               |
| `auto-contouring/siemens.ts`                | AI-Rad Companion         |
| `auto-contouring/mim-software.ts`           | ProtegeAI+               |
| `auto-contouring/manteia.ts`                | AccuContour              |
| `auto-contouring/limbus.ts`                 | Limbus Contour           |
| `auto-contouring/carina.ts`                 | INTContour               |
| `auto-contouring/vysioner.ts`               | VBrain                   |
| `auto-contouring/coreline.ts`               | Aview RT ACS             |
| `auto-contouring/directorgans.ts`           | DirectORGANS             |
| `auto-contouring/ge-healthcare.ts`          | Auto Segmentation        |
| `auto-contouring/everfortune.ts`            | RT Suite v1 + Seg Pro V3 |
| `auto-contouring/brainlab.ts`               | AI Tumor Seg + RT Seg    |
| `auto-contouring/taiwan-medical-imaging.ts` | DeepMets                 |
| `auto-contouring/oncosoft.ts`               | OncoStudio               |
| `auto-contouring/hura-imaging.ts`           | DV.TARGET                |
| `auto-contouring/wisdom-tech.ts`            | DeepContour              |
| `auto-contouring/philips.ts`                | MRCAT Prostate           |
| `auto-contouring/ai-medical.ts`             | Jazz                     |
| `auto-contouring/synaptiq.ts`               | Mediq RT                 |


AccuLearning will be skipped (training platform, not clinical product).

## Implementation Notes

- All `lastRevised` dates will be updated to `2026-02-23`
- Existing `evidence` arrays will be preserved and expanded (not replaced)
- Existing `clinicalEvidence` text fields will be kept for backward compatibility
- Products with E0 will still get the fields set to document the assessment was done (rather than leaving them undefined)