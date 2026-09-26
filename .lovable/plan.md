# ASTRO 2026 exhibitor check for missing AI companies

Go through the ASTRO 2026 exhibitor list to find companies with AI radiotherapy products that are not in the catalogue yet. Record the check and what it found in the ASTRO/ECMP news item.

## Step 1: Collect the exhibitor list
- Open https://amportal.astro.org/exhibitors in a browser (the page loads its content with JavaScript) and save every exhibitor name and category.
- If the portal is blocked or needs a login, use ASTRO's public exhibitor PDF or floor plan instead, and say in the news item which source was used.

## Step 2: Compare with the catalogue
- Match each exhibitor against the existing companies, including archived ones and Pipeline entries.
- Skip exhibitors that clearly have no AI radiotherapy software, such as publishers, patient-support groups, hardware-only vendors and service or staffing firms.

## Step 3: Check the possible gaps, startups first
For each company left over, check its public website, press releases, the FDA 510(k)/AI device list and EUDAMED:
- **AI/deep learning**: is it documented for a core radiotherapy task? Classical or rule-based automation does not count.
- **Regulatory clearance**: does it have a recognised one (CE, FDA, MDR-exempt, NMPA, TGA, TFDA, PMDA, MFDS, Health Canada, ANVISA, MHRA or UKCA)?
- **Outcome**: add it to the catalogue (AI and cleared), add it to Pipeline (AI but pre-market, with public evidence), or leave it out and record the reason.
- New entries follow the source-disclosure rules. Evidence starts at the default scores unless peer-reviewed papers exist.

## Step 4: Update the news item
Add a section called "Exhibitor check" to `src/data/news/astro-ecmp-2026-announcements.ts` covering:
- the number of exhibitors screened, the source used and the date;
- a short list of startups and newer companies, each with its outcome (added / Pipeline / not included, with the reason) and a public source link;
- the catalogue changes, added to "What changed in the catalogue".
Vendor claims are labelled as vendor-reported, and the educational disclaimer stays.

## Deliverable
- A worksheet at /mnt/documents/astro-2026-exhibitor-check.xlsx listing each exhibitor with: in catalogue / out of scope / assessed, the outcome and the source.

## Technical notes
- Run the typecheck and `validate:evidence` after the edits. If new companies are added, register them in `src/data/companies/` with their `productIds`.
