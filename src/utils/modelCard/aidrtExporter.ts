/**
 * Export a DLinRT product to AID-RT model card JSON format.
 *
 * Follows the exact upstream AID-RT schema from:
 * https://github.com/MIRO-UCLouvain/RT-AI-Model-Card/blob/main/app/core/schemas/model_card_schema.json
 * Paper: doi:10.1016/j.phro.2026.100940
 *
 * ALL fields are included (none optional). Unmapped fields use "NA".
 */
import type { ProductDetails } from "@/types/productDetails";
import { createSafeFileName } from "./exporters/shared";

/** Return a string or "NA" */
function s(v: unknown): string {
  if (v === undefined || v === null || v === "") return "NA";
  if (Array.isArray(v)) return v.length ? v.map(String).join(", ") : "NA";
  return String(v);
}

function getClearanceText(product: ProductDetails): string {
  const parts: string[] = [];
  const reg = product.regulatory;
  if (!reg) return "NA";
  if (reg.ce && typeof reg.ce === "object") {
    parts.push(`CE ${reg.ce.status || ""}`.trim());
    if (reg.ce.certificateNumber) parts[parts.length - 1] += ` (${reg.ce.certificateNumber})`;
  }
  if (reg.fda) {
    if (typeof reg.fda === "string") {
      parts.push(`FDA ${reg.fda}`);
    } else {
      parts.push(`FDA ${reg.fda.type || "510(k)"} ${reg.fda.status || ""}`.trim());
      if (reg.fda.clearanceNumber) parts[parts.length - 1] += ` (${reg.fda.clearanceNumber})`;
    }
  }
  if (reg.tga) parts.push(`TGA ${reg.tga.status || ""}`.trim());
  if (reg.tfda) {
    let t = `TFDA ${reg.tfda.status || ""}`.trim();
    if (reg.tfda.approvalNumber) t += ` (${reg.tfda.approvalNumber})`;
    parts.push(t);
  }
  return parts.length ? parts.join("; ") : "NA";
}

function getStructureNames(product: ProductDetails): string {
  if (!product.supportedStructures) return "NA";
  if (Array.isArray(product.supportedStructures)) {
    const names = product.supportedStructures.map((st) =>
      typeof st === "string" ? st : st.name
    );
    return names.length ? names.join(", ") : "NA";
  }
  return "NA";
}

export interface AidrtModelCard {
  card_metadata: Record<string, unknown>;
  model_basic_information: Record<string, unknown>;
  technical_specifications: Record<string, unknown>;
  learning_architecture: Record<string, unknown>;
  hw_and_sw: Record<string, unknown>;
  training_data: Record<string, unknown>;
  evaluation_data_methodology_results_commisioning: Record<string, unknown>;
  _conversion_metadata: Record<string, unknown>;
}

