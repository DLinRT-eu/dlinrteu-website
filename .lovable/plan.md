

# Plan: Revise Platform Products - MedLever and GE Healthcare iRT

## Summary of Findings

Based on FDA database research and official documentation, both products require regulatory updates:

| Product | Issue | Required Fix |
|---------|-------|--------------|
| **MedLever Radiation Oncology Work Management** | FDA status incorrectly listed as "510(k) Cleared" | Update to Non-Device-MDDS (exempt workflow software) |
| **GE Healthcare iRT** | Missing specific clearance numbers | Add K230082 reference for integrated auto-segmentation component |

---

## 1. MedLever: Radiation Oncology Work Management

### Research Finding

MedLever's platform is classified as **Non-Device-MDDS** (Medical Device Data System) per FDA's September 2022 guidance. Software solely intended to transfer, store, convert formats, and display medical device data without altering it is **not considered a medical device** and does not require 510(k) clearance.

The current database incorrectly states:
- `status: "510(k) Cleared"`
- `class: "Class II"`

This is inaccurate based on the product's actual function as an administrative workflow and documentation orchestration tool.

### Current vs. Corrected Data

| Field | Current Value | Corrected Value |
|-------|---------------|-----------------|
| FDA status | "510(k) Cleared" | "Non-Device-MDDS (Exempt)" |
| FDA class | "Class II" | Remove (not applicable) |
| FDA type | "510(k)" | "MDDS Exempt" |
| certification | "FDA" | "Non-Regulated" |
| version | "1.0" | Remove (unverified) |
| Intended Use | Generic summary | Updated based on official product description |
| usesAI | Not specified | Add `usesAI: false` (workflow tool, not AI-powered) |

### Corrected Regulatory Section

```text
regulatory: {
  fda: {
    status: "Non-Device-MDDS (Exempt)",
    type: "MDDS Exempt",
    notes: "Per FDA's 2022 guidance on Medical Device Data Systems, workflow management software that transfers, stores, and displays clinical data without diagnostic modification is classified as Non-Device-MDDS and exempt from 510(k) requirements."
  },
  intendedUseStatement: "A vendor-independent workflow automation and documentation solution designed to coordinate the full patient care cycle (simulation, planning, treatment, and QA) in radiation oncology. The platform simplifies clinical and administrative activities, automates document generation, and provides real-time visibility through bidirectional synchronization with Oncology Information Systems (OIS)."
}
```

---

## 2. GE Healthcare: Intelligent Radiation Therapy (iRT)

### Research Finding

The iRT platform is a **Radiation Therapy Collaboration System (RTCS)** that orchestrates various cleared components. It does not have a single standalone 510(k) for the "iRT" brand; instead, it integrates specific cleared software modules:

- **K230082** (May 4, 2023): Auto Segmentation component
- **K213717**: MR Contour DL
- Third-party integrations: MVision Contour+ (K241490), MIM Contour ProtégéAI+

The platform itself functions as a workflow orchestration layer.

### Current vs. Corrected Data

| Field | Current Value | Corrected Value |
|-------|---------------|-----------------|
| FDA notes | "Specific clearance number pending verification" | Add K230082, K213717 as integrated component clearances |
| version | "1.0" | Remove (unverified) |
| Intended Use | Current statement is reasonable | Keep with minor refinement based on official RTCS description |

### Corrected Regulatory Section

```text
regulatory: {
  ce: {
    status: "CE Marked",
    class: "IIb",
    type: "MDR",
    regulation: "MDR (EU 2017/745)"
  },
  fda: {
    status: "510(k) Cleared (via integrated components)",
    class: "Class II",
    type: "510(k)",
    notes: "The iRT platform orchestrates multiple cleared clinical modules. Key component clearances include K230082 (Auto Segmentation, May 2023), K213717 (MR Contour DL), and integrates third-party cleared devices including MVision Contour+ (K241490) and MIM Contour ProtégéAI+."
  },
  intendedUseStatement: "A fully-interoperable radiation therapy collaboration system (RTCS) for patient workflow management. Designed to integrate AI-supported auto-segmentation, intelligent resource scheduling, analytics reporting, and vendor-neutral connectivity with hospital information systems (OIS, TPS, EMR, QA, PACS) to optimize radiation therapy delivery, reduce treatment delays, and improve departmental efficiency."
}
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/products/platform/medlever.ts` | Update FDA status to Non-Device-MDDS, remove version, update intended use, add usesAI: false |
| `src/data/products/platform/ge-healthcare.ts` | Update FDA notes with component clearances, remove version, refine intended use |

---

## Technical Details

### MedLever (medlever.ts)

| Line | Current | Change To |
|------|---------|-----------|
| 19 | `certification: "FDA"` | `certification: "Non-Regulated"` |
| 54-58 | FDA object with "510(k) Cleared" | FDA object with "Non-Device-MDDS (Exempt)" |
| 60 | Generic intended use | Official product description |
| 66 | `version: "1.0"` | Remove field |
| New | - | Add `usesAI: false` |

### GE Healthcare iRT (ge-healthcare.ts)

| Line | Current | Change To |
|------|---------|-----------|
| 67-72 | FDA notes "pending verification" | FDA notes with K230082, K213717 references |
| 73 | Intended use statement | Refined RTCS description |
| 79 | `version: "1.0"` | Remove field |

---

## Summary of Changes

| Product | Certification | Version | Intended Use | FDA Status |
|---------|--------------|---------|--------------|------------|
| MedLever | FDA → Non-Regulated | Remove "1.0" | Updated to official | 510(k) Cleared → Non-Device-MDDS (Exempt) |
| GE iRT | CE & FDA (keep) | Remove "1.0" | Refined | Add K230082, K213717 component references |

---

## Important Classification Note

**MedLever** should have `usesAI: false` added because:
- It is a workflow orchestration tool, not an AI-powered medical device
- The platform provides workflow automation and documentation but does not use AI/ML for clinical decision-making
- This aligns with the platform's distinction between "AI Products" and "QA Tools" in the UI

