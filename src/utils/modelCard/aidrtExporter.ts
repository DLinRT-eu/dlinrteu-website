/**
 * Export a DLinRT product to AID-RT model card JSON format.
 *
 * Follows the AID-RT schema (doi:10.1016/j.phro.2026.100940).
 * Fields without a DLinRT equivalent are set to null.
 */
import type { ProductDetails } from "@/types/productDetails";
import { createSafeFileName } from "./exporters/shared";

function arr(v: unknown): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v.map(String) : [String(v)];
}

function str(v: unknown): string | null {
  if (v === undefined || v === null || v === "") return null;
  return String(v);
}

function getClearanceTypes(product: ProductDetails): string | null {
  const parts: string[] = [];
  const reg = product.regulatory;
  if (!reg) return null;
  if (reg.ce && typeof reg.ce === "object" && reg.ce.status?.toLowerCase().includes("approved")) parts.push("CE");
  if (reg.fda) {
    if (typeof reg.fda === "string") {
      if (reg.fda.toLowerCase().includes("cleared") || reg.fda.toLowerCase().includes("approved")) parts.push("FDA");
    } else if (reg.fda.status?.toLowerCase().includes("cleared") || reg.fda.status?.toLowerCase().includes("approved")) {
      parts.push(`FDA ${reg.fda.type || "510(k)"}`);
    }
  }
  if (reg.tga && reg.tga.status?.toLowerCase().includes("approved")) parts.push("TGA");
  if (reg.tfda && reg.tfda.status?.toLowerCase().includes("approved")) parts.push("TFDA");
  return parts.length ? parts.join(", ") : null;
}

function getClearanceNumber(product: ProductDetails): string | null {
  const reg = product.regulatory;
  if (!reg) return null;
  if (reg.ce && typeof reg.ce === "object" && reg.ce.certificateNumber) return reg.ce.certificateNumber;
  if (reg.fda && typeof reg.fda === "object" && reg.fda.clearanceNumber) return reg.fda.clearanceNumber;
  if (reg.tfda && reg.tfda.approvalNumber) return reg.tfda.approvalNumber;
  return null;
}

function getStructureNames(product: ProductDetails): string[] | null {
  if (!product.supportedStructures) return null;
  if (Array.isArray(product.supportedStructures)) {
    return product.supportedStructures.map((s) =>
      typeof s === "string" ? s : s.name
    );
  }
  return null;
}

export interface AidrtModelCard {
  card_metadata: Record<string, unknown>;
  model_basic_information: Record<string, unknown>;
  technical_specifications: Record<string, unknown>;
  learning_architecture: Record<string, unknown>;
  training_data: Record<string, unknown>;
  evaluation_data: Record<string, unknown>;
  _conversion_metadata: Record<string, unknown>;
}

export function convertToAidrt(product: ProductDetails): AidrtModelCard {
  const today = new Date().toISOString().slice(0, 10);

  return {
    card_metadata: {
      card_creation_date: today,
      card_version: "1.0.0",
      card_changes: `Auto-converted from DLinRT product data on ${today}`,
      card_DOI: null,
    },
    model_basic_information: {
      name: product.name,
      version_number: str(product.version) ?? "N/A",
      model_scope_summary: product.category,
      model_scope_anatomical_site: arr(product.anatomy),
      model_scope_structures: getStructureNames(product),
      clearance_type: getClearanceTypes(product),
      clearance_number: getClearanceNumber(product),
      intended_use: str(product.regulatory?.intendedUseStatement) ?? str(product.description),
      intended_users: null,
      observed_limitations: arr(product.limitations),
      ethical_considerations: null,
      developers: product.company,
      developers_contact: str(product.contactEmail),
      license_type: null,
      citation: null,
      conflict_of_interest: null,
      model_architecture: null,
      model_choice: null,
      funding_sources: null,
    },
    technical_specifications: {
      pipeline: product.technology?.integration ? arr(product.technology.integration).join(", ") : null,
      model_inputs: arr(product.technicalSpecifications?.input),
      input_format: arr(product.technicalSpecifications?.inputFormat),
      model_outputs: arr(product.technicalSpecifications?.output),
      output_format: arr(product.technicalSpecifications?.outputFormat),
      preprocessing: null,
      postprocessing: null,
      hardware_requirements: null,
      software_dependencies: null,
    },
    learning_architecture: {
      total_number_trainable_parameters: null,
      loss_function: null,
      optimizer: null,
      learning_rate: null,
      batch_size: null,
      number_of_epochs: null,
      data_augmentation: null,
      uncertainty_quantification: null,
      explainability: null,
      training_loss_curve: null,
      input_size: null,
      output_size: null,
      input_format: null,
      output_format: null,
    },
    training_data: {
      training_description: str(product.trainingData?.description),
      training_size: str(product.trainingData?.datasetSize),
      training_origin: arr(product.trainingData?.datasetSources),
      imaging_modality: arr(product.modality),
      scanner_model: arr(product.trainingData?.scannerModels),
      scanner_manufacturer: null,
      age: str(product.trainingData?.demographics),
      sex: null,
      bmi: null,
      tnm_staging: null,
      patient_position: null,
      scan_acquisition_parameters: null,
      validation_strategy: null,
      validation_size: null,
      number_of_annotators: null,
      annotator_qualifications: null,
      annotation_tool: null,
      inter_observer_variability: null,
      public_datasets: arr(product.trainingData?.publicDatasets),
      dose_engine: null,
      dose_algorithm: null,
      treatment_technique: null,
    },
    evaluation_data: {
      evaluation_description: str(product.evaluationData?.description),
      evaluation_size: str(product.evaluationData?.datasetSize),
      evaluation_frame: str(product.evaluationData?.studyDesign),
      evaluation_origin: null,
      segmentation_metrics: null,
      dose_metrics: null,
      image_metrics: null,
      clinical_acceptability: null,
      commissioning_notes: null,
      comparison_with_humans: null,
      failure_analysis: null,
    },
    _conversion_metadata: {
      source: "DLinRT.eu",
      source_url: `https://dlinrt.eu/product/${product.id}`,
      converted_at: new Date().toISOString(),
      converter_version: "1.0.0",
      note: "Fields set to null have no DLinRT equivalent — fill them using the AID-RT Streamlit tool at https://rt-modelcard.streamlit.app/",
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
