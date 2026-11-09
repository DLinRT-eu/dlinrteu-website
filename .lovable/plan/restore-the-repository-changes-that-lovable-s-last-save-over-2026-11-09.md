# Restore the repository changes that Lovable's last save overwrote

## What happened
Two pull requests were merged on GitHub at 15:50–15:51 (Amsterdam time) today:
- PR #157 (Federico Mastroleo): public-evidence corrections for ten assigned products, plus an audit record (`docs/audits/products/2026-11-08/assigned-products-revision.json`).
- PR #159 (pjdoolan1): AIQUALIS (PTW) version changed from 1.2 to 2.0.

Lovable then saved its own work (Kareem/EUDAMED changes) at 16:00. In that merge Lovable's version won for every file, so both pull requests are effectively undone on `main`: the audit JSON was deleted and all eleven product files went back to their pre-PR content. Lovable and GitHub are now in sync (no divergence), so nothing is blocked. The PR content just has to be put back on top of today's work.

## What I will do
1. **Re-apply PR #159:** set the AIQUALIS version to 2.0.
2. **Re-apply PR #157 exactly as merged** for the nine files only that PR touched: TheraPanacea BrachyBox, Lumonus, AIRATO, InformAI, Manteia MOZI, MD Anderson, RaySearch planning, Sun Nuclear and Wisdom Tech planning. Also restore the audit JSON.
3. **Merge the one shared file by hand:** AtomoAI iSecare was edited in both places.
   - Keep from Federico: the homepage naming note, statuses fixed to the catalogue's own values, "Not publicly disclosed" input format, no structure list, the Northwestern commercialisation source, and his notes.
   - Keep from today: the fuller Sarkar 2025 citation (authors, journal, cohorts), the founder/technical-lead link and the updated limitation.
   - Drop the duplicate Sarkar entry. E0 stays.
4. **Check MOZI and Wisdom against today's work:** confirm the restored versions don't drop today's ARTAssistant link (MOZI) or clash with the Wisdom DeepContour change (that's a separate auto-contouring file, so no clash is expected).
5. **Verify:** run the tests, the evidence-score checker and the build, and open the affected product pages.

## Not changed
- No git commands are run. The restored content is saved as a normal Lovable change, which syncs to `main` automatically.
- The old `lovable-backup-main-*` branches on GitHub hold nothing that isn't already on `main`; you can delete them.

## To avoid this next time
Merge pull requests while Lovable is idle, or tell me right after a merge, so the next save starts from the merged version.
