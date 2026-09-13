# MVision Image+ split and vendor-check flags for three companies

## 1. Image+ as a standalone product

### My read on the regulatory question

The Workspace+ CE Mark Class IIa (EU MDR 2017/745, 21 Oct 2025) is recorded on the platform entry with `certificateNumber: "Certified October 21, 2025"` and no certificate identifier. What the public press release supports is that the *Workspace+ platform* is certified; it does not state a device scope per module, and there is no Image+-specific CE certificate, FDA clearance, or other authority record in the repo or in any source I can point to.

Two defensible readings:

- **A — list Image+ in `image-synthesis/` with the platform CE as its basis.** Image+ is delivered only as a Workspace+ module and is not sold separately, so it ships inside the CE-marked device. The inclusion gate resolves true through `certification: "CE"` plus `regulatory.ce.status: "cleared"`. The entry must state plainly that the mark is platform-level and inherited, and must not carry a fabricated certificate number.
- **B — put Image+ in `pipeline/`.** Consistent with a strict reading that only a module-specific clearance justifies a catalogue entry.

**My recommendation: A.** Precedent in the catalogue is that a module of a certified platform is catalogued under the platform's mark (Contour+ and Dose+ are both listed as products and are Workspace+ modules; Dose+ happens to also carry its own FDA clearance). Pipeline is for products that are *not* clinically available; Image+ is clinically available inside a CE-marked device, so `pipeline/` would misdescribe it. I would like your confirmation on A before I write the file, because it is a judgement call about the mark's scope, not a fact I can source.

Whichever you pick, the entry will carry:
- `certification: "CE"`, `regulatory.ce` = cleared / IIa / MDR 2017/745, with `notes` stating the mark is the Workspace+ platform certification of 21 Oct 2025 and that no Image+-specific certificate is published. No invented certificate number.
- `regulatory.fda`: `not_applicable`, with the same wording used on Workspace+ (no platform-level FDA clearance; the Dose+ FDA clearance is module-specific and not applicable to Image+).
- `intendedUseStatement`: **not filled in.** No Image+-specific intended-use text exists in any source I have. I will leave the field absent rather than paraphrase the platform statement.

### Adapt+ — data consistency

Splitting only Image+ does leave an asymmetry: after the change, three of four Workspace+ modules resolve to DLinRT pages and Adapt+ alone points at the vendor site. That is visible but not incorrect — `integratedModules[].productUrl` already accepts vendor URLs, and the Workspace+ `source` sentence can be rewritten to name Adapt+ specifically as the remaining module without a standalone entry.

Cost of doing Adapt+ in the same pass: it is the same shape of work — a new `src/data/products/registration/mvision.ts` entry (that file exists and exports an empty array, same as image-synthesis), an export line, one `productIds` addition, one module `productUrl` repoint. Its `categoryEvidence["Registration"]` block (E0/I0, no standalone peer-reviewed validation) is already in the platform file. It rests on the same platform CE mark, so it inherits the same open question as Image+. Roughly 20 percent extra effort on top of Image+ and it removes the asymmetry entirely. **Say the word and I will do both; otherwise Image+ only.**

### The new entry

New file `src/data/products/image-synthesis/mvision.ts`, replacing the empty array, exporting `MVISION_IMAGE_SYNTHESIS_PRODUCTS` with one product:

