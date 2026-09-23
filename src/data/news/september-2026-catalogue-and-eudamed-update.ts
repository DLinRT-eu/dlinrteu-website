import { NewsItem } from "@/types/news";

export const september2026CatalogueAndEudamedUpdate: NewsItem = {
  id: "september-2026-catalogue-and-eudamed-update",
  date: "2026-09-23",
  title: "New Products, EUDAMED Verification Live, Evidence-by-Source Exports · AIinRT 2027 Abstracts Open",
  summary:
    "Summer round-up: two newly cleared FDA products added, the MVision portfolio split into standalone entries, automated EUDAMED verification of companies and products now live on the site, per-publication evidence exports released, and abstract submission open for AIinRT 2027.",
  content: `
Since our [July update](/news/aapm-2026-and-certification-milestone) the catalog has grown, a full European regulatory verification layer has gone live, and exports now expose the evidence behind every score. Here is what changed.

## 🆕 Newly added products

- **[RadOncAI](/product/informai-radoncai)** (InformAI) — head & neck dose prediction, FDA 510(k) **K253050**, cleared 18 June 2026. Validation reported on 500 patients across two sites; no peer-reviewed publication identified, so the entry is listed at **Evidence Rigor E0**.
- **[DeepBT Detector-Plus](/product/aitewan-deepbt-detector-plus)** (Aitewan, Taiwan) — GTV contouring of brain metastases, meningioma and acoustic neuroma on MRI, FDA 510(k) **K252190**, cleared 10 April 2026.
- **[MVision Image+](/product/mvision-image-plus)** and **[Adapt+](/product/mvision-adapt-plus)** are now standalone entries alongside [Contour+](/product/mvision-ai-contouring), [Workspace+](/product/mvision-ai-workspace-plus), [Dose+](/product/mvision-dose-plus) and Verify. Both are listed under the Workspace+ CE Class IIa mark (EU MDR, 21 October 2025); fields without a public source — intended use, training and evaluation data — are deliberately left empty rather than filled with assumptions.
- **Nalvera.AI** has been added to the [Model Zoo](/initiatives) as a research model-hosting platform. It is not a catalog product: it hosts third-party research models for research use only, with no CE, FDA or MDR pathway.

Devices in the same FDA product codes without a deep-learning claim (bolus, dose-QA and geometry tools, Philips MM Sim, Seetreat ART.1-US, Cosylab PlanOne) were screened and excluded, per the [inclusion criteria](/about).

## 🔍 Reviewed and corrected entries

- Four clearance records brought up to date, with earlier clearances retained in the entry history: **[AutoContour](/product/radformation-autocontour)** (K262452, RADAC V6), **[AI Contouring for Eclipse](/product/varian-eclipse-ai-contouring)** (K261306, VA10A), **[OncoStudio](/product/oncosoft-oncostudio)** (K260528, broadened indications) and **[AI-Rad Companion Organs RT](/product/siemens-ai-rad-companion)** (K252548, VA70 plus MR brain metastases and OAR models).
- **[MIM Contour ProtégéAI+](/product/mim-contour-protegeai)** updated to CE 1.3.2 / FDA 2.0.0 with a **versioned structure list**: dashboards and comparisons now count only the current version.
- The **MVision portfolio** was reconciled end to end — structure lists rebuilt from vendor documentation, bundled bilateral structures counted as two, and breast and cervical entries reclassified between target and elective categories.
- **Structure counts are now distinct per vendor** across the dashboards and the [structure comparison](/compare) page. Previously every model-specific entry was counted separately, which inflated the figures; the catalog now reports 2,473 organs at risk, 36 targets and 526 elective structures.

## 🇪🇺 EUDAMED verification now live

Regulatory information is no longer only vendor-reported. An automated check runs the whole catalog against the public **EUDAMED** database and records only confirmed matches, each with the query link and the date checked:

- **15 companies** show their official EUDAMED registration (SRN, registered legal name, country), **10 of them** with certificate numbers and notified-body identifiers.
- **12 products** show their **Basic UDI-DI** and EU risk class directly in the CE block — among them Contour+, Workspace+, Dose+, Contour ProtégéAI+, MOZI TPS, Plan AI, MRI Planner, SubtleMR, SubtlePET, ClariCT.AI and Limbus Contour.
- Three risk-class differences were investigated and resolved: **[Limbus Contour](/product/limbus-contour)** Class IIa, **[MRI Planner](/product/spectronic-mriplanner)** Class IIb and **[MOZI TPS](/product/manteia-mozi)** Class IIb.
- A separate sweep of the European radiotherapy and medical-imaging software branches (EMDN Z1101 / Z1104) found **no missing AI products** — nothing had to be added from it.

One important caveat: registration in EUDAMED only became mandatory on **28 May 2026**. A missing record is therefore *not* evidence that a product lacks a CE mark, and the site never presents it as such.

## 📊 Evidence and exports

- Every export now carries the **product-level evidence rating**.
- A new **evidence-by-source export** lists each publication used to build a score, with its own rigor and impact rating, study-quality flags and a **DOI or direct link** — currently 244 source rows across 88 products, so any score can be checked at the source.
- The **Model Zoo** and **LLM inference platform** lists were curated down to genuine multi-model collections; single models are no longer listed, and the rule is stated on the page.

## 📅 AIinRT 2027 — abstract submission open

**[AIinRT 2027](https://www.aiinrt.org)** takes place **1–2 April 2027** at the **Princess Máxima Center, Utrecht**: two days, six sessions, double-blind peer review. **Abstract submission opened on 1 September 2026.** DLinRT.eu is proud to support the meeting — see our [earlier announcement](/news/aiinrt-2027-support) for the full programme outline.

## 🙋 Still open: review round and certification

- The next **review round runs 1 November – 15 December 2026**. Next to verifying entries as usual, a focus of this round is to **double-check evidence levels where the evidence rests on a single source** — entries scored from one publication or one source only. Many hands make the workload lighter; if you can spare a few hours, [get in touch](/support).
- Pending the publication of a paper, **one product review may be anticipated** — this is still under discussion and will be confirmed in due course.
- The **company certification round remains open**. Manufacturer-verified entries carry the green **"Verified by Company"** badge; an outdated certification shows amber until the manufacturer re-verifies.


*Spotted something inaccurate or missing? Contact us at info@dlinrt.eu.*
`,
};
