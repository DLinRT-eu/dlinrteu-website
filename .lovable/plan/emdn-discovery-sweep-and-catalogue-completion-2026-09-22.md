# EMDN discovery sweep and catalogue completion

## Goal

Run a reproducible EUDAMED discovery sweep to find CE-registered European products that may be missing from DLinRT, then add only products that meet DLinRT inclusion rules.

One correction is built into the plan: official EMDN sources identify the radiotherapy/radiosurgery branch as `Z1101`, while `Z1104` appears to be an ultrasound branch. Per your answer, I will sweep both `Z1101` and `Z1104`, treating `Z1101` as the primary radiotherapy branch and `Z1104` as a cross-check.

## Plan

1. **Add a dedicated discovery script**
   - Create a read-only script for EMDN discovery, separate from the existing known-name EUDAMED audit.
   - Reuse the existing EUDAMED HTTP patterns: throttling, retries, cache, tolerant parsing, query URLs on every row.
   - Add a package script such as `audit:eudamed:discovery` and document usage.

2. **Resolve the EMDN branch scope**
   - Download or parse the current official EMDN nomenclature source.
   - Extract all descendant/leaf codes under `Z1101` and `Z1104`.
   - Record the exact branch labels in the output so later reviewers can see which branch each hit came from.

3. **Sweep EUDAMED for devices**
   - Query the public EUDAMED device search for each branch/leaf code, with pagination and drift checks.
   - Include all relevant device states and legislation partitions where available, so legacy MDD and MDR records are not missed.
   - De-duplicate by EUDAMED device UUID / Basic UDI-DI / Primary DI.
   - Enrich each device with Basic UDI-DI detail when available: registered trade name, manufacturer SRN, risk class, device status, certificates, notified body, medical purpose, and source URL.
   - If a server-side EMDN filter is unreliable, detect that by comparing result totals and fail safe with a clear report rather than trusting an unfiltered result.

4. **Diff against DLinRT**
   - Match discovered records against existing products using Basic UDI-DI first, then manufacturer SRN + trade name, then fuzzy name matching.
   - Classify each row as already recorded, likely duplicate, missing candidate, non-RT, non-AI/unclear, or needs manual review.
   - Produce Markdown, CSV, and JSON outputs under `docs/audits/eudamed/`.

5. **Screen missing candidates before adding**
   - For each plausible missing candidate, verify from public sources whether it uses AI/deep learning for a core radiotherapy function.
   - Use DLinRT inclusion rules: clinical RT relevance and AI/DL disclosure are required; CE registration alone is not enough.
   - Products with regulatory registration but insufficient AI/RT disclosure stay in the audit report, not the catalogue.
   - Pre-market or incomplete disclosures go to `pipeline/` only when there is enough intended-use and AI disclosure.

6. **Add confirmed products**
   - Add product entries to the correct category folder, or pipeline if appropriate.
   - Add new companies when needed and update company `productIds`.
   - Include EUDAMED blocks only for confirmed matches, with Basic UDI-DI, risk class, manufacturer SRN, query URL, and check date.
   - Fill evidence scores conservatively: regulatory-only or vendor-only evidence stays `E0`; no DOI or source is invented.
   - Leave unavailable factual fields empty or explicitly “not publicly disclosed”.

7. **Update supporting docs and validation**
   - Document the discovery script in `scripts/README.md` and `docs/audits/README.md`.
   - Keep the existing educational safety framing and the EUDAMED caveat: absence from EUDAMED is not proof of no CE mark.
   - Run the standard checks after implementation: typecheck, evidence validation, and a page-load check for any newly added product/company.

## Outputs you will get

- A repeatable EMDN discovery command.
- A dated discovery report and spreadsheet listing all discovered devices, matches, and missing candidates.
- Catalogue additions only for products that pass DLinRT’s AI/DL + radiotherapy + source-disclosure criteria.
- A clear list of rejected or unresolved candidates with reasons.

## Not in scope

- No database schema changes.
- No automatic catalogue insertion from EUDAMED alone.
- No claim that EUDAMED registration proves clinical validation.
- No changes to `lastRevised` or `companyRevisionDate`; EUDAMED data uses its own checked date.
