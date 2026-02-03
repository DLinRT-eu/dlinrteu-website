

# Ever Fortune AI Product Data Update

## Overview

Update the Ever Fortune product data to:
1. Clarify that Seg Pro V3 is version 3 of the original RT Suite product line
2. Link the two products showing the version evolution
3. Replace placeholder structures with the verified structure list from CMUH source
4. Add evidence links from CMUH (K231928 mentioned, journal articles)

---

## Key Findings from Sources

### FDA Clearances Timeline
| Version | FDA Number | Date | Scope |
|---------|------------|------|-------|
| RT Suite v1 | K220264 | 2022-04-28 | Head & Neck CT only |
| (K231928) | K231928 | ~2023 | Referenced on CMUH page, details TBD |
| Seg Pro V3 | K251306 | 2026-01-28 | Multi-region CT/MRI with PCCP |

### Verified Structure List from CMUH

**1. Head Model (MR)**
- Brainstem, Eye_L, Eye_R, Hippocampus_L, Hippocampus_R, Lens_L, Lens_R, OpticChiasm, OpticNrv_L, OpticNrv_R, Pituitary
- **Count: 11 structures**

**2. Pelvis-Male Model (MR)**
- Bladder, PenileBulb, Prostate, Rectum, SeminalVes
- **Count: 5 structures**

**3. Chest Model (CT)**
- General: Chestwall, Chestwall_L, Chestwall_R, Lungs, Lung_LLL, Lung_LUL, Lung_RLL, Lung_RML, Lung_RUL (9)
- Bones: Clavicle_L, Clavicle_R, Humerus_L, Humerus_R, Scapula_L, Scapula_R, Sternum (7)
- Ribs: Ribs, Ribs_L, Ribs_R, Rib01-12_L, Rib01-12_R (27)
- Vertebrae: VB_T, VB_T01-T12 (13)
- **Count: ~56 structures**

**4. Abdomen Model (CT)**
- Organs: Bowel, Bowel_Large, Bowel_Small, GI_Tract, Glnd_Adrenal_L, Glnd_Adrenal_R (6)
- Muscles: Gluteus, Gluteus_Max_L/R, Gluteus_Med_L/R, Gluteus_Min_L/R, Iliopsoas_L/R (9)
- Bones: Bone_Pelvic, Bone_Pelvic_L/R, Femur_L/R, Sacrum (6)
- Vertebrae: VB_L, VB_L1-L5, VB_LS, VB_S, VB_S1 (9)
- **Count: ~30 structures**

**Total Verified: ~102 structures** (company claims 182 - likely additional models not documented on CMUH page)

---

## Implementation Plan

### 1. Update RT Suite (Original v1) Entry

**Changes to `everfortune-rt-suite`:**

| Field | Old Value | New Value |
|-------|-----------|-----------|
| name | RT Suite (HCAP-Segmentation) | RT Suite v1 (HCAP-Segmentation) |
| version | 1.0 | 1.0 |
| Add `supersededBy` | - | Reference to Seg Pro V3 |
| description | Add note about being original version | Add "Original version" context |

### 2. Update Seg Pro V3 Entry

**Changes to `everfortune-seg-pro-v3`:**

| Field | Change |
|-------|--------|
| description | Add evolution context (successor to RT Suite) |
| features | Keep existing, verify alignment |
| supportedStructures | Replace with verified CMUH structure list |
| evidence | Add CMUH source link and journal articles |
| priorVersion | Add reference to K220264/RT Suite v1 |
| limitations | Update structure count note |
| source | Add CMUH reference |

### 3. Structure Naming Convention

Using the established pattern: `"Region: Structure Name"`

**Model to Region Mapping:**
- Head Model (MR) → `"Head-MR: StructureName"`
- Pelvis-Male Model (MR) → `"Pelvis-MR: StructureName"`
- Chest Model (CT) → `"Chest-CT: StructureName"`
- Abdomen Model (CT) → `"Abdomen-CT: StructureName"`

This distinguishes modality-specific models from generic regions.

### 4. Add Version Linking Field

Add a new optional field to ProductDetails type:
```typescript
// Version relationship for product evolution
priorVersions?: Array<{
  productId?: string;      // ID of prior version in database (if exists)
  name: string;            // Prior version name
  fdaClearance?: string;   // FDA clearance number
  notes?: string;          // What changed
}>;
supersededBy?: string;     // Product ID of newer version
```

---

## File Changes

### File 1: `src/types/productDetails.d.ts`

Add version tracking fields:
```typescript
// Version evolution tracking
priorVersions?: Array<{
  productId?: string;
  name: string;
  fdaClearance?: string;
  notes?: string;
}>;
supersededBy?: string;
```

### File 2: `src/data/products/auto-contouring/everfortune.ts`

**RT Suite v1 Updates:**
- Rename to "RT Suite v1 (HCAP-Segmentation)"
- Add `supersededBy: "everfortune-seg-pro-v3"`
- Update description to note it's the original version

**Seg Pro V3 Updates:**
- Add priorVersions reference to K220264
- Replace supportedStructures with verified list (102 structures across 4 models)
- Add CMUH evidence link
- Add journal article evidence links
- Update source field
- Update limitations to reflect verified count

