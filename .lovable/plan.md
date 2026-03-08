

# Add Training/Evaluation Dataset Metadata and FSCA/Recall Tracking

## Research Findings

### Training & Evaluation Data Transparency
Per Mehta et al. 2025 (npj Digital Medicine, doi:10.1038/s41746-025-02052-9), only **3.3 out of 17** transparency criteria are typically reported in FDA 510(k) summaries. However, some data IS available:

- **FDA 510(k) summaries** often disclose: validation dataset size, number of clinical sites, patient demographics (age, gender distribution), imaging modality/scanner models used
- **CE Technical Documentation** under MDR Article 61 requires clinical evaluation datasets but these are rarely public
- **Peer-reviewed publications** are the richest source of training data details (dataset name, size, institution, demographics)

For RT auto-contouring specifically, several products have published or FDA-disclosed dataset info:
- Limbus Contour: Multiple peer-reviewed validation studies with dataset details
- Therapanacea: Gregoire et al. 2020 prospective evaluation
- GE Healthcare: FDA K230082 cites 302 retrospective CT exams from 9 sites
- RaySearch: Extensive MAUDE reports and Class 2 recalls on FDA.gov

### FSCA / Recall Data Availability
- **FDA Recalls Database** (accessdata.fda.gov): Searchable, public. Found RayStation Class 2 recall (Z-2490-2025, DICOM UID uniqueness issue)
- **FDA MAUDE** (adverse event reports): Public, searchable by manufacturer/product
- **BfArM** (Germany): Publishes FSCAs, found RayStation FSCA (ref 10321/24)
- **EUDAMED**: Becoming mandatory May 2026 — will be the primary EU FSCA database
- **MHRA** (UK), **HPRA** (Ireland), **TGA** (Australia): All publish FSCAs online

For RT AI products specifically: Most are relatively new (2020+) with few reported FSCAs. RayStation (treatment planning, not purely AI) has the most recalls. Pure auto-contouring AI products have very few to none in public databases.

## Proposed Data Model Extensions

### 1. Training & Evaluation Dataset Info (`trainingData` + `evaluationData`)

Add two new optional fields to `ProductDetails`:

```typescript
trainingData?: {
  description?: string;           // Free text summary
  datasetSize?: string;           // e.g., "10,000 CT scans"
  datasetSources?: string[];      // e.g., ["TCIA", "Internal clinical data"]
  demographics?: string;          // e.g., "Adult patients, 45% female, age 22-89"
  scannerModels?: string[];       // e.g., ["Siemens SOMATOM", "GE Revolution"]
  institutions?: number;          // Number of contributing institutions
  countries?: number;             // Number of countries represented
  publicDatasets?: string[];      // Named public datasets used (e.g., "AAPM TG-263 benchmark")
  disclosureLevel?: 'full' | 'partial' | 'minimal' | 'none';
  source?: string;                // Where this info was found
  sourceUrl?: string;             // URL to source document
};

evaluationData?: {
  description?: string;           // Free text summary of clinical evaluation
  datasetSize?: string;           // e.g., "302 CT exams, 2552 contours"
  sites?: number;                 // Number of clinical sites
  countries?: number;             // Number of countries
  demographics?: string;          // Patient demographics
  studyDesign?: string;           // e.g., "Retrospective multi-site"
  primaryEndpoint?: string;       // e.g., "Dice Similarity Coefficient >= 0.85"
  results?: string;               // Summary of key results
  source?: string;                // FDA summary, publication, vendor docs
  sourceUrl?: string;             // URL to source
};
```

### 2. FSCA / Recall Tracking (`safetyCorrectiveActions`)

Add a new array field:

```typescript
safetyCorrectiveActions?: Array<{
  type: 'recall' | 'FSCA' | 'advisory' | 'software-update';
  classification?: string;        // e.g., "Class 2" (FDA), "FSCA" (EU)
  identifier?: string;            // e.g., "Z-2490-2025" (FDA recall number)
  date: string;                   // Date initiated
  status?: 'open' | 'closed' | 'terminated';
  description: string;            // What the issue was
  affectedVersions?: string[];    // Software versions affected
  action?: string;                // What corrective action was taken
  authority: string;              // "FDA", "BfArM", "MHRA", "TGA", etc.
  sourceUrl?: string;             // Link to official notice
}>;
```

### 3. Source Tracking Convention

Each sub-object includes `source` and `sourceUrl` fields so the provenance of every claim is traceable. Sources include:
- FDA 510(k) Summary documents (accessdata.fda.gov)
- Peer-reviewed publications (with DOI)
- BfArM FSCA database
- EUDAMED (when available from May 2026)
- Vendor documentation / IFU

## Files to Modify

1. **`src/types/product.d.ts`** — Add `trainingData`, `evaluationData`, `safetyCorrectiveActions` to `Product` interface
2. **`src/types/productDetails.d.ts`** — Mirror the new fields (already extends Product)
3. **`src/utils/exportProducts.ts`** — Add CSV columns for new fields
4. **`src/utils/modelCard/types.ts`** — Add sections for training data, evaluation data, FSCAs
5. **`src/utils/modelCard/dataGenerator.ts`** — Map new fields to model card output
6. **`src/utils/fhir/transformers/deviceDefinition.ts`** — Map training data as properties, FSCAs as safety notices
7. **`src/utils/schemaOrg/medicalDeviceSchema.ts`** — Add training data transparency to schema

## Scope

- 7 files modified (types, exports, model card, FHIR, Schema.org)
- 3 new type definitions added to the data model
- No product data files modified yet (data population is a separate task once the schema is in place)
- Compatible with existing products that lack these fields (all fields optional)

