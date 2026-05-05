# Fix: GraphQL Schema Exposure to Authenticated Users

## Finding
Supabase linter flags ~14 public tables visible in the pg_graphql schema to signed-in users (lint 0027). Each table where `authenticated` has `SELECT` is auto-introspected by `pg_graphql` and exposed at `/graphql/v1`.

## Why not the suggested per-table revoke
Supabase's recommended fix is to revoke `SELECT` on each table from `authenticated`. In this project that would break the app — PostgREST/REST (used everywhere via `supabase-js`) runs as the same `authenticated` role and relies on `SELECT` + RLS for every table the UI queries (profiles, notifications, user_roles, company_revisions, product_reviews, etc.). RLS already constrains row visibility correctly; the linter's concern is GraphQL-specific schema introspection.

## Approach
The codebase doesn't use GraphQL anywhere (no `/graphql/v1` calls, no `pg_graphql` RPCs in `src/` or `supabase/functions/`). The clean fix is to disable the GraphQL endpoint at the schema level for `anon` and `authenticated`, while leaving REST untouched.

## Migration
```sql
-- Revoke access to pg_graphql endpoints (no-op for REST)
REVOKE USAGE ON SCHEMA graphql_public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql_public FROM anon, authenticated;
REVOKE USAGE ON SCHEMA graphql FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql FROM anon, authenticated;
-- Service role retains access for any future admin tooling.
```

## Then
- Mark the `SUPA_pg_graphql_authenticated_table_exposed` finding fixed with this rationale.
- Update security memory: "GraphQL endpoint disabled for anon/authenticated; REST + RLS is the sole data-access path."
- If GraphQL is ever needed, re-grant `USAGE` on `graphql_public` and revisit per-table SELECT grants.

No frontend code changes required.
