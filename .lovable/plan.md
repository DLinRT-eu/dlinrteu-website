

## Plan: Re-confirm and mark "Overly broad user_products PII sharing" as fixed

### Current state (verified against live DB)

The fix the finding asks for is **already deployed**. Migration `20260330130104_…sql` did exactly what the finding requests:

1. ✅ `DROP POLICY user_products_select_shared` — no longer exists on `user_products`.
2. ✅ `user_products_select_reviewer` is scoped to assigned, active reviews only:
   ```
   willing_to_share_experience = true
   AND has_role(auth.uid(), 'reviewer')
   AND EXISTS (SELECT 1 FROM product_reviews pr
               WHERE pr.product_id = user_products.product_id
                 AND pr.assigned_to = auth.uid()
                 AND pr.status NOT IN ('completed','rejected'))
   ```
3. ✅ The dependent view `user_product_experiences` was recreated with `security_invoker = true` so it inherits these RLS rules.

Live `pg_policy` snapshot confirms the only SELECT policies on `user_products` are: `_own`, `_admin`, `_company` (own company reps, share-flag gated), `_reviewer` (assigned + active only). No broad `_shared` policy exists.

### Action

Single `security--manage_security_finding` call:
- `operation: mark_as_fixed`
- `scanner_name: agent_security`
- `internal_id: user_products_shared_pii`
- `explanation`: cite the migration, list the four remaining SELECT policies, confirm the view uses `security_invoker = true`.

### No code, DB, or migration changes

The finding was previously ignored; the user wants it un-ignored. Marking it as fixed (rather than ignored) accurately reflects reality and removes it from the active findings list.

### Files touched

None.

