/**
 * DICOM Modality Codes for Radiotherapy
 * 
 * Maps DLinRT modality values to DICOM acquisition modality codes.
 * Based on DICOM CID 29 (Acquisition Modality) and related value sets.
 * 
 * @see http://dicom.nema.org/resources/ontology/DCM
 * @see https://dicom.nema.org/medical/dicom/current/output/chtml/part16/sect_CID_29.html
 */

import type { FHIRCoding, FHIRCodeableConcept } from "../types";

export const DICOM_SYSTEM = "http://dicom.nema.org/resources/ontology/DCM";
export const SRT_SYSTEM = "http://snomed.info/srt";

/**
 * DICOM modality codes commonly used in radiotherapy workflows
 */
export const DICOM_MODALITY_MAP: Record<string, FHIRCoding> = {
  // Computed Tomography
  "CT": {
    system: DICOM_SYSTEM,
    code: "CT",
    display: "Computed Tomography"
  },
  "Computed Tomography": {
    system: DICOM_SYSTEM,
    code: "CT",
    display: "Computed Tomography"
  },
  
  // Cone Beam CT
  "CBCT": {
    system: DICOM_SYSTEM,
    code: "CT",
    display: "Computed Tomography"
  },
  "Cone Beam CT": {
    system: DICOM_SYSTEM,
    code: "CT",
    display: "Computed Tomography"
  },
  "Cone-Beam CT": {
    system: DICOM_SYSTEM,
    code: "CT",
    display: "Computed Tomography"
  },
  
  // Magnetic Resonance
  "MRI": {
    system: DICOM_SYSTEM,
    code: "MR",
    display: "Magnetic Resonance"
  },
  "MR": {
    system: DICOM_SYSTEM,
    code: "MR",
    display: "Magnetic Resonance"
  },
  "Magnetic Resonance": {
    system: DICOM_SYSTEM,
    code: "MR",
    display: "Magnetic Resonance"
  },
  "Magnetic Resonance Imaging": {
    system: DICOM_SYSTEM,
    code: "MR",
    display: "Magnetic Resonance"
  },
  
  // PET Imaging
  "PET": {
    system: DICOM_SYSTEM,
    code: "PT",
    display: "Positron Emission Tomography"
  },
  "PT": {
    system: DICOM_SYSTEM,
    code: "PT",
    display: "Positron Emission Tomography"
  },
  "Positron Emission Tomography": {
    system: DICOM_SYSTEM,
    code: "PT",
    display: "Positron Emission Tomography"
  },
  
  // PET-CT
  "PET-CT": {
    system: DICOM_SYSTEM,
    code: "PT",
    display: "Positron Emission Tomography"
  },
  "PET/CT": {
    system: DICOM_SYSTEM,
    code: "PT",
    display: "Positron Emission Tomography"
  },
  
  // Radiotherapy Image
  "RTIMAGE": {
    system: DICOM_SYSTEM,
    code: "RTIMAGE",
    display: "Radiotherapy Image"
  },
  "RT Image": {
    system: DICOM_SYSTEM,
    code: "RTIMAGE",
    display: "Radiotherapy Image"
  },
  
  // Radiotherapy Structure Set
  "RTSTRUCT": {
    system: DICOM_SYSTEM,
    code: "RTSTRUCT",
    display: "Radiotherapy Structure Set"
  },
  "RT Structure": {
    system: DICOM_SYSTEM,
    code: "RTSTRUCT",
    display: "Radiotherapy Structure Set"
  },
  
  // Radiotherapy Plan
  "RTPLAN": {
    system: DICOM_SYSTEM,
    code: "RTPLAN",
    display: "Radiotherapy Plan"
  },
  "RT Plan": {
    system: DICOM_SYSTEM,
    code: "RTPLAN",
    display: "Radiotherapy Plan"
  },
  
  // Radiotherapy Dose
  "RTDOSE": {
    system: DICOM_SYSTEM,
    code: "RTDOSE",
    display: "Radiotherapy Dose"
  },
  "RT Dose": {
    system: DICOM_SYSTEM,
    code: "RTDOSE",
    display: "Radiotherapy Dose"
  },
  
  // Ultrasound
  "US": {
    system: DICOM_SYSTEM,
    code: "US",
    display: "Ultrasound"
  },
  "Ultrasound": {
    system: DICOM_SYSTEM,
    code: "US",
    display: "Ultrasound"
  },
  
  // Digital Radiography / X-Ray
  "DX": {
    system: DICOM_SYSTEM,
    code: "DX",
    display: "Digital Radiography"
  },
  "X-Ray": {
    system: DICOM_SYSTEM,
    code: "DX",
    display: "Digital Radiography"
  },
  "XR": {
    system: DICOM_SYSTEM,
    code: "DX",
    display: "Digital Radiography"
  },
  "Radiography": {
    system: DICOM_SYSTEM,
    code: "DX",
    display: "Digital Radiography"
  },
  
  // Nuclear Medicine
  "NM": {
    system: DICOM_SYSTEM,
    code: "NM",
    display: "Nuclear Medicine"
  },
  "Nuclear Medicine": {
    system: DICOM_SYSTEM,
    code: "NM",
    display: "Nuclear Medicine"
  },
  
  // SPECT
  "SPECT": {
    system: DICOM_SYSTEM,
    code: "NM",
    display: "Nuclear Medicine"
  },
  
  // Fluoroscopy
  "RF": {
    system: DICOM_SYSTEM,
    code: "RF",
    display: "Radio Fluoroscopy"
  },
  "Fluoroscopy": {
    system: DICOM_SYSTEM,
    code: "RF",
    display: "Radio Fluoroscopy"
  },
  
  // Secondary Capture (for derived/processed images)
  "SC": {
    system: DICOM_SYSTEM,
    code: "SC",
    display: "Secondary Capture"
  },
  "Secondary Capture": {
    system: DICOM_SYSTEM,
    code: "SC",
    display: "Secondary Capture"
  },
  
  // Linear Accelerator (using SRT code for treatment device)
  "LINAC": {
    system: SRT_SYSTEM,
    code: "LA",
    display: "Linear Accelerator"
  },
  "Linear Accelerator": {
    system: SRT_SYSTEM,
    code: "LA",
    display: "Linear Accelerator"
  },
  
  // Proton Therapy
  "Proton": {
    system: SRT_SYSTEM,
    code: "PT_DEVICE",
    display: "Proton Therapy Device"
  },
  "Proton Therapy": {
    system: SRT_SYSTEM,
    code: "PT_DEVICE",
    display: "Proton Therapy Device"
  },
  "PBS": {
    system: SRT_SYSTEM,
    code: "PT_DEVICE",
    display: "Proton Therapy Device"
  },
  "Pencil Beam Scanning": {
    system: SRT_SYSTEM,
    code: "PT_DEVICE",
    display: "Proton Therapy Device"
  },
  
  // Brachytherapy
  "Brachytherapy": {
    system: SRT_SYSTEM,
    code: "BRACHY",
    display: "Brachytherapy"
  },
  "HDR": {
    system: SRT_SYSTEM,
    code: "BRACHY",
    display: "Brachytherapy"
  },
  "LDR": {
    system: SRT_SYSTEM,
    code: "BRACHY",
    display: "Brachytherapy"
  },
  
  // Photon (general external beam)
  "Photon": {
    system: SRT_SYSTEM,
    code: "PHOTON",
    display: "Photon Therapy"
  },
  "VMAT": {
    system: SRT_SYSTEM,
    code: "PHOTON",
    display: "Photon Therapy"
  },
  "IMRT": {
    system: SRT_SYSTEM,
    code: "PHOTON",
    display: "Photon Therapy"
  },
  "3DCRT": {
    system: SRT_SYSTEM,
    code: "PHOTON",
    display: "Photon Therapy"
  },
  "SBRT": {
    system: SRT_SYSTEM,
    code: "PHOTON",
    display: "Photon Therapy"
  },
  "SRS": {
    system: SRT_SYSTEM,
    code: "PHOTON",
    display: "Photon Therapy"
  }
};

