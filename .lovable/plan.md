# Apply reviewer proposals, GitHub issues, close reviews, lock 3 database steps

## 1. Reviewer proposal in the site (1 waiting)
- GE HealthCare iRT (S. David, submitted 15 Nov): new Marengo CIMS case-study link + PDF, 2 key features from the 25 Sep 2025 press release, "no new peer-reviewed papers" note, version left blank.
- Check each link and statement against the source, adjust wording to site style, approve the draft, apply it to the product, set `lastRevised` to today.
- Older unsubmitted drafts (MVision, Synaptiq, PTW, United) are left alone; they were never sent for review.

## 2. Open GitHub issues (8, all from amith-kamath, 16 Nov)
- Reviews #165 HD TOF 2.0, #166 PET/CT Adaptive Reconstruction, #167 TrueFidelity, #168 Precise Image, #169 AiCE MR, #170 SmartSpeed, #171 PIQE: read each issue, verify every proposed change against its cited source (FDA/CE documents, papers via DOI), apply what checks out in site style, note anything rejected and why.
- #172 New Product Neosoma: check AI/DL use, regulatory approval (inclusion gate) and sources; add as a new product only if it passes, otherwise report why not.
- Write suggested replies for each issue (I can't comment on or close GitHub issues myself).

## 3. Mark reviews completed in round "Q4 2026 - anticipated"
- For each product handled above, set the matching open review to completed with today's date (e.g. GE iRT review by S. David, now in progress). If the issue author has no assigned review for that product, report it instead of changing someone else's review.

## 4. Lock the 3 open database steps
- Reminder records, admin setup and analytics cleanup: allow only admins and the automatic jobs; remove access for ordinary signed-in users. No other warnings touched.

## 5. Checks and report
- Run the tests, evidence checker, and confirm the site builds.
- Deliver a short report listing every change with its source, rejected items, reviews closed, and the GitHub reply texts.

## Technical details
- Drafts: `product_edit_drafts` status -> approved/applied; edits in `src/data/products/...`.
- Reviews: `product_reviews` status='completed', completed_at=now().
- Migration: add admin/service_role guard to `mark_reminder_sent`, `initialize_super_admins`, `schedule_analytics_cleanup`; revoke EXECUTE from PUBLIC/anon/authenticated where only jobs need them.
