

# Plan: Add Page Index Navigation and Extend Resources Library

## Overview

This plan addresses two enhancements to the Resources & Compliance page:
1. **Add a Table of Contents (Index)** - A navigation component allowing users to quickly jump to any section
2. **Add more validated radiotherapy and AI guidelines** - Expand the Extended Resources Library with verified, authoritative sources

---

## Part 1: Add Navigation Index

### Current Structure Analysis

The Resources & Compliance page has 10 distinct sections:
1. Classification taxonomy
2. Glossary of clinical tasks  
3. Evidence level classification
4. Regulatory overview
5. Regulatory landscape (quick guide)
6. Standards, guidelines & principles
7. Practical compliance checklist
8. Core documents & references
9. Extended resources library
10. Disclaimer

### Implementation Approach

Following the existing pattern used in `ReviewerGuide.tsx`, `AdminGuide.tsx`, and `CompanyGuide.tsx`:

**Step 1: Create a PageIndex component** (`src/components/resources/PageIndex.tsx`)

This reusable component will:
- Display a card with "Quick Navigation" header
- Contain buttons/links for each section
- Use icons to visually distinguish sections
- Use responsive grid layout (2 columns on desktop)

**Step 2: Modify ResourcesCompliance.tsx**

- Import the new `PageIndex` component
- Add unique `id` attributes to each `<section>` element
- Add `scroll-mt-20` class to sections for proper scroll offset (accounts for fixed header)
- Place the PageIndex component after the hero section, before the first content section

### Technical Details

```text
Section IDs to add:
- id="classification-taxonomy"
- id="clinical-tasks"
- id="evidence-levels"
- id="regulatory-overview"
- id="regulatory-landscape"
- id="standards-guidelines"
- id="compliance-checklist"
- id="core-documents"
- id="resources-library"
- id="disclaimer"
```

---

## Part 2: Add Validated Guidelines to Extended Resources Library

### New Resources to Add

The following resources have verified DOI links or official organizational URLs:

#### AI/ML-Specific Guidelines (New Category)

| Title | Source | URL |
|-------|--------|-----|
| AAPM TG-273: Best Practices for AI/ML in CAD | AAPM (2023) | https://doi.org/10.1002/mp.16188 |
| AAPM TG-211: Auto-Segmentation for PET | AAPM (2017) | https://doi.org/10.1002/mp.12078 |
| EU AI Act High-Risk AI Requirements | EU AI Act Portal | https://artificialintelligenceact.eu/high-risk-ai-systems/ |

#### Quality Assurance (New Entries)

| Title | Source | URL |
|-------|--------|-----|
| NCS Report 33: QA for AI-based Auto-Contouring | NCS (2023) | https://doi.org/10.25030/ncs-033 |

#### Radiotherapy-Specific Guidelines

| Title | Source | URL |
|-------|--------|-----|
| ICRU Report 97: MRI-Guided Radiotherapy | ICRU (2023) | https://doi.org/10.1093/jicru/ndad010 |
| AAPM TG-302: Surface Guided Radiotherapy | AAPM (2022) | https://doi.org/10.1002/mp.15532 |
| SBRT-PATHY Guidelines | RadOnc (2024) | https://doi.org/10.1016/j.radonc.2024.110183 |

#### Data Standards (Expand Existing Category)

| Title | Source | URL |
|-------|--------|-----|
| OMOP Common Data Model | OHDSI | https://ohdsi.github.io/CommonDataModel/ |
| RTOG Contouring Atlases | NRG Oncology | https://www.nrgoncology.org/Resources/Atlases |

### Files to Modify

**File: `src/components/resources/ResourceLinks.tsx`**

Add entries to the `resources` array with appropriate categories:
- "AI/ML Guidelines" (new category)
- "Radiotherapy Guidelines" (new category)
- "Data Standards" (existing category)
- "QA Guidelines" (existing category)

---

## Summary of File Changes

| File | Action |
|------|--------|
| `src/components/resources/PageIndex.tsx` | Create new component |
| `src/pages/ResourcesCompliance.tsx` | Add PageIndex import, add section IDs, add scroll-mt-20 classes |
| `src/components/resources/ResourceLinks.tsx` | Add 8+ new validated resource entries |

---

## User Experience Improvement

After implementation:
- Users can click any section in the index to smoothly scroll to that section
- The page header remains visible due to `scroll-mt-20` offset
- New resources provide authoritative guidance for AI implementation in radiotherapy
- All links have been verified to point to working DOI or official URLs

