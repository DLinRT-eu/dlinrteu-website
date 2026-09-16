# Model Zoo inclusion clean-up

## Goal

The Model Zoo list should only contain collections of multiple models (hubs, zoos, libraries, catalogues). Individual models — even excellent ones — do not belong there, and entries outside radiotherapy relevance should also go.

## Inclusion rule to apply

An entry qualifies as a Model Zoo when it offers **more than one distinct model** through a shared hub, catalogue, toolkit or platform, **and** at least part of it is applicable to radiotherapy imaging or planning tasks.

## Keep (collections)

| Entry | Why it qualifies |
| --- | --- |
| MHub.ai | Curated multi-model hub |
| Nalvera.AI | Hosted catalogue of several third-party models |
| MONAI Model Zoo | Framework-wide model collection |
| NVIDIA Clara Medical (Open Models) | Collection of segmentation/generation models |
| MSHub | Collection of pre-trained nnU-Net models |
| TotalSegmentator | 30+ task models, 100+ structures |
| Hugging Face Medical Models | Large model ecosystem |
| RadImageNet | Multiple pre-trained backbones (ResNet, DenseNet, InceptionV3) |
| Grand Challenge Algorithms | Library of submitted algorithms |
| platipy | Toolkit with several RT auto-segmentation models |

## Remove (single models, or out of scope)

| Entry | Reason |
| --- | --- |
| MedSAM | One foundation model, not a collection |
| BiomedParse | One model |
| STU-Net | One model (size variants of the same architecture) |
| LLaVA-Med | One vision-language model; no radiotherapy task |
| CheXagent | One chest X-ray model; outside radiotherapy scope |
| BioGPT / PubMedBERT / RadBERT | Text models, no radiotherapy imaging or planning task |

Result: 17 entries reduced to 10, all genuine multi-model collections.

## Also

Make the rule visible on the page, so future additions follow it: add one short sentence under the Model Zoos heading stating that only collections of multiple models are listed.

## Technical notes

- Edit `src/data/initiatives/modelzoo.ts`: delete the six entries above; keep the remaining ten unchanged.
- No type, filter or sorting changes needed — tags and category filter options are derived from the data.
- Add the one-line scope note in `src/components/initiatives/CategorySection.tsx` (optional description prop) or directly in `InitiativesCategorySections.tsx` for the Model Zoos section only.
- Verify with `npx tsgo --noEmit -p tsconfig.app.json` and load `/initiatives`.

## Open point

If you would rather **not lose** the six single models entirely, the alternative is a separate "Foundation Models" category on the same page instead of deleting them. Say which you prefer; the plan above deletes them.