- `id: "mvision-image-plus"`, `name: "Image+"`, company/companyUrl/logo as on the other MVision entries, `productUrl: "https://mvision.ai/image/"`, `githubUrl` pointing at the new file.
- `description`, `keyFeatures`, `features`: from the Image+ `integratedModules` block — brain MR T1 sCT, pelvis MR T2 sCT, CBCT→sCT, VNC from contrast-enhanced CT, MR-only planning, offline adaptive workflow.
- `category: "Image Synthesis"`, no secondary categories.
- `anatomicalLocation`: Brain, Pelvis (the only sites the module block names). `modality`: MRI, CBCT, CT. `diseaseTargeted`: as tagged consistently with the other MVision entries.
- `technicalSpecifications`: input CT/MRI/CBCT + DICOM formats, output synthetic CT images, DICOM.
- `technology.deployment`/`integration`: inherited from Workspace+ (cloud-native, PACS/TPS), noted as platform-level.
- `partOf: { name: "Workspace+", productUrl: "https://dlinrt.eu/product/mvision-ai-workspace-plus", relationship: "Module" }` — matching the Dose+ pattern.
- Evidence: `evidenceRigor: "E0"`, `clinicalImpact: "I0"`, notes carried over verbatim in substance from `categoryEvidence["Image Synthesis"]` (vendor/internal validation only, no module-specific peer-reviewed publication located), the five `evidenceVendorIndependent`-style booleans all false, `adoptionReadiness` derived per the rubric with a stated rationale.
- `trainingData` / `evaluationData`: **omitted.** No disclosed source describes Image+ training or evaluation data. I will not populate them.
- `market.onMarketSince: "2025"` (platform CE date), `releaseDate: "2025-10-21"` with the source noted as the platform certification date used as a proxy.
- `limitations`: assistive output requires clinician review; sCT accuracy depends on acquisition protocol; regulatory basis is the platform mark.
- `source`: names the vendor Image+ page and the CE press release, states the split date and that the content was migrated from the Workspace+ module block, and records the retrieval date.
- `lastUpdated` / `lastRevised`: date of the implementation pass.

### Wiring

1. `src/data/products/image-synthesis/index.ts` — import and spread `MVISION_IMAGE_SYNTHESIS_PRODUCTS`.
2. `src/data/companies/auto-contouring.ts` line 115 — add `"mvision-image-plus"` to `productIds`.
3. `src/data/products/platform/mvision.ts` — Image+ module `productUrl` → `https://dlinrt.eu/product/mvision-image-plus`; keep `categoryEvidence["Image Synthesis"]` (it describes the platform's synthesis capability) and add a pointer to the new entry in its notes.
4. Same file, `source` — replace "Image+ and Adapt+ have no standalone DLinRT entries, so their module links point at the vendor pages" with wording that names only Adapt+ (or drops the sentence, if we split both).
5. Regenerate the sitemap; verify `/product/mvision-image-plus` returns 200.

## 2. Vendor check pending — the right mechanism

There is no product field that means "a vendor check is outstanding", and I do not want to add one. `lastRevised` and `companyRevisionDate` both mean "was checked/revised on", the opposite of what you need, and stay untouched.

**Recommendation: the existing reviewer-assignment workflow.** The Supabase schema already has `review_rounds`, `product_reviews` (with `product_id`, `assigned_to`, `deadline`, `status` = pending, `priority`), and `assignment_history`. `/review` drives it and reviewers get notified via `notify-reviewer-assignment`. A pending `product_reviews` row *is* the canonical "still needs checking" record, it is per-product, it has an owner and a deadline, and it shows up in the reviewer dashboards and pending counts without any schema change.

Proposed setup:
- One review round, e.g. "Vendor check — Sep 2026".
- Assignments: MVision AI's products (scope note: evidence/papers), TheraPanacea's seven (Annotate, TumorBox, BrachyBox, AdaptBox, SmartFuse, SmartPlan, ART-Plan), Manteia's three (AccuContour, AccuLearning, MOZI TPS).
- The MVision-specific "papers/evidence" scope goes in the round description or per-assignment notes, not in a product file.

Two things I need from you before I create anything: **who each assignment goes to** (a reviewer, or all to you), and **the deadline**. Without those, the alternative is that I only describe the round and you create it from `/review` yourself.

If you would rather the pending state be visible on the public product pages, that is a different and larger change (a new field plus UI) and I would rather not fold it into this pass.

## 3. Verification

- `npx tsgo --noEmit -p tsconfig.app.json`
- `npm run validate:evidence`
- `npm run lint`
- Confirm MVision now lists five products on the company page, the Image Synthesis category count increments by one, and the Workspace+ page still renders four modules with Adapt+ as the only vendor-site link.

## Open questions

1. Regulatory basis for Image+ — confirm option A (catalogue under the platform CE mark, scope stated) or choose B (`pipeline/`).
2. Split Adapt+ in the same pass, or Image+ only?
3. Reviewer and deadline for the vendor-check round — or shall I leave creating it to you in `/review`?
