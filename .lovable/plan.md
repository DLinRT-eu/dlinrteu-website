# Post-ESTRO 2026 Catalogue Audit Plan

## Scope

107 product files across 10 categories. A blind file-by-file rewrite is neither useful nor safe — most entries are unchanged by ESTRO. The audit will be **announcement-driven**: only entries with a verifiable ESTRO 2026 vendor disclosure (or that we know are stale) get touched. Everything else gets a documented "no change required" sign-off in the recap, not a date bump.

## Method

For each vendor with a booth or press release at ESTRO 2026 (Stockholm, 15–19 May), check:
1. New AI/DL product or pipeline disclosure → add entry (respecting inclusion criteria: must isolate AI/DL component, training data and intended use).
2. New regulatory milestone (CE/FDA/TGA/TFDA) → update `regulatory.*`, refresh `lastRevised`.
3. New peer-reviewed evidence or external validation study → update `evidence[]`, possibly recalibrate `evidenceRigor` / `clinicalImpact`.
4. New supported structures / modalities / versions → update fields, suffix with `(investigational)` or `(unverified)` per the structure status convention.
5. Withdrawn / superseded products → mark via `priorVersions` / `supersededBy`.

Out of scope: hardware-only platforms, classical-processing-only tools, redesigns, score recalibration without new evidence.

## Vendors to sweep (priority order)

**Tier 1 — known ESTRO 2026 activity already partially processed**
- GE HealthCare (iRT, MR Contour DL, MRI Planner, MIM Contour ProtégéAI+, iRT for Theranostics pipeline) — verify all five entries reflect the 12 May press release; check for any post-congress addenda.
- TheraPanacea — 16 accepted abstracts; harvest stable DOIs now that the congress is over and append to `evidence[]` on Annotate/ART-Plan/etc.
- RaySearch — DLS Female Pelvis (already added as investigational); confirm full-CT-body 231-structure / 192-ROI / 59-sec demo is reflected in `keyFeatures` or `evidenceRigorNotes`; check RayStation 2024B release notes.
- United Imaging — already processed (auto-contouring, auto-planning, uCT 610 Sim pipeline); spot-check for any post-congress clarifications.
- Spectronic Medical (MRI Planner) — verify ESTRO reference.
- Accuray Synchrony — already refreshed; verify watchlist items (Stellar, PreciseART, Adapt LTE/Cenos) remain excluded with rationale.

**Tier 2 — sweep for ESTRO booth disclosures**
Varian/Siemens Healthineers (Ethos, AI-Rad Companion Organs RT), Elekta (already covered via partners), Philips (auto-contouring, MRCAT), Brainlab (Elements), MIM Software, Mirada (DLCExpert), Limbus AI, MVision AI, Radformation, Manteia, Carina Medical, Coreline Soft, Vysioner, Wisdom Tech, DirectORGANS, Oncosoft, Taiwan Medical Imaging, Hura Imaging, AI Medical, EverFortune, MedMind, Quanta Computer, MedCom, Synaptiq, Sun Nuclear, MD Anderson — for each, check official news / press / LinkedIn for an ESTRO 2026 item and only edit if found.

**Tier 3 — known-stale entries**
Five products still carry 2023-era `lastRevised` values (per `grep` survey): identify them, verify vendor pages, refresh either with current info or mark archived. Will be listed explicitly in the recap.

## Deliverables

1. **Per-vendor diff list** — file paths and one-line summary of each change.
2. **Catalogue updates appended** to `src/data/news/estro-2026-announcements.ts` under a new "Full post-ESTRO audit (Tier 1/2/3)" section, replacing the existing short "Post-ESTRO catalogue updates" block.
3. **No design / schema / RLS / edge-function / docs changes** unless a vendor-specific field is genuinely missing from `ProductDetails` (none expected).
4. **Score recalibration only where new peer-reviewed evidence justifies it**, per the dual-axis rubric in `docs/review/GUIDE.md`. No bulk re-scoring.

## What I will NOT do

- Bump `lastRevised` on entries with no real change.
- Invent supported structures, training-data descriptions, or evidence links.
- Add hardware platforms, monitoring tools without AI, or watchlist items lacking model documentation.
- Refactor UI, components, or the design system.

## Open question for you

The audit is bounded by what vendors have published. Three options for the web-research depth:

- **A. Light** — rely only on press releases already linked from `estro-2026-announcements.ts` plus vendor product pages. Fast, conservative, ~5–10 product edits expected.
- **B. Medium (recommended)** — also search each Tier-1/Tier-2 vendor's newsroom and LinkedIn for an ESTRO 2026 post; harvest TheraPanacea DOIs from the post-congress proceedings. ~15–30 product edits expected.
- **C. Deep** — additionally crawl the ESTRO 2026 abstract book / e-poster site for new external-validation studies on any catalogued product and update `evidence[]` + scores accordingly. Largest scope, may need several iterations.

Tell me A / B / C (or a custom scope) and I'll execute on approval.
