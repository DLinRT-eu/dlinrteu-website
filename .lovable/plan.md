

# Complete Missing Information for Brainlab Products

## Summary

Both Brainlab product entries are missing several fields that are present in other well-populated products. Using data extracted from the official FDA 510(k) summaries (K250440 and K243633), I will enrich both products with verified information.

## Data Sources

- **K250440 PDF** (FDA clearance letter for RT Elements 4.5) -- covers AI Tumor Segmentation
- **K243633 PDF** (FDA clearance letter for Brainlab Elements 7.0) -- covers Contouring 5.0 / APM
- **Brainlab website** and **Novalis Circle announcement** -- product context

## Corrections and Additions

### Product 1: Elements AI Tumor Segmentation (`brainlab-elements-ai-tumor-seg`)

**Corrections:**
- `productUrl` -- current URL is dead (404). Update to `https://www.brainlab.com/radiosurgery-products/elements/multiple-brain-metastases/` (closest live page)
- `diseaseTargeted` -- add "Cranial and Paraspinal Nerve Tumors" and "Glioneuronal Tumors" (confirmed from FDA validation data)
- `keyFeatures` -- also supports cranial/paraspinal nerve tumors and glioneuronal tumors per FDA summary

**Additions:**
- `technology` -- integration with RT Contouring 4.5 module, on-premise deployment, GPU-accelerated processing
- `partOf` -- RT Elements 4.5 suite, module relationship
- `usesAI` -- `true`
- `contactEmail` -- `regulatory.affairs@brainlab.com` (from FDA filing)
- `regulatory.fda.regulationNumber` -- `21 CFR 892.5050`
- `regulatory.fda.productCode` -- `MUJ, QIH`
- `regulatory.intendedUseStatement` -- expanded to match FDA wording
- `evidence` -- add validation data from FDA: 412 patients, 595 scans, 1878 annotations, Dice >= 0.75 overall
- `limitations` -- minimum tumor diameter 3mm for metastases / 10mm for primary tumors; CE-T1 MRI only; adult patients only
- `priorVersions` -- link to K223279 (RT Elements 4.0)
- `developmentStage` -- `"certified"`

### Product 2: Elements RT Segmentation / APM (`brainlab-elements-rt-seg`)

**Corrections:**
- `productUrl` -- update to live URL
- `description` -- clarify it is part of Brainlab Elements Contouring 5.0, not a standalone product
- `regulatory.fda.notes` -- K243633 covers Brainlab Elements 7.0 suite including Contouring 5.0 (not "RT Segmentation" specifically)
- `regulatory.fda.regulationNumber` -- `21 CFR 892.2050` (different from the tumor seg product)
- `regulatory.fda.productCode` -- `QIH, JAK, LLZ`

**Additions:**
- `technology` -- atlas-based + ML-based segmentation backend, gRPC API, on-premise deployment, integration with TheraPanacea Art-Plan for extracranial structures
- `partOf` -- Brainlab Elements Contouring 5.0 (part of Brainlab Elements 7.0)
- `usesAI` -- `true`
- `contactEmail` -- `regulatory.affairs@brainlab.com`
- `keyFeatures` -- add: anomaly detection, atlas-based + ML segmentation, customizable segmentation templates, integration with TheraPanacea Art-Plan, basal ganglia region support
- `anatomicalLocation` -- add "Basal Ganglia" and "Extracranial" (confirmed from K250440 device name listing and K243633)
- `limitations` -- GPU required for ML features (8GB vRAM minimum); Windows 10/Server only
- `priorVersions` -- link to K223106 (Brainlab Elements 6.0)
- `developmentStage` -- `"certified"`
- `supportedStructures` -- add regions: Cranial, Basal Ganglia, Head and Neck, Pelvic, Spine, Thoracic and Spine, Extracranial (from K250440 device name)

## File Changes

| File | Action |
|------|--------|
| `src/data/products/auto-contouring/brainlab.ts` | Update both product objects with corrected and additional fields |

## Technical Details

All additions use existing fields from the `ProductDetails` type -- no schema changes needed. The `partOf`, `usesAI`, `evidence`, `limitations`, `priorVersions`, `developmentStage`, `technology`, and `contactEmail` fields are all already defined in the type.

The `lastUpdated` and `lastRevised` dates will be set to `"2026-02-20"` to reflect this update.

