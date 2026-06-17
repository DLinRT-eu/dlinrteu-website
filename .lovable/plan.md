The API key is stored and read in Supabase Edge Function secrets, not in frontend code. Resend is still involved because the key itself must be created in Resend with Full Access. The latest logs show the deployed function is still using a sending-only key for audience calls.

Plan:
1. Verify the `RESEND_AUDIENCE_API_KEY` Supabase secret was saved as a Resend Full Access key, and update it if needed.
2. Update the remaining newsletter broadcast function to also use `RESEND_AUDIENCE_API_KEY` for audience/broadcast operations, not only `RESEND_API_KEY`.
3. Add clearer runtime checks/error text so failures distinguish:
   - missing Supabase secret
   - sending-only Resend key
   - other Resend API errors
4. Deploy the affected Edge Functions and test the sync endpoint again.
5. Re-check Edge Function logs to confirm `restricted_api_key` no longer appears.

Technical note: `RESEND_API_KEY` can remain sending-only for plain transactional/test email sends, but any audience, contact, or broadcast operation must use a Full Access key exposed to Supabase as `RESEND_AUDIENCE_API_KEY`.