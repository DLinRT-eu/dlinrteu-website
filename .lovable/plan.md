

# Research Initiatives - Scope Definition & Content Update

## Overview

This plan defines clear boundaries for what belongs on the Research Initiatives page and identifies new initiatives to add based on the established criteria.

---

## Proposed Scope Definition

### What Should Be Included

The Research Initiatives page should include resources that directly support **AI/Deep Learning development for radiotherapy** in three categories:

| Category | Definition | Inclusion Criteria |
|----------|------------|---------------------|
| **Grand Challenges** | Competitive benchmarks with standardized evaluation | Must focus on radiotherapy tasks (segmentation, dose prediction, image synthesis, tracking); Hosted on recognized platforms (grand-challenge.org, MICCAI) |
| **Open Datasets** | Publicly accessible data collections | Must include radiotherapy-relevant data (RT structures, dose distributions, treatment plans, or radiotherapy-specific imaging); Open for research use |
| **Model Zoos** | Collections of pre-trained models | Must include models applicable to radiotherapy workflows; Open source or freely accessible |

### What Should Be Excluded

- **General medical imaging challenges** not specifically focused on radiotherapy
- **Commercial products** (these belong in the Products section)
- **Individual research papers** without associated datasets/challenges
- **EU Research Projects** (currently hidden - consider whether to display or formally remove)

---

## Decision: Research Projects Category

The codebase contains 5 EU Research Projects (PANTHER, MEDIRAD, ARTFORCE, REQUITE, ADAPT) but they are **intentionally hidden** from the page.

**Options:**

| Option | Recommendation |
|--------|----------------|
| A. Display them | Add a fourth "Research Projects" section to show funded EU consortia |
| B. Remove from codebase | Delete the research-projects.ts file if not needed |
| C. Keep hidden (current) | Maintain current behavior - data exists for reference only |

**choice:** B. Remove from codebasw

---

## New Initiatives to Add

### Grand Challenges (3 additions)

| Name | Focus | Status | Platform |
|------|-------|--------|----------|
| **HNTS-MRG 2024** | Head & neck tumor segmentation for MR-guided radiotherapy | Completed | grand-challenge.org |
| **DoseRT** | Dose prediction challenge (if active) | Research needed | TBD |
| **CBCT-to-CT Challenge** | CBCT image quality for adaptive RT (if exists) | Research needed | TBD |

### Open Datasets (5 additions)

| Name | Content | Source | Relevance |
|------|---------|--------|-----------|
| **RADCURE** | 3,346 HNC patients with CT, structures, clinical data | TCIA | Large-scale HNC radiotherapy dataset |
| **GLIS-RT** | Glioma RT targets, OARs, barriers to spread | TCIA | Brain RT planning |
| **HNC-IMRT-70-33** | HNC patients treated with identical IMRT prescriptions | TCIA | Treatment planning standardization |
| **Brain Metastasis MRI** | Brain metastasis 3D segmentations | Nature Scientific Data | Brain SRS/SRT planning |
| **Prostate-MRI-US-Biopsy** | Prostate imaging with annotations | TCIA | Prostate RT planning (if RT-relevant) |

### Model Zoos (2 additions)

| Name | Description | Relevance |
|------|-------------|-----------|
| **TotalSegmentator** | 100+ anatomical structures in CT/MRI | Widely used for OAR segmentation in RT |
| **nnU-Net** | Self-configuring segmentation framework | Foundation for many RT AI models |

### Research Projects (2 additions - if displaying)

| Name | Focus | Funding | Status |
|------|-------|---------|--------|
| **PRE-ACT** | Radiotherapy side effects prediction using AI | Horizon Europe | Active |
| **CHAIMELEON** | Health imaging repository for AI in cancer | Horizon 2020 | Active |

---

## Implementation Summary

### Files to Modify

