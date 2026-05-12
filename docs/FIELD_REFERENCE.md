# Product Field Reference

This document explains every field used in DLinRT.eu product entries. Use it when reviewing or contributing product data to ensure consistent interpretation of each item.

## How to Read This Guide

- **Field Name**: JSON / TypeScript key used in `ProductDetails`.
- **Required?**: Whether the field must be present for every product.
- **Purpose**: Why the field exists and how it is used.
- **Allowed Values / Format**: Validation hints (data type, enums, examples).
- **Reviewer Notes**: Tips for verifying the field during reviews.

## Core Identification

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `id` | ✅ | Unique stable identifier (used in URLs, exports, assignments). | Lowercase `company-product` slug. No spaces. | Never change once published; create new entry for major revisions. |
| `name` | ✅ | Commercial product name. | Free text, 3-80 chars. | Match naming on vendor site; include trademark symbols only if required. |
| `company` | ✅ | Owning organization. | Official company name. | Ensure consistent spelling across products. |
| `description` | ✅ | Overview shown on product cards. | Markdown/plain text up to 400 chars. | Should be factual and neutral tone. |
| `category` | ✅ | Primary functional domain. | One of: Auto-Contouring, Clinical Prediction, Image Enhancement, Image Synthesis, Performance Monitor, Platform, Reconstruction, Registration, Tracking, Treatment Planning. | Choose dominant use case; secondary roles go into `secondaryCategories`. |
| `secondaryCategories` | ➖ | Additional domains covered. | Array of category names (same enum as above). Max 3 entries. | Only include when feature set is significant for that domain. |
| `logoUrl` | ➖ | Product/company logo. | Path under `/public/logos`. PNG/SVG. | Ensure asset exists and respects licensing. |

## Web & Contact Information

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `website` or `productUrl` | ✅ | Landing page for the product. | `https://` URL. | Ensure link resolves and is current. |
| `companyUrl` | ➖ | Corporate site home page. | `https://` URL. | Provide when product and company sites differ. |
| `supportEmail` / `contactEmail` | ➖ | Primary contact for inquiries. | Valid email. | Use vendor-provided generic address when possible. |
| `contactPhone` | ➖ | Direct phone contact. | `+<country> <number>`. | Optional; include only if listed publicly. |
| `githubUrl` | ➖ | Source code repository. | `https://github.com/...` | Only for open-source components. |
| `developedBy` | ➖ | Tracks when a product is developed/manufactured by a different company than the seller. | Object with `company` (required), `companyUrl` (optional URL), `relationship` (optional string like "Technology Partner", "OEM", "White-label"). | Use when vendor partners with another company for product development. Verify partnership publicly disclosed. |

## Classification & Clinical Scope

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `modality` | ✅ | Imaging / delivery modalities supported. | String or array (CT, MRI, PET, CBCT, LINAC, VMAT, IMRT, US, etc.). | Convert single values into array form when editing to keep consistency. |
| `anatomicalLocation` / `anatomy` | ➖ | Anatomical regions covered. | Array of tags (Brain, Thorax, Pelvis, etc.). | Confirm against vendor claims and publications. |
| `diseaseTargeted` | ➖ | Specific pathologies addressed. | Array of disease names. | Cite evidence if disease-specific claims exist. |
| `supportedStructures` | ➖ | Structures auto-contoured or analyzed. | Array of strings or objects `{ name, type, accuracy, validationDataset }`. | Ensure each structure has correct type (OAR, Targets, Elective). |
| `useCases` | ➖ | Typical clinical scenarios. | Array of short phrases. | Avoid marketing speak—focus on workflow tasks. |
| `trainingRequired` | ➖ | Indicates if formal training is needed. | Boolean. | Set `true` when vendor mandates onboarding. |

