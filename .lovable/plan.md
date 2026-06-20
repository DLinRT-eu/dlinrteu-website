# Remove Paddle references

Verified: there is no Paddle SDK, checkout overlay, edge function, or secret in the codebase. Paddle survives only in privacy/sub-processor copy, historical audits, and project memory.

## Changes

### 1. `src/pages/Subprocessors.tsx`
- Remove the entire **Paddle** entry from the `SUBPROCESSORS` array.
- Bump "Last updated" date.

### 2. `src/pages/PrivacyPolicy.tsx`
- Remove the **Donations** row from the "What we collect" table (Paddle as Merchant of Record).
- In section 6 (Sub-processors & international transfers), drop "and process donations" from the intro sentence so it reads: "…to host the site, deliver email, and broadcast the newsletter."
- Bump "Last updated" date.

### 3. Historical GDPR audits (`docs/audits/gdpr/2026-06-20-initial.md` & `…-followup.md`)
- Extend the existing post-audit addendum to also note: "Paddle was removed as a sub-processor; donations are no longer processed on-site."
- CSV left as-is (immutable historical record).

### 4. Memory cleanup
- Delete `mem://features/donation-system-paddle`.
- Update `mem://index.md`: remove the "Paddle Donations" line under Memories.

### 5. Verification
Re-run `rg -li paddle .` — only the two historical audit `.md` files (with extended addendum) and the `.csv` should remain.

## Out of scope
- No route changes. `/donate → /support` redirect already exists in `src/App.tsx` and stays (harmless backstop for old links).
- No edge-function or secret changes (none exist for Paddle).
- The `/support` page is not touched unless you want donation copy removed there too — say the word and I'll fold it in.
