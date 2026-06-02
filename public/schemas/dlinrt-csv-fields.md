# DLinRT.eu — Products CSV Field Dictionary

This document lists every column in the products CSV export
(`dlinrt-all-products.csv` / `dlinrt-filtered-products.csv`). The CSV is
RFC 4180 compliant: fields containing commas, quotes, or newlines are
double-quoted with embedded quotes doubled.

The full machine-readable JSON schema lives at
[`/schemas/dlinrt-model-card-schema.json`](./dlinrt-model-card-schema.json).

## Identification

- **ID** — Stable product slug used as the route under `/product/<id>`.
- **Name** — Product name as shown publicly.
- **Company** — Manufacturer / vendor.
- **Category** — Primary functional category (e.g. *Auto-Contouring*).
- **Secondary Categories** — Additional functional categories (`;`-separated).
- **Description** — One-paragraph overview.
- **Features** — Free-form features list.

## Clinical scope

- **Subspeciality** — Radiotherapy subspeciality (e.g. *Photon, Proton*).
- **Modality** — Imaging modality (`CT, MR, …`).
- **Anatomical Location** — Body sites supported.
- **Disease Targeted** — Cancer / disease entities.
- **Key Features**, **Suggested Use**.
- **Supported Structures** — `Region: Structure Name` items, `;`-separated.
  See [DICOM nomenclature standardization](../../docs/README.md).

## Technical specifications

- **Technical Population**, **Technical Input**, **Technical Input Format**.
- **Technical Output**, **Technical Output Format**.
- **Integration Methods**, **Deployment Options**, **Trigger For Analysis**, **Processing Time**.

## Regulatory

- **CE Status / Class / Type / Certificate Number / Regulation Number**.
- **FDA Status / Clearance Number / Regulation Number / Product Code**.
- **TGA Status / Notes**.
- **TFDA Status / Approval Number / Decision Date**.
- **Intended Use Statement** — Manufacturer-stated intended use.

## Market & commercials

- **Market Since**, **Distribution Channels**.
- **Pricing Model**, **Pricing Based On**.
- **Release Date**, **Version**, **Website**, **Company URL**, **Product URL**, **GitHub URL**.

## Evidence (dual-axis)

- **Clinical Evidence**, **Evidence**, **Limitations**.
- **Evidence Rigor** — `E0`–`E3`. See `docs/review/GUIDE.md`.
- **Evidence Rigor Notes**.
- **Clinical Impact** — `I0`–`I5`. See `docs/review/GUIDE.md`.
- **Clinical Impact Notes**.
- **Implementation Burden** — Adoption-readiness level.
- **Implementation Burden Notes**.
- **Readiness Signal** — Computed badge from the three axes above.

### Implementation burden factors (booleans)

`Burden: Commissioning Required`, `Local Validation Required`,
`Workflow Redesign`, `Integration Complexity`, `Human Factors Testing`,
`Economic Case Required`, `Subgroup Validation Gaps`,
`Post-Market Monitoring Plan`, `Unresolved Safety Signal`.

### Study quality attributes (booleans)

`Evidence Vendor Independent`, `Multi-Center`, `Multi-National`,
`Prospective`, `External Validation`.

## Provenance & relationships

- **Guidelines** — `Name vX (compliance); …`.
- **Developed By**, **Developed By Relationship**, **Part Of**, **Part Of Relationship**.
- **Uses AI** — `true` for AI/DL products; `false` for QA/monitoring tools.
- **Development Stage** — e.g. `production`, `pipeline`.
- **Dose Prediction Models** — `Name [site/technique]; …`.

## Training data

`Training Data Description`, `Training Dataset Size`,
`Training Dataset Sources`, `Training Demographics`,
`Training Scanner Models`, `Training Institutions`, `Training Countries`,
`Training Public Datasets`, `Training Disclosure Level`,
`Training Data Source`, `Training Data Source URL`.

## Evaluation data

`Evaluation Description`, `Evaluation Dataset Size`, `Evaluation Sites`,
`Evaluation Countries`, `Evaluation Demographics`, `Evaluation Study Design`,
`Evaluation Primary Endpoint`, `Evaluation Results`,
`Evaluation Source`, `Evaluation Source URL`.

## Safety & integration

- **Safety Corrective Actions** — `type: description [identifier] (authority) — status; …`.
- **Compatible Systems**, **Training Required**, **Support Email**.

## Bookkeeping

- **Last Updated**, **Last Revised**, **Source**.

---

For interoperable formats, see also:

- **FHIR R4 Bundle** — HL7 FHIR Device + Organization resources.
- **HTA dossier** — EUnetHTA Core Model Excel workbook (informational).
- **AID-RT model card** — JSON aligned with the AID-RT schema
  (https://github.com/MIRO-UCLouvain/RT-AI-Model-Card).
- **Full bundle (ZIP)** — CSV + JSON + FHIR + manifest + README in one file.
