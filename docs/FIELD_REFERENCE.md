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

## Evidence Level Classification

Products are classified using an evidence hierarchy adapted from [van Leeuwen et al. (2021)](https://doi.org/10.1007/s00330-021-07892-z), modified for radiotherapy applications.

| Level | Name | Description | RT Examples |
| --- | --- | --- | --- |
| `0` | No Peer-Reviewed Evidence | No publications; vendor claims only | FDA 510(k) summary only |
| `1t` | Technical Efficacy | Reproducibility, error rates | Auto-contour consistency tests |
| `1c` | Potential Clinical Efficacy | Correlation studies | Dice vs expert contours on test data |
| `2` | Stand-Alone Performance | Clinical dataset validation | Multi-center Dice validation |
| `3` | Workflow Efficacy | Human-AI interaction | Contouring time savings studies |
| `4` | Treatment Decision Efficacy | Impact on treatment plans | Dose escalation enabled by OAR sparing |
| `5` | Patient Outcome Efficacy | Clinical endpoints | Toxicity reduction, survival |
| `6` | Societal Efficacy | Health economics | Cost per QALY analysis |

| Field | Required? | Purpose | Allowed Values / Format | Reviewer Notes |
| --- | --- | --- | --- | --- |
| `evidenceLevel` | ➖ | Highest achieved evidence level | "0", "1t", "1c", "2", "3", "4", "5", "6" | Assign based on strongest published evidence |
| `evidenceLevelNotes` | ➖ | Justification for level | Free text | Cite key supporting publications |
| `evidence[].level` | ➖ | Level for individual study | Same as evidenceLevel | Optional per-study classification |

**Reference**: van Leeuwen KG, et al. Eur Radiol. 2021;31(6):3797-3804. [DOI: 10.1007/s00330-021-07892-z](https://doi.org/10.1007/s00330-021-07892-z)

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
2. **Set evidence level** (0-6) - this is now prominently displayed.
3. Validate **modality, anatomy, supportedStructures** against current evidence.
4. Update **versioning and dates** even if no other change is required.
5. Verify **regulatory** claims with certificates or official databases.
6. Ensure **contact & website links** are live.
7. Record **evidence, limitations, and guidelines** when available.
8. **Submit for review** via EditToolbar (or create GitHub PR if editing directly).

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

Need more context or a new field? Open an issue referencing this document and include the field name, purpose, and data format you intend to add.

**Last Updated**: January 28, 2026
