
# Revising I0 and I1: Separating Validation Method from Actual Impact

## The Problem

The current I0 (Technical) and I1 (Performance) definitions still lean on **type of validation** rather than **actual impact**:

| Current | Description | Issue |
|---------|-------------|-------|
| I0 Technical | "reproducibility, speed, consistency" | These are *methods*, not outcomes |
| I1 Performance | "accuracy vs reference standard" | This is *how you measure*, not *what value it provides* |

As the user notes: If something is "faster" or "more accurate", the actual *impact* could be workflow (faster = time savings) or quality (more accurate = better care). The "technical" aspect describes the *validation approach*, not the *clinical benefit*.

## Proposed Revision

### Core Principle
The Impact axis should describe **what benefit is demonstrated**, not **how it was validated**. The validation method belongs to the Rigor axis.

### Revised I0-I5 Definitions

| Level | Current Name | Revised Name | Revised Description |
|-------|--------------|--------------|---------------------|
| **I0** | Technical | None Demonstrated | No clinical, workflow, or quality benefit demonstrated. Product feasibility only. |
| **I1** | Performance | Quality Assurance | Enables monitoring, measurement, or quality assurance that indirectly supports patient care. |
| **I2** | Workflow | Workflow | (unchanged) Time savings, efficiency, variability reduction. |
| **I3** | Decision | Decision | (unchanged) Changes in clinical decisions. |
| **I4** | Outcome | Outcome | (unchanged) Patient health outcomes. |
| **I5** | Societal | Societal | (unchanged) Health economics, access. |

### Detailed Definitions

```text
I0 - None Demonstrated
━━━━━━━━━━━━━━━━━━━━━
Description: No clinical, workflow, or quality benefit demonstrated beyond 
             proving the product works. Feasibility or technical capability only.

RT Examples:
- Product works on test cases (no patient benefit shown)
- Technical reproducibility without clinical context
- Computational benchmarks without clinical validation

When to use:
- New products with no clinical studies yet
- Technical proof-of-concept only
- "Favorite color AI" example (rigorous but no clinical value)
```

```text
I1 - Quality Assurance
━━━━━━━━━━━━━━━━━━━━━
Description: Enables monitoring, measurement, or quality assurance that 
             indirectly supports patient care. Does not directly affect 
             treatment but ensures safe/consistent operation of clinical systems.

RT Examples:
- QA tools that validate AI contour accuracy (MVision Verify)
- Performance monitoring dashboards
- Automated consistency checks
- Measurement devices that ensure correct operation

When to use:
- Products that monitor other AI/clinical systems
- QA and verification tools
- Calibration and consistency checking
- "Guardian" products that prevent harm indirectly
```

```text
I2 - Workflow (unchanged)
━━━━━━━━━━━━━━━━━━━━━━━━
Description: Time savings, efficiency gains, or reduction in variability 
             within clinical workflow.

RT Examples:
- Contouring time reduction (e.g., 30 min → 5 min)
- Inter-observer variability reduction
- Treatment planning efficiency
- Review/approval time savings
```

### How This Addresses the User's Points

| User Concern | How Revised Scale Addresses It |
|--------------|-------------------------------|
| "Technical - does the same but faster/more accurate?" | Faster → I2 (Workflow). More accurate → depends on outcome demonstrated. "Technical" now means no benefit shown. |
| "Performance - could be measurement devices?" | Yes! I1 now explicitly covers QA/monitoring tools that support care indirectly. |
| "QA tools are important!" | I1 (Quality Assurance) recognizes their value as enablers of safe AI use. |
| "I0/I1 lean on type of validation" | Revised definitions focus on *what benefit*, not *how measured*. |

### Visual: Where Products Fall

```text
Product Type                     Current     Revised     Rationale
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Auto-contouring (accuracy)       I1          I2*         Accuracy enables workflow savings
Auto-contouring (time study)     I2          I2          Direct workflow demonstration
MVision Verify (QA tool)         I0/I1?      I1          Monitoring tool - indirect impact
PixelShine (reconstruction)      I0          I2**        If workflow demonstrated, else I0
Outcome study product            I4          I4          Unchanged
New product (no data)            I0          I0          No benefit demonstrated yet

* If accuracy study shows clinical workflow benefit, it's I2
** Reconstruction speed = workflow benefit; pure image quality without clinical 
   validation = I0 (none demonstrated)
```

## File Changes

### `src/data/evidence-impact-levels.ts`

Update CLINICAL_IMPACT_LEVELS array (lines 85-158):

```typescript
export const CLINICAL_IMPACT_LEVELS: ClinicalImpactLevel[] = [
  {
    level: "I0",
    name: "None Demonstrated",
    description: "No clinical, workflow, or quality benefit demonstrated beyond feasibility. Product works, but no patient-facing value shown.",
    rtExamples: [
      "Technical feasibility studies only",
      "Proof-of-concept without clinical validation",
      "Computational benchmarks without patient context",
      "Product works but no impact studies conducted"
    ],
    color: "slate"
  },
  {
    level: "I1",
    name: "Quality Assurance",
    description: "Enables monitoring, measurement, or quality assurance that indirectly supports patient care. Does not directly affect treatment but ensures safe operation.",
    rtExamples: [
      "QA tools validating AI contour accuracy",
      "Performance monitoring dashboards",
      "Automated consistency checks",
      "Measurement devices ensuring correct operation"
    ],
    color: "blue"
  },
  // I2-I5 remain unchanged...
];
```

### `src/pages/EvidenceImpactGuide.tsx`

Update the Example Classifications table to reflect new definitions:

```typescript
// Add QA tool example
<tr>
  <td className="py-3 pr-4">QA/Monitoring tool</td>
  <td className="py-3 pr-4">
    <EvidenceImpactBadges evidenceRigor="E2" clinicalImpact="I1" size="sm" showTooltip={false} />
  </td>
  <td className="py-3 text-muted-foreground">Well-validated tool that monitors AI accuracy</td>
</tr>

// Update "Favorite color AI" example
<tr>
  <td className="py-3 pr-4">"Favorite color" AI (example)</td>
  <td className="py-3 pr-4">
    <EvidenceImpactBadges evidenceRigor="E3" clinicalImpact="I0" size="sm" showTooltip={false} />
  </td>
  <td className="py-3 text-muted-foreground">Highest rigor (RCTs), but no clinical benefit demonstrated</td>
</tr>
```

Add a note about the distinction between validation method and impact.

### `src/components/resources/EvidenceLevelTable.tsx`

Update to use new level names in the Clinical Impact column.

### `src/components/resources/EvidenceImpactMatrix.tsx`

Ensure the matrix uses the updated level names.

## Summary of Changes

| File | Change |
|------|--------|
| `src/data/evidence-impact-levels.ts` | Update I0 and I1 definitions, names, descriptions, and examples |
| `src/pages/EvidenceImpactGuide.tsx` | Update example table, add QA tool example, clarify methodology |
| `src/components/resources/EvidenceLevelTable.tsx` | Updated automatically via data file |
| `src/components/resources/EvidenceImpactMatrix.tsx` | Updated automatically via data file |

## Benefits

1. **Clear separation**: Impact axis now describes *what benefit*, not *how measured*
2. **QA tools recognized**: I1 explicitly values monitoring/QA products that support safe AI use
3. **Consistent classification**: Products with accuracy studies get I2 if workflow benefit is demonstrated
4. **Future-proof**: Framework clearer for classifying new product types
5. **User's feedback addressed**: "Technical" no longer describes a validation method
