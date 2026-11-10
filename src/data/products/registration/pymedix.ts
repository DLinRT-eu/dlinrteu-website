
import { ProductDetails } from "@/types/productDetails";

export const PYMEDIX_PRODUCTS: ProductDetails[] = [
  {
    id: "pymedix-registration",
    trainingData: {
      source: "Pymedix method description and FDA 510(k) summary K233572",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233572.pdf",
      disclosureLevel: "none",
      description: "Pymedix states that Autofuse uses machine perception without machine learning, deep learning, or neural networks. A training dataset is not applicable to the method as described by the manufacturer."
    },
    evaluationData: {
      primaryEndpoint: "Not specified",
      description: "The FDA 510(k) summary documents nonclinical software verification and validation in a simulated clinical environment. It does not report a clinical study or a numerical clinical registration-accuracy endpoint.",
      results: "Nonclinical verification and validation are documented; clinical accuracy and workflow outcome results are not publicly reported in the summary.",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233572.pdf",
      studyDesign: "Nonclinical software verification and validation (FDA 510(k)); no clinical study reported in the public summary",
      source: "FDA 510(k) summary K233572"
    },
    name: "Autofuse",
    company: "PyMedix",
    companyUrl: "https://pymedix.com/",
    productUrl: "https://pymedix.com/autofuse/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/registration/pymedix.ts",
    description: "DICOM-compliant medical-imaging software for display, annotation, volume operations and rendering, registration, and fusion as an aid in diagnostic radiology, oncology, and radiation therapy planning. Pymedix markets automatic 3D deformable registration and describes its approach as machine perception.",
    features: [
      "Medical-image display, annotation, volume operations, and rendering",
      "Registration and fusion of DICOM-compliant medical images",
      "Manufacturer-described automatic rigid and deformable registration"
    ],
    category: "Registration",
    certification: "FDA 510(k) cleared (K233572); EU CE status not verified",
    logoUrl: "/logos/pymedix.png",
    website: "https://pymedix.com/",
    anatomicalLocation: [],
    modality: ["CT", "MRI", "PET"],
    subspeciality: "Radiology and Radiation Oncology",
    diseaseTargeted: [],
    keyFeatures: [
      "DICOM-compliant image display, annotation, volume operations, and rendering",
      "Medical-image registration and fusion",
      "Pymedix describes the registration approach as machine perception, not machine learning"
    ],
    guidelines: [],
    technicalSpecifications: {
      population: "No age group is specified in the FDA indications for use.",
      input: ["DICOM-compliant medical images, including CT, MRI, and PET"],
      inputFormat: ["DICOM"],
      output: ["Registered or fused images", "Annotations and regions of interest"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["DICOM-compatible clinical imaging and treatment-planning workflows"],
      deployment: ["Standalone medical-imaging software; supported production environment not publicly verified"],
      triggerForAnalysis: "Pymedix describes registration as automatic after image sets are selected; exact workflow configuration is not publicly specified.",
      processingTime: "No verified runtime is publicly specified."
    },
    regulatory: {
      ce: {
        status: "unknown",
        notes: "No product-specific CE certificate or declaration of conformity was verified in this review; EU status remains unverified."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K233572",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2024-03-06",
        notes: "FDA also lists subsequent product code MUJ. 510(k) clearance is not FDA approval."
      },
      intendedUseStatement: "Autofuse provides physicians a means to compare DICOM-compliant medical data using display, annotation, volume operations and rendering, registration, and fusion as an aid in diagnostic radiology, oncology, radiation therapy planning, and other specialties. It is not intended for mammography. (Paraphrased from FDA 510(k) K233572.)"
    },
    evidenceRigor: "E0",
    clinicalImpact: "L1t",
    evidenceRigorNotes: "E0 (2026-11-09): FDA K233572 provides regulatory clearance and documents nonclinical software verification/validation. No independent product-specific clinical validation was identified. Manufacturer performance claims are not independently corroborated; the related CRAFT paper is not established as an evaluation of the cleared commercial version.",
    clinicalImpactNotes: "L1t (2026-11-09): Autofuse has an intended role in medical-image registration and radiotherapy-planning workflow, but no product-specific evidence located here demonstrates patient-outcome benefit or independently measured workflow improvement.",
    adoptionReadiness: "R0",
    adoptionReadinessNotes: "Public sources reviewed do not verify site commissioning, current interoperability testing, local QA, monitoring, or routine clinical deployment. AccessGUDID commercial-distribution status does not establish implementation readiness.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    clinicalEvidence: "The FDA 510(k) summary reports nonclinical software verification and validation, not a clinical trial. No independent product-specific clinical accuracy, workflow, or patient-outcome study was identified in this review. Pymedix publishes manufacturer-reported benchmarks and workflow estimates.",
    evidence: [
      {
        type: "FDA 510(k) Record",
        description: "Official FDA record for Autofuse K233572; Class II, product code LLZ, subsequent product code MUJ, decision date 2024-03-06.",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K233572"
      },
      {
        type: "FDA 510(k) Summary",
        description: "Indications for use, device description, and nonclinical software verification and validation.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233572.pdf"
      },
      {
        type: "FDA Device Record",
        description: "AccessGUDID lists version/model 1 and commercial distribution; it does not establish the launch date or installed base.",
        link: "https://accessgudid.nlm.nih.gov/devices/00860012197200"
      },
      {
        type: "Manufacturer Product Page",
        description: "Pymedix description of Autofuse and manufacturer-reported registration and workflow claims.",
        link: "https://pymedix.com/autofuse/"
      },
      {
        type: "Manufacturer Technical Statement",
        description: "Pymedix describes Autofuse as machine perception without machine learning, deep learning, or neural networks.",
        link: "https://pymedix.com/2019/01/15/mp-for-intelligence/"
      },
      {
        type: "Manufacturer Brochure",
        description: "Pymedix Autofuse brochure (2019), including manufacturer-reported benchmarks and workflow estimates.",
        link: "https://pymedix.com/wp-content/uploads/2019/04/Pymedix-Autofuse-Brochure-2019.pdf"
      },
      {
        type: "Related Method Paper",
        description: "Huang et al. (2019), CRAFT registration method; not verified as evaluation of the cleared commercial Autofuse version.",
        link: "https://doi.org/10.1088/1361-6560/ab2202"
      },
      {
        type: "General QA Guidance",
        description: "AAPM Task Group 132 report on image-registration and fusion QA in radiotherapy; not product-specific validation.",
        link: "https://www.aapm.org/pubs/reports/detail.asp?docid=164"
      },
      {
        type: "Unrelated Academic Method",
        description: "Meng et al. AutoFuse neural-network method, distinct from Pymedix Autofuse.",
        link: "https://doi.org/10.1016/j.patcog.2024.111338"
      }
    ],
    limitations: [
      "No independent product-specific clinical accuracy, workflow, or patient-outcome study was identified",
      "Manufacturer-reported benchmark and workflow estimates have not been independently corroborated",
      "No verified processing-time or supported cloud-deployment specification was found",
      "EU CE status was not verified; this is unresolved, not evidence that no CE documentation exists",
      "Public sources do not establish local commissioning, QA, monitoring, installed base, or routine clinical deployment",
      "A related CRAFT method paper and an academic AutoFuse neural network should not be represented as clinical validation of Pymedix Autofuse"
    ],
    version: "1",
    lastUpdated: "2026-11-09",
    lastRevised: "2026-11-09",
    source: "FDA 510(k) K233572, AccessGUDID, Pymedix product documentation, related peer-reviewed method literature, and AAPM TG-132"
  }
];
