## Objective
Extend the Mediq RT entry (`src/data/products/auto-contouring/synaptiq.ts`) with vendor-provided system requirements and a much larger, properly-categorised structure list. No other product is touched.

## Changes

### 1. Structure list (`supportedStructures`)
Replace the current ~60-entry list with a fuller list reflecting the vendor counts:
- Head & Neck: 48 OARs + 29 lymph-node levels (LN_Neck I–VII subdivisions, L/R)
- Thorax: 37 OARs
- Breast nodal CTVs: 25 (standard) + 16 (ESTRO consensus subset)
- Abdomen: 25 OARs
- Pelvis: 35 OARs + 10 lymph-node levels (iliac chains, presacral, inguinal, obturator)

Naming will follow the project's `Region: Structure Name` convention, matching the vocabulary already used by peer auto-contouring products (Limbus, MVision, etc.) so that the compare-structures matrix lines up. Where the vendor's exact label is unknown, we will mirror existing peer labels (e.g. `Head & Neck: LN_Neck_II_L`, `Thorax: LN_Ax_L1_L`, `Pelvis: LN_Iliac_Ext_L`, `Breast: LN_Breast_IMN_L`, etc.). Items that cannot be confirmed against the vendor's documentation will carry the existing `(unverified)` suffix per the project's structure-status convention; abdominal entries that were previously `(unverified)` will remain so until the vendor's full list arrives.

A short comment block above the array will note that the list approximates the vendor's published counts and will be replaced once the complete vendor list is supplied.

### 2. System requirements
Add the vendor-provided hardware/OS/browser requirements without introducing a new schema field (minimal-intervention rule). Two existing fields will carry this:

- `technology.deployment` → set to `["Cloud-based (SaaS)", "Self-hosted (on-premises)", "Desktop (Windows 10+/MacOS 10+)", "Mobile/tablet (iPad Pro 2021+)"]` so the deployment modes are visible on the product card.
- `description` → append a concise "System requirements" paragraph summarising the three components (Mediq Viewer, Mediq Agent, Mediq Server) with their minimum specs, in the same prose style as the rest of the description. Verbatim vendor wording is condensed to fit; the source line in `source` is extended to cite the vendor's System Requirements documentation page (dated 2026-06-10).

### 3. Metadata
- `lastUpdated` → `"2026-06-10"`
- `source` → append reference to vendor System Requirements documentation.

## Out of scope
- The pipeline product (`synaptiq-mediq-rt-4dct-pipeline`) is not modified.
- No changes to the `ProductDetails` type, UI components, or any other product file.
- No backend/database changes.
- A fully verbatim structure list will be applied in a future revision when the vendor supplies the complete catalogue; this revision uses the count-matched approximation.

## Technical details
- File touched: `src/data/products/auto-contouring/synaptiq.ts` only.
- Structure entries are plain strings in `supportedStructures: string[]`; no import of the Limbus structure constants is added (kept self-contained for this product).
- Total new structure count target: 48 + 29 + 37 + 25 + 16 + 25 + 35 + 10 = **225 entries**.
