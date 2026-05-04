## Confirmation
- MedCom and ProSoma are **not** currently in the catalogue (no matches in `src/data/`).
- The MedCom logo is **not** present in `public/logos/` (no `medcom*` file exists). It will need to be added.

## Plan

### 1. Add company logo
- Download MedCom logo from `https://www.medcom-online.de/wp-content/uploads/2023/08/MedCom-Medical-software-solutions-logo-Defult.png` to `public/logos/medcom.png`.

### 2. Register the company
File: `src/data/companies/auto-contouring.ts` — append a new entry:
- `id: "medcom"`, `name: "MedCom"`, website `https://www.medcom-online.de/`, logo `/logos/medcom.png`, `productIds: ["medcom-prosoma-dart"]`, primaryTask Auto-Contouring.

### 3. Create the product file
New file: `src/data/products/auto-contouring/medcom.ts` exporting `MEDCOM_PRODUCTS: ProductDetails[]` with one product:
- `id: "medcom-prosoma-dart"`, name `"ProSoma Dart AI Segmentation Engine"`, company `"MedCom"`.
- URLs: `companyUrl` https://www.medcom-online.de/, `productUrl` https://www.medcom-online.de/products/radiation-oncology/prosoma/, githubUrl pointing to the new file.
- Category `"Auto-Contouring"`.
- Anatomical locations: Head & Neck, Prostate, Breast.
- Modality: CT (primary RT planning modality on which ProSoma Dart operates).
- Description summarising the fully-automatic anatomical contouring engine, available as configurable H&N, Prostate, and Mamma modules; integrates via DICOM transfer or interactive trigger from ProSoma frontend; GPU-accelerated or CPU-only.
- Key features: modular per-region deployment, DICOM/RT integration, GPU acceleration, runs alongside ProSoma RT toolkit.
- Technical specs: input CT/DICOM, output Structure sets/DICOM-RTSTRUCT.
- Technology: integration with ProSoma; deployment local; trigger manual or DICOM-routed.
- Regulatory:
  - CE: Class IIa, MDD 93/42/EEC legacy device under MDR 2017/745 Article 120(3c) — status "CE Marked".
  - FDA: status `"Not specified"` with note that no FDA clearance is publicly documented.
- Evidence: `evidenceRigor: "E0"`, `clinicalImpact: "I0"` with note "No peer-reviewed validation studies identified at time of listing — pending verification" (matches existing convention for products lacking published evidence).
- Structure status: mark structures as `(unverified)` per project nomenclature rule until vendor confirms.
- `usesAI: true`, `companyRevisionDate` left default.

### 4. Wire into the index
Edit `src/data/products/auto-contouring/index.ts`:
- Import `MEDCOM_PRODUCTS` and spread it into `AUTO_CONTOURING_PRODUCTS`.

### 5. Notes / caveats surfaced to user
- FDA status, evidence/publications, version, and on-market year are not publicly documented; entered conservatively (E0/I0, FDA "Not specified"). The product page will show the "(unverified)" markers and can be upgraded once MedCom confirms via the certification workflow.
- Logo URL above is the documented MedCom default; if the download fails, fall back to a screenshot from the homepage or leave logo blank.
