# Product Audit Report — 2026-10-15

- Scope: all 98 live catalogue records (91 non-Pipeline, 7 Pipeline); archived/examples excluded. The bundled enumerator lists 104 source files, not 104 active products; unused definitions and relationship IDs do not equal live entries.
- Findings: 1 errors, 147 warnings, 720 information rows; one CSV row per Markdown finding.
- Source retrieval: 265/265 distinct DOI/PMID records; 263 abstracts. Vendor URLs: 77/86 accessible on this run. Failures may reflect blocking, not retirement.
- Durable product-specific fresh-search logs: 98/98. Targeted, timeboxed public searches only; not an exhaustive systematic review.
- Product records have NOT been edited. Proposals are a worklist for a separate correction pass, following Product Audit Swarm / Minimal Intervention. No new product is automatically admitted from discovery leads.
- Current authoritative axes: Evidence Rigor E0–E3; Levels of Efficacy L1t/L1c/L2–L6; Adoption Readiness R0–R5 unchanged. The bundled skill's legacy I0–I5 and R0–R4 cheat sheet is superseded by the project definitions. CSV headers retain current_I/proposed_I for interoperability; their values are L-codes, not legacy I-codes.
- Each axis uses attributable paper maxima and documented overrides, not the majority of papers. Vendor affiliation limits independence/rigor; it does not invalidate a measured economic endpoint or require downgrading L6. Scores describe evidence and are educational: they do not imply clinical validation or replace local commissioning.

## Priority worklist

1. Eclipse and GE: investigate/remove misattributed direct evidence; keep predicate, hosting and vendor relationships separate from product validation.
2. MRCAT Head and Neck: MESCAL brain/pelvis cannot support H&N scores; Buschmann cohort is 13 brain + 10 H&N, with L2 endpoints.
3. Precise Image: exact DOI jmai-2025-173 is registered; a contradictory earlier search suggestion is rejected. Publisher/full-text verification is needed before replacing the DOI or finalizing provisional scores.
4. Iris: E1 conflicts with its own no-publication/E0 notes. FDA K252188 is system-level clearance; no standalone Iris clearance should be invented.
5. ARTAssistant / AccuContour 4.0: distinct FDA leads; sCT generation versus contouring on sCT must not be conflated. Establish MOZI relationship and primary IFU before adding another record.

### limbus-contour

