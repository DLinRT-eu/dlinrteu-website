## Plan: Revise Mediq RT (Synaptiq) with vendor-supplied structures and guidelines

The vendor PDF ("OAR & LN - Synaptiq.pdf") provides the verbatim, authoritative structure catalogue (CT OARs/LNs and MRI OARs) and the consensus guidelines used to train each anatomical model. This lets us replace our approximated `supportedStructures` list and add a proper `guidelines` block.

### Scope
Single file: `src/data/products/auto-contouring/synaptiq.ts` (Mediq RT product).

### Changes

1. **Replace `supportedStructures` (lines 142–382)** with the verbatim vendor catalogue, formatted per project convention `"Region: Structure Name"`.
   - Remove the speculative comment block on lines 142–147 and all `(unverified)` markers.
   - Use the regions exactly as the vendor groups them:
     - `Head & Neck (CT)` — 38 OARs
     - `Head & Neck LN (CT)` — 30 nodal levels (Ia–Xb)
     - `Thorax (CT)` — ~37 OARs incl. cardiac substructures, breast, ribs, sternum, subclavian/internal thoracic vessels
     - `Breast (ESTRO CT)` — Breast_L/R
     - `Thorax LN (CT)` — IMN + axillary L1–L3 + supraclav L4 (10)
     - `Breast LN ESTRO (CT)` — IMN_IC4, IMN, Ax L1–L3, Sclav L4, Ax_L/R, Interpectoral (16)
     - `Abdomen (CT)` — 25 OARs (adrenals, aorta, bowel bag, bowels, sigmoid, duodenum, gallbladder, iliopsoas, IVC, kidneys, large bowel, liver, pancreas, portal vein, small bowel, spleen, spinal canal/cord, stomach, VB_All/C/L/T)
     - `Pelvis Male (CT)` — 16 (bladder, cauda equina, anal canal, femur heads, gluteus, iliac A/V, penile bulb, prostate, rectum, sacrum, seminal vesicles)
     - `Pelvis Female (CT)` — 14 (same minus prostate/penile bulb/seminal ves + uterus)
     - `Pelvis LN (CT)` — 9 (iliac, iliac ext/int, obturator L/R, presacral, paraaortic)
     - `Brain (MRI)` — 38 (deep-brain substructures incl. amygdala, accumbens, caudate, hippocampus, hypothalamus, optic tract, putamen, thalamus, corpus callosum, etc.)
     - `Thorax (MRI)` — 10
     - `Abdomen (MRI)` — 18
     - `Pelvis (MRI)` — 11
   - Names kept verbatim from vendor (e.g. `LN_Neck_Ia`, `Glnd_Submand_L`, `Musc_Iliopsoas_L`, `VB_All`) — no renaming to peer vocabularies. This will slightly shift comparability in the compare-structures matrix, which is acceptable since the source is authoritative.

2. **Add `guidelines` field** with the consensus papers from page 4–5 of the PDF, using the existing `guidelines` schema (name/version/reference/url/compliance), e.g.:
   - EPTN Brain consensus atlas 2018 + 2021 update (DOIs)
   - Brouwer et al. 2015 H&N OARs consensus (DOI)
   - Grégoire et al. 2014 H&N nodal levels (DOI)
   - Offersen et al. 2015 ESTRO breast (DOI)
   - Milo et al. 2020 Danish heart substructures (DOI)
   - RADCOMP breast contouring guidelines
   - RTOG thoracic / SABR UK v6.1 (no DOI — reference only)
   - Orton et al. 2022 bowel bag (DOI)
   - Jabbour et al. 2014 RTOG upper abdomen (DOI)
   - Gay et al. 2012 RTOG pelvis (DOI)
   - Salembier et al. 2018 ESTRO ACROP prostate (DOI)
   - Hall et al. 2021 NRG pelvic LN (DOI)
   - De Hertogh et al. 2024 GFRU prostate LN (DOI)
   - Mir et al. 2020 GHG OARs harmonization (DOI)
   - All set with `compliance: "full"` (vendor-declared as training/contouring reference).

3. **Update `source`** to add: "Vendor-supplied structure catalogue and guidelines document 'OAR & LN - Synaptiq.pdf' (2026-06-12)."

4. **Update `lastUpdated`** to `2026-06-12` and `lastRevised` to `2026-06-12`.

5. **Update `modality`**: keep `["CT", "MRI"]` (already correct; MRI brain/thorax/abdomen/pelvis confirmed).

### Out of scope
- No changes to regulatory, evidence, evidenceRigor, market, or any other field.
- No changes to the pipeline 4D CT product.
- No UI/component changes.
- No changes to peer products' structure naming.
