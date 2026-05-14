import { NewsItem } from "@/types/news";

export const estro2026Announcements: NewsItem = {
  id: "estro-2026-announcements",
  date: "2026-05-14",
  title: "ESTRO 2026: Vendor Announcements and Catalogue Updates",
  summary:
    "Round-up of AI/DL-relevant announcements ahead of ESTRO 2026 (Stockholm, 15–19 May) from GE HealthCare, TheraPanacea, MIM Software, Spectronic Medical, RaySearch and United Imaging, with the corresponding DLinRT.eu catalogue updates.",
  content: `
ESTRO 2026 takes place in Stockholm from 15 to 19 May 2026. Several vendors have published pre-congress announcements relevant to AI in radiotherapy. Below is a neutral summary of the items that affect products already tracked in the DLinRT.eu catalogue, along with the corresponding entry updates. Per the [product inclusion criteria](/about), only announcements with a clear AI/deep-learning component for radiotherapy are listed.

## GE HealthCare

GE HealthCare published an [ESTRO 2026 press release](https://www.gehealthcare.com/en-us/about/newsroom/press-releases/estro-2026-congress--ge-healthcare-to-spotlight-ai-enabled-solutions-to-advance-precision-care-across-radiation-therapy-and-image-guided-interventions) (12 May 2026) covering its radiation oncology and image-guided portfolio at booth C10:59.

Highlights tracked in the catalogue:

- **Intelligent Radiation Therapy (iRT)** — a new bundled workflow, **iRT MR Direct**, links iRT with **MR Contour DL** (GE) and **MRI Planner** (Spectronic Medical, a GE HealthCare company) for MR-only planning across brain, head & neck and pelvis. GE also reports an InstaPlan study (iRT + RayStation) showing a reduction of simulation-to-treatment-plan time from seven days to seven minutes across 20 patients, and adoption at the University of Debrecen.
- **iRT for Theranostics** — explicitly described as "technology in development. Not for sale. Not cleared or approved." Added to the [pipeline products](/products/pipeline) hub.
- **MR Contour DL**, **MRI Planner (Spectronic)** and **MIM Contour ProtégéAI+** entries refreshed with the ESTRO 2026 reference.

## TheraPanacea

TheraPanacea announced [16 accepted abstracts](https://www.therapanacea.eu/our-scientific-work-at-estro-2026/) for ESTRO 2026, developed with Gustave Roussy, Institut Curie, Centre Léon Bérard, CHU Nîmes and Penn Medicine. The work spans auto-segmentation, adaptive radiotherapy with AI-generated synthetic CT, automated treatment planning (prostate, breast, head & neck) and emerging dose-modelling approaches. No new product launches were announced; individual product evidence entries will be updated once the abstracts have stable DOIs after the congress.

## RaySearch Laboratories

RaySearch [announced via LinkedIn](https://www.linkedin.com/posts/raysearch-laboratories_estro2026-c14-raysearch-activity-7460349093698138112-u-RD) that the upcoming **RayStation** release will close the last remaining gap in its **Deep Learning Segmentation (DLS)** CT portfolio with a **Female Pelvis** model. The vendor reports a full CT body coverage of 231 structures, with 192 ROIs contoured in 59 seconds in their demonstration. The Female Pelvis model is explicitly flagged as "investigational, not CE-marked or FDA-cleared, and not available for clinical use." RaySearch will be at booth C14:45.

The DLinRT.eu [RayStation Deep Learning Segmentation entry](/product/raysearch-raystation) will be updated once the release is publicly available and the Female Pelvis structures are documented; until then the model is tracked here as a pre-announcement only and is not added to the supported-structures list.

## United Imaging

United Imaging published an [ESTRO 2026 microsite](https://estro-united-imaging-healthcare-europe.framer.ai/) marking the European debut of its uRT® radiotherapy portfolio at booth C16:41, with a portfolio reveal on Friday 15 May 19:18–19:25 CEST. The vendor describes an "AI-driven software ecosystem" integrated across the workflow.

The single AI/DL-specific component disclosed in the public material is the **Deep Learning Full-FOV reconstruction** on the **uCT 610 Sim** (87 cm ultra-wide-bore CT simulator, listed as "under development; not for sale or clinical use, not yet available in Europe"). Other portfolio items announced for ESTRO 2026 — uRT®-linac 506c, uLinac HalosTx, uMR® Omega 3T MR simulator, uMI® Panorama PET/CT simulator — are hardware platforms; their public announcements do not currently isolate an AI/DL component for radiotherapy and therefore fall outside the DLinRT.eu inclusion criteria. A catalogue entry for the uCT 610 Sim DL reconstruction (and any other uRT® AI software) will be created once vendor documentation describing the model, training data and intended use is published.

---

If you spot another ESTRO 2026 announcement that should trigger a catalogue update, please [contact us](/support).
`,
};
