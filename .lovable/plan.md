

# Revise Flyers, Fix CORS Gaps, Verify Notifications & Settings

## 1. Regenerate Flyers with Correct Brand Color

**Problem**: Flyers currently use `#2AA5A5` (teal) but the website uses `#00A6D6` everywhere — header (`bg-[#00A6D6]`), buttons, checkboxes, chart fills, filter icons, category cards. The flyers must match.

**Fix**: Regenerate both PDFs with:
- Primary accent: `#00A6D6` (website brand blue) instead of `#2AA5A5`
- Dark text: `#1a1a2e` (unchanged)
- Logo embedded from `public/LogoDLinRT.eu.png`
- All other content unchanged from current version

**Files**:
- Create `/tmp/generate_flyers_v6.py`
- Overwrite `public/flyers/DLinRT_Community_ESTRO2026.pdf`
- Overwrite `public/flyers/DLinRT_Companies_ESTRO2026.pdf`

## 2. Fix CORS Gaps in 4 Edge Functions

Four functions have incomplete CORS support:

| Function | Issue |
|----------|-------|
| `delete-account` | Missing `.lovable.app` wildcard |
| `admin-delete-user` | Missing `.lovable.app` wildcard |
| `store-backup-code` | Missing `www.dlinrt.eu` |
| `verify-backup-code` | Missing `www.dlinrt.eu` |

**Fix**: Update the `getCorsHeaders` function in each to use the standard pattern with both `www.dlinrt.eu` in the allowlist and `.lovable.app` wildcard check.

## 3. Verify www.dlinrt.eu Support

Already confirmed working:
- `vite.config.ts` `allowedHosts` includes `www.dlinrt.eu`
- All 20 edge functions include `https://www.dlinrt.eu` in CORS lists
- Custom domain setup is a hosting/DNS concern outside the codebase (A record + www subdomain pointing to Lovable IP)

No code changes needed for this beyond the 4 CORS fixes above.

## 4. Test Notifications, Email Settings & Post-Login Flow

After the above changes, use the browser to:
- Log in as admin and verify dashboard navigation works
- Check notification preferences page loads and saves correctly
- Verify the notification digest controls are accessible
- Confirm the email settings (digest frequency selector) functions properly

## Scope

- 1 new script (`/tmp/generate_flyers_v6.py`)
- 2 PDF files overwritten
- 4 edge function files edited (CORS fix only)
- Browser testing of post-login flows

