import { ProductDetails } from "@/types/productDetails";

export const UNITED_IMAGING_PIPELINE_PRODUCTS: ProductDetails[] = [
  {
    id: "united-uct610-sim-dl-recon-pipeline",
    name: "uCT 610 Sim — Deep Learning Full-FOV Reconstruction",
    company: "United Imaging",
    companyUrl: "https://www.united-imaging.com/",
    productUrl: "https://estro-united-imaging-healthcare-europe.framer.ai/",
    githubUrl:
      "https://github.com/DLinRT-eu/dlinrteu-website/tree/main/src/data/products/pipeline/united-imaging.ts",
    description:
      "Deep Learning Full-Field-of-View (Full-FOV) reconstruction for the uCT 610 Sim, an 87 cm ultra-wide-bore CT simulator presented at ESTRO 2026. The scanner's standard scan FOV is 63 cm; the deep learning reconstruction extends images beyond it towards the full 87 cm bore, aiming to reduce truncation artifacts and HU errors for large patients, off-centre setups and immobilisation devices. Labelled by the vendor as 'under development; not for sale or clinical use, not yet available in Europe.' The scanner itself is registered in China (NMPA); whether the deep learning reconstruction is part of that registration is not publicly stated.",
    features: [
      "Deep learning Full-FOV reconstruction",
      "87 cm ultra-wide-bore CT simulator",
      "Artifact suppression at the bore periphery",
      "Designed for radiotherapy simulation",
    ],
    category: "Reconstruction",
    certification: "Pipeline",
    developmentStage: "pipeline",
    logoUrl: "/logos/unitedimaging.png",
    website: "https://estro-united-imaging-healthcare-europe.framer.ai/",
    anatomicalLocation: ["Whole body"],
    modality: ["CT"],
    subspeciality: "Radiation Oncology",
    diseaseTargeted: ["Multiple Cancer Types"],
    keyFeatures: [
      "Deep learning extended-FOV reconstruction from the 63 cm standard scan FOV up to the 87 cm bore (accuracy evaluated to just over 80 cm in Piao 2026)",
      "Targeted at radiotherapy simulation workflows on the uCT 610 Sim",
      "Vendor-reported 'significantly reduced noise and artifacts'",
      "Part of the uRT radiotherapy portfolio presented at ESTRO 2026",
    ],
    partOf: {
      name: "uRT Radiotherapy Ecosystem",
      productUrl: "https://eu.united-imaging.com/en/product-service/products/rt",
      relationship: "Component",
    },
    trainingData: {
      description:
        "U-Net++ network trained on paired truncated and full-coverage reconstructions. 88 clinically acquired CT datasets (BMI 6.92–43.52 kg/m²; arms, chest, abdomen and pelvis) were used as digital phantoms; truncation was simulated at different levels and scan positions, and ground truth came from a virtually extended detector geometry, giving 506,476 training images. Institutions, scanners and acquisition dates of the source datasets are not stated.",
      disclosureLevel: "partial",
      source:
        "Piao et al., Quant Imaging Med Surg 2026;16(6):497 (DOI: 10.21037/qims-2026-1-0140), Methods; describes the 'AI-eFOV' algorithm on the uCT 610 Sim (two United Imaging co-authors)",
      sourceUrl: "https://doi.org/10.21037/qims-2026-1-0140",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-11-05",
    },
    evaluationData: {
      studyDesign:
        "Single-institution phantom study with four retrospective patient cases (Sun Yat-sen University Cancer Center), vendor co-authored; not a vendor-independent or multi-centre evaluation",
      description:
        "A whole-body phantom was scanned at the isocentre and at 5, 10, 15 and 20 cm lateral offsets (arms down and arms up) and reconstructed with conventional extrapolation-based eFOV and with AI-eFOV. Isocentric images served as ground truth for HU accuracy, geometry and autocontouring. VMAT plans (lung, chest wall, liver) were recalculated on the offset reconstructions. Four patient cases with 70–75 cm reconstructions were rated blind by four radiation oncologists and four medical physicists.",
      results:
        "AI-eFOV versus eFOV: HU RMSE 81 vs 96 HU; maximum error 65 vs 275 HU (bone) and 25 vs 293 HU (soft tissue), P<0.01; autocontour Dice ≥0.973 vs ≥0.926. Gamma passing (3%/3 mm) >96.66% for both within a 10 cm offset; at 20 cm AI-eFOV stayed above 93.37% while eFOV fell to 82.05% in FFF hypofractionated plans. AI-eFOV was preferred in all four patient cases. Slight contour spillage and minor CT-value deviations remained beyond 80 cm.",
      primaryEndpoint:
        "HU accuracy and geometric agreement against isocentric ground truth; autocontour DSC; VMAT gamma passing rate (3%/3 mm)",
      source:
        "Piao et al., Quant Imaging Med Surg 2026 (DOI: 10.21037/qims-2026-1-0140)",
      sourceUrl: "https://doi.org/10.21037/qims-2026-1-0140",
      sourceAccess: "public",
      sourceRetrievedOn: "2026-11-05",
    },
    usesAI: true,
    evidenceRigor: "E0",
    clinicalImpact: "L1t",
    legacyClinicalImpact: "I0",
    evidenceScoreOverride: {
      rigor: "E0",
      reason:
        "Reviewer decision (Q4 2026 review): Piao et al. 2026 (QIMS, DOI 10.21037/qims-2026-1-0140) is listed in evidence but not scored. It is a vendor co-authored, single-institution, mainly phantom study of a product the vendor labels as under development and not for clinical use, so it is not used to raise the evidence level of this pre-market entry. Re-score when the product is released or an independent evaluation appears.",
      setBy: "Musti Kadhim (DLinRT Q4 2026 review round)",
      setOn: "2026-11-05",
    },
    evidenceRigorNotes:
      "Kept at E0 by reviewer decision (see evidenceScoreOverride). One peer-reviewed study now exists: Piao et al. 2026 (Quant Imaging Med Surg, published online 2026-05-18) evaluates the deep learning extended-FOV reconstruction ('AI-eFOV') on the uCT 610 Sim in a phantom plus four patients at one institution, with two United Imaging co-authors. It was missed by the 2026-08-25 Wave 5B and 2026-08-28 Batch C sweeps and was found on 2026-11-05 with Europe PMC queries for 'uCT 610' and 'uCT610'. The paper's 'AI-eFOV' is taken to be the vendor's marketed 'Deep Learning Full-FOV reconstruction' (same scanner, function and 87 cm range); this is an inference, not a vendor statement. FDA K193073 (Deep Recon, 2020) is a separate DL denoising reconstruction and does not cover this function.",
    clinicalImpactNotes:
      "Not scored from the literature (pre-market entry). For information, Piao 2026 reports accuracy-level endpoints only (HU error against ground truth, autocontour DSC, VMAT gamma passing rate); no workflow, decision or outcome data.",
    adoptionReadiness: "R0",
    adoptionReadinessNotes:
      "Pre-market in Europe and the USA: not for sale or clinical use per the vendor, and no FDA clearance. No commissioning, QA or monitoring reports published. Not assessable for adoption readiness until the vendor publishes model documentation and regulatory status for the deep learning reconstruction.",
    evidenceVendorIndependent: false,
    evidenceMultiCenter: false,
    evidenceMultiNational: false,
    evidenceProspective: false,
    evidenceExternalValidation: false,
    evidence: [
      {
        type: "Peer-reviewed Publication",
        description:
          "Piao Z, Wang G, Wang Y, et al. Novel extended field-of-view reconstruction algorithms in computed tomography simulation for imaging and volumetric modulated arc therapy dosimetry. Quant Imaging Med Surg 2026;16(6):497. Phantom (5–20 cm offsets) and four-patient comparison of AI-eFOV with conventional eFOV on the uCT 610 Sim; Sun Yat-sen University Cancer Center with two United Imaging Research Institute co-authors (COI statement: none declared). Listed, not scored (reviewer decision 2026-11-05).",
        link: "https://doi.org/10.21037/qims-2026-1-0140",
        authors: "Piao Z, Wang G, Wang Y, Wei Z, Qi M, Ding S, Song H, Feng Y, Jia L, Sun H, Huang S, Huang X",
        year: 2026,
        title:
          "Novel extended field-of-view reconstruction algorithms in computed tomography simulation for imaging and volumetric modulated arc therapy dosimetry",
        journal: "Quant Imaging Med Surg",
        doi: "10.21037/qims-2026-1-0140",
      },
    ],
    limitations: [
      "Explicitly labelled by the vendor as under development, not for sale and not for clinical use, and not yet available in Europe",
      "No CE marking or FDA clearance. The uCT 610 Sim scanner is NMPA-registered in China (国械注准20243062017, domestic Class III, October 2024), but whether the deep learning reconstruction is part of the registered configuration is not publicly stated",
      "No model card published; training data are described only in a vendor co-authored paper (Piao 2026)",
      "The only peer-reviewed evaluation (Piao 2026) is single-institution, mainly phantom-based (four patients) and vendor co-authored; no independent validation",
      "Piao 2026 reports slight contour spillage and minor CT-value deviations beyond 80 cm, and the value for SBRT beyond 80 cm is untested",
      "Equivalence of the paper's 'AI-eFOV' and the marketed 'Deep Learning Full-FOV reconstruction' is inferred, not confirmed by the vendor",
    ],
    regulatory: {
      intendedUseStatement:
        "\"Under development; not for sale or clinical use, not yet available in Europe.\" (Source: United Imaging ESTRO 2026 microsite, https://estro-united-imaging-healthcare-europe.framer.ai/, retrieved 19 May 2026 and re-checked 5 November 2026.) The uCT 610 Sim scanner is registered in China under NMPA 国械注准20243062017 (domestic Class III, NMPA announcement 2024 No. 141, October 2024; valid to 2029-10-10 per third-party device catalogues) for routine clinical CT, dual-energy imaging and image data for radiotherapy planning; the registration does not publicly specify the deep learning reconstruction. No FDA 510(k) was found for the uCT 610 Sim (openFDA, 2026-11-05).",
    },
    market: {
      availability:
        "Not for sale or clinical use in Europe (vendor). Scanner NMPA-registered in China; no FDA clearance. Availability of the deep learning reconstruction outside research use is not publicly stated.",
    },
    lastUpdated: "2026-11-05",
    lastRevised: "2026-11-05",
    source:
      "United Imaging ESTRO 2026 microsite (https://estro-united-imaging-healthcare-europe.framer.ai/, re-checked 2026-11-05). Vendor disclosure: 'under development; not for sale or clinical use, not yet available in Europe.'; Piao et al., Quant Imaging Med Surg 2026 (DOI 10.21037/qims-2026-1-0140; Crossref and Europe PMC full text checked 2026-11-05); NMPA announcement 2024 No. 141 (国械注准20243062017); openFDA 510(k) search 2026-11-05; Wave 5 literature-expansion sweep 2026-08-25 (Europe PMC 2014-2026, alias-gated, DOIs verified against Crossref)",
  },
];
