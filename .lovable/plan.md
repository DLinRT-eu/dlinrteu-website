

# AID-RT Model Card Integration Plan

## Background

The AID-RT project (MIRO-UCLouvain/RT-AI-Model-Card) provides a standardized 6-section model card schema for AI in radiotherapy, published in Physics and Imaging in Radiation Oncology (DOI: 10.1016/j.phro.2026.100940). Their schema JSON at `app/core/schemas/model_card_schema.json` defines ~120 fields across 5 sections:

1. **card_metadata** (4 fields) -- creation date, version, changes, DOI
2. **model_basic_information** (~25 fields) -- name, scope, anatomy, clearance, limitations, architecture, developers, licensing
3. **technical_specifications** (~12 fields) -- pipeline, inputs/outputs, pre/post-processing
4. **learning_architecture** (~20 fields) -- parameters, loss function, batch size, uncertainty, explainability, I/O formats/sizes
5. **training_data_methodology** (~30 fields) -- dataset info, demographics, scanner models, acquisition params, validation strategy, dose-specific fields
6. **evaluation_data_methodology** (~30 fields) -- evaluation dataset, metrics (task-specific: segmentation DSC/HD, dose GPR/DVH, image-to-image SSIM/MAE), commissioning

DLinRT currently exports a `ModelCardData` type with 14 sections and ~80 fields.

## What to Build

### 1. Add AID-RT to the Resources page

Add two entries to `ResourceLinks.tsx`:
- **AID-RT Model Card Writing Tool** (category: "AI/ML Guidelines") -- link to `https://rt-modelcard.streamlit.app/`, description referencing the Streamlit tool for standardized RT AI model cards
- **AID-RT Paper** (category: "AI/ML Guidelines") -- link to `https://doi.org/10.1016/j.phro.2026.100940`, description about the domain-specific model card standard

### 2. Create the DLinRT field schema JSON

Create a new static file `public/schemas/dlinrt-model-card-schema.json` containing the full `ProductDetails` interface as a JSON schema with:
- Every field marked as `required` or `optional`
- Organized into the same sections as `ModelCardData`: basicInfo, keyFeatures, clinicalApplication, technicalSpecs, performance, studyQuality, regulatory, contact, quality, guidelines, trainingData, evaluationData, safetyCorrectiveActions
- Type information, descriptions, and allowed values (e.g. evidenceRigor: E0-E3)

### 3. Create the AID-RT schema JSON

Create `public/schemas/aidrt-model-card-schema.json` -- a cleaned/simplified version of the upstream schema (stripping the massive TG-263 structure name lists) with the same field metadata (label, description, required, type).

### 4. Create a field mapping file

Create `src/utils/modelCard/aidrtMapping.ts` containing:
- A bidirectional mapping between DLinRT field paths and AID-RT field keys
- Coverage analysis: which AID-RT fields have DLinRT equivalents and vice versa

```text
DLinRT field                          AID-RT field                    Match
───────────────────────────────────────────────────────────────────────────
basicInfo.productName              → model_basic_information.name         exact
basicInfo.version                  → model_basic_information.version_number  exact
basicInfo.category                 → model_basic_information.model_scope_summary  approximate
basicInfo.ceStatus/fdaStatus       → model_basic_information.clearance_type  combined
clinicalApplication.targetAnatomy  → model_basic_information.model_scope_anatomical_site  mapped
clinicalApplication.intendedUse    → model_basic_information.intended_users  approximate
technicalSpecs.inputFormats        → technical_specifications.model_inputs  mapped
technicalSpecs.outputFormats       → technical_specifications.model_outputs  mapped
technicalSpecs.processingTime      → (no equivalent)                      DLinRT-only
performance.limitations            → model_basic_information.observed_limitations  exact
trainingData.datasetSize           → training_data.training_size          exact
trainingData.scannerModels         → training_data.scanner_model          exact
trainingData.demographics          → training_data.age + training_data.sex  split
evaluationData.studyDesign         → evaluation_data.evaluation_frame     approximate
(no equivalent)                    → learning_architecture.loss_function   AID-RT-only
(no equivalent)                    → learning_architecture.total_number_trainable_parameters  AID-RT-only
```

### 5. Add "Export AID-RT Model Card" button + converter

Add to the product detail page sidebar (in the export section):
- A new "Export AID-RT Format" button that converts the DLinRT product data into AID-RT JSON format using the mapping
- The exported JSON follows the AID-RT schema structure, filling mapped fields and marking unmapped ones as "N/A"

### 6. Add schema download links

On the Resources page, add a small "Model Card Schemas" section (or within the existing AI/ML Guidelines area) with:
- Download link for the DLinRT schema JSON
- Download link for the AID-RT schema JSON  
- Link to the field mapping/comparison table

Alternatively, integrate these downloads into the product detail export section with a "Download Schema" option.

## Technical Details

### File changes

| File | Action |
|------|--------|
| `src/components/resources/ResourceLinks.tsx` | Add 2 resource entries |
| `public/schemas/dlinrt-model-card-schema.json` | Create -- DLinRT field schema (~200 lines) |
| `public/schemas/aidrt-model-card-schema.json` | Create -- AID-RT schema without TG-263 lists (~400 lines) |
| `src/utils/modelCard/aidrtMapping.ts` | Create -- field mapping + converter function |
| `src/utils/modelCard/aidrtExporter.ts` | Create -- export product to AID-RT JSON |
| `src/utils/modelCard/exporters/index.ts` | Re-export new AID-RT exporter |
| `src/utils/modelCard/index.ts` | Re-export AID-RT functions |
| `src/components/ProductDetails.tsx` | Add AID-RT export button + schema download link |

### Key mapping observations

**Well-matched fields** (direct conversion possible):
- Product name, version, company, anatomy, modality, limitations, supported structures
- Training data: size, sources, scanner models, demographics
- Evaluation data: study design, results, institutions
- Regulatory clearance status

**DLinRT-only fields** (no AID-RT equivalent):
- Evidence classification (E0-E3 / I0-I5), study quality sub-attributes
- Safety corrective actions / FSCA tracking
- Market/pricing information, secondary categories
- Guidelines compliance tracking, integrated modules, partOf relationships

**AID-RT-only fields** (no DLinRT equivalent):
- Full learning architecture details (parameters, loss function, batch size, optimizer, learning rate)
- Pre/post-processing pipeline descriptions
- Uncertainty quantification and explainability techniques
- Training loss curves, model choice criteria
- Detailed scan acquisition parameters (kV, TR, TE, FOV)
- Patient positioning, BMI, TNM staging per dataset
- Data augmentation strategy
- Conflict of interest disclosure

### Schema JSON structure (DLinRT)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "DLinRT Product Model Card Schema",
  "version": "1.0.0",
  "sections": {
    "basicInfo": {
      "fields": {
        "productName": { "type": "string", "required": true, "description": "..." },
        ...
      }
    },
    ...
  }
}
```

Each field includes: `type`, `required` (boolean), `description`, `allowedValues` (if enum), and `aidrtMapping` (the corresponding AID-RT field key, if any).

