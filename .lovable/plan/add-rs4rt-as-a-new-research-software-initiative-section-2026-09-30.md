# Add RS4RT as a new "Research Software" initiative section

RS4RT ("Resource-Sharing for Radiotherapy") is a community that catalogues open-source
research software for radiotherapy. It lives on rs4rt.org and is indexed in the Research
Software Directory (RSD) community at
https://research-software-directory.org/communities/rs4rt/software, which lists packages
such as CERR, CIL, AMIGOpy, conehead and ClearCanvas. It is a software catalogue, not an
AI model hub, so it gets its own section on /initiatives rather than joining Model Zoos.

## New entry

One initiative in a new `Research Software` category:

- Name: RS4RT, organization: RS4RT community, status Active, website https://rs4rt.org
- Additional link (second button on the card): "Browse software on RSD" →
  https://research-software-directory.org/communities/rs4rt/software
- Description: resource-sharing platform for radiotherapy — open-source software, data,
  AI tools, commercial solutions and educational resources; the software catalogue is
  curated in the Research Software Directory (per-package metadata, code and licenses).
- Features: community-curated catalogue of open-source RT research software; per-package
  RSD entries with repository links; subject areas including treatment planning and
  dosimetry, imaging, and clinical workflow; complementary links to datasets, AI tools
  and educational resources.
- Tags: Open Source, Research Software, Radiotherapy, Community, Software Catalogue.
- `lastVerified` set to the implementation date; no logo (none published).
- A short non-AI note: only part of the catalogue is AI; the collection is broader
  research software, listed as a resource hub — no regulatory clearance implied.

## Code changes

- `src/types/initiative.d.ts`: add optional `additionalLinks?: { label: string; url: string }[]`.
- `src/data/initiatives/researchsoftware.ts` (new): the RS4RT entry above.
- `src/data/initiatives/index.ts` and `src/data/index.ts`: import/export `RESEARCH_SOFTWARE_INITIATIVES`.
- `src/hooks/useInitiativesSorting.ts`: add a `researchSoftware` group filtered on
  category `'Research Software'`, returned alongside the existing groups.
- `src/components/initiatives/InitiativesCategorySections.tsx`: new props + a
  `CategorySection` titled "Research Software" with an icon and a one-line description
  (curated open-source research software collections; research tools, not cleared devices).
- `src/pages/Initiatives.tsx`: pass the new group through.
- `src/components/initiatives/InitiativeCard.tsx`: render an extra outline button per
  `additionalLinks` entry below "Visit Website" (same layout, ExternalLink icon).

Product data, filters logic and scoring are untouched; the category filter on
/initiatives derives its options from the data, so "Research Software" appears there
automatically.

## Verification

- Typecheck, then load `/initiatives` in the browser: RS4RT renders under the new
  Research Software section with both buttons working, and the category filter lists it.
