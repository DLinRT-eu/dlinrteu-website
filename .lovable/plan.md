## What I verified

Resolved link `link.europa.eu/XhXyV4` → EC press release IP/26/1714 (30–31 Jul 2026), "Commission starts enforcing AI Act rules and new transparency requirements on 2 August":

- **2 Aug 2026** — the AI Office and national authorities **begin enforcing** the AI Act: GPAI model obligations, prohibited practices, and Article 50 **transparency obligations start to apply** (AI-interaction disclosure, deepfake labelling, machine-readable marking of AI-generated content). Enforcement split: AI Office (systems from the same provider as the GPAI model, plus VLOP/VLOSE-integrated systems), national competent authorities (all other systems), EDPS (EU institutions).
- The **AI Omnibus is in force** (no longer "pending publication in the OJ") and postpones high-risk rules to **2 Dec 2027** (Annex III) and **2 Aug 2028** (high-risk AI in regulated products, incl. medical devices).
- **2 Dec 2026** — new prohibitions on AI-generated non-consensual sexual content and CSAM apply. This is *not* the end of an Art. 50 transparency grace period.
- Supporting material now published: Code of Practice on Transparency of AI-Generated Content (180+ signatories), draft Art. 50 guidelines, draft high-risk classification guidelines, AI Act Service Desk, Complaint and Whistleblower tools, Scientific Panel.

## What is wrong on the site today

In `src/components/resources/RegulatoryLandscape.tsx` (EU: AI Act card):

- Badge and body say the Digital Omnibus is "Council-approved 29 Jun 2026 … pending publication in the Official Journal" — outdated; it is in force.
- No mention at all of **2 Aug 2026**, the single most relevant near-term date.
- The bullet "2 Dec 2026 — end of the grace period for transparency on AI-generated content (Art. 50)" is inaccurate; Art. 50 applies from 2 Aug 2026, and 2 Dec 2026 carries only the new NCII/CSAM prohibitions.
- The "2 Aug 2027 sandboxes" bullet is unverified against the post-Omnibus text.

Correct as-is: 2 Dec 2027 / 2 Aug 2028 dates, the Annex I sectoral-interplay point, AI Office competence, machinery exemption.

## Plan

### 1. Rewrite the EU: AI Act card (`RegulatoryLandscape.tsx`)
- Change the badge to "AI Omnibus in force — enforcement from 2 Aug 2026".
- Replace the "What changed (Jun 2026)" box with a clean **AI Act timeline** ordered by date:
  - *2 Feb 2025* — prohibited practices applicable.
  - *2 Aug 2025* — GPAI obligations applicable.
  - **2 Aug 2026 (now)** — enforcement begins (AI Office + national authorities + EDPS); Article 50 transparency obligations apply: disclose AI interaction, label deepfakes, machine-readable marking of AI-generated/altered content.
  - *2 Dec 2026* — new prohibitions on non-consensual sexual content / CSAM.
  - *2 Dec 2027* — Annex III high-risk obligations.
  - *2 Aug 2028* — Annex I high-risk AI embedded in regulated products, incl. **medical devices** (the DLinRT-relevant date).
- Drop the unverified 2 Aug 2027 sandbox bullet (or restate it only if I can confirm it in the consolidated text before writing).
- Keep and retain the sectoral-interplay (Annex I / MDR) paragraph, updating "Council-approved" wording to "in force".

### 2. Add a "What 2 Aug 2026 means for radiotherapy AI" note
Short, factual sub-block: for CE-marked RT AI (Annex I high-risk via MDR), the high-risk obligations still do not bite until 2 Aug 2028, but Article 50 transparency can already apply where a product generates or alters content shown to users, or interacts conversationally — with the disclaimer that this is informational, not legal advice.

### 3. Update the Interplay: MDR + AI Act card
Replace "Council-approved 29 Jun 2026" with the in-force framing; keep the MDCG 2025-6 reference.

### 4. Refresh links (`ResourceLinks.tsx`, `CoreDocuments.tsx`)
Add, in the existing EU AI Act group, with the existing card/search pattern:
- Enforcement of the AI Act (digital-strategy)
- Guidelines on Transparency of AI-generated Content
- Code of Practice on Transparency of AI-Generated Content
- AI Act Service Desk (FAQ)
- Press release IP/26/1714 as the dated source
Keep `CoreDocuments.tsx` curated: add only the Art. 50 transparency guidelines there.

### 5. Verification
- Type-check.
- Load `/resources-compliance` in the browser and screenshot the AI Act and Interplay cards to confirm rendering and that every new link resolves (HTTP 200).

## Technical notes

Files touched: `src/components/resources/RegulatoryLandscape.tsx`, `src/components/resources/ResourceLinks.tsx`, `src/components/resources/CoreDocuments.tsx`. Presentation-only; no data-model or product changes. All dates sourced from EC press release IP/26/1714 and the digital-strategy enforcement pages, retrieved 2026-07-31.
