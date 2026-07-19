import { NewsItem } from "@/types/news";

export const aapm2026AndCertificationMilestone: NewsItem = {
  id: "aapm-2026-and-certification-milestone",
  date: "2026-07-19",
  title: "AAPM 2026 Round-up and Company Certification Milestone",
  summary:
    "AI-in-RT announcements from AAPM 2026 (Vancouver, 19–22 July) covering RaySearch, Sun Nuclear (Mirion), GE HealthCare/MIM Software and TheraPanacea, plus a milestone update on manufacturer-certified products (Accuray, Sun Nuclear, Carina Medical, Synaptiq).",
  content: `
The **68th AAPM Annual Meeting & Exhibition** runs in Vancouver from 19 to 22 July 2026, jointly with COMP. As with previous congress round-ups, only announcements with a clear AI/deep-learning component for radiotherapy are summarised here, per the [product inclusion criteria](/about). Items reported by vendors without a corresponding regulatory clearance, publication or product page are noted as attendance-only.

## Manufacturer certification milestone

Since the [Company Certification Program launched](/news/company-certification-launch) in January 2026, the following products have received the "Verified by Company" badge, meaning that a verified manufacturer representative has reviewed and certified the DLinRT.eu entry:

- **[Accuray Synchrony](/product/accuray-synchrony)** — real-time motion tracking (Accuray)
- **[Plan AI](/product/plan-ai)** — AI-assisted treatment planning (Sun Nuclear, a Mirion Medical company)
- **[IntContour](/product/carina-intcontour)** — auto-contouring (Carina Medical)
- **[MedIQ-RT](/product/synaptiq-mediq-rt)** and **[MedIQ-RT 4DCT pipeline](/product/synaptiq-mediq-rt-4dct-pipeline)** — auto-contouring and 4DCT (Synaptiq)

Certification is renewed whenever the product entry is materially updated; an outdated certification is shown as an amber badge until the manufacturer re-verifies. Representatives from additional companies are currently working through the certification checklist and further updates are expected in the coming weeks.

## AAPM 2026 vendor announcements

### Sun Nuclear (a Mirion Medical company)

Sun Nuclear published a [pre-congress announcement](https://healthtechhotspot.com/sun-nuclear-to-showcase-next-generation-innovations-at-aapm-comp-2026-annual-meeting/) (17 July 2026) confirming that **Plan AI™** and **AdaptCHECK™** will be showcased at booth 800 alongside Daily QA™ 4 Pro. Plan AI is already tracked in the catalog and has just been [manufacturer-certified](/product/plan-ai); the AdaptCHECK online adaptive verification workflow is being reviewed against the inclusion criteria before any catalog entry is created.

### RaySearch Laboratories

RaySearch [announced](https://www.raysearchlabs.com/media/press-releases/2026/raysearch-to-present-automation-speed-and-analytics-advancements-at-aapm-2026/) (17 July 2026) that RayStation® automation, planning-speed and analytics tooling will be presented at booth 1401. No new product launch or regulatory milestone was announced for AAPM 2026, and no changes are required to the existing [RayStation](/product/raysearch-raystation), [RayStation Deep Learning Planning](/product/raysearch-raystation-dl-planning) or [RayIntelligence](/product/raysearch-rayintelligence) entries. Follow-up will occur if congress presentations produce new peer-reviewed evidence.

### GE HealthCare / MIM Software

GE HealthCare [announced](https://www.biospace.com/press-releases/ge-healthcare-receives-fda-510k-clearance-for-mim-contour-protegeai-2-0-advancing-ai-enabled-radiation-therapy-planning-with-expanded-clinical-capabilities) (4 June 2026, ahead of AAPM) FDA 510(k) clearance for **MIM Contour ProtégéAI+ 2.0**, with expanded anatomical coverage and updated clinical capabilities. The current DLinRT.eu [MIM Contour ProtégéAI+ entry](/product/mim-contour-protegeai) reflects v1.4.0 / K253270 (cleared 27 March 2026); the v2.0 clearance will be applied to the entry once the FDA 510(k) number and the updated structure list have been confirmed from the public FDA database and MIM's product documentation.

### TheraPanacea

TheraPanacea [confirmed attendance](https://www.linkedin.com/posts/therapc_aapm2026-medicalphysics-radiationoncology-activity-7481013466716295168-CBbk) at booth 1103, promoting **ART-Plan™** for AI-driven adaptive and automated treatment planning. No new product or regulatory milestone was announced for AAPM 2026; the existing [TheraPanacea Annotate](/product/therapanacea-annotate) and pipeline entries are unchanged.

### Other exhibitors

Varian/Siemens Healthineers, Elekta, Philips, Canon Medical, United Imaging, Accuray, Brainlab, Radformation, MVision AI, Limbus AI, Manteia, Carina Medical, Oncosoft, ClariPi, Subtle Medical, Vysioneer, Coreline Soft, Everfortune and PTW are confirmed on the [AAPM exhibitor list](https://site.aapm.org/annual-meeting/2026-annual-meeting/attendee/exhibits) but did not publish AI-RT product-level announcements tied specifically to AAPM 2026 at the time of writing. This round-up will be updated if congress-tied press releases, clearances or peer-reviewed publications appear during the meeting.

## New company under review — Lumonus

[Lumonus](https://www.lumonus.com) (Sydney, Australia; New York, USA) was reviewed as a candidate for inclusion. The **Lumonus AI** "Oncology Intelligence Layer" spans Consult, Document, Plan and Improve modules and uses LLMs and machine learning integrated with EMR/OIS/TPS. The company has publicly disclosed that it pursued and obtained an [FDA Clinical Decision Support Software exemption](https://rookqs.com/casestudies/lumonus) for its Sigma module — an explicit non-device pathway — and no CE mark, FDA 510(k)/De Novo clearance, or other recognised authority approval (MDR-exempt, NMPA, TGA, PMDA, MFDS, Health Canada, ANVISA, MHRA, UKCA) has been identified for any Lumonus module. A [research collaboration with Memorial Sloan Kettering](https://www.prnewswire.com/news-releases/lumonus-launches-strategic-collaboration-with-leading-global-cancer-center-to-advance-radiation-therapy-treatment-planning-302736516.html) (April 2026) has been announced but no peer-reviewed clinical validation is yet available.

**Decision:** Lumonus is **not included** in the catalog at this stage. The current offering is oriented toward workflow, documentation and analytics automation rather than a specific deep-learning clinical algorithm for a core RT function, and does not meet the [regulatory-approval inclusion gate](/about). The entry will be re-reviewed if Lumonus obtains a 510(k)/De Novo clearance, CE mark or equivalent recognised authority approval, or publishes peer-reviewed validation of a specific DL-based RT function.

---

*Have we missed a congress announcement worth tracking? Contact us at info@dlinrt.eu.*
`,
};
