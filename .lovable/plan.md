# Reviewer-style audit and evidence expansion for open Q4 2026 reviews

## Scope
The 43 products with a pending/in-progress review in round "Q4 2026 - anticipated":
ai-medical-jazz, airato-ratoai, aitewan-deepbt-detector-plus, canon-aice-mr, canon-piqe, carina-intcontour, ge-air-recon-dl, ge-air-recon-dl-enhancement, ge-healthcare-irt, ge-mr-contour-dl, ge-truefidelity, informai-radoncai, lumonus-ai, manteia-accucontour, manteia-mozi, medcom-prosoma-dart, mirada-dlc, mvision-ai-contouring, mvision-ai-workspace-plus, mvision-dose-plus, mvision-verify, neuralrad-brain-pipeline, oncosoft-oncostudio, philips-petct-adaptive-reconstruction, philips-precise-image, philips-smartspeed, plan-ai, quanta-qoca-image-smart-rt, raysearch-rayintelligence, raysearch-raystation, raysearch-raystation-planning, rpa-radiation-planning-assistant, siemens-ai-rad-companion, synaptiq-mediq-rt, therapanacea-adaptbox, therapanacea-art-plan-planning, therapanacea-brachybox-pipeline, therapanacea-smartplan-pipeline, therapanacea-tumorbox-pipeline, united-hd-tof, united-uaifi-umr, varian-ethos-ai-segmentation, wisdom-deep-plan.

Review status in the database is NOT changed (assigned reviewers keep their tasks); this is an editorial pre-check.

## Checks per product (reviewer checklist, docs/review/GUIDE.md)
1. Identity and inclusion: name, company, website reachable, AI/DL core function, lifecycle.
2. Regulatory: CE/FDA/other claims vs FDA 510(k)/De Novo database, EUDAMED registry match, certification summary consistent.
3. Technical/structures: DICOM nomenclature, "Region: Structure Name" format, supported modalities.
4. Transparency: trainingData/evaluationData from FDA summaries or papers where available.
5. Evidence: search PubMed/DOI/vendor literature for peer-reviewed and independent studies; verify every DOI resolves and matches title/authors; add missing key papers; re-score Evidence Rigor (E0–E3) and Levels of Efficacy (1t–6) and study-quality flags only when supported.
6. Source disclosure: every changed field cites a public source, or `sourceAccess` + `sourceRetrievedOn`.

## Edits
- Apply only source-verified corrections and additions to product data files; update `lastRevised` for touched products.
- Unverifiable claims are not removed silently: listed in the report as "needs reviewer/vendor confirmation".
- Work in category waves (auto-contouring, reconstruction/enhancement, planning, pipeline/other) to keep diffs reviewable.

## Validation
- Run evidence checker, product validator and existing tests after each wave.

## Deliverables
- Updated product entries.
- `/mnt/documents/reviewer-precheck-2026-11-12.md` (per-product findings, papers added, score changes with rationale, open items) and matching CSV of changes.
