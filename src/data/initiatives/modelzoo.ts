
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
    id: "nvidia-clara-medical",
    name: "NVIDIA Clara Medical (Open Models)",
    category: "Model Zoo",
    description: "A collection of open medical AI models on Hugging Face from NVIDIA's Clara initiative, including segmentation models for CT and MR (VISTA3D-based), synthetic image generation models, and clinical reasoning models. Segment models are directly applicable to radiotherapy OAR and tumor segmentation.",
    website: "https://huggingface.co/collections/nvidia/clara-medical",
    organization: "NVIDIA",
    status: "Active",
    tags: ["Segmentation", "CT", "MRI", "Synthetic Imaging", "Organs at Risk", "Hugging Face"],
    features: [
      "NV-Segment-CT (VISTA3D) for CT segmentation",
      "NV-Segment-CTMR for cross-modality segmentation",
      "NV-Generate-CT and NV-Generate-MR for synthetic imaging",
      "Open weights on Hugging Face",
      "Actively maintained and updated"
    ],
    dataAccess: "Freely available on Hugging Face",
    participationInfo: "Open access under NVIDIA's open model licenses"
  },
  {
    id: "mshub",
    name: "MSHub (Medical Image Segmentation Hub)",
    category: "Model Zoo",
    description: "A growing collection of pre-trained nnU-Net models for medical image segmentation, covering tumor and lymph node segmentation tasks relevant to radiotherapy planning. Provides ready-to-use model weights that can be directly applied without retraining.",
    website: "https://github.com/Luoxd1996/MSHub",
    organization: "Medical Imaging Research Community",
    status: "Active",
    tags: ["Segmentation", "nnU-Net", "Tumor", "Lymph Nodes", "Open Source"],
    features: [
      "Pre-trained nnU-Net model weights",
      "Tumor segmentation models",
      "Lymph node segmentation models",
      "Direct inference without retraining",
      "Apache 2.0 license"
    ],
    dataAccess: "Freely available on GitHub",
    participationInfo: "Open source under Apache 2.0 license; early-stage but actively growing"
  },
  {
    id: "totalsegmentator",
    name: "TotalSegmentator",
    category: "Model Zoo",
    description: "A collection of 30+ nnU-Net-based segmentation models covering 100+ anatomical structures on CT and MR images, including head and neck OARs, body structures, brain structures, muscles, and vessels. Widely used in radiotherapy research for automatic contouring.",
    website: "https://github.com/wasserth/TotalSegmentator",
    organization: "University Hospital Basel",
    status: "Active",
    tags: ["Segmentation", "CT", "MRI", "nnU-Net", "Organs at Risk", "Open Source", "Anatomy"],
    features: [
      "117 main classes on CT, 50 on MR",
      "30+ specialized subtask models",
      "Head and neck glands, muscles, and vessels",
      "Python API and CLI",
      "Web application and 3D Slicer extension"
    ],
    dataAccess: "Open weights (Apache 2.0); some tasks require free academic license",
    participationInfo: "Open source; model contributions welcome",
    relatedPublications: [
      {
        title: "TotalSegmentator: Robust Segmentation of 104 Anatomic Structures in CT Images",
        url: "https://doi.org/10.1148/ryai.230024",
        authors: "J. Wasserthal et al.",
        year: "2023"
      }
    ]
  }
];
