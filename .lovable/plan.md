## ESTRO 2026 announcement triage

ESTRO 2026 runs 15–19 May in Stockholm. I checked the web for vendor press releases relevant to products already in the catalogue.

### What I found

**GE HealthCare (press release, 12 May 2026)** — confirmed via FT/BusinessWire/gehealthcare.com. Showcases at booth C10:59:
- **iRT** (already in catalogue: `platform/ge-healthcare.ts`) — new "iRT MR Direct" workflow bundling iRT + MR Contour DL + Spectronic MRI Planner. New early adopter: University of Debrecen. New customer evidence: InstaPlan study (iRT + RayStation), simulation-to-plan reduced from 7 days to 7 minutes (n=20).
- **iRT for Theranostics** — new, "Technology in development. Not for sale. Not cleared." → candidate for `pipeline` category.
- **MIM LesionID Pro**, **MIM Contour ProtégéAI+** (already: `auto-contouring/mim-software.ts`), **MIM SurePlan MRT** — MIM updates highlighted.
- **MR Contour DL** (already: `auto-contouring/ge-mr-contour-dl.ts`) — re-emphasised, head & neck + pelvis OARs.
- **MRI Planner / Spectronic** (already: `image-synthesis/spectronic.ts`) — re-emphasised; expanded sites (brain, head & neck, pelvis).
- bk3000/bkFusion/bkActiv/PVA — image-guided interventions, **out of scope** (not RT planning/delivery AI).

**TheraPanacea (press release, 16 April 2026)** — 16 abstracts accepted at ESTRO 2026, partners include Gustave Roussy, Institut Curie, Centre Léon Bérard, CHU Nîmes, Penn Medicine. No new product launches; reinforces evidence base for existing Annotate / Adapt / Plan products (`auto-contouring/therapanacea.ts` and related).

**Philips** — I could not locate a Philips ESTRO 2026 press release explicitly mentioning a "4D MRI for RT" product. Closest finds:
- Titanion ultra-high-gradient MRI (11 May 2026) — research / whole-body biomarkers, not RT-specific.
- ASTRO 2025 announcement of BlueSeal RT 1.5T 70cm + SmartSpeed Precise + Rembra RT / Areta RT (Sept 2025). Rembra/Areta RT include 4D-CT capabilities; BlueSeal RT is the RT MRI platform.
- Could you share the link or product name you saw? Otherwise I'll proceed without a Philips-specific update.

### Plan

1. **Add a news entry** `src/data/news/estro-2026-announcements.ts` summarising vendor activity at ESTRO 2026 (GE HealthCare, TheraPanacea, Philips if confirmed), neutral tone per design-neutrality rule (no celebratory badges). Register in `src/data/news.ts`.

2. **Update `platform/ge-healthcare.ts` (iRT)**:
   - Add evidence entry: InstaPlan / RayStation 7-day→7-min study (n=20) with link to GE press release.
   - Add Debrecen University as deployment reference in `market` notes.
   - Mention MR Direct bundle in `keyFeatures` / `technology.integration` (links iRT ↔ MR Contour DL ↔ Spectronic MRI Planner).
   - Bump `lastRevised` to 2026-05-14, add ESTRO 2026 press release to `source`.

3. **Add new pipeline product** `src/data/products/pipeline/ge-irt-theranostics.ts` for **iRT for Theranostics** (explicitly "in development, not cleared"). Register in `pipeline/index.ts`. Category: Platform; tags: theranostics workflow orchestration.

4. **Light updates to**:
   - `auto-contouring/ge-mr-contour-dl.ts` — confirm head & neck + pelvis coverage in `anatomicalLocation` / `keyFeatures`; add ESTRO 2026 press release to `source`; bump `lastRevised`.
   - `image-synthesis/spectronic.ts` (MRIplanner) — confirm brain / H&N / pelvis sites; add MR Direct integration note; bump `lastRevised`.
   - `auto-contouring/mim-software.ts` (Contour ProtégéAI+) — add ESTRO 2026 reference to `source`; bump `lastRevised`. (No product spec change — already documented as zero-click AI contouring.)

5. **TheraPanacea** — no product changes (no new product/clearance announced). Optionally cite the 16-abstract press release in the news entry only; do not inject into individual product `evidence[]` until concrete abstract DOIs are published post-congress.

6. **Out of scope** (per project rules):
   - MIM LesionID Pro / SurePlan MRT — nuclear medicine / theranostics dosimetry, not radiotherapy AI per inclusion criteria. Will skip unless you want them tracked.
   - bk3000 / bkFusion / bkActiv / PVA — interventional ultrasound, not RT.
   - Philips Titanion — diagnostic MRI, not RT-specific.

### Questions before I implement

1. Do you have the Philips ESTRO 2026 link / product name (the "4D MRI for RT")? Without it I'll skip Philips updates.
2. Should I add **iRT for Theranostics** to the pipeline category despite theranostics being adjacent to (not strictly) radiotherapy AI? It is workflow orchestration that includes RT-style planning, so I'd lean yes.
3. Should I include MIM LesionID Pro / SurePlan MRT (theranostics dosimetry) — currently excluded by the radiotherapy-only inclusion rule?
