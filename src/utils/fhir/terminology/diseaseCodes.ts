/**
 * Disease/Condition Codes for Radiotherapy
 * 
 * Maps DLinRT disease target values to ICD-10 and SNOMED CT codes.
 * Primarily focused on oncology conditions treated with radiotherapy.
 * 
 * @see https://icd.who.int/browse10
 * @see http://snomed.info/sct
 */

import type { FHIRCoding, FHIRCodeableConcept } from "../types";

export const ICD10_SYSTEM = "http://hl7.org/fhir/sid/icd-10";
export const SNOMED_SYSTEM = "http://snomed.info/sct";

interface DiseaseMapping {
  icd10?: FHIRCoding;
  snomed?: FHIRCoding;
}

/**
 * Disease target mappings with both ICD-10 and SNOMED CT codes where available
 */
export const DISEASE_MAP: Record<string, DiseaseMapping> = {
  // General Cancer / Multiple Types
  "Cancer": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "363346000",
      display: "Malignant neoplastic disease"
    }
  },
  "Multiple Cancer Types": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "363346000",
      display: "Malignant neoplastic disease"
    }
  },
  "Oncology": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "363346000",
      display: "Malignant neoplastic disease"
    }
  },
  "Malignancy": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "363346000",
      display: "Malignant neoplastic disease"
    }
  },
  
  // Head and Neck Cancers
  "Head & Neck Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C00-C14",
      display: "Malignant neoplasms of lip, oral cavity and pharynx"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "255055008",
      display: "Malignant tumor of head and/or neck"
    }
  },
  "Head and Neck Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C00-C14",
      display: "Malignant neoplasms of lip, oral cavity and pharynx"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "255055008",
      display: "Malignant tumor of head and/or neck"
    }
  },
  "Oral Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C00-C06",
      display: "Malignant neoplasm of lip and oral cavity"
    }
  },
  "Oropharyngeal Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C10",
      display: "Malignant neoplasm of oropharynx"
    }
  },
  "Nasopharyngeal Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C11",
      display: "Malignant neoplasm of nasopharynx"
    }
  },
  "Laryngeal Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C32",
      display: "Malignant neoplasm of larynx"
    }
  },
  "Thyroid Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C73",
      display: "Malignant neoplasm of thyroid gland"
    }
  },
  
  // Brain Tumors
  "Brain Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C71",
      display: "Malignant neoplasm of brain"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "126952004",
      display: "Neoplasm of brain"
    }
  },
  "Brain Tumor": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C71",
      display: "Malignant neoplasm of brain"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "126952004",
      display: "Neoplasm of brain"
    }
  },
  "Glioblastoma": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C71",
      display: "Malignant neoplasm of brain"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "393563007",
      display: "Glioblastoma multiforme"
    }
  },
  "GBM": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C71",
      display: "Malignant neoplasm of brain"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "393563007",
      display: "Glioblastoma multiforme"
    }
  },
  "Meningioma": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "308201001",
      display: "Meningioma"
    }
  },
  "Brain Metastases": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "94225005",
      display: "Secondary malignant neoplasm of brain"
    }
  },
  
  // Lung Cancer
  "Lung Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C34",
      display: "Malignant neoplasm of bronchus and lung"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "254637007",
      display: "Non-small cell lung cancer"
    }
  },
  "NSCLC": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C34",
      display: "Malignant neoplasm of bronchus and lung"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "254637007",
      display: "Non-small cell lung cancer"
    }
  },
  "SCLC": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C34",
      display: "Malignant neoplasm of bronchus and lung"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "254632001",
      display: "Small cell carcinoma of lung"
    }
  },
  
  // Breast Cancer
  "Breast Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C50",
      display: "Malignant neoplasm of breast"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "254837009",
      display: "Malignant neoplasm of breast"
    }
  },
  
  // Prostate Cancer
  "Prostate Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C61",
      display: "Malignant neoplasm of prostate"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "399068003",
      display: "Malignant tumor of prostate"
    }
  },
  
  // GI Cancers
  "Colorectal Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C18-C20",
      display: "Malignant neoplasm of colon and rectum"
    }
  },
  "Rectal Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C20",
      display: "Malignant neoplasm of rectum"
    }
  },
  "Esophageal Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C15",
      display: "Malignant neoplasm of esophagus"
    }
  },
  "Pancreatic Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C25",
      display: "Malignant neoplasm of pancreas"
    }
  },
  "Liver Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C22",
      display: "Malignant neoplasm of liver and intrahepatic bile ducts"
    }
  },
  "HCC": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C22.0",
      display: "Hepatocellular carcinoma"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "25370001",
      display: "Hepatocellular carcinoma"
    }
  },
  
  // Gynecological Cancers
  "Cervical Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C53",
      display: "Malignant neoplasm of cervix uteri"
    }
  },
  "Endometrial Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C54",
      display: "Malignant neoplasm of corpus uteri"
    }
  },
  "Ovarian Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C56",
      display: "Malignant neoplasm of ovary"
    }
  },
  "Gynecological Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C51-C58",
      display: "Malignant neoplasms of female genital organs"
    }
  },
  
  // Other Common Sites
  "Bladder Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C67",
      display: "Malignant neoplasm of bladder"
    }
  },
  "Kidney Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C64",
      display: "Malignant neoplasm of kidney"
    }
  },
  "Skin Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C43-C44",
      display: "Malignant neoplasm of skin"
    }
  },
  "Melanoma": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C43",
      display: "Malignant melanoma of skin"
    },
    snomed: {
      system: SNOMED_SYSTEM,
      code: "372244006",
      display: "Malignant melanoma"
    }
  },
  
  // Lymphomas
  "Lymphoma": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C81-C86",
      display: "Malignant neoplasms of lymphoid tissue"
    }
  },
  "Hodgkin Lymphoma": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C81",
      display: "Hodgkin lymphoma"
    }
  },
  "Non-Hodgkin Lymphoma": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C82-C86",
      display: "Non-Hodgkin lymphoma"
    }
  },
  
  // Sarcomas
  "Sarcoma": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "424413001",
      display: "Sarcoma"
    }
  },
  "Soft Tissue Sarcoma": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C49",
      display: "Malignant neoplasm of other connective and soft tissue"
    }
  },
  
  // Bone
  "Bone Cancer": {
    icd10: {
      system: ICD10_SYSTEM,
      code: "C40-C41",
      display: "Malignant neoplasm of bone and articular cartilage"
    }
  },
  "Bone Metastases": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "94222008",
      display: "Secondary malignant neoplasm of bone"
    }
  },
  
  // Metastatic Disease
  "Metastatic Disease": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "128462008",
      display: "Metastatic malignant neoplasm"
    }
  },
  "Metastases": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "128462008",
      display: "Metastatic malignant neoplasm"
    }
  },
  "Oligometastases": {
    snomed: {
      system: SNOMED_SYSTEM,
      code: "128462008",
      display: "Metastatic malignant neoplasm"
    }
  }
};