### Complete Structure List for Seg Pro V3

```typescript
supportedStructures: [
  // Head Model (MR) - 11 structures
  "Head-MR: Brainstem",
  "Head-MR: Eye L",
  "Head-MR: Eye R",
  "Head-MR: Hippocampus L",
  "Head-MR: Hippocampus R",
  "Head-MR: Lens L",
  "Head-MR: Lens R",
  "Head-MR: Optic Chiasm",
  "Head-MR: Optic Nerve L",
  "Head-MR: Optic Nerve R",
  "Head-MR: Pituitary",

  // Pelvis-Male Model (MR) - 5 structures
  "Pelvis-MR: Bladder",
  "Pelvis-MR: Penile Bulb",
  "Pelvis-MR: Prostate",
  "Pelvis-MR: Rectum",
  "Pelvis-MR: Seminal Vesicles",

  // Chest Model (CT) - Organs (9)
  "Chest-CT: Chest Wall",
  "Chest-CT: Chest Wall L",
  "Chest-CT: Chest Wall R",
  "Chest-CT: Lungs",
  "Chest-CT: Lung LLL",
  "Chest-CT: Lung LUL",
  "Chest-CT: Lung RLL",
  "Chest-CT: Lung RML",
  "Chest-CT: Lung RUL",

  // Chest Model (CT) - Bones (7)
  "Chest-CT: Clavicle L",
  "Chest-CT: Clavicle R",
  "Chest-CT: Humerus L",
  "Chest-CT: Humerus R",
  "Chest-CT: Scapula L",
  "Chest-CT: Scapula R",
  "Chest-CT: Sternum",

  // Chest Model (CT) - Ribs (27)
  "Chest-CT: Ribs",
  "Chest-CT: Ribs L",
  "Chest-CT: Ribs R",
  "Chest-CT: Rib01 L", "Chest-CT: Rib02 L", ... "Chest-CT: Rib12 L",
  "Chest-CT: Rib01 R", "Chest-CT: Rib02 R", ... "Chest-CT: Rib12 R",

  // Chest Model (CT) - Vertebrae (13)
  "Chest-CT: VB T",
  "Chest-CT: VB T01", "Chest-CT: VB T02", ... "Chest-CT: VB T12",

  // Abdomen Model (CT) - Organs (6)
  "Abdomen-CT: Bowel",
  "Abdomen-CT: Bowel Large",
  "Abdomen-CT: Bowel Small",
  "Abdomen-CT: GI Tract",
  "Abdomen-CT: Adrenal L",
  "Abdomen-CT: Adrenal R",

  // Abdomen Model (CT) - Muscles (9)
  "Abdomen-CT: Gluteus",
  "Abdomen-CT: Gluteus Max L",
  "Abdomen-CT: Gluteus Max R",
  "Abdomen-CT: Gluteus Med L",
  "Abdomen-CT: Gluteus Med R",
  "Abdomen-CT: Gluteus Min L",
  "Abdomen-CT: Gluteus Min R",
  "Abdomen-CT: Iliopsoas L",
  "Abdomen-CT: Iliopsoas R",

  // Abdomen Model (CT) - Bones (6)
  "Abdomen-CT: Bone Pelvic",
  "Abdomen-CT: Bone Pelvic L",
  "Abdomen-CT: Bone Pelvic R",
  "Abdomen-CT: Femur L",
  "Abdomen-CT: Femur R",
  "Abdomen-CT: Sacrum",

  // Abdomen Model (CT) - Vertebrae (9)
  "Abdomen-CT: VB L",
  "Abdomen-CT: VB L1", ... "Abdomen-CT: VB L5",
  "Abdomen-CT: VB LS",
  "Abdomen-CT: VB S",
  "Abdomen-CT: VB S1"
]
```

### Evidence Section Update

Add to Seg Pro V3 evidence array:
```typescript
evidence: [
  // Existing FDA entries...
  {
    type: "Clinical Implementation",
    description: "CMUH Digital Imaging - EFAI RT Suite implementation details and version updates",
    link: "https://www.cmuh.cmu.edu.tw/CMUHPagesSubDetail/Smart%20Healthcare/DigitalImaging_new/EFAI%20RT%20Suite%20CT%20HCAP-Segmentation%20System_en"
  },
  {
    type: "Peer-reviewed Publication",
    description: "AI-assisted planning pipeline for hippocampal avoidance whole brain radiotherapy",
    link: "https://pubmed.ncbi.nlm.nih.gov/36773828/"
  },
  {
    type: "Peer-reviewed Publication",
    description: "Association of radiation dose to cardiac substructures with major ischaemic events following breast cancer radiotherapy",
    link: "https://pubmed.ncbi.nlm.nih.gov/37585426/"
  }
]
```

---

## Summary of Changes

| File | Action |
|------|--------|
| `src/types/productDetails.d.ts` | Add `priorVersions` and `supersededBy` fields |
| `src/data/products/auto-contouring/everfortune.ts` | Update both products with version linking and verified structures |

### Counts
- RT Suite v1: Minor updates (add supersededBy, name clarification)
- Seg Pro V3: ~102 verified structures from CMUH source, version linking, new evidence

