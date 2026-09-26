import { NewsItem } from "@/types/news";

export const astroEcmp2026Announcements: NewsItem = {
  id: "astro-ecmp-2026-announcements",
  date: "2026-09-26",
  title: "ASTRO 2026 and ECMP 2026: AI-in-RT announcements",
  summary:
    "Round-up of AI announcements for radiotherapy around ASTRO 2026 (Boston, 26–30 September) and ECMP 2026 (Valencia, 23–26 September): Radformation AutoContour v2.8, our check on OptiPlan, RaySearch, GE HealthCare/MIM and the catalogue updates that followed.",
  content: `
Two congresses overlap this week: the **ASTRO 2026 Annual Meeting** in Boston (26–30 September; exhibition 27–29 September) and the **6th European Congress of Medical Physics (ECMP 2026)** in Valencia (23–26 September), organised by EFOMP with the Spanish Society of Medical Physics. As with previous congress round-ups, only announcements with a clear AI/deep-learning component for radiotherapy are summarised here. Vendor statements are reported as vendor-reported and are not independent validation.

## Radformation

### AutoContour v2.8

Radformation [announced AutoContour v2.8](https://blog.radformation.com/autocontour-v2.8-broader-coverage-smarter-automation-and-more-plan-ready-workflows) on 25 September 2026. According to the vendor, the release:

- brings the library to **520+ AI-trained models** across CT, MR and CBCT (previously 480);
- adds mediastinal lymph node models, EPTN brain MR structures (e.g. caudate nucleus, fornix, periventricular space, pineal gland) and new MR abdomen models;
- adds Clean and Smooth post-processing to Planning Structures, applied automatically through Zero-Click templates;
- adds a Zero-Click queue dashboard (prioritise, re-run with another template) and offers cloud or on-premises processing.

The [AutoContour entry](/product/radformation-autocontour) has been updated to v2.8. The announcement does not say which regulatory clearance covers v2.8; the most recent FDA clearance on record is K262452 (14 August 2026). The per-structure list will be re-synced when Radformation publishes the full v2.8 model list.

### OptiPlan — checked, not added

We checked whether **OptiPlan**, Radformation's automated VMAT planning module [introduced in August 2026](https://blog.radformation.com/introducing-optiplan-automated-vmat-planning), uses AI. Radformation's [product page](https://radformation.com/optiplan/optiplan) describes it as using the TPS-native Eclipse optimisation tools and ClearCheck-driven planning objectives, with "no extensive model training or commissioning required". None of the public material describes a machine-learning or deep-learning model. Per the [inclusion criteria](/resources-compliance), OptiPlan is therefore **not added** to the catalogue. For reference, Radformation states that EZFluence with OptiPlan is CE marked and FDA 510(k) pending (K261718) ([webinar page](https://resources.radformation.com/webinar-recording-introducing-optiplan-1)). We will review this again if Radformation documents an AI component.

## Other ASTRO 2026 announcements

- **RaySearch Laboratories** ([press release, 24 September 2026](https://storage.mfn.se/c95d76cb-c964-4a76-b64a-2c953bad3be9/raysearch-to-showcase-latest-innovations-in-automation-speed-and-advanced-analytics-at-astro-2026.pdf)): demonstrations of RayStation Deep Learning Segmentation, one-click synthetic CT generation and automated replanning, plus RayIntelligence v2026 for AI-performance monitoring. These are already listed in the catalogue ([RayIntelligence](/product/raysearch-rayintelligence)); no new product was announced.
- **GE HealthCare + MIM Software** ([ASTRO 2026 event page](https://events.gehealthcare.com/events/astro-2026/)): joint booth for the first time, showing MIM Contour ProtégéAI+ 2.0 (FDA cleared June 2026, already in the catalogue) alongside the Intelligent RT portfolio. No new AI clearance was announced.
- **Artera** ([release, 25 September 2026](https://business.am-news.com/am-news/article/bizwire-2026-9-25-new-data-highlight-arteras-mmai-consistency-across-diverse-patient-populations-at-astro-2026)): five abstracts on its multimodal AI prostate cancer biomarker. This is a prognostic test for systemic-therapy decisions, not a radiotherapy software device, so it is outside the catalogue scope.

On the scientific side, the programme includes sessions on generative AI and LLM-driven planning agents, AI for global oncology, and prospective pilots of AI decision support for CBCT review. These are research presentations, not commercial products.

## ECMP 2026

ECMP 2026 ([ecmp2026.efomp.org](https://ecmp2026.efomp.org/)) includes a dedicated track on artificial intelligence and imaging biomarkers alongside radiotherapy. We found no new commercial AI radiotherapy product launches tied to ECMP at the time of writing.

## What changed in the catalogue

- [Radformation AutoContour](/product/radformation-autocontour): version 2.8, updated feature list and model count (vendor-reported), with the source disclosed.
- OptiPlan: assessed and not included (no documented AI component).

## Reminders

- The next review round runs **1 November – 15 December 2026**. The focus is verifying each entry once and double-checking evidence levels that rest on a single source. Reviewers are welcome to [get in touch](/support).
- The company certification round remains open. Certified entries carry the "Verified by Company" badge.
- **AIinRT 2027** (1–2 April 2027, Princess Máxima Center, Utrecht) is accepting abstracts: [aiinrt.org](https://www.aiinrt.org).

*DLinRT.eu is an educational catalogue; listed information is not a clinical validation of any product.*
`,
};
