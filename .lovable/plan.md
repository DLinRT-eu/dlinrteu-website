

# Update Synaptiq Mediq RT: Multi-Modality & Evidence

## Changes

### 1. Update modality and technical specs

**Current**: `modality: ["CT"]`, `input: ["CT"]`

**New**:
- `modality: ["CT", "MRI", "PET/CT"]` — segmentation supported on CT and MRI; registration supported for MRI, PET/CT, and CT
- `input: ["CT", "MRI", "PET/CT"]`
- Update `description` to mention multi-modality registration (MRI, PET/CT, CT) and segmentation on CT and MRI
- Add key feature: "Image registration for MRI, PET/CT, and CT modalities"

### 2. Add secondary category

Add `secondaryCategories: ["Registration"]` since image registration is a distinct capability beyond auto-contouring.

### 3. Update evidence classification to E1

The PHIRO journal paper (doi:10.1016/j.phro.2026.100935) is a **peer-reviewed journal publication**. Combined with the ESTRO 2025 conference abstracts, this constitutes published evidence — but it appears to be a single study (likely vendor-associated), not multi-center/multi-national independent validation.

**Rating**: **E1** (peer-reviewed publication, limited independence)
- E0 → E1 upgrade justified by the PHIRO paper
- Not E2: would require multiple independent studies or clear vendor-independent design
- Clinical impact remains **I0** (no demonstrated clinical outcome change yet; the paper is a comparative technical analysis)

### 4. Add structured evidence entries

Add `evidence` array with:
1. PHIRO paper — type: "journal", with DOI link
2. Four ESTRO 2025 abstracts — type: "conference", with page references

### 5. File changes

**Single file**: `src/data/products/auto-contouring/synaptiq.ts`

- `modality`: `["CT"]` → `["CT", "MRI", "PET/CT"]`
- `technicalSpecifications.input`: `["CT"]` → `["CT", "MRI", "PET/CT"]`
- `description`: add mention of multi-modality registration and segmentation capabilities
- `secondaryCategories`: add `["Registration"]`
- `keyFeatures`: add registration and multi-modality segmentation entries
- `evidence`: add structured array with the 5 publications
- `evidenceRigor`: `"E0"` → `"E1"`
- `evidenceRigorNotes`: update to reference the PHIRO paper and ESTRO abstracts
- `lastRevised`: update to `"2026-03-27"`
- `source`: update to include PHIRO and ESTRO references

