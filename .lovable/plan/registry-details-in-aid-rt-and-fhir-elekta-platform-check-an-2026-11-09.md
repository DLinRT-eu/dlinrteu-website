# Registry details in AID-RT and FHIR, Elekta platform check, and Kareem's suggestions

## 1. AID-RT model card: add EU registry details
- Add an EUDAMED block to the AID-RT export (single and bulk): Basic UDI-DI, UDI-DI, the **device-type code (EMDN) as its own field**, manufacturer name and SRN, and a note on what the registration covers (platform or other manufacturer).
- Put the fields under `model_basic_information`, next to the existing clearance fields. Add them to the field mapping table and mark them as "DLinRT extension", because AID-RT has no native slot for them.
- In the FHIR download, also send the EMDN code as its own classification code, separate from the UDI identifiers.

## 2. Monaco and IRIS: platform registration check
- Look up the parent platforms in EUDAMED under every Elekta manufacturer number: Monaco treatment planning system for the Monaco Segmentation Component, and Versa HD / the Linac "ELMA" family for IRIS Evo.
- Record a hit only as a platform registration, using the same wording as Synchrony (under CyberKnife) and DLC Expert (under RTx). Then rerun the registry script so pages and downloads show it.
- If nothing is found, add a short "not found in EUDAMED (searched 2026-11-09)" line covering the product and its platform. Also carry that line into the downloads, which closes the gap left open last time.

## 3. Kareem's pending suggestions
- Load every pending edit draft from Kareem. Check each change against its sources (FDA, Crossref, vendor pages) and against house style: first author plus "et al.", Levels of Efficacy labels, British spelling, the short "Data Source" line, "Region: Structure" names, and no reviewer names in notes.
- Apply the suggestions after fixing their style. Wherever a suggestion is unsupported or only partly right, finish or correct it ("push further"), for example with missing DOIs or newer clearances. New papers are scored and marked "pending reviewer check".
- Mark the drafts applied, with review notes explaining each adaptation.

## Checks
- Catalogue tests, the evidence score checker, a new test for the EMDN field in the AID-RT and FHIR downloads, and a browser check of the edited product pages.

## Open risk
- An Elekta platform match may be ambiguous, such as a broad "Linac" registration. If it is, I'll report it as a candidate and won't show it on the page.
