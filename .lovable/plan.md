

# Search PubMed for Evidence and Add Expandable Evidence UI

## Overview

Update evidence data for ~25 active products currently rated E0 or E1 by searching PubMed/web for peer-reviewed publications. Also add a collapsible/expandable UI to the Evidence section so that when a product has many evidence items, only the most relevant ones are shown initially.

## Part 1: Expandable Evidence UI

**File:** `src/components/product/EvidenceLimitationsDetails.tsx`

- When a product has more than 3 evidence items, show only the first 3 by default
- Add a "Show N more publications" collapsible toggle using the existing Radix `Collapsible` component
- The first 3 items (most relevant) are always visible; the rest are behind the toggle
- Styling: a subtle text button with chevron icon, consistent with existing UI patterns

## Part 2: PubMed Evidence Search for E0/E1 Products

Search PubMed and web sources for each product below. For each product found to have publications, update:
- `evidence` array with structured `{type, description, link}` entries
- `evidenceRigor` (upgrade from E0/E1 if warranted)
- `evidenceRigorNotes` and `clinicalImpactNotes`
- `evidenceMultiCenter`, `evidenceVendorIndependent`, `evidenceExternalValidation`, `evidenceProspective`, `evidenceMultiNational` flags

### Priority E0 Products to Search (active, non-archived)

| Product | Company | File | Current |
|---------|---------|------|---------|
| AiSight | Hura Imaging | auto-contouring/hura-imaging.ts | E0/I0 |
| AccuContour | Wisdom Tech | auto-contouring/wisdom-tech.ts | E0/I0 |
| AI Seg (auto-contour) | Philips | auto-contouring/philips.ts | E0/I0 |
| GE MR Contour DL | GE Healthcare | auto-contouring/ge-mr-contour-dl.ts | E0/I1 |
| uAI VisionRT | United Imaging | image-enhancement/united-imaging.ts | E0/I0 |
| uAI DLR CT / MR / PET | United Imaging | reconstruction/united-imaging.ts | E0/I0 |
| Canon PIQE | Canon | reconstruction/canon.ts | E0/I0 |
| SubtleSynth | Subtle Medical | image-enhancement/subtle-medical.ts | E0/I0 |
| Edison AI Orchestrator | GE Healthcare | platform/ge-healthcare.ts | E0/I2 |
| FALCON RT | EverFortune (v1) | auto-contouring/everfortune.ts | E0/I0 |

### Priority E1 Products to Search

| Product | Company | File | Current |
|---------|---------|------|---------|
| PixelShine | Algomedica | image-enhancement/algomedica.ts | E1/I2 |
| Vysioner | Vysioner | auto-contouring/vysioner.ts | E1/I2 |
| Elements Segmentation | Brainlab | auto-contouring/brainlab.ts | E1/I0 |
| AVIEW RT ACS | Coreline | auto-contouring/coreline.ts | E1/I2 |
| DirectORGANS | DirectOrgans | auto-contouring/directorgans.ts | E1/I2 |
| Taiwan Medical AI Seg | TMAI | auto-contouring/taiwan-medical-imaging.ts | E1/I0 |
| FALCON RT v2 | EverFortune | auto-contouring/everfortune.ts | E1/I2 |
| MOZI | Manteia | treatment-planning/manteia-mozi.ts | E1/I2 |
| Precise Image | Philips | reconstruction/philips.ts | E1/I2 |
| AiCE MR | Canon | reconstruction/canon.ts | E1/I2 |
| Advanced Intelligent Clear-IQ Engine | Siemens | image-enhancement/siemens.ts | E1/I2 |
| SmartDose | Philips | image-enhancement/philips-smartdose.ts | E1/I2 |

### Search Strategy

For each product, search:
1. PubMed: `"[product name]" OR "[company name]" AND "radiotherapy"` (or relevant modality terms)
2. Company website for published studies/white papers
3. FDA 510(k) summaries for referenced validation studies

### Update Rules

- **E0 to E1**: If vendor-published or single-center study found
- **E0/E1 to E2**: If multi-center or comparative study found
- **No change**: If no publications found, keep current rating but note "searched [date]"
- Evidence items ordered by relevance: independent multi-center first, then vendor studies, then regulatory summaries

## Files Modified

| File | Change |
|------|--------|
| `src/components/product/EvidenceLimitationsDetails.tsx` | Add collapsible evidence list (show 3, expand for more) |
| ~20 product data files | Update evidence arrays, rigor levels, and notes |

## Implementation Order

1. Implement the collapsible evidence UI first (so new evidence items display properly)
2. Search and update products in batches by category (auto-contouring first, then others)

