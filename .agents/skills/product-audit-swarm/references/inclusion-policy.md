# Inclusion Policy

Authoritative sources: `mem://policy/product-inclusion-criteria`,
`mem://constraints/ai-dl-technology-threshold`, and the
[`/about` page on dlinrt.eu](https://dlinrt.eu/about).

A product belongs in the catalogue if **all** of the following hold:

1. It uses machine learning / deep learning for at least one core function.
   Classical image processing (rule-based filters, atlas-only registration,
   thresholding, region-growing, deformable models without ML) does not
   qualify on its own.
2. It is used in radiotherapy: simulation, contouring, planning, dose
   calculation, registration, tracking, image enhancement/synthesis,
   plan/QA monitoring, or clinical prediction in an RT context.
3. The vendor or an independent source has disclosed enough information to
   describe the AI/DL component (intended use + indication is the minimum
   bar; a model card or training-data description is preferred).

## Exclusions

- General radiology AI with no documented RT workflow integration.
- Hardware platforms (linacs, MR-linacs, CT simulators, MR simulators,
  PET/CT simulators) whose public announcements do not isolate an AI/DL
  component for RT. Watchlist them in news, do not create catalogue
  entries.
- Generic QA / monitoring tools that do not themselves use AI/DL **and**
  do not monitor AI products. QA tools that monitor AI products are
  included with `usesAI: false` and `monitorsAIProducts: true` per
  `mem://data/product-classification-v2`.
- Pre-market technology disclosures without intended use, training-data
  description, or regulatory status — admit only to the Pipeline hub per
  `mem://features/pipeline-products-dedicated-hub`.

## Edge cases

- **System-integrated AI** (e.g. auto-contouring built into a linac):
  include as a catalogue entry tied to the system-level CE/FDA marking.
  Flag in the Regulatory role that the marking is system-level, not
  standalone.
- **Open-source models with no commercial vendor**: include only when a
  named organisation maintains the model and there is a clear RT
  indication.
- **Research prototypes** without regulatory disclosure: route to the
  Pipeline hub; never to the main catalogue.

## Inclusion-role finding shape

- `error` — classical-only product currently in the catalogue, or
  hardware-only entry with no AI/DL component documented.
- `warn` — AI/DL component plausible but not documented; ask for
  vendor model-card link before clearing.
- `info` — entry passes the gates; note any caveats inline.
