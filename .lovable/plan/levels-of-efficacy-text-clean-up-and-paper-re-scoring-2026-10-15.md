# Levels of Efficacy: text clean-up and paper re-scoring

## 1. Text clean-up
- Methodology guide page, review guide and field reference: search for any leftover "Clinical Impact" / "I0–I5" wording and replace it with "Levels of Efficacy (L1t, L1c, L2–L6)". Old I-codes stay mentioned only where the conversion table is explained.
- Project knowledge text: I'll prepare the corrected paragraph (the "Evidence Classification" and "Key fields" lines) for you to paste into Project Settings → Knowledge. I can't edit that setting myself. The repository copy of the rules (AGENTS.md) will be updated to match.

## 2. Re-scoring, one category at a time, applied straight away
Order (by paper count): Auto-Contouring (147), Image Synthesis (52), Image Enhancement (39), Reconstruction (26), Treatment Planning (18), Tracking (12), Registration (1), Platform (1).

For each paper in a category:
- Re-read the abstract (or the full text when it's open access) through its DOI or PubMed record. Never guess: if no abstract can be found, the paper keeps its provisional level and is flagged "source not retrievable".
- Give it a level from your Table 3, with a one-line reason naming what was measured (for example "geometric accuracy only → L1t", "time saved per case → L3", "prospective clinical use → L4").
- Write the level into the product record straight away and remove the "provisional" mark for that paper.
- Re-calculate each product's overall level with the existing highest-paper rule. Manual overrides are kept but flagged when they no longer match.

Evidence Rigor and Adoption Readiness scores are not changed.

## 3. Reports for the reviewers
After each category, one file in Files:
- `efficacy-rescoring-<category>-2026-10-15.csv`: product, paper, DOI, old I-score, provisional level, new level, reason, source checked, date checked.
- A short summary in chat: how many papers changed, which product levels moved up or down, and which papers couldn't be checked.
- The main worklist CSV gets "new level" and "status" columns filled in, so reviewers can follow progress in one sheet.

Because 296 papers is a lot of reading, I'll run several categories per message where possible; any category left unfinished is listed with how far it got.

## 4. Checks after each category
- Evidence check: no unknown levels; the count of old-score warnings goes down.
- Level-order tests and the type check pass.
- Spot-check two product pages in the browser (badge plus paper chips without asterisks).

## Technical details
- Paper levels are written as L-codes in `keyPapers[].clinicalImpact` (and in `categoryEvidence` where relevant); `legacyClinicalImpact` keeps the old I-code for traceability; `efficacyProvisional` is removed once re-scored.
- Conversion stays only in `normalizeProductEfficacy` / `resolveEfficacyLevel` (AGENTS.md rule).
- Products get `lastUpdated` set to the re-scoring date.
- `roadmap.md` tracks each category wave.
