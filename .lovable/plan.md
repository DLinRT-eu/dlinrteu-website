## Goal
Remove all Mailchimp references now that the newsletter is delivered via Resend.

## Changes

### 1. `src/pages/Subprocessors.tsx`
Remove the entire Mailchimp row from the `SUBPROCESSORS` array (lines 29–37). Bump the "Last updated" date to today.

### 2. `src/pages/PrivacyPolicy.tsx` (line 52)
Replace `"engagement (opens/clicks via Mailchimp)"` with `"engagement (opens/clicks via Resend)"`. Bump the privacy policy "Last updated" date if it's shown near the top.

### 3. `docs/ADMIN_GUIDE.md` (line 556)
Rewrite the import note to drop Mailchimp:
> "use the Import button with a CSV/XLSX export from your previous newsletter provider (e.g. a Resend audience export) — those records already carry explicit newsletter consent."

### 4. GDPR audit files (`docs/audits/gdpr/2026-06-20-initial.md`, `…-followup.md`, `…-initial.csv`)
These are historical audit records dated 2026-06-20 and accurately reflect the sub-processor list at that time. Leave their body content unchanged (audits are immutable point-in-time records) but add a single-line **Addendum** at the top of both `.md` files:
> "Addendum (2026-06-20, post-audit): Mailchimp was removed as a sub-processor after newsletter delivery migrated to Resend. See `/subprocessors`."

CSV left as-is.

### 5. Memory cleanup
- Delete the memory file `mem://infrastructure/newsletter-mailchimp-template` (no longer applicable).
- Update `mem://index.md`: remove the "Mailchimp Template" line under Memories.

### 6. Verification
Re-run `rg -li mailchimp .` — only the two historical audit files (with their new addendum) should remain.

## Out of scope
No code/edge-function changes are needed — there is no Mailchimp API client, secret, or edge function in the project (search confirms). Resend infrastructure stays as-is.
