
import { Initiative } from "@/types/initiative";

export const MODEL_ZOO_INITIATIVES: Initiative[] = [
  {
    id: "mhub-ai",
    name: "MHub.ai",
    category: "Model Zoo",
    description: "MHub.ai is an advanced hub for radiotherapy and medical imaging, offering curated models, tools, and resources for researchers and clinicians. It provides standardized AI models to accelerate algorithm development and validation in healthcare.",
    website: "https://mhub.ai/",
    organization: "Medical Imaging Research Community",
    status: "Active",
    tags: ["Medical Imaging", "AI Models", "Radiation Oncology", "Machine Learning", "Healthcare"],
    features: [
      "Curated medical imaging models",
      "Standardized formats",
      "Annotation tools",
      "Validation frameworks",
      "Collaborative research platform"
    ],
    dataAccess: "Open for research and academic purposes with registration",
    logoUrl: "/logos/mhub-ai.png"
  },
  {
    id: "monai-model-zoo",
    name: "MONAI Model Zoo",
    category: "Model Zoo",
    description: "A collection of medical imaging AI models that have been created using the MONAI framework. These models are ready for use in research and clinical applications in radiotherapy and medical imaging.",
    website: "https://monai.io/model-zoo.html",
    organization: "Project MONAI",
    status: "Active",
    tags: ["Medical Imaging", "Deep Learning", "AI Models", "Open Source", "PyTorch"],
    features: [
      "Pre-trained models for medical imaging",
      "Segmentation models",
      "Classification models",
      "Integration with MONAI framework",
      "PyTorch-based implementations"
    ],
    dataAccess: "Freely available for research and development",
    participationInfo: "Open to all researchers and developers"
  },
  {
    id: "totalsegmentator",
    name: "TotalSegmentator",
    category: "Model Zoo",
    description: "Open-source deep learning tool for robust segmentation of 100+ anatomical structures in CT and MRI images. Widely used as foundation for radiotherapy OAR segmentation.",
    website: "https://github.com/wasserth/TotalSegmentator",
    organization: "University Hospital Basel / University of Basel",
    status: "Active",
    tags: ["CT", "MRI", "Segmentation", "Organs at Risk", "nnU-Net", "Open Source"],
    features: [
      "117 anatomical structures in CT",
      "59 structures in MRI",
      "nnU-Net-based architecture",
      "Python package and Docker available",
      "Validated on clinical data"
    ],
    dataAccess: "Freely available on GitHub and PyPI",
    participationInfo: "Open source under Apache 2.0 license"
  },
  {
    id: "nnu-net",
    name: "nnU-Net",
    category: "Model Zoo",
    description: "Self-configuring deep learning framework for medical image segmentation that automatically adapts to any new dataset. Foundation for many radiotherapy AI models and challenge winners.",
    website: "https://github.com/MIC-DKFZ/nnUNet",
    organization: "German Cancer Research Center (DKFZ)",
    status: "Active",
    tags: ["Segmentation", "Deep Learning", "Self-Configuring", "Open Source", "Medical Imaging"],
    features: [
      "Automatic hyperparameter tuning",
      "2D, 3D, and cascade configurations",
      "State-of-the-art performance",
      "Extensive documentation",
      "Active community support"
    ],
    dataAccess: "Freely available on GitHub",
    participationInfo: "Open source under Apache 2.0 license",
    relatedPublications: [
      {
        title: "nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation",
        url: "https://doi.org/10.1038/s41592-020-01008-z",
        authors: "F. Isensee et al.",
        year: "2021"
      }
    ]
  }
];

