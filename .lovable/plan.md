## Goal
Persist the GDPR audit deliverables in the repo and consolidate documentation so each topic lives in exactly one logical place.

## 1. Store GDPR audits in the repo

Create `docs/audits/gdpr/` and copy the three audit artifacts out of the ephemeral `/mnt/documents`:

```
docs/audits/
  README.md                         # index of all audits, links per topic
  gdpr/
    2026-06-20-initial.md           # from gdpr-audit-2026-06-20.md
    2026-06-20-initial.csv          # from gdpr-audit-2026-06-20.csv
    2026-06-20-followup.md          # from gdpr-audit-2026-06-20-followup.md (Wave E)
```

`docs/audits/README.md` lists each audit (GDPR initial + Wave E follow-up, with status: 10/12 closed, 2 deferred → rate limiting + custom-domain header propagation) and points to the remediation plan in `.lovable/plan.md`.

Add a section "GDPR audit history" to `SECURITY.md` linking to `docs/audits/gdpr/`. Keep `SECURITY.md` as the policy doc; audits as evidence.

## 2. Documentation overlap cleanup

Current overlap:

| Topic | Duplicated in |
|---|---|
| Top-level doc index | `DOCUMENTATION_LINKS.md` (root) and `docs/README.md` |
| Reviewer workflow | `docs/REVIEWER_GUIDE.md` (736 lines) and `docs/review/GUIDE.md` (331 lines) |
| Field definitions | `docs/FIELD_REFERENCE.md` referenced from multiple places without canonical owner |
| Route lists | `DOCUMENTATION_LINKS.md` and `docs/README.md` both enumerate `/admin/*`, `/reviewer/*`, etc. |

Target layout:

```
README.md                       # project overview, quick links → docs/
SECURITY.md                     # security policy + link to docs/audits/gdpr/
CONTRIBUTING.md                 # contribution flow
CODE_OF_CONDUCT.md
MANUFACTURER_TEMPLATES.md       # stays at root (external-facing templates)

docs/
  README.md                     # SINGLE doc index (role-based + topic-based nav, route list)
  ADMIN_GUIDE.md                # admin workflows only
  REVIEWER_GUIDE.md             # reviewer workflows only (preferences, dashboard, visual editing)
  REVIEWER_ASSIGNMENT_GUIDE.md  # assignment algorithm details (admin-leaning reference)
  FIELD_REFERENCE.md            # canonical field schema (sole owner)
  review/
    GUIDE.md                    # product-data review rubric (evidence, categories, structures)
    README.md                   # short pointer → GUIDE.md + FIELD_REFERENCE.md
  audits/
    README.md
    gdpr/...
  examples/                     # unchanged
```

Changes:

1. **Delete `DOCUMENTATION_LINKS.md`** (root). Fold any unique content (Healthcare Interoperability summary, route lists) into `docs/README.md`. Update `README.md` to link to `docs/README.md` as the single entry point.
2. **`docs/README.md`** becomes the canonical index: role-based nav, topic nav, full route list, healthcare interoperability summary, audit pointer.
3. **`docs/REVIEWER_GUIDE.md` vs `docs/review/GUIDE.md`** — split by audience:
   - `REVIEWER_GUIDE.md` keeps platform-side workflow (logging in, preferences, dashboard, visual editor, deadlines).
   - `review/GUIDE.md` keeps data-side rubric (evidence axes, categories, structure naming, regulatory rules).
   - Remove the duplicated "How to review a product" section from one of them (keep in `review/GUIDE.md`) and cross-link.
4. **`docs/review/README.md`** trimmed to ~10-line pointer to `review/GUIDE.md` and `FIELD_REFERENCE.md`.
5. **Field references** — every field-name mention in other docs replaced with a link to `FIELD_REFERENCE.md` (no inline redefinitions).
6. **Update cross-links** in `README.md`, `SECURITY.md`, `CONTRIBUTING.md`, and `.lovable/plan.md` so nothing points to the deleted `DOCUMENTATION_LINKS.md`.

## 3. Verification

- `rg "DOCUMENTATION_LINKS"` returns no hits.
- `rg "docs/REVIEWER_GUIDE|docs/review/GUIDE|FIELD_REFERENCE"` resolves to existing files.
- New `docs/audits/gdpr/` contains 3 files; `docs/audits/README.md` lists them.
- No code changes; no product data touched.

## Out of scope
- Rewriting guide content (only moves, dedupes, and pointer updates).
- The 2 deferred Wave E items (rate limiting, custom-domain headers) — tracked in `docs/audits/README.md` only.

Confirm and I'll execute.