/**
 * Get disease coding (prefers SNOMED CT, falls back to ICD-10)
 * @param disease - DLinRT disease target string
 * @returns FHIR Coding or null if not found
 */
export function getDiseaseCoding(disease: string): FHIRCoding | null {
  const mapping = findDiseaseMapping(disease);
  if (!mapping) return null;
  
  // Prefer SNOMED CT, fall back to ICD-10
  return mapping.snomed ? { ...mapping.snomed } : mapping.icd10 ? { ...mapping.icd10 } : null;
}

/**
 * Get all available codings for a disease (both ICD-10 and SNOMED if available)
 * @param disease - DLinRT disease target string
 * @returns Array of FHIR Codings
 */
export function getAllDiseaseCodings(disease: string): FHIRCoding[] {
  const mapping = findDiseaseMapping(disease);
  if (!mapping) return [];
  
  const codings: FHIRCoding[] = [];
  if (mapping.snomed) codings.push({ ...mapping.snomed });
  if (mapping.icd10) codings.push({ ...mapping.icd10 });
  
  return codings;
}

/**
 * Find disease mapping with case-insensitive and partial matching
 */
function findDiseaseMapping(disease: string): DiseaseMapping | null {
  // Try exact match
  if (DISEASE_MAP[disease]) {
    return DISEASE_MAP[disease];
  }
  
  // Try case-insensitive match
  const normalizedDisease = disease.trim().toLowerCase();
  for (const [key, mapping] of Object.entries(DISEASE_MAP)) {
    if (key.toLowerCase() === normalizedDisease) {
      return mapping;
    }
  }
  
  // Try partial match
  for (const [key, mapping] of Object.entries(DISEASE_MAP)) {
    if (
      normalizedDisease.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalizedDisease)
    ) {
      return mapping;
    }
  }
  
  return null;
}

/**
 * Convert an array of diseases to FHIR CodeableConcepts
 * @param diseases - Array of DLinRT disease target strings
 * @returns Array of FHIR CodeableConcepts
 */
export function getDiseaseCodeableConcepts(diseases: string[]): FHIRCodeableConcept[] {
  const results: FHIRCodeableConcept[] = [];
  const seenCodes = new Set<string>();
  
  for (const disease of diseases) {
    const codings = getAllDiseaseCodings(disease);
    for (const coding of codings) {
      const key = `${coding.system}|${coding.code}`;
      if (!seenCodes.has(key)) {
        seenCodes.add(key);
        results.push({
          coding: [coding],
          text: coding.display
        });
      }
    }
  }
  
  return results;
}

/**
 * Get unmapped diseases from a list
 * @param diseases - Array of DLinRT disease target strings
 * @returns Array of diseases that couldn't be mapped
 */
export function getUnmappedDiseases(diseases: string[]): string[] {
  return diseases.filter(d => !getDiseaseCoding(d));
}

/**
 * Check if a disease can be mapped
 * @param disease - DLinRT disease target string
 * @returns True if mapping exists
 */
export function hasDiseaseMapping(disease: string): boolean {
  return getDiseaseCoding(disease) !== null;
}
