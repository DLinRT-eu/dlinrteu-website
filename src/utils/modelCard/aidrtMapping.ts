/**
 * AID-RT ↔ DLinRT Field Mapping
 *
 * Bidirectional mapping between the DLinRT product model card schema
 * and the AID-RT standard (doi:10.1016/j.phro.2026.100940).
 *
 * Field names use the exact upstream keys from:
 * https://github.com/MIRO-UCLouvain/RT-AI-Model-Card/blob/main/app/core/schemas/model_card_schema.json
 */

export interface FieldMapping {
  dlinrtPath: string;
  aidrtPath: string;
  matchType: "exact" | "approximate" | "combined" | "split";
  notes?: string;
}

export const fieldMappings: FieldMapping[] = [
  // ── Basic information ─────────────────────────────────────────────
  { dlinrtPath: "name",           aidrtPath: "model_basic_information.name",                          matchType: "exact" },
  { dlinrtPath: "version",        aidrtPath: "model_basic_information.version_number",                 matchType: "exact" },
  { dlinrtPath: "company",        aidrtPath: "model_basic_information.developed_by_institution",       matchType: "exact" },
  { dlinrtPath: "company",        aidrtPath: "model_basic_information.clearance_approved_by_institution", matchType: "approximate" },
  { dlinrtPath: "category",       aidrtPath: "model_basic_information.model_scope_summary",            matchType: "approximate", notes: "DLinRT uses fixed categories; AID-RT uses free text" },
  { dlinrtPath: "description",    aidrtPath: "model_basic_information.model_scope_summary",            matchType: "approximate", notes: "Combined with category" },
  { dlinrtPath: "anatomy",        aidrtPath: "model_basic_information.model_scope_anatomical_site",    matchType: "exact" },
  { dlinrtPath: "limitations",    aidrtPath: "model_basic_information.observed_limitations",            matchType: "exact" },
  { dlinrtPath: "contactEmail",   aidrtPath: "model_basic_information.developed_by_email",             matchType: "exact" },
  { dlinrtPath: "contactEmail",   aidrtPath: "model_basic_information.clearance_approved_by_contact_email", matchType: "exact" },
  { dlinrtPath: "productUrl",     aidrtPath: "model_basic_information.url_info",                       matchType: "exact" },

  // ── Regulatory ────────────────────────────────────────────────────
  { dlinrtPath: "regulatory.ce",  aidrtPath: "model_basic_information.clearance_type",                 matchType: "combined", notes: "DLinRT stores CE/FDA/TGA separately; AID-RT combines" },
  { dlinrtPath: "regulatory.fda", aidrtPath: "model_basic_information.clearance_type",                 matchType: "combined" },
  { dlinrtPath: "regulatory.intendedUseStatement", aidrtPath: "model_basic_information.clearance_additional_information", matchType: "approximate" },

  // ── Technical specifications ──────────────────────────────────────
  { dlinrtPath: "technicalSpecifications.input",       aidrtPath: "technical_specifications.model_inputs",                    matchType: "exact" },
  { dlinrtPath: "technicalSpecifications.inputFormat",  aidrtPath: "technical_specifications.additional_information_model_inputs", matchType: "approximate" },
  { dlinrtPath: "technicalSpecifications.output",      aidrtPath: "technical_specifications.model_outputs",                   matchType: "exact" },
  { dlinrtPath: "technicalSpecifications.outputFormat", aidrtPath: "technical_specifications.additional_information_model_outputs", matchType: "approximate" },
  { dlinrtPath: "technology.integration",              aidrtPath: "technical_specifications.model_pipeline_summary",           matchType: "approximate" },

  // ── Training data ─────────────────────────────────────────────────
  { dlinrtPath: "trainingData.description",    aidrtPath: "training_data.model_name",                matchType: "approximate" },
  { dlinrtPath: "trainingData.datasetSize",    aidrtPath: "training_data.total_size",                matchType: "exact" },
  { dlinrtPath: "trainingData.datasetSize",    aidrtPath: "training_data.number_of_patients",        matchType: "approximate" },
  { dlinrtPath: "trainingData.datasetSources", aidrtPath: "training_data.source",                    matchType: "exact" },
  { dlinrtPath: "trainingData.scannerModels",  aidrtPath: "training_data.scanner_model",             matchType: "exact" },
  { dlinrtPath: "trainingData.demographics",   aidrtPath: "training_data.age",                       matchType: "split", notes: "DLinRT single field → AID-RT age + sex" },
  { dlinrtPath: "trainingData.publicDatasets",  aidrtPath: "training_data.source",                    matchType: "approximate", notes: "Public datasets merged into source" },
  { dlinrtPath: "trainingData.sourceUrl",      aidrtPath: "training_data.url_info",                  matchType: "exact" },

  // ── Evaluation data ───────────────────────────────────────────────
  { dlinrtPath: "evaluationData.description",  aidrtPath: "evaluation_data_methodology_results_commisioning.source",           matchType: "approximate" },
  { dlinrtPath: "evaluationData.datasetSize",  aidrtPath: "evaluation_data_methodology_results_commisioning.total_size",       matchType: "exact" },
  { dlinrtPath: "evaluationData.studyDesign",  aidrtPath: "evaluation_data_methodology_results_commisioning.evaluation_frame", matchType: "approximate" },
  { dlinrtPath: "evaluationData.sourceUrl",    aidrtPath: "evaluation_data_methodology_results_commisioning.url_info",         matchType: "exact" },
];

