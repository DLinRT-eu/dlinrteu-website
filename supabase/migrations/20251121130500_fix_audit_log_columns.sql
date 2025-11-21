-- Add admin_user_id column for compatibility with admin logging
ALTER TABLE public.admin_audit_log
ADD COLUMN IF NOT EXISTS admin_user_id UUID;

UPDATE public.admin_audit_log
SET admin_user_id = performed_by
WHERE admin_user_id IS NULL;
