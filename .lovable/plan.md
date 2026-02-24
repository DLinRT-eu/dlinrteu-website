

# Update Evidence Level Classification UI with New References

## What Changes

The data layer already contains the new references (van Leeuwen 2025, Pham 2023, FUTURE-AI 2025, Fryback & Thornbury 1991) and study quality sub-attributes. However, three UI components still only display the original 2021 reference and don't reflect the enriched methodology. This plan updates them.

## Files to Modify

### 1. `src/components/resources/EvidenceLevelTable.tsx`
**Current**: Reference footer only shows "Adapted from van Leeuwen et al. Eur Radiol. 2021" with a single DOI link.
**Update**:
- Replace the single-reference footer with a full references section listing all 4 sources from `EVIDENCE_IMPACT_REFERENCE` (original + 3 additional + Fryback & Thornbury)
- Add a small "F&T" cross-reference tag next to each Clinical Impact level that has a `frybackThornburyLevel` value (shown as a subtle tooltip or parenthetical)
- Add a "Study quality sub-attributes" note mentioning the 5 boolean fields (vendor independence, multi-center, etc.) that are tracked per product

### 2. `src/pages/EvidenceImpactGuide.tsx`
**Current**: The "Methodology Reference" card at the bottom only shows the original 2021 framework link.
**Update**:
- Expand the reference card to list all references from `EVIDENCE_IMPACT_REFERENCE.additionalReferences` and `frybackThornburyReference`
- Each reference gets its own row with citation text, DOI link, and a brief note about its contribution
- Add a new section (card) before the references explaining the **Study Quality Sub-Attributes** (the 5 booleans), with a small table showing the attribute name, what it means, and its source paper
- Update the Clinical Impact axis card to show the Fryback & Thornbury cross-reference for each level (already in tooltips on the matrix, but not in the level cards themselves)

### 3. `src/pages/ResourcesCompliance.tsx`
**Current** (lines 85-88): Intro text says "adapted from van Leeuwen et al. (2021)" only.
**Update**:
- Update the introductory paragraph to mention the enriched methodology: dual-axis system adapted from van Leeuwen et al. (2021, updated 2025), cross-referenced with the Fryback & Thornbury hierarchy, and enriched with study quality sub-attributes per Pham (2023)
- This is a text-only change to the description paragraph

## Technical Details

### EvidenceLevelTable.tsx -- References Section
Replace lines 96-116 (the current single-reference footer) with a structured references block that iterates over `EVIDENCE_IMPACT_REFERENCE.additionalReferences` and also includes the `frybackThornburyReference`. Each reference rendered as a compact citation with a DOI link. Keep the "Full methodology guide" button.

### EvidenceImpactGuide.tsx -- New Study Quality Card
Add a new Card between the "Key Considerations" card and the "Methodology Reference" card containing:
- Title: "Study Quality Sub-Attributes"
- Brief explanation that alongside E0-E3, each product is assessed on 5 granular study quality dimensions
- Simple table with columns: Attribute | Description | Source
  - Vendor Independent | At least one study by non-vendor authors | van Leeuwen 2025
  - Multi-Center | Evidence from 3+ clinical sites | van Leeuwen 2025
  - Multi-National | Data from multiple countries | van Leeuwen 2025
  - Prospective | At least one prospective study design | van Leeuwen 2025
  - External Validation | Validated on external dataset | Pham 2023

### EvidenceImpactGuide.tsx -- Expanded References Card
Replace lines 284-308 to render the full reference list dynamically from the data. Each reference shows:
- Citation text
- DOI link with ExternalLink icon
- Notes in smaller muted text

### ResourcesCompliance.tsx -- Updated Intro Text
Replace lines 85-89 with updated text mentioning the dual-axis system, Fryback & Thornbury alignment, and study quality sub-attributes.

## No Changes To
- `evidence-impact-levels.ts` (data is already complete)
- `EvidenceImpactMatrix.tsx` (already shows F&T in tooltips)
- Product data files (already populated)
- Dashboard components

