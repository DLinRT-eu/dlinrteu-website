## Goal

Reflect what the Synaptiq team communicated at their ESTRO 2026 booth in three places:
1. The ESTRO 2026 news item (Tier-2 section + a new Synaptiq sub-section).
2. The active Synaptiq Mediq RT product entry (regulatory status flip to CE-cleared, including GTV).
3. A new pipeline entry for the Synaptiq 4D CT capability (research module, no public documentation yet).

All edits stay within `src/data/products/**` and `src/data/news/estro-2026-announcements.ts`. No UI, schema or DB changes.

## Source caveat (please confirm)

The information comes from a verbal booth conversation, not a vendor press release, model card or notified-body posting. Under the [product inclusion criteria](mem://policy/product-inclusion-criteria) and Minimal-Intervention policy, I will:
- cite the source as "Vendor communication at Synaptiq booth, ESTRO 2026 (Stockholm, 15–19 May 2026)",
- keep evidence/impact/readiness scores unchanged (booth info does not move E/I/R), and
- add a clear caveat on the news entry and on the product `source` / `limitations` fields that the CE-clearance details have not yet been independently verified against the EUDAMED listing or a vendor press release.

If you have a CE certificate number, notified body, EUDAMED UDI-DI or a vendor press release URL, send it over and I will swap the placeholder source for the verifiable citation.

## Edits

### 1. `src/data/products/auto-contouring/synaptiq.ts` (Mediq RT)

- `certification`: `"Pending"` → `"CE"`.
- `description`: drop the "Currently in clinical testing phase (Investigation use only - not yet CE/FDA certified)" sentence; replace with a sentence stating CE clearance per booth communication at ESTRO 2026, including the GTV delineation feature.
- `regulatory.ce.status`: `"under_review"` → `"cleared"`. Keep `class: "IIa"`, `type: "Medical Device"`. Add `notes: "CE clearance reported by vendor at the ESTRO 2026 booth, including GTV delineation. Pending independent verification against EUDAMED."`.
- `regulatory.intendedUseStatement`: drop "For investigation use only … Not approved for clinical use" and replace with a neutral CE-cleared statement covering OAR + GTV auto-segmentation in radiotherapy planning, qualified by the booth-communication caveat.
- `limitations`: remove "Investigation use only — not approved for clinical use"; add "CE clearance details reported via vendor booth communication at ESTRO 2026; awaiting verification against EUDAMED listing or vendor press release."
- `lastRevised`: `"2026-05-20"` → today's date (kept at 2026-05-20 since that is today).
- `source`: append "Vendor communication at Synaptiq booth, ESTRO 2026 (Stockholm, 15–19 May 2026): CE clearance reported, including for the Active Contouring GTV delineation feature."
- No changes to `supportedStructures`, `evidence`, `evidenceRigor`, `clinicalImpact`, `adoptionReadiness`, or scores.

### 2. New pipeline product `src/data/products/pipeline/synaptiq.ts`

A single `SYNAPTIQ_PIPELINE_PRODUCTS` entry mirroring the shape of `pipeline/united-imaging.ts`:

- `id`: `"synaptiq-mediq-rt-4dct-pipeline"`
- `name`: `"Mediq RT — 4D CT (Research Module)"`
- `company`: `"Synaptiq"`, `companyUrl`, `productUrl` from existing entry.
- `category`: `"Auto-Contouring"`; `secondaryCategories`: `["Tracking"]` (4D CT supports motion-management workflows; conservative classification, please confirm if you prefer otherwise).
- `certification`: `"Pipeline"`; `developmentStage`: `"pipeline"`.
- `usesAI: true`.
- `description`: explains that 4D CT auto-contouring is offered as an option inside a research module of Mediq RT, not for clinical use, per booth communication at ESTRO 2026.
- `keyFeatures`: research-module 4D CT auto-contouring; phase-resolved structure propagation; investigational-only.
- `limitations`: research module only; not CE/FDA cleared; no public model card or independent validation.
- E0 / I0 / R0 with the standard pre-market notes.
- `source`: same booth-communication citation as above.
- `lastRevised: "2026-05-20"`.

Then update `src/data/products/pipeline/index.ts` to import and spread `SYNAPTIQ_PIPELINE_PRODUCTS`.

### 3. `src/data/news/estro-2026-announcements.ts`

- In the `## TheraPanacea`/`## RaySearch`/`## Accuray`/`## United Imaging` block ordering, insert a new `## Synaptiq` section (placed between Accuray and United Imaging for alphabetical-ish grouping, or at the end of the vendor-specific sections — please confirm placement preference; I will default to placing it after United Imaging if no preference is given). Content:
  - One paragraph: at the Synaptiq booth, the team communicated that Mediq RT has received CE certification, explicitly including the Active Contouring GTV delineation feature. The 4D CT capability is offered as an option inside a research module and is not part of the CE-cleared scope.
  - Catalogue update bullets:
    - `[Synaptiq Mediq RT](/product/synaptiq-mediq-rt)` — regulatory status updated from "under review" to CE-cleared (IIa), including GTV delineation; awaiting EUDAMED / press-release verification.
    - `[Synaptiq Mediq RT — 4D CT (Research Module)](/products/pipeline)` — added as a new pipeline entry (E0 / I0 / R0) reflecting the research-module status.
  - Neutrality caveat: information sourced from booth communication, not a vendor press release; entries will be updated once an authoritative source is available.

- In the **Tier 2** bullet at the bottom of "Full post-ESTRO audit", remove "Synaptiq" from the list of vendors with no new disclosure (since they now have one).

- Update the news entry's `summary` to add Synaptiq alongside the other vendors mentioned. `date` left at `2026-05-14` to preserve URL/SEO; post-congress addendum carries 2026-05-20.

## Out of scope

- No edits to `src/data/companies/**` (Synaptiq is already listed).
- No changes to `evidenceRigor` / `clinicalImpact` / `adoptionReadiness` for the active entry.
- No new structures, no new modality, no schema or migration work.
- No edge-function or UI changes.
