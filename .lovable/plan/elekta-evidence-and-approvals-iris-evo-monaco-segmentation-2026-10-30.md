# Elekta evidence and approvals: IRIS Evo + Monaco Segmentation

## What I found (checked today)

**The IRIS paper you sent**
Keeler A, Mason J, Joyce T, Paulson ES, Awan MJ, Shukla ME, Omari EA. "Quantitative Hounsfield Unit and Dose Calculation Accuracy of Iris CBCT for Head and Neck Radiotherapy." Int J Radiat Oncol Biol Phys 2026;126(1):e471. DOI 10.1016/j.ijrobp.2026.06.1689 (checked against Crossref).
- It's a conference abstract (ASTRO 2026 supplement), not a full paper.
- The study used five head-and-neck patients, reconstructed on a research imaging system, not the cleared product.
- Results: soft-tissue HU error dropped from 110–265 to 20–38 HU, and bone from 285 to 62 HU. Dose gamma pass rate rose from 58% to 99.4% (3%/2 mm).
- The authors have two affiliations. J. Mason is the Polyquant method's author, so this is probably vendor co-authored; I couldn't see the affiliation names.
- Head and neck is outside the cleared use, which is pelvis only.

**FDA (510(k) database)**
- IRIS: cleared under K252188 "EMLA (Elekta Evo, Versa HD, Harmony Pro, …)" on **15 Jan 2026**. The site currently says 16 Jan with "K-number not yet published". The summary says: neural-network scatter estimation trained on simulated Monte Carlo data, iterative Polyquant reconstruction, "currently the pelvic anatomies" only. A clinical survey showed a preference for HD.
- Monaco segmentation: cleared under **K252002 "Monaco RTP System (6.3)"** on **19 Feb 2026** (Class II, product code MUJ, 21 CFR 892.5050). The summary names the four models with their training image counts: 529 female pelvis, 250 male pelvis, 1,862 head and neck. It says all structures had an average distance error under 3 mm.

**EU device database (EUDAMED)**
- Elekta Solutions AB (SRN SE-MF-000002125) has 138 devices registered there, all Leksell, Gamma Knife or fixation products. Monaco, Unity, Evo, Versa HD and XVI don't appear under any Elekta manufacturer.
- So there's no EU entry to cite yet. The CE status stays "per Elekta", noting it wasn't found in EUDAMED on 30 Oct 2026. This is common, because EUDAMED device registration isn't yet mandatory for every device.

## Changes

1. **IRIS Evo**
   - Add the Keeler 2026 abstract as a scored paper: E1, L1t. It counts as technical, because it tests image and dose-calculation accuracy. It's marked as a conference abstract on a research system, head and neck (outside the cleared pelvis use), added 2026-10-30 and pending reviewer check.
   - Fix the FDA entry: K252188, decided 2026-01-15, product code IYE. Link the 510(k) summary as a source.
   - Fix the stored overall rigor: it says E1 while the notes argue E0. With this abstract, E1 becomes justified.
2. **Monaco Segmentation**
   - Fill in the FDA entry: K252002, 19 Feb 2026, Class II, MUJ, 21 CFR 892.5050. Add the summary as a public source.
   - Set the release date to 2026-02-19.
   - CE stays "per Elekta (not found in EUDAMED, checked 2026-10-30)".
3. Run the evidence checker and catalogue tests, then open both pages.

Overall levels: IRIS stays E1 and L1t-level. Monaco stays E0 / L1t.
