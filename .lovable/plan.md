

# Dual-Axis Classification System: Evidence Rigor and Clinical Impact

## The Problem You Identified

The current evidence level classification (adapted from van Leeuwen et al.) conflates two distinct concepts:

| Your Example | Current Rating | What's Missing |
|-------------|----------------|----------------|
| AI for patient favorite color with rigorous peer-reviewed proof | Level 1t (low) | High evidence rigor is unrecognized |
| Life-saving device with no publications | Level 0 (lowest) | High potential impact is unrecognized |

**Core insight**: A product can have high evidence rigor but low clinical impact (or vice versa). Judging both on a single scale does a disservice to useful but lower-impact devices like auto-contouring.

---

## Proposed Solution: Two Independent Axes

### Axis 1: Evidence Rigor (How robust is the evidence?)

Focuses purely on **study quality and methodology**, independent of what is being measured.

| Level | Name | Description | Example |
|-------|------|-------------|---------|
| **E0** | No Evidence | No peer-reviewed publications | Vendor white papers only |
| **E1** | Preliminary | Single-center, small sample, or pilot studies | n=20 retrospective validation |
| **E2** | Validated | Multi-center or large prospective studies | 500+ patients, 3+ centers |
| **E3** | Systematic | Systematic reviews, meta-analyses, or RCTs | Cochrane review, Phase III trial |

### Axis 2: Clinical Impact (What does the evidence demonstrate?)

Focuses on **what outcomes are measured**, independent of how rigorously.

| Level | Name | Description | RT Examples |
|-------|------|-------------|-------------|
| **I0** | Technical | Reproducibility, speed, consistency | Processing time benchmarks |
| **I1** | Performance | Accuracy vs reference standard | Dice scores, DVH accuracy |
| **I2** | Workflow | Time savings, variability reduction | Contouring time studies |
| **I3** | Decision | Treatment plan changes | Dose modification, plan selection |
| **I4** | Outcome | Patient health outcomes | Survival, toxicity, QoL |
| **I5** | Societal | Health economics, access | Cost-effectiveness, QALYs |

---

## Visual Representation: The Evidence-Impact Matrix

```text
                        Clinical Impact →
                 I0      I1      I2      I3      I4      I5
                Tech   Perf   Workflow  Decision Outcome Societal
           ┌────────────────────────────────────────────────────┐
     E3    │                                              ★     │  Systematic
     Rigor │        ○        ○         ○         ○        ○     │  Reviews/RCTs
           ├────────────────────────────────────────────────────┤
     E2    │        ●        ●         ●         ●              │  Multi-center
     Rigor │   Auto-contouring tools typically here             │  Validation
           ├────────────────────────────────────────────────────┤
     E1    │   ●    ●        ●                                  │  Pilot
     Rigor │   Most products start here                         │  Studies
           ├────────────────────────────────────────────────────┤
     E0    │   ○                                          ○     │  No
     Rigor │   New products       "Life-saving, no pubs" →      │  Evidence
           └────────────────────────────────────────────────────┘

Legend: ● = common zone    ○ = rare zone    ★ = aspirational goal
```

This visualization shows:
- **Auto-contouring products**: Often E2/I1-I2 (well-validated for accuracy and workflow, limited outcome data) - appropriately recognized as having strong evidence for their intended use
- **Newer products**: E0-E1 at various impact levels depending on claims
- **Your examples**: Favorite-color AI would be E3/I0 (rigorous but no clinical value); life-saving device would be E0/I4 (high claimed impact, no evidence)

---

## Data Model Changes

### File: `src/types/productDetails.d.ts`

**Add new fields** (lines 82-83 area):

```typescript
// Evidence level classification (adapted from van Leeuwen et al. 2021)
// DEPRECATED - kept for backward compatibility
evidenceLevel?: "0" | "1t" | "1c" | "2" | "3" | "4" | "5" | "6";
evidenceLevelNotes?: string;

// NEW: Dual-axis classification
evidenceRigor?: "E0" | "E1" | "E2" | "E3";
evidenceRigorNotes?: string;
clinicalImpact?: "I0" | "I1" | "I2" | "I3" | "I4" | "I5";
clinicalImpactNotes?: string;
```

### File: `src/data/evidence-levels.ts`

**Create new data structure:**

