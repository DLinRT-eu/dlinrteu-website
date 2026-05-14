import { ProductDetails } from "@/types/productDetails";

export const GE_HEALTHCARE_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-irt-theranostics-pipeline",
    name: "iRT for Theranostics",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl:
      "https://www.gehealthcare.com/en-us/about/newsroom/press-releases/estro-2026-congress--ge-healthcare-to-spotlight-ai-enabled-solutions-to-advance-precision-care-across-radiation-therapy-and-image-guided-interventions",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/ge-healthcare.ts",
    description:
      "Workflow-orchestration extension of the GE HealthCare iRT platform for theranostics. Designed to give multidisciplinary teams a unified, end-to-end view across imaging, planning and delivery by integrating with electronic medical records (EMRs) and oncology information systems (OIS). Announced at ESTRO 2026 as technology in development; not cleared by any regulator and not for sale.",
    features: [
      "Theranostics workflow orchestration",
      "EMR / OIS integration",
      "Step-by-step team guidance",
      "Vendor-neutral connectivity",
    ],
    category: "Platform",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/ge_healthcare.png",
    website:
      "https://events.gehealthcare.com/events/estro-2026/",
    anatomicalLocation: ["Multi-site"],
    modality: ["PET", "SPECT", "CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Unified end-to-end view across the theranostics patient journey",
      "Integration with EMR and OIS systems",
      "Step-by-step guidance for multidisciplinary care teams",
      "Builds on the cleared iRT platform architecture",
    ],
    partOf: {
      name: "Intelligent Radiation Therapy (iRT)",
      productUrl:
        "https://www.gehealthcare.com/specialties/oncology-solutions/intelligent-rt",
      relationship: "Extension",
    },
    usesAI: true,
    lastUpdated: "2026-05-14",
    lastRevised: "2026-05-14",
    source:
      "GE HealthCare ESTRO 2026 press release (12 May 2026): explicitly described as 'Technology in development. Not for sale. Not cleared or approved by the U.S. FDA or any global regulator for commercial availability.'",
  },
];
