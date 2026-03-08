

# Workflow Automation, Reporting & Remaining Product Categories Update

## Research Summary

### Workflow Automation / Reporting
- **No new standalone workflow automation or reporting products for radiotherapy** announced at ECR 2026. DeepHealth, Ziosoft (REVORAS), and Bracco (AiMIFY) are radiology-focused, not radiotherapy.
- **MedLever**: No new product launches or evidence. Pipeline products (Assistant, Copilot) remain in development.
- **GE Healthcare iRT**: Showed updated version at ASTRO 2025 (Sep 2025) with enhanced connectivity, reporting, and planning workflow. A Marengo CIMS case study (2025) documents 25% reduction in treatment planning times. No peer-reviewed publication yet — evidence stays at E0.

### Tracking
- **Accuray Synchrony**: 2 new studies found since last update:
  - Okada et al. Cureus 2025 — liver tumor motion-tracking assessment (DOI: 10.7759/cureus.81598). Vendor-independent.
  - Lo Conte et al. Cureus 2025 — prostate SBRT toxicity outcomes with Synchrony (DOI: 10.7759/cureus.85083). This reports **clinical toxicity outcomes**, qualifying for I2→I2 (toxicity data but single-center, small cohort — not sufficient for I4).
  - These are both vendor-independent → set `evidenceVendorIndependent: true`

### Auto-Contouring (MVision)
- **HARMONY study**: Pang et al. npj Digital Medicine 2025 appears to already be captured. But the HARMONY study (7 clinics, 4 countries, H&N, published May 2025 in npj Digital Medicine) may be a different paper. Need to verify — the Pang paper is described as "9 clinics, 7 countries" vs HARMONY "7 clinics, 4 countries". If different, add HARMONY to MVision evidence.
- **Ng 2025 systematic review**: "Performance of Commercial Deep Learning-Based Auto-Segmentation" in Information (MDPI) — a systematic review covering multiple commercial products including MVision Contour+. If this qualifies as systematic evidence, MVision already has E3 — confirms existing level.

### Registration
- **Therapanacea SmartFuse**: No new independent evidence found.
- **Pymedix Autofuse/FIRE**: No new evidence. Company website confirms product but no new publications.

### Treatment Planning
- **Nature Communications 2025 multicenter study**: "Multicenter study on the versatility and adoption of AI-driven automated radiotherapy planning across cancer types" — need to verify which product this covers. If RayStation or RapidPlan, may warrant evidence update.

### Performance Monitor
- **PTW AIQUALIS**: No new publications. Stays E0.
- **Radformation ClearCheck**: Frontiers in Oncology 2025 (Simiele et al.) covers Radformation in total marrow lymphoid irradiation workflow — this is new evidence.

### Platform
- No changes needed for MVision Workspace+ or GE iRT beyond current data.

### Pipeline
- No pipeline products have changed status (still "Coming Soon").

## Planned Changes

### 1. Update Accuray Synchrony — Add 2 new studies
- Add Okada et al. 2025 liver tracking study
- Add Lo Conte et al. 2025 prostate toxicity study
- Set `evidenceVendorIndependent: true` (both are independent)
- Keep E2/I2 (new studies are single-center, don't change rigor level)
- Update `lastRevised` to `2026-03-08`

### 2. Update MVision Contour+ — Add HARMONY study (if distinct from Pang et al.)
- Add HARMONY study reference: npj Digital Medicine 2025, 7 clinics, 4 countries
- Update `evidenceRigorNotes` to mention HARMONY
- Keep E3/I2 (already at highest applicable level)
- Update `lastRevised` to `2026-03-08`

### 3. Update Radformation ClearCheck — Add TMLI study
- Add Simiele et al. Frontiers Oncol 2025 (automated contouring + QA for total marrow lymphoid irradiation using Radformation tools)
- Update `evidenceRigorNotes`
- Keep E1/I1
- Update `lastRevised` to `2026-03-08`

### 4. Update GE Healthcare iRT — Add Marengo case study reference
- Add Marengo CIMS case study (2025) as non-peer-reviewed evidence
- Keep E0/I2 (case study/white paper, not peer-reviewed)
- Update `lastRevised` to `2026-03-08`

### 5. Touch remaining products' lastRevised dates
- Update `lastRevised` to `2026-03-08` for all reviewed products where no issues found (confirming data is current as of this review cycle): Pymedix, Therapanacea SmartFuse, PTW AIQUALIS, MedLever platform, MVision Workspace+

### Summary
- **0 new products** to add
- **4 products** get evidence updates (Accuray Synchrony, MVision Contour+, Radformation ClearCheck, GE iRT)
- **5 products** get lastRevised date updates confirming review
- All remaining categories (tracking, registration, performance monitor, platform, pipeline, treatment planning) checked — no new RT-specific products from ECR 2026