- **Name**: Limbus Contour
- **Company**: Limbus AI
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R4
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | evidenceRigor | warn | Starke et al. BJR 2024 is a genuine multi-institutional (Canada & UK) evaluation reporting editing-time endpoints; E2/L3 labelling is reasonably supported. No mismatch found. | No action; retain as-is. |
| Evidence | attribution | warn | impactSource rationale notes 'HAIR label Image+ corrected to Contour+' inside the Limbus Contour record — an MVision Image+/Contour+ label-correction note embedded under a Limbus citation (Bordigoni et al. evaluates MVision AND LimbusAI jointly). The correction note is legitimate but its placement under Limbus's impactSource is easy to misread as describing the Limbus product itself rather than a shared multi-vendor study footnote. | Clarify rationale text to state explicitly that the Image+→Contour+ correction applies to the MVision arm of the same multi-vendor study, not to Limbus Contour. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R4 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://limbus.ai/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- An efficient automated approach for accumulated dose estimation in prostate cancer radiotherapy.: https://doi.org/10.1016/j.phro.2026.100942 (abstract retrieved; retrieved 2026-10-15).
- Trade-off of different deep learning-based auto-segmentation approaches for treatment planning of pediatric craniospinal irradiation autocontouring of OARs for pediatric CSI.: https://doi.org/10.1002/mp.17782 (abstract retrieved; retrieved 2026-10-15).
- Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation.: https://doi.org/10.1016/j.ctro.2024.100855 (abstract retrieved; retrieved 2026-10-15).
- Automated segmentation in pelvic radiotherapy: A comprehensive evaluation of ATLAS-, machine learning-, and deep learning-based models.: https://doi.org/10.1016/j.ejmp.2024.104486 (abstract retrieved; retrieved 2026-10-15).
- A student trained convolutional neural network competing with a commercial AI software and experts in organ at risk segmentation.: https://doi.org/10.1038/s41598-024-76288-y (abstract retrieved; retrieved 2026-10-15).
- Artificial Intelligence-Based Autosegmentation: Advantages in Delineation, Absorbed Dose-Distribution, and Logistics.: https://doi.org/10.1016/j.adro.2023.101394 (abstract retrieved; retrieved 2026-10-15).
- Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy.: https://doi.org/10.1016/j.phro.2023.100515 (abstract retrieved; retrieved 2026-10-15).
- Clinical Use of a Commercial Artificial Intelligence-Based Software for Autocontouring in Radiation Therapy: Geometric Performance and Dosimetric Impact.: https://doi.org/10.3390/cancers15245735 (abstract retrieved; retrieved 2026-10-15).
- Clinical Validation of a Deep-Learning Segmentation Software in Head and Neck: An Early Analysis in a Developing Radiation Oncology Center.: https://doi.org/10.3390/ijerph19159057 (abstract retrieved; retrieved 2026-10-15).
- Clinical validation of AI-assisted contouring in prostate radiation therapy treatment planning: Highlighting automation bias and the need for standardized quality assurance.: https://doi.org/10.1002/acm2.70425 (abstract retrieved; retrieved 2026-10-15).
- Comparative analysis of AI-generated and deformed image registration contours on daily CBCT in prostate cancer radiation therapy: accuracy and dosimetric implications using commercial tools.: https://doi.org/10.1007/s13246-025-01686-z (abstract retrieved; retrieved 2026-10-15).
- Implementation of deep learning-based auto-segmentation for radiotherapy planning structures: a workflow study at two cancer centers.: https://doi.org/10.1186/s13014-021-01831-4 (abstract retrieved; retrieved 2026-10-15).
- Integrating Artificial Intelligence Into Radiation Oncology: Can Humans Spot AI?: https://doi.org/10.7759/cureus.50486 (abstract retrieved; retrieved 2026-10-15).
- Training and Validation of Deep Learning-Based Auto-Segmentation Models for Lung Stereotactic Ablative Radiotherapy Using Retrospective Radiotherapy Planning Contours.: https://doi.org/10.3389/fonc.2021.626499 (abstract retrieved; retrieved 2026-10-15).
- Workflow Efficiency in Vaginal Cuff High Dose Rate Brachytherapy Using Artificial Intelligence-Based Organ Segmentation and Multi-Channel Cylinder Modeling.: https://doi.org/10.3390/cancers17172751 (abstract retrieved; retrieved 2026-10-15).
- Clinical evaluation of the efficacy of limbus artificial intelligence software to augment contouring for prostate and nodes radiotherapy.: https://doi.org/10.1093/bjr/tqae077 (abstract retrieved; retrieved 2026-10-15).
- Implementation of a Commercial Deep Learning-Based Auto Segmentation Software in Radiotherapy: Evaluation of Effectiveness and Impact on Workflow.: https://doi.org/10.3390/life12122088 (abstract retrieved; retrieved 2026-10-15).
- Can Deep Learning-Based Auto-Contouring Software Achieve Accurate Pelvic Volume Delineation in Volumetric Image-Guided Radiotherapy for Prostate Cancer? A Preliminary Multicentric Analysis.: https://doi.org/10.3390/curroncol32060321 (abstract retrieved; retrieved 2026-10-15).
- A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy.: https://doi.org/10.3389/fonc.2023.1213068 (abstract retrieved; retrieved 2026-10-15).
- Evaluation and failure analysis of four commercial deep learning-based autosegmentation software for abdominal organs at risk.: https://doi.org/10.1002/acm2.70010 (abstract retrieved; retrieved 2026-10-15).
- Robustness evaluation of an artificial intelligence-based automatic contouring software in daily routine practice.: https://doi.org/10.1016/j.ejmp.2025.105065 (abstract retrieved; retrieved 2026-10-15).
- An evaluation of rectum contours generated by artificial intelligence automatic contouring software using geometry, dosimetry and predicted toxicity.: https://doi.org/10.1088/2057-1976/adf8f2 (abstract retrieved; retrieved 2026-10-15).
- Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation.: https://doi.org/10.1007/s13246-024-01434-9 (abstract retrieved; retrieved 2026-10-15).
- Comparison of Two Auto-Contouring Systems for Head and Neck Organs at Risk to Institutional Reference Standard in Radiotherapy Planning: https://doi.org/10.3390/app16115681 (abstract retrieved; retrieved 2026-10-15).
- Search: Limbus AI Limbus Contour vendor website structures models 2026 (2026-10-15) — https://limbus.ai/
- Search: Limbus Contour FDA 510(k) K241837 (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf24/K241837.pdf
- Search: 10.1093/bjr/tqae077 Starke Limbus prostate nodes (2026-10-15) — https://doi.org/10.1093/bjr/tqae077
- Limits: Vendor site and FDA 510(k) summary reviewed; full text of Starke et al. not independently re-read beyond abstract/metadata.

#### New-source / product leads (not admitted or scored)

- Clinical evaluation of the efficacy of limbus artificial intelligence software to augment contouring for prostate and nodes radiotherapy: https://doi.org/10.1093/bjr/tqae077. Limbus Contour (Limbus AI) — correct, Limbus named directly in methods verified
- Search: "Limbus Contour" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Limbus%20Contour%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Geometric, dosimetric and psychometric evaluation of three commercial AI software solutions for OAR auto-segmentation in head and neck radiotherapy.: https://doi.org/10.1038/s41598-025-18598-3. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy.: https://doi.org/10.1016/j.phro.2026.100935. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### mvision-ai-contouring

- **Name**: Contour+
- **Company**: MVision AI
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R4
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | newCitation | warn | 10.6009/jjrt.26-1649 (Miura et al., Jpn J Radiol Technol, 2026) is a genuine, correctly attributed thoracic clinical validation of Contour+ (MVision AI): DSC 0.86–1.00 across lungs/trachea/bronchus/esophagus/spinal cord/heart, mean Likert score 4.4/5. Confirmed via Crossref and journal abstract; no title/attribution mismatch. | Add as a corroborating E1-E2 single-centre thoracic evidence entry; does not change current E2/L3 primary rigor source (Doolan 2023). |
| Evidence | vendorIndependence | warn | Doolan et al. 2023 (fonc.2023.1213068) benchmarks five vendors including MVision; vendor-independent, multi-site. Correctly used as rigor source. | None. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | id | warn | Multiple source definitions (may be unused or archived): src/data/products/auto-contouring/mvision-ai.ts, src/data/products/auto-contouring/mvision.ts | Verify source before editing |

#### Re-scoring proposal

- Proposed: E2 / L3 / R4 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://mvision.ai/contour/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- How smart is artificial intelligence in organs delineation? Testing a CE and FDA-approved Deep-Learning tool using multiple expert contours delineated on planning CT images.: https://doi.org/10.3389/fonc.2023.1089807 (abstract retrieved; retrieved 2026-10-15).
- Safety and efficiency of a fully automatic workflow for auto-segmentation in radiotherapy using three commercially available deep learning-based applications.: https://doi.org/10.1016/j.phro.2024.100627 (abstract retrieved; retrieved 2026-10-15).
- Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation.: https://doi.org/10.1016/j.ctro.2024.100855 (abstract retrieved; retrieved 2026-10-15).
- Automated segmentation of target volumes in breast cancer radiotherapy, impact on target size and dose to organs at risk.: https://doi.org/10.1016/j.ctro.2025.100986 (abstract retrieved; retrieved 2026-10-15).
- Autosegmentation based on different-sized training datasets of consistently-curated volumes and impact on rectal contours in prostate cancer radiation therapy.: https://doi.org/10.1016/j.phro.2022.04.007 (abstract retrieved; retrieved 2026-10-15).
- Deep-learning magnetic resonance imaging-based automatic segmentation for organs-at-risk in the brain: Accuracy and impact on dose distribution.: https://doi.org/10.1016/j.phro.2023.100454 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of the accuracy of automated segmentation based on deep learning for prostate cancer patients.: https://doi.org/10.1016/j.meddos.2024.09.002 (abstract retrieved; retrieved 2026-10-15).
- Potential of E-Learning Interventions and Artificial Intelligence-Assisted Contouring Skills in Radiotherapy: The ELAISA Study.: https://doi.org/10.1200/go.24.00173 (abstract retrieved; retrieved 2026-10-15).
- Automated segmentation in pelvic radiotherapy: A comprehensive evaluation of ATLAS-, machine learning-, and deep learning-based models.: https://doi.org/10.1016/j.ejmp.2024.104486 (abstract retrieved; retrieved 2026-10-15).
- A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy.: https://doi.org/10.3389/fonc.2023.1213068 (abstract retrieved; retrieved 2026-10-15).
- Performance evaluation of MVision AI Contour+ in gastric MALT lymphoma segmentation.: https://doi.org/10.5603/rpor.104144 (metadata only; retrieved 2026-10-15).
- Multicentre evaluation of deep learning CT autosegmentation of the head and neck region for radiotherapy.: https://doi.org/10.1038/s41746-025-01624-z (abstract retrieved; retrieved 2026-10-15).
- Geometric, dosimetric and psychometric evaluation of three commercial AI software solutions for OAR auto-segmentation in head and neck radiotherapy.: https://doi.org/10.1038/s41598-025-18598-3 (abstract retrieved; retrieved 2026-10-15).
- Artificial intelligence contouring in radiotherapy for organs-at-risk and lymph node areas.: https://doi.org/10.1186/s13014-024-02554-y (abstract retrieved; retrieved 2026-10-15).
- A Deep Learning-Based Automated CT Segmentation of Prostate Cancer Anatomy for Radiation Therapy Planning-A Retrospective Multicenter Study.: https://doi.org/10.3390/diagnostics10110959 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning.: https://doi.org/10.1002/acm2.70765 (abstract retrieved; retrieved 2026-10-15).
- Search: jjrt.26-1649 MVision Contour+ (2026-10-15) — http://dx.doi.org/10.6009/jjrt.26-1649
- Search: MVision Contour+ clinical evaluation vendor site (2026-10-15) — https://mvision.ai/contour/
- Search: 10.3389/fonc.2023.1213068 Doolan five commercial AI contouring (2026-10-15) — https://www.frontiersin.org/journals/oncology/articles/10.3389/fonc.2023.1213068/full
- Limits: jjrt.26-1649 abstract and Crossref metadata reviewed; Japanese-language full text not retrieved.

#### New-source / product leads (not admitted or scored)

- Clinical Evaluation of AI-based Automatic Contouring for Thoracic Structures: http://dx.doi.org/10.6009/jjrt.26-1649. Contour+ (MVision AI) — correct, named explicitly in abstract verified-new
- Search: "Contour+" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Contour%2B%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Hybrid Breast Augmentation Using Subglandular Implants and Intraoperative Contour-Guided Fat Grafting in a Slender Patient: A Case Report: https://doi.org/10.21203/rs.3.rs-11289874/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- The dominant role of physical contour and the modulatory role of psychological contour in fat face illusion.: https://doi.org/10.1037/xhp0001459. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Anatomy-Driven Aesthetic Design for Facial Contouring in Northeast Asian Females: A Conceptual Framework and Case Report.: https://doi.org/10.2147/ccid.s606211. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### mirada-dlc

- **Name**: DLC Expert
- **Company**: Mirada Medical
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | newCitation | warn | New paper 10.1016/j.tipsro.2026.100437 (Miovecz et al., tipsRO, 2026) compares Mirada DLCExpert, Limbus AI, and MVision Contour+ for H&N OARs/nodes and reports that Mirada ('Model D') applies a materially different anatomical definition for esophagus and spinal canal, yielding DSC of only 0.40 and 0.57 (model volumes 35% and 44% of expert volume) — a clinically important discordance not currently reflected anywhere in Mirada's audited evidence base. | Add this DOI as a rigor/impact source or at minimum a qualityFlag/limitation noting structure-definition discordance for esophagus and spinal canal; do not let the paper's favorable 5-OAR performance (DSC 0.92) overshadow the 2-OAR divergence in any impact rationale. |
| Evidence | vendorIndependence | warn | Current impactSource (Vaassen 2020) is explicitly flagged vendorIndependent:false and prototype-stage, which is already transparently disclosed — correctly not marked 'clean'. | None; this is a good example of accurate non-clean labelling. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.mirada-medical.com/radiation-oncology; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Evaluation of measures for assessing time-saving of automatic organ-at-risk segmentation in radiotherapy.: https://doi.org/10.1016/j.phro.2019.12.001 (abstract retrieved; retrieved 2026-10-15).
- An evaluation of MR based deep learning auto-contouring for planning head and neck radiotherapy.: https://doi.org/10.1016/j.radonc.2021.02.018 (abstract retrieved; retrieved 2026-10-15).
- Assessment of contour accuracy in head and neck replanning: Deep learning trained model compared with deformable image registration propagation technique.: https://doi.org/10.1016/j.meddos.2025.04.004 (abstract retrieved; retrieved 2026-10-15).
- Clinical evaluation of deep learning and atlas-based auto-segmentation for critical organs at risk in radiation therapy.: https://doi.org/10.1002/jmrs.618 (abstract retrieved; retrieved 2026-10-15).
- Evaluating the Effectiveness of Deep Learning Contouring across Multiple Radiotherapy Centres.: https://doi.org/10.1016/j.phro.2022.11.003 (abstract retrieved; retrieved 2026-10-15).
- External validation of deep learning-based contouring of head and neck organs at risk.: https://doi.org/10.1016/j.phro.2020.06.006 (abstract retrieved; retrieved 2026-10-15).
- A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy.: https://doi.org/10.3389/fonc.2023.1213068 (abstract retrieved; retrieved 2026-10-15).
- Search: Mirada DLCExpert auto-contouring vendor product page models (2026-10-15) — https://www.mirada-medical.com/radiation-oncology
- Search: Clinical evaluation of three deep learning contouring models for head and neck Miovecz tipsro 2026.100437 (2026-10-15) — https://doi.org/10.1016/j.tipsro.2026.100437
- Search: 10.1016/j.phro.2022.11.003 Walker DLCExpert multi-centre (2026-10-15) — https://doi.org/10.1016/j.phro.2022.11.003
- Limits: Abstract and Crossref metadata reviewed for tipsro.2026.100437; full text with per-structure numeric table not retrieved.

#### New-source / product leads (not admitted or scored)

- Clinical evaluation of three deep learning contouring models for head and neck organs at risk and lymph node levels: https://doi.org/10.1016/j.tipsro.2026.100437. Mirada DLCExpert, Limbus AI, MVision Contour+ — correct, all three named in abstract verified-new
- Search: "DLC Expert" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22DLC%20Expert%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Automatic pelvic bone segmentation for radiotherapy using diagnostic imaging workstation.: https://doi.org/10.5603/rpor.109519. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### raysearch-raystation

- **Name**: Deep Learning Segmentation
- **Company**: RaySearch Laboratories
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L4 / R3
- **Stored scores**: E2 / L4
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | doi-reuse | warn | The same DOI (10.1016/j.phro.2026.100999) is used for BOTH rigorSource and impactSource, which is internally consistent but means the E2/L4 rating rests on a single prospective single-centre study rather than independent corroboration. A second relevant paper exists (Barati/Duan et al., regression-test study of a commercial RayStation DLS model, acm2.70824) that could diversify the evidence base. | Consider adding the regression-test study as a secondary rigor/impact source, or note in qualityFlags that evidence currently relies on a single study/DOI for both scores. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L4 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.raysearchlabs.com/media/publications/deep-learning-segmentation-model-catalogue/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- A geometry and dose-volume based performance monitoring of artificial intelligence models in radiotherapy treatment planning for prostate cancer.: https://doi.org/10.1016/j.phro.2023.100494 (abstract retrieved; retrieved 2026-10-15).
- Clinical evaluation of a deep learning segmentation model including manual adjustments afterwards for locally advanced breast cancer.: https://doi.org/10.1016/j.tipsro.2023.100211 (abstract retrieved; retrieved 2026-10-15).
- Validation of different automated segmentation models for target volume contouring in postoperative radiotherapy for breast cancer and regional nodal irradiation.: https://doi.org/10.1016/j.ctro.2024.100855 (abstract retrieved; retrieved 2026-10-15).
- Automated segmentation of target volumes in breast cancer radiotherapy, impact on target size and dose to organs at risk.: https://doi.org/10.1016/j.ctro.2025.100986 (abstract retrieved; retrieved 2026-10-15).
- Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy.: https://doi.org/10.1016/j.phro.2023.100515 (abstract retrieved; retrieved 2026-10-15).
- A fully automated machine-learning-based workflow for radiation treatment planning in prostate cancer.: https://doi.org/10.1016/j.ctro.2025.100933 (abstract retrieved; retrieved 2026-10-15).
- Autodelineation methods in a simulated fully automated proton therapy workflow for esophageal cancer.: https://doi.org/10.1016/j.phro.2024.100646 (abstract retrieved; retrieved 2026-10-15).
- Automated deep learning segmentation and planning for left-sided breast radiotherapy with minimised adaptations based on dose, TCP and NTCP criteria.: https://doi.org/10.1016/j.phro.2026.100961 (abstract retrieved; retrieved 2026-10-15).
- Comparison of the output of a deep learning segmentation model for locoregional breast cancer radiotherapy trained on 2 different datasets.: https://doi.org/10.1016/j.tipsro.2023.100209 (abstract retrieved; retrieved 2026-10-15).
- Large-scale dose evaluation of deep learning organ contours in head-and-neck radiotherapy by leveraging existing plans.: https://doi.org/10.1016/j.phro.2024.100572 (abstract retrieved; retrieved 2026-10-15).
- Linking RayStation AI auto-contouring with Eclipse TPS: a scripted workflow for clinical integration.: https://doi.org/10.5603/rpor.109182 (abstract retrieved; retrieved 2026-10-15).
- Prospective blinded clinical evaluation of a fully automated workflow for prostate radiotherapy.: https://doi.org/10.1016/j.phro.2026.100999 (abstract retrieved; retrieved 2026-10-15).
- Statistical process control for performance monitoring and continuous quality assurance of deep learning segmentations in radiotherapy.: https://doi.org/10.1016/j.phro.2025.100873 (abstract retrieved; retrieved 2026-10-15).
- Stress-testing pelvic autosegmentation algorithms using anatomical edge cases.: https://doi.org/10.1016/j.phro.2023.100413 (abstract retrieved; retrieved 2026-10-15).
- Validation of a deep-learning segmentation model for adult and pediatric head and neck radiotherapy in different patient positions.: https://doi.org/10.1016/j.phro.2023.100527 (abstract retrieved; retrieved 2026-10-15).
- Geometric and Dosimetric Evaluation of a RayStation Deep Learning Model for Auto-Segmentation of Organs at Risk in a Real-World Head and Neck Cancer Dataset.: https://doi.org/10.1016/j.clon.2025.103796 (abstract retrieved; retrieved 2026-10-15).
- A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy.: https://doi.org/10.3389/fonc.2023.1213068 (abstract retrieved; retrieved 2026-10-15).
- Extensive clinical testing of Deep Learning Segmentation models for thorax and breast cancer radiotherapy planning.: https://doi.org/10.1080/0284186x.2023.2270152 (abstract retrieved; retrieved 2026-10-15).
- Search: RaySearch RayStation Deep Learning Segmentation clinical validation vendor (2026-10-15) — https://www.raysearchlabs.com/media/publications/case-studies/deep-learning-segmentation/
- Search: 10.1016/j.phro.2026.100999 Neugebauer prospective blinded prostate RayStation (2026-10-15) — https://doi.org/10.1016/j.phro.2026.100999
- Search: RayStation DLS regression test commercial auto-segmentation acm2.70824 (2026-10-15) — https://www.ovid.com/journals/jacmp/fulltext/10.1002/acm2.70824
- Limits: Did not retrieve full text of phro.2026.100999 to confirm RayStation is explicitly named in methods; relying on static-audit rationale text only.

#### New-source / product leads (not admitted or scored)

- Prospective blinded clinical evaluation of a fully automated workflow for prostate radiotherapy: https://doi.org/10.1016/j.phro.2026.100999. RayStation (RaySearch) — plausible given RapidPlan/VMAT automated workflow context; not independently re-verified word-for-word plausible-unverified
- Search: "Deep Learning Segmentation" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Deep%20Learning%20Segmentation%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Quantitative super-resolution imaging with deep learning segmentation reveals early mitochondrial network remodeling and altered mitochondria-lysosome interactions in Pompe disease muscle: https://doi.org/10.21203/rs.3.rs-11005901/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Validation of Automated Strain Calculation Initialised by Deep Learning Segmentation for Abdominal Aortic Aneurysm Ultrasound.: https://doi.org/10.1016/j.ejvs.2026.09.041. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Biocementation shows a three-dimensional geometry dependence in microfluidic pore networks mapped by deep-learning segmentation.: https://doi.org/10.1039/d6lc00125d. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep Learning Segmentation of Abdominal Organs Across Ultrasound, MRI, and CT: A Scoping Review of Modality-Specific Approaches and the Emerging Role of Foundation Models and LLM-Based Agents.: https://doi.org/10.1007/s10278-026-02271-w. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- DUCK-Net: automated deep learning segmentation of ductular reactions in murine liver injury captures multicellular niche dynamics from H&amp;E morphology.: https://doi.org/10.1002/path.70113. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### therapanacea-annotate

- **Name**: Annotate
- **Company**: Therapanacea
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | productIdentity | warn | impactSource rationale names 'ART-Plan' (Therapanacea's umbrella platform) for a real-world H&N evaluation, but Annotate is the contouring module within ART-Plan, not a separately branded product in the cited study. This is a brand-granularity issue: product-level attribution (Annotate) vs. platform-level attribution (ART-Plan) is blurred. | Clarify in rationale whether the paper tested the Annotate module specifically or the ART-Plan platform broadly, since both Annotate and SmartPlan are marketed as separate modules of ART-Plan. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Clinical Implementation and Evaluation of Auto-Segmentation Tools for Multi-Site Contouring in Radiotherapy.: https://doi.org/10.1016/j.phro.2023.100515 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of a quasi-automatic treatment planning workflow for head-and-neck cancer in radiotherapy.: https://doi.org/10.1016/j.phro.2026.100983 (abstract retrieved; retrieved 2026-10-15).
- Real-world performance evaluation of commercial autocontouring software for head and neck cancer radiotherapy.: https://doi.org/10.1093/bjr/tqaf098 (abstract retrieved; retrieved 2026-10-15).
- Artificial intelligence contouring in radiotherapy for organs-at-risk and lymph node areas.: https://doi.org/10.1186/s13014-024-02554-y (abstract retrieved; retrieved 2026-10-15).
- Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation.: https://doi.org/10.1007/s13246-024-01434-9 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of Two Commercial Artificial Intelligence Segmentation Systems for Radiation Therapy.: https://doi.org/10.4103/jmp.jmp_11_25 (abstract retrieved; retrieved 2026-10-15).
- Head and neck automatic multi-organ segmentation on Dual-Energy Computed Tomography.: https://doi.org/10.1016/j.phro.2024.100654 (abstract retrieved; retrieved 2026-10-15).
- Search: Therapanacea Annotate CE FDA clearance (2026-10-15) — https://www.therapanacea.us/annotate
- Search: 10.1007/s13246-024-01434-9 Kim multiple AI auto-contouring systems (2026-10-15) — https://doi.org/10.1007/s13246-024-01434-9
- Search: 10.1093/bjr/tqaf098 Young ART-Plan real-world H&N (2026-10-15) — https://doi.org/10.1093/bjr/tqaf098
- Limits: Full text of both cited DOIs not retrieved; module vs. platform naming could not be confirmed from abstract metadata alone.

#### New-source / product leads (not admitted or scored)

- Real-world performance evaluation of commercial autocontouring software for head and neck cancer radiotherapy: https://doi.org/10.1093/bjr/tqaf098. ART-Plan/Annotate (Therapanacea) — module-level attribution ambiguous needs-clarification
- Search: "Annotate" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Annotate%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Using reasoning LLMs to extract SDOH events from clinical notes.: https://doi.org/10.1109/ichi69079.2026.00022. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Sensory Survey 3D: an open source utility for the annotation of projected fields for sensory neural interfaces.: https://doi.org/10.1109/tnsre.2026.3737698. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- A scoping review of human-AI collaboration patterns and task divisions in healthcare applications.: https://doi.org/10.1038/s41746-026-02912-y. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- CytoGate-Bench: an LLM benchmark for cross-panel cell gating in cytometry: https://doi.org/10.64898/2026.08.24.746336. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Identification of DNA-Binding Factor Enrichment in Chromatin Accessibility Data to Define a Persister Cell Signature.: https://doi.org/10.21769/bioprotoc.5800. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### therapanacea-tumorbox

- **Name**: TumorBox
- **Company**: Therapanacea
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidenceBase | warn | static-audit.json correctly shows rigor E0 / impact L1c (stored, provisional, paperCount 0, vendorIndependent:false) for TumorBox — no inflated or falsely-clean scoring found; vendor marketing states '93% time saved' but this is explicitly NOT reflected in the independently computed score. | None; this is an example of appropriately conservative (non-'clean') scoring that should be preserved. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Therapanacea TumorBox tumor contouring clinical evidence (2026-10-15) — https://www.therapanacea.us/ai-cancer-treatment-solutions
- Search: TumorBox DLinRT FDA CE clearance (2026-10-15) — https://dlinrt.eu/products/company/therapanacea
- Limits: No peer-reviewed, TumorBox-specific clinical paper was located in this pass; vendor page is marketing-only (93% time-saved figure attributed to ART-Plan broadly, not isolated to TumorBox).
- Search: "TumorBox" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22TumorBox%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### therapanacea-brachybox

- **Name**: BrachyBox
- **Company**: Therapanacea
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L2 / R2 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | productMaturity | warn | Vendor's own US site lists BrachyBox under 'Coming Soon' (not yet released) as of the search snapshot, while static-audit.json already shows E0/L2 stored/provisional with paperCount 0 — consistent, not falsely 'clean'. | Confirm current release status before any future score upgrade; flag product as pre-release in public-facing records if still accurate. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Therapanacea BrachyBox brachytherapy auto-segmentation clinical (2026-10-15) — https://www.therapanacea.us/ai-cancer-treatment-solutions
- Limits: Release status taken from a single vendor page snapshot; could not cross-check with company-level press release for a firm release date.
- Search: "BrachyBox" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22BrachyBox%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### ai-medical-jazz

- **Name**: Jazz
- **Company**: AI Medical
- **Category**: Auto-Contouring
- **Current effective scores**: E1 / L3 / R3
- **Stored scores**: E1 / L3
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | classification | warn | Jazz is described on the vendor's own site as a neuroradiology 'lesion tracking and reporting' tool for diagnostic MS follow-up (single-click annotation, volumetric lesion tracking, automated report generation) — it is not a radiotherapy organ/target auto-contouring product. Its sole supporting publication (Federau et al., Neuroradiology 2024) evaluates diagnostic MS-lesion reading productivity/quality, not RT contouring. Classifying Jazz under 'Auto-Contouring' (an RT category) alongside true OAR/target contouring tools like Limbus or MVision is a category-fit mismatch. | Re-examine whether Jazz belongs in the Auto-Contouring (radiotherapy) category at all, or whether it should be reclassified/footnoted as a diagnostic neuroradiology tool with only tangential RT relevance. At minimum, the impact rationale should state explicitly that the supporting evidence is diagnostic, not RT-contouring, evidence. |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | clinicalDomain | warn | L3 clinical impact label for Jazz is derived from a diagnostic-radiology productivity study, not a radiotherapy planning/dosimetric study — applying an RT clinical-impact tier to non-RT evidence risks a false 'clean' L3 impact rating. | Down-grade or re-derive the impact label using RT-specific criteria, or mark impact as not-applicable/out-of-scope for RT auto-contouring comparisons. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.ai-medical.ch/jazz; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Evaluation of the quality and the productivity of neuroradiological reading of multiple sclerosis follow-up MRI scans using an intelligent automation software.: https://doi.org/10.1007/s00234-024-03293-3 (abstract retrieved; retrieved 2026-10-15).
- Search: AI Medical Jazz contouring radiotherapy France vendor product (2026-10-15) — https://www.ai-medical.ch/jazz
- Search: Federau neuroradiological reading multiple sclerosis follow-up MRI intelligent automation (2026-10-15) — https://doi.org/10.1007/s00234-024-03293-3
- Limits: Only one supporting paper exists for Jazz; no RT-specific (OAR/target volume) contouring literature was found for this product.

#### New-source / product leads (not admitted or scored)

- Evaluation of the quality and the productivity of neuroradiological reading of multiple sclerosis follow-up MRI scans using an intelligent automation software: https://doi.org/10.1007/s00234-024-03293-3. Jazz (AI Medical) — correct product attribution, but diagnostic-domain study used to score an RT-category product domain-mismatch
- Search: "Jazz" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Jazz%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Stating the Head, Playing the Changes: A Jazz Reading of Rome V.: https://doi.org/10.1053/j.gastro.2026.09.016. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Digital jazz and emotional regulation: A neuroaffective and streaming behavior analysis of psychological escapism.: https://doi.org/10.1016/j.actpsy.2026.107461. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Improvising through ambiguity: Jazz leadership principles for nurse leaders.: https://doi.org/10.1097/nmg.0000000000000386. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Permanent Scaffolding of Social Expertise.: https://doi.org/10.1007/s10441-026-09533-8. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Melding Structured Care With Improvisation-Jazz in Medicine.: https://doi.org/10.1001/jamaoncol.2026.3376. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### carina-intcontour

- **Name**: INTContour
- **Company**: Carina AI
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | titleAttribution | warn | publication-checks.json requestedTitle for key 10.1002/mp.16299 is 'Follow-up evaluation of IntContour', but the actual paper (Duan, Bernard, Castle, Feng, Wang, Kenamond, Chen, Med Phys 2023) is 'Contouring quality assurance methodology based on multiple geometric features against deep learning auto-segmentation' — a generic DLAS-based manual-contour QA classifier study using a public 339-case dataset, not a clinical evaluation of the IntContour product itself. Two co-authors (Castle, Feng) are listed as affiliated with 'Carina Medical LLC' per the University of Kentucky repository record, so the paper has an undisclosed vendor-affiliation link to Carina AI, but it is not a 'follow-up evaluation of IntContour' as the requested title implies. | Correct the requestedTitle/attribution to the paper's actual title and scope (a generic QA-classifier methodology study with Carina-affiliated co-authors), and flag vendorIndependent:false rather than implying it is an independent or product-specific follow-up validation. |
| Evidence | keyPapers:10.1002/mp.16299 | warn | Citation title differs from retrieved metadata: Contouring quality assurance methodology based on multiple geometric features against deep learning auto-segmentation.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.carinaai.com/intcontour.html; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Deep learning vs. atlas-based models for fast auto-segmentation of the masticatory muscles on head and neck CT images.: https://doi.org/10.1186/s13014-020-01617-0 (abstract retrieved; retrieved 2026-10-15).
- Establishing prospective performance monitoring for real-world implementation of deep learning-based auto-segmentation in prostate cancer radiotherapy.: https://doi.org/10.1016/j.phro.2025.100886 (abstract retrieved; retrieved 2026-10-15).
- Evaluating Automatic Segmentation for Swallowing-Related Organs for Head and Neck Cancer.: https://doi.org/10.1177/15330338221105724 (abstract retrieved; retrieved 2026-10-15).
- Impact of Artificial Intelligence-Based Autosegmentation of Organs at Risk in Low- and Middle-Income Countries.: https://doi.org/10.1016/j.adro.2024.101638 (abstract retrieved; retrieved 2026-10-15).
- Evaluating the clinical acceptability of deep learning contours of prostate and organs-at-risk in an automated prostate treatment planning process.: https://doi.org/10.1002/mp.15525 (abstract retrieved; retrieved 2026-10-15).
- Contouring quality assurance methodology based on multiple geometric features against deep learning auto-segmentation.: https://doi.org/10.1002/mp.16299 (abstract retrieved; retrieved 2026-10-15).
- Evaluating the impact of different deface algorithms on deep learning segmentation software performance.: https://doi.org/10.3389/fonc.2025.1603593 (abstract retrieved; retrieved 2026-10-15).
- Search: 10.1002/mp.16299 IntContour Carina AI follow-up evaluation (2026-10-15) — https://doi.org/10.1002/mp.16299
- Search: Carina AI IntContour vendor product adro.2024.101638 LMIC (2026-10-15) — https://doi.org/10.1016/j.adro.2024.101638
- Limits: Confirmed via Crossref, AAPM/Wiley, and UKnowledge repository record showing Carina Medical LLC affiliations; full PDF not retrieved to check for any incidental IntContour product mention in-text.

#### New-source / product leads (not admitted or scored)

- Contouring quality assurance methodology based on multiple geometric features against deep learning auto-segmentation: https://doi.org/10.1002/mp.16299. Mislabeled as 'Follow-up evaluation of IntContour' — actual paper is a generic QA methodology study with Carina Medical-affiliated co-authors (not an IntContour product evaluation) mismatch-confirmed
- Search: "INTContour" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22INTContour%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Lessons Learned From an Epic Transformation of a Radiation Oncology Department in Guatemala: Keys to Success.: https://doi.org/10.1016/j.adro.2025.101928. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Improving the Precision of Deep-Learning-Based Head and Neck Target Auto-Segmentation by Leveraging Radiology Reports Using a Large Language Model.: https://doi.org/10.3390/cancers17121935. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Dosimetric Comparison of Organs At Risk Between Artificial Intelligence-Based Auto-Contouring and Manual Contouring for High-Risk Prostate Cancer Radiotherapy: A Retrospective Study.: https://doi.org/10.7759/cureus.91810. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### coreline-aview-rt-acs

- **Name**: Aview RT ACS
- **Company**: Coreline Soft Co
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / unassessed
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | scopeNarrowness | warn | Both rigorSource and impactSource use the identical DOI (10.1016/j.ijrobp.2024.02.041) and both are breast-only; AVIEW RT-ACS has several other vendor-published breast studies (2020, 2021 IJROBP/Radiat Oncol) that could broaden the evidence base but all are also breast-specific and largely vendor-coauthored. | Note in limitations/qualityFlags that AVIEW RT-ACS's clinical evidence to date is concentrated in a single anatomical site (breast) and largely authored by groups with repeat vendor collaboration (Coreline-affiliated co-authors across multiple cited studies). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | id | warn | Multiple source definitions (may be unused or archived): src/data/products/auto-contouring/coreline-soft-co.ts, src/data/products/auto-contouring/coreline.ts | Verify source before editing |

#### Re-scoring proposal

- Proposed: E2 / L3 / unassessed (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.corelinesoft.com/en/solutions/rt-acs; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Experience of Implementing Deep Learning-Based Automatic Contouring in Breast Radiation Therapy Planning: Insights From Over 2000 Cases.: https://doi.org/10.1016/j.ijrobp.2024.02.041 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of deep learning-based autosegmentation in breast cancer radiotherapy.: https://doi.org/10.1186/s13014-021-01923-1 (abstract retrieved; retrieved 2026-10-15).
- Comprehensive clinical evaluation of deep learning-based auto-segmentation for radiotherapy in patients with cervical cancer.: https://doi.org/10.3389/fonc.2023.1119008 (abstract retrieved; retrieved 2026-10-15).
- Search: Coreline Soft Aview RT ACS auto contouring clinical validation (2026-10-15) — https://www.corelinesoft.com/en/publications/RT-ACS/
- Search: 10.1016/j.ijrobp.2024.02.041 Lee breast 2000 cases auto-contouring (2026-10-15) — https://doi.org/10.1016/j.ijrobp.2024.02.041
- Limits: Vendor publication list and abstracts reviewed; exact DOI-to-vendor-listing match not independently cross-verified against CrossRef metadata in this pass.

#### New-source / product leads (not admitted or scored)

- Deep-learning auto-contouring in breast radiation therapy: 2000+ cases: https://doi.org/10.1016/j.ijrobp.2024.02.041. AVIEW RT-ACS (Coreline Soft) — plausible match to the vendor's own '2,428 cases' IJROBP publication listing plausible-unverified
- Search: "Aview RT ACS" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Aview%20RT%20ACS%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### everfortune-rt-suite

- **Name**: RT Suite v1 (HCAP-Segmentation)
- **Company**: Ever Fortune AI
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidenceBase | warn | static-audit.json correctly scores RT Suite v1 as E0/L1c stored/provisional with paperCount 0 — no clinical paper is directly tied to this product in the scoring, which is accurate since the one identified EFAI-related paper (radonc.2023.109528) is attached to Seg Pro V3's record instead, not RT Suite's. | None — appropriately conservative, non-'clean' scoring. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.everfortuneai.com.tw/en/2023/11/10/%e6%94%be%e5%b0%84%e6%b2%bb%e7%99%82%e5%99%a8%e5%ae%98%e5%8b%be%e5%8b%92%e7%b3%bb%e7%b5%b1/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Ever Fortune AI RT Suite FDA 510k K231928 (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf23/K231928.pdf
- Search: EverFortune AutoSeg clinical literature radonc.2023.109528 (2026-10-15) — https://doi.org/10.1016/j.radonc.2023.109528
- Limits: FDA 510(k) K231928 (EFAI RTSUITE CT HCAP-Segmentation System) confirms regulatory clearance only; no independent clinical outcome literature specific to RT Suite v1 was found.
- Search: "RT Suite v1 HCAP-Segmentation" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22RT%20Suite%20v1%20HCAP-Segmentation%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### everfortune-seg-pro-v3

- **Name**: Seg Pro V3 (RT-300)
- **Company**: Ever Fortune AI
- **Category**: Auto-Contouring
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-28; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | productVersionMismatch | warn | static-audit.json rationale for Seg Pro V3 is self-disclosed as evaluating 'the shared EFAI segmentation engine rather than the Seg Pro V3 release specifically' with vendorIndependent:false — this is already correctly flagged as non-clean/non-independent, consistent with the FDA record showing Seg Pro V3 (RT-300, K251306) is a later, distinct 510(k) clearance from the original EFAI RTSUITE (K231928) used in the 2023 paper. | None required beyond what is already disclosed; confirm in any future product-page copy that Seg Pro V3 and the cited 2023 paper's software version are not conflated as identical products. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.everfortuneai.com.tw/en/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Developing an AI-assisted planning pipeline for hippocampal avoidance whole brain radiotherapy.: https://doi.org/10.1016/j.radonc.2023.109528 (abstract retrieved; retrieved 2026-10-15).
- Search: Ever Fortune Seg Pro V3 RT-300 FDA 510k K251306 (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251306.pdf
- Search: 10.1016/j.radonc.2023.109528 Lin hippocampal avoidance whole brain EFAI (2026-10-15) — https://doi.org/10.1016/j.radonc.2023.109528
- Limits: Two separate FDA 510(k) numbers (K231928 vs K251306) confirm RT Suite and Seg Pro V3 are formally distinct clearances across different submission years.

#### New-source / product leads (not admitted or scored)

- Developing an AI-assisted planning pipeline for hippocampal avoidance whole brain radiotherapy: https://doi.org/10.1016/j.radonc.2023.109528. EFAI engine (predecessor to Seg Pro V3) — correctly flagged as not product-version-specific and vendor-collaborative verified-with-caveat
- Search: "Seg Pro V3 RT-300" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Seg%20Pro%20V3%20RT-300%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### ge-auto-segmentation

- **Name**: Auto Segmentation
- **Company**: GE Healthcare
- **Category**: Auto-Contouring
- **Current effective scores**: E1 / L3 / R3 (efficacy provisional)
- **Stored scores**: E1 / L3
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | warn | E1 claimed without scored attributable peer-reviewed papers | Verify source before editing |
| Evidence | evidenceOrigin | warn | rigorOrigin/impactOrigin are 'stored' (not 'papers') with paperCount 1 but scoredPaperCount 0, meaning the E1/L3 rating is not derived from a scored literature entry yet qualityFlags report multiCenter:true, multiNational:true and externalValidation:true as if already substantiated — a potential false 'clean' quality-flag state given no scored paper backs the claim. | Either attach the specific paperCount=1 source explicitly so its multi-center/multi-national/external-validation claims can be verified, or set these qualityFlags to false/unknown until a scorable source is linked. |
| Evidence | keyPapers:pmid:PMC10741804 | warn | Citation title differs from retrieved metadata: Clinical Use of a Commercial Artificial Intelligence-Based Software for Autocontouring in Radiation Therapy: Geometric Performance and Dosimetric Impact.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Evidence | rescoring | warn | PMC10741804 is Hoque et al., PMID 38136281, evaluating Limbus Contour v1.0.18, not GE Auto Segmentation. Remove the misattributed scored paper. Existing GE notes already state E0; L1c is a provisional descriptive fallback only. FDA validation must remain distinguished from peer-reviewed evidence; keep R unchanged. | Separate correction pass; reviewer-check source attribution and score notes first |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R3 (not applied)
- Rationale: PMC10741804 is Hoque et al., PMID 38136281, evaluating Limbus Contour v1.0.18, not GE Auto Segmentation. Remove the misattributed scored paper. Existing GE notes already state E0; L1c is a provisional descriptive fallback only. FDA validation must remain distinguished from peer-reviewed evidence; keep R unchanged.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/en-us/products/imaging-applications/advanced-visualization-applications/auto-segmentation; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Clinical Use of a Commercial Artificial Intelligence-Based Software for Autocontouring in Radiation Therapy: Geometric Performance and Dosimetric Impact.: https://doi.org/10.3390/cancers15245735 (abstract retrieved; retrieved 2026-10-15).
- Search: GE Healthcare Auto Segmentation AI contouring clinical evaluation (2026-10-15) — https://www.gehealthcare.com/en/products/imaging-applications/advanced-visualization-applications/auto-segmentation
- Limits: Vendor product page confirms CT-only OAR auto-segmentation with GE-qualified scanner dependency; the single uncited supporting paper referenced by paperCount:1 could not be identified by DOI in this pass.
- Search: "Auto Segmentation" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Auto%20Segmentation%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Clinical evaluation of novel deep learning-based auto-segmentation software: Utility and potential pitfalls.: https://doi.org/10.1002/acm2.70757. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- External evaluation of a deep learning-based algorithm for automated lung tumor and esophagus segmentation on CBCT.: https://doi.org/10.1088/2057-1976/aeaf5c. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Integration of AI-Based Synthetic CT Generation and Auto-Segmentation for CBCT-Guided Adaptive Radiotherapy in Prostate Cancer: A Feasibility Study.: https://doi.org/10.3390/cancers18162607. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- A prospective development and evaluation of a 2D convolutional neural network-based auto-segmentation model for cervical cancer radiotherapy.: https://doi.org/10.1186/s43046-026-00382-7. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### hura-dvtarget

- **Name**: DV.TARGET
- **Company**: Hura Imaging
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidenceBase | warn | static-audit.json correctly scores DV.TARGET E0/L1c, stored/provisional, paperCount 0, vendorIndependent:false — consistent with the FDA 510(k) summary (K202928) showing only a single-site (City of Hope) retrospective comparison study, no independent peer-reviewed clinical publication identified. | None — conservative scoring correctly avoids a false 'clean' rating despite vendor-listed publications (Tang 2019, Zhu 2019, Sun 2020) that describe the underlying algorithm research rather than the commercial DV.TARGET product in clinical use. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: http://www.huraimaging.com/dvtarget/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Hura Imaging DV.TARGET auto contouring product (2026-10-15) — http://www.huraimaging.com/dvtarget/
- Search: DV.Target FDA 510k K202928 Deepvoxel (2026-10-15) — https://fda.innolitics.com/device/K202928
- Limits: FDA Innolitics summary and vendor publications list reviewed; none of the three vendor-listed research papers (Nature Machine Intelligence 2019; Med Phys 2019; ISBI 2020) are product-validation studies of the commercial DV.TARGET release.
- Search: "DV.TARGET" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22DV.TARGET%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### manteia-accucontour

- **Name**: AccuContour
- **Company**: Manteia
- **Category**: Auto-Contouring
- **Current effective scores**: E1 / L3 / R3
- **Stored scores**: E1 / L3
- **Last revised**: 2026-09-29; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | warn | 2 provisional paper scores require source retrieval | Verify source before editing |
| Evidence | titleAttribution | warn | publication-checks.json requestedTitle for 10.3389/fonc.2022.833816 is 'AccuContour clinical evaluation' vs. actual title 'Evaluation Exploration of Atlas-Based and Deep Learning-Based Automatic Contouring for Nasopharyngeal Carcinoma.' Unlike the IntContour case, the abstract DOES confirm AccuContour® is the DL-based model used, and two co-authors (Chen, Yang) are Manteia Technologies employees. The requestedTitle is a paraphrase/shorthand, not a false attribution — product and vendor-affiliation are both correctly identifiable from the real title/abstract. | Low-priority: replace the paraphrased requestedTitle with the verbatim published title to avoid any appearance of a mismatch, but no substantive correction needed. |
| Evidence | vendorIndependence | warn | Current rigorSource (Zhu et al. 2025, phro.2025.100886) is vendor-independent per qualityFlags, but a more recent, more directly relevant Manteia-coauthored paper exists (Yan/Fei et al., Sci Rep 2025, 'Consistency evaluation and performance optimization of deep learning-based auto-contouring for nasopharyngeal carcinoma') with Manteia Technologies co-authors — not currently reflected in the scored evidence set. | Consider adding the 2025 Scientific Reports paper as an additional (vendor-affiliated) evidence point, clearly flagged vendorIndependent:false. |
| Evidence | keyPapers:10.3389/fonc.2022.833816 | warn | Citation title differs from retrieved metadata: Evaluation Exploration of Atlas-Based and Deep Learning-Based Automatic Contouring for Nasopharyngeal Carcinoma.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.manteiamedical.com/accucontour; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Establishing prospective performance monitoring for real-world implementation of deep learning-based auto-segmentation in prostate cancer radiotherapy.: https://doi.org/10.1016/j.phro.2025.100886 (abstract retrieved; retrieved 2026-10-15).
- Development and validation of a deep reinforcement learning algorithm for auto-delineation of organs at risk in cervical cancer radiotherapy.: https://doi.org/10.1038/s41598-025-91362-9 (abstract retrieved; retrieved 2026-10-15).
- Impact of Denoising on Deep-Learning-Based Automatic Segmentation Framework for Breast Cancer Radiotherapy Planning.: https://doi.org/10.3390/cancers14153581 (abstract retrieved; retrieved 2026-10-15).
- Interobserver delineation variability of computed tomography-based radiomic features of the parotid gland.: https://doi.org/10.3857/roj.2023.00605 (abstract retrieved; retrieved 2026-10-15).
- Online Adaptive Proton Therapy Facilitated by Artificial Intelligence-Based Autosegmentation in Pencil Beam Scanning Proton Therapy.: https://doi.org/10.1016/j.ijrobp.2024.09.032 (abstract retrieved; retrieved 2026-10-15).
- Evaluation Exploration of Atlas-Based and Deep Learning-Based Automatic Contouring for Nasopharyngeal Carcinoma.: https://doi.org/10.3389/fonc.2022.833816 (abstract retrieved; retrieved 2026-10-15).
- Clinical validation of commercial deep-learning based auto-segmentation models for organs at risk in the head and neck region: a single institution study.: https://doi.org/10.3389/fonc.2024.1375096 (abstract retrieved; retrieved 2026-10-15).
- Consistency evaluation and performance optimization of deep learning-based auto-contouring for nasopharyngeal carcinoma.: https://doi.org/10.1038/s41598-025-33567-6 (abstract retrieved; retrieved 2026-10-15).
- Patient-specific daily updated deep learning auto-segmentation for MRI-guided adaptive radiotherapy.: https://doi.org/10.1016/j.radonc.2022.11.004 (abstract retrieved; retrieved 2026-10-15).
- Search: Manteia AccuContour FDA CE clinical evaluation nasopharyngeal (2026-10-15) — https://www.frontiersin.org/journals/oncology/articles/10.3389/fonc.2024.1375096/full
- Search: 10.3389/fonc.2022.833816 AccuContour nasopharyngeal carcinoma (2026-10-15) — https://pmc.ncbi.nlm.nih.gov/articles/PMC9008357/
- Limits: fonc.2024.1375096 (Johnson/Press et al., single-institution AccuContour vs MIM ProtégéAI comparison) also reviewed as corroborating but independent evidence not yet incorporated into static-audit.json.

#### New-source / product leads (not admitted or scored)

- Evaluation Exploration of Atlas-Based and Deep Learning-Based Automatic Contouring for Nasopharyngeal Carcinoma: https://doi.org/10.3389/fonc.2022.833816. AccuContour (Manteia) — correct, confirmed in abstract/methods and via Manteia-affiliated co-authors verified
- Search: "AccuContour" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AccuContour%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Evaluating the impact of different deface algorithms on deep learning segmentation software performance.: https://doi.org/10.3389/fonc.2025.1603593. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Quality assurance incorporating artificial intelligence-generated reference contours in a phase II radiotherapy trial.: https://doi.org/10.1016/j.phro.2026.100949. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Machine learning-based prediction of severe oral mucositis from head and neck cancer radiation therapy.: https://doi.org/10.3857/roj.2025.00416. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Assessing respiratory motion effects after breathing training on hybrid and IMRT plans in hypofractionated breast radiotherapy.: https://doi.org/10.1186/s13014-026-02821-0. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### mim-contour-protegeai

- **Name**: Contour ProtégéAI+
- **Company**: MIM Software
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | journalTitle | warn | static-audit.json lists the journal for DOI 10.1186/s13014-024-02451-4 as 'Radiother Oncol' (Elsevier's Radiotherapy and Oncology). The actual journal is 'Radiation Oncology' (BioMed Central/Springer open-access journal, ISSN 1748-717X, PMC-indexed as 'Radiat Oncol'), a distinct journal from Elsevier's Radiotherapy and Oncology. This is a confirmed journal-identity mismatch. | Correct journal field to 'Radiation Oncology' (BMC) across all records citing this DOI. |
| Evidence | studyDesignClaim | warn | static-audit.json title/rationale for this DOI reads 'Multi-vendor auto-contouring comparison across 5 facilities' and 'Multi-centre evaluation across five facilities including review and edit effort,' with multiCenter:true in both score and qualityFlags. The actual paper (Goddard et al. 2024) is a SINGLE-institution study: all nine authors are affiliated with Montefiore Medical Center / Albert Einstein College of Medicine, using one Siemens-SOMATOMgo scanner and 47 patients — there is no mention of '5 facilities' anywhere in the title, abstract, or author affiliations. This fabricated 'five facilities' / 'multi-centre' claim inflates both the evidentiary rigor (contributing to the E2 rating) and the multiCenter/externalValidation quality flags for mim-contour-protegeai. | Correct title field to 'Evaluation of multiple-vendor AI autocontouring solutions', remove the fabricated '5 facilities'/multi-centre framing from the rationale, set multiCenter:false in both score.rigorSource and qualityFlags, and re-assess whether E2 rigor is still warranted for a single-institution, single-scanner, 47-patient study (likely should drop toward E1 unless other corroborating multi-site evidence is added). |
| Evidence | multiCenter | warn | Top-level qualityFlags.multiCenter:true for mim-contour-protegeai is a false 'clean' flag directly caused by the fabricated '5 facilities' claim above; this flag should not be marked true/passing. | Set qualityFlags.multiCenter to false and re-derive computedRigor accordingly. |
| Evidence | keyPapers:10.1186/s13014-024-02451-4 | warn | Citation title differs from retrieved metadata: Evaluation of multiple-vendor AI autocontouring solutions.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.mimsoftware.com/radiation-oncology/contour-protegeai-plus; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Comparative Analysis of Atlas and Neural Network Autosegmentation Methods for Pediatric Craniospinal Irradiation With the Development of a Knowledge-Based Quality Assurance Tool.: https://doi.org/10.1016/j.adro.2025.101847 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of auto-segmentation accuracy of cloud-based artificial intelligence and atlas-based models.: https://doi.org/10.1186/s13014-021-01896-1 (abstract retrieved; retrieved 2026-10-15).
- Performance analysis and knowledge-based quality assurance of critical organ auto-segmentation for pediatric craniospinal irradiation.: https://doi.org/10.1038/s41598-024-55015-7 (abstract retrieved; retrieved 2026-10-15).
- Safety and efficiency of a fully automatic workflow for auto-segmentation in radiotherapy using three commercially available deep learning-based applications.: https://doi.org/10.1016/j.phro.2024.100627 (abstract retrieved; retrieved 2026-10-15).
- The implementation of knowledge-based planning with partial OAR contours for prostate radiotherapy.: https://doi.org/10.1002/acm2.70004 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of multiple-vendor AI autocontouring solutions.: https://doi.org/10.1186/s13014-024-02451-4 (abstract retrieved; retrieved 2026-10-15).
- Clinical validation of commercial deep-learning based auto-segmentation models for organs at risk in the head and neck region: a single institution study.: https://doi.org/10.3389/fonc.2024.1375096 (abstract retrieved; retrieved 2026-10-15).
- Evaluation and failure analysis of four commercial deep learning-based autosegmentation software for abdominal organs at risk.: https://doi.org/10.1002/acm2.70010 (abstract retrieved; retrieved 2026-10-15).
- Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation.: https://doi.org/10.1007/s13246-024-01434-9 (abstract retrieved; retrieved 2026-10-15).
- Comparison of Two Auto-Contouring Systems for Head and Neck Organs at Risk to Institutional Reference Standard in Radiotherapy Planning: https://doi.org/10.3390/app16115681 (abstract retrieved; retrieved 2026-10-15).
- Search: MIM Software Contour ProtegeAI+ FDA clearance clinical validation 2025 2026 (2026-10-15) — https://www.gehealthcare.com/en-us/about/newsroom/press-releases/ge-healthcare-receives-fda-510-k-clearance-for-mim-contour-protegeai-2-0-advancing-ai-enabled-radiation-therapy-planning-with-expanded-clinical-capabilities
- Search: Goddard Velten Tang Skalina Boyd Martin Basavatia Garg Tome multi-vendor AI autocontouring solutions affiliation institution (2026-10-15) — https://pmc.ncbi.nlm.nih.gov/articles/PMC11143643/
- Limits: Verified via PMC, Springer Nature Link, and Einstein institutional repository that all nine authors share a single institutional affiliation; no secondary site is named anywhere in the paper.

#### New-source / product leads (not admitted or scored)

- Evaluation of multiple-vendor AI autocontouring solutions: https://doi.org/10.1186/s13014-024-02451-4. MIM-ProtégéAI+, Radformation-AutoContour, Siemens-DirectORGANS — all three correctly named in methods, but journal name and 'multi-centre/5 facilities' framing are both fabricated/incorrect; true setting is single-institution (Montefiore/Einstein), single CT scanner, 47 patients mismatch-confirmed
- Search: "Contour ProtégéAI+" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Contour%20Prot%C3%A9g%C3%A9AI%2B%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Deep learning auto-contouring of target and organs-at-risk on post-catheter implant CT images for prostate HDR brachytherapy.: https://doi.org/10.1002/acm2.70748. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Image-based evaluation of a commercial AI synthetic CT generator for brain and prostate MR-only radiotherapy.: https://doi.org/10.1002/acm2.70725. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Evaluation of AI-Driven Automatic Segmentation Algorithms for Lung Shunt Fraction Estimation in &lt;sup&gt;90&lt;/sup&gt;Y-Labeled Microsphere Therapy.: https://doi.org/10.2967/jnmt.125.271114. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Geometric, dosimetric and psychometric evaluation of three commercial AI software solutions for OAR auto-segmentation in head and neck radiotherapy.: https://doi.org/10.1038/s41598-025-18598-3. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### radformation-autocontour

- **Name**: AutoContour
- **Company**: RadFormation
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-09-26; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | modelCountClaim | warn | The specific numeric claims in the audit directive — AutoContour 2.8 has no model labelled as a target volume, and 523 distinct models (435 CT / 81 MR / 7 CBCT) consistent with vendor's '520+' — are independently source-verifiable: the vendor blog and product page (dlinrt.eu/product/radformation-autocontour, revised 2026-09-26) confirm '520+ AI-trained models across CT, MR, and CBCT' for v2.8, and the per-structure breakdown methodology (counting repeated structures once per listed group) is documented and traceable to the vendor's own structure list. | No correction needed; this claim is adequately source-verified and should NOT be treated as unverified or flagged. |
| Evidence | journalTitle | warn | Identical journal-name error as mim-contour-protegeai: 'Radiother Oncol' listed instead of the correct 'Radiation Oncology' (BMC) for DOI 10.1186/s13014-024-02451-4. | Correct journal field to 'Radiation Oncology' (BMC). |
| Evidence | studyDesignClaim | warn | Same fabricated claim as mim-contour-protegeai: requestedTitle/rationale state 'Auto-contouring comparison across 5 facilities including Radformation' and 'Multi-centre evaluation across five facilities,' with multiCenter:true — but Goddard et al. 2024 is a single-institution (Montefiore/Einstein), single-scanner, 47-patient study. This is the same confirmed fabrication propagated to a second product's rigor source. | Correct title to 'Evaluation of multiple-vendor AI autocontouring solutions', remove 'five facilities'/multi-centre language, set multiCenter:false, and re-assess E2 rigor rating given the smaller single-site evidence base. |
| Evidence | multiCenter | warn | qualityFlags.multiCenter:true is again a false 'clean' flag for radformation-autocontour, inherited from the same fabricated claim. | Set to false and re-derive computedRigor. |
| Evidence | keyPapers:10.1186/s13014-024-02451-4 | warn | Citation title differs from retrieved metadata: Evaluation of multiple-vendor AI autocontouring solutions.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.radformation.com/autocontour/autocontour; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Geometric and dosimetric evaluation for breast and regional nodal auto-segmentation structures.: https://doi.org/10.1002/acm2.14461 (abstract retrieved; retrieved 2026-10-15).
- Artificial Intelligence in Radiation Treatment Planning: A Survey-Based Observational Study From A Cancer Centre in Nigeria.: https://doi.org/10.1177/15330338251403601 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of a prostate SBRT planning workflow using auto-segmentation and knowledge-based planning.: https://doi.org/10.1002/acm2.70295 (abstract retrieved; retrieved 2026-10-15).
- Plan Quality Analysis of Automated Treatment Planning Workflow With Commercial Auto-Segmentation Tools and Clinical Knowledge-Based Planning Models for Prostate Cancer.: https://doi.org/10.7759/cureus.41260 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of multiple-vendor AI autocontouring solutions.: https://doi.org/10.1186/s13014-024-02451-4 (abstract retrieved; retrieved 2026-10-15).
- A clinical evaluation of the performance of five commercial artificial intelligence contouring systems for radiotherapy.: https://doi.org/10.3389/fonc.2023.1213068 (abstract retrieved; retrieved 2026-10-15).
- Evaluation and failure analysis of four commercial deep learning-based autosegmentation software for abdominal organs at risk.: https://doi.org/10.1002/acm2.70010 (abstract retrieved; retrieved 2026-10-15).
- Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation.: https://doi.org/10.1007/s13246-024-01434-9 (abstract retrieved; retrieved 2026-10-15).
- Search: Radformation AutoContour 2.8 number of models CT MR CBCT target volumes (2026-10-15) — https://www.radformation.com/autocontour/autocontour
- Search: AutoContour v2.8 blog Radformation (2026-10-15) — https://blog.radformation.com/autocontour-v2.8-broader-coverage-smarter-automation-and-more-plan-ready-workflows
- Search: dlinrt.eu AutoContour 523 models CT435 MR81 CBCT7 (2026-10-15) — https://dlinrt.eu/product/radformation-autocontour
- Limits: Vendor blog/product-page figures (523/435/81/7) reviewed and judged adequately source-verified per the audit directive's own verification criterion; underlying per-model CSV/XML export not independently re-counted structure-by-structure in this pass.

#### New-source / product leads (not admitted or scored)

- Evaluation of multiple-vendor AI autocontouring solutions: https://doi.org/10.1186/s13014-024-02451-4. Radformation-AutoContour correctly named in methods, but journal name and 'multi-centre/5-facilities' framing are both fabricated/incorrect (same error as in mim-contour-protegeai record) mismatch-confirmed
- Search: "AutoContour" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AutoContour%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Evaluation of a quasi-automatic treatment planning workflow for head-and-neck cancer in radiotherapy.: https://doi.org/10.1016/j.phro.2026.100983. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Inter-observer variability in radiotherapy contouring with the use of autocontouring software: A systematic review.: https://doi.org/10.1016/j.ctro.2026.101144. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Geometric, dosimetric and psychometric evaluation of three commercial AI software solutions for OAR auto-segmentation in head and neck radiotherapy.: https://doi.org/10.1038/s41598-025-18598-3. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Economics achieved through the use of artificial intelligence-powered contouring solutions in a network of oncology clinics in low- and middle-income countries.: https://doi.org/10.3389/fonc.2026.1809864. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### siemens-ai-rad-companion

- **Name**: AI-Rad Companion Organs RT
- **Company**: Siemens Healthineers
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L6 / R4
- **Stored scores**: E2 / L6
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | warn | 2 provisional paper scores require source retrieval | Verify source before editing |
| Evidence | clinicalImpact / clinicalImpactNotes | warn | Confirmed real paper (Gupta V et al., Front Oncol 2026, doi:10.3389/fonc.2026.1809864; 18 Indian centres, 116 cases, 6 physicians, INR 37-670/case net savings) is the sole L6-qualifying (economic) study behind the product's top-level clinicalImpact='L6'. Per rubric, a valid L6 economic endpoint is retained even as a lone paper and should NOT be downgraded solely for that reason; the maximum-scoring rule is preserved. However, the top-level clinicalImpactNotes text only narrates the unrelated 67-84% time-saving figure (an L3 claim) and never mentions the Gupta paper or its non-vendor-independent status (co-author affiliation 'Allegheny Health Network and Varian Medical Systems', a Siemens Healthineers company), even though the per-paper keyPapers entry already correctly flags vendorIndependent:false. | Rewrite clinicalImpactNotes to name Gupta et al. 2026 explicitly as the basis for the L6 rating and restate the existing non-vendor-independent/single-country caveat already present in keyPapers, without changing the L6 field value. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L6 / R4 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.siemens-healthineers.com/en-us/digital-health-solutions/ai-rad-companion; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Plan Quality Analysis of Automated Treatment Planning Workflow With Commercial Auto-Segmentation Tools and Clinical Knowledge-Based Planning Models for Prostate Cancer.: https://doi.org/10.7759/cureus.41260 (abstract retrieved; retrieved 2026-10-15).
- Proposal for a Method for Assessing the Quality of an Updated Deep Learning-Based Automatic Segmentation Program.: https://doi.org/10.7759/cureus.81307 (abstract retrieved; retrieved 2026-10-15).
- Clinical assessment of a novel machine-learning automated contouring tool for radiotherapy planning.: https://doi.org/10.1002/acm2.13949 (abstract retrieved; retrieved 2026-10-15).
- Economics achieved through the use of artificial intelligence-powered contouring solutions in a network of oncology clinics in low- and middle-income countries.: https://doi.org/10.3389/fonc.2026.1809864 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of a deep image-to-image network (DI2IN) auto-segmentation algorithm across a network of cancer centers.: https://doi.org/10.4103/jcrt.jcrt_769_23 (abstract retrieved; retrieved 2026-10-15).
- A deep image-to-image network organ segmentation algorithm for radiation treatment planning: principles and evaluation.: https://doi.org/10.1186/s13014-022-02102-6 (abstract retrieved; retrieved 2026-10-15).
- Investigation on performance of multiple AI-based auto-contouring systems in organs at risks (OARs) delineation.: https://doi.org/10.1007/s13246-024-01434-9 (abstract retrieved; retrieved 2026-10-15).
- Clinical evaluation of deep learning and atlas-based auto-segmentation for organs at risk delineation.: https://doi.org/10.1016/j.meddos.2023.11.002 (abstract retrieved; retrieved 2026-10-15).
- Feasibility evaluation of novel AI-based deep-learning contouring algorithm for radiotherapy.: https://doi.org/10.1002/acm2.14090 (abstract retrieved; retrieved 2026-10-15).
- Search: Gupta Economics achieved artificial intelligence contouring oncology clinics low- and middle-income countries Frontiers Oncology 2026 (2026-10-15) — https://doi.org/10.3389/fonc.2026.1809864
- Search: Kim AI-based auto-contouring systems Phys Eng Sci Med 2024 Siemens AI-Rad Companion (2026-10-15) — https://doi.org/10.1007/s13246-024-01434-9
- Limits: Adams/Tomita/Hu 2026-09-23 HAIR additions not independently re-verified this pass (redundant with prior pass); Kim 2024/Marschner 2022/Rayn 2024/Yamauchi 2024/Maduro Bustos 2023 not re-pulled beyond DOI-format/abstract check.

#### New-source / product leads (not admitted or scored)

- Economics achieved through the use of artificial intelligence-powered contouring solutions in a network of oncology clinics in low- and middle-income countries: https://doi.org/10.3389/fonc.2026.1809864. Confirmed real, confirmed on-topic for AI-Rad Companion Organs RT (named in abstract); already present in product record verified-already-included
- Search: "AI-Rad Companion Organs RT" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AI-Rad%20Companion%20Organs%20RT%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Evaluation of AI-Driven Automatic Segmentation Algorithms for Lung Shunt Fraction Estimation in &lt;sup&gt;90&lt;/sup&gt;Y-Labeled Microsphere Therapy.: https://doi.org/10.2967/jnmt.125.271114. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy.: https://doi.org/10.1016/j.phro.2026.100935. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Contouring in transition: perceptions of AI-based autocontouring by radiation oncologists and medical physicists in German-speaking countries.: https://doi.org/10.1007/s00066-025-02403-1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### synaptiq-mediq-rt

- **Name**: Mediq RT
- **Company**: Synaptiq
- **Category**: Auto-Contouring → secondary: Registration
- **Current effective scores**: E1 / L3 / R3
- **Stored scores**: E1 / L3
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | categoryEvidence | info | Review evidence separately for Auto-Contouring, Registration | Do not flatten evidence across tasks |
| Evidence | evaluationData / keyPapers attribution confidence | warn | CORRECTION TO THE PRELIMINARY REVIEW: the preliminary report (2026-10-15 draft) recommended downgrading this citation from 'evaluates Mediq RT' to 'product-specific attribution not confirmed', reasoning that the abstract never names a specific commercial product. This is incorrect — the PMC full text (not just the abstract) explicitly lists the seven commercial solutions tested, including 'Mediq, Version 1.1, Synaptiq Technologies SRL, Cluj-Napoca, Romania' by name, confirmed via direct text extraction from the open-access PMC HTML. The product-specific attribution is therefore CONFIRMED, not merely inferred from co-authorship, and no downgrade of this citation is warranted. | No change needed to the clinicalImpact/evidenceRigor values for this paper; retain it as direct product-specific evidence. Optionally add an explicit note '(Mediq named among seven commercial solutions evaluated, confirmed via PMC full text PMC12955686)' to evaluationData.description for future auditors. |
| Transparency | evaluationData.source | warn | Live product record's evaluationData.source still reads 'Fedrau et al. Physics and Imaging in Radiation Oncology (2026)'. The PMC open-access full text (PMC12955686, retrieved and grep'd directly, not just the abstract) confirms the paper's actual corresponding author is Alexandra Moignier; no author named 'Fedrau' appears anywhere in the byline or affiliations list. The product's own keyPapers array already correctly lists 'Moignier A et al.' for the same DOI, so this is an internal inconsistency, not just an external citation error. | Correct evaluationData.source (and the matching 'source' top-level field, which still lists 'Fedrau et al.') to 'Moignier A et al., Physics and Imaging in Radiation Oncology (2026)' to match the already-correct keyPapers entry. |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://synaptiq.io/product/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- AI-Based Dose Compliance of Secondary Organs at Risk in Head and Neck Cancer Radiotherapy.: https://doi.org/10.3390/diagnostics16111748 (abstract retrieved; retrieved 2026-10-15).
- Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy.: https://doi.org/10.1016/j.phro.2026.100935 (abstract retrieved; retrieved 2026-10-15).
- Qualitative and dosimetric evaluation of AI-generated contours for conventional and under-reported organs at risk in prostate cancer radiotherapy.: https://doi.org/10.1016/j.ejmp.2026.105901 (abstract retrieved; retrieved 2026-10-15).
- Search: PMC12955686 fulltext Moignier Mediq Synaptiq seven commercial solutions cardiac substructures (2026-10-15) — https://pmc.ncbi.nlm.nih.gov/articles/PMC12955686/
- Search: Moignier Prangères Stoica cardiac substructures AI contouring PHRO 2026 Synaptiq seven commercial solutions (2026-10-15) — https://doi.org/10.1016/j.phro.2026.100935
- Limits: CE-pending-EUDAMED disclosure wording was already checked as adequate in the preliminary pass and not re-verified here (redundant).

#### New-source / product leads (not admitted or scored)

- Comparative analysis of artificial intelligence-based contouring of cardiac substructures on computed tomography scans for radiation therapy: https://pmc.ncbi.nlm.nih.gov/articles/PMC12955686/. Confirmed real; confirmed to name 'Mediq' as one of seven commercial AI solutions evaluated (full text, not abstract) verified-already-included-attribution-upgraded
- Search: "Mediq RT" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Mediq%20RT%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 2 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### vysioner-vbrain

- **Name**: Vbrain
- **Company**: Vysioneer
- **Category**: Auto-Contouring
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | evaluationData.description | warn | The live product record still contains the uncorrected text 'A separate evaluation in IJROBP 2021 focused on deep learning brain metastases auto-segmentation.' The 2021 randomized multi-reader brain-metastases DNN study with Vysioneer co-authorship was published in Neuro-Oncology (Neuro Oncol 2021;23(9):1560-1568, doi:10.1093/neuonc/noab071, PMC8408868), not IJROBP. No matching IJROBP 2021 VBrain paper exists. | Replace 'a separate evaluation in IJROBP 2021' with 'a separate randomized multi-reader evaluation in Neuro-Oncology 2021 (doi:10.1093/neuonc/noab071)' and optionally add the DOI to keyPapers. |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.vysioneer.com/solutions/vbrain; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Stratified assessment of an FDA-cleared deep learning algorithm for automated detection and contouring of metastatic brain tumors in stereotactic radiosurgery.: https://doi.org/10.1186/s13014-023-02246-z (abstract retrieved; retrieved 2026-10-15).
- Search: Lu Xiao Vysioneer brain metastases deep learning randomized Neuro-Oncology 2021 vs IJROBP (2026-10-15) — https://doi.org/10.1093/neuonc/noab071
- Limits: FDA K212116 not re-pulled this pass (redundant with prior check).

#### New-source / product leads (not admitted or scored)

- Randomized multi-reader evaluation of deep learning brain metastases auto-segmentation: https://doi.org/10.1093/neuonc/noab071. Confirmed real; Vysioneer Inc. co-authorship; not currently in keyPapers array candidate-to-add
- Search: "Vbrain" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Vbrain%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Artificial intelligence-enabled early intracranial volumetric response predicts systemic progression-free survival in the phase III CROWN study.: https://doi.org/10.1093/noajnl/vdag236. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Non-invasive in vivo acoustoelectric neuromodulation and its contribution to ultrasound stimulation: https://doi.org/10.1101/2025.11.02.685597. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- AI-Powered Lesion-Level Tumor Growth Inhibition Modeling Improves Model Stability and Prognostic Association With PFS.: https://doi.org/10.1002/psp4.70279. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Peptide OM-LV20 demonstrates neuroprotective effects by attenuating mitochondria-mediated neuronal apoptosis and dysfunction in mice with traumatic brain injury.: https://doi.org/10.24272/j.issn.2095-8137.2025.152. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Feasibility of convection-enhanced delivery of unlabeled &lt;sup&gt;225&lt;/sup&gt;Ac for glioblastoma: Transport, dosimetry, and clonogenic survival modeling.: https://doi.org/10.1002/mp.70566. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### wisdom-deep-contour

- **Name**: DeepContour
- **Company**: Wisdom Tech
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: http://www.wisdom-tech.online/view-16.html; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Wisdom Tech DeepContour K232928 FDA 510k clearance letter (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232928.pdf
- Limits: No independent peer-reviewed literature exists for this product per both this pass and the prior Wave 5C sweep; K232928 letter content not re-pulled (time-budget trade-off, low priority since record already conservatively E0/I0).
- Search: "DeepContour" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22DeepContour%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 3 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Uncertainty quantification for CT dosimetry based on 10 281 subjects using automatic image segmentation and fast Monte Carlo calculations.: https://doi.org/10.1002/mp.17796. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Diffusion probabilistic model for Tibetan painted sketch extraction.: https://doi.org/10.1038/s41598-025-07638-7. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Machine Learning-Enabled Medical Devices Authorized by the US Food and Drug Administration in 2024: Regulatory Characteristics, Predicate Lineage, and Transparency Reporting.: https://doi.org/10.3390/biomedicines13123005. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### siemens-directorgans

- **Name**: DirectORGANS
- **Company**: Siemens Healthineers
- **Category**: Auto-Contouring
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | certification | warn | Structured FDA clearance absent from certification summary | Verify source before editing |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers:10.1002/jmrs.893 | warn | Citation title differs from retrieved metadata: Comparison of Auto-Contouring Tools for Delineation of Normal Organs at Risk in Paediatric Patients Undergoing Radiotherapy.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.siemens-healthineers.com/en-us/radiotherapy/software-solutions/autocontouring; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- The dosimetric impacts of ct-based deep learning autocontouring algorithm for prostate cancer radiotherapy planning dosimetric accuracy of DirectORGANS.: https://doi.org/10.1186/s12894-025-01875-8 (abstract retrieved; retrieved 2026-10-15).
- Comparison of Auto-Contouring Tools for Delineation of Normal Organs at Risk in Paediatric Patients Undergoing Radiotherapy.: https://doi.org/10.1002/jmrs.893 (abstract retrieved; retrieved 2026-10-15).
- Search: Çatlı Dinç DirectORGANS BMC Urology 2025 dosimetric prostate (2026-10-15) — https://doi.org/10.1186/s12894-025-01875-8
- Limits: FDA K233650/K250822 letters not re-pulled this pass (prior pass already confirmed consistency); no corrections identified.
- Search: "DirectORGANS" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22DirectORGANS%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- The Dosimetric Impacts of CT-Based Autocontouring Algorithm for Breast Cancer Radiotherapy Planning: https://doi.org/10.21203/rs.3.rs-7933568/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- How reliable is deep inspiration breath hold at CT simulation? Clinical impact of surface-guided breathing training in breast cancer radiotherapy.: https://doi.org/10.1186/s13014-026-02920-y. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Reproducibility of lung density quantification across photon-counting and conventional energy-integrating CT: a comparative study.: https://doi.org/10.1093/bjr/tqaf103. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### oncosoft-oncostudio

- **Name**: OncoStudio
- **Company**: Oncosoft
- **Category**: Auto-Contouring
- **Current effective scores**: E1 / L2 / R4
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers:10.3390/cancers16213670 | warn | Citation title differs from retrieved metadata: Automated Organ Segmentation for Radiation Therapy: A Comparative Analysis of AI-Based Tools Versus Manual Contouring in Korean Cancer Patients.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Evidence | keyPapers:10.7759/cureus.94067 | warn | Citation title differs from retrieved metadata: Geometric Accuracy Assessment of AI-Based Auto-contouring Using OncoStudio for Prostate Cancer Treatment Planning.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Evidence | keyPapers:10.7759/cureus.91810 | warn | Citation title differs from retrieved metadata: Dosimetric Comparison of Organs At Risk Between Artificial Intelligence-Based Auto-Contouring and Manual Contouring for High-Risk Prostate Cancer Radiotherapy: A Retrospective Study.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R4 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.oncosoft.io/products-eng; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Automated Organ Segmentation for Radiation Therapy: A Comparative Analysis of AI-Based Tools Versus Manual Contouring in Korean Cancer Patients.: https://doi.org/10.3390/cancers16213670 (abstract retrieved; retrieved 2026-10-15).
- Geometric Accuracy Assessment of AI-Based Auto-contouring Using OncoStudio for Prostate Cancer Treatment Planning.: https://doi.org/10.7759/cureus.94067 (abstract retrieved; retrieved 2026-10-15).
- Dosimetric Comparison of Organs At Risk Between Artificial Intelligence-Based Auto-Contouring and Manual Contouring for High-Risk Prostate Cancer Radiotherapy: A Retrospective Study.: https://doi.org/10.7759/cureus.91810 (abstract retrieved; retrieved 2026-10-15).
- Dosimetric Discrepancy Between Whole-Lung and Lobe-Specific Metrics in Lung Stereotactic Body Radiotherapy and Its Implications for Regional Dose Assessment.: https://doi.org/10.7759/cureus.102180 (abstract retrieved; retrieved 2026-10-15).
- Search: Choi 2024 Cancers OncoStudio ProtegeAI comparative 1200 patients auto-segmentation Korean (2026-10-15) — https://doi.org/10.3390/cancers16213670
- Limits: Confirmed real and matches the product record exactly: 1200 Korean patients, head-to-head OncoStudio vs Protégé AI, Turing-test component, OncoStudio outperforming in 85% of evaluated OARs (Choi SH et al., Cancers 2024;16(21):3670). No correction needed. Hoshina/Kawaguchi/Miura Cureus papers not re-verified this pass (redundant with prior check).
- Search: "OncoStudio" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22OncoStudio%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Deep Learning-Based CT Segmentation of a Non-radiopaque Hydrogel Rectal Spacer in Prostate Radiotherapy.: https://doi.org/10.7759/cureus.111686. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Clinical edge-case stress testing of two Asia-developed AI auto-contouring systems using prostate radiotherapy planning CT images.: https://doi.org/10.1007/s12194-026-01080-8. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Dosimetric Impact of Artificial Intelligence (AI)-Based Autocontouring Software, OncoStudio, in High-Risk Prostate Cancer Treatment Planning: A Three-Group Comparative Study on the Slice Ranges of Seminal Vesicles.: https://doi.org/10.7759/cureus.103403. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Evaluating the Large Language Model-Based Quality Assurance Tool for Auto-Contouring: https://doi.org/10.64898/2026.03.31.26349802. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### taimedimg-deepmets

- **Name**: TAIMedImg DeepMets
- **Company**: Taiwan Medical Imaging Co.
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L2 / R3
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | supportedStructures | warn | 1 entries lack Region: Structure Name form | Verify source before editing |
| Evidence | keyPapers (candidate addition) | warn | Confirmed real paper, now published in print as Kotecha R et al., Neuro-Oncology 2026;28(10):2449-2460, doi:10.1093/neuonc/noag152, same Miami Cancer Institute/Akdemir group plus University of Bern co-authors, explicitly framed as FDA-clearance-process performance testing of 'a previously developed U-Net-based AI model'. The abstract text retrieved does not literally name 'TAIMedImg DeepMets' or 'DeepBT'; the product-name link is inferential (same authors/group/timeline as the K250427 clearance) but not textually confirmed. | Do not add as direct evidence yet; keep on the worklist pending confirmation of the specific commercial product name in the full text (paywalled at time of this check). |
| Evidence | keyPapers:10.1007/s11060-025-05294-5 | warn | Citation title differs from retrieved metadata: Evaluating the efficacy of a federated AI algorithm in assisting in the detection and segmentation of brain metastases: limitations and opportunities.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.taimedimg.tw/en/samd/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Evaluating the efficacy of a federated AI algorithm in assisting in the detection and segmentation of brain metastases: limitations and opportunities.: https://doi.org/10.1007/s11060-025-05294-5 (abstract retrieved; retrieved 2026-10-15).
- Search: Kotecha Akdemir Comprehensive performance testing external validation AI algorithm brain metastases Neuro-Oncology 2026 (2026-10-15) — https://doi.org/10.1093/neuonc/noag152
- Limits: Full text not accessed (paywalled); product-name confirmation left open per prior pass's own caveat.

#### New-source / product leads (not admitted or scored)

- Comprehensive performance testing and external validation of an AI algorithm to detect and segment brain metastases: https://doi.org/10.1093/neuonc/noag152. Confirmed real, same author group as Akdemir 2025; product-name match not textually confirmed in the retrieved abstract pending-confirmation
- Search: "TAIMedImg DeepMets" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22TAIMedImg%20DeepMets%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### brainlab-elements-rt-seg

- **Name**: Brainlab Elements Contouring 5.0 (APM / Elements Segmentation)
- **Company**: Brainlab
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.notes | warn | Carried forward from the preliminary pass without redundant re-verification: FDA K243633 clears a bundle (Brainlab Elements 7.0, including Elements Contouring 5.0, Image Fusion, Fibertracking, BOLD MRI Mapping) under product codes QIH/JAK/LLZ, confirming Contouring 5.0 is one module within a multi-module clearance rather than a dedicated contouring-only 510(k). The product's live regulatory.fda.notes text already states this correctly ('Cleared as part of Brainlab Elements 7.0 suite, including Contouring 5.0'), so no further correction is needed beyond what is already recorded. | No action required; record already reflects the bundle scope accurately. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.brainlab.com/radiosurgery-products/elements/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Automatic image segmentation based on synthetic tissue model for delineating organs at risk in spinal metastasis treatment planning.: https://doi.org/10.1007/s00066-019-01463-4 (abstract retrieved; retrieved 2026-10-15).
- Clinical Evaluation of an Auto-Segmentation Tool for Spine SBRT Treatment.: https://doi.org/10.3389/fonc.2022.842579 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of a Dedicated Software "Elements™ Spine SRS, Brainlab<sup>®</sup>" for Target Volume Definition in the Treatment of Spinal Bone Metastases With Stereotactic Body Radiotherapy.: https://doi.org/10.3389/fonc.2022.827195 (abstract retrieved; retrieved 2026-10-15).
- Limits: Not re-verified independently this pass; relying on prior pass's FDA letter read.
- Search: "Brainlab Elements Contouring 5.0 APM / Elements Segmentation" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Brainlab%20Elements%20Contouring%205.0%20APM%20%2F%20Elements%20Segmentation%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### ge-mr-contour-dl

- **Name**: MR Contour DL
- **Company**: GE Healthcare
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L2 / R2 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Limits: Carried forward from preliminary pass without re-verification: K242925 and ESTRO/ASTRO 2025 press releases previously confirmed consistent; no independent peer-reviewed literature identified; E0/I1 rating appropriately conservative.
- Search: "MR Contour DL" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MR%20Contour%20DL%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Artificial intelligence in head and neck cancer rehabilitation services: current state and future perspectives.: https://doi.org/10.1097/moo.0000000000001117. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### medmind-rt-mind-ai

- **Name**: RT-Mind-AI
- **Company**: MedMind Technology Co., Ltd.
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L2 / R3
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-28; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | evidence / keyPapers (candidate addition) | warn | Confirmed real, vendor-independent, external comparative paper not currently in the product's evidence or keyPapers arrays: Sillanpaa JK, Sood AJ, Reynolds M, 'A geometric and dosimetric comparison of three AI-based autocontouring packages in the head and neck region,' J Radiother Pract 2025, doi:10.1017/S1460396925100204 (University of Minnesota). The paper explicitly names and tests 'RT-Mind_AI 1.0 (MM)' head-to-head against Radformation AutoContour and TheraPanacea Annotate on 13 CT sets/14 OARs, reporting RT-Mind slightly underperforming the other two on geometric metrics (50.0% of OARs with Dice>0.7 vs 57.1%/64.3%) and receiving mixed physician accuracy/acceptability scores. This is the first fully vendor-independent, non-MedMind-co-authored comparative evidence for this product; all four papers currently in the record have MedMind co-authors (vendorIndependent:false throughout). | Add this DOI to keyPapers/evidence as a vendor-independent comparative study (balanced result: RT-Mind performed somewhat worse than two peer products on the tested cohort); consider whether evidenceVendorIndependent should move from false toward 'mixed' given this independent paper now exists alongside the vendor-affiliated set. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: http://www.medicalmind.cn/product.html; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- An Adversarial Deep-Learning-Based Model for Cervical Cancer CTV Segmentation With Multicenter Blinded Randomized Controlled Validation.: https://doi.org/10.3389/fonc.2021.702270 (abstract retrieved; retrieved 2026-10-15).
- Towards deep-learning (DL) based fully automated target delineation for rectal cancer neoadjuvant radiotherapy using a divide-and-conquer strategy: a study with multicenter blind and randomized validation.: https://doi.org/10.1186/s13014-023-02350-0 (abstract retrieved; retrieved 2026-10-15).
- A blind randomized validated convolutional neural network for auto-segmentation of clinical target volume in rectal cancer patients receiving neoadjuvant radiotherapy.: https://doi.org/10.1002/cam4.4441 (abstract retrieved; retrieved 2026-10-15).
- Localized fine-tuning and clinical evaluation of deep-learning based auto-segmentation (DLAS) model for clinical target volume (CTV) and organs-at-risk (OAR) in rectal cancer radiotherapy.: https://doi.org/10.1186/s13014-024-02463-0 (abstract retrieved; retrieved 2026-10-15).
- Search: Sillanpaa Journal of Radiotherapy in Practice 2025 RT-Mind_AI Autocontour Annotate head and neck geometric dosimetric comparison (2026-10-15) — https://doi.org/10.1017/s1460396925100204
- Limits: Not yet full-text-confirmed beyond the public abstract; recommend pulling the PDF to confirm exact OAR list and statistical significance claims before scoring changes.

#### New-source / product leads (not admitted or scored)

- A geometric and dosimetric comparison of three AI-based autocontouring packages in the head and neck region: https://doi.org/10.1017/s1460396925100204. Confirmed real; explicitly names 'RT-Mind_AI 1.0'; vendor-independent (University of Minnesota, no MedMind co-authors) candidate-to-add
- Search: "RT-Mind-AI" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22RT-Mind-AI%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Hybrid deep learning enables multi-institutional delineation of active bone marrow for gynecologic radiotherapy.: https://doi.org/10.1016/j.phro.2025.100823. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### varian-ethos-ai-segmentation

- **Name**: Ethos AI Segmentation
- **Company**: Varian (Siemens Healthineers)
- **Category**: Auto-Contouring → secondary: Treatment Planning
- **Current effective scores**: E3 / L4 / R3
- **Stored scores**: E3 / L4
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda | warn | Confirmed via the live record's own regulatory block (not re-pulled from FDA, cross-checked for internal consistency): K232923 carries product codes IYE/MUJ and regulation 21 CFR 892.5050 ('Medical Charged-Particle Radiation Therapy System'), i.e. the Ethos adaptive-RT linac/system clearance, not a dedicated QKB Radiological-Image-Processing-Software clearance like the other 15 products in this batch. The record's regulatory.fda.notes text already states this distinction accurately ('K232923... AI segmentation deep learning algorithms for contouring with additional anatomical site support' as part of the whole-system clearance), consistent with the preliminary pass's finding. | No further action required beyond what the preliminary pass already recommended; confirmed accurate as currently written. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | categoryEvidence | info | Review evidence separately for Auto-Contouring, Treatment Planning | Do not flatten evidence across tasks |
| Evidence | keyPapers:10.1016/j.phro.2020.12.004 | warn | Citation title differs from retrieved metadata: Clinical implementation of artificial intelligence-driven cone-beam computed tomography-guided online adaptive radiotherapy in the pelvic region.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Evidence | keyPapers:10.3389/fonc.2024.1507806 | warn | Citation title differs from retrieved metadata: Clinical feasibility of Ethos auto-segmentation for adaptive whole-breast cancer treatment.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Transparency | trainingData | warn | Public disclosure lacks source label or URL; non-public disclosures may use a dated source label without a public URL | Verify source before editing |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E3 / L4 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.varian.com/ethos; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Varian ethos online adaptive radiotherapy for prostate cancer: Early results of contouring accuracy, treatment plan quality, and treatment time.: https://doi.org/10.1002/acm2.13479 (abstract retrieved; retrieved 2026-10-15).
- Feasibility of automated AI-based contouring and stable radiomic feature assessment by HyperSight-CBCT Imaging for adaptive high-precision radiotherapy of prostate cancer.: https://doi.org/10.1038/s41598-026-46359-3 (abstract retrieved; retrieved 2026-10-15).
- Prospects for daily online adaptive radiotherapy via ethos for prostate cancer patients without nodal involvement using unedited CBCT auto-segmentation.: https://doi.org/10.1002/acm2.13399 (abstract retrieved; retrieved 2026-10-15).
- Clinical implementation of artificial intelligence-driven cone-beam computed tomography-guided online adaptive radiotherapy in the pelvic region.: https://doi.org/10.1016/j.phro.2020.12.004 (abstract retrieved; retrieved 2026-10-15).
- Clinical feasibility of Ethos auto-segmentation for adaptive whole-breast cancer treatment.: https://doi.org/10.3389/fonc.2024.1507806 (abstract retrieved; retrieved 2026-10-15).
- Geometric and dosimetric evaluation of a commercial AI auto-contouring tool on multiple anatomical sites in CT scans.: https://doi.org/10.1002/acm2.70067 (abstract retrieved; retrieved 2026-10-15).
- Investigating the feasibility of using Ethos generated treatment plans for head and neck cancer patients.: https://doi.org/10.1016/j.tipsro.2023.100216 (abstract retrieved; retrieved 2026-10-15).
- Limits: Not independently re-pulled from accessdata.fda.gov this pass; relying on internal consistency check of the already-detailed regulatory.fda.notes text.
- Search: "Ethos AI Segmentation" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Ethos%20AI%20Segmentation%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### varian-eclipse-ai-contouring

- **Name**: AI Contouring for Eclipse
- **Company**: Varian (Siemens Healthineers)
- **Category**: Auto-Contouring
- **Current effective scores**: E2 / L2 / R2
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers[0] title/description | warn | Citation mismatch (metadata-level check only; full-text review intentionally left to the other agent verifying this product to avoid redundant work). keyPapers lists doi:10.1016/j.adro.2023.101177 with the fabricated title 'Eclipse AI contouring comparative evaluation' by 'Pera Ò et al.'. The actual paper at that DOI is Pera O et al., 'Clinical Validation of Siemens' Syngo.via Automatic Contouring System,' Adv Radiat Oncol 2023 — it validates Siemens syngo.via (the DI2IN/AI-Rad-Companion-family engine, reviewed using the Eclipse Contouring module as the viewer only), not a standalone 'AI Contouring for Eclipse' product evaluation. This paper plausibly belongs to the siemens-ai-rad-companion / syngo.via lineage note already present elsewhere in the dataset, not to this 2026-released Eclipse packaging. | Remove or re-title this keyPapers entry; if retained, clarify it describes syngo.via (viewed in Eclipse), not an independent validation of 'AI Contouring for Eclipse' VA10A. |
| Evidence | keyPapers[1] title/description | warn | Citation mismatch (metadata-level check only). keyPapers lists doi:10.1002/acm2.14620 with the title 'Eclipse AI contouring clinical validation' by 'Wang Y et al.'. The actual paper at that DOI is Wang T et al. (Mount Sinai), 'Evaluation of AI-based auto-contouring tools in radiotherapy: A single-institution study,' J Appl Clin Med Phys 2025 — it evaluates two anonymized commercial tools ('Software A' and 'Software B') and does not name 'Eclipse' or 'AI Contouring for Eclipse' anywhere in the retrieved abstract/metadata. | Remove or re-title this keyPapers entry pending full-text confirmation of which named products 'Software A/B' refer to; do not present it as an Eclipse-specific validation without that confirmation. |
| Evidence | keyPapers:10.1016/j.adro.2023.101177 | warn | Citation title differs from retrieved metadata: Clinical Validation of Siemens' Syngo.via Automatic Contouring System.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Evidence | keyPapers:10.1002/acm2.14620 | warn | Citation title differs from retrieved metadata: Evaluation of AI-based auto-contouring tools in radiotherapy: A single-institution study.. Similarity is a triage flag, not a determination of wrong attribution. | Verify full title/authors, product identity and study endpoints before correcting or rescoring |
| Evidence | rescoring | warn | Both scored citations evaluate other contouring systems: Pera evaluates Siemens syngo.via; Wang evaluates anonymized third-party tools hosted alongside Eclipse. A predicate/reference-device relationship is not direct validation of AI Contouring VA10A. Retain as unscored indirect context; proposed L1c is provisional descriptive fallback, not demonstrated clinical efficacy. Keep R unchanged pending reviewer assessment. | Separate correction pass; reviewer-check source attribution and score notes first |
| Transparency | trainingData | warn | Public disclosure lacks source label or URL; non-public disclosures may use a dated source label without a public URL | Verify source before editing |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: Both scored citations evaluate other contouring systems: Pera evaluates Siemens syngo.via; Wang evaluates anonymized third-party tools hosted alongside Eclipse. A predicate/reference-device relationship is not direct validation of AI Contouring VA10A. Retain as unscored indirect context; proposed L1c is provisional descriptive fallback, not demonstrated clinical efficacy. Keep R unchanged pending reviewer assessment.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://cancercare.siemens-healthineers.com/en-ch/products/radiotherapy/treatment-planning/eclipse; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Clinical Validation of Siemens' Syngo.via Automatic Contouring System.: https://doi.org/10.1016/j.adro.2023.101177 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of AI-based auto-contouring tools in radiotherapy: A single-institution study.: https://doi.org/10.1002/acm2.14620 (abstract retrieved; retrieved 2026-10-15).
- Search: 10.1016/j.adro.2023.101177 Pera Eclipse AI contouring (2026-10-15) — https://doi.org/10.1016/j.adro.2023.101177
- Search: 10.1002/acm2.14620 Wang Eclipse AI contouring clinical validation (2026-10-15) — https://doi.org/10.1002/acm2.14620
- Limits: Deliberately did not pull full text for either paper, since the task notes another agent is already verifying this product in depth; this entry is limited to DOI/title/author metadata cross-checks to flag the mismatch without duplicating that work.
- Search: "AI Contouring for Eclipse" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AI%20Contouring%20for%20Eclipse%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### quanta-qoca-image-smart-rt

- **Name**: QOCA® image Smart RT Contouring System
- **Company**: Quanta Computer Inc.
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L2 / R3 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | trainingData | warn | Public disclosure lacks source label or URL; non-public disclosures may use a dated source label without a public URL | Verify source before editing |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.qoca.net/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Limits: Carried forward from preliminary pass without re-verification: FDA K231855 training/validation dataset detail (220 cases, TCIA, Gold Atlas Male Pelvis) previously reported from third-party FDA-database mirrors, not re-pulled from accessdata.fda.gov directly this pass; disclosureLevel upgrade recommendation from the preliminary pass stands but is not independently re-confirmed here.
- Search: "QOCA® image Smart RT Contouring System" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22QOCA%C2%AE%20image%20Smart%20RT%20Contouring%20System%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Machine Learning-Enabled Medical Devices Authorized by the US Food and Drug Administration in 2024: Regulatory Characteristics, Predicate Lineage, and Transparency Reporting.: https://doi.org/10.3390/biomedicines13123005. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### medcom-prosoma-dart

- **Name**: ProSoma DART AI Segmentation Engine
- **Company**: MedCom
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-06-16; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.medcom-online.de/products/radiation-oncology/prosoma-dart/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Limits: No corrections identified; record already correctly distinguishes DART (E0) from the ABAS predecessor literature (Karagiannis 2021, Doolan 2023). Not independently re-searched for a new DART-specific paper this pass (time-budget trade-off; recommended for a future pass given DART's E0 status).
- Search: "ProSoma DART AI Segmentation Engine" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22ProSoma%20DART%20AI%20Segmentation%20Engine%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### united-urt-auto-contouring

- **Name**: uRT Auto-Contouring
- **Company**: United Imaging
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://eu.united-imaging.com/en/product-service/products/rt; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Limits: PRNewswire URL and ~90% time-reduction attribution not re-tested for resolution/specificity this pass; evidence correctly labelled E0/vendor-reported per the preliminary pass, no corrections identified.
- Search: "uRT Auto-Contouring" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22uRT%20Auto-Contouring%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### aitewan-deepbt-detector-plus

- **Name**: DeepBT Detector-Plus
- **Company**: Aitewan Biomedical Technology, Inc.
- **Category**: Auto-Contouring
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: not recorded; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | company | warn | Company label does not exactly match registry; check legal-name aliases before calling it missing: Aitewan Biomedical Technology, Inc. | Verify source before editing |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.aitewan-bio.com/en/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Limits: K252190 not re-pulled from accessdata.fda.gov this pass; the cross-vendor personnel link to Wan-Yuo Guo (also a VBrain 2021 Neuro-Oncology co-author) noted in the preliminary pass is an interesting provenance observation but not an actionable data-correction, so it is not repeated as a finding here.
- Search: "DeepBT Detector-Plus" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22DeepBT%20Detector-Plus%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- AI-Assisted Brain Tumor MRI Reporting and Treatment-Planning Segmentation: A Retrospective Paired Workflow Evaluation.: https://doi.org/10.3390/biomedicines14071595. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### philips-mrcat-brain

- **Name**: MRCAT Brain
- **Company**: Philips
- **Category**: Image Synthesis
- **Current effective scores**: E2 / L3 / R3 (efficacy provisional)
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | aggregate | warn | Stored E2/L2 vs effective E2/L3; do not promote provisional papers mechanically | Verify source before editing |
| Evidence | keyPapers | warn | 1 provisional paper scores require source retrieval | Verify source before editing |
| Evidence | keyPapers[pmid=39956751].title/doi | warn | The record's title ('Evaluation of an MRI-only workflow using a commercial synthetic CT generator for brain and head-and-neck radiotherapy') does not match the actual publication. PubMed/Europe PMC list the true title as 'Development of an MR-only radiotherapy treatment planning workflow using a commercial synthetic CT generator for brain and head & neck tumor patients' (Buschmann M et al., Zeitschrift für Medizinische Physik 2025;36(1):71-83, PMID 39956751, DOI 10.1016/j.zemedi.2025.01.003). The DOI is also missing from this product's keyPaper entry. | Correct the title to the verified Europe PMC/PubMed title and add DOI 10.1016/j.zemedi.2025.01.003. |
| Evidence | keyPapers[pmid=39956751].rationale (n=10) | warn | The paper enrolled 23 patients total (13 brain + 10 head-and-neck), not n=10 as implied for the brain product entry. For the Brain product the brain-only subset (n=13) is the relevant cohort; n=10 is the H&N subset documented on the H&N product page. Neither product record states the correct total/subset breakdown or that both cohorts came from one combined n=23 study. | State the correct cohort sizes: 23 patients total (13 brain, 10 head & neck) in a single combined study; attribute the brain subset (n=13) to this product and the H&N subset (n=10) to MRCAT Head and Neck, with a cross-reference noting it is the same source paper. |
| Evidence | rescoring | warn | Buschmann et al. directly names MRCAT; retrospective 13 brain + 10 head-and-neck patients, dosimetry/geometric endpoints (L2), not measured editing time or prospective patient management. Resolve legacy I2 provisional L3 to final L2, correct title and cohort. MESCAL directly includes MRCAT brain/pelvis, so E2 remains supported. | Separate correction pass; reviewer-check source attribution and score notes first |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | keyPapers[doi=10.1016/j.radonc.2026.111530] (MESCAL) | warn | MESCAL (Cusumano/Maspero et al., Radiother Oncol 2026) evaluated 32 patients (16 brain, 16 pelvis) from two centers, testing MRI Planner (Spectronic), SyngoAI (Siemens), MR Box (Therapanacea) and MRCAT (Philips). Brain anatomy is within scope for this product, so the attribution here is correct. | No change needed; retain but note MESCAL anatomical scope explicitly (brain + pelvis only) to prevent downstream copy-paste onto H&N-only products. |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: Buschmann et al. directly names MRCAT; retrospective 13 brain + 10 head-and-neck patients, dosimetry/geometric endpoints (L2), not measured editing time or prospective patient management. Resolve legacy I2 provisional L3 to final L2, correct title and cohort. MESCAL directly includes MRCAT brain/pelvis, so E2 remains supported.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.usa.philips.com/healthcare/product/HCNMRF320/mrcat-brain-mr-rt-clinical-application; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Clinical validation of using a commercial synthetic-computed tomography solution for brain MRI-only radiotherapy treatment planning.: https://doi.org/10.1016/j.tipsro.2025.100328 (abstract retrieved; retrieved 2026-10-15).
- Clinical implementation of a commercial synthetic computed tomography solution for radiotherapy treatment of glioblastoma.: https://doi.org/10.1016/j.phro.2024.100589 (abstract retrieved; retrieved 2026-10-15).
- Clinical validation of MR-generated synthetic CT by MRCAT for brain tumor radiotherapy.: https://doi.org/10.1002/acm2.14494 (abstract retrieved; retrieved 2026-10-15).
- Development of an MR-only radiotherapy treatment planning workflow using a commercial synthetic CT generator for brain and head &amp; neck tumor patients.: https://doi.org/10.1016/j.zemedi.2025.01.003 (abstract retrieved; retrieved 2026-10-15).
- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative.: https://doi.org/10.1016/j.radonc.2026.111530 (abstract retrieved; retrieved 2026-10-15).
- Search: Buschmann 39956751 Zeitschrift für Medizinische Physik MRI-only synthetic CT brain head and neck (2026-10-15) — https://europepmc.org/article/med/39956751
- Search: MESCAL initiative Cusumano Maspero Radiotherapy Oncology 2026 benchmark dataset acceptance levels MRI-only commissioning (2026-10-15) — https://doi.org/10.1016/j.radonc.2026.111530
- Search: Aljaafari brain synthetic CT clinical validation TIPSRO 2025 (2026-10-15) — https://doi.org/10.1016/j.tipsro.2025.100328
- Search: Philips MRCAT Brain FDA 510(k) K193109 (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf19/K193109.pdf
- Limits: Full text of the Buschmann 2025/2026 paper and the Aljaafari 2025 paper were not independently re-read for every numeric claim (e.g., exact dose-difference figures); title/DOI/PMID were verified against PubMed/Europe PMC/ScienceDirect abstracts and metadata only, not against the complete body text held behind publisher paywalls.
- Search: "MRCAT Brain" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MRCAT%20Brain%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 3 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Dental metal artifacts in magnetic resonance-based synthetic computed tomography for brain radiotherapy: Impact on dose, patient setup, and geometric distortion.: https://doi.org/10.1016/j.phro.2026.100924. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Current state and promise of user-centered design to harness explainable AI in clinical decision-support systems for patients with CNS tumors.: https://doi.org/10.3389/fradi.2024.1433457. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### philips-mrcat-pelvis

- **Name**: MRCAT Pelvis
- **Company**: Philips
- **Category**: Image Synthesis
- **Current effective scores**: E2 / L2 / R3
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers[pmid=30474353] (Farjam et al.) | warn | Farjam et al. 2019 (DOI 10.1002/acm2.12501) evaluates an in-house multi-atlas sCT method; MRCAT appears only as a clinical-routine comparator, not as the primary subject of study. This is already flagged internally as a 'comparator evaluation' (rationale text), which is an appropriate caveat, but the keyPaper listing alongside full validation studies risks over-stating direct MRCAT evidence volume if read superficially. | Keep the 'comparator, not primary subject' caveat prominent in any public-facing summary count of 'papers evaluating MRCAT Pelvis.' |
| Transparency | evaluationData.description | warn | Record explicitly documents a prior citation error (MR-OPERA wrongly attributed to Philips MRCAT Pelvis, since corrected) — this self-correction is good practice but confirms the dataset has had attribution errors before, warranting continued vigilance for comparator-vs-subject conflation across all sCT products. | No action; retain the correction note for audit trail. |
| Cross-check | keyPapers[doi=10.1016/j.radonc.2026.111530] (MESCAL) | warn | Confirmed MESCAL's scope (16 pelvis + 16 brain patients, 2 centers) includes pelvis anatomy and MRCAT among the four sCT solutions tested, so attribution to MRCAT Pelvis is consistent with the published abstract. | None; correct attribution. |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.usa.philips.com/healthcare/product/HCNMRF266/mrcat-pelvis-mr-rt-clinical-application; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Dosimetric evaluation of an atlas-based synthetic CT generation approach for MR-only radiotherapy of pelvis anatomy.: https://doi.org/10.1002/acm2.12501 (abstract retrieved; retrieved 2026-10-15).
- Feasibility of magnetic resonance imaging-only rectum radiotherapy with a commercial synthetic computed tomography generation solution.: https://doi.org/10.1016/j.phro.2018.09.002 (abstract retrieved; retrieved 2026-10-15).
- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative.: https://doi.org/10.1016/j.radonc.2026.111530 (abstract retrieved; retrieved 2026-10-15).
- Magnetic resonance-only simulation and dose calculation in external beam radiation therapy: a feasibility study for pelvic cancers.: https://doi.org/10.1080/0284186x.2017.1293290 (abstract retrieved; retrieved 2026-10-15).
- Clinical feasibility of deep learning-based synthetic CT images from T2-weighted MR images for cervical cancer patients compared to MRCAT.: https://doi.org/10.1038/s41598-024-59014-6 (abstract retrieved; retrieved 2026-10-15).
- Validating clinical feasibility of MRCAT and deep learning-based synthetic CT images for cervical cancer patient.: https://doi.org/10.1002/acm2.70332 (abstract retrieved; retrieved 2026-10-15).
- Search: MESCAL initiative Radiother Oncol 2026 brain pelvis synthetic CT benchmark (2026-10-15) — https://www.sciencedirect.com/science/article/abs/pii/S0167814026003695
- Search: Maspero rectum MRI-only synthetic CT Phys Imaging Radiat Oncol 2018 (2026-10-15) — https://doi.org/10.1016/j.phro.2018.09.002
- Search: Farjam atlas-based synthetic CT pelvis JACMP 2019 (2026-10-15) — https://doi.org/10.1002/acm2.12501
- Limits: Did not independently re-verify every numeric dosimetric value (MAE 65±5 HU etc.) in Farjam 2019 or Maspero 2018 against full text; relied on existing rationale text cross-checked only at abstract/metadata level.
- Search: "MRCAT Pelvis" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MRCAT%20Pelvis%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Evaluation of Magnetic Resonance Imaging-Derived Synthetic Computed Tomography in Prostate Cancer Carbon Ion Radiotherapy: Impact of Fixation Shell.: https://doi.org/10.1016/j.ijpt.2026.101298. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### philips-mrcat-head-and-neck

- **Name**: MRCAT Head and Neck
- **Company**: Philips
- **Category**: Image Synthesis
- **Current effective scores**: E2 / L3 / R3 (efficacy provisional)
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Regulatory | regulatory.ce | warn | Confirmed CE status conflicts with unverified-source caveat | Verify source before editing |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | aggregate | warn | Stored E2/L2 vs effective E2/L3; do not promote provisional papers mechanically | Verify source before editing |
| Evidence | keyPapers | warn | 1 provisional paper scores require source retrieval | Verify source before editing |
| Evidence | keyPapers[pmid=39956751].title | warn | Same title mismatch as Brain product: the record's title does not match the verified PubMed/Europe PMC title ('Development of an MR-only radiotherapy treatment planning workflow using a commercial synthetic CT generator for brain and head & neck tumor patients'), and the DOI (10.1016/j.zemedi.2025.01.003) is omitted from the keyPaper object. | Correct title and add the DOI; keep PMID 39956751. |
| Evidence | keyPapers[pmid=39956751] cohort size | warn | The H&N-specific n=10 figure used in evaluationData is correct as the H&N subset of the combined 23-patient study (13 brain + 10 H&N), but the record does not disclose that this is a subset of a larger combined-anatomy study, which could misleadingly imply a dedicated 10-patient H&N-only trial. | Add a note clarifying the 10 H&N patients are part of a combined 23-patient (13 brain + 10 H&N) single-center study, cross-referenced with the Brain product entry. |
| Evidence | evidenceRigor E2 | warn | With the MESCAL paper removed as misattributed, the sole H&N-specific evidence is the single-center n=10 Buschmann et al. study (E1-level: single-center, vendor-independent, retrospective). The E2 rigor rating for this product appears to rest on the misattributed MESCAL multi-center benchmark; without it, rigor should likely revert to E1 pending identification of a genuine multi-center H&N-specific validation. | Re-evaluate evidenceRigor for philips-mrcat-head-and-neck after removing the MESCAL citation; document the rationale explicitly. |
| Evidence | rescoring | warn | Buschmann directly studies 10 H&N patients in one retrospective cohort with dosimetric/geometric endpoints (L2). MESCAL studies brain/pelvis only: remove its scores for this H&N product or keep unscored indirect commissioning context. Vendor multicentre V&V is not itself peer-reviewed H&N evidence. Retain R unchanged pending separate assessment. | Separate correction pass; reviewer-check source attribution and score notes first |
| Transparency | evaluationData | warn | Public disclosure lacks source label or URL; non-public disclosures may use a dated source label without a public URL | Verify source before editing |
| Cross-check | keyPapers[doi=10.1016/j.radonc.2026.111530] (MESCAL) | error | MESCAL (Cusumano/Maspero et al. 2026) explicitly collected data from 32 patients across only two anatomical sites: 16 brain and 16 pelvis, from two centers, testing MRI Planner (Spectronic), SyngoAI (Siemens), MR Box (Therapanacea) and MRCAT (Philips). Head & neck anatomy was NOT part of the MESCAL benchmark. Listing this paper as a keyPaper for MRCAT Head and Neck is an incorrect attribution — it provides no H&N-specific evidence for this product, confirming the directive's flagged issue. | Remove the MESCAL keyPaper entry from philips-mrcat-head-and-neck (and from any other H&N-only product entries). Retain it only on philips-mrcat-brain, philips-mrcat-pelvis, spectronic-mriplanner, and mr-box-synthetic (and, if the 'SyngoAI' reference is confirmed to be the audited product, siemens-syngo-ct), each scoped to brain/pelvis only. |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: Buschmann directly studies 10 H&N patients in one retrospective cohort with dosimetric/geometric endpoints (L2). MESCAL studies brain/pelvis only: remove its scores for this H&N product or keep unscored indirect commissioning context. Vendor multicentre V&V is not itself peer-reviewed H&N evidence. Retain R unchanged pending separate assessment.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.usa.philips.com/healthcare/product/HCNMRF439/mrcat-head-and-neck-hcnmrf439-mr-rt-clinical-application; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Development of an MR-only radiotherapy treatment planning workflow using a commercial synthetic CT generator for brain and head &amp; neck tumor patients.: https://doi.org/10.1016/j.zemedi.2025.01.003 (abstract retrieved; retrieved 2026-10-15).
- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative.: https://doi.org/10.1016/j.radonc.2026.111530 (abstract retrieved; retrieved 2026-10-15).
- Search: Buschmann 39956751 Zeitschrift für Medizinische Physik brain head neck MR-only workflow (2026-10-15) — https://europepmc.org/article/med/39956751
- Search: MESCAL Radiother Oncol 2026 anatomical sites brain pelvis head and neck (2026-10-15) — https://researchinformation.umcutrecht.nl/en/publications/standardizing-mri-only-radiotherapy-commissioning-benchmark-datas/
- Limits: MESCAL anatomical scope (16 brain/16 pelvis) confirmed from multiple independent abstract sources (ScienceDirect, UMC Utrecht repository, LMU ART Lab); full text not accessed behind the Elsevier paywall, so supplementary tables were not checked for any secondary H&N analysis that might not appear in the abstract.
- Search: "MRCAT Head and Neck" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MRCAT%20Head%20and%20Neck%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### philips-mrcat-prostate-auto-contouring

- **Name**: MRCAT Prostate + Auto-Contouring
- **Company**: Philips
- **Category**: Image Synthesis → secondary: Auto-Contouring
- **Current effective scores**: E2 / L4 / R3
- **Stored scores**: E2 / L4
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | categoryEvidence | info | Review evidence separately for Image Synthesis, Auto-Contouring | Do not flatten evidence across tasks |
| Transparency | evidenceRigorNotes | warn | The product record correctly separates module-level evidence ('Image Synthesis (MRCAT): E2...') from auto-contouring evidence and documents a prior misrouting correction (Law et al. Med Phys 2024 moved here from MRCAT Brain after full-text confirmed prostate/pelvic anatomy). This is a good-practice self-correction and is consistent with what we found elsewhere (cross-category misattribution is a recurring risk across this dataset). | No action; continue periodic full-text confirmation sweeps for comparator/subject and anatomy misattribution. |
| Cross-check | keyPapers[doi=10.1016/j.radonc.2026.111530] (MESCAL) | warn | MESCAL's pelvis cohort (16 patients) is not explicitly restricted to prostate cancer in the public abstract; attributing this community benchmark to the Prostate-specific product is a reasonable but slightly broader inference than the pelvis-general product (MRCAT Pelvis), since the abstract does not confirm prostate-specific sub-analysis. | Verify from full text whether the MESCAL pelvis cohort includes/could be prostate patients specifically before citing this as prostate-specific evidence; otherwise note it is general pelvis evidence, not prostate-specific. |

#### Re-scoring proposal

- Proposed: E2 / L4 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.usa.philips.com/healthcare/product/HCNMRB780/mrcat-prostate-auto-contouring-mr-rt-clinical-application; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- A study of Bayesian deep network uncertainty and its application to synthetic CT generation for MR-only radiotherapy treatment planning.: https://doi.org/10.1002/mp.16666 (abstract retrieved; retrieved 2026-10-15).
- Dosimetric and workflow evaluation of first commercial synthetic CT software for clinical use in pelvis.: https://doi.org/10.1088/1361-6560/aa5452 (abstract retrieved; retrieved 2026-10-15).
- Clinical workflow for MR-only simulation and planning in prostate.: https://doi.org/10.1186/s13014-017-0854-4 (abstract retrieved; retrieved 2026-10-15).
- Quantification of confounding factors in MRI-based dose calculations as applied to prostate IMRT.: https://doi.org/10.1088/1361-6560/aa4fe7 (abstract retrieved; retrieved 2026-10-15).
- Feasibility of MR-only proton dose calculations for prostate cancer radiotherapy using a commercial pseudo-CT generation method.: https://doi.org/10.1088/1361-6560/aa9677 (abstract retrieved; retrieved 2026-10-15).
- Magnetic resonance-only simulation and dose calculation in external beam radiation therapy: a feasibility study for pelvic cancers.: https://doi.org/10.1080/0284186x.2017.1293290 (abstract retrieved; retrieved 2026-10-15).
- Accuracy and precision of patient positioning for pelvic MR-only radiation therapy using digitally reconstructed radiographs.: https://doi.org/10.1088/1361-6560/aaad21 (abstract retrieved; retrieved 2026-10-15).
- Geometric and dosimetric impact of anatomical changes for MR-only radiation therapy for the prostate.: https://doi.org/10.1002/acm2.12551 (abstract retrieved; retrieved 2026-10-15).
- Validation of dose distribution computation on sCT images generated from MRI scans by Philips MRCAT.: https://doi.org/10.1016/j.rpor.2019.02.001 (abstract retrieved; retrieved 2026-10-15).
- MRI-based IMPT planning for prostate cancer.: https://doi.org/10.1016/j.radonc.2019.10.010 (abstract retrieved; retrieved 2026-10-15).
- Dosimetric evaluation of MR-derived synthetic-CTs for MR-only proton treatment planning.: https://doi.org/10.1016/j.meddos.2020.01.005 (abstract retrieved; retrieved 2026-10-15).
- Magnetic resonance image-based tomotherapy planning for prostate cancer.: https://doi.org/10.3857/roj.2020.00101 (abstract retrieved; retrieved 2026-10-15).
- Quality evaluation of synthetic CT using a gamma analysis for prostate cancer MR-only radiotherapy.: https://doi.org/10.5603/rpor.105857 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of Magnetic Resonance Imaging-Derived Synthetic Computed Tomography in Prostate Cancer Carbon Ion Radiotherapy: Impact of Fixation Shell.: https://doi.org/10.1016/j.ijpt.2026.101298 (abstract retrieved; retrieved 2026-10-15).
- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative.: https://doi.org/10.1016/j.radonc.2026.111530 (abstract retrieved; retrieved 2026-10-15).
- Search: Tyagi dosimetric workflow evaluation commercial synthetic CT pelvis Phys Med Biol 2017 (2026-10-15) — https://doi.org/10.1088/1361-6560/aa5452
- Search: MRCAT prostate MESCAL 2026 attribution pelvis prostate (2026-10-15) — https://doi.org/10.1016/j.radonc.2026.111530
- Search: Philips MRCAT Prostate Auto-Contouring FDA clearance history (2026-10-15) — https://www.accessdata.fda.gov/
- Limits: Did not individually re-verify titles/DOIs/PMIDs for each of the 14 keyPapers listed for this product (Tyagi 2017, Kemppainen 2017, Maspero 2017 ×2, Persson 2017, etc.); spot-checked only the MESCAL and Farjam-family citations shared across products. A full per-paper verification of this product's long citation list was out of scope given review time constraints and should be treated as a follow-up task.
- Search: "MRCAT Prostate + Auto-Contouring" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MRCAT%20Prostate%20%2B%20Auto-Contouring%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### siemens-syngo-ct

- **Name**: syngo.via RT Image Suite
- **Company**: Siemens Healthineers
- **Category**: Image Synthesis
- **Current effective scores**: E0 / L1c / R3 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidenceRigor E0 | warn | The record already self-documents (evidenceRigorNotes) a 2026-08-25 correction from a previously unsupported E1 down to E0 after confirming no PubMed-indexed publication names 'syngo.via RT Image Suite' directly. This is methodologically sound and transparent. | No action; this is a model of good self-correction practice. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | MESCAL 'SyngoAI' naming | warn | MESCAL (Cusumano/Maspero 2026) tested a solution named 'SyngoAI (Siemens)', which is plausibly syngo.via RT Image Suite's synthetic-CT module, but the product name in the paper does not exactly match this inventory entry's name, and the keyPapers list for siemens-syngo-ct is currently empty (MESCAL is not attached here). This is an unresolved identity question: if 'SyngoAI' = this product, MESCAL evidence is missing from this record; if it is a distinct/future Siemens product, no action is needed. | Obtain the MESCAL full text or correspond with Siemens to confirm whether 'SyngoAI' refers to syngo.via RT Image Suite's synthetic-CT functionality before adding or withholding the MESCAL citation here. |

#### Re-scoring proposal

- Proposed: E0 / L1c / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.siemens-healthineers.com/magnetic-resonance-imaging/clinical-specialities/synthetic-ct; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Siemens Healthineers syngo.via RT Image Suite synthetic CT SyngoAI MR-only radiotherapy FDA clearance (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf23/K232799.pdf
- Search: SyngoAI synthetic CT MESCAL Siemens brain pelvis (2026-10-15) — https://doi.org/10.1016/j.radonc.2026.111530
- Limits: Full text of MESCAL was not accessible (publisher paywall); the 'SyngoAI' vs 'syngo.via RT Image Suite' naming equivalence could not be independently confirmed from public abstracts alone.

#### New-source / product leads (not admitted or scored)

- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative: https://doi.org/10.1016/j.radonc.2026.111530. possible — pending confirmation that 'SyngoAI' = syngo.via RT Image Suite unverified
- Search: "syngo.via RT Image Suite" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22syngo.via%20RT%20Image%20Suite%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- A comparative evaluation of commercial software programs for automatic segmentation in breast cancer radiotherapy planning.: https://doi.org/10.1007/s12194-026-01040-2. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Accuracy of Photon Dose Calculation on Photon-Counting Computed Tomography-A Comparison Study Based on Virtual Monoenergetic and Electron Density (Rho) Images for Pancreatic Cases.: https://doi.org/10.1016/j.adro.2025.101957. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Development and implementation of an MRI-only simulation, planning, and treatment workflow for prostate radiotherapy using synthetic CT on MR-linac.: https://doi.org/10.1002/acm2.70499. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Phantom benchmarking for quality assurance of synthetic computed tomography in cranial magnetic resonance-only radiotherapy.: https://doi.org/10.1016/j.phro.2026.101062. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Advancing offline magnetic resonance-guided prostate radiotherapy through dedicated imaging and deep learning-based automatic contouring of targets and neurovascular structures.: https://doi.org/10.1016/j.phro.2025.100825. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### spectronic-mriplanner

- **Name**: MRI Planner
- **Company**: Spectronic Medical
- **Category**: Image Synthesis → secondary: Auto-Contouring
- **Current effective scores**: E3 / L4 / R3
- **Stored scores**: E3 / L4
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | categoryEvidence | info | Review evidence separately for Image Synthesis, Auto-Contouring | Do not flatten evidence across tasks |
| Evidence | evidenceRigor E3 / breadth | warn | This product has by far the largest keyPapers list (16 entries spanning brain, H&N, pelvis/prostate) of all 12 products reviewed, consistent with MRI Planner being on the market longest among non-Philips competitors; the E3 rigor rating appears proportionate given the volume of independent multi-site literature (e.g., MR-OPERA, MR-PROTECT) but was not line-by-line re-verified in this pass. | Recommend a dedicated deep-dive audit of this product's full citation list in a follow-up session given its size; not all titles/DOIs/PMIDs were independently re-confirmed here. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | keyPapers[doi=10.1016/j.radonc.2026.111530] (MESCAL) | warn | MESCAL evaluated 'MRI Planner (Spectronic)' directly per the published abstract; attribution to this product is confirmed correct and anatomically scoped correctly (brain + pelvis). | None. |

#### Re-scoring proposal

- Proposed: E3 / L4 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://medical.spectronic.se/page-2/page6/index.html; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Dosimetric evaluation of magnetic resonance imaging based synthetic computed tomography for head and neck photon and proton therapy.: https://doi.org/10.1002/acm2.70335 (abstract retrieved; retrieved 2026-10-15).
- Comparison of four synthetic CT generators for brain and prostate MR-only workflow in radiotherapy.: https://doi.org/10.1186/s13014-023-02336-y (abstract retrieved; retrieved 2026-10-15).
- Prospective Clinical Feasibility Study for MRI-Only Brain Radiotherapy.: https://doi.org/10.3389/fonc.2021.812643 (abstract retrieved; retrieved 2026-10-15).
- Synthetic computed tomography data allows for accurate absorbed dose calculations in a magnetic resonance imaging only workflow for head and neck radiotherapy.: https://doi.org/10.1016/j.phro.2020.12.007 (abstract retrieved; retrieved 2026-10-15).
- MR-OPERA: A Multicenter/Multivendor Validation of Magnetic Resonance Imaging-Only Prostate Treatment Planning Using Synthetic Computed Tomography Images.: https://doi.org/10.1016/j.ijrobp.2017.06.006 (abstract retrieved; retrieved 2026-10-15).
- Clinical validation of a commercially available deep learning software for synthetic CT generation for brain.: https://doi.org/10.1186/s13014-021-01794-6 (abstract retrieved; retrieved 2026-10-15).
- Deep learning MRI-only synthetic-CT generation for pelvis, brain and head and neck cancers.: https://doi.org/10.1016/j.radonc.2023.110052 (abstract retrieved; retrieved 2026-10-15).
- Clinical implementation of deep learning-based synthetic CT for MRI-only volumetric modulated arc therapy in head and neck and pelvic cancer patients.: https://doi.org/10.1186/s13014-025-02744-2 (abstract retrieved; retrieved 2026-10-15).
- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative.: https://doi.org/10.1016/j.radonc.2026.111530 (abstract retrieved; retrieved 2026-10-15).
- MR-PROTECT: Clinical feasibility of a prostate MRI-only radiotherapy treatment workflow and investigation of acceptance criteria.: https://doi.org/10.1186/s13014-020-01513-7 (abstract retrieved; retrieved 2026-10-15).
- Cone beam CT for QA of synthetic CT in MRI only for prostate patients.: https://doi.org/10.1002/acm2.12429 (abstract retrieved; retrieved 2026-10-15).
- A novel anthropomorphic multimodality phantom for MRI-based radiotherapy quality assurance testing.: https://doi.org/10.1002/mp.14027 (abstract retrieved; retrieved 2026-10-15).
- Head and neck cancer patient positioning using synthetic CT data in MRI-only radiation therapy.: https://doi.org/10.1002/acm2.13525 (abstract retrieved; retrieved 2026-10-15).
- Evaluating the Hounsfield unit assignment and dose differences between CT-based standard and deep learning-based synthetic CT images for MRI-only radiation therapy of the head and neck.: https://doi.org/10.1002/acm2.14239 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of magnetic resonance imaging derived synthetic computed tomography for proton therapy planning in prostate cancer.: https://doi.org/10.1016/j.phro.2024.100625 (abstract retrieved; retrieved 2026-10-15).
- Feasibility of Magnetic Resonance-based Synthetic Computed Tomography for Proton Dose Calculation in Prostate Cancer.: https://doi.org/10.4103/jmp.jmp_259_25 (abstract retrieved; retrieved 2026-10-15).
- Search: MESCAL MRI Planner Spectronic brain pelvis synthetic CT benchmark (2026-10-15) — https://doi.org/10.1016/j.radonc.2026.111530
- Search: MR-OPERA multicenter multivendor validation MRI-only prostate synthetic CT (2026-10-15) — https://doi.org/10.1016/j.ijrobp.2017.06.006
- Search: Spectronic Medical MRI Planner FDA clearance CE EUDAMED (2026-10-15) — https://ec.europa.eu/tools/eudamed/
- Limits: Given the large number of associated papers (16), only the MESCAL and MR-OPERA citations were independently spot-checked against public sources; the remaining 14 were not individually re-verified for title/DOI/PMID accuracy in this pass.
- Search: "MRI Planner" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MRI%20Planner%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### mvision-image-plus

- **Name**: Image+
- **Company**: MVision AI
- **Category**: Image Synthesis
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | certification | warn | Record lists certification as 'CE' only (no FDA), consistent with the MVision CE-mark-only press release (Workspace+ Class IIa under MDR 2017/745, Oct 2025) found in vendor search; no FDA 510(k) found for Image+ in this pass. | None; consistent with current public vendor disclosures. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | warn | Both cited papers (acm2.70571, acm2.70765) are recent (2025-vintage ACMP journal DOIs) and were not independently retrieved in full text during this pass; titles appear plausible and product-specific (pelvic/abdominal MR-Linac validation and prostate AI segmentation + sCT). | Follow-up: pull abstracts via PubMed/Europe PMC to confirm these DOIs resolve to papers that name MVision Image+ specifically (as opposed to a generic in-house GAN method), given the pattern of comparator-vs-subject conflation seen elsewhere in this dataset. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://mvision.ai/image/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Synthetic CT imaging for pelvic and abdominal MR-only radiotherapy: Clinical validation on a 1.5T MR-Linac.: https://doi.org/10.1002/acm2.70571 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of AI-based segmentation and synthetic CT generation for MRI-only prostate radiotherapy planning.: https://doi.org/10.1002/acm2.70765 (abstract retrieved; retrieved 2026-10-15).
- Search: MVision AI Image+ synthetic CT 1.5T MR-Linac clinical validation (2026-10-15) — https://doi.org/10.1002/acm2.70571
- Search: MVision Image+ synthetic CT prostate AI segmentation evaluation (2026-10-15) — https://doi.org/10.1002/acm2.70765
- Search: MVision AI Workspace+ CE mark class IIa certification Image+ (2026-10-15) — https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/
- Limits: Could not fully verify the two Image+-specific DOIs against full text in this pass (not retrieved); regulatory status was verified against the vendor's own CE-mark announcement, not an EUDAMED registry lookup.
- Search: "Image+" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Image%2B%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- A generalized similarity metric based on Sobolev space geometry for deformable image registration in image-guided radiotherapy: https://doi.org/10.21203/rs.3.rs-10893690/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Image sharpening improves the visibility of reference points on low-dose lateral cephalometric radiographs: a phantom study.: https://doi.org/10.1093/dmfr/twag047. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### mr-box-synthetic

- **Name**: MR-Box
- **Company**: Therapanacea
- **Category**: Image Synthesis → secondary: Auto-Contouring
- **Current effective scores**: E2 / L2 / R2
- **Stored scores**: E2 / L2
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | product vs AdaptBox relationship | warn | MR-Box (image-synthesis, brain/pelvis/abdomen) and AdaptBox (registration/adaptive, H&N/breast/thorax/pelvis) are both Therapanacea products sharing underlying GAN-based sCT technology per the vendor's public materials; the inventory does not clearly document whether they share the same underlying sCT algorithm/regulatory clearance or are fully independent devices, which matters for correctly scoping shared literature (e.g., the self-learning GAN CBCT paper DOI 10.3389/fonc.2026.1756153 cited under AdaptBox). | Add an explicit technology-lineage note clarifying whether MR-Box and AdaptBox share a core sCT engine, to prevent future cross-attribution errors between the two Therapanacea products. |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | categoryEvidence | info | Review evidence separately for Image Synthesis, Auto-Contouring | Do not flatten evidence across tasks |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | keyPapers[doi=10.1016/j.radonc.2026.111530] (MESCAL) | warn | MESCAL explicitly tested 'MR Box (Therapanacea)' per the published abstract; attribution to this product is correct and anatomically scoped correctly (brain + pelvis, matching MR-Box's anatomical coverage listed in this inventory). | None. |

#### Re-scoring proposal

- Proposed: E2 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Comparison of four synthetic CT generators for brain and prostate MR-only workflow in radiotherapy.: https://doi.org/10.1186/s13014-023-02336-y (abstract retrieved; retrieved 2026-10-15).
- A multi-centric evaluation of self-learning GAN based pseudo-CT generation software for low field pelvic magnetic resonance imaging.: https://doi.org/10.3389/fonc.2023.1245054 (abstract retrieved; retrieved 2026-10-15).
- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative.: https://doi.org/10.1016/j.radonc.2026.111530 (abstract retrieved; retrieved 2026-10-15).
- Image-based evaluation of a commercial AI synthetic CT generator for brain and prostate MR-only radiotherapy.: https://doi.org/10.1002/acm2.70725 (abstract retrieved; retrieved 2026-10-15).
- Search: MESCAL MR Box Therapanacea brain pelvis synthetic CT (2026-10-15) — https://doi.org/10.1016/j.radonc.2026.111530
- Search: self-learning GAN pseudo-CT low field pelvic MRI multi-centric evaluation Frontiers Oncology (2026-10-15) — https://doi.org/10.3389/fonc.2023.1245054
- Search: Therapanacea MR-Box FDA CE clearance synthetic CT (2026-10-15) — https://www.accessdata.fda.gov/
- Limits: Full text of the multi-centric GAN pseudo-CT paper (10.3389/fonc.2023.1245054) was not retrieved in this pass; relied on title/DOI metadata only.
- Search: "MR-Box" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MR-Box%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Employment and Health Burden Changes Among Medicaid Expansion Enrollees.: https://doi.org/10.1001/jamahealthforum.2025.4639. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Mitigating inconsistencies in GWAS follow-up analyses with LocusCompare2.: https://doi.org/10.1038/s41588-025-02331-x. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Clinical validation of using a commercial synthetic-computed tomography solution for brain MRI-only radiotherapy treatment planning.: https://doi.org/10.1016/j.tipsro.2025.100328. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### therapanacea-adaptbox

- **Name**: AdaptBox
- **Company**: Therapanacea
- **Category**: Image Synthesis → secondary: Auto-Contouring
- **Current effective scores**: E2 / L2 / R3
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | certification | warn | FDA 510(k) search surfaced Therapanacea devices named 'ART-Plan' (K232479/K234068) and 'ART-Plan+' (K242822/K253091), product codes MUJ/QKB/LLZ — these trade names do not match 'AdaptBox' anywhere found in this pass. It is unclear whether AdaptBox is the commercial/marketing name for ART-Plan+ or a separate, not-yet-FDA-cleared product; the inventory's 'CE & FDA' certification claim for AdaptBox could not be independently confirmed against a 510(k) record bearing the 'AdaptBox' name. | Confirm with Therapanacea or FDA correspondence file whether 'AdaptBox' is an alternate/marketing name for ART-Plan+ (K253091) before retaining the FDA-cleared certification claim verbatim; if confirmed, cite the specific 510(k) number in the record. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | categoryEvidence | info | Review evidence separately for Image Synthesis, Auto-Contouring | Do not flatten evidence across tasks |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | keyPapers[doi=10.1016/j.radonc.2026.111530] (MESCAL) | warn | MESCAL tested four sCT solutions (MRI Planner, SyngoAI, MR Box, MRCAT) across brain/pelvis only — AdaptBox (a registration/adaptive-workflow product with H&N/breast/thorax/pelvis scope, not one of the four named MESCAL solutions) is not evidenced by MESCAL at all. Its presence as a keyPaper here is a likely misattribution analogous to the Head & Neck/MESCAL issue already confirmed. | Remove the MESCAL keyPaper entry from therapanacea-adaptbox; MESCAL's tested 'MR Box' is the correct Therapanacea product for that citation, not AdaptBox. |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Implementation of an AI-Driven Workflow for Daily Dose Reconstruction in Prostate Cancer Radiotherapy.: https://doi.org/10.3390/cancers18111826 (abstract retrieved; retrieved 2026-10-15).
- Standardizing MRI-only radiotherapy commissioning: Benchmark dataset and acceptance levels from the MESCAL initiative.: https://doi.org/10.1016/j.radonc.2026.111530 (abstract retrieved; retrieved 2026-10-15).
- Self-learning GAN based synthetic CT generation: unlocking CBCT-based adaptive radiotherapy.: https://doi.org/10.3389/fonc.2026.1756153 (abstract retrieved; retrieved 2026-10-15).
- Search: Therapanacea AdaptBox synthetic CT CBCT adaptive radiotherapy regulatory clearance (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253091.pdf
- Search: AI-driven workflow daily dose reconstruction prostate cancer radiotherapy Cancers 2026 (2026-10-15) — https://doi.org/10.3390/cancers18111826
- Search: self-learning GAN synthetic CT CBCT adaptive radiotherapy Frontiers Oncology 2026 (2026-10-15) — https://doi.org/10.3389/fonc.2026.1756153
- Limits: Could not confirm the exact commercial relationship between 'AdaptBox' and the FDA-listed 'ART-Plan'/'ART-Plan+' trade names from public sources in this pass; this identity question should be resolved directly with the vendor or FDA 510(k) summary full text before any certification claims are relied upon.
- Search: "AdaptBox" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AdaptBox%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 2 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Developing a web-based dashboard for adaptive radiotherapy workflows.: https://doi.org/10.1002/acm2.70546. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### pymedix-registration

- **Name**: Autofuse
- **Company**: PyMedix
- **Category**: Registration
- **Current effective scores**: E0 / L1c / R3 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidenceRigor E0 / clinical evidence basis | warn | FDA 510(k) K233572 summary (via Innolitics) states explicitly 'No clinical data. Bench testing only' for Autofuse — consistent with this product's E0 rigor rating and absence of keyPapers in the inventory. No peer-reviewed clinical publication naming Autofuse was found in this pass. | None; E0 rating appears well supported. Recommend periodic re-search for emerging literature. |
| Transparency | trainingData | warn | Confirmed via vendor product page that Autofuse explicitly markets itself as NOT deep-learning-based ('machine perception', not deep learning) — this is a notable identity/technology distinction from most other products in this review (which use deep-learning sCT/registration), and should be reflected clearly so readers do not assume AI/DL techniques are used. | Add an explicit note that Autofuse's registration algorithm is vendor-described as non-deep-learning ('machine perception') technology, distinguishing it from DL-based competitors in this category. |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://pymedix.com/autofuse/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: PyMedix Autofuse deformable image registration radiotherapy CE FDA (2026-10-15) — https://fda.innolitics.com/device/K233572
- Search: Autofuse FDA 510k K233572 clinical evidence (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233572.pdf
- Limits: Did not review the full 510(k) summary PDF beyond the Innolitics-indexed excerpt; bench-testing-only characterization is based on a third-party aggregator's summary of the FDA submission, not the primary FDA PDF text itself.
- Search: "Autofuse" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Autofuse%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- A label-aware diffusion model for weakly supervised deformable registration of multimodal MRI-TRUS in prostate cancer.: https://doi.org/10.1007/s11548-025-03538-3. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- A survey of transformer-based architectures in medical image analysis: models, applications, and challenges.: https://doi.org/10.3389/frai.2026.1873938. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- State of the AI: Post-Deployment Monitoring of Radiology-Focused Internally Developed AI.: https://doi.org/10.1016/j.mcpdig.2026.100342. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Soft giant magnetoimpedance electronics enable contact-free human-machine interactions.: https://doi.org/10.1073/pnas.2526097123. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Patterns of intra-discal vacuum phenomenon in adult degenerative scoliosis.: https://doi.org/10.21037/jss-24-160. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### therapanacea-smartfuse

- **Name**: SmartFuse
- **Company**: Therapanacea
- **Category**: Registration
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | name/category vs cited paper topic | warn | The sole keyPaper (DOI 10.1002/acm2.70479) is titled 'Automatic target volume segmentation for offline adaptive head-and-neck radiotherapy' — a segmentation-focused title, while SmartFuse is categorized here as a Registration product. It was not confirmed in this pass whether SmartFuse's registration function is a necessary/explicit component evaluated within that paper, or whether the paper primarily evaluates an auto-contouring component bundled in the same workflow. | Obtain the full text or abstract of 10.1002/acm2.70479 to confirm it directly evaluates SmartFuse's image-registration functionality (not merely a co-located segmentation tool), and document the specific registration-relevant endpoints reported. |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | certification 'CE & TGA' | warn | TGA (Australian Therapeutic Goods Administration) clearance is comparatively unusual among the 12 products reviewed (most list CE/FDA only); this was not independently verified against the TGA public database in this pass. | Verify the TGA listing via the Australian Register of Therapeutic Goods (ARTG) search and cite the ARTG entry number if confirmed. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Automatic target volume segmentation for offline adaptive head-and-neck radiotherapy.: https://doi.org/10.1002/acm2.70479 (abstract retrieved; retrieved 2026-10-15).
- Search: Therapanacea SmartFuse automatic target volume segmentation offline adaptive head neck radiotherapy (2026-10-15) — https://doi.org/10.1002/acm2.70479
- Search: Therapanacea SmartFuse CE TGA registration deformable image registration (2026-10-15) — https://www.therapanacea.eu/
- Limits: TGA clearance claim and the registration-vs-segmentation scope of the single cited paper were not independently verified against primary regulatory/publisher sources in this pass.
- Search: "SmartFuse" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SmartFuse%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### mvision-adapt-plus

- **Name**: Adapt+
- **Company**: MVision AI
- **Category**: Registration
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | certification 'CE' | warn | Confirmed via MVision's own press release that Workspace+ (the platform containing Adapt+) received CE Class IIa marking under MDR 2017/745 in October 2025 (CE 2797 notified body); consistent with the inventory's 'CE' certification field. No FDA clearance found or claimed. | None. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidenceRigor E0 / keyPapers absent | warn | Confirmed no peer-reviewed publication specific to Adapt+ exists publicly as of this search; the DLinRT product page itself records 'evidence completeness check performed 2026-09-14 with no publication or abstract found,' consistent with the E0 rating and empty keyPapers list. | None; transparent and consistent self-disclosure. Recommend re-check in future sweeps as Adapt+ is a newly split-out product (created 2026-09-13) with release date 2026-01-09. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://mvision.ai/adapt/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: MVision AI Adapt+ deformable registration adaptive radiotherapy CE mark (2026-10-15) — https://mvision.ai/adapt/
- Search: MVision Workspace+ CE Class IIa certification October 2025 (2026-10-15) — https://mvision.ai/mvision-ais-workspace-receives-ce-mark-class-iia-certification/
- Search: MVision Adapt+ peer-reviewed publication contour propagation (2026-10-15) — https://dlinrt.eu/product/mvision-adapt-plus
- Limits: Adapt+ is a very recently split-out product entry with no independent literature; findings rely entirely on vendor-published material (website, brochure, press release), which could not be cross-checked against an independent source in this pass.
- Search: "Adapt+" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Adapt%2B%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- ECG-Adapt: A Novel Framework for Robust Electrocardiogram Classification Across Diverse Populations and Recording Conditions.: https://doi.org/10.1109/tbme.2026.3653051. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Preservice Physical Education Teachers Learn to Adapt Instructional Decisions Across the Spectrum During a Structured Field Experience: https://doi.org/10.21203/rs.3.rs-11020014/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Reply: Methodological considerations in the ADAPT-1 ovarian stimulation study.: https://doi.org/10.1093/humrep/deag121. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Methodological considerations in the ADAPT-1 ovarian stimulation study.: https://doi.org/10.1093/humrep/deag120. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- ADAPT-IDS: An Unsupervised Multi-Metric Framework forReliable Concept Drift Detection and Adaptive Intrusion Detectionin Evolving Network Streams: https://doi.org/10.21203/rs.3.rs-10963104/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### mvision-ai-workspace-plus

- **Name**: Workspace+
- **Company**: MVision AI
- **Category**: Platform → secondary: Image Synthesis, Registration, Treatment Planning
- **Current effective scores**: E1 / L2 / R3 (efficacy provisional)
- **Stored scores**: E1 / L2
- **Last revised**: 2026-09-06; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | keyPapers | warn | E1 claimed without scored attributable peer-reviewed papers | Verify source before editing |
| Evidence | categoryEvidence | info | Review evidence separately for Platform, Image Synthesis, Registration, Treatment Planning | Do not flatten evidence across tasks |
| Evidence | evidence[]/evidenceRigorNotes | info | No new independent peer-reviewed publication naming Workspace+ was discovered beyond what the catalogue's existing Wave 4/5D/Batch-C sweeps already captured; current E0/E1 rating and supporting notes appear internally consistent with sourced evidence. | No change required at this time; keep flagged for the next periodic Europe PMC sweep. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://mvision.ai/workspace/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Workspace+ radiotherapy peer-reviewed publication 2026 (2026-10-15) — https://europepmc.org/
- Limits: Did not perform an exhaustive independent primary-source re-verification of every vendor claim for Workspace+ (e.g. CE Eudamed lookups, every press release) within the time available for this audit; relied on cross-checking against existing dated sweep notes plus one targeted web search.
- Search: "Workspace+" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Workspace%2B%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Psychedelics Restructure the Global Workspace of Consciousness: https://doi.org/10.64898/2026.09.28.755172. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Configuration Design and Workspace Analysis of a Large-Scale Motion Simulator Based on Cable-Driven Parallel Technology.: https://doi.org/10.3390/s26175550. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Congruent Head Orientation in the Absence of Sight Facilitates Motor Performance.: https://doi.org/10.3390/vision10040062. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Comparison of Reachable Workspace Capacity to Real-World Arm Use Performance: A Wearable Accelerometry Study on Chronic Stroke.: https://doi.org/10.3390/s26175651. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- The effects of resilience-oriented workspace interventions: combining social network analysis and organizational quality indicators.: https://doi.org/10.1016/j.apergo.2026.104888. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### ge-healthcare-irt

- **Name**: Intelligent Radiation Therapy (iRT)
- **Company**: GE Healthcare
- **Category**: Platform
- **Current effective scores**: E0 / L3 / R2 (efficacy provisional)
- **Stored scores**: E0 / L3
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidence[]/evidenceRigorNotes | info | No new independent peer-reviewed publication naming iRT was discovered beyond what the catalogue's existing Wave 4/5D/Batch-C sweeps already captured; current E0/E1 rating and supporting notes appear internally consistent with sourced evidence. | No change required at this time; keep flagged for the next periodic Europe PMC sweep. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L3 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/specialties/oncology-solutions/intelligent-rt; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: iRT radiotherapy peer-reviewed publication 2026 (2026-10-15) — https://europepmc.org/
- Limits: Did not perform an exhaustive independent primary-source re-verification of every vendor claim for iRT (e.g. CE Eudamed lookups, every press release) within the time available for this audit; relied on cross-checking against existing dated sweep notes plus one targeted web search.
- Search: "Intelligent Radiation Therapy iRT" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Intelligent%20Radiation%20Therapy%20iRT%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### manteia-acculearning

- **Name**: AccuLearning
- **Company**: Manteia
- **Category**: Platform
- **Current effective scores**: E1 / L2 / R1 (efficacy provisional)
- **Stored scores**: E1 / L2
- **Last revised**: 2026-09-29; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Evidence | keyPapers | warn | 1 provisional paper scores require source retrieval | Verify source before editing |
| Evidence | evidence[]/evidenceRigorNotes | info | No new independent peer-reviewed publication naming AccuLearning was discovered beyond what the catalogue's existing Wave 4/5D/Batch-C sweeps already captured; current E0/E1 rating and supporting notes appear internally consistent with sourced evidence. | No change required at this time; keep flagged for the next periodic Europe PMC sweep. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R1 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.manteiatech.com/acculearning; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: AccuLearning radiotherapy peer-reviewed publication 2026 (2026-10-15) — https://europepmc.org/
- Limits: Did not perform an exhaustive independent primary-source re-verification of every vendor claim for AccuLearning (e.g. CE Eudamed lookups, every press release) within the time available for this audit; relied on cross-checking against existing dated sweep notes plus one targeted web search.
- Search: "AccuLearning" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AccuLearning%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 4 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- A Preliminary Study on the Auto-Segmentation of Targets and Organs at Risk in Pediatric Total Marrow and Lymphoid Irradiation.: https://doi.org/10.1177/15330338261426261. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep learning-powered radiotherapy dose prediction: clinical insights from 622 patients across multiple sites tumor at a single institution.: https://doi.org/10.1186/s13014-025-02634-7. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Accumulated dose on daily iCBCT for rectal cancer: Effects of inter-fraction bowel cavity motion volume.: https://doi.org/10.1002/acm2.70524. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Application progress of artificial intelligence in tumor diagnosis and treatment.: https://doi.org/10.3389/frai.2024.1487207. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### lumonus-ai

- **Name**: Lumonus AI (Oncology Intelligence Layer)
- **Company**: Lumonus
- **Category**: Platform → secondary: Performance Monitor, Treatment Planning
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | categoryEvidence | info | Review evidence separately for Platform, Performance Monitor, Treatment Planning | Do not flatten evidence across tasks |
| Evidence | evidence[]/evidenceRigorNotes | info | No new independent peer-reviewed publication naming Lumonus AI was discovered beyond what the catalogue's existing Wave 4/5D/Batch-C sweeps already captured; current E0/E1 rating and supporting notes appear internally consistent with sourced evidence. | No change required at this time; keep flagged for the next periodic Europe PMC sweep. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.lumonus.com/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Lumonus AI radiotherapy peer-reviewed publication 2026 (2026-10-15) — https://europepmc.org/
- Limits: Did not perform an exhaustive independent primary-source re-verification of every vendor claim for Lumonus AI (e.g. CE Eudamed lookups, every press release) within the time available for this audit; relied on cross-checking against existing dated sweep notes plus one targeted web search.
- Search: "Lumonus AI Oncology Intelligence Layer" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Lumonus%20AI%20Oncology%20Intelligence%20Layer%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### therapanacea-art-plan

- **Name**: ART-Plan+
- **Company**: Therapanacea
- **Category**: Platform → secondary: Auto-Contouring, Image Synthesis, Registration, Treatment Planning
- **Current effective scores**: E0 / L2 / R2 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-09-05; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | secondaryCategories | warn | Secondary category list violates documented constraints | Verify source before editing |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | categoryEvidence | info | Review evidence separately for Platform | Do not flatten evidence across tasks |
| Evidence | evidence[]/evidenceRigorNotes | info | No new independent peer-reviewed publication naming ART-Plan+ was discovered beyond what the catalogue's existing Wave 4/5D/Batch-C sweeps already captured; current E0/E1 rating and supporting notes appear internally consistent with sourced evidence. | No change required at this time; keep flagged for the next periodic Europe PMC sweep. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: ART-Plan+ radiotherapy peer-reviewed publication 2026 (2026-10-15) — https://europepmc.org/
- Limits: Did not perform an exhaustive independent primary-source re-verification of every vendor claim for ART-Plan+ (e.g. CE Eudamed lookups, every press release) within the time available for this audit; relied on cross-checking against existing dated sweep notes plus one targeted web search.
- Search: "ART-Plan+" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22ART-Plan%2B%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Daily adaptive radiotherapy in head and neck squamous cell carcinoma can negatively impact organ at risk dosimetry.: https://doi.org/10.1016/j.ctro.2026.101205. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Clinical indicators for dose re-optimization in magnetic resonance-guided online adaptive radiotherapy for prostate cancer.: https://doi.org/10.1016/j.phro.2026.101060. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Real-world performance evaluation of commercial autocontouring software for head and neck cancer radiotherapy.: https://doi.org/10.1093/bjr/tqaf098. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- An all-in-one workflow for emergency hippocampal-avoidance whole-brain radiotherapy in brain metastases, with optional online adaptive extension.: https://doi.org/10.1002/acm2.70405. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- A study on the effects of intrafractional changes in bladder volume on positional accuracy and target dosimetry in online adaptive radiotherapy for cervical cancer.: https://doi.org/10.1016/j.apradiso.2026.112738. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### raysearch-raystation-planning

- **Name**: RayStation Deep Learning Dose Prediction
- **Company**: RaySearch Laboratories
- **Category**: Treatment Planning
- **Current effective scores**: E2 / L4 / R3
- **Stored scores**: E2 / L4
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | evaluationData.sourceUrl / evaluationData.source | warn | evaluationData still cites DOI 10.1016/j.ejmp.2024.103419 ('Eriksson et al. Phys Med 2024') as the source/sourceUrl for dose-prediction evaluation claims. This exact DOI was investigated and discredited in the product's own evidenceRigorNotes ('resolves to an unrelated digital breast tomosynthesis phantom study and no matching paper exists on PubMed or Crossref, so the citation was removed'). The removal was applied to the evidence[] array and the rigor narrative but NOT to the evaluationData block, which still presents the stale/incorrect DOI as the authoritative evaluation source. | Delete the ejmp.2024.103419 DOI and the 'Eriksson et al. Phys Med 2024' attribution from evaluationData.source/sourceUrl; replace with one of the verified per-paper citations already in evidence[] (e.g., Neugebauer 2026 doi:10.1016/j.phro.2026.100999, or Besouw 2025 doi:10.1016/j.phro.2025.100839), consistent with the E2 rationale. |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L4 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.raysearchlabs.com/media/publications/deep-learning-planning-model-catalogue-flip-pdf/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- A geometry and dose-volume based performance monitoring of artificial intelligence models in radiotherapy treatment planning for prostate cancer.: https://doi.org/10.1016/j.phro.2023.100494 (abstract retrieved; retrieved 2026-10-15).
- Enhancing automated right-sided early-stage breast cancer treatments via deep learning model adaptation without additional training.: https://doi.org/10.1002/mp.17682 (abstract retrieved; retrieved 2026-10-15).
- Evaluation and tuning of a commercial automated planning system for prostate radiotherapy.: https://doi.org/10.1016/j.phro.2025.100834 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of a clinically introduced deep learning model for radiotherapy treatment planning of breast cancer.: https://doi.org/10.1016/j.phro.2023.100496 (abstract retrieved; retrieved 2026-10-15).
- A fully automated machine-learning-based workflow for radiation treatment planning in prostate cancer.: https://doi.org/10.1016/j.ctro.2025.100933 (abstract retrieved; retrieved 2026-10-15).
- A multi-centre evaluation of deep learning based radiotherapy planning for left-sided node-negative breast cancer.: https://doi.org/10.1016/j.phro.2025.100839 (abstract retrieved; retrieved 2026-10-15).
- Automated deep learning segmentation and planning for left-sided breast radiotherapy with minimised adaptations based on dose, TCP and NTCP criteria.: https://doi.org/10.1016/j.phro.2026.100961 (abstract retrieved; retrieved 2026-10-15).
- Automated treatment planning for proton pencil beam scanning using deep learning dose prediction and dose-mimicking optimization.: https://doi.org/10.1002/acm2.14065 (abstract retrieved; retrieved 2026-10-15).
- Prospective blinded clinical evaluation of a fully automated workflow for prostate radiotherapy.: https://doi.org/10.1016/j.phro.2026.100999 (abstract retrieved; retrieved 2026-10-15).
- A deep learning-based dose calculation method for volumetric modulated arc therapy.: https://doi.org/10.1186/s13014-024-02534-2 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of deep learning-based automated radiotherapy planning for early-stage lung cancer using SBRT-VMAT: A comparison with manual planning.: https://doi.org/10.1002/acm2.70291 (abstract retrieved; retrieved 2026-10-15).
- Search: 10.1016/j.ejmp.2024.103419 Eriksson RayStation dose prediction (2026-10-15) — https://doi.org/10.1016/j.ejmp.2024.103419
- Limits: Did not exhaustively re-verify every one of the 9 evidence[] DOIs individually (relied on the existing 2026-09-23 HAIR cross-check annotations); evaluationData.studyDesign/results text may also need rewording once the source citation is fixed.
- Search: "RayStation Deep Learning Dose Prediction" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22RayStation%20Deep%20Learning%20Dose%20Prediction%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### manteia-mozi

- **Name**: MOZI TPS
- **Company**: Manteia
- **Category**: Treatment Planning → secondary: Image Synthesis
- **Current effective scores**: E0 / L1c / R3 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-09-29; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | categoryEvidence | info | Review evidence separately for Image Synthesis | Do not flatten evidence across tasks |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | description / related products | info | Verified three distinct Manteia FDA clearances exist: MOZI TPS (K223724, full treatment-planning system — dose calculation, Monte Carlo, plan optimization, photon EBRT); AccuContour 4.0 (K251351, pure segmentation: 'used by the radiation oncology department to segment CT images'); and ARTAssistant (K250780, NOT in inventory — an adaptive-RT image-processing assistant whose three functions are (1) rigid/deformable registration, (2) sCT GENERATION from CBCT or MR, and (3) assisted/manual OAR contouring). ARTAssistant's predicate is AccuContour (K221706) and references MRI Planner (K211841) and RayStation (K220141), confirming it is a separate product line, not a MOZI/AccuContour version bump. | No change needed to MOZI TPS entry itself; this finding supports NOT conflating MOZI (planning), AccuContour (segmentation), and ARTAssistant (registration+sCT generation+contour-assist) as the same product, per instruction not to conflate sCT generation and sCT segmentation — ARTAssistant performs sCT generation (image conversion) as a separate function from its (non-AI-specified) contouring tool, and is functionally distinct from AccuContour's segmentation-only clearance. |

#### Re-scoring proposal

- Proposed: E0 / L1c / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.manteiamedical.com/mozi; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: MOZI TPS K223724 FDA 510k scope (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223724.pdf
- Search: ARTAssistant K250780 FDA 510k Manteia (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250780.pdf
- Search: AccuContour 4.0 K251351 FDA 510k Manteia (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf25/K251351.pdf
- Limits: AccuContour 4.0 (K251351) is already correctly tracked inside the existing 'AccuContour' auto-contouring inventory entry (lines ~6513 of inventory.json), so it is NOT a missing/duplicate candidate — confirmed to avoid false-positive duplication flag.

#### New-source / product leads (not admitted or scored)

- ARTAssistant (Manteia Technologies) — FDA 510(k) K250780, cleared 2025-12-05: https://www.accessdata.fda.gov/cdrh_docs/pdf25/K250780.pdf. Manteia Technologies Co., Ltd. new-candidate-not-in-inventory
- Search: "MOZI TPS" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MOZI%20TPS%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 3 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- A simulation study of a novel spiral volumetric modulated arc therapy for enhanced dose delivery efficiency and quality in radiotherapy.: https://doi.org/10.1002/mp.70423. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Fully automated intensity-modulated radiotherapy plans for rectal cancer based on deep learning predictions of three-dimensional dose distributions.: https://doi.org/10.21037/qims-2025-168. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Progress and challenges of artificial intelligence in lung cancer clinical translation.: https://doi.org/10.1038/s41698-025-00986-7. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### plan-ai

- **Name**: Plan AI
- **Company**: Sun Nuclear (Mirion Medical)
- **Category**: Treatment Planning
- **Current effective scores**: E2 / L2 / R2
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | evidence[]/evidenceRigorNotes | info | Existing evidence base for Plan AI (Sun Nuclear / Oncospace) (regulatory clearance + evidence[] list) is consistent with its stated evidenceRigor; no additional product-naming peer-reviewed study or contradicting regulatory record was found in this pass. | None required; re-check at next sweep, especially RadOncAI and RatoAI which are very recent (2026) clearances with no peer-reviewed literature yet (E0 correctly conservative). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.sunnuclear.com/products/plan-ai; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Development and Clinical Validation of a Protocol-Agnostic Machine Learning Platform for Automated Treatment Planning in External Beam Radiation Therapy.: https://doi.org/10.1016/j.adro.2026.102036 (abstract retrieved; retrieved 2026-10-15).
- Search: Plan AI (Sun Nuclear / Oncospace) FDA 510k clearance peer-reviewed (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Shallow single-pass check only for Plan AI (Sun Nuclear / Oncospace); did not run full Europe PMC/Crossref alias-gated query matrix as done in prior HAIR waves.
- Search: "Plan AI" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Plan%20AI%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- RAISE: A Synthesized Implementation Science Framework for AI Integration in Health Professions Education: https://doi.org/10.20944/preprints202610.0379.v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- The Role of Hippocampal Microglial cGAS-STING Signaling Pathway in Postoperative Cognitive Dysfunction in Diabetic Mice.: https://doi.org/10.31083/fbl49331. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Artificial intelligence perceptions and experiences among first and second year medical students.: https://doi.org/10.1177/10815589261462547. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### rpa-radiation-planning-assistant

- **Name**: Radiation Planning Assistant (RPA)
- **Company**: MD Anderson Cancer Center
- **Category**: Treatment Planning
- **Current effective scores**: E2 / L2 / R4
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | evidence[] | info | New RPA paper confirmed real and indexed: Netherton TJ et al., 'Artificial Intelligence-Powered Radiotherapy for Resource-Limited Settings: Advancing Cervical and Prostate Cancer Treatment Planning With the Radiation Planning Assistant', JCO Global Oncology 2026;12(7):e2500702, DOI 10.1200/GO-25-00702, PMID 42424567, verified present in Europe PMC (hitCount=1, firstPublicationDate 2026-07-09). | Add this DOI to the RPA evidence array as a new multi-institutional peer-reviewed publication (prostate >1,000 plans, cervical 110 plans, EMBRACE II-aligned, nnU-Net auto-contouring + knowledge-based planning); it strengthens — but on its own does not elevate beyond — the existing E2 rating since it is MD Anderson-led (not yet independently externally authored in the same sense as Court 2024). |
| Evidence | evidenceRigorNotes | warn | The stored evidenceRigorNotes narrative predates this 2026-07-09 publication and does not yet mention it; the catalogue's most recent RPA sweep language stops at Lloyd 2026/Kavuma 2025 context. | Append a dated note referencing GO-25-00702 and re-confirm whether E2 should be retained or whether this new prospective/validated expansion to cervical+prostate workflows with EMBRACE II alignment should be considered toward E3 criteria (would still require independent/non-MDACC confirmation). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R4 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://rpa.mdanderson.org/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Addressing the Global Expertise Gap in Radiation Oncology: The Radiation Planning Assistant.: https://doi.org/10.1200/go.22.00431 (abstract retrieved; retrieved 2026-10-15).
- Artificial Intelligence-Based Radiotherapy Contouring and Planning to Improve Global Access to Cancer Care.: https://doi.org/10.1200/go.23.00376 (abstract retrieved; retrieved 2026-10-15).
- An automated treatment planning portfolio for whole breast radiotherapy.: https://doi.org/10.1002/mp.17588 (abstract retrieved; retrieved 2026-10-15).
- Feasibility and impact of knowledge-based automated radiotherapy treatment planning in low- and middle-income countries.: https://doi.org/10.3332/ecancer.2025.1988 (abstract retrieved; retrieved 2026-10-15).
- Externally validated knowledge-based planning model for machine learning-assisted radiation therapy treatment of high-grade glioma.: https://doi.org/10.1016/j.meddos.2025.12.001 (abstract retrieved; retrieved 2026-10-15).
- Search: 10.1200/go-25-00702 Europe PMC (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1200/GO-25-00702%22&format=json
- Search: Netherton Radiation Planning Assistant cervical prostate JCO Global Oncology 2026 (2026-10-15) — https://researchonline.lshtm.ac.uk/id/eprint/4682683/
- Limits: Did not independently re-derive the >90% plan-acceptability figures from the new paper's full text (abstract/metadata only, paywalled); recommend pulling full text before finalizing wording.

#### New-source / product leads (not admitted or scored)

- Artificial Intelligence-Powered Radiotherapy for Resource-Limited Settings: Advancing Cervical and Prostate Cancer Treatment Planning With the Radiation Planning Assistant: https://doi.org/10.1200/GO-25-00702. MD Anderson Cancer Center (Netherton, Court et al.) + international collaborators (LMIC sites) verified-new-evidence-add
- Search: "Radiation Planning Assistant RPA" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Radiation%20Planning%20Assistant%20RPA%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Can physics review catch prescription and PTV margin errors in fully automated radiotherapy plans? A hazard study.: https://doi.org/10.1002/acm2.70759. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Global spotlight editorial: Advancing treatment planning to promote equity through AI and automation in clinical medical physics.: https://doi.org/10.1002/acm2.70640. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Artificial Intelligence-Powered Radiotherapy for Resource-Limited Settings: Advancing Cervical and Prostate Cancer Treatment Planning With the Radiation Planning Assistant.: https://doi.org/10.1200/go-25-00702. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Artificial Intelligence and the Global Radiotherapy Gap.: https://doi.org/10.1200/go-26-00181. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### united-urt-auto-planning

- **Name**: uRT Auto-Planning
- **Company**: United Imaging
- **Category**: Treatment Planning
- **Current effective scores**: E2 / L2 / R2
- **Stored scores**: E2 / L2
- **Last revised**: 2026-06-15; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | evidence[]/evidenceRigorNotes | info | Existing evidence base for uRT Auto-Planning (regulatory clearance + evidence[] list) is consistent with its stated evidenceRigor; no additional product-naming peer-reviewed study or contradicting regulatory record was found in this pass. | None required; re-check at next sweep, especially RadOncAI and RatoAI which are very recent (2026) clearances with no peer-reviewed literature yet (E0 correctly conservative). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://eu.united-imaging.com/en/product-service/products/rt; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Multicenter study on the versatility and adoption of AI-driven automated radiotherapy planning across cancer types.: https://doi.org/10.1038/s41467-025-67581-z (abstract retrieved; retrieved 2026-10-15).
- Search: uRT Auto-Planning FDA 510k clearance peer-reviewed (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Shallow single-pass check only for uRT Auto-Planning; did not run full Europe PMC/Crossref alias-gated query matrix as done in prior HAIR waves.
- Search: "uRT Auto-Planning" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22uRT%20Auto-Planning%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### mvision-dose-plus

- **Name**: Dose+
- **Company**: MVision AI
- **Category**: Treatment Planning
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-09-23; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | evidence[]/evidenceRigorNotes | info | Existing evidence base for Dose+ (regulatory clearance + evidence[] list) is consistent with its stated evidenceRigor; no additional product-naming peer-reviewed study or contradicting regulatory record was found in this pass. | None required; re-check at next sweep, especially RadOncAI and RatoAI which are very recent (2026) clearances with no peer-reviewed literature yet (E0 correctly conservative). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://mvision.ai/dose/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- A comparative assessment of deep learning and knowledge-based dose prediction models for advanced radiotherapy planning of prostate cancer with focal boosting.: https://doi.org/10.1016/j.phro.2026.100977 (abstract retrieved; retrieved 2026-10-15).
- Search: Dose+ FDA 510k clearance peer-reviewed (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Shallow single-pass check only for Dose+; did not run full Europe PMC/Crossref alias-gated query matrix as done in prior HAIR waves.
- Search: "Dose+" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Dose%2B%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Calibration of Priors for Bayesian Model-Based Dose-Finding Trial Designs With Joint Outcomes.: https://doi.org/10.1002/sim.70746. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### wisdom-deep-plan

- **Name**: DeepPlan
- **Company**: Wisdom Tech
- **Category**: Treatment Planning → secondary: Auto-Contouring
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | categoryEvidence | info | Review evidence separately for Treatment Planning, Auto-Contouring | Do not flatten evidence across tasks |
| Evidence | evidence[]/evidenceRigorNotes | info | Existing evidence base for DeepPlan (regulatory clearance + evidence[] list) is consistent with its stated evidenceRigor; no additional product-naming peer-reviewed study or contradicting regulatory record was found in this pass. | None required; re-check at next sweep, especially RadOncAI and RatoAI which are very recent (2026) clearances with no peer-reviewed literature yet (E0 correctly conservative). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: http://www.wisdom-tech.online/view-15.html; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Spiral volumetric modulated arc therapy for whole-brain radiotherapy with simultaneous integrated boost to multiple brain metastases.: https://doi.org/10.1186/s13014-025-02742-4 (abstract retrieved; retrieved 2026-10-15).
- Spiral volumetric modulated arc therapy enhances peak-to-valley dose contrast for 3D-GRID radiotherapy compared to VMAT and tomotherapy.: https://doi.org/10.1186/s12885-026-16337-z (abstract retrieved; retrieved 2026-10-15).
- Search: DeepPlan FDA 510k clearance peer-reviewed (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Shallow single-pass check only for DeepPlan; did not run full Europe PMC/Crossref alias-gated query matrix as done in prior HAIR waves.
- Search: "DeepPlan" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22DeepPlan%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 3 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Dosimetric comparison of lattice radiotherapy across three modern linear accelerator platforms.: https://doi.org/10.1002/pro6.70078. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### therapanacea-smartplan

- **Name**: SmartPlan
- **Company**: Therapanacea
- **Category**: Treatment Planning
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-28; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | evidence[]/evidenceRigorNotes | info | Existing evidence base for SmartPlan (regulatory clearance + evidence[] list) is consistent with its stated evidenceRigor; no additional product-naming peer-reviewed study or contradicting regulatory record was found in this pass. | None required; re-check at next sweep, especially RadOncAI and RatoAI which are very recent (2026) clearances with no peer-reviewed literature yet (E0 correctly conservative). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://therapanacea.com/products; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Quantitative Evaluation of a Fully Automated Planning Solution for Prostate-Only and Whole-Pelvic Radiotherapy.: https://doi.org/10.3390/cancers16223735 (abstract retrieved; retrieved 2026-10-15).
- Search: SmartPlan FDA 510k clearance peer-reviewed (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Shallow single-pass check only for SmartPlan; did not run full Europe PMC/Crossref alias-gated query matrix as done in prior HAIR waves.
- Search: "SmartPlan" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SmartPlan%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- A new model of heart failure with preserved ejection fraction using external radiation therapy in male rats.: https://doi.org/10.14814/phy2.70900. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### informai-radoncai

- **Name**: RadOncAI
- **Company**: InformAI, Inc.
- **Category**: Treatment Planning
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: not recorded; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | technicalSpecifications | warn | Nonstandard DICOM-RT nomenclature | Verify source before editing |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidence[]/evidenceRigorNotes | info | Existing evidence base for RadOncAI (regulatory clearance + evidence[] list) is consistent with its stated evidenceRigor; no additional product-naming peer-reviewed study or contradicting regulatory record was found in this pass. | None required; re-check at next sweep, especially RadOncAI and RatoAI which are very recent (2026) clearances with no peer-reviewed literature yet (E0 correctly conservative). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | company | warn | Company label does not exactly match registry; check legal-name aliases before calling it missing: InformAI, Inc. | Verify source before editing |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.informai.com; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: RadOncAI FDA 510k clearance peer-reviewed (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Shallow single-pass check only for RadOncAI; did not run full Europe PMC/Crossref alias-gated query matrix as done in prior HAIR waves.
- Search: "RadOncAI" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22RadOncAI%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### airato-ratoai

- **Name**: RatoAI
- **Company**: AiRato, Inc.
- **Category**: Treatment Planning → secondary: Auto-Contouring
- **Current effective scores**: E0 / L1c / R1 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-09-26; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidence[]/evidenceRigorNotes | info | Existing evidence base for RatoAI (regulatory clearance + evidence[] list) is consistent with its stated evidenceRigor; no additional product-naming peer-reviewed study or contradicting regulatory record was found in this pass. | None required; re-check at next sweep, especially RadOncAI and RatoAI which are very recent (2026) clearances with no peer-reviewed literature yet (E0 correctly conservative). |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | company | warn | Company label does not exactly match registry; check legal-name aliases before calling it missing: AiRato, Inc. | Verify source before editing |

#### Re-scoring proposal

- Proposed: E0 / L1c / R1 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://airato.jp/en/product/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: RatoAI FDA 510k clearance peer-reviewed (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Shallow single-pass check only for RatoAI; did not run full Europe PMC/Crossref alias-gated query matrix as done in prior HAIR waves.
- Search: "RatoAI" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22RatoAI%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### philips-precise-image

- **Name**: Precise Image
- **Company**: Philips
- **Category**: Reconstruction → secondary: Image Enhancement
- **Current effective scores**: E1 / L3 / R3 (efficacy provisional)
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | certification | warn | Structured FDA clearance absent from certification summary | Verify source before editing |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | aggregate | warn | Stored E1/L2 vs effective E1/L3; do not promote provisional papers mechanically | Verify source before editing |
| Evidence | keyPapers | warn | 1 provisional paper scores require source retrieval | Verify source before editing |
| Evidence | evidence[].doi (10.21037/jmai-2025-173) | info | DOI 10.21037/jmai-2025-173 resolves correctly via Crossref to 'Deep learning precise image reconstruction algorithm for abdominal CT: impact on image quality and radiation dose reduction—a model validation study' by Xiaojing Liu et al., Journal of Medical Artificial Intelligence, published 2026-04 (online ahead 2025-07-28 per journal site article ID jmai-24-10776). The inventory record's DOI, title, authors ('Liu Y et al.' vs actual first author Xiaojing Liu), journal and year are all directionally correct — the DOI is NOT invalid as a prior sweep may have flagged. | No fix required for the DOI itself; keep 10.21037/jmai-2025-173. Optionally correct 'Liu Y et al.' to 'Liu X et al.' to match the actual first author (Xiaojing Liu) and add full author list (Liu, Ning, Liao, Gui, Wu, Lei) for precision. |
| Evidence | evidence[].doi — publisher internal article ID confusion | warn | 'jmai-24-10776' is not a second DOI or an alternate/competing identifier for a different paper — it is AME Publishing's internal manuscript/article slug for the SAME article (URL https://jmai.amegroups.org/article/view/10776/html), assigned when the paper was received in 2024 (hence the '24' prefix) and later published with DOI suffix 'jmai-2025-173' reflecting the 2025 acceptance/publication-year numbering convention AME uses. It is not a registered Crossref DOI on its own (10.21037/jmai-24-10776 returns no Crossref record) and should not be treated as 'the real DOI' replacing jmai-2025-173. | Keep DOI as 10.21037/jmai-2025-173 (Crossref-registered, resolves, metadata matches). Do not substitute jmai-24-10776; it is only a publisher URL slug, not a citable DOI. |
| Evidence | rescoring | warn | Exact DOI resolves in Crossref to the named Liu model-validation study; do not replace it with an unrelated search-result DOI. Obtain publisher full text to confirm patient count/year/affiliations and finalize its provisional score. The available record describes image-quality/dose endpoints, not measured human workflow. L2 proposal conditional on full-text verification; E1 and R unchanged. | Separate correction pass; reviewer-check source attribution and score notes first |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: Exact DOI resolves in Crossref to the named Liu model-validation study; do not replace it with an unrelated search-result DOI. Obtain publisher full text to confirm patient count/year/affiliations and finalize its provisional score. The available record describes image-quality/dose endpoints, not measured human workflow. L2 proposal conditional on full-text verification; E1 and R unchanged.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.philips.com/healthcare/technology/ct-smart-workflow; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Impact of an artificial intelligence deep-learning reconstruction algorithm for CT on image quality and potential dose reduction: A phantom study.: https://doi.org/10.1002/mp.15807 (abstract retrieved; retrieved 2026-10-15).
- Improved image quality and dose reduction in abdominal CT with deep-learning reconstruction algorithm: a phantom study.: https://doi.org/10.1007/s00330-022-09003-y (abstract retrieved; retrieved 2026-10-15).
- "Image quality evaluation of the Precise image CT deep learning reconstruction algorithm compared to Filtered Back-projection and iDose<sup>4</sup>: a phantom study at different dose levels".: https://doi.org/10.1016/j.ejmp.2022.102517 (abstract retrieved; retrieved 2026-10-15).
- Comparison of image quality between Deep learning image reconstruction and Iterative reconstruction technique for CT Brain- a pilot study.: https://doi.org/10.12688/f1000research.150773.1 (abstract retrieved; retrieved 2026-10-15).
- Quantitative Evaluation of Low-Dose CT Image Quality Using Deep Learning Reconstruction: A Comparative Study of Philips Precise Image and GE TrueFidelity.: https://doi.org/10.3390/jimaging11090317 (abstract retrieved; retrieved 2026-10-15).
- Deep learning precise image reconstruction algorithm for abdominal CT: impact on image quality and radiation dose reduction—a model validation study: https://doi.org/10.21037/jmai-2025-173 (metadata only; retrieved 2026-10-15).
- Search: Crossref API lookup 10.21037/jmai-2025-173 (2026-10-15) — https://api.crossref.org/works/10.21037/jmai-2025-173
- Search: jmai-24-10776 (alternate/legacy article ID check) (2026-10-15) — https://jmai.amegroups.org/article/view/10776/html
- Search: Crossref API lookup 10.21037/jmai-24-10776 (not a valid DOI) (2026-10-15) — https://api.crossref.org/works/10.21037/jmai-24-10776
- Limits: Checked only the specific DOI flagged by audit metadata; the other 4 evidence[] entries for this product (Greffier, Barca, Chandran, Shim) were not independently re-verified in this pass.

#### New-source / product leads (not admitted or scored)

- Deep learning precise image reconstruction algorithm for abdominal CT: impact on image quality and radiation dose reduction—a model validation study: https://doi.org/10.21037/jmai-2025-173. Philips Precise Image (Philips Clinical Science co-author S. Gui); vendor-affiliated single-center Chinese study (Wuhan Union Hospital) verified_valid
- Search: "Precise Image" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Precise%20Image%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Application of Deep Learning Algorithm-Based Image Reconstruction in Improving Abdominal CT Image Quality in Adrenal and Renal Lesions Detection.: https://doi.org/10.1155/rrp/2214739. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Performance of Commercial Deep Learning-Based Radiation Dose Optimization Software in Pediatric Radiology: A Systematic Review.: https://doi.org/10.3390/children13091147. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Evaluation of image quality between hybrid iterative reconstruction and deep learning reconstruction in low dose abdominopelvic CT in low body mass index individuals.: https://doi.org/10.1038/s41598-026-52554-z. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep learning image reconstruction technique for improving image quality and radiation dose reduction compared to iterative reconstruction technique in non-contrast CT head imaging.: https://doi.org/10.3389/fradi.2026.1824489. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep Learning Reconstruction versus Hybrid Iterative Reconstruction for Spectral CT: A Multi-Institutional Image Quality Assessment: https://doi.org/10.64898/2026.09.10.26362104. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### philips-smartspeed

- **Name**: SmartSpeed
- **Company**: Philips
- **Category**: Reconstruction
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | No vendor/literature contradiction identified in this pass; K213583/K223442 pairing with product codes LNH/LNI and the 'no clinical study required' SE rationale is internally consistent and matches typical MR reconstruction 510(k) patterns. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.usa.philips.com/healthcare/technology/smartspeed-ai; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Impact of Emerging Deep Learning-Based MR Image Reconstruction Algorithms on Abdominal MRI Radiomic Features.: https://doi.org/10.1097/rct.0000000000001648 (abstract retrieved; retrieved 2026-10-15).
- Is a 3-Minute Knee MRI Protocol Sufficient for Daily Clinical Practice? A SuperResolution Reconstruction Approach Using AI and Compressed Sensing.: https://doi.org/10.3390/diagnostics15101206 (abstract retrieved; retrieved 2026-10-15).
- Deep learning-based acceleration of muscle water T2 mapping in patients with neuromuscular diseases by more than 50% - translating quantitative MRI from research to clinical routine.: https://doi.org/10.1371/journal.pone.0318599 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: philips-smartspeed regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "SmartSpeed" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SmartSpeed%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Deep Learning–Based SmartSpeed Precise DWI for Hepatocellular Carcinoma: Comparison with Conventional DWI: https://doi.org/10.21203/rs.3.rs-9442562/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Effects of unilateral vs. bilateral flywheel-based complex training on change-of-direction and sprint performance in elite male volleyball players.: https://doi.org/10.3389/fphys.2026.1786449. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Comparative effects of short- and long-distance sprint training on speed, change-of-direction ability, and intermittent aerobic endurance in collegiate basketball players.: https://doi.org/10.3389/fphys.2026.1911961. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- The Acute Effects of Hill Sprinting on Acceleration Kinematics of Subelite GAA Players.: https://doi.org/10.1519/jsc.0000000000005242. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Impact of Vitamin D Status on Speed, Power, and Sport-Specific Skills in Young Soccer Players Living Above 55° North Latitude.: https://doi.org/10.11005/jbm.26.022. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### philips-smartspeed-precise

- **Name**: SmartSpeed Precise
- **Company**: Philips
- **Category**: Reconstruction
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K251397 (2025-06-04) and 'not yet CE marked' note are internally consistent with the July 2025 vendor press release citation already in the record. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.philips.com/a-w/about/news/archive/standard/news/articles/2025/philips-advances-mri-speed-and-precision-with-fda-510k-clearance-of-smartspeed-precise-dual-ai-software.html; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Inventory cross-check: philips-smartspeed-precise regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "SmartSpeed Precise" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SmartSpeed%20Precise%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Deep Learning–Based SmartSpeed Precise DWI for Hepatocellular Carcinoma: Comparison with Conventional DWI: https://doi.org/10.21203/rs.3.rs-9442562/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Artificial intelligence revolution in shoulder magnetic resonance imaging: current evidence and future directions for rotator cuff diagnosis.: https://doi.org/10.5397/cise.2025.00990. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep learning improves image quality in motion-robust and sedation-free pediatric brain MRI.: https://doi.org/10.1007/s00330-026-12482-y. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep Learning-accelerated MRI in Body and Chest.: https://doi.org/10.1097/rct.0000000000001762. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### philips-petct-adaptive-reconstruction

- **Name**: PET/CT Adaptive Reconstruction
- **Company**: Philips
- **Category**: Reconstruction
- **Current effective scores**: E0 / L2 / R3 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | Record already flags itself (E0, ce: null, notes acknowledging no dedicated standalone 510(k) trade name was found) — this is an honest self-reported gap rather than a factual error. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.philips.com/healthcare/solutions/pet-ct; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Inventory cross-check: philips-petct-adaptive-reconstruction regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "PET/CT Adaptive Reconstruction" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22PET%2FCT%20Adaptive%20Reconstruction%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### ge-air-recon-dl

- **Name**: AIR Recon DL
- **Company**: GE Healthcare
- **Category**: Reconstruction
- **Current effective scores**: E2 / L3 / R4
- **Stored scores**: E2 / L3
- **Last revised**: 2026-06-15; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | Three-clearance chain (K193282 → K213717 → K252379) with LNH/LNI/MOS product codes is consistent with GE's documented SIGNA Premier → PROPELLER → Phase Correction expansion history. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R4 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/products/magnetic-resonance-imaging/air-recon-dl; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Impact of Deep Learning-Based Reconstruction on the Accuracy and Precision of Cardiac Tissue Characterization.: https://doi.org/10.3390/diagnostics16020348 (abstract retrieved; retrieved 2026-10-15).
- Deep learning reconstruction for improving image quality of pediatric abdomen MRI using a 3D T1 fast spoiled gradient echo acquisition.: https://doi.org/10.1007/s00247-025-06313-3 (abstract retrieved; retrieved 2026-10-15).
- Comparison of image quality and lesion conspicuity between conventional and deep learning reconstruction in gadoxetic acid-enhanced liver MRI.: https://doi.org/10.1186/s13244-024-01825-2 (abstract retrieved; retrieved 2026-10-15).
- Impact of Deep Learning Image Reconstruction Methods on MRI Throughput.: https://doi.org/10.1148/ryai.230181 (abstract retrieved; retrieved 2026-10-15).
- The scientific evidence of commercial AI products for MRI acceleration: a systematic review.: https://doi.org/10.1007/s00330-025-11423-5 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: ge-air-recon-dl regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "AIR Recon DL" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AIR%20Recon%20DL%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Image quality evaluation of neonatal brain magnetic resonance imaging using a deep learning reconstruction algorithm: A quantitative and multireader study using variable denoising levels at 3 tesla.: https://doi.org/10.25259/jcis_32_2026. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Reproducibility and discriminative power of MRI liver radiomics: Impact of deep learning-based image reconstruction.: https://doi.org/10.1016/j.ejrad.2026.113140. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- DL-based Highly-Accelerated Hepatobiliary-Phase Gadoxetate-Enhanced MRI ; Preliminary Experience: https://doi.org/10.21203/rs.3.rs-10081506/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Denoising strategies for higher resolution Q-space trajectory imaging with limited scanner hardware.: https://doi.org/10.1007/s10334-026-01372-5. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Improved prostate diffusion imaging using deep learning denoising and phase correction with ultra-high-density coil array.: https://doi.org/10.1093/radadv/umag019. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### ge-truefidelity

- **Name**: TrueFidelity
- **Company**: GE Healthcare
- **Category**: Reconstruction
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K183202 (2019-04-19), product code JAK, regulation 892.1750 — matches Canon AiCE CT's identical classification, consistent with both being CT reconstruction algorithms under the same FDA regulation. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/products/computed-tomography/ct-technologies/truefidelity; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Evaluation of deep-learning image reconstruction for chest CT examinations at two different dose levels.: https://doi.org/10.1002/acm2.13871 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: ge-truefidelity regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "TrueFidelity" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22TrueFidelity%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Performance of Commercial Deep Learning-Based Radiation Dose Optimization Software in Pediatric Radiology: A Systematic Review.: https://doi.org/10.3390/children13091147. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Assessing the influence of kernel selection on chest computed tomography image quality across varying dose levels using TrueFidelity reconstruction.: https://doi.org/10.1093/rpd/ncaf143. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Feasibility of deep learning-based image reconstruction using TrueFidelity for coronary calcium scoring.: https://doi.org/10.1371/journal.pone.0358342. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Nonprewhitening model observers in the Fourier and spatial domain: a comparison of predictions for iterative and deep learning reconstruction in computed tomography.: https://doi.org/10.1093/rpd/ncaf160. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Quantitative comparison of 68-keV monoenergetic, routine-dose, and low-dose 120-kVp CT for calcium-mimicking inserts in thoracic phantoms: effects of phantom size and reconstruction method.: https://doi.org/10.1186/s41747-026-00818-8. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### siemens-deep-resolve

- **Name**: Deep Resolve
- **Company**: Siemens Healthineers
- **Category**: Reconstruction
- **Current effective scores**: E2 / L3 / R4
- **Stored scores**: E2 / L3
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | Multiple clearance numbers (K213693/K232322/K250436/K251822) spanning 2022–2025 across different MAGNETOM platforms is plausible for an evolving reconstruction suite but was not independently re-verified against openFDA in this pass. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R4 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.siemens-healthineers.com/magnetic-resonance-imaging/technologies-and-innovations/deep-resolve; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Deep Resolve Boost in 2D MRI for Neuroradiology: A Comparative Evaluation of Diagnostic Gains and Potential Risks.: https://doi.org/10.3174/ajnr.a9081 (abstract retrieved; retrieved 2026-10-15).
- Deep Learning Reconstruction Combined With Conventional Acceleration Improves Image Quality of 3 T Brain MRI and Does Not Impact Quantitative Diffusion Metrics.: https://doi.org/10.1097/rli.0000000000001158 (abstract retrieved; retrieved 2026-10-15).
- Image quality of whole-body diffusion MR images comparing deep-learning accelerated and conventional sequences.: https://doi.org/10.1007/s00330-024-10883-5 (abstract retrieved; retrieved 2026-10-15).
- Deep learning MRI halves scan time and preserves image quality across routine neuroradiologic examinations.: https://doi.org/10.1093/radadv/umaf029 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: siemens-deep-resolve regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; Clearance chain not independently re-verified via openFDA in this review cycle.
- Search: "Deep Resolve" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Deep%20Resolve%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Deep Learning Reconstruction in Pediatric Knee MRI: Evaluation of Image Quality, Reader Preference, and Acquisition Time: https://doi.org/10.21203/rs.3.rs-10886959/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Automated Brain Segmentation in Accelerated T2-Weighted MRI: Effects of Deep Learning-Based Reconstruction: https://doi.org/10.64898/2026.09.08.26362537. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- How deep resolve affects the stability of texture features for different MR image acceleration methods - a phantom and a human brain study.: https://doi.org/10.1186/s12880-026-02317-z. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Insights into Accelerated MRI Protocols for Pediatric Brain Assessment in Emergency Cases.: https://doi.org/10.3390/diagnostics16050681. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### canon-aice-ct

- **Name**: AiCE CT
- **Company**: Canon Medical Systems
- **Category**: Reconstruction
- **Current effective scores**: E2 / L2 / R3
- **Stored scores**: E2 / L2
- **Last revised**: 2026-06-16; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K181862 (2019-01-15), JAK/892.1750 consistent with GE TrueFidelity's identical classification (both CT deep-learning reconstruction predicates in the same family). | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://global.medical.canon/products/computed-tomography/aice; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Image Quality and Lesion Detection on Deep Learning Reconstruction and Iterative Reconstruction of Submillisievert Chest and Abdominal CT.: https://doi.org/10.2214/ajr.19.21809 (abstract retrieved; retrieved 2026-10-15).
- Validation of deep learning-based CT image reconstruction for treatment planning.: https://doi.org/10.1038/s41598-023-42775-x (abstract retrieved; retrieved 2026-10-15).
- Deep learning reconstruction allows low-dose imaging while maintaining image quality: comparison of deep learning reconstruction and hybrid iterative reconstruction in contrast-enhanced abdominal CT.: https://doi.org/10.21037/qims-21-1216 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: canon-aice-ct regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "AiCE CT" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AiCE%20CT%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### canon-aice-mr

- **Name**: AiCE MR
- **Company**: Canon Medical Systems
- **Category**: Reconstruction
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-06-13; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K192574 (2019-12-20), LNH/892.1000 is consistent with MR reconstruction product-code conventions used elsewhere in this inventory (Philips SmartSpeed, Siemens Deep Resolve). | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://global.medical.canon/products/magnetic-resonance/aice; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Acceleration of knee magnetic resonance imaging using a combination of compressed sensing and commercially available deep learning reconstruction: a preliminary study.: https://doi.org/10.1186/s12880-023-00962-2 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: canon-aice-mr regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "AiCE MR" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AiCE%20MR%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### canon-piqe

- **Name**: PIQE (Precise IQ Engine)
- **Company**: Canon Medical Systems
- **Category**: Reconstruction
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-06-13; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K243335 (2025-01-07), LNH/892.1000 consistent with the MR reconstruction product-code pattern. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://global.medical.canon/products/magnetic-resonance/piqe; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Phantom-based performance comparison of two commercial deep learning CT reconstruction algorithms with super- and normal-resolution settings.: https://doi.org/10.1186/s41747-025-00670-2 (abstract retrieved; retrieved 2026-10-15).
- Super-resolution deep-learning reconstruction with 1024 matrix improves CT image quality for pancreatic ductal adenocarcinoma assessment.: https://doi.org/10.1016/j.ejrad.2025.111953 (abstract retrieved; retrieved 2026-10-15).
- Advances in spatial resolution and radiation dose reduction using super-resolution deep learning-based reconstruction for abdominal computed tomography: A phantom study.: https://doi.org/10.1016/j.acra.2024.09.012 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: canon-piqe regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "PIQE Precise IQ Engine" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22PIQE%20Precise%20IQ%20Engine%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Cardiac CT in the era of artificial intelligence: precision imaging, treatment guidance and optimised risk stratification for coronary artery disease.: https://doi.org/10.1136/openhrt-2025-003505. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Diagnostic value of a second-generation super-resolution deep learning-based reconstruction combined with a metal artifact reduction algorithm for pelvic CT.: https://doi.org/10.1007/s00256-025-05080-4. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Impact of contrast enhancement boost and super-resolution deep learning reconstruction on pediatric congenital heart disease CTA scans: ultra-low contrast dose.: https://doi.org/10.1186/s12880-025-02015-2. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Photon-counting detector computed tomography in thoracic oncology: revolutionizing tumor imaging through precision and detail.: https://doi.org/10.4274/dir.2025.253550. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### united-uai-vision-recon

- **Name**: uAIFI
- **Company**: United Imaging
- **Category**: Reconstruction
- **Current effective scores**: E1 / L1c / R2
- **Stored scores**: E1 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Regulatory | certification | warn | Structured FDA clearance absent from certification summary | Verify source before editing |
| Regulatory | regulatory.fda / evidence (general) | info | Record acknowledges clearance is bundled within whole-system CT clearances (e.g., K241166) rather than a dedicated feature-level 510(k); this self-disclosed limitation is reasonable for an embedded OEM reconstruction feature. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.united-imaging.com/en/products/ct; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Fast and low-dose medical imaging generation empowered by hybrid deep-learning and iterative reconstruction.: https://doi.org/10.1016/j.xcrm.2023.101119 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: united-uai-vision-recon regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; Specific K-number for the uAIFI reconstruction feature itself (vs. the host CT system) not independently confirmed.
- Search: "uAIFI" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22uAIFI%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 3 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Accelerating brain T2-weighted imaging using artificial intelligence-assisted compressed sensing combined with deep learning-based reconstruction: a feasibility study at 5.0T MRI.: https://doi.org/10.1186/s12880-025-01763-5. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Cerebral flow estimated from 3D pCASL for prediction of intraoperative blood loss in non-embolized meningiomas: a feasibility study.: https://doi.org/10.21037/qims-24-2326. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Recent trends in scientific research in chest radiology: What to do or not to do? That is the critical question in research.: https://doi.org/10.1007/s11604-025-01735-3. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### united-uaifi-umr

- **Name**: uAIFI on uMR
- **Company**: United Imaging
- **Category**: Reconstruction
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Regulatory | certification | warn | Structured FDA clearance absent from certification summary | Verify source before editing |
| Regulatory | regulatory.fda / evidence (general) | info | Same embedded-feature pattern as uAI Vision Recon; E0 rigor appropriately reflects the lack of a dedicated, independently verifiable clearance or publication. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://eu.united-imaging.com/en/product-service/products/mr/uaifi-technology; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Inventory cross-check: united-uaifi-umr regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; Specific K-number for feature-level clearance not independently confirmed.
- Search: "uAIFI on uMR" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22uAIFI%20on%20uMR%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### united-hd-tof

- **Name**: HD TOF 2.0
- **Company**: United Imaging
- **Category**: Reconstruction
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Regulatory | certification | warn | Structured FDA clearance absent from certification summary | Verify source before editing |
| Regulatory | regulatory.fda / evidence (general) | info | Same embedded-feature pattern (PET/CT and PET/MR system-level clearance bundling); E0 rigor appropriately conservative. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.united-imaging.com/en/products/molecular-imaging; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Inventory cross-check: united-hd-tof regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; Specific K-number for feature-level clearance not independently confirmed.
- Search: "HD TOF 2.0" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22HD%20TOF%202.0%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### elekta-iris

- **Name**: IRIS Evo
- **Company**: Elekta
- **Category**: Reconstruction
- **Current effective scores**: E1 / L3 / R3 (efficacy provisional)
- **Stored scores**: E1 / L3
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Regulatory | regulatory.fda.notes / regulatory.fda.decisionDate (K-number) | warn | The actual 510(k) number IS now published: K252188, 'EMLA (Elekta Evo); EMLA (VersaHD); EMLA (Elekta Harmony Pro); EMLA (Elekta Infintiy); EMLA (Elekta Harmony); EMLA (Elekta Synergy)', applicant Elekta Solutions AB, decision date 2026-01-15 (Substantially Equivalent, product code IYE, regulation 21 CFR 892.5050, device class II). Innolitics' FDA AI/ML performance extract for K252188 explicitly lists an 'CBCT Image Reconstruction' algorithm ('Iterative reconstruction method using ordered subset and steepest descent') validated on 124 clinical datasets + 13 clinical patient CBCT projection datasets — this is the Iris reconstruction module bundled inside the whole-system EMLA linac clearance. The inventory's note 'K-number not yet published in FDA database as of Feb 2026' is now stale/incorrect, and the recorded decisionDate '2026-01-16' is off by one day versus FDA's official decision date of 2026-01-15 (2026-01-16 is the date of Elekta's press release announcing the clearance, not the FDA decision date). | Update regulatory.fda.clearanceNumber to 'K252188', decisionDate to '2026-01-15', and regulation/product code to 892.5050 / IYE (whole linac system clearance; Iris is a bundled CBCT reconstruction feature, not separately coded). Revise the notes field to remove the 'not yet published' language and instead state that Iris is cleared as the CBCT image-reconstruction feature within the EMLA (Elekta Evo/VersaHD/Harmony/Harmony Pro/Infinity/Synergy) 510(k), citing the Innolitics AI/ML performance table (124 clinical datasets, 13 patient CBCT projection datasets, iterative OS-SD algorithm). |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | keyPapers | warn | E1 claimed without scored attributable peer-reviewed papers | Verify source before editing |
| Evidence | evidenceRigor (E1) vs evidenceRigorNotes narrative (concludes 'E0 stands') | warn | Internal inconsistency: the top-level field evidenceRigor is set to 'E1', but the attached evidenceRigorNotes narrative concludes a Wave 5B investigation of three candidate iterative-CBCT publications by stating 'Neither vendor is named in the abstracts, so they cannot be attributed to IRIS Evo. E0 stands.' This reads as though the resolved/intended grade is E0 (vendor claims only, no attributable independent evidence), while the machine-readable evidenceRigor field was left at E1. The FDA AI/ML performance table for K252188 does show an internal validation on clinical data (124+13 datasets), which is sponsor-run V&V, not independent peer-reviewed evidence — consistent with an E0/E1 boundary call needing an explicit, unambiguous decision rather than a self-contradicting field+note pair. | Resolve the contradiction: either (a) set evidenceRigor to 'E0' to match the notes' explicit conclusion ('E0 stands'), since no independent peer-reviewed publication was attributable to IRIS Evo, or (b) if E1 is intentionally retained on the basis of the newly-identified FDA 510(k) sponsor V&V data (124 clinical + 13 patient CBCT datasets), rewrite evidenceRigorNotes to justify E1 explicitly rather than ending on an 'E0 stands' conclusion that contradicts the field value. Pick one and make field and narrative consistent. |
| Evidence | clinicalEvidence / limitations — FDA sponsor V&V dataset now available | warn | Prior record states 'Validation evidence is currently limited to vendor brochures and press releases' and 'results': 'Not publicly disclosed'. The Innolitics AI/ML extract of K252188 now provides at least summary-level sponsor V&V detail (124 clinical image sets + 13 patient CBCT projection datasets, >1 reader) that was not reflected in the record. | Add this sponsor V&V detail to evaluationData.description/results, while still flagging it as non-independent, sponsor-run verification (not a peer-reviewed clinical study). |
| Evidence | rescoring | warn | No attributable peer-reviewed study confirmed in this targeted pass; existing E1 contradicts its own E0/no-publication explanation. FDA/system validation and vendor performance claims alone support E0. Proposed L1c is descriptive/provisional, not measured clinical benefit; R unchanged for separate qualitative review. | Separate correction pass; reviewer-check source attribution and score notes first |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R3 (not applied)
- Rationale: No attributable peer-reviewed study confirmed in this targeted pass; existing E1 contradicts its own E0/no-publication explanation. FDA/system validation and vendor performance claims alone support E0. Proposed L1c is descriptive/provisional, not measured clinical benefit; R unchanged for separate qualitative review.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.elekta.com/products/radiation-therapy/elekta-evo/do-it-all; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: openFDA 510(k) search applicant:Elekta sort by decision_date desc (2026-10-15) — https://api.fda.gov/device/510k.json?search=applicant:%22Elekta%22&sort=decision_date:desc&limit=10
- Search: openFDA 510(k) lookup K252188 (2026-10-15) — https://api.fda.gov/device/510k.json?search=k_number:K252188
- Search: FDA 510(k) database record K252188 (PMN lookup) (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252188
- Search: Innolitics FDA AI/ML device page for K252188 (CBCT reconstruction performance data) (2026-10-15) — https://fda.innolitics.com/device/K252188
- Search: Elekta press release — FDA 510(k) clearance for Elekta Evo linear accelerator (2026-10-15) — https://ir.elekta.com/investors/press-releases/2026/elekta-receives-fda-510k-clearance-for-elekta-evo-linear-accelerator/
- Limits: Could not access the full K252188 510(k) summary PDF directly (FDA site returned HTTP 302/empty); findings rely on openFDA structured data, the FDA PMN database page, and the Innolitics AI/ML extract, which are consistent with each other but were not cross-checked against the primary summary PDF text.
- Search: "IRIS Evo" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22IRIS%20Evo%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### ge-precision-dl

- **Name**: Precision DL
- **Company**: GE Healthcare
- **Category**: Image Enhancement
- **Current effective scores**: E2 / L2 / R3
- **Stored scores**: E2 / L2
- **Last revised**: 2026-06-17; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K223212 (2023-05-22), product code MYN, regulation 892.2050 is a plausible nuclear-medicine/SPECT reconstruction classification distinct from the CT/MR codes used elsewhere; not independently re-verified. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/en-us/products/molecular-imaging/pet-ct/omni-legend; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Deep learning-based time-of-flight (ToF) image enhancement of non-ToF PET scans.: https://doi.org/10.1007/s00259-022-05824-7 (abstract retrieved; retrieved 2026-10-15).
- Deep learning-based time-of-flight (ToF) enhancement of non-ToF PET scans for different radiotracers.: https://doi.org/10.1007/s00259-025-07119-z (abstract retrieved; retrieved 2026-10-15).
- Effects of a deep learning-based image quality enhancement method on a digital-BGO PET/CT system for &lt;sup&gt;18&lt;/sup&gt;F-FDG whole-body examination.: https://doi.org/10.1186/s40658-025-00742-7 (abstract retrieved; retrieved 2026-10-15).
- Assessing the deep learning based image quality enhancements for the BGO based GE omni legend PET/CT.: https://doi.org/10.1186/s40658-024-00688-2 (abstract retrieved; retrieved 2026-10-15).
- Deep learning-enhanced digital-BGO versus TOF PET/CT: comparative assessment of detection, quantitation, and overall image quality.: https://doi.org/10.1186/s40658-025-00814-8 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: ge-precision-dl regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; K223212 not independently re-verified via openFDA in this review cycle.
- Search: "Precision DL" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Precision%20DL%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Impact of Deep Learning-Based Time-of-Flight PET Images of Small Tumors Using a Human Anatomic Phantom.: https://doi.org/10.2967/jnmt.125.270450. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Innovations in clinical PET image reconstruction: advances in Bayesian penalized likelihood algorithm and deep learning.: https://doi.org/10.1007/s12149-025-02088-7. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- A semi-automated algorithm for image analysis of respiratory organoids.: https://doi.org/10.1371/journal.pcbi.1013589. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Enhanced attenuation correction in FDG-PET/CT with respiratory mismatch correction.: https://doi.org/10.1186/s41824-025-00279-z. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### ge-air-recon-dl-enhancement

- **Name**: AIR Recon DL Enhancement Mode
- **Company**: GE Healthcare
- **Category**: Image Enhancement
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-06-16; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.clearanceNumber | warn | 510(k) cleared but structured clearance number missing | Verify source before editing |
| Regulatory | regulatory.fda / evidence (general) | info | Record correctly treats this as a mode within the parent AIR Recon DL clearances (K193282/K213717/K252379) rather than claiming a separate K-number, which is internally consistent. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/products/magnetic-resonance-imaging; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Artificial intelligence based image quality enhancement in liver MRI: a quantitative and qualitative evaluation.: https://doi.org/10.1007/s11547-022-01539-9 (abstract retrieved; retrieved 2026-10-15).
- Impact of AIR™ Recon DL on magnetic resonance imaging-based quantitative brain structure measurements.: https://doi.org/10.1093/psyrad/kkaf036 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: ge-air-recon-dl-enhancement regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "AIR Recon DL Enhancement Mode" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AIR%20Recon%20DL%20Enhancement%20Mode%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### airs-swiftmr

- **Name**: SwiftMR
- **Company**: AIRS Medical
- **Category**: Image Enhancement
- **Current effective scores**: E1 / L2 / R3
- **Stored scores**: E1 / L2
- **Last revised**: 2026-06-15; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | certification | warn | Structured FDA clearance absent from certification summary | Verify source before editing |
| Regulatory | regulatory.fda / evidence (general) | info | K230854 (2023-10-27), LLZ/892.2050 plus a cited 2026-04-15 OEM-interoperability clearance announcement; product code LLZ matches the pattern used for Subtle Medical's MR/PET enhancement products, supporting internal consistency. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://airsmed.com/swiftmr/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Leveraging a vendor-neutral deep learning reconstruction algorithm to reduce scan time and enhance image quality in T2-weighted liver MRI.: https://doi.org/10.1038/s41598-026-60802-5 (abstract retrieved; retrieved 2026-10-15).
- Signal-to-noise ratio improvement in postmortem MRI using deep learning reconstruction (SwiftMR).: https://doi.org/10.1016/j.forsciint.2026.112973 (abstract retrieved; retrieved 2026-10-15).
- The scientific evidence of commercial AI products for MRI acceleration: a systematic review.: https://doi.org/10.1007/s00330-025-11423-5 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: airs-swiftmr regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "SwiftMR" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SwiftMR%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Denoising preclinical MRI with vendor-neutral deep learning-based image reconstruction.: https://doi.org/10.1016/j.jneumeth.2026.110813. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep learning reconstruction enhances 1.5T MR angiography beyond 3T in vascular visualization for Moyamoya disease.: https://doi.org/10.1007/s11604-025-01945-9. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep learning-based image enhancement for improved black blood imaging in brain metastasis.: https://doi.org/10.1007/s00330-025-11920-7. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### subtle-mr

- **Name**: SubtleMR
- **Company**: Subtle Medical
- **Category**: Image Enhancement
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | Multiple clearance numbers (K191688/K203182/K223623) culminating 2023-05-11, LLZ/892.2050, plus an EUDAMED cross-reference with a concrete Basic UDI-DI — this is a stronger-than-average evidentiary trail among the 27 records. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://subtlemedical.com/subtle-mr/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Deep Learning Enables 60% Accelerated Volumetric Brain MRI While Preserving Quantitative Performance: A Prospective, Multicenter, Multireader Trial.: https://doi.org/10.3174/ajnr.a7358 (abstract retrieved; retrieved 2026-10-15).
- Clinical Assessment of Deep Learning-based Super-Resolution for 3D Volumetric Brain MRI.: https://doi.org/10.1148/ryai.210059 (abstract retrieved; retrieved 2026-10-15).
- Deep Learning Image Processing Enables 40% Faster Spinal MR Scans Which Match or Exceed Quality of Standard of Care : A Prospective Multicenter Multireader Study.: https://doi.org/10.1007/s00062-021-01121-2 (abstract retrieved; retrieved 2026-10-15).
- Deep learning reconstruction for lumbar spine MRI acceleration: a prospective study.: https://doi.org/10.1186/s41747-024-00470-0 (abstract retrieved; retrieved 2026-10-15).
- Artificial intelligence solution to accelerate the acquisition of MRI images: Impact on the therapeutic care in oncology in radiology and radiotherapy departments.: https://doi.org/10.1016/j.canrad.2023.11.004 (abstract retrieved; retrieved 2026-10-15).
- Impact of Deep Learning Image Reconstruction Methods on MRI Throughput.: https://doi.org/10.1148/ryai.230181 (abstract retrieved; retrieved 2026-10-15).
- The scientific evidence of commercial AI products for MRI acceleration: a systematic review.: https://doi.org/10.1007/s00330-025-11423-5 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: subtle-mr regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "SubtleMR" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SubtleMR%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Comparison of Deep-Learning-Based Reconstruction of Knee MRI with Conventional Sequences in Patients with Knee Pain.: https://doi.org/10.3390/diagnostics16182957. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Overcoming barriers to neurosurgical care with technology and innovation.: https://doi.org/10.1186/s44263-026-00310-w. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Fast MRI Techniques of the Liver and Pancreaticobiliary Tract: Overview and Application.: https://doi.org/10.3348/jksr.2025.0004. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Artificial intelligence in spine care: A scoping review of diagnostic applications.: https://doi.org/10.1371/journal.pone.0352200. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### subtle-pet

- **Name**: SubtlePET
- **Company**: Subtle Medical
- **Category**: Image Enhancement
- **Current effective scores**: E2 / L6 / R3
- **Stored scores**: E2 / L6
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K182336/K211964 (final decision 2021-09-28), LLZ/892.2050, plus EUDAMED Basic UDI-DI cross-reference; internally consistent with subtle-mr's pattern. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L6 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://subtlemedical.com/subtle-pet/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Low-count whole-body PET with deep learning in a multicenter and externally validated study.: https://doi.org/10.1038/s41746-021-00497-2 (abstract retrieved; retrieved 2026-10-15).
- Artificial intelligence-based PET denoising could allow a two-fold reduction in [<sup>18</sup>F]FDG PET acquisition time in digital PET/CT.: https://doi.org/10.1007/s00259-022-05800-1 (abstract retrieved; retrieved 2026-10-15).
- Deep Learning Denoising Improves and Homogenizes Patient [<sup>18</sup>F]FDG PET Image Quality in Digital PET/CT.: https://doi.org/10.3390/diagnostics13091626 (abstract retrieved; retrieved 2026-10-15).
- Clinical and phantom validation of a deep learning based denoising algorithm for F-18-FDG PET images from lower detection counting in comparison with the standard acquisition.: https://doi.org/10.1186/s40658-022-00465-z (abstract retrieved; retrieved 2026-10-15).
- Artificial intelligence for reduced dose 18F-FDG PET examinations: a real-world deployment through a standardized framework and business case assessment.: https://doi.org/10.1186/s40658-021-00374-7 (abstract retrieved; retrieved 2026-10-15).
- Imaging quality of an artificial intelligence denoising algorithm: validation in <sup>68</sup>Ga PSMA-11 PET for patients with biochemical recurrence of prostate cancer.: https://doi.org/10.1186/s13550-023-00999-y (abstract retrieved; retrieved 2026-10-15).
- Implantation of an Artificial Intelligence Denoising Algorithm Using SubtlePET™ with Various Radiotracers: 18F-FDG, 68Ga PSMA-11 and 18F-FDOPA, Impact on the Technologist Radiation Doses.: https://doi.org/10.3390/jimaging11070234 (abstract retrieved; retrieved 2026-10-15).
- Clinical value of artificial intelligence in reducing PET image acquisition time: routine clinical validation using qualitative, quantitative, and radiomic analysis on a cohort of 282 patients undergoing [&lt;sup&gt;18&lt;/sup&gt;F]FDG and [&lt;sup&gt;68&lt;/sup&gt;Ga]Ga-PSMA-11 PET/CT.: https://doi.org/10.1186/s40658-026-00835-x (abstract retrieved; retrieved 2026-10-15).
- Performance of a deep learning enhancement method applied to PET images acquired with a reduced acquisition time.: https://doi.org/10.5603/nmr.94482 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: subtle-pet regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "SubtlePET" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SubtlePET%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Evaluation of PET/CT Artificial Intelligence Image Reconstructions VS Harmonized Clinical Reconstruction.: https://doi.org/10.1016/j.zemedi.2026.06.002. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Dual-branch residual encoder-decoder convolutional neural network (DB-REDCNN): a computed tomography-integrated multimodal network for positron emission tomography denoising.: https://doi.org/10.21037/qims-2025-1321. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Innovations in clinical PET image reconstruction: advances in Bayesian penalized likelihood algorithm and deep learning.: https://doi.org/10.1007/s12149-025-02088-7. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### subtle-hd-pet

- **Name**: SubtleHD(PET)
- **Company**: Subtle Medical
- **Category**: Image Enhancement
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda.productCode / regulatory.fda.regulationNumber | warn | openFDA's authoritative record for K254013 (applicant: Subtle Medical, Inc.; device name: 'SubtleHD-PET (1.x)'; decision date 2026-05-14, Substantially Equivalent) lists product_code='LLZ' and regulation_number is NOT populated/returned as '892.1200' — the device classification panel is Radiology with no 21 CFR 892.1200 mapping returned by openFDA for this record. The inventory instead lists productCode 'KPS' and regulationNumber '21 CFR 892.1200'. KPS/892.1200 is the product code/regulation used elsewhere in this same inventory for Philips PET/CT Adaptive Reconstruction (K211764) — i.e. these values appear to have been copied from a different Subtle/competitor PET record rather than looked up for K254013 specifically. LLZ is the code Subtle Medical uses consistently across SubtleMR, SubtlePET and AiMIFY in this same inventory, which is internally consistent with K254013 also being LLZ. | Correct regulatory.fda.productCode to 'LLZ' and remove/replace the unsupported regulationNumber '21 CFR 892.1200' (or confirm against the underlying CFR regulation for LLZ, which is typically listed as 892.2050 for this device family in other Subtle Medical products in the inventory) based on the actual K254013 510(k) summary, not an assumed cross-reference to KPS/892.1200. |
| Regulatory | regulatory.fda.clearanceNumber / decisionDate | info | K254013 decision date 2026-05-14 and device name 'SubtleHD-PET (1.x)' are confirmed correct per openFDA. | No change needed to clearanceNumber or decisionDate. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://subtlemedical.com/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: openFDA 510(k) lookup K254013 (2026-10-15) — https://api.fda.gov/device/510k.json?search=k_number:K254013
- Search: FDA 510(k) summary PDF K254013 (2026-10-15) — https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf
- Limits: Did not independently verify the CE 'under_review' status or the PRNewswire/Diagnostic Imaging training-data citations beyond the FDA regulatory fields explicitly flagged for audit.
- Search: "SubtleHD PET" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SubtleHD%20PET%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### subtle-aimify

- **Name**: AiMIFY
- **Company**: Subtle Medical
- **Category**: Image Enhancement
- **Current effective scores**: E2 / L2 / R3
- **Stored scores**: E2 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K240290 (2024-08-21), LLZ/892.2050 is consistent with the Subtle Medical LLZ pattern confirmed for subtle-mr/subtle-pet, and by contrast makes the subtle-hd-pet KPS/892.1200 values look more clearly anomalous. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://subtlemedical.com/aimify/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Evaluation of an AI-powered tool in improving lesion visualization on standard-dose contrast-enhanced brain MRI: a retrospective, multicenter study.: https://doi.org/10.3174/ajnr.a9591 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: subtle-aimify regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "AiMIFY" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AiMIFY%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 4 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Artificial intelligence-amplified contrast enhancement in brain magnetic resonance imaging for improving image quality and lesion visualization: a prospective pilot study.: https://doi.org/10.21037/qims-2026-1-0383. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Machine Learning-Enabled Medical Devices Authorized by the US Food and Drug Administration in 2024: Regulatory Characteristics, Predicate Lineage, and Transparency Reporting.: https://doi.org/10.3390/biomedicines13123005. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Gadolinium Pollution-A Future Forward Perspective on Human and Environmental Impact.: https://doi.org/10.1002/mrm.70157. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### subtle-hd

- **Name**: SubtleHD
- **Company**: Subtle Medical
- **Category**: Image Enhancement
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K243250 (2025-02-12) uses product code QIH rather than LLZ — distinct from other Subtle products in this inventory; not independently re-verified against openFDA in this pass, flagged only for awareness alongside the confirmed subtle-hd-pet discrepancy. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://subtlemedical.com/subtle-hd/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Deep Learning-Based Enhancement of Already Diagnostic-Quality MRI for Alzheimer's Disease Classification: Effects on Model Performance and Training Data Requirements.: https://doi.org/10.1002/jmri.70507 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: subtle-hd regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; QIH product code for K243250 not independently re-verified via openFDA in this review cycle; worth confirming given the KPS/LLZ confusion found in the sibling subtle-hd-pet record.
- Search: "SubtleHD" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SubtleHD%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 4 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Editorial for "Deep Learning-Based Enhancement of Already Diagnostic-Quality MRI for Alzheimer's Disease Classification: Effects on Model Performance and Training Data Requirements".: https://doi.org/10.1002/jmri.70501. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Artificial intelligence revolution in shoulder magnetic resonance imaging: current evidence and future directions for rotator cuff diagnosis.: https://doi.org/10.5397/cise.2025.00990. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Implementing generative artificial intelligence in precision oncology: safety, governance, and significance.: https://doi.org/10.1186/s13045-026-01781-y. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### subtle-hd-ct

- **Name**: SubtleHD(CT)
- **Company**: Subtle Medical
- **Category**: Image Enhancement
- **Current effective scores**: E0 / L1c / R2 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K254120 ('2026-05', day not specified) also uses product code QIH matching subtle-hd; not independently re-verified against openFDA in this pass. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://subtlemedical.com/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Inventory cross-check: subtle-hd-ct regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; K254120 exact decision day and QIH product code not independently re-verified via openFDA in this review cycle.
- Search: "SubtleHD CT" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22SubtleHD%20CT%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### algomedica-pixelshine

- **Name**: PixelShine
- **Company**: AlgoMedica
- **Category**: Image Enhancement
- **Current effective scores**: E2 / L3 / R3
- **Stored scores**: E2 / L3
- **Last revised**: 2026-06-14; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K161625 (2016-09-19), LLZ/892.2050, CE under the legacy MDD (not MDR) regime with a named Notified Body (BSI 0086) — appropriately reflects PixelShine's early (2016) clearance predating MDR transition. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E2 / L3 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://algomedica.com/low-radation-ct-scans-algomedica; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Influence of a Deep Learning Noise Reduction on the CT Values, Image Noise and Characterization of Kidney and Ureter Stones.: https://doi.org/10.3390/diagnostics12071627 (abstract retrieved; retrieved 2026-10-15).
- AI Denoising Improves Image Quality and Radiological Workflows in Pediatric Ultra-Low-Dose Thorax Computed Tomography Scans.: https://doi.org/10.3390/tomography8040140 (abstract retrieved; retrieved 2026-10-15).
- Combination of Deep Learning-Based Denoising and Iterative Reconstruction for Ultra-Low-Dose CT of the Chest: Image Quality and Lung-RADS Evaluation.: https://doi.org/10.2214/ajr.19.22680 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: algomedica-pixelshine regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "PixelShine" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22PixelShine%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Evaluation of Low-dose Computed Tomography Images Reconstructed Using Artificial Intelligence-based Adaptive Filtering for Denoising: A Comparison with Computed Tomography Reconstructed with Iterative Reconstruction Algorithm.: https://doi.org/10.4103/jmp.jmp_115_24. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- [Comparison of the Impact of Deep Learning Techniques on Low-noise Head CT Images].: https://doi.org/10.6009/jjrt.25-1537. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Performance of Commercial Deep Learning-Based Radiation Dose Optimization Software in Pediatric Radiology: A Systematic Review.: https://doi.org/10.3390/children13091147. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- AI for image quality and patient safety in CT and MRI.: https://doi.org/10.1186/s41747-025-00562-5. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- AI in Medical Imaging and Image Processing.: https://doi.org/10.3390/jcm14124153. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### claripi-clarict-ai

- **Name**: ClariCT.AI
- **Company**: ClariPi
- **Category**: Image Enhancement
- **Current effective scores**: E3 / L2 / R3
- **Stored scores**: E3 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (500); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | K183460 (2019-06-13) plus K212074 (2021) extension, LLZ/892.2050, with EUDAMED UDI-DI cross-reference; evidenceRigor E3 is the highest in this batch and was not independently re-verified but is plausible given the 10 cited evidence entries. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | warn | 1 provisional paper scores require source retrieval | Verify source before editing |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E3 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://claripi.com/clarict-ai/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Image Quality and Diagnostic Performance of Low-Dose Liver CT with Deep Learning Reconstruction versus Standard-Dose CT.: https://doi.org/10.1148/ryai.230192 (abstract retrieved; retrieved 2026-10-15).
- Diagnostic performance of lumbar spine CT using deep learning denoising to evaluate disc herniation and spinal stenosis.: https://doi.org/10.1007/s00330-025-11742-7 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of a Deep Learning Denoising Algorithm for Dose Reduction in Whole-Body Photon-Counting CT Imaging: A Cadaveric Study.: https://doi.org/10.1016/j.acra.2024.12.052 (abstract retrieved; retrieved 2026-10-15).
- Noise-Optimized CBCT Imaging of Temporomandibular Joints-The Impact of AI on Image Quality.: https://doi.org/10.3390/jcm13051502 (abstract retrieved; retrieved 2026-10-15).
- Accuracy of two deep learning-based reconstruction methods compared with an adaptive statistical iterative reconstruction method for solid and ground-glass nodule volumetry on low-dose and ultra-low-dose chest computed tomography: A phantom study.: https://doi.org/10.1371/journal.pone.0270122 (abstract retrieved; retrieved 2026-10-15).
- Deep Learning Algorithm for Simultaneous Noise Reduction and Edge Sharpening in Low-Dose CT Images: A Pilot Study Using Lumbar Spine CT.: https://doi.org/10.3348/kjr.2021.0140 (abstract retrieved; retrieved 2026-10-15).
- Dose reduction potential of vendor-agnostic deep learning model in comparison with deep learning-based image reconstruction algorithm on CT: a phantom study.: https://doi.org/10.1007/s00330-021-08199-9 (abstract retrieved; retrieved 2026-10-15).
- AntiHalluciNet: A Potential Auditing Tool of the Behavior of Deep Learning Denoising Models in Low-Dose Computed Tomography.: https://doi.org/10.3390/diagnostics14010096 (abstract retrieved; retrieved 2026-10-15).
- Additional Dose Reduction Potential of Vendor-Agnostic Deep Learning Model: A Phantom Study.: https://doi.org/10.3348/jksr.2025.0047 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: claripi-clarict-ai regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.; E3 rigor classification and full evidence list (10 entries) not individually re-verified in this pass.
- Search: "ClariCT.AI" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22ClariCT.AI%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Performance of Commercial Deep Learning-Based Radiation Dose Optimization Software in Pediatric Radiology: A Systematic Review.: https://doi.org/10.3390/children13091147. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Additional Dose Reduction Potential of Vendor-Agnostic Deep Learning Model: A Phantom Study.: https://doi.org/10.3348/jksr.2025.0047. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Enhancing Image Quality in Dental-Maxillofacial CBCT: The Impact of Iterative Reconstruction and AI on Noise Reduction-A Systematic Review.: https://doi.org/10.3390/jcm14124214. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep-learning reconstruction for noncontrast head computed tomography: Improved image quality and potential diagnostic impact in acute ischemic stroke.: https://doi.org/10.1007/s00234-026-03955-4. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### claripi-clariace

- **Name**: ClariACE
- **Company**: ClariPi
- **Category**: Image Enhancement
- **Current effective scores**: E1 / L2 / R2
- **Stored scores**: E1 / L2
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | Regulatory fields correctly marked not_applicable; appears to be a research/companion tool without its own standalone clearance, which is an honest self-reported status rather than an error. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L2 / R2 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://claripi.com/clari-ace/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Diagnostic Usefulness of Contrast Enhancement and Noise Reduction of Artificial Intelligence-based ClariACE in Delay Enhancement Imaging of Cardiac CT: https://doi.org/10.31320/jksct.2024.26.2.33 (abstract retrieved; retrieved 2026-10-15).
- Search: Inventory cross-check: claripi-clariace regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: "ClariACE" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22ClariACE%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Feasibility of Dose Reduction in the Context of Preoperative Diagnostics in Cochlear Implant Surgery With a Photon-Counting Detector CT and Deep Learning-Supported Denoising.: https://doi.org/10.1097/mao.0000000000004647. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep learning-based combined noise reduction and contrast enhancement for post-neoadjuvant pancreatic cancer CT: does improved image quality translate to better resectability assessment?: https://doi.org/10.1007/s00261-025-05271-6. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep Learning-Based Augmented Contrast-Enhancement and Denoising for Reduced-Iodine and Low-Radiation 70-kVp Cerebral CT Angiography: A Prospective Study.: https://doi.org/10.3348/kjr.2025.1520. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Deep Learning-Based Iodine Contrast Augmentation for Suboptimally Enhanced CT Pulmonary Angiography: Implications for Pulmonary Embolism Diagnosis.: https://doi.org/10.3390/diagnostics15182325. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Double Boosting Strategy for Low-Iodine-Dose Dual-Source DECT Follow-Up CT After Intervention with Raw DICOM-Level Deep Learning Iodine Boosting and Low-keV Dual-Energy-Derived Images.: https://doi.org/10.3390/tomography12040056. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### ptw-aqualis

- **Name**: AIQUALIS
- **Company**: PTW
- **Category**: Performance Monitor
- **Current effective scores**: E0 / L2 / R1 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidence[] | info | AIQUALIS remains E0 (no peer-reviewed, product-naming publication located); vendor/poster-only evidence base confirmed consistent with existing notes. | No change required. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R1 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.ptwdosimetry.com/en/products/aiqualis; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: AIQUALIS radiotherapy QA monitoring peer-reviewed publication (2026-10-15) — https://europepmc.org/
- Limits: No new literature found in a single-pass web check; relied primarily on existing documented sweep history.
- Search: "AIQUALIS" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22AIQUALIS%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 1 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Deep Learning for Automated Ventricle and Periventricular Space Segmentation on CT and T1CE MRI in Neuro-Oncology Patients.: https://doi.org/10.3390/cancers17101598. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### mvision-verify

- **Name**: Verify
- **Company**: MVision AI
- **Category**: Performance Monitor
- **Current effective scores**: E0 / L2 / R1 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-09-06; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidence[] | info | Verify remains E0 (no peer-reviewed, product-naming publication located); vendor/poster-only evidence base confirmed consistent with existing notes. | No change required. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R1 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://mvision.ai/verify/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Verify radiotherapy QA monitoring peer-reviewed publication (2026-10-15) — https://europepmc.org/
- Limits: No new literature found in a single-pass web check; relied primarily on existing documented sweep history.
- Search: "Verify" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Verify%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- An independent third-party autoverification platform iXLAB Verify and its application in a core clinical biochemistry laboratory: https://doi.org/10.21203/rs.3.rs-10394609/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- The Verification Gap: Artificial Intelligence Adoption, Hallucination Awareness, and Verification Practices Among Medical Trainees and Professionals in Pakistan.: https://doi.org/10.7759/cureus.117238. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Memory-Driven Trust: A Unified Foundation for Self-Verifiability in Digital Infrastructure: https://doi.org/10.20944/preprints202609.2474.v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- P-VERIFY: Real-World Comparative Overall Survival and Progression-Free Survival of CDK4/6 Inhibitors Plus an Aromatase Inhibitor in Patients with HR+/HER2- Metastatic Breast Cancer in the USA-A Vodcast.: https://doi.org/10.1007/s11523-026-01233-0. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### raysearch-rayintelligence

- **Name**: RayIntelligence
- **Company**: RaySearch Laboratories
- **Category**: Performance Monitor
- **Current effective scores**: E0 / L1c / R1 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidence[] | info | RayIntelligence remains E0 (no peer-reviewed, product-naming publication located); vendor/poster-only evidence base confirmed consistent with existing notes. | No change required. |
| Transparency | trainingData | warn | Public disclosure lacks source label or URL; non-public disclosures may use a dated source label without a public URL | Verify source before editing |
| Transparency | evaluationData | warn | Public disclosure lacks source label or URL; non-public disclosures may use a dated source label without a public URL | Verify source before editing |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R1 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.raysearchlabs.com/rayintelligence/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: RayIntelligence radiotherapy QA monitoring peer-reviewed publication (2026-10-15) — https://europepmc.org/
- Limits: No new literature found in a single-pass web check; relied primarily on existing documented sweep history.
- Search: "RayIntelligence" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22RayIntelligence%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### accuray-synchrony

- **Name**: Synchrony®
- **Company**: Accuray®
- **Category**: Tracking
- **Current effective scores**: E1 / L5 / R3
- **Stored scores**: E1 / L5
- **Last revised**: 2026-08-27; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | warn | 2 provisional paper scores require source retrieval | Verify source before editing |
| Evidence | evidenceRigorNotes | info | E1 rating (downgraded from E2 in a prior sweep because all located studies are single-centre/retrospective) is consistent with current literature; the ongoing 2-site REMIND trial (NCT05844761, completion 2027) is correctly noted as not yet available evidence. | No change required; revisit once REMIND publishes. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E1 / L5 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.accuray.com/software/synchrony/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Accuracy of tumor motion compensation algorithm from a robotic respiratory tracking system: a simulation study.: https://doi.org/10.1118/1.2739811 (abstract retrieved; retrieved 2026-10-15).
- Clinical accuracy of the respiratory tumor tracking system of the cyberknife: assessment by analysis of log files.: https://doi.org/10.1016/j.ijrobp.2008.12.041 (abstract retrieved; retrieved 2026-10-15).
- Correlation and prediction uncertainties in the cyberknife synchrony respiratory tracking system.: https://doi.org/10.1118/1.3596527 (abstract retrieved; retrieved 2026-10-15).
- Evaluation of radixact motion synchrony for 3D respiratory motion: Modeling accuracy and dosimetric fidelity.: https://doi.org/10.1002/acm2.12978 (abstract retrieved; retrieved 2026-10-15).
- Technical Note: Comprehensive performance tests of the first clinical real-time motion tracking and compensation system using MLC and jaws.: https://doi.org/10.1002/mp.14171 (abstract retrieved; retrieved 2026-10-15).
- Clinical implementation and patient-specific quality assurance solutions for real-time target tracking and dynamic delivery in Radixact synchrony.: https://doi.org/10.1002/acm2.14545 (abstract retrieved; retrieved 2026-10-15).
- Markerless tumor tracking for lung SBRT with the Radixact Synchrony system: Initial experience and short-term clinical outcomes.: https://doi.org/10.1002/acm2.70362 (abstract retrieved; retrieved 2026-10-15).
- Effect of tumor size on motion tracking and dosimetric accuracy using Radixact Synchrony.: https://doi.org/10.1093/jrr/rrag002 (abstract retrieved; retrieved 2026-10-15).
- Stereotactic Body Radiation Therapy for Prostate Cancer Using Tomotherapy With Synchrony Fiducial Tracking.: https://doi.org/10.7759/cureus.40778 (abstract retrieved; retrieved 2026-10-15).
- Prostate Stereotactic Body Radiotherapy With Synchrony®-Based Fiducial Tracking on Radixact® X9.: https://doi.org/10.7759/cureus.83742 (abstract retrieved; retrieved 2026-10-15).
- Clinical Assessment of Potential Difference in Motion-Tracking Irradiation for Liver Tumors Using Radixact Synchrony®.: https://doi.org/10.7759/cureus.81598 (abstract retrieved; retrieved 2026-10-15).
- Tomotherapy With Synchrony Fiducial Tracking for Stereotactic Body Radiotherapy in Prostate Cancer: A Single-Center Experience on Toxicity.: https://doi.org/10.7759/cureus.85083 (abstract retrieved; retrieved 2026-10-15).
- Real-Time Motion Management for a Small Target in the Right Lower Lobe With Large Tumor Motion Using Radixact Synchrony: A Case Report.: https://doi.org/10.7759/cureus.85195 (abstract retrieved; retrieved 2026-10-15).
- Search: Synchrony Radixact REMIND trial multicenter prospective (2026-10-15) — https://clinicaltrials.gov/study/NCT05844761
- Limits: Did not re-verify each of the 13 listed evidence citations individually; spot-checked only the overall rigor narrative.
- Search: "Synchrony®" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Synchrony%C2%AE%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Preliminary investigation of iodine-doped MR-based polymer gel dosimeter for fiducial-free tumour-tracking radiotherapy.: https://doi.org/10.1016/j.ejmp.2026.107196. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- A glimpse into the CyberKnife robotic radiosurgery system: technical specifications and developments during thirty years.: https://doi.org/10.3389/fonc.2026.1871489. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Prostate Stereotactic Body Radiotherapy With Synchrony®-Based Fiducial Tracking on Radixact® X9.: https://doi.org/10.7759/cureus.83742. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Margin for compensating displacement of adrenal gland metastasis and fiducial marker along with respiratory phase in real-time motion-tracking radiation therapy.: https://doi.org/10.1007/s12194-025-00960-9. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### philips-precise-position

- **Name**: Precise Position
- **Company**: Philips
- **Category**: Positioning
- **Current effective scores**: E0 / L2 / R3 (efficacy provisional)
- **Stored scores**: E0 / L2
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Technical | modality | warn | Modality should be an array | Verify source before editing |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Evidence | evidence[] | info | E0 rating confirmed consistent: only vendor white paper and FDA 510(k) K203514 found; no independent peer-reviewed clinical study located. | No change required. |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L2 / R3 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.philips.com/healthcare/technology/ct-smart-workflow; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Philips Precise Position CT patient positioning peer-reviewed (2026-10-15) — https://europepmc.org/
- Limits: Single-pass check only.
- Search: "Precise Position" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Precise%20Position%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 5 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

#### New-source / product leads (not admitted or scored)

- Hybrid Software Controller for Precise Position and Trajectory Control of Quadcopters: https://doi.org/10.21203/rs.3.rs-10572101/v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Calibration of Differential Wheeled Mobile Robot with Trajectory Measuring Device: https://doi.org/10.20944/preprints202610.0438.v1. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Phosphorylation alters the bulk chemical properties of Orc1 to tune DNA binding, phase separation, and heterochromatin partitioning: https://doi.org/10.64898/2026.08.17.745304. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Cooperative Tracking Control of VTOL Drones: A Fixed-Time Super-Twisting Approach.: https://doi.org/10.1109/tcyb.2025.3633231. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match
- Letting the island come to you: can GPs be wayfinders?: https://doi.org/10.3399/bjgp26x746301. Name-query hit only; full-text product and RT-task attribution not verified unverified-name-match

### medlever-assistant-pipeline

- **Name**: MedLever Assistant
- **Company**: MedLever, Inc.
- **Category**: Platform (Pipeline)
- **Current effective scores**: unassessed / unassessed / unassessed
- **Stored scores**: unassessed / unassessed
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory/evidenceRigor | info | Confirmed pipeline/pre-market status for MedLever Assistant (pre-market, 'Coming Soon'): product is explicitly labelled by the vendor as not-for-sale, research-only, or clearance-pending, and the catalogue correctly records null/E0 evidence and R0/R1 adoption readiness accordingly. | Preserve as pipeline entry; no premature promotion to a cleared-product record until regulatory status changes. Re-check FDA database periodically for NeuralRadBrain and iContour clearance status changes. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: unassessed / unassessed / unassessed (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://medlever.com/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: MedLever Assistant (pre-market, 'Coming Soon') FDA clearance OR peer-reviewed publication (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Did not find independent confirmation beyond vendor/booth statements for MedLever Assistant (pre-market, 'Coming Soon'); genuinely unresolved pending regulatory action — explicitly preserved as unresolved rather than guessed at.
- Search: "MedLever Assistant" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MedLever%20Assistant%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### medlever-copilot-pipeline

- **Name**: MedLever Copilot
- **Company**: MedLever, Inc.
- **Category**: Platform (Pipeline)
- **Current effective scores**: unassessed / unassessed / unassessed
- **Stored scores**: unassessed / unassessed
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory/evidenceRigor | info | Confirmed pipeline/pre-market status for MedLever Copilot (pre-market, 'Coming Soon'): product is explicitly labelled by the vendor as not-for-sale, research-only, or clearance-pending, and the catalogue correctly records null/E0 evidence and R0/R1 adoption readiness accordingly. | Preserve as pipeline entry; no premature promotion to a cleared-product record until regulatory status changes. Re-check FDA database periodically for NeuralRadBrain and iContour clearance status changes. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: unassessed / unassessed / unassessed (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://medlever.com/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: MedLever Copilot (pre-market, 'Coming Soon') FDA clearance OR peer-reviewed publication (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Did not find independent confirmation beyond vendor/booth statements for MedLever Copilot (pre-market, 'Coming Soon'); genuinely unresolved pending regulatory action — explicitly preserved as unresolved rather than guessed at.
- Search: "MedLever Copilot" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22MedLever%20Copilot%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### ge-irt-theranostics-pipeline

- **Name**: iRT for Theranostics
- **Company**: GE Healthcare
- **Category**: Platform (Pipeline)
- **Current effective scores**: unassessed / unassessed / unassessed
- **Stored scores**: unassessed / unassessed
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | productUrl | warn | Public retrieval unsuccessful (404); server blocking and network failures are not proof of a broken URL. | Check in a normal browser/official navigation before changing the URL |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory/evidenceRigor | info | Confirmed pipeline/pre-market status for iRT for Theranostics (GE, 'not for sale'): product is explicitly labelled by the vendor as not-for-sale, research-only, or clearance-pending, and the catalogue correctly records null/E0 evidence and R0/R1 adoption readiness accordingly. | Preserve as pipeline entry; no premature promotion to a cleared-product record until regulatory status changes. Re-check FDA database periodically for NeuralRadBrain and iContour clearance status changes. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: unassessed / unassessed / unassessed (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.gehealthcare.com/en-us/about/newsroom/press-releases/estro-2026-congress--ge-healthcare-to-spotlight-ai-enabled-solutions-to-advance-precision-care-across-radiation-therapy-and-image-guided-interventions; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: iRT for Theranostics (GE, 'not for sale') FDA clearance OR peer-reviewed publication (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Did not find independent confirmation beyond vendor/booth statements for iRT for Theranostics (GE, 'not for sale'); genuinely unresolved pending regulatory action — explicitly preserved as unresolved rather than guessed at.
- Search: "iRT for Theranostics" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22iRT%20for%20Theranostics%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### united-uct610-sim-dl-recon-pipeline

- **Name**: uCT 610 Sim — Deep Learning Full-FOV Reconstruction
- **Company**: United Imaging
- **Category**: Reconstruction (Pipeline)
- **Current effective scores**: E0 / L1c / R0 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory.fda / evidence (general) | info | Regulatory fields are null and evidenceRigor E0/adoptionReadiness R0 — appropriately conservative for what the record frames as a simulation/pipeline component rather than a cleared clinical product. | No change required based on this pass; recommend a dedicated openFDA/vendor verification pass if this product is prioritized in a future audit cycle. |
| Regulatory | regulatory/evidenceRigor | info | Confirmed pipeline/pre-market status for uCT 610 Sim DL Full-FOV Reconstruction (United Imaging, pre-market): product is explicitly labelled by the vendor as not-for-sale, research-only, or clearance-pending, and the catalogue correctly records null/E0 evidence and R0/R1 adoption readiness accordingly. | Preserve as pipeline entry; no premature promotion to a cleared-product record until regulatory status changes. Re-check FDA database periodically for NeuralRadBrain and iContour clearance status changes. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | — | info | n/a — no enumerated auto-contouring structure list for this primary task | — |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R0 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://estro-united-imaging-healthcare-europe.framer.ai/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Inventory cross-check: united-uct610-sim-dl-recon-pipeline regulatory/evidence field consistency against product-code/DOI patterns observed elsewhere in the same dataset (no new external source fetched for this record in this pass) (2026-10-15) — n/a - internal cross-check only
- Limits: Not independently queried against openFDA/vendor/literature sources in this review cycle; assessed only via internal consistency cross-check against the other 26 records and the inventory's own self-reported fields.
- Search: uCT 610 Sim DL Full-FOV Reconstruction (United Imaging, pre-market) FDA clearance OR peer-reviewed publication (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Did not find independent confirmation beyond vendor/booth statements for uCT 610 Sim DL Full-FOV Reconstruction (United Imaging, pre-market); genuinely unresolved pending regulatory action — explicitly preserved as unresolved rather than guessed at.
- Search: "uCT 610 Sim — Deep Learning Full-FOV Reconstruction" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22uCT%20610%20Sim%20%E2%80%94%20Deep%20Learning%20Full-FOV%20Reconstruction%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### synaptiq-mediq-rt-4dct-pipeline

- **Name**: Mediq RT — 4D CT (Research Module)
- **Company**: Synaptiq
- **Category**: Auto-Contouring → secondary: Tracking (Pipeline)
- **Current effective scores**: E0 / L1c / R0 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-05-30; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory/evidenceRigor | info | Confirmed pipeline/pre-market status for Mediq RT 4D CT research module (Synaptiq, research-only): product is explicitly labelled by the vendor as not-for-sale, research-only, or clearance-pending, and the catalogue correctly records null/E0 evidence and R0/R1 adoption readiness accordingly. | Preserve as pipeline entry; no premature promotion to a cleared-product record until regulatory status changes. Re-check FDA database periodically for NeuralRadBrain and iContour clearance status changes. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | supportedStructures | warn | No structures or explicit unavailability flag | Verify source before editing |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R0 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://synaptiq.io/product/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: Mediq RT 4D CT research module (Synaptiq, research-only) FDA clearance OR peer-reviewed publication (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Did not find independent confirmation beyond vendor/booth statements for Mediq RT 4D CT research module (Synaptiq, research-only); genuinely unresolved pending regulatory action — explicitly preserved as unresolved rather than guessed at.
- Search: "Mediq RT — 4D CT Research Module" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22Mediq%20RT%20%E2%80%94%204D%20CT%20Research%20Module%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### neuralrad-brain-pipeline

- **Name**: NeuralRadBrain
- **Company**: NeuralRad
- **Category**: Auto-Contouring → secondary: Clinical Prediction (Pipeline)
- **Current effective scores**: E0 / L1c / R1 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-08-25; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory/evidenceRigor | info | Confirmed pipeline/pre-market status for NeuralRadBrain (NeuralRad, FDA pending): product is explicitly labelled by the vendor as not-for-sale, research-only, or clearance-pending, and the catalogue correctly records null/E0 evidence and R0/R1 adoption readiness accordingly. | Preserve as pipeline entry; no premature promotion to a cleared-product record until regulatory status changes. Re-check FDA database periodically for NeuralRadBrain and iContour clearance status changes. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | supportedStructures | warn | No structures or explicit unavailability flag | Verify source before editing |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R1 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://www.neuralrad.com/; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: NeuralRadBrain (NeuralRad, FDA pending) FDA clearance OR peer-reviewed publication (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Did not find independent confirmation beyond vendor/booth statements for NeuralRadBrain (NeuralRad, FDA pending); genuinely unresolved pending regulatory action — explicitly preserved as unresolved rather than guessed at.
- Search: "NeuralRadBrain" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22NeuralRadBrain%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.

### atomoai-icontour-pipeline

- **Name**: iContour
- **Company**: AtomoAI
- **Category**: Auto-Contouring (Pipeline)
- **Current effective scores**: E0 / L1c / R1 (efficacy provisional)
- **Stored scores**: E0 / L1c
- **Last revised**: 2026-09-26; this audit does not stamp reviewer verification.

#### Findings

| Role | Field | Severity | Observation | Suggested fix |
| --- | --- | --- | --- | --- |
| Identity | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Inclusion | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Regulatory | regulatory/evidenceRigor | info | Confirmed pipeline/pre-market status for iContour (AtomoAI, no clearance found): product is explicitly labelled by the vendor as not-for-sale, research-only, or clearance-pending, and the catalogue correctly records null/E0 evidence and R0/R1 adoption readiness accordingly. | Preserve as pipeline entry; no premature promotion to a cleared-product record until regulatory status changes. Re-check FDA database periodically for NeuralRadBrain and iContour clearance status changes. |
| Technical | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Structures | supportedStructures | warn | No structures or explicit unavailability flag | Verify source before editing |
| Evidence | keyPapers | info | No scored attributable publications recorded; literature search required | Keep evidence uncertainty explicit |
| Transparency | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |
| Cross-check | — | info | No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations. | Human verification remains required for undisclosed or inaccessible claims |

#### Re-scoring proposal

- Proposed: E0 / L1c / R1 (not applied)
- Rationale: No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.
- Search date: 2026-10-15

#### Sources consulted

- Recorded vendor page: https://atomoai.ai/services; retrieval result in website-checks.json.
- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.
- Search: iContour (AtomoAI, no clearance found) FDA clearance OR peer-reviewed publication (2026-10-15) — https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Limits: Did not find independent confirmation beyond vendor/booth statements for iContour (AtomoAI, no clearance found); genuinely unresolved pending regulatory action — explicitly preserved as unresolved rather than guessed at.
- Search: "iContour" AND FIRST_PDATE:[2025-01-01 TO 2026-10-15] (2026-10-15) — https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22iContour%22%20AND%20FIRST_PDATE%3A%5B2025-01-01%20TO%202026-10-15%5D&format=json&resultType=core&pageSize=5&sort_date:y
- Limits: Exact marketed-name Europe PMC search returned 0 of at most 5 results. Synonyms, non-indexed abstracts and subscription full text may be missed; no result is not proof of no evidence. Vendor-page retrieval is recorded separately.
