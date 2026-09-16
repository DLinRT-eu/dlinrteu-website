# LLM Inference Platforms revision

## Goal

Apply the same inclusion rule as the Model Zoos: an entry is listed only if it can serve **many different models**, not a single one. Add the rule to the page and complete the section, which currently holds just two entries.

## Rule to state on the page

Only engines and frameworks that can host multiple open models are listed. Single-model services or hosted assistants tied to one model do not belong here.

## Current entries — both qualify, keep

| Entry | Why it qualifies |
| --- | --- |
| vLLM | Serving engine supporting 50+ model architectures |
| Ollama | Local runner with a large model library |

Both need a verification date added (neither has one today), so the cards show when the claims were last checked.

## Entries to add (all multi-model)

| Entry | What it is |
| --- | --- |
| Hugging Face Text Generation Inference (TGI) | Production serving engine for a wide range of open models |
| llama.cpp | Portable CPU/GPU inference for the GGUF model ecosystem |
| LM Studio | Desktop application to download and run many open models locally |
| SGLang | High-throughput serving runtime for open LLMs and vision-language models |
| NVIDIA NIM | Containerised inference microservices across a catalogue of models |

Each entry gets name, organisation, website, status, tags, features, access terms and a verification date, with the description limited to what the project's own documentation states. No performance claims beyond what the vendor or project documents.

## Result

Section grows from 2 to 7 entries, every one a multi-model host, with the inclusion rule visible.

## Technical notes

- Add the entries to `src/data/initiatives/llmplatforms.ts` using the existing `Initiative` shape; set `lastVerified: "2026-09-16"` on all entries including the two existing ones.
- Pass a `description` to the LLM Inference Platforms `CategorySection` in `src/components/initiatives/InitiativesCategorySections.tsx` (the prop already exists after the Model Zoo change).
- Verify with `npx tsgo --noEmit -p tsconfig.app.json` and load `/initiatives`.

## Open point

If you would rather keep this section deliberately short (only the two most widely used engines), say so and I will add the rule and the verification dates only, skipping the five additions.
