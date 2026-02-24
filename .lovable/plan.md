

# Improve Evidence Classification Methodology

## Context

The current DLinRT dual-axis system (Evidence Rigor E0-E3 x Clinical Impact I0-I5) is adapted from van Leeuwen et al. 2021. After reviewing several published frameworks, the dual-axis approach remains methodologically sound and is actually more nuanced than alternatives. However, three specific improvements are warranted based on the latest literature.

## Proposed Changes

### 1. Enrich the Evidence Rigor Axis with Study Quality Sub-Attributes

The van Leeuwen 2025 update (173 products, Eur Radiol 2026;36:526-536) tracks additional study quality dimensions that significantly affect evidence reliability. These should be captured as optional boolean/structured metadata on each product, alongside the E0-E3 level.

New optional fields on `ProductDetails`:

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `evidenceVendorIndependent` | boolean | At least one study conducted independently of vendor | van Leeuwen 2025 |
| `evidenceMultiCenter` | boolean | Evidence from 3+ clinical sites | van Leeuwen 2025 |
| `evidenceMultiNational` | boolean | Data from multiple countries | van Leeuwen 2025 |
| `evidenceProspective` | boolean | At least one prospective study design | van Leeuwen 2025 |
| `evidenceExternalValidation` | boolean | Validated on external dataset | Pham 2023 |

These sub-attributes do not change the E0-E3 level but provide richer context. They can be displayed as small icons or badges next to the rigor level on product pages.

### 2. Align Impact Level Descriptions with Fryback & Thornbury Terminology

The Impact axis (I0-I5) maps well to the Fryback & Thornbury hierarchy used by van Leeuwen, but the descriptions and names should be more explicitly aligned for cross-referencing. Proposed refinements to names and descriptions in `evidence-impact-levels.ts`:

| Level | Current Name | Proposed Name | Fryback & Thornbury Equivalent |
|-------|-------------|---------------|-------------------------------|
| I0 | None Demonstrated | None Demonstrated | (No equivalent -- product exists but no studies) |
| I1 | Quality Assurance | Technical Efficacy | Level 1: Technical efficacy |
| I2 | Workflow | Diagnostic/Task Accuracy | Level 2: Diagnostic accuracy efficacy |
| I3 | Decision | Diagnostic Thinking | Level 3: Diagnostic thinking efficacy |
| I4 | Outcome | Therapeutic/Patient Outcome | Levels 4-5: Therapeutic + Patient outcome efficacy |
| I5 | Societal | Societal | Level 6: Societal efficacy |

Note: The current I1 ("Quality Assurance") and I2 ("Workflow") are DLinRT-specific adaptations for radiotherapy that don't map cleanly to Fryback & Thornbury's diagnostic imaging hierarchy. Since DLinRT covers therapeutic AI (contouring, planning, tracking), the adapted names are more appropriate. However, the descriptions should explicitly reference the Fryback & Thornbury levels for academic credibility.

**Recommendation**: Keep the current names (they work well for radiotherapy context) but add a `frybackThornburyLevel` field to each impact level for cross-referencing, and update descriptions to mention the mapping.

### 3. Update References to Include 2025 Literature

Add the van Leeuwen 2025 update and Pham 2023 to the `EVIDENCE_IMPACT_REFERENCE` section in `evidence-impact-levels.ts`, so the Resources page cites the latest evidence.

New references to add:
- **van Leeuwen 2025**: Antonissen N, et al. "Artificial intelligence in radiology: 173 commercially available products and their scientific evidence." Eur Radiol. 2026;36:526-536. DOI: 10.1007/s00330-025-11830-8
- **Pham 2023**: Pham N, et al. "Critical Appraisal of AI-Enabled Imaging Tools Using the Levels of Evidence System." AJNR. 2023;44(5):E21-E28. DOI: 10.3174/ajnr.A7850
- **FUTURE-AI 2025**: Lekadir K, et al. "FUTURE-AI: international consensus guideline for trustworthy and deployable AI in healthcare." BMJ. 2025;388:e081554

## Files to Modify

1. **`src/types/productDetails.d.ts`** -- Add 5 new optional boolean fields for study quality sub-attributes
2. **`src/data/evidence-impact-levels.ts`** -- Add `frybackThornburyLevel` to impact levels, update descriptions, add new references to `EVIDENCE_IMPACT_REFERENCE`
3. **`src/components/resources/EvidenceImpactMatrix.tsx`** -- Display Fryback & Thornbury cross-references in the matrix tooltips
4. **`docs/review/GUIDE.md`** -- Update evidence classification documentation with new sub-attributes and references

## Files NOT Changed

- Product data files: The new sub-attributes are all optional; existing products will simply show "not assessed" for these fields. They can be populated gradually during reviews.
- Dashboard matrix: No structural change needed; the E0-E3 x I0-I5 grid remains the same.

## What This Does NOT Do

- Does **not** replace the dual-axis system (it's methodologically superior to single-axis alternatives)
- Does **not** add the Pham lifecycle levels (L6-L7 for IT integration and regulatory compliance are already covered by DLinRT's separate regulatory fields)
- Does **not** add CLAIM/TRIPOD+AI checklists (these are reporting guidelines for study authors, not product classification tools)