## Versioning & Dates

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `version` | ✅ | Current product software version. | Semantic string (`2.1.0`). | Match vendor release notes. |
| `releaseDate` | ✅ | Date this version released. | `YYYY-MM-DD`. | If unknown, use first confirmed date from sources. |
| `lastUpdated` | ✅ | Date the product entry was modified (any data change). | `YYYY-MM-DD`. | Update this immediately after saving edits so change history is accurate. |
| `lastRevised` / `lastVerified` | ➖ | Date a reviewer last verified the entry for publication (feeds <https://dlinrt.eu/review/> listings). | `YYYY-MM-DD`. | Refresh after a full QA pass even if no data changed; used for reviewer dashboards. |
| `companyRevisionDate` | ➖ | Date vendor last revised official specs. | `YYYY-MM-DD`. | Requires confirmation from vendor or documentation. |

## Regulatory

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `regulatory.ce.status` | ✅ for CE products | Indicates CE marking state. | Enum: `cleared`, `under_review`, `not_applicable`. | Ensure class/NOTIFIED body values align with vendor certificate. |
| `regulatory.ce.class` | ➖ | CE device class. | I, IIa, IIb, III. | Required when status is cleared. |
| `regulatory.ce.notes` | ➖ | Additional CE notes. | Free text. | Clarifications about approval scope. |
| `regulatory.fda.status` | ✅ for US products | FDA clearance status. | `510k_cleared`, `de_novo`, `not_approved`, etc. | Provide `clearanceNumber` when cleared. |
| `regulatory.fda.decisionDate` | ➖ | FDA clearance decision date. | `YYYY-MM-DD`. | Date from FDA database or 510(k) letter. |
| `regulatory.fda.notes` | ➖ | Additional FDA notes. | Free text. | Clarifications about approval scope. |
| `regulatory.tga.status` | ➖ | Australian TGA approval status. | `approved`, `pending`, `not_applicable`. | Document TGA certificate details when available. |
| `regulatory.tga.notes` | ➖ | Additional TGA notes. | Free text. | Include certificate references. |
| `intendedUseStatement` | ➖ | Official intended use text. | Vendor-provided string. | Quote verbatim from labeling. |
| `certification` | ➖ | Combined summary shown on cards. | Concise string (e.g., "CE Class IIb, FDA 510(k)"). | Derived from `regulatory`; keep in sync. |

## Technical & Deployment

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `technicalSpecifications` | ➖ | Input/output formats and populations. | Object with `population`, `input`, `inputFormat`, `output`, `outputFormat`. | Ensure DICOM objects listed use correct nomenclature. |
| `technology.integration` | ➖ | Supported integrations (e.g., Eclipse, RayStation). | Array of system names. | Validate via vendor docs. |
| `technology.deployment` | ➖ | Deployment models. | Array (`on_prem`, `cloud`, `hybrid`). | Note regulatory implications for cloud deployments. |
| `technology.processingTime` | ➖ | Average processing latency. | Free text (e.g., "<2 min per structure"). | Provide vendor-quoted time, not internal tests. |

## Market & Pricing

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `market.onMarketSince` | ➖ | Year product entered market. | `YYYY` or `YYYY-MM`. | Derive from first commercial availability. |
| `market.distributionChannels` | ➖ | Sales/partner channels. | Array of strings. | Optional; use when vendor publishes info. |
| `pricing.model` | ➖ | Commercial model. | Array of tags (`subscription`, `per_exam`, `license`). | Avoid speculative pricing; only include confirmed details. |
| `pricing.basedOn` | ➖ | Pricing drivers. | Array (`number_of_sites`, `exam_volume`). | Record only if published. |
| `price` | ➖ | Approximate cost. | Number in base currency. | Use sparingly; must cite public source. |

## Evidence & Limitations

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `clinicalEvidence` | ➖ | Narrative summary of studies. | Markdown/plain text. | Reference publications. |
| `evidence` | ➖ | Structured evidence list. | Array of `{ type, description, link, level? }`. | Provide DOI/URL for each entry. Optional `level` per study. |
| `limitations` | ➖ | Known caveats. | Array of strings. | Highlight vendor-declared or publication-based limitations. |
| `guidelines` | ➖ | Professional guidelines adhered to. | Array of `{ name, version, reference, url, compliance }`. | Use `compliance`: `full`, `partial`, `planned`. |

## Evidence Level Classification (Dual-Axis System)

Products are classified using a **dual-axis framework** separating Evidence Rigor (E0-E3) from Clinical Impact (I0-I5), adapted from [van Leeuwen et al. (2021)](https://doi.org/10.1007/s00330-021-07892-z) and updated with [Antonissen et al. (2025)](https://doi.org/10.1007/s00330-025-11830-8). The Clinical Impact axis is cross-referenced with the [Fryback & Thornbury hierarchy](https://doi.org/10.1177/0272989X9101100203).

### Evidence Rigor (E0-E3)

| Level | Name | Criteria |
|-------|------|----------|
| E0 | No Peer-Reviewed Evidence | Vendor materials, regulatory submissions only |
| E1 | Preliminary Evidence | Single-center, small cohorts, pilot studies |
| E2 | Validated Evidence | Multi-center (3+ sites), large prospective cohorts, external validation |
| E3 | Systematic Evidence | Systematic reviews, meta-analyses, RCTs |

### Clinical Impact (I0-I5)

| Level | Name | F&T Level | When to Use |
|-------|------|-----------|-------------|
| I0 | None Demonstrated | — | Feasibility only, no benefit shown |
| I1 | Quality Assurance | Level 1 | QA tools, monitoring, consistency checks |
| I2 | Workflow | Level 2 | Time savings, variability reduction, dose reduction, image quality improvement |
| I3 | Decision | Level 3 | Changes in treatment management or plan selection |
| I4 | Outcome | Levels 4–5 | Toxicity reduction, survival, patient outcomes |
| I5 | Societal | Level 6 | Cost-effectiveness, access to care |

### Study Quality Sub-Attributes

| Attribute | Type | Description | Source |
|-----------|------|-------------|--------|
| `evidenceVendorIndependent` | Boolean | At least one study independent of vendor | van Leeuwen 2025 |
| `evidenceMultiCenter` | Boolean | Evidence from 3+ clinical sites | van Leeuwen 2025 |
| `evidenceMultiNational` | Boolean | Data from multiple countries | van Leeuwen 2025 |
| `evidenceProspective` | Boolean | At least one prospective study design | van Leeuwen 2025 |
| `evidenceExternalValidation` | Boolean | Validated on external dataset | Pham 2023 |

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `evidenceRigor` | ➖ | Evidence rigor level | `"E0"`, `"E1"`, `"E2"`, `"E3"` | Assign based on strongest published evidence methodology |
| `clinicalImpact` | ➖ | Clinical impact level | `"I0"`, `"I1"`, `"I2"`, `"I3"`, `"I4"`, `"I5"` | I2 = workflow/dose/image quality; I3 = treatment decision changes |
| `evidenceLevelNotes` | ➖ | Justification for classification | Free text | Cite key supporting publications |
| `evidence[].level` | ➖ | Per-study classification | Same dual-axis values | Optional per-study detail |

**Key References**:
- van Leeuwen KG, et al. *Eur Radiol.* 2021;31(6):3797-3804. [DOI](https://doi.org/10.1007/s00330-021-07892-z)
- Antonissen N, et al. *Eur Radiol.* 2026;36:526-536. [DOI](https://doi.org/10.1007/s00330-025-11830-8)
- Fryback DG, Thornbury JR. *Med Decis Making.* 1991;11(2):88-94. [DOI](https://doi.org/10.1177/0272989X9101100203)

## Training & Evaluation Data Transparency

These fields track the transparency and provenance of AI training and clinical evaluation datasets.

### Training Data (`trainingData`)

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `trainingData.description` | ➖ | Free text summary of training data | String | Summarize key characteristics |
| `trainingData.datasetSize` | ➖ | Number of samples/scans used | String (e.g., "10,000 CT scans") | Extract from publications or FDA 510(k) summaries |
| `trainingData.datasetSources` | ➖ | Where data came from | Array of strings (e.g., ["TCIA", "Internal clinical data"]) | Note if vendor-only or public datasets |
| `trainingData.demographics` | ➖ | Patient population characteristics | String (e.g., "Adult patients, 45% female, age 22-89") | Look for age, sex, ethnicity distribution |
| `trainingData.scannerModels` | ➖ | Imaging hardware used | Array of strings | Check vendor docs and publications |
| `trainingData.institutions` | ➖ | Number of contributing institutions | Number | Higher count suggests better generalizability |
| `trainingData.countries` | ➖ | Number of countries represented | Number | Multi-national data reduces bias |
| `trainingData.publicDatasets` | ➖ | Named public datasets used | Array of strings | e.g., "AAPM TG-263 benchmark" |
| `trainingData.disclosureLevel` | ➖ | How transparent the vendor is | `"full"`, `"partial"`, `"minimal"`, `"none"` | Based on Mehta et al. 2025 transparency criteria |
| `trainingData.source` | ➖ | Where this info was found | String | e.g., "FDA 510(k) Summary K230082" |
| `trainingData.sourceUrl` | ➖ | URL to source document | URL | Link to FDA summary, publication, or vendor docs |

### Evaluation Data (`evaluationData`)

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `evaluationData.description` | ➖ | Summary of clinical evaluation | String | Summarize study design and key results |
| `evaluationData.datasetSize` | ➖ | Evaluation cohort size | String (e.g., "302 CT exams, 2552 contours") | Extract from regulatory submissions or publications |
| `evaluationData.sites` | ➖ | Number of clinical sites | Number | Multi-site = stronger validation |
| `evaluationData.countries` | ➖ | Number of countries | Number | Cross-national validation |
| `evaluationData.demographics` | ➖ | Patient demographics | String | Age, sex, disease mix |
| `evaluationData.studyDesign` | ➖ | Study methodology | String (e.g., "Retrospective multi-site") | Note if prospective vs retrospective |
| `evaluationData.primaryEndpoint` | ➖ | Main evaluation metric | String (e.g., "Dice Similarity Coefficient >= 0.85") | Include threshold if specified |
| `evaluationData.results` | ➖ | Summary of key results | String | Brief factual summary |
| `evaluationData.source` | ➖ | Source of evaluation data | String | FDA summary, publication, vendor docs |
| `evaluationData.sourceUrl` | ➖ | URL to source | URL | Link to official document |

**Data Sources** (in order of reliability):
1. Peer-reviewed publications (richest detail, include DOI)
2. FDA 510(k) summaries (accessdata.fda.gov)
3. CE Technical Documentation (rarely public; MDR Article 61)
4. Vendor documentation / IFU

**Reference**: Mehta S, et al. *npj Digital Medicine.* 2025. [DOI](https://doi.org/10.1038/s41746-025-02052-9) — found only 3.3/17 transparency criteria typically reported.

## Safety Corrective Actions (FSCA / Recalls)

Products can have safety-related corrective actions tracked from regulatory databases.

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `safetyCorrectiveActions[].type` | ✅ per entry | Type of action | `"recall"`, `"FSCA"`, `"advisory"`, `"software-update"` | FDA uses "recall"; EU uses "FSCA" |
| `safetyCorrectiveActions[].classification` | ➖ | Severity class | String (e.g., "Class 2") | FDA: Class 1 (most serious) to Class 3 |
| `safetyCorrectiveActions[].identifier` | ➖ | Official reference number | String (e.g., "Z-2490-2025") | FDA recall number, BfArM reference, etc. |
| `safetyCorrectiveActions[].date` | ✅ per entry | Date action initiated | `YYYY-MM-DD` | From official notice |
| `safetyCorrectiveActions[].status` | ➖ | Current status | `"open"`, `"closed"`, `"terminated"` | Update when status changes |
| `safetyCorrectiveActions[].description` | ✅ per entry | What the issue was | String | Brief factual description |
| `safetyCorrectiveActions[].affectedVersions` | ➖ | Software versions affected | Array of strings | Include all affected versions |
| `safetyCorrectiveActions[].action` | ➖ | Corrective action taken | String | e.g., "Software update released" |
| `safetyCorrectiveActions[].authority` | ✅ per entry | Regulatory authority | `"FDA"`, `"BfArM"`, `"MHRA"`, `"TGA"`, `"HPRA"`, etc. | Source authority for the notice |
| `safetyCorrectiveActions[].sourceUrl` | ➖ | Link to official notice | URL | Link to FDA, BfArM, or MHRA database |

**Data Sources**:
- **FDA Recalls**: accessdata.fda.gov/scripts/cdrh/cfdocs/cfRes/res.cfm
- **FDA MAUDE** (adverse events): accessdata.fda.gov/scripts/cdrh/cfdocs/cfMAUDE/search.cfm
- **BfArM** (Germany): bfarm.de/EN/Medical-devices
- **EUDAMED** (EU-wide, mandatory from May 2026)
- **MHRA** (UK), **HPRA** (Ireland), **TGA** (Australia)

## Additional Product Fields

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `developmentStage` | ➖ | Product lifecycle stage | `"certified"`, `"pipeline"`, `"research"`, `"discontinued"` | Use "certified" for products with CE/FDA clearance |
| `priorVersions` | ➖ | Links to earlier product versions | Array of product ID strings | For tracking version evolution |
| `supersededBy` | ➖ | ID of product that replaces this one | Product ID string | Set when product is discontinued/replaced |
| `dosePredictionModels` | ➖ | Dose prediction capabilities (Treatment Planning) | Array of model descriptors | Specific to treatment planning products |
| `regulatory.tfda` | ➖ | Taiwan FDA approval | Object with `status`, `notes` | Same structure as other regulatory entries |

## Platform & AI Classification

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `usesAI` | ➖ | Indicates if product uses AI/DL technology. | Boolean. | Set `false` for traditional QA tools that don't use AI. |
| `monitorsAIProducts` | ➖ | For Performance Monitor: AI products it monitors/validates. | Array of product names or categories. | List specific AI products or generic categories like "Auto-Contouring outputs". |
| `integratedModules` | ➖ | For Platform products: included modules/components. | Array of `{ name, description, category, productUrl, keyFeatures }`. | Document each integrated module separately. |
| `partOf` | ➖ | Indicates product is part of a larger system. | Object with `name`, `version`, `productUrl`, `relationship`. | Use for modules that require parent platform. |

## Relationships & Workflow

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `compatibleSystems` | ➖ | TPS/OS/hardware compatibility. | Array of systems. | Confirm with vendor documentation. |
| `userRating` | ➖ | Aggregate reviewer sentiment (internal use). | Number 0-5. | Do not edit manually; derived from surveys. |
| `suggestedUse` | ➖ | Recommended workflow placement. | Short paragraph. | Keep objective; avoid marketing copy. |

## Revision Workflow Fields

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `assigned_to` (review metadata) | auto | Reviewer currently responsible. | UUID. | Set by system—do not edit manually. |
| `review_round_id` | auto | Links product review to a round. | UUID. | Populated during assignments. |
| `status` (review record) | auto | Review lifecycle state. | `pending`, `in_progress`, `completed`, `company_reviewed`. | Update via dashboard actions only. |
| `notes` | ➖ | Reviewer comments for administrators. | Markdown/plain text. | Capture key findings or blockers. |
| `deadline` | auto | Due date for current reviewer. | ISO date. | Provided by admin during assignment. |

## Visual Editing Field Types

When using the in-browser visual editor, fields use specialized editor components:

### Single-Select Dropdowns
| Field | Options Source |
|-------|----------------|
| `category` | 10 predefined categories |
| `certification` | Standard certification types |
| `regulatory.*.status` | Regulatory status enums |

### Multi-Select Editors
| Field | Options Source |
|-------|----------------|
| `secondaryCategories` | 10 predefined categories |
| `modality` | Modality tags (CT, MRI, CBCT, etc.) |
| `anatomicalLocation` | Anatomy tags (Brain, Thorax, etc.) |

### Specialized Editors
| Field | Editor |
|-------|--------|
| `regulatory` | RegulatoryEditor - Full CE/FDA/TGA editing |
| `evidence` | EvidenceEditor - Links with evidence levels |
| `supportedStructures` | StructuresEditor - OAR/GTV/Elective classification |
| `guidelines` | GuidelinesEditor - Professional guidelines compliance |

### Always-Visible Sections
- **Evidence & Limitations** card is always visible to encourage setting evidence level
- Evidence level can be set even when no evidence links exist

---

## Quick Checklist for Reviewers

1. Confirm **core identity** fields (name, company, description, category).
2. **Set evidence classification** (E0-E3 rigor + I0-I5 impact) — prominently displayed.
3. Validate **modality, anatomy, supportedStructures** against current evidence.
4. Update **versioning and dates** even if no other change is required.
5. Verify **regulatory** claims with certificates or official databases (CE, FDA, TGA, TFDA).
6. Ensure **contact & website links** are live.
7. Record **evidence, limitations, and guidelines** when available.
8. Review **training data transparency** and **evaluation data** when disclosed.
9. Check for **safety corrective actions** (FSCAs/recalls) in regulatory databases.
10. **Submit for review** via EditToolbar (or create GitHub PR if editing directly).

---

## Company Certification Fields

These fields are used when company representatives certify product information:

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `company_product_verifications.id` | auto | Unique verification ID | UUID | System-generated |
| `company_product_verifications.company_id` | ✅ | Company performing certification | Company ID string | Must match representative's company |
| `company_product_verifications.product_id` | ✅ | Product being certified | Product ID string | Links to product entry |
| `company_product_verifications.verified_at` | auto | Timestamp of certification | ISO 8601 timestamp | Set automatically on certification |
| `company_product_verifications.verified_by` | auto | User who certified | UUID | System-managed, links to user |
| `company_product_verifications.verification_notes` | ➖ | Additional certification notes | Free text | Optional context about certification |
| `company_product_verifications.product_last_revised` | ➖ | Date product info last updated | ISO 8601 timestamp | Tracks when product was last revised |
| `company_product_verifications.supporting_documents` | ➖ | Supporting documentation | JSON array | Optional file references |

**Certification Rules**:
- Maximum **5 verified representatives** per company
- Only verified representatives can certify products
- **Admins can certify any company's products** without being a representative
- Certifications are tracked in audit logs for compliance

---

## Healthcare Interoperability (FHIR & Schema.org)

Products can be exported in FHIR R4 DeviceDefinition format for healthcare system integration. Product pages also include Schema.org JSON-LD structured data for SEO.

### FHIR Resource Structure

| FHIR Resource | DLinRT Source |
|---------------|---------------|
| `DeviceDefinition` | Product data |
| `Organization` | Company data |
| `Bundle` | Container for all resources |

### FHIR Property Mappings

| DLinRT Field | FHIR Mapping |
|--------------|--------------|
| `modality` | DICOM modality codes (40+ codes) |
| `anatomicalLocation` | SNOMED CT anatomy codes (60+ codes) |
| `diseaseTargeted` | ICD-10 / SNOMED CT oncology codes |
| `regulatory.fda.clearanceNumber` | FDA 510(k) identifiers |
| `regulatory.ce.class` | EU MDR device class |
| `regulatory.tga` | TGA approval identifiers |
| `regulatory.tfda` | Taiwan FDA identifiers |
| `evidenceRigor` / `clinicalImpact` | Custom DLinRT properties |
| `trainingData` | Dataset metadata properties |
| `evaluationData` | Clinical evaluation properties |
| `safetyCorrectiveActions` | Safety notice extensions |
| `supportedStructures` | Anatomical structure properties |

### FHIR Readiness Score

The system calculates a readiness score (0-4) based on terminology mappings:

| Check | Requirement | Points |
|-------|-------------|--------|
| Modality | Has DICOM code mapping | 1 |
| Anatomy | Has SNOMED CT code mapping | 1 |
| Disease | Has ICD-10/SNOMED code mapping | 1 |
| Regulatory | Has FDA/CE identifiers | 1 |

**Labels**: 0 = Limited, 1-2 = Fair, 3 = Good, 4 = Excellent.

### Schema.org JSON-LD

Product pages include structured `MedicalDevice` markup with:
- Product name, manufacturer, description
- Regulatory clearance information
- Training data transparency level and disclosure metrics
- Safety corrective action counts
- Evidence classification data

### Accessing FHIR Export

1. Navigate to any product detail page
2. Scroll to "Healthcare Interoperability" section
3. Click "Export FHIR Bundle"
4. Optionally check "Include Warnings Report"

---

Need more context or a new field? Open an issue referencing this document and include the field name, purpose, and data format you intend to add.

**Last Updated**: March 8, 2026

## Implementation & Assurance Burden (Z-axis)

Third axis of the E/I/Z evidence-assurance model (Lula & Kamath, 2026). Lower Z = lower residual effort = higher adoption readiness.

| Field | Type | Description |
|---|---|---|
| `implementationBurden` | `"Z0"\|"Z1"\|"Z2"\|"Z3"\|"Z4"\|"Z5"` | Residual implementation/assurance burden. See `src/data/evidence-impact-levels.ts` for the full Z0–Z5 rubric (Table 2C of the proposal). |
| `implementationBurdenNotes` | string | Free-text notes explaining the Z assignment. |
| `burdenFactors.commissioningRequired` | boolean | Local commissioning still required before clinical use. |
| `burdenFactors.localValidationRequired` | boolean | Local validation cohort needed. |
| `burdenFactors.workflowRedesign` | boolean | Workflow redesign required for safe deployment. |
| `burdenFactors.integrationComplexity` | `"low"\|"medium"\|"high"` | TPS/OIS/PACS integration complexity. |
| `burdenFactors.humanFactorsTesting` | boolean | Human-factors testing outstanding. |
| `burdenFactors.economicCaseRequired` | boolean | Local economic/resource case required. |
| `burdenFactors.subgroupValidationGaps` | boolean | Subgroup or atypical-anatomy gaps remain. |
| `burdenFactors.postMarketMonitoringPlan` | boolean | Post-market monitoring plan in place. |
| `burdenFactors.unresolvedSafetySignal` | boolean | Unresolved FSCA/recall/advisory — forces Z5 / blocked signal. |

**Composite Readiness Signal** (computed, not stored): derived from E/I/Z via `computeReadinessSignal()`. Returns one of `adoption-grade`, `deploy-with-monitoring`, `conditional`, `pilot-only`, `not-adoption-ready`, `blocked`, `not-assessed`.