```typescript
export interface EvidenceRigorLevel {
  level: "E0" | "E1" | "E2" | "E3";
  name: string;
  description: string;
  criteria: string[];
  color: string;
}

export interface ClinicalImpactLevel {
  level: "I0" | "I1" | "I2" | "I3" | "I4" | "I5";
  name: string;
  description: string;
  rtExamples: string[];
  color: string;
}

export const EVIDENCE_RIGOR_LEVELS: EvidenceRigorLevel[] = [
  {
    level: "E0",
    name: "No Peer-Reviewed Evidence",
    description: "No peer-reviewed publications. Vendor materials or regulatory submissions only.",
    criteria: ["Vendor white papers", "Marketing materials", "FDA summary only"],
    color: "gray"
  },
  {
    level: "E1",
    name: "Preliminary Evidence",
    description: "Single-center, small sample size, or pilot studies.",
    criteria: ["Single institution", "Sample size <100", "Retrospective design", "Pilot studies"],
    color: "blue"
  },
  {
    level: "E2",
    name: "Validated Evidence",
    description: "Multi-center studies, large prospective cohorts, or robust retrospective studies.",
    criteria: ["Multi-center (3+)", "Sample size >200", "Prospective design", "External validation"],
    color: "green"
  },
  {
    level: "E3",
    name: "Systematic Evidence",
    description: "Systematic reviews, meta-analyses, or randomized controlled trials.",
    criteria: ["Systematic review", "Meta-analysis", "RCT", "Phase III trial"],
    color: "purple"
  }
];

export const CLINICAL_IMPACT_LEVELS: ClinicalImpactLevel[] = [
  {
    level: "I0",
    name: "Technical",
    description: "Demonstrates technical feasibility, reproducibility, speed.",
    rtExamples: ["Processing time benchmarks", "Reproducibility tests", "Consistency studies"],
    color: "slate"
  },
  {
    level: "I1",
    name: "Performance",
    description: "Accuracy compared to reference standard or ground truth.",
    rtExamples: ["Dice coefficient vs expert", "DVH prediction accuracy", "Deformable registration TRE"],
    color: "blue"
  },
  {
    level: "I2",
    name: "Workflow",
    description: "Time savings, efficiency gains, or variability reduction.",
    rtExamples: ["Contouring time reduction", "Inter-observer variability", "Planning efficiency"],
    color: "teal"
  },
  {
    level: "I3",
    name: "Decision",
    description: "Changes in treatment management or clinical decisions.",
    rtExamples: ["Dose modification rates", "Treatment intent changes", "Plan quality improvement"],
    color: "orange"
  },
  {
    level: "I4",
    name: "Outcome",
    description: "Patient health outcomes: survival, toxicity, quality of life.",
    rtExamples: ["Reduced toxicity", "Tumor control", "Survival analysis", "Patient-reported outcomes"],
    color: "purple"
  },
  {
    level: "I5",
    name: "Societal",
    description: "Health economics, cost-effectiveness, access to care.",
    rtExamples: ["Cost per QALY", "Reduced delays", "Access improvement in LMICs"],
    color: "rose"
  }
];
```

---

## UI Components to Create/Update

### 1. New Component: `EvidenceImpactBadges.tsx`

Display both ratings side-by-side:

```text
┌─────────────────┐  ┌─────────────────┐
│ 🔬 E2 Validated │  │ 🎯 I2 Workflow  │
└─────────────────┘  └─────────────────┘
```

### 2. New Component: `EvidenceImpactMatrix.tsx`

Interactive 2D matrix visualization for the Resources page:
- 4x6 grid (Rigor × Impact)
- Clickable cells showing products in each quadrant
- Color gradient showing density

### 3. Updated: `EvidencePyramid.tsx`

Replace single pyramid with:
- Side-by-side dual scales, OR
- The 2D matrix visualization

### 4. Updated: `EvidenceLimitationsDetails.tsx`

Add dual dropdowns for new classification:
- Evidence Rigor dropdown
- Clinical Impact dropdown
- Notes fields for each

### 5. New Page: `src/pages/EvidenceImpactGuide.tsx`

Comprehensive guide explaining the dual-axis system with:
- Why two axes matter (your favorite-color example)
- How to assign levels
- Interactive matrix
- Mapping from old → new system

---

## Migration Strategy

### Mapping Old → New Levels

| Old Level | Evidence Rigor | Clinical Impact | Notes |
|-----------|---------------|-----------------|-------|
| 0 | E0 | Needs assessment | No evidence → no impact claim |
| 1t | E1 | I0 | Technical validation |
| 1c | E1 | I1 | Performance correlation |
| 2 | E2 | I1 | Stand-alone performance |
| 3 | E1-E2 | I2 | Workflow studies |
| 4 | E1-E2 | I3 | Decision impact |
| 5 | E2-E3 | I4 | Outcome studies |
| 6 | E2-E3 | I5 | Societal impact |

**Note**: The mapping is not 1:1 because the old system conflated both. Manual review needed for each product.

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/data/evidence-impact-levels.ts` | **Create** | New dual-axis level definitions |
| `src/types/productDetails.d.ts` | Update | Add new classification fields |
| `src/components/product/EvidenceImpactBadges.tsx` | **Create** | Dual badge display component |
| `src/components/resources/EvidenceImpactMatrix.tsx` | **Create** | Interactive 2D matrix visualization |
| `src/pages/EvidenceImpactGuide.tsx` | **Create** | Full methodology documentation |
| `src/pages/EvidenceLevels.tsx` | Update | Add dual-axis content, keep legacy |
| `src/components/resources/EvidencePyramid.tsx` | Update | Add matrix view option |
| `src/components/resources/EvidenceLevelTable.tsx` | Update | Add dual-axis columns |
| `src/components/product/EvidenceLevelBadge.tsx` | Update | Support new badge types |
| `src/components/product/EvidenceLimitationsDetails.tsx` | Update | Dual dropdowns for editing |
| `src/data/evidence-levels.ts` | Update | Add rigor/impact definitions |
| `src/App.tsx` | Update | Add route for new guide page |

---

## Benefits of This Approach

1. **Fair representation**: Auto-contouring products with robust validation (E2) are recognized even if they only demonstrate workflow impact (I2)

2. **Clear communication**: Stakeholders immediately understand both:
   - How trustworthy is the evidence?
   - What clinical benefit is claimed?

3. **Better decision support**: A clinician choosing between:
   - E2/I2 (validated workflow improvement) vs
   - E1/I4 (preliminary outcome claims)
   - Can make informed trade-off decisions

4. **Publication potential**: As you noted, this makes for a much prettier figure and clearer taxonomy for academic papers

---

## Example Classifications

| Product | Old | Rigor | Impact | Interpretation |
|---------|-----|-------|--------|----------------|
| Mature auto-contouring | 2-3 | E2 | I1-I2 | Well-validated for accuracy and workflow |
| New outcome-focused product | 0-1 | E0 | I4 | Claims outcome benefits, no evidence yet |
| Patient favorite color AI | 1t | E3 | I0 | Extremely rigorous, no clinical value |
| Life-saving device (no pubs) | 0 | E0 | I4 | High claimed impact, needs evidence |

