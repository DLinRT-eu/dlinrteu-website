import { NewsItem } from "@/types/news";

export const estro2026Announcements: NewsItem = {
  id: "estro-2026-announcements",
  date: "2026-05-14",
  title: "ESTRO 2026: Vendor Announcements and Catalogue Updates",
  summary:
    "Round-up of AI/DL-relevant announcements ahead of ESTRO 2026 (Stockholm, 15–19 May) from GE HealthCare, TheraPanacea, MIM Software, Spectronic Medical, RaySearch, United Imaging and Synaptiq, with the corresponding DLinRT.eu catalogue updates.",
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

## Accuray®

Accuray®'s [ESTRO 2026 booth presence](https://www.accuray.com/estro/) (booth, theme "Make ARTwork — Adapt with Confidence") centres on its helical delivery and adaptive portfolio, complemented by an [ESTRO Stage session](https://www.accuray.com/estro-stage/) on Monday 18 May at 10:15 dedicated to AI in radiotherapy (clinical performance, legal framework and ethics — an educational session, not a product launch). The European showcase follows the September 2025 [US launch of the Accuray Stellar™ solution](https://investors.accuray.com/news-releases/news-release-details/accuray-launches-all-one-radiotherapy-solution-advanced), a configuration of the Radixact® Treatment Delivery System bundling ClearRT® helical kVCT imaging, PreciseART® offline adaptation, an online-adaptive-ready interface, and Adapt LTE™ powered by Accuray Cenos™ for retrospective plan evaluation.

For the DLinRT.eu catalogue, the only Accuray® product at the booth with an explicitly disclosed AI/DL component for radiotherapy remains **[Synchrony®](/product/accuray-synchrony)** — its patient-specific AI motion model for real-time tracking and correction, available on both the CyberKnife® System and the Radixact® Treatment Delivery System. The entry has been refreshed with an ESTRO 2026 reference.

The other items on the booth — **Accuray Stellar**, **Radixact®**, **Accuray Helix**, **PreciseART**, **Adapt LTE / Cenos**, **ClearRT** — are announced here as platform, hardware or workflow components. Their public material does not currently isolate an AI/DL model, training data or intended use for radiotherapy, so per the [product inclusion criteria](/about) they are not added to the catalogue today. We are explicitly watchlisting **Stellar**, **PreciseART** and **Adapt LTE / Cenos**: catalogue entries will be created (or these announcements revised) as soon as Accuray® publishes documentation describing the AI/DL component, training data and intended use inside these products.


## United Imaging

United Imaging published an [ESTRO 2026 microsite](https://estro-united-imaging-healthcare-europe.framer.ai/) and a [portfolio press release](https://www.prnewswire.com/news-releases/united-imaging-unveils-its-full-radiotherapy-portfolio-at-estro-2026-highlighting-the-ce-marked-urt-linac-506c-302773402.html) marking the European debut of its uRT® radiotherapy portfolio at booth C16:41, with a portfolio reveal on Friday 15 May 19:18–19:25 CEST. The vendor describes an "AI-driven software ecosystem" integrated across imaging, contouring, planning and QA.

AI/DL components now tracked in the catalogue:

- **[uRT Auto-Contouring](/product/united-urt-auto-contouring)** — deep-learning segmentation of whole-body OARs and multiple tumour sites, integrated in the uRT-linac 506c and the uCT-ART online adaptive workflow. CE-marked as a component of the uRT-linac 506c (system-level IIb under MDR). The supported-structures section is rendered as **"structure list unavailable"** because the vendor has not published a verified DICOM-conformant list.
- **[uRT Auto-Planning](/product/united-urt-auto-planning)** — AI-driven auto-planning with GPU-accelerated Monte Carlo dose calculation, powering the ~15-minute uCT-ART online adaptive workflow. CE-marked as a component of the uRT-linac 506c.
- **[uCS-AI](/product/united-ucs-ai)** — existing CE-marked deep-learning CBCT enhancement entry, refreshed with the ESTRO 2026 reference.
- **[uCT 610 Sim — Deep Learning Full-FOV Reconstruction](/products/pipeline)** — added to the pipeline products hub. Explicitly labelled by the vendor as "under development; not for sale or clinical use, not yet available in Europe."

Neutrality caveats apply to all CE-marked entries above: they are integrated components of the system-level uRT-linac 506c CE marking rather than separately marketed devices; no model card, training-data description or standalone intended-use document has been published; and all performance and adaptive-workflow timing claims (e.g. ~90% contouring time reduction, ~15-minute online adaptive workflow) are vendor-reported and not yet independently validated. All AI-generated contours and plans require qualified clinician and medical-physics review prior to clinical use.

Other portfolio items announced for ESTRO 2026 — **uRT®-linac 506c**, **uLinac HalosTx**, **uMR® Omega 3T MR simulator**, **uMI® Panorama PET/CT simulator** — are hardware platforms; their public announcements do not currently isolate an AI/DL component for radiotherapy and therefore fall outside the DLinRT.eu inclusion criteria.

## Synaptiq

At the Synaptiq booth, the team communicated that **Mediq RT** has received **CE certification (Class IIa)**, explicitly including the **Active Contouring GTV delineation** feature. They also indicated that a **4D CT** capability is currently offered as an option inside a **research module** of Mediq RT and is **not** part of the CE-cleared scope.

Catalogue updates:

- **[Synaptiq Mediq RT](/product/synaptiq-mediq-rt)** — regulatory status updated from "under review" to **CE-cleared (Class IIa)**, with the intended use extended to cover GTV delineation in addition to organs at risk. Description, limitations and \`source\` fields carry an explicit verification caveat.
- **[Synaptiq Mediq RT — 4D CT (Research Module)](/products/pipeline)** — added to the [pipeline products hub](/products/pipeline) as a new pre-market entry (E0 / I0 / R0) reflecting the research-module status.

Neutrality caveat: the information above is sourced from a vendor booth communication, not a vendor press release or notified-body publication. The CE-clearance details (certificate number, notified body, EUDAMED UDI-DI) have not yet been independently verified. Entries will be updated as soon as an authoritative public source is available.



## Post-ESTRO catalogue updates (19 May 2026)

After the congress closed, the following entries were added or revised:

- **United Imaging uCT 610 Sim — Deep Learning Full-FOV Reconstruction**: added to the [pipeline products hub](/products/pipeline) as a pre-market entry (E0 / I0 / R0), reflecting the vendor disclosure of an AI/DL component while the product remains "under development; not for sale or clinical use."
- **United Imaging uRT Auto-Contouring** and **uRT Auto-Planning**: kept in the catalogue as integrated components of the CE-marked uRT-linac 506c. Notes and limitations tightened to make explicit that no model card, training-data description or standalone intended-use document has yet been published. The auto-contouring supported-structures section is now rendered as **"structure list unavailable"** rather than blank, since the vendor has not published a verified DICOM-conformant list.
- **RaySearch RayStation Deep Learning Segmentation**: the announced **Female Pelvis** model is reflected by adding the disclosed ROIs (Uterus, Ovary_L, Ovary_R, Vagina) to the supported-structures list with the \`(investigational)\` suffix, per our [structure status marking](/resources-compliance) convention. Evidence Rigor / Clinical Impact / Adoption Readiness scores are unchanged. Demo statistics from the congress (full CT body coverage of 231 structures, 192 ROIs contoured in 59 seconds) are now captured in the entry's evidence notes.

## Full post-ESTRO audit (19 May 2026)

A full sweep of the 107 catalogued products was performed after the congress closed. The audit was announcement-driven: each Tier-1 and Tier-2 vendor's official newsroom and ESTRO 2026 booth communication was reviewed against the [product inclusion criteria](/about), and entries were only edited where a vendor publicly disclosed a new AI/DL component, regulatory milestone, version, or supported-structure change.

- **Tier 1 (GE HealthCare, TheraPanacea, RaySearch, United Imaging, Spectronic Medical, Accuray)**: changes captured above. TheraPanacea's 16 accepted abstracts will be folded into the relevant product evidence lists once stable DOIs are published in the post-congress proceedings.
- **Tier 2 (Varian, Siemens Healthineers, Philips, Brainlab, MIM Software, Mirada, Limbus AI, MVision AI, Radformation, Manteia, Carina Medical, Coreline Soft, Vysioner, Wisdom Tech, DirectORGANS, Oncosoft, Taiwan Medical Imaging, Hura Imaging, AI Medical, EverFortune, MedMind, Quanta Computer, MedCom, Sun Nuclear, MD Anderson)**: no verifiable new AI/DL product, clearance or model-card disclosure tied specifically to ESTRO 2026 was identified. **Synaptiq** is covered separately above following a vendor booth communication. Existing entries remain accurate; \`lastRevised\` dates have been left unchanged per our [minimal-intervention](/about) policy (no edit, no date bump).
- **Hardware platforms and watchlist items** (uRT-linac 506c, uLinac HalosTx, uMR Omega, uMI Panorama, Accuray Stellar, PreciseART, Adapt LTE/Cenos): remain excluded pending vendor documentation that isolates an AI/DL component, training data and intended use.

---

If you spot another ESTRO 2026 announcement that should trigger a catalogue update, please [contact us](/support).
`,
};
