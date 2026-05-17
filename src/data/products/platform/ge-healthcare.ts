
import { ProductDetails } from "@/types/productDetails";

export const GE_HEALTHCARE_PLATFORM_PRODUCTS: ProductDetails[] = [
  {
    id: "ge-healthcare-irt",
    name: "Intelligent Radiation Therapy (iRT)",
    company: "GE Healthcare",
    companyUrl: "https://www.gehealthcare.com/",
    productUrl: "https://www.gehealthcare.com/specialties/oncology-solutions/intelligent-rt",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/platform/ge-healthcare.ts",
    description: "Fully-interoperable radiation therapy collaboration system (RTCS) for patient workflow management - designed with clinicians for clinicians. AI-supported platform integrating GE Healthcare and third-party AI solutions for comprehensive oncology department management.",
    features: [
      "Analytics reporting for department efficiency",
      "Intelligent staff scheduler",
      "AI auto-segmentation integration",
      "Virtual reality patient education",
      "Vendor-neutral connectivity"
    ],
    category: "Platform",
    certification: "CE & FDA",
    logoUrl: "/logos/ge_healthcare.png",
    website: "https://www.gehealthcare.com/specialties/oncology-solutions/intelligent-rt",
    anatomicalLocation: ["Multi-site"],
    modality: ["CT", "MRI"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Analytics reporting: Holistic view for department administrators to analyze efficiency, identify operational gaps, and document trends",
      "Intelligent staff scheduler: Resource management tool accounting for out-of-office schedules to optimize staffing and reduce treatment delays",
      "AI auto-segmentation: Integration with GE HealthCare MR Contour DL for MR imaging and third-party MVision Contour+ for CT imaging",
      "MIM Contour ProtégéAI+ integration: Seamless connection with established auto-segmentation solutions",
      "iRT MR Direct (ESTRO 2026): MR-only workflow bundling iRT with MR Contour DL and Spectronic MRI Planner across brain, head & neck and pelvis",
      "VERT virtual reality: Integration with Vertual Ltd's VR app for patient education and staff training through treatment simulation",
      "Vendor-neutral approach: Integrates with electronic medical records (EMR), oncology information systems (OIS)",
      "FHIR compliance: Supports Fast Healthcare Interoperability Resources standards",
      "Patient workflow management: Comprehensive coordination across entire radiation therapy process",
      "Treatment delay reduction: Intelligent resource allocation to minimize scheduling gaps"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric cancer patients",
      input: ["Medical images", "Clinical data", "Treatment schedules", "Staff availability", "Department metrics"],
      inputFormat: ["DICOM", "HL7", "FHIR"],
      output: ["Workflow schedules", "Analytics reports", "AI-generated contours", "Staff assignments"],
      outputFormat: ["DICOM-RTSTRUCT", "PDF reports", "HL7 messages", "Dashboard analytics"]
    },
    technology: {
      integration: [
        "Electronic Medical Records (EMR)",
        "Oncology Information Systems (OIS)",
        "GE HealthCare MR Contour DL",
        "MVision Contour+ (third-party)",
        "MIM Contour ProtégéAI+ (third-party)",
        "VERT virtual reality (Vertual Ltd)",
        "FHIR-compliant systems"
      ],
      deployment: ["On-premise", "Hybrid cloud"],
      triggerForAnalysis: "Integrated within clinical workflow",
      processingTime: "Real-time workflow management and scheduling"
    },
    regulatory: {
      ce: {
        status: "CE Marked",
        class: "IIb",
        type: "MDR",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510(k) Cleared (via integrated components)",
        class: "Class II",
        type: "510(k)",
        notes: "The iRT platform orchestrates multiple cleared clinical modules. Key component clearances include K230082 (Auto Segmentation, May 2023), K242925 (MR Contour DL, April 2025; previous: K213717), and integrates third-party cleared devices including MVision Contour+ (K241490) and MIM Contour ProtégéAI+."
      },
      intendedUseStatement: "A fully-interoperable radiation therapy collaboration system (RTCS) for patient workflow management. Designed to integrate AI-supported auto-segmentation, intelligent resource scheduling, analytics reporting, and vendor-neutral connectivity with hospital information systems (OIS, TPS, EMR, QA, PACS) to optimize radiation therapy delivery, reduce treatment delays, and improve departmental efficiency."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Hospital partnerships", "Enterprise healthcare solutions"],
      availability: "Early adopters disclosed by GE include Marengo CIMS and the University of Debrecen (Hungary), the latter expanding iRT to its full radiation oncology department and adding the theranostics workflow (ESTRO 2026)."
    },
    evidenceRigor: "E0",
    clinicalImpact: "I2",
    evidenceRigorNotes: "Platform product (2025). No independent peer-reviewed publications. Vendor-reported InstaPlan study (iRT + RayStation, n=20) reports simulation-to-plan time reduced from 7 days to 7 minutes (GE HealthCare ESTRO 2026 press release). Marengo CIMS case study (2025) documents 25% treatment planning time reduction. PubMed searched 2026-03-08.",
    clinicalImpactNotes: "Workflow improvement through unified workflow management integrating multiple AI solutions. Marengo CIMS case study reports 25% reduction in treatment planning times; vendor-reported InstaPlan data report simulation-to-plan time reduced from 7 days to 7 minutes (n=20).",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + CE + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "Case Study",
        description: "Marengo CIMS case study: 25% reduction in treatment planning times with iRT platform integration. 2025",
        link: "https://www.gehealthcare.com/specialties/oncology-solutions/intelligent-rt"
      },
      {
        type: "Vendor Press Release",
        description: "GE HealthCare ESTRO 2026: InstaPlan (iRT + RayStation by RaySearch) two clinical studies in Europe report simulation-to-treatment-plan time reduced from 7 days to 7 minutes across 20 patients. Adoption disclosed at University of Debrecen.",
        link: "https://www.gehealthcare.com/en-us/about/newsroom/press-releases/estro-2026-congress--ge-healthcare-to-spotlight-ai-enabled-solutions-to-advance-precision-care-across-radiation-therapy-and-image-guided-interventions"
      }
    ],
    releaseDate: "2025-09-25",
    lastUpdated: "2026-05-14",
    lastRevised: "2026-05-14",
    source: "Company website, CE MDR documentation. FDA component clearances: K230082, K213717. Marengo CIMS case study 2025. GE HealthCare ESTRO 2026 press release (12 May 2026).",
    clinicalEvidence: "CE Mark and FDA clearance (via integrated components) demonstrate conformity with regulatory requirements. Platform designed to integrate proven AI solutions including GE HealthCare's MR Contour DL (K213717), Auto Segmentation (K230082), and established third-party systems (MVision Contour+, MIM Contour ProtégéAI+) for clinical workflow optimization. Marengo CIMS case study (2025) reports 25% reduction in treatment planning times."
  }
];
