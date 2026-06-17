## Root cause

`RESEND_API_KEY` is a Resend **Sending access** key. Resend's audiences/contacts endpoints reject it with `401 restricted_api_key`. Confirmed in the `sync-newsletter-audience` edge function logs:

```
Resend list audiences 401: {"statusCode":401,"message":"This API key is restricted to only send emails","name":"restricted_api_key"}
```

Code path: `_shared/resend-audience.ts` → called from `sync-newsletter-audience/index.ts` and `scheduled-newsletter-audience-sync/index.ts`. Both read `Deno.env.get("RESEND_API_KEY")`.

## Recommended fix — Option B: dedicated audience key

Keep the existing send-only `RESEND_API_KEY` for transactional sends. Add a new secret `RESEND_AUDIENCE_API_KEY` (Full access in Resend) and let audience operations prefer it, falling back to `RESEND_API_KEY` for backwards compatibility.

### Steps

1. **Create the secret** — request `RESEND_AUDIENCE_API_KEY` via `add_secret`. User generates it in Resend dashboard → API Keys → "Create API Key" → Permission: **Full access** (or at least audience read/write). Domain restriction can stay the same as the sending key.
2. **Update `_shared/resend-audience.ts`** — accept the API key as a parameter (already does). No change needed to the helper itself.
3. **Update both callers** to resolve the key as:
   ```ts
   const apiKey = Deno.env.get("RESEND_AUDIENCE_API_KEY") || Deno.env.get("RESEND_API_KEY");
   ```
   Files:
   - `supabase/functions/sync-newsletter-audience/index.ts`
   - `supabase/functions/scheduled-newsletter-audience-sync/index.ts`
4. **Improve error surface** — when Resend returns `restricted_api_key`, return a clear 500 body explaining "Resend key is send-only; set RESEND_AUDIENCE_API_KEY to a Full Access key" so future diagnosis is one-click.
5. **Verify** — invoke `sync-newsletter-audience` from the admin UI and re-run the cron via `supabase--curl_edge_functions` for `scheduled-newsletter-audience-sync`. Check logs are clean.
6. **Docs** — note the two-key model in `src/data/newsletters/README.md` so future maintainers don't reintroduce the single-key assumption.

## Alternative — Option A: replace the existing key

Simpler but less safe: rotate `RESEND_API_KEY` itself to a Full Access key. Same key would then send emails *and* manage audiences. Only the secret value changes; no code edits. Pick this if you don't want a second secret. Risk: any leak now exposes audience write access.

## Out of scope (do NOT change)

- The send-side functions (`send-newsletter-broadcast`, `send-contact-email`, etc.) continue to use `RESEND_API_KEY`.
- Audience sync schedule (`pg_cron` job 4 at 03:30 UTC) — already configured, unaffected.
- The `NEWSLETTER_CRON_SECRET` auth header — unchanged.

## Which option do you want?

If you confirm **Option B** I'll request the `RESEND_AUDIENCE_API_KEY` secret, patch both callers, and re-test. If you prefer **Option A**, you can rotate the key in Resend and paste it via `update_secret` — no code change needed.