/** AID-RT fields with no DLinRT equivalent */
export const aidrtOnlyFields = [
  // card_metadata
  "card_metadata.card_creation_date",
  "card_metadata.version_number",
  "card_metadata.version_changes",
  "card_metadata.doi",
  // model_basic_information
  "model_basic_information.creation_date",
  "model_basic_information.version_changes",
  "model_basic_information.doi",
  "model_basic_information.clearance_approved_by_name",
  "model_basic_information.clearance_additional_information",
  "model_basic_information.intended_users",
  "model_basic_information.potential_limitations",
  "model_basic_information.type_of_learning_architecture",
  "model_basic_information.developed_by_name",
  "model_basic_information.conflict_of_interest",
  "model_basic_information.software_license",
  "model_basic_information.code_source",
  "model_basic_information.model_source",
  "model_basic_information.citation_details",
  // technical_specifications
  "technical_specifications.model_pipeline_figure",
  "technical_specifications.pre_processing",
  "technical_specifications.post_processing",
  // learning_architecture (entire section)
  "learning_architecture.total_number_trainable_parameters",
  "learning_architecture.number_of_inputs",
  "learning_architecture.input_content",
  "learning_architecture.input_format",
  "learning_architecture.input_size",
  "learning_architecture.number_of_outputs",
  "learning_architecture.output_content",
  "learning_architecture.output_format",
  "learning_architecture.output_size",
  "learning_architecture.loss_function",
  "learning_architecture.batch_size",
  "learning_architecture.regularisation",
  "learning_architecture.architecture_figure",
  "learning_architecture.uncertainty_quantification_techniques",
  "learning_architecture.explainability_techniques",
  // hw_and_sw (entire section)
  "hw_and_sw.libraries_and_dependencies",
  "hw_and_sw.hardware_recommended",
  "hw_and_sw.inference_time_for_recommended_hw",
  "hw_and_sw.installation_getting_started",
  "hw_and_sw.environmental_impact",
  // training_data
  "training_data.url_doi_to_model_card",
  "training_data.tuning_technique",
  "training_data.acquisition_period",
  "training_data.inclusion_exclusion_criteria",
  "training_data.type_of_data_augmentation",
  "training_data.strategy_for_data_augmentation",
  "training_data.image_resolution",
  "training_data.patient_positioning",
  "training_data.scan_acquisition_parameters",
  "training_data.scan_reconstruction_parameters",
  "training_data.fov",
  "training_data.treatment_modality_train",
  "training_data.beam_configuration_energy",
  "training_data.dose_engine",
  "training_data.target_volumes_and_prescription",
  "training_data.number_of_fractions",
  "training_data.reference_standard",
  "training_data.reference_standard_qa",
  "training_data.icd10_11",
  "training_data.tnm_staging",
  "training_data.sex",
  "training_data.target_volume_cm3",
  "training_data.bmi",
  "training_data.validation_strategy",
  "training_data.validation_data_partition",
  "training_data.weights_initialization",
  "training_data.epochs",
  "training_data.optimiser",
  "training_data.learning_rate",
  "training_data.train_and_validation_loss_curves",
  "training_data.model_choice_criteria",
  "training_data.inference_method",
  // evaluation_data_methodology_results_commisioning
  "evaluation_data_methodology_results_commisioning.evaluation_date",
  "evaluation_data_methodology_results_commisioning.evaluated_by_name",
  "evaluation_data_methodology_results_commisioning.evaluated_by_contact_email",
  "evaluation_data_methodology_results_commisioning.sanity_check",
  "evaluation_data_methodology_results_commisioning.acquisition_period",
  "evaluation_data_methodology_results_commisioning.inclusion_exclusion_criteria",
  "evaluation_data_methodology_results_commisioning.image_resolution",
  "evaluation_data_methodology_results_commisioning.patient_positioning",
  "evaluation_data_methodology_results_commisioning.scanner_model",
  "evaluation_data_methodology_results_commisioning.scan_acquisition_parameters",
  "evaluation_data_methodology_results_commisioning.scan_reconstruction_parameters",
  "evaluation_data_methodology_results_commisioning.fov",
  "evaluation_data_methodology_results_commisioning.reference_standard",
  "evaluation_data_methodology_results_commisioning.reference_standard_qa",
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
  "adoptionReadiness",
  "adoptionReadinessNotes",
  "burdenFactors",
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
  "technology.processingTime",
  "clinicalEvidence",
];
