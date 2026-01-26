
# Plan: Update Radformation AutoContour Supported Structures

## Overview

Update the `supportedStructures` array in the Radformation AutoContour product with the comprehensive new structure list, following the project naming convention (`"Region: Structure Name"`) and expanding vertebrae into individual entries.

---

## Key Requirements

1. **Expand vertebrae into individual entries** so they are correctly counted:
   - Cervical: C1, C2, C3, C4, C5, C6, C7 (7 structures)
   - Thoracic: T01, T02, ... T12 (12 structures)
   - Lumbar: L1, L2, L3, L4, L5 (5 structures)

2. **Expand bilateral structures** into L/R entries

3. **Expand ribs** into individual entries (Rib 01-12 L/R = 24 structures)

4. **Follow naming convention**: `"Region: Structure Name"`

---

## File to Modify

**File:** `src/data/products/auto-contouring/radformation.ts`

---

## Complete Structure List by Region

### Head & Neck (CT) - 58 entries
Individual structures including:
- A Carotid L, A Carotid R
- A Brachiocephls
- A Subclavian L, A Subclavian R
- Bone Hyoid, Bone Teeth, Brain, Brainstem, Buccal Mucosa
- **Cervical Vertebrae C1, C2, C3, C4, C5, C6, C7** (7 separate entries)
- Cochlea L, Cochlea R
- Cornea L, Cornea R
- Dental Artifact
- Ear Internal L, Ear Internal R
- Eye L, Eye R
- Hippocampus L, Hippocampus R
- Lacrimal L, Lacrimal R
- Larynx Glottic, Larynx NRG, Larynx SG
- Lens L, Lens R, Lips
- Macula L, Macula R, Mandible
- Neck Lymph Nodes (multiple level combinations)
- Optic Chiasm, Optic Nerve L, Optic Nerve R
- Oral Cavity, Oral Cavity Ext
- Parotid L, Parotid R
- Pharyngeal Constrictors, Pharynx (Oropharynx)
- Pituitary
- Post Neck L, Post Neck R, Neck IB L, Neck IB R
- Retina L, Retina R, Skull
- Submandibular L, Submandibular R
- Temporal Lobe L, Temporal Lobe R, Thyroid
- V Brachiceph L, V Brachiceph R
- V Jugular L, V Jugular R

### Head & Neck MR - 21 entries
- Brain, Brainstem, Cerebellum
- Eye L, Eye R
- Hippocampus L, Hippocampus R
- Hypothalamus L, Hypothalamus R, Hypothalamus True
- Lens L, Lens R
- Optic Chiasm, Optic Nerve L, Optic Nerve R
- Optic Tract L, Optic Tract R
- Pituitary, SpinalCord Cerv

### Chest - 71 entries
Including:
- A Coronary R, Atrium L, Atrium R
- Aorta Full, Aorta Asc, Aorta Desc
- Axillary Lymph Nodes (Levels I, II, III - RTOG, ESTRO variants)
- Brachial Plexus L, Brachial Plexus R
- Breast L, Breast R, Breast Prone
- Bronchus, Carina, Chestwall
- Clavicle L, Clavicle R, Esophagus
- Heart, Heart Prone
- Humerus L, Humerus R
- iNpEC ESTRO Lymph Nodes L, iNpEC ESTRO Lymph Nodes R
- Internal Mammary Lymph Nodes (RTOG, RADCOMP variants)
- LAD Artery, Lung L, Lung R
- Myocardium, Nipple L, Nipple R, Nipple Prone
- Pericardium, Pulmonary Artery
- **Ribs 01-12 L/R** (24 separate entries)
- Sternum
- Supraclavicular Lymph Nodes (RTOG, RADCOMP, ESTRO)
- **Thoracic Vertebrae T01-T12** (12 separate entries)
- Trachea, Vena Cava Inferior, Vena Cava Superior
- Ventricle L, Ventricle R

### Abdomen - 24 entries
- Aorta Full, Aorta Asc, Aorta Desc
- Body
- Bowel Bag, Bowel Loops, Bowel Sm, Bowel Lg
- Duodenum, Esophagus, Gallbladder
- Kidney L, Kidney R
- Kidney Minus Hilum L, Kidney Minus Hilum R
- Liver, Pancreas, Spleen
- Spinal Canal, Spinal Cord, Stomach
- **Thoracic Vertebrae T01-T12** (12 separate entries)
- Vena Cava Inferior
- Vertebrae All

### Pelvis (CT) - 53 entries
Including:
- Bladder M, Bladder F
- Bowel Bag, Bowel Loops, Bowel Sm, Bowel Lg
- Cauda Equina
- Femur L, Femur R, Femur Head L, Femur Head R, Femur RTOG
- Foley Balloon, Genitals M, Genitals F
- HDR Bladder, HDR Bowel, HDR Cylinder, HDR Rectum
- Iliac L, Iliac R, Iliac Crest L, Iliac Crest R
- Iliac Int L, Iliac Int R
- Iliac Marrow L, Iliac Marrow R
- Inguinofemoral Lymph Nodes L, Inguinofemoral Lymph Nodes R
- **Lumbar Vertebrae L1, L2, L3, L4, L5** (5 separate entries)
- Pelvic F Lymph Nodes, Presacral Lymph Nodes
- Musc Iliopsoas L, Musc Iliopsoas R
- Paraaortic Lymph Nodes, Pelvic Bones
- Pelvic Lymph Nodes NRG
- Penile Bulb, Prostate, ProstateBed
- Rectum M, Rectum F
- SacralPlex L, SacralPlex R
- Seminal Vesicles, Sigmoid Colon, Utero Cervix

### Pelvis MR - 18 entries
- A Pud Int L, A Pud Int R
- Bladder, Bladder Trigone
- Colon Sigmoid, External Pelvis
- Femur L, Femur R
- NVB L, NVB R
- PenileBulb, Prostate, Prostate Gland
- Rectal Spacer, Rectum
- Seminal Vesicles, Urethra

---

## Total Structure Count

| Region | Entries |
|--------|---------|
| Head & Neck | ~58 |
| Head & Neck MR | ~21 |
| Chest | ~71 |
| Abdomen | ~24 |
| Pelvis | ~53 |
| Pelvis MR | ~18 |
| **Total** | **~245** |

---

## Additional Updates

| Field | Current | Updated |
|-------|---------|---------|
| `keyFeatures` | "95+ structure models" | "240+ structure models" |
| `lastRevised` | "2026-01-02" | "2026-01-26" |

---

## Summary

Replace the entire `supportedStructures` array (lines 22-100) with the expanded list containing ~245 individually defined structures, with vertebrae (C1-C7, T01-T12, L1-L5) and ribs each on separate rows for accurate counting.
