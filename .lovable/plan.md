# Bring the useful parts of other branches into main

## What the branches contain
| Branch | Unique work not on main | Decision |
|---|---|---|
| `lovable-backup-main-1794236562` (today) | None; fully contained in main | Nothing to merge. Safe to delete. |
| `edit/edt-b472a6eb…` (old Lovable edit branch) | None; main is 6 commits ahead | Nothing to merge |
| `lovable-backup-main-1781636729` (16 Jun 2026) | 14 commits of TheraPanacea edits that main never received (main is 1,718 commits ahead) | Port selectively, see below |

A full merge of the June branch is not sensible. Since June, main has rebuilt TheraPanacea as three ART-Plan applications, with newer structure lists (brochure v3.2.0, re-verified Sep/Oct 2026) and newer versions (3.2.1). A merge would overwrite that newer, verified work with older lists and older versions (3.2.0).

## Already superseded in main (drop)
- Annotate, MR-Box and AdaptBox structure lists: main's are newer and brochure-verified.
- Registration version 3.1.2 → 3.2.0: main already has 3.2.1.
- The "module of ART-Plan+" framing: main already has the ART-Plan parent and module links.
- The Wisdom Tech export line: main's file layout differs and already exports DeepContour.
- The old plan file.

## Worth keeping (port by hand)
The June branch added vendor-published ART-Plan+ limitations (TheraPanacea "technical information" page). Main doesn't have them; it only says "adult patients" in places. Before adding them:
1. **Check the vendor page:** re-open TheraPanacea's current technical-information page and confirm each limitation is still published. Record the source and today's retrieval date, per the source-disclosure rule.
2. **Add only confirmed items,** deduplicated, to the matching current product:
   - **All ART-Plan applications:** contours must be validated by an authorised user; image-quality dependence (noise, lossy compression, artefacts); adults only.
   - **Auto-contouring (Annotate):** auto-contouring may fail when DICOM Patient Position or Patient Sex tags are missing or wrong, the patient isn't supine, or anatomy is post-surgical. Further cautions: pelvic contours on patients under 60; H&N nodes and lacrimal/constrictor structures on non-contrast CT or outside the 50–79 age range.
   - **MR-Box:** MR is validated only for Brain T1, Abdo TrueFISP, Pelvis T2 and Pelvis TrueFISP.
   - **AdaptBox:** synthetic-CT slices outside the CBCT field of view are unreliable; only the latest RTPlan is used when several are linked to one RTSS; RTPlan/RTStruct must match the delivered treatment.
   - **SmartPlan:** the dose engine must be user-validated; only Monaco-Mosaiq, Eclipse-ARIA and RayStation are validated; 1–2 beams only.
   - **Pipeline brachytherapy module:** applicator reconstruction must be reviewed.
3. **Drop anything no longer on the vendor page,** and list it in the reply.
4. **Leave scores and structures unchanged.**

## Verify
Run the tests and the evidence-score checker, and open the TheraPanacea product pages to confirm the limitations display.

## Not done
- No git merge or branch commands. The ported content is saved as a normal Lovable change and syncs to main.
- Branch deletion is left to you on GitHub; after this, none of the three branches holds anything needed.
