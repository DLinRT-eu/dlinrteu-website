

# Fix AID-RT JSON Export for Streamlit App Compatibility

## Problem

The current exporter produces JSON with **wrong field names and wrong section structure**. The Streamlit app expects the exact keys from `model_card_schema.json`. Key mismatches:

| Current (broken) | Actual AID-RT key |
|---|---|
| `card_metadata.card_version` | `card_metadata.version_number` |
| `card_metadata.card_changes` | `card_metadata.version_changes` |
| `card_metadata.card_DOI` | `card_metadata.doi` |
| `model_basic_information.developers` | `model_basic_information.developed_by_institution` |
| `model_basic_information.developers_contact` | `model_basic_information.developed_by_email` |
| `model_basic_information.clearance_number` | (doesn't exist — use `clearance_type` free text) |
| `model_basic_information.model_architecture` | `model_basic_information.type_of_learning_architecture` |
| `technical_specifications.pipeline` | `technical_specifications.model_pipeline_summary` |
| `technical_specifications.preprocessing` | `technical_specifications.pre_processing` |
| Missing section entirely | `hw_and_sw` |
| `evaluation_data` | `evaluation_data_methodology_results_commisioning` |

Additionally, the app expects **all fields present as strings** (using `"NA"` or `""` instead of `null`), and many fields are missing entirely (e.g. `creation_date`, `clearance_approved_by_institution`, `developed_by_institution`, `software_license`, `conflict_of_interest`, `model_pipeline_summary`, `pre_processing`, `post_processing`, all training data fields like `model_name`, `tuning_technique`, `total_size`, `validation_strategy`, `model_choice_criteria`, `inference_method`, and all evaluation fields like `evaluation_date`, `evaluated_by_name`, `reference_standard`, etc.).

## Changes

### 1. Rewrite `src/utils/modelCard/aidrtExporter.ts`

Complete rewrite of `convertToAidrt()` to match the **exact** schema field keys from the upstream `model_card_schema.json`. All 7 sections with every field:

- `card_metadata` (4 fields)
- `model_basic_information` (~25 fields)
- `technical_specifications` (~8 fields)
- `learning_architecture` (~19 fields)
- `hw_and_sw` (5 fields)
- `training_data` (~42 fields)
- `evaluation_data_methodology_results_commisioning` (~40+ fields)

All unmapped fields set to `"NA"` (not `null`) to satisfy the Streamlit form validation. Map DLinRT data where possible (name, version, company, anatomy, modality, clearance, limitations, inputs/outputs, training data demographics, scanner models, etc.).

### 2. Update `src/utils/modelCard/aidrtMapping.ts`

Update the bidirectional mapping to reflect the correct AID-RT field keys (e.g. `developed_by_institution` not `developers`).

### 3. Update `public/schemas/aidrt-model-card-schema.json`

Align the schema file with the actual upstream field names so the schema download is accurate.

