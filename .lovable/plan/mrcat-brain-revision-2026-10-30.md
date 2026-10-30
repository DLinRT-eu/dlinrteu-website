# MRCAT Brain revision

## 1. Compatible systems
- Add the four compatible MR systems: Ingenia 1.5T MR-RT, Ingenia 3.0T MR-RT, Ambition 1.5T MR-RT, Elition 3.0T MR-RT (to the technology/integration info and a key feature). The source is your statement plus the Philips product page / IFU where they confirm it.
- Remove "Pinnacle TPS, PACS systems" from integration only if the Philips page doesn't support it. Otherwise keep it.

## 2. Anatomical location
- The data already says "Brain", but the page shows a dash (the same display issue we saw on the Elekta pages). I'll check the live page, add the matching body-area value(s) (e.g. "Brain", plus "Head & Neck" if the IFU covers it), and confirm it shows.

## 3. On the market since
- The current release date is 20 Jan 2020 (around FDA K193109). I'll check the ESTRO 2019 announcement (April 2019) and the CE date, then set "on market since" to the first public announcement, with the announcement as the source. If the ESTRO 2019 date holds up, it becomes 2019-04.

## 4. Evidence: the three papers you sent
I'll check each one against Crossref and the abstract or full text:
- **Carbon-ion prostate sCT / fixation shell (2026, ScienceDirect S2331518026000016):** probably prostate/pelvis, not brain. If MRCAT is the generator, it goes on MRCAT Pelvis/Prostate, not Brain. If it isn't MRCAT, I won't add it.
- **MR-only CyberKnife brain metastases (Radiat Oncol 2026, 10.1186/s13014-026-02906-w):** I'll add it if MRCAT Brain is the sCT used. Likely score E1/L2.
- **CNS contouring and artefact management in an sCT workflow (Radiat Oncol 2024, 10.1186/s13014-024-02422-9):** I'll add it if it uses MRCAT. Likely E1, L2 or L1c depending on the endpoints.

Each added paper will be marked "added 2026-10-30, pending reviewer check".

## 5. Additional sources
- A targeted search (Europe PMC / Crossref) for "MRCAT" + brain/CNS/glioma papers not yet cited. I'll only add verified papers that name the product.
- I'll also clean up the existing Buschmann entry (it still has the old "I2" code) so it uses an L code.

## Checks
- Run the evidence score checker and product tests, then check the MRCAT Brain page in the preview.
