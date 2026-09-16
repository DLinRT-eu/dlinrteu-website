
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
    id: "nalvera-ai",
    name: "Nalvera.AI",
    category: "Model Zoo",
    description: "A managed cloud inference service for medical imaging AI models: users upload a scan, select a model from the hosted catalogue and receive results without a local GPU or CUDA setup. The catalogue consists of third-party open research models. Explicitly research use only — not a medical device, with no CE/FDA/MDR clearance.",
    website: "https://nalvera.ai",
    organization: "Nalvera (Belgium)",
    status: "Active",
    lastVerified: "2026-09-16",
    tags: ["Segmentation", "CT", "MRI", "Synthetic Imaging", "Cloud Inference", "Commercial"],
    features: [
      "Hosted catalogue of open models (TotalSegmentator CT/MR, MOOSE v3 Clinical, MuscleMap MRI, MAISI-v2, Merlin)",
      "Per-model model cards describing intended use and inputs",
      "EU-hosted GPU compute, no local installation required",
      "Private model sharing between teams",
      "Reproducible inference runs on uploaded imaging data"
    ],
    dataAccess: "Commercial subscription with credits; research use only, not a medical device (no CE/FDA/MDR clearance)",
    participationInfo: "Open to researchers via account registration; models served are third-party open models"
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
    participationInfo: "Open to all researchers and developers",
    logoUrl: "/logos/monai.png"
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
  },
  {
    id: "huggingface-medical",
    name: "Hugging Face Medical Models",
    category: "Model Zoo",
    description: "Hugging Face hosts a large and growing ecosystem of medical imaging AI models covering segmentation, classification, and synthesis tasks. Multiple collections and community-contributed models are available for radiotherapy-relevant applications including organ-at-risk delineation and tumor segmentation.",
    website: "https://huggingface.co/models?pipeline_tag=image-segmentation&sort=trending&search=medical",
    organization: "Hugging Face Community",
    status: "Active",
    tags: ["Medical Imaging", "Segmentation", "Open Source", "Hugging Face", "Deep Learning", "AI Models"],
    features: [
      "Thousands of community-contributed medical models",
      "Standardized model cards with documentation",
      "Inference API for quick evaluation",
      "Integration with Transformers and diffusers libraries",
      "Version control and model hosting"
    ],
    dataAccess: "Freely browsable; individual model licenses vary",
    participationInfo: "Open to all researchers; anyone can upload and share models"
  },
  {
    id: "radimagenet",
    name: "RadImageNet",
    category: "Model Zoo",
    description: "A collection of pre-trained deep learning models (ResNet, DenseNet, InceptionV3) specifically trained on radiology images, outperforming ImageNet pretraining on medical imaging downstream tasks. Provides transfer learning backbones optimized for CT, MRI, and ultrasound.",
    website: "https://www.radimagenet.com/",
    organization: "RadImageNet Consortium",
    status: "Active",
    tags: ["Transfer Learning", "Pre-trained Models", "CT", "MRI", "Ultrasound", "Radiology", "Deep Learning"],
    features: [
      "Pre-trained on 1.35M+ radiology images",
      "ResNet, DenseNet, InceptionV3 architectures",
      "Covers CT, MRI, and ultrasound modalities",
      "Superior to ImageNet pretraining for medical tasks",
      "Ready-to-use feature extractors"
    ],
    dataAccess: "Model weights freely available; dataset access requires registration",
    participationInfo: "Open for research use",
    relatedPublications: [
      {
        title: "RadImageNet: An Open Radiologic Deep Learning Research Dataset for Effective Transfer Learning",
        url: "https://doi.org/10.1148/ryai.210315",
        authors: "M. Mei et al.",
        year: "2022"
      }
    ]
  },
  {
    id: "grand-challenge-algorithms",
    name: "Grand Challenge Algorithms",
    category: "Model Zoo",
    description: "grand-challenge.org hosts a growing library of submitted algorithms from completed medical imaging challenges, many directly applicable to radiotherapy tasks. Algorithms can be run directly on the platform via containerized inference, enabling reproducible benchmarking.",
    website: "https://grand-challenge.org/algorithms/",
    organization: "Radboud University Medical Center",
    status: "Active",
    tags: ["Algorithms", "Segmentation", "Detection", "Benchmarking", "Medical Imaging", "Reproducibility"],
    features: [
      "Containerized algorithm execution",
      "Reproducible inference on platform",
      "Algorithms from top challenge submissions",
      "Covers segmentation, detection, and classification",
      "Direct integration with challenge leaderboards"
    ],
    dataAccess: "Algorithms freely browsable; execution requires registration",
    participationInfo: "Open to algorithm developers; Docker-based submission"
  },
  {
    id: "platipy",
    name: "platipy",
    category: "Model Zoo",
    description: "Processing Library and Analysis Toolkit for Medical Imaging in Python — a toolkit with pre-built deep learning models specifically designed for radiotherapy auto-segmentation. Includes models for cardiac substructure delineation, bronchial tree segmentation, and other RT-relevant structures.",
    website: "https://github.com/pyplati/platipy",
    organization: "University of Sydney / UNSW",
    status: "Active",
    tags: ["Auto-segmentation", "Radiotherapy", "Open Source", "Python", "Cardiac", "Organs at Risk"],
    features: [
      "RT-specific auto-segmentation models",
      "Cardiac substructure delineation",
      "Bronchial tree segmentation",
      "DICOM RT integration",
      "Atlas-based and deep learning methods"
    ],
    dataAccess: "Freely available via pip install",
    participationInfo: "Open source under Apache 2.0 license"
  },
];

