
export interface ModelCardData {
  basicInfo: {
    productName: string;
    version: string;
    company: string;
    developedBy?: string;  // "InPictura (Technology Partner)"
    category: string;
    secondaryCategories: string;
    releaseDate: string;
    lastUpdated: string;
    ceStatus: string;
    fdaStatus: string;
    usesAI: string;
    developmentStage: string;
    partOf: string;
  };
  keyFeatures: {
    features: string[];
    count: number;
  };
  clinicalApplication: {
    intendedUse: string;
    targetAnatomy: string;
    diseaseTargeted: string;
    modalitySupport: string;
    clinicalEvidence: string;
  };
  technicalSpecs: {
    inputFormats: string;
    outputFormats: string;
    processingTime: string;
    integration: string;
    deployment: string;
    population: string;
  };
  performance: {
    supportedStructures: string;
    limitations: string;
    evidence: string;
    evidenceLevel: string;
    evidenceLevelNotes: string;
    dosePredictionModels: string;
  };
  /** Product-level dual-axis score (plus the DLinRT adoption readiness axis). */
  evidenceScore: {
    evidenceRigor: string;
    evidenceRigorNotes: string;
    clinicalImpact: string;
    clinicalImpactNotes: string;
    adoptionReadiness: string;
    adoptionReadinessNotes: string;
    readinessSignal: string;
    /** papers | override | stored | none (per axis when they differ). */
    scoreOrigin: string;
    scoreOverrideReason: string;
    scoredPublicationsCount: number;
    listedPublicationsCount: number;
  };
  /** One entry per publication/source used to set the score. */
  evidenceSources: Array<{
    title: string;
    authors: string;
    journal: string;
    year: string;
    doi: string;
    pmid: string;
    link: string;
    evidenceRigor: string;
    clinicalImpact: string;
    rationale: string;
    appliesToCategory: string;
    vendorIndependent: string;
    multiCenter: string;
    multiNational: string;
    prospective: string;
    externalValidation: string;
    setsProductRigor: string;
    setsProductImpact: string;
    note: string;
  }>;
  studyQuality: {
    vendorIndependent: string;
    multiCenter: string;
    multiNational: string;
    prospective: string;
    externalValidation: string;
  };
  regulatory: {
    ceDetails: string;
    fdaDetails: string;
    tgaDetails: string;
    tfdaDetails: string;
    intendedUseStatement: string;
    marketPresence: string;
    /** Public EUDAMED device registration, present only when recorded. */
    eudamed?: {
      basicUdi: string;
      riskClass: string;
      registeredTradeName: string;
      manufacturerSrn: string;
      sourceUrl: string;
      lastVerified: string;
    };
  };
  contact: {
    website: string;
    companyUrl: string;
    productUrl: string;
    logoUrl: string;
    logoSource: string;
    supportEmail: string;
  };
  quality: {
    lastRevised: string;
    companyRevisionDate: string;
    source: string;
    githubUrl: string;
  };
  guidelines: {
    compliance: string;
    details: string;
  };
  trainingData: {
    description: string;
    datasetSize: string;
    datasetSources: string;
    demographics: string;
    scannerModels: string;
    institutions: string;
    countries: string;
    publicDatasets: string;
    disclosureLevel: string;
    source: string;
    sourceUrl: string;
  };
  evaluationData: {
    description: string;
    datasetSize: string;
    sites: string;
    countries: string;
    demographics: string;
    studyDesign: string;
    primaryEndpoint: string;
    results: string;
    source: string;
    sourceUrl: string;
  };
  safetyCorrectiveActions: {
    count: number;
    summary: string;
    details: string;
  };
}
