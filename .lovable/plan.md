

# Update Challenges: Add Missing CBCT and AAPM RT Challenges

## Audit Results

Current challenge list is missing several RT-relevant challenges, particularly around CBCT and AAPM-organized events. After research, here are the findings:

### Challenges to Add

1. **AAPM GDP-HMM (2025, Active)** — Generalizable Dose Prediction for Heterogeneous Multi-Cohort and Multi-Site Radiotherapy Planning. Multi-site, multi-cohort dose prediction challenge. Directly RT.
   - URL: `https://www.aapm.org/GrandChallenge/GDP-HMM/`
   - Org: AAPM
   - Tags: Dose Prediction, Treatment Planning, Multi-Site, Radiation Therapy

2. **AAPM MATCH (2019–2021, Completed)** — MArkerless lung Target Tracking CHallenge. Evaluates markerless tumor tracking during RT delivery using kV imaging. Directly RT.
   - URL: `https://www.aapm.org/GrandChallenge/MATCH/`
   - Org: AAPM
   - Published results: doi:10.1002/mp.15418
   - Tags: Lung Cancer, Tracking, Real-Time, Radiation Therapy

3. **ICASSP 3D CBCT Challenge (2024, Completed)** — Deep learning for low-dose 3D cone-beam CT reconstruction. CBCT is fundamental to RT image guidance and adaptive RT workflows.
   - URL: `https://sites.google.com/view/icassp2024-spgc-3dcbct/home`
   - Org: IEEE / ICASSP Signal Processing Grand Challenges
   - Tags: CBCT, Image Reconstruction, Deep Learning, Radiation Therapy

### Challenges Considered but Not Added

- **AAPM TrueCT** — General diagnostic CT reconstruction, not RT-specific. Does not meet the "specifically targeting radiotherapy AI tasks" criterion.
- **OpenKBP as challenge** — Already listed as an Open Dataset with the challenge publication referenced. No duplication needed.

### Existing Entry Fix

- **AAPM Thoracic Auto-Segmentation**: Update the generic `https://www.aapm.org/GrandChallenge/` URL to the specific challenge page if available, or note that no dedicated page exists.

## File to Modify

**`src/data/initiatives/challenges.ts`** — Add 3 new entries to the `CHALLENGE_INITIATIVES` array.

## Summary

- 3 new challenges added (GDP-HMM, MATCH, ICASSP 3D CBCT)
- Net challenge count goes from 9 to 12
- All meet the established inclusion criteria (competitive benchmarks for RT AI tasks, standardized evaluation, recognized organizers)

