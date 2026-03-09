/**
 * AID-RT ↔ DLinRT Field Mapping
 *
 * Bidirectional mapping between the DLinRT product model card schema
 * and the AID-RT standard (doi:10.1016/j.phro.2026.100940).
 *
 * matchType:
 *   "exact"       – semantically identical fields
 *   "approximate" – close but may need interpretation
 *   "combined"    – one side maps to multiple fields on the other
 *   "split"       – one field on one side maps to several on the other
 */

export interface FieldMapping {
  dlinrtPath: string;
  aidrtPath: string;
  matchType: "exact" | "approximate" | "combined" | "split";
  notes?: string;
}

export const fieldMappings: FieldMapping[] = [
  // ── Basic information ─────────────────────────────────────────────
  { dlinrtPath: "name",           aidrtPath: "model_basic_information.name",                     matchType: "exact" },
  { dlinrtPath: "version",        aidrtPath: "model_basic_information.version_number",            matchType: "exact" },
  { dlinrtPath: "company",        aidrtPath: "model_basic_information.developers",                matchType: "exact" },
  { dlinrtPath: "category",       aidrtPath: "model_basic_information.model_scope_summary",       matchType: "approximate", notes: "DLinRT uses fixed categories; AID-RT uses free text" },
  { dlinrtPath: "description",    aidrtPath: "model_basic_information.intended_use",              matchType: "approximate" },
  { dlinrtPath: "anatomy",        aidrtPath: "model_basic_information.model_scope_anatomical_site", matchType: "exact" },
  { dlinrtPath: "supportedStructures", aidrtPath: "model_basic_information.model_scope_structures", matchType: "approximate", notes: "DLinRT may include accuracy data per structure" },
  { dlinrtPath: "limitations",    aidrtPath: "model_basic_information.observed_limitations",      matchType: "exact" },
  { dlinrtPath: "contactEmail",   aidrtPath: "model_basic_information.developers_contact",        matchType: "exact" },

  // ── Regulatory ────────────────────────────────────────────────────
  { dlinrtPath: "regulatory.ce",  aidrtPath: "model_basic_information.clearance_type",            matchType: "combined", notes: "DLinRT stores CE/FDA/TGA separately; AID-RT combines" },
  { dlinrtPath: "regulatory.fda", aidrtPath: "model_basic_information.clearance_type",            matchType: "combined" },
  { dlinrtPath: "regulatory.intendedUseStatement", aidrtPath: "model_basic_information.intended_use", matchType: "approximate" },

  // ── Technical specifications ──────────────────────────────────────
  { dlinrtPath: "technicalSpecifications.input",        aidrtPath: "technical_specifications.model_inputs",  matchType: "exact" },
  { dlinrtPath: "technicalSpecifications.inputFormat",  aidrtPath: "technical_specifications.input_format",  matchType: "exact" },
  { dlinrtPath: "technicalSpecifications.output",       aidrtPath: "technical_specifications.model_outputs", matchType: "exact" },
  { dlinrtPath: "technicalSpecifications.outputFormat",  aidrtPath: "technical_specifications.output_format", matchType: "exact" },
  { dlinrtPath: "technology.integration",               aidrtPath: "technical_specifications.pipeline",      matchType: "approximate" },

  // ── Training data ─────────────────────────────────────────────────
  { dlinrtPath: "trainingData.description",    aidrtPath: "training_data.training_description", matchType: "exact" },
  { dlinrtPath: "trainingData.datasetSize",    aidrtPath: "training_data.training_size",        matchType: "exact" },
  { dlinrtPath: "trainingData.datasetSources", aidrtPath: "training_data.training_origin",      matchType: "exact" },
  { dlinrtPath: "trainingData.scannerModels",  aidrtPath: "training_data.scanner_model",        matchType: "exact" },
  { dlinrtPath: "trainingData.demographics",   aidrtPath: "training_data.age",                  matchType: "split", notes: "DLinRT single field → AID-RT age + sex" },
  { dlinrtPath: "trainingData.publicDatasets",  aidrtPath: "training_data.public_datasets",      matchType: "exact" },
  { dlinrtPath: "modality",                    aidrtPath: "training_data.imaging_modality",     matchType: "exact" },

  // ── Evaluation data ───────────────────────────────────────────────
  { dlinrtPath: "evaluationData.description",  aidrtPath: "evaluation_data.evaluation_description", matchType: "exact" },
  { dlinrtPath: "evaluationData.datasetSize",  aidrtPath: "evaluation_data.evaluation_size",        matchType: "exact" },
  { dlinrtPath: "evaluationData.studyDesign",  aidrtPath: "evaluation_data.evaluation_frame",       matchType: "approximate" },
];

/** AID-RT fields with no DLinRT equivalent */
export const aidrtOnlyFields = [
  "card_metadata.card_creation_date",
  "card_metadata.card_version",
  "card_metadata.card_changes",
  "card_metadata.card_DOI",
  "model_basic_information.ethical_considerations",
  "model_basic_information.license_type",
  "model_basic_information.citation",
  "model_basic_information.conflict_of_interest",
  "model_basic_information.model_architecture",
  "model_basic_information.model_choice",
  "model_basic_information.funding_sources",
  "technical_specifications.preprocessing",
  "technical_specifications.postprocessing",
  "technical_specifications.hardware_requirements",
  "technical_specifications.software_dependencies",
  "learning_architecture.total_number_trainable_parameters",
  "learning_architecture.loss_function",
  "learning_architecture.optimizer",
  "learning_architecture.learning_rate",
  "learning_architecture.batch_size",
  "learning_architecture.number_of_epochs",
  "learning_architecture.data_augmentation",
  "learning_architecture.uncertainty_quantification",
  "learning_architecture.explainability",
  "learning_architecture.training_loss_curve",
  "training_data.scanner_manufacturer",
  "training_data.bmi",
  "training_data.tnm_staging",
  "training_data.patient_position",
  "training_data.scan_acquisition_parameters",
  "training_data.validation_strategy",
  "training_data.validation_size",
  "training_data.number_of_annotators",
  "training_data.annotator_qualifications",
  "training_data.annotation_tool",
  "training_data.inter_observer_variability",
  "training_data.dose_engine",
  "training_data.dose_algorithm",
  "training_data.treatment_technique",
  "evaluation_data.segmentation_metrics",
  "evaluation_data.dose_metrics",
  "evaluation_data.image_metrics",
  "evaluation_data.clinical_acceptability",
  "evaluation_data.commissioning_notes",
  "evaluation_data.comparison_with_humans",
  "evaluation_data.failure_analysis",
];

/** DLinRT fields with no AID-RT equivalent */
export const dlinrtOnlyFields = [
  "secondaryCategories",
  "developmentStage",
  "usesAI",
  "partOf",
  "integratedModules",
  "priorVersions",
  "supersededBy",
  "evidenceRigor",
  "clinicalImpact",
  "evidenceVendorIndependent",
  "evidenceMultiCenter",
  "evidenceMultiNational",
  "evidenceProspective",
  "evidenceExternalValidation",
  "safetyCorrectiveActions",
  "guidelines",
  "market.onMarketSince",
  "market.availability",
  "pricing",
  "companyRevisionDate",
  "lastRevised",
  "monitorsAIProducts",
  "dosePredictionModels",
];
