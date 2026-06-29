## Goal
Refresh the EU AI Act content on `/resources-compliance` to reflect today's news: the Council of the EU formally approved the Digital Omnibus AI Act amendments (following Parliament's 16 June 2026 approval), confirming the postponed high‑risk deadlines and introducing several substantive changes that are directly relevant to medical AI / radiotherapy products in the DLinRT catalogue.

Sources cross‑checked:
- Morgan Lewis LawFlash, 24 June 2026 — Parliament approval 16 June 2026, deferred Annex III to 2 Dec 2027, Annex I to 2 Aug 2028.
- Gibson Dunn client alert, 27 May 2026 — Omnibus agreement, formal adoption expected before 2 Aug 2026.
- Sidley / Hogan Lovells — 7 May 2026 provisional agreement details.
- Better Regulation — Texts Adopted (16 June 2026) of COM(2025) 836 final.
- User‑provided Council summary (29 June 2026).

## Scope of edits (presentation only)

File: `src/components/resources/RegulatoryLandscape.tsx`

1. **AI Act card (lines ~75–99)** — rewrite the headline badge and paragraph:
   - Badge: change "(pending formal adoption)" to "(Digital Omnibus, Council‑approved Jun 2026)".
   - Paragraph: state that the Digital Omnibus on AI amendments were approved by the European Parliament on 16 June 2026 and by the Council on 29 June 2026, pending publication in the OJ. Keep the existing deferred dates (Annex III → 2 Dec 2027; Annex I incl. medical devices → 2 Aug 2028) and add the new milestones:
     - 2 Aug 2027 — deadline for national AI regulatory sandboxes.
     - 2 Dec 2026 — end of grace period for transparency on AI‑generated content (Art. 50) and entry into force of the new prohibition on non‑consensual sexual/intimate content and CSAM generation.
   - Add a short sentence noting the AI Office's clarified competence over GPAI‑based systems where model and system share a provider, with carve‑outs for law enforcement, border, judicial and financial supervisors.
   - Add one sentence flagging the Annex I "sectoral interplay" clarification: where MDR (and similar sectoral laws) already impose AI‑specific requirements equivalent to the AI Act, the Act's direct application is limited; the Commission must issue guidance to minimise compliance burden for Annex I operators — directly relevant to medical AI / radiotherapy SaMD.

2. **Interplay: MDR + AI Act card (lines ~101–125)** — append one sentence noting that the Digital Omnibus narrows direct AI Act applicability where MDR already covers equivalent requirements, and that Commission guidance to minimise duplicate compliance is mandated. Keep the existing MDCG link.

3. **Add a small "What changed (Jun 2026)" bullet list** inside the AI Act card under the paragraph, summarising the four items above (deferred dates, new prohibitions, sandbox deadline, sectoral interplay) for quick scanability. Use the existing `Badge` / list styling already present on the page — no new components, no new dependencies.

4. **Add one authoritative reference link** next to the existing EUR‑Lex link, pointing to the Texts Adopted of the Digital Omnibus on AI (`https://www.europarl.europa.eu/doceo/document/TA-10-2026-0234_EN.html` if available, otherwise the Better Regulation / Commission proposal page COM(2025) 836).

No other sections, no logic changes, no schema/data changes. Out of scope: PurposeSection.tsx and StandardsGuidelines.tsx — their AI Act mentions remain accurate at this level of detail.

## Verification
- Build passes typecheck.
- Visually inspect `/resources-compliance` AI Act card and the Interplay card.
