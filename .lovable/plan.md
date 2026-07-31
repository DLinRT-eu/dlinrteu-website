## Goal

Audit every MDR statement on the Resources & Compliance page and bring the "Proposed MDR Revision" card up to date (as of 31 July 2026), including the proposal's direct link to the AI Act.

## What I verified (sources)

- The proposal is **COM(2025) 1023 final, procedure 2025/0404(COD)**, adopted 16 December 2025. It amends **MDR 2017/745**, **IVDR 2017/746**, **Reg. 2022/123** (EMA support to medical-device expert panels) **and Reg. 2024/1689 (AI Act) as regards the list of Union harmonisation legislation in its Annex I**.
- Status: still **ongoing, not adopted**. EP lead committee **SANT**, rapporteur **Oliver Schenk (EPP, DE)**, appointed 13 Feb 2026; draft report presented 14 Apr 2026; first SANT examination of the draft report on **14 July 2026** (balance between simplification and patient safety). Council: **progress report 9801/26 of 5 June 2026** — no general approach yet.
- Background reading: EPRS briefing **PE 785.663 (March 2026)**, "Medical devices: Simplifying the rules".
- Consequence: **MDR/IVDR as currently in force still apply unchanged**; nothing in the proposal is binding today.

## Issues found on the page

1. `RegulatoryLandscape.tsx` — the "Proposed MDR Revision (December 2025)" card gives no document reference, no legislative status, and omits that the proposal touches the **AI Act Annex I list** and the EMA expert-panel regulation. A reader can't tell it is still a proposal in first reading.
2. Risk of confusion between two different files: **AI Omnibus COM(2025) 836** (AI Act) and **MDR/IVDR simplification COM(2025) 1023**. The page mentions the first only; the two are described in adjacent cards without distinguishing them.
3. The "Interplay: MDR + AI Act" card explains the Omnibus narrowing but does not mention that the MDR proposal itself edits the AI Act Annex I list — the most concrete MDR↔AI Act link for radiotherapy SaMD.
4. `CoreDocuments.tsx` — "MDR Targeted Revision Proposal (Dec 2025)" entry lacks the COM/procedure number and a status label.
5. `ResourceLinks.tsx` — no link to the proposal procedure file, the EPRS briefing, or the Council progress report.

## Changes

**`src/components/resources/RegulatoryLandscape.tsx`**
- Rewrite the proposal card: title "MDR/IVDR Simplification Proposal — COM(2025) 1023, 2025/0404(COD)"; status badge "Ordinary legislative procedure — first reading, not adopted"; explicit note that MDR 2017/745 and IVDR 2017/746 apply unchanged until adoption.
- Add a short status timeline: 16 Dec 2025 proposal · 13 Feb 2026 EP rapporteur (Schenk, SANT) · 14 Apr 2026 draft report · 5 Jun 2026 Council progress report 9801/26 · 14 Jul 2026 SANT examination of draft report.
- Summarise the substance accurately: risk-proportionate simplification of conformity-assessment procedures, in-house device rules for health institutions, digitalisation/EUDAMED, EMA support for expert panels, and the amendment of AI Act Annex I.
- In the "Interplay: MDR + AI Act" card, add a sentence that the MDR proposal amends the AI Act Annex I list, so the boundary between MDR conformity assessment and AI Act high-risk obligations for medical AI may shift before the 2 Aug 2028 date.
- Keep the AI Omnibus (COM(2025) 836) content, but label the two files distinctly to avoid conflation.

**`src/components/resources/CoreDocuments.tsx`**
- Update the proposal entry with COM(2025) 1023 / 2025/0404(COD) and a "proposal — not in force" qualifier; point to the Commission publication page.

**`src/components/resources/ResourceLinks.tsx`**
- Add to the MDR group: EUR-Lex procedure file 2025/0404(COD), the Commission publication page for the proposal, and the EPRS briefing PE 785.663. Each with a one-line description and date.

**Other MDR mentions** (`PurposeSection`, `RegulatoryFramework`, `ComplianceChecklist`, `StandardsGuidelines`): reviewed — statements about MDR 2017/745, SaMD classification (Rule 11), ISO 13485/14971, MDCG guidance and TPLC monitoring are accurate; no changes planned beyond a caveat in `RegulatoryFramework` that classification rules are subject to the pending simplification proposal.

## Notes

All text stays informational, dated, and non-legal-advice; no product data, business logic, or backend changes.
