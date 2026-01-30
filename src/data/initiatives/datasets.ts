
import { Initiative } from "@/types/initiative";

export const DATASET_INITIATIVES: Initiative[] = [
  {
    id: "tcia",
    name: "The Cancer Imaging Archive (TCIA)",
    category: "Open Dataset",
    description: "Large archive of medical images of cancer accessible for public download to drive research, development, and validation of AI algorithms.",
    website: "https://www.cancerimagingarchive.net/",
    organization: "National Cancer Institute",
    status: "Active",
    tags: ["Cancer", "CT", "MRI", "PET", "Radiotherapy", "Multi-Modal", "Open Access"],
    features: [
      "Extensive collection of cancer imaging data", 
      "Multiple modalities", 
      "Clinical data", 
      "DICOM format",
      "Some collections include RT structure sets"
    ],
    dataAccess: "Freely available after registration",
    participationInfo: "Open to all researchers"
  },
  {
    id: "openkbp",
    name: "OpenKBP",
    category: "Open Dataset",
    description: "Open-access dataset of knowledge-based planning for radiation therapy of head and neck cancer.",
    website: "https://github.com/ababier/open-kbp",
    organization: "University of Michigan",
    startDate: "2020-01-01",
    status: "Active",
    tags: ["Head and Neck Cancer", "Knowledge-Based Planning", "Dose Prediction", "CT"],
    features: [
      "340 patient CT scans", 
      "Structure sets", 
      "Dose distributions", 
      "Prescribed doses"
    ],
    dataAccess: "Publicly available on GitHub",
    participationInfo: "Open to all researchers",
    relatedPublications: [
      {
        title: "OpenKBP: The open-access knowledge-based planning grand challenge and dataset",
        url: "https://doi.org/10.1016/j.ijrobp.2020.11.054",
        authors: "A.M. Babier et al.",
        year: "2021"
      }
    ]
  },
  {
    id: "pddca",
    name: "Public Domain Database for Computational Anatomy (PDDCA)",
    category: "Open Dataset",
    description: "Dataset for head and neck radiotherapy planning with CT images and manually curated segmentations.",
    website: "http://www.imagenglab.com/newsite/pddca/",
    organization: "University of Texas MD Anderson Cancer Center",
    status: "Active",
    tags: ["Head and Neck Cancer", "CT", "Segmentation", "Radiation Therapy"],
    features: [
      "CT scans from 48 patients", 
      "Manual segmentations of organs at risk", 
      "Segmentations of target volumes"
    ],
    dataAccess: "Publicly available for download",
    participationInfo: "Open to all researchers",
    relatedPublications: [
      {
        title: "Multi-atlas segmentation for head and neck radiation therapy planning: Atlas development and contouring performance evaluation",
        url: "https://doi.org/10.1016/j.ijrobp.2015.02.022",
        authors: "W. P. Raudaschl et al.",
        year: "2015"
      }
    ]
  },
  {
    id: "nsclc-radiomics",
    name: "NSCLC-Radiomics",
    category: "Open Dataset",
    description: "Dataset containing CT scans, RT structures, and clinical data for non-small cell lung cancer patients.",
    website: "https://wiki.cancerimagingarchive.net/display/Public/NSCLC-Radiomics",
    organization: "MAASTRO Clinic",
    status: "Active",
    tags: ["Lung Cancer", "CT", "Radiomics", "Radiation Therapy", "Outcome Prediction"],
    features: [
      "422 NSCLC patients", 
      "CT scans", 
      "RT structure sets", 
      "Clinical data",
      "Survival data"
    ],
    dataAccess: "Available through TCIA",
    participationInfo: "Open to all researchers",
    relatedPublications: [
      {
        title: "Data From NSCLC-Radiomics",
        url: "https://doi.org/10.7937/K9/TCIA.2015.PF0M9REI",
        authors: "H. J. W. L. Aerts et al.",
        year: "2015"
      }
    ]
  },
  {
    id: "rt-mac",
    name: "RT-MAC (Radiation Therapy - Medical Archive Collection)",
    category: "Open Dataset",
    description: "Collection of radiotherapy planning data including CT, structure sets, dose distributions, and plan data.",
    website: "https://www.cancerimagingarchive.net/collection/aapm-rt-mac/",
    organization: "University of California, San Francisco",
    status: "Active",
    tags: ["CT", "Radiation Therapy", "Treatment Planning", "Structure Sets", "Dose Distribution"],
    features: [
      "Multiple cancer sites", 
      "Complete RT planning data", 
      "DICOM-RTSTRUCT format"
    ],
    dataAccess: "Available through TCIA",
    participationInfo: "Open to all researchers"
  },
  {
    id: "lund-probe",
    name: "LUND-PROBE: Lund Prostate Radiotherapy Open Benchmarking and Evaluation",
    category: "Open Dataset",
    description: "Dataset includes MRI and sCT images, RT structures, and dose distributions for 432 prostate cancer patients undergoing MRI-based radiotherapy planning, plus an extension for 35 patients with DL-generated segmentations, uncertainty maps, and manual adjustments by four radiation oncologists.",
    website: "https://datahub.aida.scilifelab.se/10.23698/aida/lund-probe",
    organization: "Skåne University Hospital",
    status: "Active",
    tags: ["Cancer", "Synthetic CT", "MRI", "Prostate Cancer", "Target Volumes", "Organs at Risk", "Uncertainty Maps", "Dose Distribution", "Radiotherapy", "Segmentation"],
    features: [ 
      "MRI and sCT images", 
      "3D NIfTI format",
      "Collections include RT structures, and dose distributions",
      "Extension includes DL-generated segmentations and uncertainty maps",
      "Manual adjustments by four radiation oncologists"
    ],
    dataAccess: "Freely available after registration",
    participationInfo: "Open to all researchers"
  },
  {
    id: "radcure",
    name: "RADCURE",
    category: "Open Dataset",
    description: "Large open-access head and neck cancer CT dataset with 3,346 patients including RT structures, dose distributions, and clinical outcomes for radiotherapy AI research.",
    website: "https://www.cancerimagingarchive.net/collection/radcure/",
    organization: "Princess Margaret Cancer Centre / University Health Network",
    status: "Active",
    tags: ["Head and Neck Cancer", "CT", "Radiotherapy", "Structures", "Clinical Outcomes", "Large Dataset"],
    features: [
      "3,346 HNC patients",
      "CT images with RT structures",
      "Treatment outcome data",
      "Multi-institutional quality"
    ],
    dataAccess: "Available through TCIA",
    participationInfo: "Open to all researchers"
  },
  {
    id: "glis-rt",
    name: "GLIS-RT",
    category: "Open Dataset",
    description: "Glioma radiotherapy dataset with target volumes, organs at risk, and barriers to spread annotations for brain tumor treatment planning research.",
    website: "https://www.cancerimagingarchive.net/collection/glis-rt/",
    organization: "The Cancer Imaging Archive",
    status: "Active",
    tags: ["Brain Cancer", "Glioma", "CT", "MRI", "Target Volumes", "Organs at Risk", "Radiotherapy"],
    features: [
      "Glioma patient imaging",
      "RT target delineations",
      "OAR segmentations",
      "Barriers to spread annotations"
    ],
    dataAccess: "Available through TCIA",
    participationInfo: "Open to all researchers"
  },
  {
    id: "hnc-imrt-70-33",
    name: "HNC-IMRT-70-33",
    category: "Open Dataset",
    description: "Head and neck cancer dataset with patients treated using identical IMRT prescriptions (70Gy in 33 fractions), enabling standardized treatment planning research.",
    website: "https://www.cancerimagingarchive.net/",
    organization: "The Cancer Imaging Archive",
    status: "Active",
    tags: ["Head and Neck Cancer", "IMRT", "CT", "Radiotherapy", "Treatment Planning", "Standardized Protocol"],
    features: [
      "Identical IMRT prescriptions",
      "70Gy in 33 fractions",
      "CT imaging data",
      "Treatment planning standardization"
    ],
    dataAccess: "Available through TCIA",
    participationInfo: "Open to all researchers"
  },
  {
    id: "brain-metastasis-mri",
    name: "Brain Metastasis MRI Dataset",
    category: "Open Dataset",
    description: "Brain metastasis dataset with 3D MRI segmentations for stereotactic radiosurgery (SRS) and stereotactic radiotherapy (SRT) planning applications.",
    website: "https://www.nature.com/sdata/",
    organization: "Nature Scientific Data",
    status: "Active",
    tags: ["Brain Metastasis", "MRI", "Segmentation", "SRS", "SRT", "Stereotactic Radiotherapy"],
    features: [
      "3D brain metastasis segmentations",
      "MRI imaging data",
      "SRS/SRT planning applications",
      "Expert annotations"
    ],
    dataAccess: "Available through Nature Scientific Data",
    participationInfo: "Open to all researchers"
  },
];

