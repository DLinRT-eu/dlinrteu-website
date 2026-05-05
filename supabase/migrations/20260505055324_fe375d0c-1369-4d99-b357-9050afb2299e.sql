DO $$
DECLARE
  fn text;
  fns text[] := ARRAY[
    'public.auto_grant_dlinrt_reviewer_role()',
    'public.check_company_rep_limit()',
    'public.check_company_role_before_product_adoption()',
    'public.check_products_before_company_role()',
    'public.check_role_compatibility()',
    'public.cleanup_old_analytics_data()',
    'public.cleanup_old_contact_submissions()',
    'public.cleanup_old_security_events()',
    'public.expire_old_invitations()',
    'public.debug_reviewer_access(uuid)',
    'public.trigger_auto_grant_dlinrt_reviewer()',
    'public.log_role_change()',
    'public.grant_admin_company_oversight()',
    'public.guard_company_rep_verified()',
    'public.guard_role_request_admin()',
    'public.handle_new_user()',
    'public.rls_auto_enable()',
    'public.update_updated_at_column()'
  ];
BEGIN
  FOREACH fn IN ARRAY fns LOOP
    BEGIN
      EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn);
    EXCEPTION WHEN undefined_function THEN
      RAISE NOTICE 'Function % does not exist, skipping', fn;
    END;
  END LOOP;
END $$;