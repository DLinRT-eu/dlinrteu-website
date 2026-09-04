# Fix "permission denied for function admin_health_check"

## What's wrong

The Permission Diagnostics panel calls a database helper named `admin_health_check`. That helper was never granted permission to be run by signed-in users — only by the database owner and internal service role. So every signed-in admin gets "permission denied" (code 42501) instead of a result.

Verified: the function exists and runs with elevated rights, but its access list contains only `postgres` and `service_role`, unlike the sibling helpers (`is_admin`, `has_role`, `get_all_user_roles`, `get_highest_role`) which all allow signed-in users.

## Is it safe to open up?

Yes. The function only reports facts about the person calling it: their own user id, whether they hold the admin role, whether they can manage reviews, whether they can view security data, their own roles, and a timestamp. It takes no arguments and cannot be pointed at another user, so it leaks nothing about anyone else.

## The change

One database migration:

- `GRANT EXECUTE ON FUNCTION public.admin_health_check() TO authenticated;`
- Leave anonymous visitors without access.

No frontend or edge-function changes needed.

## Verification

After the migration, confirm the access list includes `authenticated`, then run the diagnostics panel while signed in as an admin and check it shows the user id, admin status true, and the role list.
