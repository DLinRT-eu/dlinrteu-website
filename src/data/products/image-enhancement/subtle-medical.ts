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
    source: "FDA 510(k) K191688, K203182 et al.; peer-reviewed literature"
  },
  {
        id: "subtle-pet",
    name: "SubtlePET",
    company: "Subtle Medical",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtle-medical-receives-ce-mark-for-subtlepet-2-0-to-expand-improved-pet-imaging-capabilities/",
    githubUrl: "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description: "DICOM-based PET image-processing software intended to transfer, store, and reduce noise in PET images acquired with the radiotracers listed in its FDA-cleared intended use. Published performance is protocol-specific; it does not establish a universal scan-time or dose reduction.",
    category: "Image Enhancement",
    certification: "FDA 510(k)-cleared (K182336, K211964); CE mark announced by the manufacturer, current EU certificate not independently verified",
    logoUrl: "/logos/SubtleMedical.jpg",
    anatomicalLocation: ["Whole body"],
    modality: ["PET"],
    diseaseTargeted: ["Tracer-dependent clinical imaging applications"],
    features: [
      "PET image noise reduction",
      "DICOM-based image transfer and storage",
      "Supports the radiotracers in the FDA-cleared intended use"
    ],
    version: "2.0.0",
    keyFeatures: [
      "DICOM-based PET image-processing workflow",
      "Noise reduction for specified PET radiotracers",
      "Validated in selected reduced-count and reduced-activity study protocols"
    ],
    technicalSpecifications: {
      population: "Not specified in the FDA-cleared intended use; pediatric evidence is limited to selected published cohorts",
      input: ["DICOM PET images"],
      inputFormat: ["DICOM"],
      output: ["Processed PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["DICOM", "PACS/workstation workflow"]
    },
    trainingData: {
      disclosureLevel: "minimal",
      description: "Public FDA summaries do not disclose the cleared version's training-set size, age distribution, or tracer balance. Published evaluation cohorts should not be treated as training-data descriptions.",
      source: "FDA 510(k) summaries K182336 and K211964",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182336.pdf, https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211964.pdf"
    },
    evaluationData: {
      studyDesign: "FDA software verification and validation plus peer-reviewed phantom, retrospective, and prospective clinical evaluations",
      primaryEndpoint: "PET image quality, lesion conspicuity, quantitative measures, and selected workflow outcomes at reduced counts, acquisition time, or administered activity",
      results: "Results are protocol- and cohort-specific. Selected studies report comparable image quality or local workflow effects; other evaluations note small-lesion conspicuity or quantitative/response-classification differences. These data do not establish guaranteed 4x faster scans or 75% dose reduction across clinical settings.",
      description: "Evidence includes a prospective multicentre external-reader FDG study, independent studies in defined PET protocols, and single-centre implementation work. Several studies use reconstructed low-count data, and software versions and tracers vary.",
      source: "FDA 510(k) K182336 and K211964; peer-reviewed publications listed below",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211964.pdf, https://doi.org/10.1038/s41746-021-00497-2, https://doi.org/10.1186/s40658-022-00465-z, https://doi.org/10.1186/s13550-024-01128-z"
    },
    regulatory: {
      ce: {
        eudamed: {
          basicUdi: "08600001712SubtlePET2B3",
          riskClass: "class-iia",
          registeredTradeName: "SubtlePET (Software as a Service for post-processing of Positron Emission Tomography data)",
          manufacturerSrn: "US-MF-000032747",
          sourceUrl: "https://ec.europa.eu/tools/eudamed/api/devices/udiDiData?page=0&pageSize=20&size=20&languageIso2Code=en&tradeName=SubtlePET",
          lastVerified: "2026-09-22",
        notes: "Subtle Medical announced CE marking for SubtlePET 2.0 in June 2021. Current certificate validity and device-specific EUDAMED details remain unverified."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K182336, K211964",
        regulationNumber: "21 CFR 892.1200",
        productCode: "KPS (primary); LLZ (subsequent)",
        decisionDate: "2021-09-28",
        notes: "K182336 decision date: 2018-11-30. K211964 decision date: 2021-09-28. FDA records show substantial-equivalence decisions."
      },
      intendedUseStatement: "SubtlePET is an image processing software intended for use by radiologists and nuclear medicine physicians for transfer, storage, and noise reduction of fluorodeoxyglucose (FDG), amyloid, 18F-DOPA, 18F-DCFPyL, Ga-68 Dotatate, and Ga-68 PSMA radiotracer PET images."
    },
    evidenceRigor: "E2",
    clinicalImpact: "L3",
    legacyClinicalImpact: "I2",
    evidenceRigorNotes: "E2: product-specific peer-reviewed evidence includes prospective external and multicentre evaluation as well as independent clinical and phantom studies. Many studies remain single-centre, protocol-specific, and limited in size; some vendor relationships or supplied software are disclosed.",
    clinicalImpactNotes: "L3 / legacy I2: selected implementation studies report local activity/time savings or workflow effects. Image-quality findings do not establish broad patient benefit, and mixed standard/AI follow-up protocols can change response classifications. No confirmed treatment-management or patient-outcome benefit supports a higher impact rating.",
    evidenceVendorIndependent: true,
    evidenceMultiCenter: true,
    evidenceMultiNational: true,
    evidenceProspective: true,
    evidenceExternalValidation: true,
    keyPapers: [
      {
        doi: "10.1038/s41746-021-00497-2",
        title: "Low-count whole-body PET with deep learning in a multicenter and externally validated study",
        authors: "Chaudhari AS et al.",
        journal: "npj Digital Medicine",
        year: "2021",
        evidenceRigor: "E2",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Prospective external-reader evaluation in 50 adults across three sites. Subtle Medical financial interests were disclosed.",
        multiCenter: true,
        multiNational: true,
        prospective: true,
        externalValidation: true
      },
      {
        doi: "10.1148/ryai.2021200232",
        title: "Validation of Deep Learning-based Augmentation for Reduced 18F-FDG Dose for PET/MRI in Children and Young Adults with Lymphoma",
        authors: "Theruvath AJ et al.",
        journal: "Radiology: Artificial Intelligence",
        year: "2021",
        evidenceRigor: "E2",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Small external PET/MRI cohort using version 1.3; supports only a narrow pediatric research finding, not a general training-demographic or current-version claim.",
        externalValidation: true
      },
      {
        doi: "10.1186/s40658-021-00374-7",
        title: "Artificial intelligence for reduced dose 18F-FDG PET examinations: a real-world deployment through a standardized framework and business case assessment",
        authors: "Katsari K et al.",
        journal: "EJNMMI Physics",
        year: "2021",
        evidenceRigor: "E1",
        clinicalImpact: "L3",
        legacyClinicalImpact: "I2",
        rationale: "Prospective single-centre implementation in 61 patients at two-thirds standard FDG activity with a local business-case assessment."
      },
      {
        doi: "10.1007/s00259-022-05800-1",
        title: "Artificial intelligence-based PET denoising could allow a two-fold reduction in [18F]FDG PET acquisition time in digital PET/CT",
        authors: "Weyts K et al.",
        journal: "European Journal of Nuclear Medicine and Molecular Imaging",
        year: "2022",
        evidenceRigor: "E2",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Prospective single-centre evaluation in 195 patients; reduced-time FDG results are specific to the study protocol and included lesion-level caveats.",
        prospective: true
      },
      {
        doi: "10.1186/s40658-022-00465-z",
        title: "Clinical and phantom validation of a deep learning based denoising algorithm for F-18-FDG PET images from lower detection counting",
        authors: "Bonardel G et al.",
        journal: "EJNMMI Physics",
        year: "2022",
        evidenceRigor: "E2",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Phantom and 110-patient evaluation across three PET device models; half-count findings were generally comparable, while one-third-count imaging raised small-object detectability concerns.",
        multiCenter: true,
        externalValidation: true
      },
      {
        doi: "10.3390/diagnostics13091626",
        title: "Deep learning denoising improves and homogenizes patient [18F]FDG PET image quality in digital PET/CT",
        authors: "Weyts K et al.",
        journal: "Diagnostics",
        year: "2023",
        evidenceRigor: "E1",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Retrospective single-centre FDG study; global image-quality findings do not remove small-lesion limitations."
      },
      {
        doi: "10.1186/s13550-023-00999-y",
        title: "Imaging quality of an artificial intelligence denoising algorithm: validation in 68Ga PSMA-11 PET",
        authors: "Margail C et al.",
        journal: "EJNMMI Research",
        year: "2023",
        evidenceRigor: "E1",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Retrospective single-centre study in 30 patients; reported quantitative changes including lower lesion SUV and higher liver background."
      },
      {
        doi: "10.5603/nmr.94482",
        title: "Performance of a deep learning enhancement method applied to PET images acquired with a reduced acquisition time",
        authors: "Ciborowski K et al.",
        journal: "Nuclear Medicine Review",
        year: "2023",
        evidenceRigor: "E1",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Single-centre 37-patient FDG comparison of two software versions; reduced conspicuity of some lesions was reported with one version."
      },
      {
        doi: "10.1186/s13550-024-01128-z",
        title: "The impact of introducing deep learning based [18F]FDG PET denoising on EORTC and PERCIST therapeutic response assessments in digital PET/CT",
        authors: "Weyts K et al.",
        journal: "EJNMMI Research",
        year: "2024",
        evidenceRigor: "E2",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Prospective single-centre study in 110 patients; 11/110 (10%) had at least one discordant mixed-versus-standard response classification.",
        prospective: true
      },
      {
        doi: "10.3390/jimaging11070234",
        title: "Implantation of an Artificial Intelligence Denoising Algorithm Using SubtlePET with Various Radiotracers: 18F-FDG, 68Ga PSMA-11 and 18F-FDOPA, Impact on the Technologist Radiation Doses",
        authors: "Zhang-Yin J et al.",
        journal: "Journal of Imaging",
        year: "2025",
        evidenceRigor: "E1",
        clinicalImpact: "L3",
        legacyClinicalImpact: "I2",
        rationale: "Retrospective single-centre implementation study across three tracers; reported site-specific time, activity, throughput, and staff-exposure outcomes."
      },
      {
        doi: "10.1186/s40658-026-00835-x",
        title: "Clinical value of artificial intelligence in reducing PET image acquisition time: routine clinical validation using qualitative, quantitative, and radiomic analysis on a cohort of 282 patients undergoing [18F]FDG and [68Ga]Ga-PSMA-11 PET/CT",
        authors: "Dambrain A et al.",
        journal: "EJNMMI Physics",
        year: "2026",
        evidenceRigor: "E1",
        clinicalImpact: "L2",
        legacyClinicalImpact: "I1",
        rationale: "Single-centre phantom and clinical evaluation; results are protocol-specific and should not be generalized to all tracers or acquisition settings."
      }
    ],
    evidence: [
      {
        type: "FDA 510(k) Database",
        description: "K182336 and K211964 records list SubtlePET, substantial-equivalence decisions, decision dates, regulation 21 CFR 892.1200, primary product code KPS, and subsequent product code LLZ.",
        link: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K211964"
      },
      {
        type: "FDA 510(k) Summary",
        description: "K211964 covers SubtlePET 2.0.0 and states the intended use and six U.S. tracer categories.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K211964.pdf"
      },
      {
        type: "Manufacturer Announcement",
        description: "Subtle Medical announced a CE mark for SubtlePET 2.0 in June 2021 and listed its stated European tracer scope. This does not independently establish current certificate validity.",
        link: "https://subtlemedical.com/subtle-medical-receives-ce-mark-for-subtlepet-2-0-to-expand-improved-pet-imaging-capabilities/"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Chaudhari et al. (2021). Multicentre external-reader validation of low-count FDG PET in 50 adults; financial interests were disclosed.",
        link: "https://doi.org/10.1038/s41746-021-00497-2"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Weyts et al. (2022). Prospective single-centre evaluation of reduced-time FDG PET in 195 patients.",
        link: "https://doi.org/10.1007/s00259-022-05800-1"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Bonardel et al. (2022). Phantom and 110-patient lower-count FDG PET evaluation across three device models.",
        link: "https://doi.org/10.1186/s40658-022-00465-z"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Katsari et al. (2021). Prospective single-centre reduced-activity FDG implementation with a site-specific business case.",
        link: "https://doi.org/10.1186/s40658-021-00374-7"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Weyts et al. (2024). Response-classification study reporting at least one mixed-versus-standard discordance in 11 of 110 patients.",
        link: "https://doi.org/10.1186/s13550-024-01128-z"
      },
      {
        type: "Peer-reviewed Publication",
        description: "Zhang-Yin et al. (2025). Retrospective, single-centre implementation study across FDG, PSMA-11, and FDOPA.",
        link: "https://doi.org/10.3390/jimaging11070234"
      },
      {
        type: "Regulatory Clearance",
        description: "K254013 is a separate SubtleHD-PET clearance and is not included in the SubtlePET 2.0 product claims.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
      }
    ],
    clinicalEvidence: "Product-specific publications include external/multicentre validation, single-centre prospective and retrospective evaluations, and implementation audits. Findings vary by tracer, count level, reconstruction, software version, and study design. Evidence supports limited workflow effects, not a universal scan-time or dose reduction or demonstrated patient-outcome benefit.",
    releaseDate: "2018-11-30",
    market: {
      onMarketSince: "2018",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    adoptionReadiness: "R3",
    adoptionReadinessNotes: "Derived from E2 + FDA 510(k) + a documented real-world deployment framework (Katsari 2021's nine-stage business-case assessment): multi-site, multinational clinical acceptability evidence exists, supporting R3 (enhanced implementation readiness). Not elevated to R4, as no documented TG-100/RBAAF-aligned risk management, formal incident-management framework, or national-guidance alignment was identified across the available literature.",
    limitations: [
      "The only fully multi-centre, prospectively externally-validated trial (Chaudhari 2021) is vendor-led; full independence is distributed across eight smaller single- or dual-site studies rather than concentrated in one large independent trial",
      "Independent study sample sizes are mostly modest (n=30-195), with one large independent cohort (Dambrain 2026, n=282)",
      "No evidence confirmed of changed treatment management or patient outcomes despite broad image-quality and workflow evidence",
      "Vendor-claimed performance (4x faster scans / 75% dose reduction) exceeds the more modest reductions typically replicated independently (twofold acquisition-time reduction in Weyts 2022; ~25-33% time/dose reduction in Zhang-Yin 2025; two-thirds dose in Katsari 2021)",
    ],
    supersededBy: "subtle-hd-pet",
    lastUpdated: "2026-11-09",
    lastRevised: "2026-11-09",
    source: "FDA 510(k) K182336 and K211964; manufacturer CE announcement; peer-reviewed literature"
  },
  {
    id: "subtle-hd-pet",
    name: "SubtleHD(PET)",
    company: "Subtle Medical",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtlepet/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description:
      "Prescription image-processing software intended for noise reduction of PET images, including PET/CT and PET/MR, obtained with any kind of radiotracer. The FDA-cleared device (SubtleHD-PET 1.x) has PET-only and PET/CT models. Subtle Medical advertises up to 75% faster imaging; this is a manufacturer claim, not an FDA-labeled performance guarantee.",
    category: "Image Enhancement",
    certification:
      "FDA 510(k)-cleared (K254013; Class II). EU CE status not verified.",
    logoUrl: "/logos/SubtleMedical.jpg",
    anatomicalLocation: ["Brain", "Whole body"],
    modality: ["PET"],
    diseaseTargeted: [],
    releaseDate: "2026-05-27",
    version: "1.x",
    features: [
      "Deep-learning PET noise reduction",
      "PET-only and PET/CT processing models",
      "DICOM routing through an MDDS",
      "PET/CT and PET/MR image support",
      "Manufacturer-reported accelerated acquisition workflows"
    ],
    keyFeatures: [
      "FDA indication covers PET images obtained with any kind of radiotracer",
      "PET-only model accepts PET DICOM; PET/CT model accepts paired PET and CT DICOM",
      "FDA retrospective validation included 203 PET-only and 122 PET/CT studies",
      "FDA performance testing assessed three denoising mix factors",
      "FDA-submitted reader study assessed image quality, diagnostic confidence, artifacts, and lesion counts",
      "Manufacturer advertises up to 75% faster imaging; benefits are protocol-specific and not established as universal outcomes"
    ],
    technicalSpecifications: {
      population:
        "FDA validation included ages 2-88; the FDA indication does not specify an age range.",
      input: [
        "PET DICOM series for the PET-only model",
        "Paired PET and CT DICOM series for the PET/CT model"
      ],
      inputFormat: ["DICOM"],
      output: ["Processed PET images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: [
        "DICOM routing through a Medical Device Data System (MDDS)",
        "PACS/workstation destinations (manufacturer-described)"
      ],
      deployment: ["Cloud-based", "On-premises"],
      triggerForAnalysis:
        "DICOM images are routed through an MDDS; the FDA summary describes no dedicated user interface or direct scanner interaction.",
      processingTime:
        "Manufacturer states processing takes seconds and total transfer time is under five minutes; not an FDA performance endpoint."
    },
    trainingData: {
      disclosureLevel: "minimal",
      description:
        "The FDA summary describes PET-only and PET/CT convolutional neural-network models and reports no subject, study, or image overlap between training and test data. Training cohort size, composition, and provenance are not disclosed; validation cohorts are not training-data descriptions.",
      source: "FDA 510(k) Summary K254013",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
    },
    evaluationData: {
      studyDesign:
        "Manufacturer software verification and validation, retrospective performance validation, and retrospective reader study submitted in FDA 510(k) K254013.",
      primaryEndpoint:
        "Mean PSNR improvement of at least 1 dB with statistical significance; statistically significant SNR improvement. Reader endpoints included image quality/diagnostic confidence, artifact assessment, and false-positive/false-negative lesion counts.",
      results:
        "Both models passed the stated PSNR/SNR acceptance criteria. At default mix, mean PSNR gains were 1.935 dB (PET-only) and 1.215 dB (PET/CT); mean SNR gains were 3.179 dB and 4.590 dB. Reader ratings met the stated image-quality/diagnostic-confidence criteria, with no added false-positive or false-negative findings in the evaluated set; the artifact criterion passed. SUVmax results were exploratory and tracer-specific. The FDA summary advises caution with VPFX + PSF reconstruction.",
      description:
        "The FDA summary reports 203 PET-only studies and 122 PET/CT studies, with no combined unique-patient count stated. The retrospective test data included brain and whole-body exams, ages 2-88, nine radiotracers, and multiple scanner manufacturers. Results are regulatory-submission evidence, not independent prospective clinical validation.",
      source: "FDA 510(k) Summary K254013",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
    },
    regulatory: {
      ce: {
        status: "unverified",
        class: "Not verified",
        type: "Medical Device",
        notes:
          "No device-specific EU CE certificate or declaration for SubtleHD-PET was verified in the reviewed sources. A generic SubtleHD MHRA listing does not establish PET-specific EU status."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K254013",
        regulationNumber: "21 CFR 892.2050",
        productCode: "LLZ",
        decisionDate: "2026-05-14"
      },
      intendedUseStatement:
        "SubtleHD-PET is an image processing software intended for noise reduction of PET images (including PET/CT and PET/MR) obtained with any kind of radiotracer (e.g. 18F-FDG). Prescription use."
    },
    market: {
      onMarketSince: "2026",
      distributionChannels: [
        "AMG Medtech (UK; distribution agreement announced by Subtle Medical)",
        "Medical Horizons (Italy; distribution agreement announced by Subtle Medical)"
      ],
      availability:
        "The manufacturer announced both distribution agreements on 2026-10-20. The announcement does not establish product-specific installed sites or commissioning outcomes."
    },
    evidenceRigor: "E0",
    clinicalImpact: "L2",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes:
      "E0: FDA K254013 publicly documents manufacturer-generated retrospective validation and reader-study results. No independent peer-reviewed study specific to SubtleHD-PET (1.x) was identified.",
    clinicalImpactNotes:
      "L2 (legacy I1): Retrospective reader assessment provides narrow image-quality relevance, but no product-specific workflow benefit, diagnostic-management change, radiotherapy-planning validation, or patient-outcome benefit was identified.",
    adoptionReadiness: "R1",
    adoptionReadinessNotes:
      "R1: FDA-cleared and covered by manufacturer-announced UK and Italy distribution agreements, but public product-specific commissioning, routine QA, and monitoring evidence was not identified.",
    priorVersions: [
      {
        productId: "subtle-pet",
        name: "SubtlePET",
        fdaClearance: "K182336, K211964"
      }
    ],
    evidence: [
      {
        type: "FDA 510(k) Summary",
        description:
          "K254013 cleared SubtleHD-PET (1.x) on 2026-05-14; Class II, 21 CFR 892.2050, product code LLZ.",
        link: "https://www.accessdata.fda.gov/cdrh_docs/pdf25/K254013.pdf"
      },
      {
        type: "Manufacturer Product Page",
        description:
          "Subtle Medical describes its marketed acquisition-time examples, deployment options, and DICOM workflow.",
        link: "https://subtlemedical.com/subtlepet/"
      },
      {
        type: "Manufacturer Announcement",
        description:
          "Subtle Medical announced FDA clearance on 2026-05-27.",
        link: "https://subtlemedical.com/subtle-medical-receives-fda-clearance-for-subtlehdpet-next-generation-ai-powered-image-acceleration-and-enhancement-software/"
      },
      {
        type: "Manufacturer Distribution Announcement",
        description:
          "Subtle Medical announced UK and Italy distribution agreements on 2026-10-20.",
        link: "https://subtlemedical.com/subtle-medical-adds-distribution-partners-in-the-uk-and-italy-to-support-european-growth/"
      }
    ],
    clinicalEvidence:
      "FDA K254013 reports manufacturer-conducted retrospective performance validation and reader testing. No independent peer-reviewed study specific to SubtleHD-PET (1.x), prospective workflow study, or validation for radiotherapy treatment planning/dosimetry was identified. SubtlePET predecessor studies are not attributed to this version.",
    limitations: [
      "The 75% faster-acquisition figure is a manufacturer claim, not an FDA-labeled performance guarantee; the product page also displays selected examples labeled up to 90% time saving.",
      "SUVmax findings in K254013 are exploratory and vary by tracer and model.",
      "The FDA summary advises caution with VPFX + PSF reconstruction.",
      "No device-specific EU CE certificate or declaration was verified.",
      "FDA validation-set ages and radiotracers should not be interpreted as training-data characteristics or proof of equal performance across all populations and tracers."
    ],
    lastUpdated: "2026-11-10",
    lastRevised: "2026-11-10",
    source:
      "FDA 510(k) K254013; Subtle Medical product page and announcements"
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
    source: "FDA 510(k) K240290; press releases; peer-reviewed literature"
  },
  {
    id: "subtle-hd",
    name: "SubtleHD",
    company: "Subtle Medical",
    companyUrl: "https://subtlemedical.com/",
    productUrl: "https://subtlemedical.com/subtlehdmr/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/image-enhancement/subtle-medical.ts",
    description:
      "Prescription MRI image-processing software for noise reduction and increased image sharpness across MRI images of all body parts. It is one component of the Subtle-ELITE suite; clinical benefit beyond image-quality and technical endpoints has not been established by the reviewed evidence.",
    category: "Image Enhancement",
    certification:
      "FDA 510(k)-cleared (K243250); CE mark announced by the manufacturer, with Class IIa and Intertek Medical (2862) identified by a distributor",
    logoUrl: "/logos/SubtleMedical.jpg",
    anatomicalLocation: ["Brain", "Spine", "Body", "Extremities"],
    modality: ["MRI"],
    diseaseTargeted: ["General diagnostic MRI image enhancement"],
    features: [
      "Deep learning MRI enhancement",
      "Noise reduction",
      "Image sharpness enhancement",
      "MRI images of all body parts"
    ],
    releaseDate: "2025-02-14",
    version: "1.x",
    keyFeatures: [
      "Prescription image-processing software for MRI denoising and sharpening",
      "FDA-submission validation included retrospective data across multiple anatomical regions and scanner vendors",
      "Manufacturer advertises up to 80% time savings on selected sequences; this is not a universal performance guarantee",
      "Available as part of the Subtle-ELITE package with SubtleSYNTH and SubtleALIGN"
    ],
    technicalSpecifications: {
      population:
        "Training cohort demographics are not publicly disclosed. FDA validation data included patients aged 3-94; these are evaluation data, not training demographics.",
      input: ["DICOM MR images"],
      inputFormat: ["DICOM"],
      output: ["Enhanced MR images"],
      outputFormat: ["DICOM"]
    },
    technology: {
      integration: ["DICOM workflow", "SubtleEDGE", "PACS/workstation"],
      deployment: [
        "Cloud-based or on-premises options described for Subtle-ELITE"
      ],
      triggerForAnalysis:
        "Configured DICOM-based post-processing; exact routing depends on site configuration",
      processingTime:
        "The manufacturer describes processing in seconds and under five minutes total transfer for Subtle-ELITE. A SubtleHD-specific per-study processing time was not established."
    },
    trainingData: {
      disclosureLevel: "minimal",
      description:
        "Public sources reviewed do not disclose the deployed model's training-cohort size, demographics, or site composition. The 3-94 age range in the FDA summary describes validation data, not training data.",
      source: "FDA 510(k) summary K243250",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243250.pdf"
    },
    evaluationData: {
      studyDesign:
        "FDA software verification and validation, retrospective image-quality testing, and a blinded reader study",
      primaryEndpoint:
        "ROI SNR, edge slope, gradient entropy, and reader ratings of perceived SNR, image quality, diagnostic confidence, artifacts, and small-structure visibility",
      description:
        "K243250 reports retrospective MRI testing across body, cardiac, neuro, and musculoskeletal exams. The blinded reader study compared 205 original image series with their enhanced counterparts.",
      results:
        "The FDA summary reports that default and high denoising modes met its criterion of at least 40% SNR improvement in at least 90% and 95% of the dataset, respectively. Reader acceptance allowed significant improvement or no significant difference on primary ratings. These image-quality results do not demonstrate improved diagnostic accuracy or patient outcomes.",
      source: "FDA 510(k) summary K243250",
      sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K243250.pdf"
    },
    regulatory: {
      ce: {
        status: "cleared",
        class: "IIa",
        type: "MDR",
        notes:
          "Subtle Medical announced CE marking on 2025-03-17. Incepto identifies Class IIa and Intertek Medical (2862) as notified body; current certificate details were not independently reviewed."
      },
      fda: {
        status: "510k_cleared",
        class: "Class II",
        type: "510(k)",
        clearanceNumber: "K243250",
        regulationNumber: "21 CFR 892.2050",
        productCode: "QIH",
        decisionDate: "2025-02-12",
        notes:
          "FDA database records a substantial-equivalence decision and states that no Predetermined Change Control Plan was authorized."
      },
      intendedUseStatement:
        "Prescription-use MRI image-processing software for image enhancement of MRI images of all body parts by noise reduction and increasing image sharpness."
    },
    market: {
      onMarketSince: "2025",
      distributionChannels: ["Direct sales", "Distribution partners"]
    },
    keyPapers: [
      {
        doi: "10.1002/jmri.70507",
        pmid: "42593101",
        title:
          "Deep Learning-Based Enhancement of Already Diagnostic-Quality MRI for Alzheimer's Disease Classification: Effects on Model Performance and Training Data Requirements",
        authors: "Zhang Z et al.",
        journal: "Journal of Magnetic Resonance Imaging",
        year: "2026",
        evidenceRigor: "E2",
        clinicalImpact: "L1t",
        legacyClinicalImpact: "I1",
        rationale:
          "Retrospective study using 2,293 ADNI scans and 270 external NACC scans to evaluate downstream Alzheimer disease classification. Five of six listed authors have Subtle Medical affiliations. External macro-AUC values (0.679 standard-image-trained model; 0.819 SubtleHD-enhanced-image-trained model) are classifier results, not clinical diagnostic accuracy or patient outcomes.",
        vendorIndependent: false,
        externalValidation: true
      }
    ],
    evidenceRigor: "E2",
    clinicalImpact: "L1t",
    legacyClinicalImpact: "I1",
    evidenceRigorNotes:
      "FDA validation and a peer-reviewed, product-specific retrospective study with an external test set support E2. The publication is vendor-affiliated, and independent product-specific clinical evidence remains limited.",
    clinicalImpactNotes:
      "Evidence covers image-quality testing and downstream research-classifier performance, not changes in clinical workflow, reader diagnosis, management, or patient outcomes.",
    adoptionReadiness: "R2",
    adoptionReadinessNotes:
      "FDA-cleared and commercially listed, but independent clinical evidence is limited. No radiotherapy-specific commissioning or routine-use evaluation was identified.",
    clinicalEvidence:
      "FDA K243250 reports retrospective image-quality validation and blinded reader ratings. Zhang et al. (2026) report technical downstream classifier outcomes on ADNI and external NACC data.",
    limitations: [
      "Public sources reviewed do not disclose model-training cohort size, demographics, or site composition.",
      "FDA evaluation endpoints are image-quality and reader-rating measures, not demonstrated improvement in diagnostic accuracy or patient outcomes.",
      "The advertised up-to-80% scan-time savings applies to selected sequences and is not a universal independently established result.",
      "The FDA record states that no Predetermined Change Control Plan was authorized.",
      "The current CE certificate was not independently inspected; Class IIa and notified body are reported by a distributor."
    ],
    lastUpdated: "2026-11-10",
    lastRevised: "2026-11-10",
    source:
      "FDA 510(k) K243250 and AccessGUDID; Subtle Medical product and regulatory announcements; Incepto regulatory disclosure; Zhang et al., JMRI 2026, DOI 10.1002/jmri.70507."
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
    clinicalImpact: "L1c",
    legacyClinicalImpact: "I0",
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
    source: "FDA 510(k) K254120; press releases; peer-reviewed literature"
  }
];
