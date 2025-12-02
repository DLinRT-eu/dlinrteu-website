
// Valid modality options
export const MODALITY_TAGS = [
  'CT', 
  'MRI',
  'CBCT',
  'PET',
  'PET/CT',
  'X-ray',
  'Treatment Planning System Data',
  'SPECT',
  'Ultrasound'
];

// Valid anatomical location options
export const ANATOMY_TAGS = [
  'Whole body',
  'Agnostic',
  'Abdomen', 
  'Body',
  'Brain',
  'Breast',
  'Head & Neck',
  'Pelvis',
  'Male Pelvis',
  'Female Pelvis',
  'Thorax'
];

// Valid certification options
export const CERTIFICATION_TAGS = [
  'FDA',
  'CE',
  'CE exempt',
  'MDR exempt',
  'NMPA',
  'Pending',
  'Investigation Use'
];

// Combined certification values (for display purposes)
export const COMBINED_CERTIFICATION_TAGS = [
  'CE & FDA',
  'CE',
  'FDA',
  'MDR exempt',
  'NMPA',
  'Pending',
  'Investigation Use'
];

// Mapping of certification display values to their component tags
export const CERTIFICATION_MAPPING: Record<string, string[]> = {
  'CE & FDA': ['CE', 'FDA'],
  'CE': ['CE'],
  'FDA': ['FDA'],
  'MDR exempt': ['MDR exempt'],
  'NMPA': ['NMPA']
};
