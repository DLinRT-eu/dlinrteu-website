
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
