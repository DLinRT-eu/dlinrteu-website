# New news item: summer–September 2026 update, with LinkedIn post draft

A new entry on the News page covering everything since the July 2026 item, plus a ready-to-publish LinkedIn post that you approve before it goes out.

## What the news item will cover

**Newly added products**
- RadOncAI (InformAI) — head & neck dose prediction, FDA cleared 18 June 2026.
- DeepBT Detector-Plus (Aitewan) — brain-tumour contouring on MRI, FDA cleared 10 April 2026.
- MVision Image+ and Adapt+ — now separate entries alongside Contour+, Workspace+, Dose+ and Verify.
- Nalvera.AI added to the Model Zoo (research hosting, not a catalogue product).

**Reviewed and corrected entries**
- Four clearance records brought up to date: AutoContour, AI Contouring for Eclipse, OncoStudio, AI-Rad Companion Organs RT.
- MIM Contour ProtégéAI+ updated (CE 1.3.2 / FDA 2.0.0) with a versioned structure list.
- MVision portfolio reconciled: structure lists, counts and target/elective classifications.
- Structure counts across dashboards and the comparison page now count distinct structures per vendor instead of every model variant.
- Three risk-class differences resolved (Limbus Contour IIa, MRI Planner IIb, MOZI TPS IIb).

**European regulatory verification (new)**
- Automated EUDAMED checks now run over the whole catalogue; 15 companies show their official registration (10 with certificate and notified-body numbers) and 12 products show their Basic UDI-DI and risk class, each with a public record link and date checked.
- A separate sweep of the European radiotherapy-software branch found no missing AI products.
- Note that EU registration only became mandatory on 28 May 2026, so an absent record is not evidence of a missing CE mark.

**Evidence and exports**
- Exports now carry evidence levels, plus a new per-publication export listing each paper with its scores and a DOI or link.
- Model Zoo and LLM platform lists curated to multi-model collections only.

**AIinRT 2027**
- 1–2 April 2027, Princess Máxima Center, Utrecht; abstract submission opened 1 September 2026; link to aiinrt.org.

**Carried over from the last news item**
- Next review round 1 November – 15 December 2026, with the open call for reviewers.
- Company certification round still open; certified entries carry the green "Verified by Company" badge.

## LinkedIn post

A short post (roughly 200 words) with the same headline points — new products, the EUDAMED verification, per-publication evidence exports, AIinRT 2027 abstracts, and the reviewer call — ending with a link to the news page and hashtags. It will be written into the news item so you can read it in full, and published only after you approve the wording.

## Technical notes

- New file `src/data/news/september-2026-catalogue-and-eudamed-update.ts` exporting a `NewsItem`, imported and placed first in `NEWS_ITEMS` in `src/data/news.ts`.
- `date: "2026-09-23"`; `linkedinPostUrl` left empty until the post is live, then filled in.
- Content is markdown, matching the existing entries: internal links as `/product/...`, external sources as full URLs.
- Every claim traces to catalogue data or a disclosed public source already recorded (FDA 510(k) numbers, EUDAMED audit files under `docs/audits/eudamed/`). No invented numbers, no clinical-validation claims.
- After approval of the post wording, publish via the LinkedIn connector and store the resulting post URL on the item.
