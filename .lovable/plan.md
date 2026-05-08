# SEO refresh + GoFundMe sweep

## Verification (already done)
- Searched the codebase for `gofund|gofundme` — zero matches. All buttons, links, and cards were removed in prior work.
- Only stale wording is "community donations" inside the `Transparency` SEO meta description and one sentence in `About.tsx` (line 162) about publishing donations received.

## Goal
Bring SEO titles and meta descriptions on all main pages in line with current page content, with consistent voice and proper length bounds (title <60 chars, description <160 chars). Remove any donation/GoFundMe wording from Support and Transparency SEO.

## Pages to update (SEO only)

| Page | New title (<60) | New description (<160) |
|---|---|---|
| Support (`Support.tsx`) | `Support & Contact - DLinRT` | Contact the DLinRT team, report issues on GitHub, suggest products, or join our mailing list for updates on AI in radiotherapy. |
| Transparency (`Transparency.tsx`) | `Financial Transparency - DLinRT` | Annual income and expenses for DLinRT.eu. Operational costs are covered by UMC Utrecht so the catalogue stays free and openly accessible. |
| About (`About.tsx`) | review and align (drop donation phrasing if present in SEO) | Learn about DLinRT.eu, the team behind the catalogue, our supporters (UMC Utrecht), and how user roles work on the platform. |
| Index / Home | tighten title to <60, ensure description reflects catalogue scope | — |
| Products, Companies, Initiatives, News, Pipeline, Changelog, Security, Resources, EvidenceImpactGuide, CompareStructures, Roles, RolesFAQ, Timeline, PrivacyPolicy, TermsOfUse | audit titles/descriptions for length, remove duplicate "| DLinRT" suffix issues, ensure they describe the page content accurately |

`SEO.tsx` already appends `| DLinRT`, so titles passed in must NOT include the brand suffix.

## Body content changes
- `About.tsx` line ~162: rephrase "We publish an annual overview of donations received and how they are spent." → "We publish an annual overview of income and expenses, including the support provided by UMC Utrecht."

## Out of scope
- No layout, component, or routing changes.
- No backend / edge function changes.
- `/donate` redirect to `/support` stays (harmless legacy route).

## Validation
- After edits: `rg -in "gofund|donation" src/` should return only legitimate uses (none expected).
- Spot-check title and description character counts for each updated page.
