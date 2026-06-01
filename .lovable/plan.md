## Research and update evidence/limitations for 6 products

For each product, add `evidence[]` entries (peer-reviewed papers and/or vendor white papers/case studies as `"Vendor White Paper" / "Case Study"` types), add a `limitations[]` array, and verify/update the `version` field. Bump `lastRevised` to today and refresh `evidenceRigor*` / `clinicalImpact*` notes when new sources change the rubric.

### 1. PyMedix Autofuse — `src/data/products/registration/pymedix.ts`
- **Version**: current `2.1`; vendor website does not publish a numeric version. Keep `2.1` and add a `lastVerified` note in `source` ("Version not publicly published; retained 2.1 from prior revision"). 
- **⚠ Inclusion flag**: PyMedix explicitly markets Autofuse as **"not deep learning"** ("machine perception"). This conflicts with the AI/DL inclusion gate (`mem://constraints/ai-dl-technology-threshold`). I will flag this in `evidenceRigorNotes` so the catalogue maintainer can decide; I will **not** archive the entry without confirmation.
- **Evidence to add**:
  - Vendor White Paper: Pymedix Autofuse Brochure 2019 (https://pymedix.com/wp-content/uploads/2019/04/Pymedix-Autofuse-Brochure-2019.pdf)
  - FDA 510(k) Summary K233572 (https://fda.innolitics.com/submissions/RA/subpart-b%E2%80%94diagnostic-devices/LLZ/K233572)
- **Limitations**: vendor-only validation; no published peer-reviewed clinical accuracy study; non-DL approach; limited published institutional adoption data.

### 2. Canon AiCE MR — `src/data/products/reconstruction/canon.ts` (entry `canon-aice-mr`)
- **Version**: current `1.5`. Keep unless a higher version surfaces; note in `source` "version retained from vendor; not publicly versioned".
- **Evidence to add**:
  - Peer-reviewed: Akai H. et al., *BMC Med Imaging* 2023;23:5 — CS + commercial DLR knee MRI (independent, single-center). DOI 10.1186/s12880-023-00962-2
  - Vendor White Paper: "AiCE Interpretable Model with Robust and Generalized Performance: Beyond Brain and Knee MRI" (Canon, Do & Berkeley)
  - Case Study: UCSD spine MRI with AiCE DLR (McDonald, Canon Medical case study)
- **Bump rigor**: `E1` → `E2` (now has independent peer-reviewed validation), keep `I2`. Update `evidenceVendorIndependent: true`, `evidenceExternalValidation: true`.
- **Limitations**: validation skewed to single anatomy/site studies; no multi-center trial; reconstruction performance varies by sequence/anatomy; not specifically validated for RT planning workflow.

### 3. United Imaging uAIFI (CT) — `src/data/products/reconstruction/united-imaging.ts` (entry `united-uai-vision-recon`)
- **Version**: current `2.0`. Keep.
- **Evidence to add**:
  - Peer-reviewed: Liao S. et al., *Cell Rep Med* 2023;4(7):101119 — hybrid DL + iterative reconstruction (United Imaging authors; vendor-affiliated but peer-reviewed). DOI 10.1016/j.xcrm.2023.101119
  - Vendor product page (uAIFI Technology, global.united-imaging.com)
- **Bump rigor**: `E0` → `E1` (peer-reviewed but vendor-affiliated). Keep `I0` → consider `I1` (technical efficacy demonstrated).
- **Limitations**: vendor-affiliated authorship; no independent multi-center validation; specific to United Imaging hardware.

### 4. United Imaging uAIFI on uMR — `src/data/products/reconstruction/united-imaging.ts` (entry `united-uaifi-umr`)
- **Version**: current `2.0`. Keep.
- **Evidence to add**:
  - FDA 510(k) K222755 Summary (uMR 680, Feb 2023)
  - Vendor product pages (uMR 680 / uMR 670 with uAIFI DeepRecon)
  - DeepRecon predecessor 510(k) K193073
- **Limitations**: no independent peer-reviewed validation; clinical performance data limited to vendor materials; performance tied to specific uMR scanner generation.

### 5. GE MR Contour DL — `src/data/products/auto-contouring/ge-mr-contour-dl.ts`
- **Version**: not currently set; leave unset and note "vendor does not publicly version this module".
- **Evidence to add**:
  - FDA 510(k) K242925 Summary (cleared April 2025)
  - GE HealthCare ESTRO 2025 / ASTRO 2025 press releases describing MR Contour DL within the iRT MR Direct workflow
- **Limitations**: no independent peer-reviewed publications yet; recently cleared (2025); contour quality dependent on input MR sequence; user verification required per FDA labelling.

### 6. Elekta IRIS Evo — `src/data/products/reconstruction/elekta.ts`
- **Version**: current `2.0` (likely incorrect — Iris is the AI-CBCT module on Evo, not v2.0). Set `version` to `"1.0"` and note in `source` "Version not publicly published; provisional 1.0".
- **Evidence to add**:
  - Vendor brochure: "Go further with Versa HD — Iris high-definition AI-enhanced CBCT" (elekta.com PDF)
  - Elekta Focus article: "Novel AI-enhanced imaging will expand access to adaptive radiation therapy"
  - ITN press article on Elekta Evo launch (May 2024)
- **Limitations**: no independent peer-reviewed publications; recent product (2024 launch); validation limited to vendor whitepapers and press releases.

### Method & verification
- Sources gathered via `websearch--web_search` (logged today, 2026-06-01) — no new web fetches needed during build.
- Each new `evidence[]` item uses the existing object shape `{ type, description, link }` with type ∈ {"Peer-reviewed Publication", "Vendor White Paper", "Case Study", "FDA 510(k) Summary", "Press Release", "Product Information"}.
- Run `bunx tsc --noEmit -p tsconfig.app.json` after edits.

### Out of scope
- No schema or component changes.
- No archival decisions (Autofuse inclusion question is flagged in notes for maintainer review).
- No regulatory section changes other than the source notes above.
