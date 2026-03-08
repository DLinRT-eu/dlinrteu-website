

# Research Initiatives Audit & Model Zoo Expansion

## Inclusion Criteria (to be stated on the page)

### Grand Challenges
- Must be a **competitive benchmark challenge** specifically targeting radiotherapy AI tasks (segmentation, treatment planning, image synthesis, tracking, dose prediction)
- Must provide **standardized evaluation** and a public leaderboard or published results
- Organized by recognized scientific bodies (MICCAI, ESTRO, AAPM, or equivalent)

### Open Datasets
- Must contain **radiotherapy-specific data** (RT structures, dose distributions, treatment plans) or imaging data explicitly intended for RT AI development
- Must be **freely accessible** for research (with or without registration)

### Model Zoos
- Must be a **collection of multiple pre-trained models** (not a single model or a training framework alone)
- Must include models applicable to **medical imaging tasks relevant to radiotherapy** (segmentation, synthesis, reconstruction)
- Must be **openly accessible** for research use

## Audit Findings

### Current Model Zoos — Issues
1. **TotalSegmentator** — This is a **single model** (one architecture, one set of weights), not a model zoo. It violates the "collection of multiple models" criterion. **Recommend removal** from Model Zoos. It could be referenced in the page description as a notable open-source tool, but it is not a zoo.
2. **nnU-Net** — This is a **framework/methodology**, not a model zoo. It does not host pre-trained models for download (users train their own). **Recommend removal** from Model Zoos for the same reason.
3. **MHub.ai** — Valid. Curated collection of multiple containerized models for medical imaging.
4. **MONAI Model Zoo** — Valid. Collection of 60+ pre-trained model bundles.

### New Model Zoos to Add
1. **NVIDIA Clara Medical (Open Models)** — Collection on Hugging Face with multiple open models: NV-Segment-CT (VISTA3D), NV-Segment-CTMR, NV-Generate-CT, NV-Generate-MR, NV-Reason-CXR. Segment models directly applicable to RT OAR segmentation; Generate models for synthetic CT/MR. Actively maintained (updated days ago). URL: `https://huggingface.co/collections/nvidia/clara-medical`
2. **MSHub (Medical Image Segmentation Hub)** — Collection of pre-trained nnU-Net models for medical image segmentation, including tumor and lymph node segmentation tasks relevant to RT. Apache 2.0 license. URL: `https://github.com/Luoxd1996/MSHub`. Small but growing (23 stars). Include with caveat that it's early-stage.

### Challenges & Datasets — No Changes Needed
- All 9 challenges verified as legitimate RT-specific challenges
- All 10 datasets verified as RT-relevant with open access
- No new major RT challenges identified that are missing (checked grand-challenge.org for recent RT challenges — current list is comprehensive)

## Planned Changes

### 1. Update `src/components/initiatives/InitiativesHeader.tsx`
- Add a brief inclusion criteria statement beneath the existing description (collapsible or inline note)

### 2. Update `src/data/initiatives/modelzoo.ts`
- **Remove** TotalSegmentator (single model, not a zoo)
- **Remove** nnU-Net (framework, not a zoo)
- **Add** NVIDIA Clara Medical (Open Models)
- **Add** MSHub
- Keep MHub.ai and MONAI Model Zoo

### 3. No changes to challenges.ts or datasets.ts

### Summary
- 2 entries removed (TotalSegmentator, nnU-Net) for not meeting the "collection of multiple models" criterion
- 2 entries added (NVIDIA Clara Medical, MSHub)
- Inclusion criteria statement added to page header
- Net model zoo count stays at 4

