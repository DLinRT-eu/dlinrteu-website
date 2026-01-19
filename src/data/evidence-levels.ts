
export interface EvidenceLevel {
  level: string;
  name: string;
  description: string;
  typicalMeasures: string[];
  color: string;
  radiotherapyExamples: string[];
}

export const EVIDENCE_LEVELS: EvidenceLevel[] = [
  {
    level: "0",
    name: "No Peer-Reviewed Evidence",
    description: "No peer-reviewed publications available. Only vendor claims or marketing materials.",
    typicalMeasures: ["Vendor white papers", "Marketing materials", "Regulatory submission data only"],
    color: "gray",
    radiotherapyExamples: ["FDA 510(k) summary only", "CE mark with no published studies"]
  },
  {
    level: "1t",
    name: "Technical Efficacy",
    description: "Demonstrates technical feasibility of the software. Studies on reproducibility, consistency, and error rates.",
    typicalMeasures: ["Reproducibility", "Inter-software agreement", "Processing speed", "Computational performance"],
    color: "slate",
    radiotherapyExamples: [
      "Auto-contouring reproducibility tests",
      "Image reconstruction consistency studies",
      "Processing time benchmarks"
    ]
  },
  {
    level: "1c",
    name: "Potential Clinical Efficacy",
    description: "Demonstrates feasibility for clinical application. Correlation studies with reference standards or ground truth.",
    typicalMeasures: ["Correlation to expert contours", "Phantom validation", "Biomarker studies"],
    color: "blue",
    radiotherapyExamples: [
      "Dice coefficient vs expert contours on test datasets",
      "Phantom dosimetry validation",
      "Synthetic CT HU accuracy vs planning CT"
    ]
  },
  {
    level: "2",
    name: "Stand-Alone Performance",
    description: "Demonstrates stand-alone performance of the software against reference standards in clinical data.",
    typicalMeasures: ["Sensitivity", "Specificity", "Dice score", "Dosimetric accuracy", "AUC"],
    color: "green",
    radiotherapyExamples: [
      "Multi-center Dice validation on clinical datasets",
      "DVH prediction accuracy studies",
      "Deformable registration accuracy (TRE)"
    ]
  },
  {
    level: "3",
    name: "Clinical Workflow Efficacy",
    description: "Demonstrates added value in clinical workflow. Human-AI interaction studies showing improvement over manual methods.",
    typicalMeasures: ["Time savings", "Inter-observer variability reduction", "Clinician performance with vs without AI"],
    color: "teal",
    radiotherapyExamples: [
      "Contouring time reduction studies",
      "Treatment planning efficiency gains",
      "Reduced inter-observer variability in target delineation"
    ]
  },
  {
    level: "4",
    name: "Treatment Decision Efficacy",
    description: "Demonstrates impact on treatment management decisions. Changes in treatment plans, dose prescriptions, or treatment modality.",
    typicalMeasures: ["Change in treatment choice", "Dose modification rates", "Plan quality improvement"],
    color: "orange",
    radiotherapyExamples: [
      "Improved OAR sparing leading to dose escalation",
      "Adaptive treatment plan modifications",
      "Changes in treatment intent (curative vs palliative)"
    ]
  },
  {
    level: "5",
    name: "Patient Outcome Efficacy",
    description: "Demonstrates impact on patient health outcomes. Prospective studies measuring clinical endpoints.",
    typicalMeasures: ["Local control", "Survival outcomes", "Toxicity reduction", "Quality of life"],
    color: "purple",
    radiotherapyExamples: [
      "Reduced radiation-induced toxicity",
      "Improved tumor control probability",
      "Patient-reported outcome improvements",
      "Survival analysis"
    ]
  },
  {
    level: "6",
    name: "Societal Efficacy",
    description: "Demonstrates societal impact through health economic analysis. Cost-effectiveness and resource utilization studies.",
    typicalMeasures: ["Cost-effectiveness", "QALYs", "Resource utilization", "Access improvement"],
    color: "rose",
    radiotherapyExamples: [
      "Cost per QALY analysis",
      "Reduced treatment delays",
      "Improved access to quality RT in LMICs",
      "Health economic modeling"
    ]
  }
];

export type EvidenceLevelCode = "0" | "1t" | "1c" | "2" | "3" | "4" | "5" | "6";

export const getEvidenceLevel = (level: string): EvidenceLevel | undefined => {
  return EVIDENCE_LEVELS.find(l => l.level === level);
};

export const getEvidenceLevelColor = (level: string): string => {
  const evidenceLevel = getEvidenceLevel(level);
  if (!evidenceLevel) return "gray";
  
  const colorMap: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700 border-gray-300",
    slate: "bg-slate-100 text-slate-700 border-slate-300",
    blue: "bg-blue-100 text-blue-700 border-blue-300",
    green: "bg-green-100 text-green-700 border-green-300",
    teal: "bg-teal-100 text-teal-700 border-teal-300",
    orange: "bg-orange-100 text-orange-700 border-orange-300",
    purple: "bg-purple-100 text-purple-700 border-purple-300",
    rose: "bg-rose-100 text-rose-700 border-rose-300"
  };
  
  return colorMap[evidenceLevel.color] || colorMap.gray;
};

export const EVIDENCE_LEVEL_REFERENCE = {
  citation: "Adapted from van Leeuwen KG, Schalekamp S, Rutten MJCM, van Ginneken B, de Rooij M. Artificial intelligence in radiology: 100 commercially available products and their scientific evidence. Eur Radiol. 2021;31(6):3797-3804.",
  doi: "10.1007/s00330-021-07892-z",
  pmid: "33856519",
  url: "https://doi.org/10.1007/s00330-021-07892-z"
};
