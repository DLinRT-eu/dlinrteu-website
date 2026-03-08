

# ECR 2026 Impact on Reconstruction Products

## Research Findings

I investigated all major vendors' ECR 2026 announcements and searched for new evidence. Here's what I found:

### New Products / Hardware (not requiring new reconstruction entries)
- **Philips Rembra CT**: New CT scanner unveiled at ECR 2026 (CE Marked, 510(k) pending). Uses NanoPanel Precise XD detector with AI reconstruction. This is a scanner platform, not a new standalone DL reconstruction algorithm -- existing Precise Image entry covers the reconstruction technology.
- **Philips Verida**: First detector-based spectral CT with AI (European debut at ECR). Again a scanner, not a new reconstruction algorithm.
- **Siemens**: ECR 2026 focus was on angiography (ARTIS icono.vision), Alzheimer's initiative, and Fit Upgrades. No new reconstruction product.
- **GE Healthcare**: No new reconstruction product or version announced at ECR 2026.
- **United Imaging**: Showed at WHX 2026 (Dubai) but no ECR 2026 reconstruction news.
- **Subtle Medical**: 14 presentations at ECR 2026 on MRI/PET enhancement and expanding into CT, but these are Image Enhancement products, not Reconstruction category.

### New Evidence Found
1. **Canon PIQE (Precise IQ Engine)**: Greffier et al. "Phantom-based performance comparison of two commercial deep learning CT reconstruction algorithms with super- and normal-resolution settings." *European Radiology Experimental* 2026;10:9. Published Jan 26, 2026. Independent phantom study comparing PIQE (SR-DLR) vs AiCE (NR-DLR) for abdominal CT. Shows PIQE improved spatial resolution and detectability. DOI: 10.1186/s41747-025-00670-2

   The paper also references two additional PIQE studies not yet in our database:
   - Nagayama et al. 2025: PIQE with 1024 matrix improves CT quality for pancreatic ductal adenocarcinoma. DOI: 10.1016/j.ejrad.2025.111953
   - Funama et al. 2025: Advances in spatial resolution using SR-DLR for abdominal CT. DOI: 10.1016/j.acra.2024.09.012

## Planned Changes

### 1. Update Canon PIQE evidence and classification
- Add 3 new evidence entries (Greffier 2026, Nagayama 2025, Funama 2025)
- Upgrade `evidenceRigor` from `E0` to `E1` (vendor-independent phantom + clinical studies now exist)
- Update `evidenceRigorNotes` with new citations
- Set `evidenceVendorIndependent: true` (Greffier et al. is independent)
- Set `evidenceExternalValidation: true`
- Update `clinicalImpact` from `I0` to `I1` (technical efficacy demonstrated)
- Update `lastUpdated` and `lastRevised` to `2026-03-08`

### 2. No new reconstruction product entries needed
The ECR 2026 announcements (Rembra, Verida) are CT scanner platforms that use existing DL reconstruction algorithms already tracked in the database. No new standalone reconstruction AI products were announced.

---

**Summary**: The main actionable update is upgrading Canon PIQE's evidence profile with 3 newly found peer-reviewed publications, changing its classification from E0/I0 to E1/I1.