export function convertToAidrt(product: ProductDetails): AidrtModelCard {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  return {
    // ── Section 0: Card Metadata ──────────────────────────────────────
    card_metadata: {
      card_creation_date: today,
      version_number: "1.0",
      version_changes: `Auto-converted from DLinRT product data on ${today}`,
      doi: "NA",
    },

    // ── Section 1: Model Basic Information ────────────────────────────
    model_basic_information: {
      name: s(product.name),
      creation_date: s(product.lastRevised || product.companyRevisionDate),
      version_number: s(product.version) || "01.00.0000",
      version_changes: "NA",
      doi: "NA",
      model_scope_summary: s(product.category) + (product.description ? ` — ${product.description}` : ""),
      model_scope_anatomical_site: s(product.anatomy),
      clearance_type: getClearanceText(product),
      clearance_approved_by_name: "NA",
      clearance_approved_by_institution: s(product.company),
      clearance_approved_by_contact_email: s(product.contactEmail),
      clearance_additional_information: "NA",
      intended_users: "NA",
      observed_limitations: s(product.limitations),
      potential_limitations: "NA",
      type_of_learning_architecture: "NA",
      developed_by_name: "NA",
      developed_by_institution: s(product.company),
      developed_by_email: s(product.contactEmail),
      conflict_of_interest: "NA",
      software_license: "NA",
      code_source: "NA",
      model_source: "NA",
      citation_details: "NA",
      url_info: s(product.productUrl || product.companyUrl),
    },

    // ── Section 2: Technical Specifications ───────────────────────────
    technical_specifications: {
      model_pipeline_summary: product.technology?.integration
        ? s(product.technology.integration)
        : "NA",
      model_pipeline_figure: "NA",
      model_inputs: s(product.technicalSpecifications?.input),
      additional_information_model_inputs: s(product.technicalSpecifications?.inputFormat),
      model_outputs: s(product.technicalSpecifications?.output),
      additional_information_model_outputs: s(product.technicalSpecifications?.outputFormat),
      pre_processing: "NA",
      post_processing: "NA",
    },

    // ── Section 3: Learning Architecture ──────────────────────────────
    learning_architecture: {
      total_number_trainable_parameters: "NA",
      number_of_inputs: "NA",
      input_content: "NA",
      additional_information_input_content: "NA",
      input_format: "NA",
      input_size: "NA",
      number_of_outputs: "NA",
      output_content: "NA",
      additional_information_output_content: "NA",
      output_format: "NA",
      output_size: "NA",
      loss_function: "NA",
      batch_size: "NA",
      regularisation: "NA",
      architecture_figure: "NA",
      uncertainty_quantification_techniques: "NA",
      explainability_techniques: "NA",
      additional_information_ts: "NA",
      citation_details_ts: "NA",
    },

    // ── Section 4: Hardware & Software ────────────────────────────────
    hw_and_sw: {
      libraries_and_dependencies: "NA",
      hardware_recommended: "NA",
      inference_time_for_recommended_hw: "NA",
      installation_getting_started: "NA",
      environmental_impact: "NA",
    },

    // ── Section 5: Training Data ──────────────────────────────────────
    training_data: {
      model_name: s(product.name),
      url_doi_to_model_card: `https://dlinrt.eu/product/${product.id}`,
      tuning_technique: "NA",
      total_size: s(product.trainingData?.datasetSize),
      number_of_patients: s(product.trainingData?.datasetSize),
      source: s(product.trainingData?.datasetSources),
      acquisition_period: "NA",
      inclusion_exclusion_criteria: "NA",
      type_of_data_augmentation: "NA",
      strategy_for_data_augmentation: "NA",
      url_info: s(product.trainingData?.sourceUrl),
      image_resolution: "NA",
      patient_positioning: "NA",
      scanner_model: s(product.trainingData?.scannerModels),
      scan_acquisition_parameters: "NA",
      scan_reconstruction_parameters: "NA",
      fov: "NA",
      treatment_modality_train: "NA",
      beam_configuration_energy: "NA",
      dose_engine: "NA",
      target_volumes_and_prescription: "NA",
      number_of_fractions: "NA",
      reference_standard: "NA",
      reference_standard_qa: "NA",
      reference_standard_qa_additional_information: "NA",
      icd10_11: "NA",
      tnm_staging: "NA",
      age: s(product.trainingData?.demographics),
      sex: "NA",
      target_volume_cm3: "NA",
      bmi: "NA",
      additional_patient_info: "NA",
      validation_strategy: "NA",
      validation_data_partition: "NA",
      weights_initialization: "NA",
      epochs: "NA",
      optimiser: "NA",
      learning_rate: "NA",
      train_and_validation_loss_curves: "NA",
      model_choice_criteria: "NA",
      inference_method: "NA",
    },

    // ── Section 6: Evaluation Data ────────────────────────────────────
    evaluation_data_methodology_results_commisioning: {
      evaluation_date: "NA",
      evaluated_by_name: "NA",
      evaluated_by_institution: s(product.company),
      evaluated_by_contact_email: s(product.contactEmail),
      evaluation_frame: s(product.evaluationData?.studyDesign),
      sanity_check: "NA",
      total_size: s(product.evaluationData?.datasetSize),
      number_of_patients: s(product.evaluationData?.datasetSize),
      source: "NA",
      acquisition_period: "NA",
      inclusion_exclusion_criteria: "NA",
      url_info: s(product.evaluationData?.sourceUrl),
      image_resolution: "NA",
      patient_positioning: "NA",
      scanner_model: "NA",
      scan_acquisition_parameters: "NA",
      scan_reconstruction_parameters: "NA",
      fov: "NA",
      treatment_modality_eval: "NA",
      beam_configuration_energy: "NA",
      dose_engine: "NA",
      target_volumes_and_prescription: "NA",
      number_of_fractions: "NA",
      reference_standard: "NA",
      reference_standard_qa: "NA",
      reference_standard_qa_additional_information: "NA",
      icd10_11_ev: "NA",
      tnm_staging_ev: "NA",
      age_ev: "NA",
      sex_ev: "NA",
      target_volume_cm3_ev: "NA",
      bmi_ev: "NA",
      additional_patient_info_ev: "NA",
      // Metric fields — model-type-specific, set to NA
      type_ism: "NA",
      on_volume_ism: "NA",
      registration_dm: "NA",
    },

    // ── Conversion Metadata (non-standard, stripped on import) ────────
    _conversion_metadata: {
      source: "DLinRT.eu",
      source_url: `https://dlinrt.eu/product/${product.id}`,
      converted_at: new Date().toISOString(),
      converter_version: "2.0.0",
      note: "Fields set to 'NA' have no DLinRT equivalent — fill them using the AID-RT Streamlit tool at https://rt-modelcard.streamlit.app/",
    },
  };
}

export function exportProductToAidrtJSON(product: ProductDetails): void {
  const aidrtCard = convertToAidrt(product);
  const json = JSON.stringify(aidrtCard, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = createSafeFileName(`${product.name}_aidrt_model_card`, "json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
