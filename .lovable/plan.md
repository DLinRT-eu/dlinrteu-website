# Add Manteia ARTAssistant as a standalone Image Synthesis product

## What gets added
A new catalogue entry, "ARTAssistant" (Manteia), in the Image Synthesis category:
- **Function:** deep-learning synthetic CT from CBCT or MR for adaptive radiotherapy, plus rigid and deformable image registration. Contouring is manual only, so it is not listed as an AI function.
- **FDA:** 510(k) K250780, cleared 2025-12-05, product code QKB, 21 CFR 892.2050, Class II. The intended-use statement is quoted from the summary.
- **CE:** none found. It is not on the Manteia MDR product list supplied 2026-09-29, so CE is shown as not confirmed. The FDA clearance meets the catalogue's inclusion rule.
- **Training data:** 560 image sets from China. **Test data:** 247 image sets from the United States, independent of the training set, covering 6 cancer types (intracranial, nasopharynx, oesophagus, lung, liver, cervix). The test scans come from GE, Philips and Siemens CT/MR scanners and Varian and Elekta CBCT, with the test set's sex, age, race and slice-thickness mix. Endpoints are TG-119 gamma pass rate and Dice of contours on sCT versus CBCT/MR. Source: the FDA summary.
- **Anatomical sites:** Brain, Head & Neck, Thorax, Abdomen, Pelvis. **Modalities:** CBCT, MRI, CT.
- **On market since:** 2025 (year of FDA clearance).

## Evidence and scores
- **Sources:**
  - The FDA 510(k) summary K250780.
  - The ESTRO 2026 abstract (IRCCS Regina Elena, D'Andrea et al.), which uses the "ART Assistant module of the Mozi TPS": 10 head-and-neck and 10 lung patients, RegGAN sCT from CBCT, with HU, contour, DVH and gamma 2%/2 mm compared against a new planning CT.
  - The two Manteia RegGAN method papers (Li 2023, Wang 2023) are listed as supporting evidence only, unscored, because they don't name the product.
- **Product scores:** Evidence Rigor **E0** (no peer-reviewed study names the product; the ESTRO abstract is a conference abstract). Levels of Efficacy **L1t** (regulatory bench testing of image and dose accuracy). Adoption Readiness **R2** (cleared, limited independent clinical evidence). All marked "pending reviewer check", dated 2026-11-06.
- The ESTRO abstract is listed as an evidence source with level L2 (dose/geometry comparison), unscored for rigor. Conference abstracts follow the house rule and don't raise E.
- **Limitations:**
  - It is not confirmed that the cleared device is the same software as the MOZI module.
  - The training data are from China only.
  - The FDA summary does not list per-site numeric results.
  - Local validation is required.

## Linked updates
- Add the product to Manteia's company product list.
- On MOZI TPS, change the 2026-11-06 note to point to the new ARTAssistant entry. MOZI's scores stay as they are.
- Update the report CSV in Files as a new version (v2).

## Checks
- Catalogue tests, the evidence score checker, and a browser look at the new product page.

## Technical notes
- New file `src/data/products/image-synthesis/manteia-artassistant.ts`, registered in `image-synthesis/index.ts`. The company list is in `src/data/companies/*`. The house style follows `mvision.ts` (Image+).
