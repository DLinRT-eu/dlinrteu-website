/**
 * SNOMED CT Body Structure Codes for Radiotherapy
 * 
 * Maps DLinRT anatomical location values to SNOMED CT coded concepts.
 * These codes are from the SNOMED CT Body Structure hierarchy.
 * 
 * @see http://snomed.info/sct
 */

import type { FHIRCoding, FHIRCodeableConcept } from "../types";

export const SNOMED_SYSTEM = "http://snomed.info/sct";

/**
 * SNOMED CT body structure codes for common radiotherapy treatment sites
 */
export const SNOMED_ANATOMY_MAP: Record<string, FHIRCoding> = {
  // Head and Neck Region
  "Head & Neck": {
    system: SNOMED_SYSTEM,
    code: "774007",
    display: "Head and/or neck structure"
  },
  "Head and Neck": {
    system: SNOMED_SYSTEM,
    code: "774007",
    display: "Head and/or neck structure"
  },
  "H&N": {
    system: SNOMED_SYSTEM,
    code: "774007",
    display: "Head and/or neck structure"
  },
  "Head": {
    system: SNOMED_SYSTEM,
    code: "69536005",
    display: "Head structure"
  },
  "Neck": {
    system: SNOMED_SYSTEM,
    code: "45048000",
    display: "Neck structure"
  },
  
  // Brain and CNS
  "Brain": {
    system: SNOMED_SYSTEM,
    code: "12738006",
    display: "Brain structure"
  },
  "CNS": {
    system: SNOMED_SYSTEM,
    code: "21483005",
    display: "Structure of central nervous system"
  },
  "Central Nervous System": {
    system: SNOMED_SYSTEM,
    code: "21483005",
    display: "Structure of central nervous system"
  },
  
  // Thorax and Chest
  "Thorax": {
    system: SNOMED_SYSTEM,
    code: "51185008",
    display: "Thoracic structure"
  },
  "Chest": {
    system: SNOMED_SYSTEM,
    code: "51185008",
    display: "Thoracic structure"
  },
  "Lung": {
    system: SNOMED_SYSTEM,
    code: "39607008",
    display: "Lung structure"
  },
  "Lungs": {
    system: SNOMED_SYSTEM,
    code: "39607008",
    display: "Lung structure"
  },
  
  // Breast
  "Breast": {
    system: SNOMED_SYSTEM,
    code: "76752008",
    display: "Breast structure"
  },
  
  // Abdomen
  "Abdomen": {
    system: SNOMED_SYSTEM,
    code: "818983003",
    display: "Abdomen"
  },
  "Abdominal": {
    system: SNOMED_SYSTEM,
    code: "818983003",
    display: "Abdomen"
  },
  "Liver": {
    system: SNOMED_SYSTEM,
    code: "10200004",
    display: "Liver structure"
  },
  "Pancreas": {
    system: SNOMED_SYSTEM,
    code: "15776009",
    display: "Pancreatic structure"
  },
  "Kidney": {
    system: SNOMED_SYSTEM,
    code: "64033007",
    display: "Kidney structure"
  },
  "GI": {
    system: SNOMED_SYSTEM,
    code: "122865005",
    display: "Gastrointestinal tract structure"
  },
  "Gastrointestinal": {
    system: SNOMED_SYSTEM,
    code: "122865005",
    display: "Gastrointestinal tract structure"
  },
  
  // Pelvis
  "Pelvis": {
    system: SNOMED_SYSTEM,
    code: "12921003",
    display: "Pelvic structure"
  },
  "Pelvic": {
    system: SNOMED_SYSTEM,
    code: "12921003",
    display: "Pelvic structure"
  },
  "Prostate": {
    system: SNOMED_SYSTEM,
    code: "41216001",
    display: "Prostatic structure"
  },
  "Bladder": {
    system: SNOMED_SYSTEM,
    code: "89837001",
    display: "Urinary bladder structure"
  },
  "Rectum": {
    system: SNOMED_SYSTEM,
    code: "34402009",
    display: "Rectum structure"
  },
  "Cervix": {
    system: SNOMED_SYSTEM,
    code: "71252005",
    display: "Cervix uteri structure"
  },
  "Uterus": {
    system: SNOMED_SYSTEM,
    code: "35039007",
    display: "Uterine structure"
  },
  "Gynecological": {
    system: SNOMED_SYSTEM,
    code: "76784001",
    display: "Female reproductive system structure"
  },
  
  // Spine
  "Spine": {
    system: SNOMED_SYSTEM,
    code: "421060004",
    display: "Spinal column structure"
  },
  "Spinal": {
    system: SNOMED_SYSTEM,
    code: "421060004",
    display: "Spinal column structure"
  },
  "Vertebral": {
    system: SNOMED_SYSTEM,
    code: "421060004",
    display: "Spinal column structure"
  },
  
  // Extremities
  "Extremities": {
    system: SNOMED_SYSTEM,
    code: "66019005",
    display: "Limb structure"
  },
  "Limbs": {
    system: SNOMED_SYSTEM,
    code: "66019005",
    display: "Limb structure"
  },
  "Upper Extremity": {
    system: SNOMED_SYSTEM,
    code: "53120007",
    display: "Upper limb structure"
  },
  "Lower Extremity": {
    system: SNOMED_SYSTEM,
    code: "61685007",
    display: "Lower limb structure"
  },
  
  // Skin and Soft Tissue
  "Skin": {
    system: SNOMED_SYSTEM,
    code: "39937001",
    display: "Skin structure"
  },
  "Soft Tissue": {
    system: SNOMED_SYSTEM,
    code: "87784001",
    display: "Soft tissue"
  },
  
  // Lymph Nodes
  "Lymph Nodes": {
    system: SNOMED_SYSTEM,
    code: "59441001",
    display: "Lymph node structure"
  },
  "Lymphatic": {
    system: SNOMED_SYSTEM,
    code: "89890002",
    display: "Lymphatic system structure"
  },
  
  // Bone
  "Bone": {
    system: SNOMED_SYSTEM,
    code: "272673000",
    display: "Bone structure"
  },
  "Skeletal": {
    system: SNOMED_SYSTEM,
    code: "113192009",
    display: "Skeletal system structure"
  },
  
  // Whole Body / Multiple Sites
  "Whole Body": {
    system: SNOMED_SYSTEM,
    code: "38266002",
    display: "Entire body"
  },
  "Multiple Sites": {
    system: SNOMED_SYSTEM,
    code: "38266002",
    display: "Entire body"
  },
  "All": {
    system: SNOMED_SYSTEM,
    code: "38266002",
    display: "Entire body"
  },
  "Any": {
    system: SNOMED_SYSTEM,
    code: "38266002",
    display: "Entire body"
  },
  
  // Organs at Risk (OARs) commonly contoured
  "Heart": {
    system: SNOMED_SYSTEM,
    code: "80891009",
    display: "Heart structure"
  },
  "Esophagus": {
    system: SNOMED_SYSTEM,
    code: "32849002",
    display: "Esophageal structure"
  },
  "Spinal Cord": {
    system: SNOMED_SYSTEM,
    code: "2748008",
    display: "Spinal cord structure"
  },
  "Parotid": {
    system: SNOMED_SYSTEM,
    code: "45289007",
    display: "Parotid gland structure"
  },
  "Eye": {
    system: SNOMED_SYSTEM,
    code: "81745001",
    display: "Eye structure"
  },
  "Optic Nerve": {
    system: SNOMED_SYSTEM,
    code: "18234004",
    display: "Optic nerve structure"
  },
  "Brainstem": {
    system: SNOMED_SYSTEM,
    code: "15926001",
    display: "Brainstem structure"
  },
  "Cochlea": {
    system: SNOMED_SYSTEM,
    code: "80169004",
    display: "Cochlear structure"
  },
  "Larynx": {
    system: SNOMED_SYSTEM,
    code: "4596009",
    display: "Laryngeal structure"
  },
  "Mandible": {
    system: SNOMED_SYSTEM,
    code: "91609006",
    display: "Mandibular structure"
  },
  "Oral Cavity": {
    system: SNOMED_SYSTEM,
    code: "74262004",
    display: "Oral cavity structure"
  },
  "Pharynx": {
    system: SNOMED_SYSTEM,
    code: "54066008",
    display: "Pharyngeal structure"
  }
};

