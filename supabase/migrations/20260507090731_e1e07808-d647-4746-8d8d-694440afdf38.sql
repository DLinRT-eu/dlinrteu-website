-- Lock down the analytics_summary view (admins use get_analytics_* RPCs)
revoke select on public.analytics_summary from anon, authenticated;

-- Trigger / cron / service-role-only DEFINER functions: revoke EXECUTE from regular roles
revoke execute on function public.auto_grant_dlinrt_reviewer_role()                    from anon, authenticated;
revoke execute on function public.check_company_rep_limit()                            from anon, authenticated;
revoke execute on function public.check_company_role_before_product_adoption()         from anon, authenticated;
revoke execute on function public.check_products_before_company_role()                 from anon, authenticated;
revoke execute on function public.check_role_compatibility()                           from anon, authenticated;
revoke execute on function public.enforce_backup_code_quota()                          from anon, authenticated;
revoke execute on function public.cleanup_old_analytics_data()                         from anon, authenticated;
revoke execute on function public.cleanup_old_contact_submissions()                    from anon, authenticated;
revoke execute on function public.cleanup_old_security_events()                        from anon, authenticated;
revoke execute on function public.cleanup_unused_backup_codes(uuid)                    from anon, authenticated;
revoke execute on function public.expire_old_invitations()                             from anon, authenticated;
revoke execute on function public.batch_check_github_files()                           from anon, authenticated;
revoke execute on function public.check_github_file_modified(uuid, text, timestamptz)  from anon, authenticated;
revoke execute on function public.get_reviews_needing_reminders()                      from anon, authenticated;
revoke execute on function public.get_reviews_needing_reminders(integer, integer)      from anon, authenticated;
revoke execute on function public.admin_health_check()                                 from anon, authenticated;