# MVision AI: platform framing + Contour+ structure library check

## What I found

- MVision already has a platform entry, **Workspace+** (`mvision-ai-workspace-plus`), listing four modules: Contour+, Image+, Adapt+, Dose+. So unlike TheraPanacea, no new platform page is needed — but the module pages do **not** yet say they belong to that platform, and the platform page is not cross-linked from them.
- The vendor structure library on https://mvision.ai/contour/ currently publishes **223 unique structure names across 17 models**. Our stored list groups structures under **15 model names**, and several names do not line up with the vendor's:
  - Vendor models we do not list: `Jaws CT`, `Head&Neck MR`, `Abdomen MR`, `Female Pelvis MR T2`.
  - Our models not matching vendor naming: `Male Pelvis MR Dixon` (vendor says `Male Pelvis MR T2`), `Head & Neck-CT (Elective)`, `Mediastinum CT with Lymph Nodes`, `Rectum CT with Lymph Nodes (Elective)`.

## What I will do

### 1. Platform framing (mirroring TheraPanacea)
- Add a clear opening line to each MVision module page (Contour+, Image+, Adapt+, Dose+) stating it is a module of the Workspace+ platform, with a link to the platform page.
- Make sure the platform entry's module list points at our own product pages (dlinrt.eu product URLs) as well as vendor pages, and that Contour+ is listed with the same detail as the other three.
- Add Workspace+ to the MVision company product list if it is missing there.

### 2. Contour+ structure library reconciliation
- Rebuild the stored structure list directly from the published library: expand every `X_L/R` entry into left/right, and file each structure under every model the vendor lists it for.
- Align model names to the vendor's exact naming (including the four models we are missing and the `Male Pelvis MR T2` correction), keeping our `Region: Structure Name` format.
- Where our current list contains structures no longer published by the vendor, move them to a prior-version archive block with provenance (same approach used for MIM), rather than deleting them silently.
- Record the retrieval date and vendor page as source; note in the entry that the vendor advertises "300+ structures" while the searchable library publishes 223 unique names (the difference comes from left/right and per-model duplication).

### 3. Verification
- Run the evidence validator, TypeScript check, regenerate the sitemap, and open the Contour+ and Workspace+ pages to confirm counts and the platform links render.

## Notes

Only descriptive/structural data changes — no evidence scores are altered, and no clinical claims are added.
