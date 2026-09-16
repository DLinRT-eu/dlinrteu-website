# Add Nalvera.AI to Research Initiatives (Model Zoo)

Following the earlier assessment, Nalvera.AI is listed as a Model Zoo entry, not a catalogue
product: it hosts third-party open models and is explicitly research use only, with no
CE/FDA/MDR claim.

## What gets added

One new entry in the Model Zoo list, appearing on the Initiatives page next to MHub.ai,
MONAI Model Zoo and NVIDIA Clara:

- Name: Nalvera.AI, organization Nalvera (Belgium), status Active, website https://nalvera.ai
- Description: managed cloud inference for medical imaging AI models — upload a scan, pick a
  model, get reproducible results without a local GPU setup.
- Features: hosted catalogue of open models (TotalSegmentator CT/MR, MOOSE v3 Clinical,
  MuscleMap MRI, MAISI-v2, Merlin), per-model model cards, EU-hosted GPU compute, private
  model sharing between teams.
- Access: commercial subscription with credits; research use only, not a medical device
  (no CE/FDA/MDR clearance) — stated plainly so the non-clinical status is visible.
- Tags: Segmentation, CT, MRI, Synthetic Imaging, Cloud Inference, Commercial.
- `lastVerified` set to the implementation date; no logo unless the vendor supplies one.

Every claim above traces to the Nalvera public website and model catalogue, verified on the
implementation date. Nothing is added that the site does not state.

## Technical notes

- Single file change: new entry in `src/data/initiatives/modelzoo.ts` (existing `Initiative`
  type, no schema change, no new category).
- Product catalogue data, filters and scoring logic are untouched.
- Verification: typecheck, then load `/initiatives` filtered on Model Zoo.

## Not included

The inclusion-criteria wording changes discussed earlier (Platform definition on `/products`,
research-only handling note) are left out of this change; say the word if you want them too.
