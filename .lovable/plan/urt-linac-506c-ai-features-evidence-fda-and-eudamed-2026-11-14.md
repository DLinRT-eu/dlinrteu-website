# uRT-linac 506c: AI features, evidence, FDA and EUDAMED

## Current state
- The catalogue already has **uRT Auto-Planning** and **uRT Auto-Contouring** (United Imaging). Auto-Planning names the uRT-linac 506c as its integration and lists "CE (uRT-linac 506c system)". It has no FDA number and only one paper (Ma and Zhou, Cureus 2024, two patients).
- There is no separate entry for the linac itself, and no EUDAMED match for United Imaging RT products yet.
- Vendor pages say the 506c includes AI auto-contouring (100+ models), one-click auto-planning, EPID QA and online adaptive (uCT-ART). A third-party site cites FDA K191157 (2019). That number has not been checked against the FDA database yet.

## Step 1: Research (read-only, every item checked against its source)
1. **FDA:** search openFDA/accessdata for all United Imaging RT 510(k)s (K191157 and any later uRT-linac, uRT-TPOIS or uCT-ART clearances). Read each summary for AI/DL wording, predicate, intended use and date.
2. **EUDAMED:** run the existing Data Lake lookup for United Imaging (SRN, trade names "uRT-linac 506c", "uRT", "uCT-ART"). Keep only exact or editor-confirmed matches.
3. **CE:** look for the notified body, class and certificate behind the "CE-marked" claim (company announcement 2026-027 and the ESTRO and partner press releases of May 2026).
4. **Evidence:** search PubMed and Crossref for peer-reviewed studies of the AI on the 506c: auto-contouring, auto-planning, uCT-ART adaptive, and any deep-learning CT image processing on the onboard CT. Confirm each DOI. Score with E0–E3 and Levels of Efficacy 1t–6, and mark vendor-employee authors and research-only versions.

## Step 2: Decide where the findings go
- **Default:** add the findings to the existing Auto-Planning and Auto-Contouring entries: FDA number(s), CE details, EUDAMED match, new papers and 506c integration.
- **New "uRT-linac 506c" entry:** only if a regulatory document shows the linac clearance itself covers a deep-learning function (for example DL contouring or adaptive planning inside the 510(k) or CE scope). It would be listed under Treatment Planning with Auto-Contouring as a secondary category. Product inclusion rules: AI/DL core function and a recognised approval.
- Anything I can't confirm (for example CE scope for the AI modules) stays out and goes into the report.

## Step 3: Apply and check
- Edit only the United Imaging product files. Add an EUDAMED match only through the existing verification script, never by hand. Every new field gets a disclosed source and today's review date.
- Run the evidence checker and the existing tests.
- Write a short report covering what was added, what was rejected and why, and what is still open.

## Technical notes
- Files: `src/data/products/treatment-planning/united-imaging.ts`, `src/data/products/auto-contouring/united-imaging.ts`, and a possible new entry in the same folders. EUDAMED: `scripts/verify-eudamed.ts` → `udiVerified.json`.
- Nothing is shown as clinically validated, and vendor-reported times stay labelled as vendor-reported.
