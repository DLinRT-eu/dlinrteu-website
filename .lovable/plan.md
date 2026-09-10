# Nalvera.AI: list as a Model Zoo initiative, clarify Platform + research-only scope

## Assessment

Nalvera.AI is a cloud service that runs existing open research models on medical imaging data
(EU-hosted GPUs, no local install). Its public model catalogue currently exposes TotalSegmentator CT
(117 structures) and MR (50), MOOSE v3 Clinical, MuscleMap MRI, MAISI-v2 generative CT/MR and Merlin
(abdominal CT vision-language). Explicitly research use only, with no CE/FDA/MDR route.

Against the current criteria it is not a catalogue product: the AI models are third-party open models
it hosts, not a vendor's own radiotherapy tool, and none of the tasks is a radiotherapy clinical
function delivered by Nalvera itself. It is also not a "Platform" in our sense — that term is reserved
for vendor ecosystems bundling several clinical AI tasks behind one deployment layer.

It does fit **Research Initiatives → Model Zoo**, next to MHub.ai, MONAI Model Zoo and NVIDIA Clara.

## 1. Add Nalvera.AI to Research Initiatives (Model Zoo)

New entry in `src/data/initiatives/modelzoo.ts`:

- Name Nalvera.AI, organization Nalvera (Belgium), category Model Zoo, status Active,
  website https://nalvera.ai, `lastVerified` set to today.
- Description: managed cloud inference for peer-reviewed and in-house medical imaging AI models;
  researchers upload a scan, pick a model, get reproducible results without local GPU/CUDA setup.
- Features: hosted catalogue of open models (TotalSegmentator CT/MR, MOOSE v3, MuscleMap, MAISI-v2,
  Merlin), per-model model cards, EU-hosted GPU cluster, private model sharing between teams under a
  data processing agreement.
- `dataAccess`: commercial subscription with credits; research use only, not a medical device
  (no CE/FDA/MDR clearance) — stated plainly so the non-clinical status is visible.
- Tags: Segmentation, CT, MRI, Synthetic Imaging, Cloud Inference, Commercial.
- Logo added only if provided by the vendor; otherwise omitted.

## 2. Publish the Platform definition where it is needed

The Platform definition already exists in the Resources glossary but is not visible where people
decide whether they qualify. Add it to the inclusion-criteria panel on `/products`:

> **Platform:** vendor ecosystems that bundle several AI tasks — contouring, planning, adaptive
> workflows, analytics — behind one deployment, orchestration and integration layer, rather than
> addressing one isolated clinical task.

## 3. State how research-only tools are handled

Add one line to the same inclusion panel and mirror it in the Resources page scope box:

> Regulatory clearance is not required for listing, but the product must perform a radiotherapy
> clinical task itself. Research-only services that host or serve third-party open models are listed
> under Research Initiatives (Model Zoo) instead of the product catalogue.

## 4. Reply to send

> Hi Brent, hi Ana,
>
> Thanks for the detailed context. Certification really is not a requirement for DLinRT — we record it,
> we do not gate on it. The line we do draw is different: a catalogue entry has to perform a
> radiotherapy task itself, from the list of tasks in the filter menu, and "Platform" in our taxonomy
> means a vendor ecosystem bundling several of those clinical tasks behind one deployment and
> integration layer (Workspace+, ART-Plan+ and similar). Nalvera is something else and, I think,
> something we should still show: it makes existing open models runnable without a GPU, and the models
> it serves today (TotalSegmentator CT/MR, MOOSE v3, MuscleMap, MAISI-v2, Merlin) are other groups'
> models rather than Nalvera's own clinical tools.
>
> So our proposal is to list Nalvera.AI under Research Initiatives as a Model Zoo, alongside MHub.ai,
> the MONAI Model Zoo and NVIDIA Clara, clearly marked as a commercial, research-only service with no
> CE/FDA/MDR claim. That gives the visibility you are after without implying clinical status.
>
> If Nalvera later serves radiotherapy-specific models of its own — auto-contouring, synthesis or
> planning — those become candidates for the product catalogue on their own merits, certified or not.
> Happy to revisit then. Could you confirm the wording and send a logo we can use?

## Technical notes

- Files: `src/data/initiatives/modelzoo.ts` (new entry), `src/pages/Products.tsx` (inclusion panel
  text), `src/pages/ResourcesCompliance.tsx` (scope box line). Glossary text stays the single source
  for the Platform wording.
- Product data, filters and scoring logic are untouched; no new initiative category is introduced.
- Verification: typecheck, then load `/initiatives` filtered on Model Zoo and `/products#inclusion-criteria`.