/**
 * Get DICOM coding for a modality
 * @param modality - DLinRT modality string
 * @returns FHIR Coding or null if not found
 */
export function getModalityCoding(modality: string): FHIRCoding | null {
  // Try exact match first
  if (DICOM_MODALITY_MAP[modality]) {
    return { ...DICOM_MODALITY_MAP[modality] };
  }
  
  // Try case-insensitive match
  const normalizedModality = modality.trim();
  for (const [key, coding] of Object.entries(DICOM_MODALITY_MAP)) {
    if (key.toLowerCase() === normalizedModality.toLowerCase()) {
      return { ...coding };
    }
  }
  
  // Try partial match
  for (const [key, coding] of Object.entries(DICOM_MODALITY_MAP)) {
    if (
      normalizedModality.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalizedModality.toLowerCase())
    ) {
      return { ...coding };
    }
  }
  
  return null;
}

/**
 * Convert an array of modalities to FHIR CodeableConcepts
 * @param modalities - Array of DLinRT modality strings
 * @returns Array of FHIR CodeableConcepts with DICOM codes
 */
export function getModalityCodeableConcepts(modalities: string[]): FHIRCodeableConcept[] {
  const uniqueCodings = new Map<string, FHIRCoding>();
  
  for (const modality of modalities) {
    const coding = getModalityCoding(modality);
    if (coding) {
      // Use system+code as key to avoid duplicates
      const key = `${coding.system}|${coding.code}`;
      uniqueCodings.set(key, coding);
    }
  }
  
  return Array.from(uniqueCodings.values()).map(coding => ({
    coding: [coding],
    text: coding.display
  }));
}

/**
 * Get all unmapped modalities from a list
 * @param modalities - Array of DLinRT modality strings
 * @returns Array of modalities that couldn't be mapped to DICOM
 */
export function getUnmappedModalities(modalities: string[]): string[] {
  return modalities.filter(mod => !getModalityCoding(mod));
}

/**
 * Check if a modality can be mapped to DICOM
 * @param modality - DLinRT modality string
 * @returns True if mapping exists
 */
export function hasModalityMapping(modality: string): boolean {
  return getModalityCoding(modality) !== null;
}

/**
 * Normalize modality input (handles string or array)
 * @param modality - Single modality string or array of modalities
 * @returns Array of modality strings
 */
export function normalizeModalities(modality: string | string[] | undefined): string[] {
  if (!modality) return [];
  if (Array.isArray(modality)) return modality;
  // Handle comma-separated strings
  return modality.split(/[,;]/).map(m => m.trim()).filter(Boolean);
}
