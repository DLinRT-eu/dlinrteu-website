

## Plan: Update RadFormation AutoContour to v2.7

Update `src/data/products/auto-contouring/radformation.ts` to reflect AutoContour v2.7, which unifies AutoContour and Limbus Contour into one platform with 480 AI-trained models (115 lymph node models) across CT, MR, and CBCT.

### Key product info changes

| Field | From | To |
|---|---|---|
| `version` | `"5.0"` | `"2.7"` (vendor renumbered after Limbus unification) |
| `releaseDate` | `2026-03-19` (V5 K260509) | `2026-03-19` — keep; v2.7 is the unified-platform branding of the same FDA-cleared release. Add note in `regulatory.fda.notes`. |
| `description` | "Cloud-based auto-contouring..." | "Unified AI-driven contouring platform (AutoContour + Limbus Contour) delivering fast, guideline-based contouring across CT, MR, and CBCT, with seamless Eclipse and DICOM-compatible TPS integration." |
| `keyFeatures` | "240+ structure models..." | Replace with: "480 AI-trained models (115 lymph node models)", "CT, MR & CBCT support", "Aligned with RTOG/NRG/RADCOMP/ESTRO/DAHANCA/EORTC guidelines", "TG-263 nomenclature", "Eclipse integration & DICOM vendor-neutral", "Deformable registration & re-irradiation workflows", "Unified AutoContour + Limbus Contour platform" |
| `anatomicalLocation` | adds "Brain", removes duplicate "Chest" | `["Brain", "Head & Neck", "Thorax", "Abdomen", "Pelvis", "Breast"]` |
| `modality` | `["CT", "MRI"]` | `["CT", "MRI", "CBCT"]` |
| `technicalSpecifications.input` | `["CT", "MRI"]` | `["CT", "MRI", "CBCT"]` |
| `technology.integration` | adds Eclipse | `["Eclipse (read/write)", "TPS integration (DICOM)", "Cloud API", "ESAPI"]` |
| `technology.deployment` | `["Cloud-based"]` | `["Cloud-based", "On-premises"]` (vendor mentions "cloud based or local resources") |
| `lastUpdated` / `lastRevised` | `2026-04-17` | today |
| `source` | … | append "Vendor product page (v2.7), accessed today" |

### Supported structures rewrite

Replace the entire `supportedStructures` array with the v2.7 model atlas, organized by the vendor's groups and following the `Region: Structure Name` convention (mem `data/structure-naming-convention-v3`). New groups added: **Brain MR**, **Male Pelvis MR**, **HDR Female Pelvis MR**, **Male Pelvis CBCT**, **Breast Nodes**, **Head & Neck Nodes** (expanded), **MultiSite** (vertebrae, ribs, skin). L/R suffixed entries are expanded into two separate entries each (matching the existing file convention). Total expected: ~470 entries (vendor states 480 models — small delta because some "models" are variants like 2d/3d versions which we collapse where they refer to the same anatomy under different acquisition rules).

Region prefixes used:
- `Head & Neck:` (CT) — 84 models
- `Head & Neck Nodes:` — 49 models
- `Breast:` — 47 models
- `Breast Nodes:` — 58 models
- `Thorax:` — 57 models
- `Abdomen:` — 25 models
- `Pelvis (Male):` — 58 models
- `Pelvis (Female):` — 48 models
- `HDR Female Pelvis:` — 9 models
- `Brain MR:` — 34 models
- `Pelvis (Male) MR:` — 21 models
- `HDR Female Pelvis MR:` — 7 models
- `Pelvis (Male) CBCT:` — 7 models
- `MultiSite:` — 58 models

### Out of scope

- Evidence section: keep existing E2/I2 rating and three publications (Doolan 2023, Fan 2025, Kim 2024) — vendor page does not change clinical evidence.
- Regulatory section: `K260509` clearance unchanged; only update `notes` to mention the v2.7 commercial naming.
- Logo, IDs, URLs: unchanged.

### Files touched

- `src/data/products/auto-contouring/radformation.ts` — single file edit.

