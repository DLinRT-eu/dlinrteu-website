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
| `regulatory.fda.status` | ✅ for US products | FDA clearance status. | `510k_cleared`, `de_novo`, `not_approved`, etc. | Provide `clearanceNumber` when cleared. |
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
| `evidence` | ➖ | Structured evidence list. | Array of `{ type, description, link }`. | Provide DOI/URL for each entry. |
| `limitations` | ➖ | Known caveats. | Array of strings. | Highlight vendor-declared or publication-based limitations. |
| `guidelines` | ➖ | Professional guidelines adhered to. | Array of `{ name, version, reference, url, compliance }`. | Use `compliance`: `full`, `partial`, `planned`. |

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

## Quick Checklist for Reviewers

1. Confirm **core identity** fields (name, company, description, category).
2. Validate **modality, anatomy, supportedStructures** against current evidence.
3. Update **versioning and dates** even if no other change is required.
4. Verify **regulatory** claims with certificates or official databases.
5. Ensure **contact & website links** are live.
6. Record **evidence, limitations, and guidelines** when available.
7. Refresh **lastUpdated** after every edit to keep `/review` overview accurate.

---

Need more context or a new field? Open an issue referencing this document and include the field name, purpose, and data format you intend to add.