| File | Changes |
|------|---------|
| `src/data/initiatives/challenges.ts` | Add HNTS-MRG 2024 |
| `src/data/initiatives/datasets.ts` | Add RADCURE, GLIS-RT, HNC-IMRT-70-33, Brain Metastasis MRI |
| `src/data/initiatives/modelzoo.ts` | Add TotalSegmentator, nnU-Net |
| `src/data/initiatives/research-projects.ts` | Add PRE-ACT, CHAIMELEON (if displaying) |
| `src/hooks/useInitiativeFilters.ts` | Remove Research Project filter (if displaying) |
| `src/hooks/useInitiativesSorting.ts` | Add Research Projects grouping (if displaying) |
| `src/components/initiatives/InitiativesCategorySections.tsx` | Add Research Projects section (if displaying) |
| `src/components/initiatives/InitiativesHeader.tsx` | Update description to clarify scope |

---

## Updated Page Header Description

Current:
```text
Discover the latest research initiatives, grand challenges, open datasets, 
and model zoos in the field of radiotherapy.
```

Proposed:
```text
Discover resources for AI/Deep Learning development in radiotherapy: 
grand challenges with standardized benchmarks, open datasets with RT structures 
and dose distributions, and model zoos with pre-trained segmentation models. 
All resources are freely accessible for research.
```

---

## Data Structure for New Entries

### HNTS-MRG 2024 Challenge

```typescript
{
  id: "hnts-mrg-2024",
  name: "HNTS-MRG 2024",
  category: "Grand Challenge",
  description: "Head and Neck Tumor Segmentation for MR-Guided Applications challenge at MICCAI 2024, focusing on gross tumor volume and metastatic lymph node segmentation in MRI for adaptive radiotherapy.",
  website: "https://hntsmrg24.grand-challenge.org/",
  organization: "MICCAI Society",
  startDate: "2024-03-01",
  endDate: "2024-10-06",
  status: "Completed",
  tags: ["Head and Neck Cancer", "MRI", "Segmentation", "Adaptive Radiotherapy", "GTV", "Lymph Nodes"],
  features: [
    "Pre-treatment and mid-treatment MRI",
    "GTV and metastatic lymph node annotations",
    "Two tasks: pre-RT and mid-RT segmentation"
  ],
  dataAccess: "Available after registration",
  resultsUrl: "https://hntsmrg24.grand-challenge.org/",
  participationInfo: "Challenge completed, data available for post-challenge research"
}
```

### RADCURE Dataset

```typescript
{
  id: "radcure",
  name: "RADCURE",
  category: "Open Dataset",
  description: "Large open-access head and neck cancer CT dataset with 3,346 patients including RT structures, dose distributions, and clinical outcomes for radiotherapy AI research.",
  website: "https://www.cancerimagingarchive.net/collection/radcure/",
  organization: "Princess Margaret Cancer Centre / University Health Network",
  status: "Active",
  tags: ["Head and Neck Cancer", "CT", "Radiotherapy", "Structures", "Clinical Outcomes", "Large Dataset"],
  features: [
    "3,346 HNC patients",
    "CT images with RT structures",
    "Treatment outcome data",
    "Multi-institutional quality"
  ],
  dataAccess: "Available through TCIA",
  participationInfo: "Open to all researchers"
}
```

### TotalSegmentator Model Zoo

```typescript
{
  id: "totalsegmentator",
  name: "TotalSegmentator",
  category: "Model Zoo",
  description: "Open-source deep learning tool for robust segmentation of 100+ anatomical structures in CT and MRI images. Widely used as foundation for radiotherapy OAR segmentation.",
  website: "https://github.com/wasserth/TotalSegmentator",
  organization: "University Hospital Basel / University of Basel",
  status: "Active",
  tags: ["CT", "MRI", "Segmentation", "Organs at Risk", "nnU-Net", "Open Source"],
  features: [
    "117 anatomical structures in CT",
    "59 structures in MRI",
    "nnU-Net-based architecture",
    "Python package and Docker available",
    "Validated on clinical data"
  ],
  dataAccess: "Freely available on GitHub and PyPI",
  participationInfo: "Open source under Apache 2.0 license"
}
```

---

## Validation Checklist

Before implementation:

- [ ] Verify HNTS-MRG 2024 challenge data availability
- [ ] Confirm RADCURE dataset is on TCIA
- [ ] Check GLIS-RT radiotherapy relevance
- [ ] Verify TotalSegmentator has RT-specific models
- [ ] Decide on Research Projects display (requires user input)
- [ ] Update SEO metadata for new content