/**
 * Get SNOMED CT coding for an anatomical location
 * @param location - DLinRT anatomical location string
 * @returns FHIR Coding or null if not found
 */
export function getAnatomyCoding(location: string): FHIRCoding | null {
  // Try exact match first
  if (SNOMED_ANATOMY_MAP[location]) {
    return { ...SNOMED_ANATOMY_MAP[location] };
  }
  
  // Try case-insensitive match
  const normalizedLocation = location.trim();
  for (const [key, coding] of Object.entries(SNOMED_ANATOMY_MAP)) {
    if (key.toLowerCase() === normalizedLocation.toLowerCase()) {
      return { ...coding };
    }
  }
  
  // Try partial match (contains)
  for (const [key, coding] of Object.entries(SNOMED_ANATOMY_MAP)) {
    if (
      normalizedLocation.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalizedLocation.toLowerCase())
    ) {
      return { ...coding };
    }
  }
  
  return null;
}

/**
 * Convert an array of anatomical locations to FHIR CodeableConcepts
 * @param locations - Array of DLinRT anatomical location strings
 * @returns Array of FHIR CodeableConcepts with SNOMED CT codes
 */
export function getAnatomyCodeableConcepts(locations: string[]): FHIRCodeableConcept[] {
  const uniqueCodings = new Map<string, FHIRCoding>();
  
  for (const location of locations) {
    const coding = getAnatomyCoding(location);
    if (coding) {
      uniqueCodings.set(coding.code, coding);
    }
  }
  
  return Array.from(uniqueCodings.values()).map(coding => ({
    coding: [coding],
    text: coding.display
  }));
}

/**
 * Get all unmapped anatomical locations from a list
 * @param locations - Array of DLinRT anatomical location strings
 * @returns Array of locations that couldn't be mapped to SNOMED CT
 */
export function getUnmappedAnatomies(locations: string[]): string[] {
  return locations.filter(loc => !getAnatomyCoding(loc));
}

/**
 * Check if an anatomical location can be mapped to SNOMED CT
 * @param location - DLinRT anatomical location string
 * @returns True if mapping exists
 */
export function hasAnatomyMapping(location: string): boolean {
  return getAnatomyCoding(location) !== null;
}
