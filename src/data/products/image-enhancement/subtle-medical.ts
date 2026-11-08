import { ProductDetails } from "@/types/productDetails";

export const SUBTLE_MEDICAL_PRODUCTS: ProductDetails[] = [
  {
    id: "subtle-mr",
    keyPapers: [
      {"doi":"10.3174/ajnr.A7358","title":"Deep learning enables 60% accelerated volumetric brain MRI","authors":"Bash S et al.","journal":"AJNR Am J Neuroradiol","year":"2021","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Prospective multicentre study (5 institutions, 6 scanners) demonstrating clinically acceptable 60% acceleration; vendor-led.","multiCenter":true,"prospective":true},
      {"doi":"10.1148/ryai.210059","title":"Clinical assessment of deep learning-based super-resolution for 3D volumetric brain MRI","authors":"Rudie JD et al.","journal":"Radiol Artif Intell","year":"2022","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Prospective single-centre assessment; vendor-led.","prospective":true},
      {"doi":"10.1007/s00062-021-01121-2","title":"Deep Learning Image Processing Enables 40% Faster Spinal MR Scans Which Match or Exceed Quality of Standard of Care","authors":"Bash S et al.","journal":"Clin Neuroradiol","year":"2021","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Prospective multicentre (4 institutions) acceleration study; vendor-led.","multiCenter":true,"prospective":true},
      {"doi":"10.1186/s41747-024-00470-0","title":"Deep learning reconstruction for lumbar spine MRI acceleration","authors":"Tang X et al.","journal":"Eur Radiol Exp","year":"2024","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Prospective single-centre study with disclosed vendor co-authorship.","prospective":true},
      {"doi":"10.1016/j.canrad.2023.11.004","title":"Artificial intelligence solution to accelerate the acquisition of MRI images: impact on therapeutic care in radiology and radiotherapy departments","authors":"Lemaire C et al.","journal":"Cancer Radiother","year":"2024","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Independent prospective evaluation including radiotherapy use, reporting workflow impact.","vendorIndependent":true,"prospective":true,"externalValidation":true},
      {"doi":"10.1148/ryai.230181","title":"Impact of deep learning image reconstruction methods on MRI throughput","authors":"Yang J et al.","journal":"Radiol Artif Intell","year":"2024","evidenceRigor":"E2","clinicalImpact":"L3", "legacyClinicalImpact": "I2","rationale":"Vendor-independent retrospective analysis of 7,346 examinations across 10 scanners showing throughput gains.","vendorIndependent":true,"multiCenter":true},
      {"doi":"10.1007/s00330-025-11423-5","title":"The scientific evidence of commercial AI products for MRI acceleration: systematic review","authors":"Fransen SJ et al.","journal":"Eur Radiol","year":"2025","rationale":"Indirect-comparative multi-product review; unscored."},
      {"doi":"10.3390/diagnostics16182957","title":"Comparison of Deep-Learning-Based Reconstruction of Knee MRI with Conventional Sequences in Patients with Knee Pain","authors":"Husain R et al.","journal":"Diagnostics","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2","rationale":"Added 2026-11-08 from Usman Lula's revision; DOI verified; scored from the abstract, pending reviewer check. Prospective single-centre 1.5T study (43 of 50 patients analysed) naming SubtleMR; no difference in overall diagnosis, image quality or artefacts at about half the acquisition time; one Subtle Medical co-author.","prospective":true}
    ],
    trainingData: {
        disclosureLevel: "minimal",
        description: "Deep learning model for MRI noise reduction and resolution enhancement. Training corpus is not publicly disclosed at the patient/dataset level. FDA 510(k) summaries (K191688, K203182, K223623) confirm software-as-a-medical-device classification with AI/ML attributes.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K191688.pdf, https://www.accessdata.fda.gov/cdrh_docs/pdf20/K203182.pdf, https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223623.pdf",
        source: "FDA 510(k) summaries K191688, K203182, K223623"
    },
    evaluationData: {
        results: "FDA acceptance criteria (K223623): SNR of a selected ROI improved by ≥5% on average after SubtleMR enhancement compared to original images, plus a visibility-of-small-structures rating, assessed using retrospective clinical data. Test methods were consistent across the clearance chain. Bash et al. AJNR 2021 (multi-centre, 60% accelerated 3D MPRAGE brain MRI, n=40 patients): SubtleMR-enhanced accelerated scans preserved quantitative volumetric performance (NeuroQuant) and image quality vs standard-of-care scans across 3 sites and 3 readers; SNR and diagnostic equivalence non-inferior at 60% acceleration.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf22/K223623.pdf, https://doi.org/10.3174/ajnr.A7358",
        source: "Bash et al. AJNR 2022;43(4):492-498 (DOI 10.3174/ajnr.A7358); FDA 510(k) summaries K191688, K203182, K223623; Fransen et al. Eur Radiol 2025 systematic review (DOI 10.1007/s00330-025-11423-5)",
        studyDesign: "Prospective, multi-centre, multireader trial (Bash 2022) + indirect-comparative systematic review (Fransen 2025) + FDA 510(k) software V&V",
        primaryEndpoint: "Acquisition acceleration, SNR improvement; Diagnostics image quality rating",
        description: "FDA 510(k) software verification and validation across three sequential clearances: K191688 (2019, original), K203182 (2021, v2.0.0), K223623 (2023, v2.3.x, current), each citing the prior as predicate. Bash et al. AJNR 2022: prospective multi-centre multireader trial of SubtleMR on accelerated volumetric brain MRI; Subtle Medical employees are co-authors (not fully vendor-independent). Fransen et al. Eur Radiol 2025 systematic review names SubtleMR among 14 commercial MRI-acceleration products."
    },
    name: "SubtleMR",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered solution for enhancing MRI images, allowing for faster scan times while maintaining or improving image quality through noise reduction and resolution enhancement.",
    features: ["Deep learning enhancement", "MRI specific", "Scan time reduction", "Noise reduction"],
    certification: "CE & FDA",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-mr/",
    anatomicalLocation: ["Brain", "Body"],
    anatomy: ["Head", "Spine", "Neck", "Abdomen", "Pelvis", "Prostate", "Breast", "MSK"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Cancer"],
    releaseDate: "2019-09-16",
    version: "2.3.x",
    keyFeatures: [
      "Deep learning MRI enhancement",
      "Improves SNR and image sharpness",
      "Works with multiple contrasts",
      "Vendor-neutral compatibility",
      "Supports all body parts MRI",
      "Integration with Siemens MAGNETOM scanners via Open Recon",
      "Enables up to 60% faster scanning"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<30 seconds per study"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "08600001712SubtleMR225",
          riskClass: "class-iia",
          registeredTradeName: "SubtleMR (Software as a Service for post-processing of Magnetic Resonance data)",
          manufacturerSrn: "US-MF-000032747",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=SubtleMR",
          lastVerified: "2026-09-22"
      },
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K191688, K203182, K223623",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2023-05-11"
      },
      intendedUseStatement: "SubtleMR is an image processing software that can be used for image enhancement in MRI images. It can be used to reduce image noise for head, spine, neck, abdomen, pelvis, prostate, breast, and musculoskeletal MRI, or increase image sharpness for head MRI. (Source: FDA 510(k) K223623 Indications for Use)"
    },
    market: {
      onMarketSince: "2019",
      distributionChannels: ["Direct sales", "Distribution partners"],
      deploymentScale: "1,000+ scanners deployed worldwide as of 2025",
      recognitions: ["TIME World's Top HealthTech Companies 2025", "CB Insights GenAI 50", "CB Insights Top AI 100"]
    },
    evidenceRigor: "E2",
    clinicalImpact: "L3",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "E2 (Validated Evidence): two prospective multi-centre multireader trials (Bash 2021: 5 institutions/6 scanners, n=40, brain; Bash 2022: 4 institutions, n=61, spine) plus three further prospective single-centre trials (Rudie 2022, UCSF, n=32, brain, vendor-led; Tang 2024, Shanghai, n=31, lumbar spine, vendor-led; Lemaire 2024, Caen, n=33, brain, fully vendor-independent). External validation comes from one fully independent, vendor-unaffiliated large-scale retrospective real-world study (Yang 2024, Mount Sinai, 10 scanners, n=7,346 examinations). The combination of multi-centre prospective vendor-led trials, two independent single-centre prospective studies (Lemaire 2024; partially Yang 2024 for the real-world arm), spanning three countries (US, China, France), meets the E2 bar (multi-centre, large cohort, external validation); no single study is simultaneously fully independent and multi-centre.",
    clinicalImpactNotes: "I2 (Workflow / diagnostic accuracy, F&T Level 2): consistent finding across six studies (US, China, France) that 40-60% accelerated, DL-enhanced scans preserved or improved SNR, anatomic/lesion conspicuity, and diagnostic confidence relative to standard of care, with no loss of quantitative accuracy (volumetric concordance in Bash 2021; pathology detection in Tang 2024). Notably, Lemaire et al. 2024 — directly evaluating radiotherapy-relevant use (brain metastases/meningiomas, read by radiation oncologists as well as radiologists) — found lower lesion-detection sensitivity for radiotherapy readers (0.77) than radiologists (0.92), with missed lesions concentrated under 4mm diameter; this is a meaningful caveat specifically for RT target-delineation use cases, not just general diagnostic use. Yang 2024 confirms real-world workflow impact (reduced scan/room time) at scale, though effects vary by examination type. No evidence identified of changed treatment management (I3) or patient outcomes (I4).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k) clearance chain (K191688, K203182, K223623) + real-world deployment evidence (1,000+ scanners; Yang 2024 multi-site implementation): multi-site commissioning and clinical acceptability evidence exists, supporting R3 (enhanced implementation readiness). Not elevated to R4, as no documented TG-100/RBAAF-aligned risk management, formal incident-management framework, or national-guidance alignment was identified.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearances K191688 (2019, original), K203182 (2021, v2.0.0), K223623 (2023, v2.3.x, current) for SubtleMR — Class II, 21 CFR 892.2050, Product Code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K191688.pdf"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bash et al. (2021). Deep Learning Enables 60% Accelerated Volumetric Brain MRI. AJNR 42(12):2130-2137. Prospective, multi-centre (5 institutions, 6 scanners), n=40; vendor-led (3/7 authors Subtle Medical).",
        link: "https://doi.org/10.3174/ajnr.A7358"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Rudie et al. (2022). Clinical Assessment of Deep Learning-based Super-Resolution for 3D Volumetric Brain MRI. Radiol Artif Intell 4(1):e210059. Prospective, single-centre (UCSF), n=32; vendor-led (4/10 authors Subtle Medical).",
        link: "https://doi.org/10.1148/ryai.210059"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bash et al. (2022). Deep Learning Image Processing Enables 40% Faster Spinal MR Scans. Clin Neuroradiol 32(1):197-203. Prospective, multi-centre (4 institutions), n=61; vendor-led (1/6 authors Subtle Medical).",
        link: "https://doi.org/10.1007/s00062-021-01121-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Tang et al. (2024). Deep learning reconstruction for lumbar spine MRI acceleration. Eur Radiol Exp 8(1):67. Prospective, single-centre (Shanghai, China), n=31; vendor-led (1/8 authors Subtle Medical; 1/8 authors Siemens Healthineers, both COI-disclosed).",
        link: "https://doi.org/10.1186/s41747-024-00470-0"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Lemaire et al. (2024). Artificial intelligence solution to accelerate the acquisition of MRI images: impact on the therapeutic care in oncology in radiology and radiotherapy departments. Cancer Radiother 28(3):251-257. Prospective, n=33, brain metastases/meningiomas, France; evaluated by both radiologists and radiation oncologists. Specificity 1.0, sensitivity 0.92 (radiology) vs. 0.77 (radiotherapy). Fully vendor-independent (Centre François-Baclesse, Normandie Université).",
        link: "https://doi.org/10.1016/j.canrad.2023.11.004"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Yang, Finkelstein, Koo, Doshi (2024). Impact of Deep Learning Image Reconstruction Methods on MRI Throughput. Radiol Artif Intell 6(3):e230181. Retrospective, large multi-centre health system (Mount Sinai), 10 scanners, n=7,346 examinations; fully vendor-independent.",
        link: "https://doi.org/10.1148/ryai.230181"
      },
      {
        type: "Systematic Review (indirect-comparative)",
        description: "Fransen et al. (2025). The scientific evidence of commercial AI products for MRI acceleration: systematic review. Eur Radiol 35:4736-4746. Names SubtleMR among 14 products reviewed.",
        link: "https://doi.org/10.1007/s00330-025-11423-5"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Husain et al. (2026). Comparison of Deep-Learning-Based Reconstruction of Knee MRI with Conventional Sequences in Patients with Knee Pain. Diagnostics 16:2957. Prospective, single-centre (Mount Sinai), 1.5T, 43 of 50 patients analysed; one Subtle Medical co-author.",
        link: "https://doi.org/10.3390/diagnostics16182957"
      }
    ],
    limitations: [
      "Independent (non-vendor-affiliated) clinical evidence exists (Lemaire 2024; Yang 2024) but most prospective multireader trials (Bash 2021/2022, Rudie 2022, Tang 2024) have at least one Subtle Medical co-author",
      "For radiotherapy-relevant evaluation specifically (brain metastases/meningiomas read by radiation oncologists), lesion-detection sensitivity was lower (0.77) than for radiologists (0.92) in the same study (Lemaire 2024), with missed lesions concentrated under 4mm — relevant to target delineation use cases",
      "Image-domain (DICOM-based) processing operates after scanner reconstruction, distinct from k-space-based vendor-native methods (e.g., AIR Recon DL); effects on scan/room time heterogeneous by examination type (Yang et al. 2024)",
      "Cloud-based deployment option processes images off-site on manufacturer servers, which may have data-governance implications for some institutions",
    ],
    clinicalEvidence: "Five prospective multireader trials (Bash 2021/2022, Rudie 2022, Tang 2024, Lemaire 2024; US, China, France) plus one large independent retrospective real-world study (Yang 2024, Mount Sinai) and an indirect-comparative systematic review (Fransen 2025).",
    lastUpdated: "2026-11-08",
    lastRevised: "2026-11-08",
    source: "FDA 510(k) database (K191688, K203182, K223623); peer-reviewed literature (Bash 2021/2022, Rudie 2022, Tang 2024, Lemaire 2024, Yang 2024, Fransen 2025, Husain 2026)"
  },
  {
    id: "subtle-pet",
    keyPapers: [
      {"doi":"10.1038/s41746-021-00497-2","title":"Low-count whole-body PET with deep learning in a multi-centre and externally validated study","authors":"Chaudhari AS et al.","journal":"npj Digit Med","year":"2021","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Prospective multicentre study with true external validation supporting reduced-count acquisition; vendor-led.","multiCenter":true,"multiNational":true,"prospective":true,"externalValidation":true},
      {"doi":"10.1007/s00259-022-05800-1","title":"AI-based PET denoising could allow a two-fold reduction in [18F]FDG PET acquisition time in digital PET/CT","authors":"Weyts K et al.","journal":"Eur J Nucl Med Mol Imaging","year":"2022","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Independent prospective study in 195 patients supporting halved acquisition time.","vendorIndependent":true,"prospective":true,"externalValidation":true},
      {"doi":"10.3390/diagnostics13091626","title":"Deep learning denoising improves and homogenizes patient [18F]FDG PET image quality in digital PET/CT","authors":"Weyts K et al.","journal":"Diagnostics","year":"2023","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent single-centre extension study with image-quality endpoints.","vendorIndependent":true},
      {"doi":"10.1186/s40658-022-00465-z","title":"Clinical and phantom validation of a deep learning based denoising algorithm for F-18-FDG PET images from lower detection counting in a digital PET/CT system","authors":"Bonardel G et al.","journal":"EJNMMI Physics","year":"2022","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Combined phantom and clinical validation naming SubtlePET; single-centre, image-quality and quantitation endpoints. Backfilled and Crossref-verified in the Wave 6 Batch B sweep (2026-08-27).","vendorIndependent":true},
      {"doi":"10.1186/s40658-021-00374-7","title":"Artificial intelligence for reduced dose 18F-FDG PET examinations: a real-world deployment through a standardized framework and business case assessment","authors":"Katsari K et al.","journal":"EJNMMI Physics","year":"2021","evidenceRigor":"E1","clinicalImpact":"L6", "legacyClinicalImpact": "I2","rationale":"Independent single-centre real-world deployment study reporting reduced injected activity in routine practice plus a business-case assessment, i.e. a workflow/pathway effect (I2) on a single-centre evidence base (E1). Backfilled and Crossref-verified in the Wave 6 Batch B sweep (2026-08-27).","vendorIndependent":true},
      {"doi":"10.1186/s13550-023-00999-y","title":"Imaging quality of an artificial intelligence denoising algorithm: validation in 68Ga PSMA-11 PET for patients with biochemical recurrence of prostate cancer","authors":"Margail C et al.","journal":"EJNMMI Research","year":"2023","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent single-centre validation extending SubtlePET denoising to 68Ga-PSMA-11; image-quality and lesion-detectability endpoints. Backfilled and Crossref-verified in the Wave 6 Batch B sweep (2026-08-27).","vendorIndependent":true},
      {"doi":"10.3390/jimaging11070234","title":"Implantation of an artificial intelligence denoising algorithm using SubtlePET with various radiotracers: 18F-FDG, 18F-choline, 18F-DOPA and 68Ga-DOTATOC","authors":"Zhang-Yin J et al.","journal":"Journal of Imaging","year":"2025","evidenceRigor":"E1","clinicalImpact":"L3", "legacyClinicalImpact": "I2","rationale":"Independent single-centre implementation study across four radiotracers, reporting routine deployment with halved acquisition time (workflow effect, I2). Backfilled and Crossref-verified in the Wave 6 Batch B sweep (2026-08-27).","vendorIndependent":true},
      {"doi":"10.1186/s40658-026-00835-x","title":"Clinical value of artificial intelligence in reducing PET image acquisition time: routine clinical practice evaluation","authors":"Dambrain V et al.","journal":"EJNMMI Physics","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I2","rationale":"Independent routine-practice evaluation of reduced acquisition time with SubtlePET; workflow endpoint on a single-centre cohort. Backfilled and Crossref-verified in the Wave 6 Batch B sweep (2026-08-27); first author is Dambrain, correcting the citation previously stored under Lacombe.","vendorIndependent":true},
      {"doi":"10.5603/nmr.94482","title":"Performance of a deep learning enhancement method applied to PET images acquired with a reduced acquisition time","authors":"Ciborowski P et al.","journal":"Nuclear Medicine Review","year":"2023","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Independent single-centre performance evaluation with image-quality endpoints only. Backfilled and Crossref-verified in the Wave 6 Batch B sweep (2026-08-27).","vendorIndependent":true}
    ],

    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summaries K182336, K211964",
        demographics: "Adult and pediatric",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf, https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211964.pdf",
        description: "Deep learning-based PET image enhancement for noise reduction and image sharpness improvement across multiple radiotracers. Underlying low-count PET training and multi-centre validation are described in Chaudhari et al. npj Digital Medicine 2021 (Subtle Medical / Stanford), which evaluated the platform externally across multiple centers and tracers."
    },
    evaluationData: {
        description: "FDA 510(k) software V&V (K182336, K211964) plus nine peer-reviewed studies — one vendor-led multi-centre trial with true external validation (Chaudhari 2021), and eight independent single- or multi-site studies (Weyts 2022/2023, Bonardel 2022, Katsari 2021, Margail 2023, Zhang-Yin 2025, Dambrain 2026, Ciborowski 2023) — spanning six countries and four radiotracers. See evidence array for full citations.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf",
        primaryEndpoint: "Lesion detectability and image quality at reduced PET acquisition time/dose",
        studyDesign: "FDA 510(k) software V&V + multi-centre externally-validated trial + eight independent prospective/retrospective single- and multi-site studies",
        source: "FDA 510(k) summaries K182336, K211964; peer-reviewed literature (Chaudhari 2021, Weyts 2022/2023, Bonardel 2022, Katsari 2021, Margail 2023, Zhang-Yin 2025, Dambrain 2026, Ciborowski 2023)",
        results: "Consistent across independent studies: AI-denoised reduced-count/reduced-dose PET is non-inferior or improved versus standard acquisition for image quality, lesion detectability, and SUV accuracy (e.g., Weyts 2022: non-inferior at half acquisition time, n=195; Chaudhari 2021: preserved quality across 3 external centers and tracer types, n=50)."
    },
    name: "SubtlePET",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered PET image enhancement technology that enables faster scan times or lower dose while maintaining diagnostic image quality across multiple radiotracers.",
    features: ["Deep learning enhancement", "PET specific", "Dose reduction", "Multi-tracer support"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-pet/",
    anatomicalLocation: ["Whole body"],
    modality: ["PET"],
    diseaseTargeted: ["Cancer", "Neurological disorders", "Cardiovascular disease", "Prostate cancer"],
    releaseDate: "2018-11-30",
    version: "2.0",
    keyFeatures: [
      "Deep learning-based PET enhancement",
      "Enables 4x faster scans or 75% dose reduction",
      "Improved signal-to-noise ratio",
      "Enhanced lesion detectability",
      "Compatible with all major PET/CT scanners",
      "FDA cleared for FDG and amyloid; CE marked for additional tracers (18F-DOPA, 18F-DCFPyL, Ga-68 Dotatate, Ga-68 PSMA, 18F-Choline, 18F-Fluciclovine)"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM PET images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner workstations"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<60 seconds per study"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "08600001712SubtlePET2B3",
          riskClass: "class-iia",
          registeredTradeName: "SubtlePET (Software as a Service for post-processing of Positron Emission Tomography data)",
          manufacturerSrn: "US-MF-000032747",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=SubtlePET",
          lastVerified: "2026-09-22"
      },
        status: "cleared",
        class: "IIa",
        type: "Medical Device",
        regulation: "MDR (EU 2017/745)"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K182336, K211964",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2021-09-28"
      },
      intendedUseStatement: "SubtlePET is an image processing software that can be used for image enhancement in PET images. It can be used for noise reduction and increasing image sharpness for PET images acquired using FDG, amyloid, 18F-DOPA, 18F-DCFPyL, Ga-68 Dotatate, and Ga-68 PSMA radiotracers."
    },
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E2",
    clinicalImpact: "L6",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "E2 (Validated Evidence): nine peer-reviewed studies across six countries (US/Canada, France, Italy, Luxembourg, Poland) and multiple tracers (FDG, PSMA-11, FDOPA, amyloid). One multi-centre prospective trial with true external validation is vendor-led (Chaudhari 2021: 3 institutions, n=50; 6 of 11 authors financially tied to Subtle Medical, including 2 cofounders/patent holders). Eight further studies are independent, spanning single- and multi-site designs, prospective and retrospective, n=30-282. The combination of multi-site, multinational, externally-validated evidence (vendor-led and independent together) clearly meets the E2 bar; this is the most extensive independent evidence base of any product reviewed in this series so far.",
    clinicalImpactNotes: "I2 (Workflow / diagnostic accuracy, F&T Level 2): consistent finding across all nine studies that AI-denoised reduced-count/reduced-dose PET preserves or improves diagnostic image quality, lesion detectability, and SUV/quantitative accuracy versus standard acquisition, generalizing across scanner vendors and radiotracers. Zhang-Yin 2025 adds an occupational-safety dimension (reduced technologist radiation exposure). Katsari 2021 and Dambrain 2026 evaluate real-world/business-case deployment. Ciborowski 2023 explicitly assessed impact on clinical decisions, though specific decision-change findings were not verified in detail. No evidence confirmed of altered treatment management (I3) or patient outcomes (I4).",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k) + a documented real-world deployment framework (Katsari 2021's nine-stage business-case assessment): multi-site, multinational clinical acceptability evidence exists, supporting R3 (enhanced implementation readiness). Not elevated to R4, as no documented TG-100/RBAAF-aligned risk management, formal incident-management framework, or national-guidance alignment was identified across the available literature.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    evidence: [
      {
        type: "Regulatory Clearance",
        description: "FDA 510(k) clearances K182336 (2018) and K211964 (2021) for SubtlePET — Class II, 21 CFR 892.2050, Product Code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Chaudhari et al. (2021). Low-count whole-body PET with deep learning in a multi-centre and externally validated study. npj Digit Med 4:127. Prospective, 3 institutions (US/Canada), n=50, true external validation. Vendor-led (6/11 authors financially tied to Subtle Medical, incl. 2 cofounders).",
        link: "https://doi.org/10.1038/s41746-021-00497-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Weyts et al. (2022). Artificial intelligence-based PET denoising could allow a two-fold reduction in [18F]FDG PET acquisition time in digital PET/CT. Eur J Nucl Med Mol Imaging 49(11):3750-3760. Prospective, single-centre (Caen, France), n=195. Independent (vendor provided a 1-month free trial).",
        link: "https://doi.org/10.1007/s00259-022-05800-1"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Weyts et al. (2023). Deep Learning Denoising Improves and Homogenizes Patient [18F]FDG PET Image Quality in Digital PET/CT. Diagnostics 13(9):1626. Same independent Caen group; extension study.",
        link: "https://doi.org/10.3390/diagnostics13091626"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bonardel et al. (2022). Clinical and phantom validation of a deep learning based denoising algorithm for F-18-FDG PET images from lower detection counting. EJNMMI Phys 9:36. Phantom + n=110, 2 independent French sites, 3 scanner models. Independent.",
        link: "https://doi.org/10.1186/s40658-022-00465-z"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Katsari et al. (2021). Artificial intelligence for reduced dose 18F-FDG PET examinations: a real-world deployment through a standardized framework and business case assessment. EJNMMI Phys 8(1):25. Prospective, single-centre (Italy), n=61. Independent.",
        link: "https://doi.org/10.1186/s40658-021-00374-7"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Margail et al. (2023). Imaging quality of an artificial intelligence denoising algorithm: validation in 68Ga PSMA-11 PET for patients with biochemical recurrence of prostate cancer. EJNMMI Res 13:50. Retrospective, single-centre (Clermont-Ferrand, France), n=30. Independent.",
        link: "https://doi.org/10.1186/s13550-023-00999-y"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Zhang-Yin et al. (2025). Implantation of an Artificial Intelligence Denoising Algorithm Using SubtlePET with Various Radiotracers: 18F-FDG, 68Ga PSMA-11 and 18F-FDOPA, Impact on the Technologist Radiation Doses. J Imaging 11(7):234. Retrospective, single-centre (Luxembourg), 3 tracers; unique occupational-dose angle. Independent.",
        link: "https://doi.org/10.3390/jimaging11070234"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Dambrain, Lacombe, Dufour, Lacoeuille et al. (2026). Clinical value of artificial intelligence in reducing PET image acquisition time: routine clinical validation using qualitative, quantitative, and radiomic analysis on a cohort of 282 patients. EJNMMI Phys 13:27. Phantom + n=282, 634 lesions, 5 readers, 2 tracers (FDG, PSMA-11). Independent (French academic).",
        link: "https://doi.org/10.1186/s40658-026-00835-x"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Ciborowski et al. (2023). Performance of a deep learning enhancement method applied to PET images acquired with a reduced acquisition time. Nucl Med Rev 26:116-122. n=37, two software versions tested, clinical-decision impact assessed. Independence presumed (Polish academic authorship) but not directly confirmed.",
        link: "https://doi.org/10.5603/nmr.94482"
      }
    ],
    limitations: [
      "The only fully multi-centre, prospectively externally-validated trial (Chaudhari 2021) is vendor-led; full independence is distributed across eight smaller single- or dual-site studies rather than concentrated in one large independent trial",
      "Independent study sample sizes are mostly modest (n=30-195), with one large independent cohort (Dambrain 2026, n=282)",
      "No evidence confirmed of changed treatment management or patient outcomes despite broad image-quality and workflow evidence",
      "Vendor-claimed performance (4x faster scans / 75% dose reduction) exceeds the more modest reductions typically replicated independently (twofold acquisition-time reduction in Weyts 2022; ~25-33% time/dose reduction in Zhang-Yin 2025; two-thirds dose in Katsari 2021)",
    ],
    clinicalEvidence: "Nine peer-reviewed studies (one vendor-led multi-centre trial; eight independent single/multi-site studies) across six countries and four radiotracers, plus FDA 510(k) clearances K182336 and K211964.",
    supersededBy: "subtle-hd-pet",
    lastUpdated: "2026-08-27",
    lastRevised: "2026-08-27",
    source: "FDA 510(k) database (K182336, K211964); peer-reviewed literature (Chaudhari 2021, Weyts 2022/2023, Bonardel 2022, Katsari 2021, Margail 2023, Zhang-Yin 2025, Dambrain 2026, Ciborowski 2023). Superseded by next-generation SubtleHD(PET) cleared 2026-05-27."
  },
  {
    id: "subtle-hd-pet",
    trainingData: {
        source: "PRNewswire 2026-05-27; Diagnostic Imaging 2026-05-27",
        disclosureLevel: "minimal",
        description: "The model uses a next-generation deep learning PET enhancement architecture that leverages anatomical CT data to improve reconstruction quality.",
        sourceUrl: "https://subtlemedical.com/"
    },
    evaluationData: {
        studyDesign: "Software V&V (FDA 510(k))",
        primaryEndpoint: "Not specified",
        results: "Not publicly disclosed",
        description: "FDA 510(k) K254013 validation across a broad range of accelerated low-count PET acquisitions. The software supports up to 75% faster PET imaging and aims to improve SUVmax quantitative accuracy.",
        source: "FDA 510(k) K254013 (cleared 2026-05-14)",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
    },
    name: "SubtleHD(PET)",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "Next-generation AI-powered PET image enhancement and acceleration software. Supports all FDA-approved radiotracers (including theranostic agents beyond 18F-FDG), enables up to 75% faster PET imaging on existing PET/CT and PET/MR scanners, leverages anatomical CT data to improve reconstruction quality, and provides adjustable denoising and improved SUVmax quantitative accuracy.",
    features: ["Deep learning enhancement", "PET acceleration", "All FDA-approved radiotracers", "Adjustable denoising", "CT-guided reconstruction"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/",
    anatomicalLocation: ["Whole body"],
    modality: ["PET"],
    diseaseTargeted: ["Cancer", "Theranostics", "Neurological disorders", "Cardiovascular disease"],
    releaseDate: "2026-05-27",
    version: "1.0",
    keyFeatures: [
      "Next-generation deep learning PET enhancement architecture",
      "Up to 75% faster PET imaging on existing scanners",
      "Compatible with all FDA-approved radiotracers including theranostic agents",
      "Adjustable denoising level to radiologist preference",
      "Leverages anatomical CT data for improved PET reconstruction",
      "Improved SUVmax quantitative accuracy",
      "Supports PET/CT and PET/MR systems"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM PET images", "Anatomical CT"],
      inputFormat: ["DICOM"],
      output: ["Enhanced PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner workstations"],
      deployment: ["Cloud-based", "On-premise option"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<60 seconds per study"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K254013",
        regulationNumber: "21 CFR 892.1200",
        productCode: "KPS",
        decisionDate: "2026-05-14"
      },
      intendedUseStatement: "SubtleHD(PET) is an AI-powered image processing software intended for enhancement of PET images acquired with FDA-approved radiotracers, supporting noise reduction, image acceleration, and improved quantitative accuracy on PET/CT and PET/MR systems."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "L1t",
    legacyClinicalImpact: "I0",
    evidenceRigorNotes: "FDA 510(k) K254013 cleared 2026-05-14 (announced 2026-05-27). No independent peer-reviewed publications yet.",
    clinicalImpactNotes: "Manufacturer-reported workflow improvements (up to 75% scan time reduction). No independently demonstrated clinical impact yet.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes: "R1 (lowered from R2 on 2026-11-08): newly cleared, with no published commissioning or deployment experience. Derived from E0 + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    priorVersions: [{ productId: "subtle-pet", name: "SubtlePET", fdaClearance: "K182336, K211964" }],
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description: "FDA 510(k) clearance K254013 for SubtleHD-PET (1.x), cleared 2026-05-14.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
      },
      {
        type: "Press Release",
        description: "PRNewswire 2026-05-27 announcement naming SubtleHD(PET) FDA clearance.",
        link: "https://subtlemedical.com/"
      }
    ],
    clinicalEvidence: "FDA 510(k) K254013 clearance based on validation across accelerated low-count PET acquisitions; independent literature pending.",
    lastUpdated: "2026-08-27",
    lastRevised: "2026-08-27",
    source: "FDA 510(k) database (K254013); PRNewswire 2026-05-27."
  },
  {
    id: "subtle-aimify",
    trainingData: {
        description: "K240290 describes a U-Net-style 2.5D network, use of the SubtleMR (K223623) denoising module, a low-dose versus regular-dose training comparison, and named source regions. The training-set count is not in the 510(k) summary. A count of 56 training and 13 validation cases appears in Yin 2026 only by citation of Pasumarthi 2021, which is a research model and is not inserted here as the cleared product's training size.",
        disclosureLevel: "partial",
        source: "FDA 510(k) summary K240290",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K240290.pdf"
    },
    evaluationData: {
        description: "K240290 is a bench test plus a reader study of standard-dose gadolinium brain MRI. The acceptance bar was an average improvement of at least 50% in CNR, LBR and CEP versus the acquired post-contrast image. ECR 2026 included several Bracco-sponsored AiMIFY sessions inside a fourteen-presentation Subtle programme covering MRI, PET and early CT. Those presentations are not AiMIFY evidence.",
        studyDesign: "FDA 510(k) bench test plus reader study",
        primaryEndpoint: "Contrast-to-noise ratio (CNR), contrast enhancement (CEP), and lesion-to-brain ratio (LBR), with a 50% average-improvement bar",
        source: "FDA 510(k) summary K240290",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K240290.pdf",
        results: "All 95 cases: CNR +559.94%, LBR +62.07%, CEP +133.29%. The 57 lesion cases: CNR +831.70%, LBR +58.80%, CEP +101.80%. The summary also reports false lesions and higher vessel conspicuity (11.58% versus 3.51%). Standard-of-care images were scored sufficient to identify the false lesions. The cleared use is the standard approved gadolinium dose, not a reduced dose."
    },
    name: "AiMIFY",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered solution for enhancing gadolinium-based contrast agent MRI images, improving contrast-to-noise ratio and lesion visibility in brain imaging.",
    features: ["Deep learning enhancement", "Contrast enhancement", "Brain MRI", "Standard-dose contrast amplification"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/aimify/",
    anatomicalLocation: ["Brain"],
    modality: ["MRI"],
    diseaseTargeted: ["Enhancing tissue on gadolinium-based contrast brain MRI. Reader-study pathologies are not the labelled indication."],
    releaseDate: "2024-08-21",
    version: "1.x",
    keyFeatures: [
      "Deep learning contrast enhancement",
      "Improves contrast-to-noise ratio (CNR)",
      "Enhances contrast enhancement percentage (CEP)",
      "Improves lesion-to-brain ratio (LBR)",
      "Works with gradient echo, 3D BRAVO, 3D MPRAGE sequences",
      "Supports 2D T1 spin echo and T1 FLAIR"
    ],
    technicalSpecifications: {
      population: "Public indications state no age limit. Performance data include age 7. Gao 2026 enrolled adults.",
      input: ["Pre-contrast T1 MRI", "Post-contrast T1 MRI"],
      inputFormat: ["DICOM"],
      output: ["Enhanced contrast MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner integration"],
      deployment: ["Background processing through an MDDS, on the facility network or remotely, with no user interface"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "Not stated in the documents read on 2026-11-05. The previous '<45 seconds per study' figure had no source and was removed."
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "Not stated",
        type: "MDR",
        notes: "Bracco and Subtle announced an MDR CE mark on 16 June 2025, and Bracco announced the EU launch on 2 March 2026. The announcements do not state the class or the notified body. Subtle manufactures the software for Bracco. Class IIa was removed until a certificate is seen."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K240290",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2024-08-21"
      },
      intendedUseStatement: "AiMIFY is an image processing software that can be used for image enhancement in MRI images. It can be used to increase contrast-to-noise ratio (CNR), contrast enhancement (CEP), and lesion-to-brain ratio (LBR) of enhancing tissue in brain MRI images acquired with a gadolinium-based contrast agent."
    },
    market: {
      onMarketSince: "2024",
      distributionChannels: ["Direct sales", "Distribution partners", "Bracco EU launch announced 2 March 2026. Subtle manufactures the software for Bracco. releaseDate 2024-08-21 is the FDA decision date."]
    },
    keyPapers: [
      {"doi":"10.3174/ajnr.A9591","pmid":"42595464","title":"Evaluation of an AI-powered tool in improving lesion visualization on standard-dose contrast-enhanced brain MRI: a retrospective, multi-centre study","authors":"Gao Y et al.","journal":"AJNR American Journal of Neuroradiology","year":"2026","evidenceRigor":"E2","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Retrospective study of 86 adults at three hospitals in the Wenzhou Medical University network, explicitly naming AiMIFY. Abstract mean increases versus standard post-contrast: CNR 495.16%, LBR 58.94%, CEP 160.55%. Preference for AiMIFY images was 84.9%, 29.1% and 68.6% across three readers. 29.1% is not a majority. The conflict statement was not available on 2026-11-05 (full text not in PMC). Listed affiliations are hospitals, so vendorIndependent stays true until the PDF is read. Endpoints are image quality, which is L2 on the current scale. The stored legacy code remains I1.","vendorIndependent":true,"multiCenter":true,"externalValidation":true},
      {"doi":"10.21037/qims-2026-1-0383","pmid":"42582656","title":"Artificial intelligence-amplified contrast enhancement in brain magnetic resonance imaging for improving image quality and lesion visualization: a prospective pilot study","authors":"Yin P et al.","journal":"Quantitative Imaging in Medicine and Surgery","year":"2026","evidenceRigor":"E2","clinicalImpact":"L2","legacyClinicalImpact":"I1","rationale":"Prospective single-centre pilot. 41 enhancing-lesion cases, standard-dose 3D T1, ages 7–70. Authors declare no conflict. Image-quality and confidence endpoints. Internal morphology was not significant. The authors state that diagnostic accuracy was not measured.","vendorIndependent":true,"prospective":true,"externalValidation":true}
    ],
    evidenceRigor: "E2",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes: "E2 still fits the studies that can be read. Gao 2026 is a retrospective three-hospital study in one university network. Yin 2026 (doi:10.21037/qims-2026-1-0383) also names AiMIFY and was missing from the 2026-08-25 note, which called Gao the first peer-reviewed AiMIFY paper. K240290 is the regulatory bench test. The fourteen ECR 2026 presentations are Subtle's programme, not AiMIFY evidence. Venkata 2026 does not name AiMIFY in the abstract and is not scored.",
    clinicalImpactNotes: "L2: CNR, LBR, CEP and reader preference are accuracy and image-quality endpoints. Nothing yet measures a change in the chosen diagnosis, management or a patient outcome. Dose reduction is not a published finding. The cleared use is the standard approved gadolinium dose. legacyClinicalImpact I1 is the old code only. K240290 also reports false lesions and higher vessel conspicuity (11.58% versus 3.51%). A PCCP lists more contrast agents, infants and children, further scanners, shorter processing and vessel suppression as planned changes, not current functions.",
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "FDA-cleared, with an announced MDR CE mark whose class and notified body are not in the announcement. Local validation is still required before adoption.",
    clinicalEvidence: "K240290 bench test plus reader study: CNR +559.94% (+831.70% on 57 lesion cases), LBR +62.07% (+58.80%), CEP +133.29% (+101.80%), against a 50% acceptance bar. Gao 2026 and Yin 2026 are the peer-reviewed studies that name AiMIFY.",
    limitations: [
      "False lesions are reported in the 510(k) summary. Standard-of-care images were scored sufficient to identify them. Vessel conspicuity was higher on processed images (11.58% versus 3.51%).",
      "The indication is the standard approved gadolinium dose. Dose reduction is not a published finding.",
      "Public indications state no age limit. Performance data include a patient aged 7. Gao 2026 enrolled adults.",
      "More contrast agents, infants and children, further scanners, shorter processing and vessel suppression are planned PCCP changes, not current functions.",
      "The homepage line 'up to double the visibility of FDA-approved Gd doses' is not used. The summary's appearance figure is 93% higher calculated dose concentration on BRAVO, at the standard dose, and the CNR increase includes denoising."
    ],
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-05",
    source: "FDA 510(k) K240290 summary and openFDA (decision 2024-08-21, AiMIFY 1.x, product code LLZ, 21 CFR 892.2050); GUDID primary DI 00860000171298; Bracco MDR announcement 16 June 2025 and EU launch 2 March 2026; Gao 2026 (doi:10.3174/ajnr.A9591) and Yin 2026 (doi:10.21037/qims-2026-1-0383). Q4 2026 review, checked 2026-11-05. Other Subtle products in this file were not revised."
  },
  {
    id: "subtle-hd",
    trainingData: {
        source: "FDA 510(k) database (K243250) and company website",
        disclosureLevel: "minimal",
        demographics: "Adult and pediatric",
        description: "The model is a deep learning-based noise reduction and image sharpness enhancement tool for MRI. Training details are not publicly disclosed in the source file beyond its application to all body parts and adult/pediatric populations.",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243250.pdf"
    },
    evaluationData: {
        primaryEndpoint: "Equivalent or improved diagnostic quality",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243250.pdf",
        description: "FDA validation study for 510(k) clearance (K243250) demonstrating equivalent or improved diagnostic quality for general-purpose MRI enhancement across all body parts.",
        results: "Not publicly disclosed",
        source: "FDA 510(k) summary K243250",
        studyDesign: "Software V&V (FDA 510(k))"
    },
    name: "SubtleHD",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered general-purpose MRI enhancement software for noise reduction and image sharpness improvement across all body parts. Part of the Subtle-ELITE suite alongside SubtleSYNTH and SubtleALIGN.",
    features: ["Deep learning enhancement", "Noise reduction", "All body parts", "Image sharpness"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-hd/",
    anatomicalLocation: ["Brain", "Spine", "Body", "Extremities"],
    modality: ["MRI"],
    diseaseTargeted: ["Neurological disorders", "Musculoskeletal conditions", "Oncology", "General diagnostic imaging"],
    releaseDate: "2025-02-12",
    version: "1.0",
    keyFeatures: [
      "Deep learning-based noise reduction",
      "Image sharpness enhancement",
      "Supports all body parts MRI",
      "Vendor-neutral compatibility",
      "General-purpose MRI enhancement",
      "Up to 80% scan time reduction in certain sequences (as part of Subtle-ELITE suite)",
      "Improved diagnostic image quality"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner integration"],
      deployment: ["Cloud-based", "On-premise"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<30 seconds per study"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K243250",
        regulationNumber: "21 CFR 892.2050",
        productCode: "QIH",
        decisionDate: "2025-02-12"
      },
      intendedUseStatement: "SubtleHD is an image processing software that can be used for image enhancement of all body parts MRI images. It can be used for noise reduction and increasing image sharpness."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    keyPapers: [
      {"doi":"10.1002/jmri.70507","pmid":"42593101","title":"Deep learning-based enhancement of already diagnostic-quality MRI for Alzheimer's disease classification: effects on model performance and training data requirements","authors":"Zhang Z et al.","journal":"Journal of Magnetic Resonance Imaging","year":"2026","evidenceRigor":"E1","clinicalImpact":"L2", "legacyClinicalImpact": "I1","rationale":"Single retrospective cohort study explicitly naming SubtleHD; endpoint is downstream classification-model performance on enhanced images, i.e. technical image-quality utility rather than a clinical workflow or decision endpoint. Added and verified in the 2026-08-25 sweep.","vendorIndependent":true}
    ],
    evidenceRigor: "E1",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes: "2026-08-25 Wave 4 per-paper sweep: first SubtleHD-naming peer-reviewed publication found (Zhang et al., JMRI 2026, doi:10.1002/jmri.70507, PMID 42593101), single-centre retrospective — moves the product from E0 to E1. FDA validation K243250.",
    clinicalImpactNotes: "I1 (technical efficacy): the only published study measures the effect of SubtleHD enhancement on a downstream classification model, not on clinical workflow, decisions or outcomes.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    clinicalEvidence: "FDA 510(k) clearance based on clinical validation studies demonstrating equivalent or improved diagnostic quality",
    lastUpdated: "2026-10-15",
    lastRevised: "2026-08-27",
    source: "FDA 510(k) database (K243250) and company website; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)"
  },
  {
    id: "subtle-hd-ct",
    trainingData: {
        disclosureLevel: "minimal",
        source: "FDA 510(k) summary K254120",
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254120.pdf"
    },
    evaluationData: {
        sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254120.pdf",
        source: "FDA 510(k) summary K254120",
        description: "FDA 510(k) clearance based on validation studies demonstrating noise reduction and improved low-contrast detectability across a range of CT scanner generations.",
        results: "Not publicly disclosed",
        primaryEndpoint: "Not specified",
        studyDesign: "Software V&V (FDA 510(k))"
    },
    name: "SubtleHD(CT)",
    company: "Subtle Medical",
    category: "Image Enhancement",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "AI-powered CT image enhancement software that reduces noise and improves low-contrast detectability across CT scanner generations, integrating into existing clinical workflows.",
    features: ["Deep learning enhancement", "CT specific", "Noise reduction", "Low contrast detectability"],
    certification: "FDA Cleared",
    logoUrl: "/logos/SubtleMedical.jpg",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtlehdct/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    diseaseTargeted: ["General diagnostic imaging", "Oncology"],
    releaseDate: "2026-06-10",
    version: "1.x",
    compatibleSystems: [
      "Vendor-neutral (validation data from Canon, GE, Hitachi, Philips and Siemens scanners, per K254120)",
      "Primary reconstructed FBP images only; performance with iterative or deep learning reconstructions is unknown (per K254120)"
    ],
    keyFeatures: [
      "Deep learning CT image enhancement",
      "Noise reduction across CT scanner generations",
      "Improved low-contrast detectability",
      "Compatible with older and newer CT systems",
      "Seamless integration into existing workflows",
      "Vendor-neutral compatibility"
    ],
    technicalSpecifications: {
      population: "Adult and pediatric",
      input: ["DICOM CT images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced CT images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["PACS", "Scanner workstations", "DICOM node / PACS (background service, no user interface)"],
      deployment: ["Cloud-based", "On-premise", "On-premise virtual machine (Docker, GPU)"],
      triggerForAnalysis: "Automated workflow",
      processingTime: "<60 seconds per study"
    },
    regulatory: {
      ce: {
        status: "under_review",
        class: "IIa",
        type: "Medical Device"
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K254120",
        regulationNumber: "21 CFR 892.2050",
        productCode: "QIH",
        decisionDate: "2026-05-15"
      },
      intendedUseStatement: "SubtleHD-CT is an AI/ML software intended for the processing and enhancement of CT images regardless of the manufacturer or model of CT scanner. (Source: FDA 510(k) K254120 Indications for Use)"
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    evidenceRigor: "E0",
    clinicalImpact: "I0",
    evidenceRigorNotes: "FDA 510(k) clearance K254120 announced 2026-06-10. No independent peer-reviewed publications yet. 2026-08-25 Wave 5B sweep (Europe PMC 2014-2026, alias-gated): no publication names this product. E0 stands.",
    clinicalImpactNotes: "Manufacturer-reported improvements in noise reduction and low-contrast detectability. No independently demonstrated clinical impact yet.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes: "Derived from E0 + FDA 510(k): high implementation burden — limited independent evidence; structured pilot, expanded validation and human-factors testing recommended.",
    limitations: [
      "For radiotherapy: CT number accuracy (within ±5 HU of the FBP input) was shown only in phantoms; not validated for planning CT or dose calculation"
    ],
    clinicalEvidence: "FDA 510(k) clearance based on validation studies; independent literature pending.",
    lastUpdated: "2026-11-08",
    lastRevised: "2026-11-08",
    source: "Subtle Medical press release 2026-06-10; PRNewswire 2026-06-10; AuntMinnie 2026-06-11; FDA 510(k) database K254120.; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)"
  }
];
