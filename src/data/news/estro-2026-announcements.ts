import { NewsItem } from "@/types/news";

export const estro2026Announcements: NewsItem = {
  id: "estro-2026-announcements",
  date: "2026-05-14",
  title: "ESTRO 2026: Vendor Announcements and Catalogue Updates",
  summary:
    "Round-up of AI-relevant announcements ahead of ESTRO 2026 (Stockholm, 15–19 May) from GE HealthCare, TheraPanacea, MIM Software, Spectronic Medical, Philips and RaySearch, with the corresponding DLinRT.eu catalogue updates and a brief note on announced non-AI innovations.",
  content: `
ESTRO 2026 takes place in Stockholm from 15 to 19 May 2026. Several vendors have published pre-congress announcements relevant to AI in radiotherapy. Below is a neutral summary of the items that affect products already tracked in the DLinRT.eu catalogue, along with the corresponding entry updates.

## GE HealthCare

GE HealthCare published an [ESTRO 2026 press release](https://www.gehealthcare.com/en-us/about/newsroom/press-releases/estro-2026-congress--ge-healthcare-to-spotlight-ai-enabled-solutions-to-advance-precision-care-across-radiation-therapy-and-image-guided-interventions) (12 May 2026) covering its radiation oncology and image-guided portfolio at booth C10:59.

Highlights tracked in the catalogue:

- **Intelligent Radiation Therapy (iRT)** — a new bundled workflow, **iRT MR Direct**, links iRT with **MR Contour DL** (GE) and **MRI Planner** (Spectronic Medical, a GE HealthCare company) for MR-only planning across brain, head & neck and pelvis. GE also reports an InstaPlan study (iRT + RayStation) showing a reduction of simulation-to-treatment-plan time from seven days to seven minutes across 20 patients, and adoption at the University of Debrecen.
- **iRT for Theranostics** — explicitly described as "technology in development. Not for sale. Not cleared or approved." Added to the [pipeline products](/products/pipeline) hub.
- **MR Contour DL**, **MRI Planner (Spectronic)** and **MIM Contour ProtégéAI+** entries refreshed with the ESTRO 2026 reference.

Out of scope for the catalogue (per the AI-in-radiotherapy inclusion criteria): MIM LesionID Pro and MIM SurePlan MRT (theranostics dosimetry / nuclear medicine), and the bk3000 / bkFusion / bkActiv / Prostate Volume Assist interventional ultrasound products.

## TheraPanacea

TheraPanacea announced [16 accepted abstracts](https://www.therapanacea.eu/our-scientific-work-at-estro-2026/) for ESTRO 2026, developed with Gustave Roussy, Institut Curie, Centre Léon Bérard, CHU Nîmes and Penn Medicine. The work spans auto-segmentation, adaptive radiotherapy with AI-generated synthetic CT, automated treatment planning (prostate, breast, head & neck) and emerging dose-modelling approaches. No new product launches were announced; individual product evidence entries will be updated once the abstracts have stable DOIs after the congress.

## Philips

Philips has [pre-announced the global introduction of 4D MR-RT](https://www.linkedin.com/posts/sallywjlin_join-us-for-the-global-introduction-of-philips-ugcPost-7460615611283472384-f_zs) at ESTRO 2026 (live introduction Saturday 16 May, 10:10 CET, booth C13:61). At the time of writing, the public teaser does not disclose technical specifications, regulatory status, or whether the offering includes an AI/DL component. Per the catalogue's AI-in-radiotherapy inclusion criteria, no product entry is created yet; we will revisit Philips' MR-RT entries (Ingenia MR-RT auto-contouring, MRCAT brain/head & neck/pelvis) once a formal Philips press release or product page is published.

Other recent Philips items: the [Titanion ultra-high-gradient MRI](https://www.philips.com/a-w/about/news/archive/standard/news/press/2026/philips-titanion-mr-expands-ultra-high-gradient-mri-beyond-anatomical-and-functional-imaging-toward-whole-body-quantitative-biomarkers.html) (11 May 2026, diagnostic — not RT-specific) and the ASTRO 2025 launch of BlueSeal RT 1.5T 70cm with SmartSpeed Precise plus the Rembra RT and Areta RT CT platforms (which include 4D-CT capabilities).

## RaySearch Laboratories

RaySearch [announced via LinkedIn](https://www.linkedin.com/posts/raysearch-laboratories_estro2026-c14-raysearch-activity-7460349093698138112-u-RD) that the upcoming **RayStation** release will close the last remaining gap in its **Deep Learning Segmentation (DLS)** CT portfolio with a **Female Pelvis** model. The vendor reports a full CT body coverage of 231 structures, with 192 ROIs contoured in 59 seconds in their demonstration. The Female Pelvis model is explicitly flagged as "investigational, not CE-marked or FDA-cleared, and not available for clinical use." RaySearch will be at booth C14:45.

The DLinRT.eu [RayStation Deep Learning Segmentation entry](/product/raysearch-raystation) will be updated once the release is publicly available and the Female Pelvis structures are documented; until then the model is tracked here as a pre-announcement only and is not added to the supported-structures list.

---

## Announced non-AI innovations (informational only)

The following items were announced for ESTRO 2026 but fall outside the DLinRT.eu inclusion criteria (AI/deep-learning for radiotherapy). They are listed here for completeness and are **not** added to the catalogue.

- **Philips — 4D MR-RT** (global introduction, 16 May, booth C13:61). The teaser does not currently describe an AI/DL component; if the formal launch confirms one, a catalogue entry will follow.
- **GE HealthCare — bk3000 / bkFusion / bkActiv / Prostate Volume Assist** (interventional ultrasound for prostate biopsy/brachytherapy guidance) — outside the radiotherapy planning/delivery AI scope.
- **MIM Software — LesionID Pro and SurePlan MRT** — theranostics dosimetry / nuclear medicine, outside the radiotherapy scope.
- **Philips — Titanion** ultra-high-gradient MRI (11 May 2026) — diagnostic imaging, not RT-specific.

---

If you spot another ESTRO 2026 announcement that should trigger a catalogue update, please [contact us](/support).
`,
};
