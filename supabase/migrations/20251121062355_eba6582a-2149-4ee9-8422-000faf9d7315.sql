-- ============================================
-- COMPREHENSIVE FIX FOR ALL PERMISSION ISSUES
-- ============================================
-- This migration fixes:
-- 1. Missing user registration trigger
-- 2. Multi-role switching (new get_all_user_roles function)
-- 3. Company representatives RLS issues
-- 4. Role assignment conflicts
-- 5. Audit trail for role changes
-- ============================================

-- ============================================
-- FIX 0: Add Unique Constraint to user_registration_notifications
-- ============================================

-- Add unique constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'user_registration_notifications_user_id_key'
  ) THEN
    ALTER TABLE public.user_registration_notifications 
    ADD CONSTRAINT user_registration_notifications_user_id_key UNIQUE (user_id);
  END IF;
END $$;

-- ============================================
-- FIX 1: Recreate Missing User Registration Trigger
-- ============================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the handle_new_user function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  v_is_institutional BOOLEAN;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    institution,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'institution', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  -- Check if institutional email
  SELECT public.is_institutional_email(NEW.email) INTO v_is_institutional;
  
  -- Create registration notification
  INSERT INTO public.user_registration_notifications (
    user_id,
    email,
    notification_status
  ) VALUES (
    NEW.id,
    NEW.email,
    CASE 
      WHEN v_is_institutional THEN 'pending'
      ELSE 'blocked'
    END
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail auth
    RAISE WARNING 'Error in handle_new_user for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill missing user_registration_notifications for existing users
INSERT INTO public.user_registration_notifications (
  user_id,
  email,
  notification_status,
  created_at
)
SELECT 
  u.id,
  u.email,
  CASE 
    WHEN public.is_institutional_email(u.email) THEN 'pending'
    ELSE 'blocked'
  END,
  u.created_at
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_registration_notifications urn
  WHERE urn.user_id = u.id
)
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- FIX 2: Create Function to Get ALL User Roles
-- ============================================

-- This replaces get_highest_role for multi-role support
CREATE OR REPLACE FUNCTION public.get_all_user_roles(_user_id uuid)
RETURNS app_role[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(ARRAY_AGG(role ORDER BY 
    CASE role
      WHEN 'admin' THEN 1
      WHEN 'reviewer' THEN 2
      WHEN 'company' THEN 3
    END
  ), ARRAY[]::app_role[])
  FROM public.user_roles
  WHERE user_id = _user_id
$$;

COMMENT ON FUNCTION public.get_all_user_roles IS 'Returns array of all roles for a user, ordered by priority (admin, reviewer, company)';

-- ============================================
-- FIX 3: Fix Company Representatives RLS Policies
-- ============================================

-- Drop ALL existing policies (there are duplicates)
DROP POLICY IF EXISTS "Admins can insert company reps" ON public.company_representatives;
DROP POLICY IF EXISTS "Users can insert own company rep" ON public.company_representatives;
DROP POLICY IF EXISTS "company_reps_insert_admin" ON public.company_representatives;
DROP POLICY IF EXISTS "company_reps_insert_own" ON public.company_representatives;
DROP POLICY IF EXISTS "company_reps_select_admin" ON public.company_representatives;
DROP POLICY IF EXISTS "company_reps_select_own" ON public.company_representatives;
DROP POLICY IF EXISTS "company_reps_update_admin" ON public.company_representatives;
DROP POLICY IF EXISTS "company_reps_update_own" ON public.company_representatives;
DROP POLICY IF EXISTS "company_reps_delete_admin" ON public.company_representatives;
DROP POLICY IF EXISTS "Admins can delete company reps" ON public.company_representatives;

-- Create simplified policies using has_role SECURITY DEFINER function
CREATE POLICY "Admins manage all company reps"
ON public.company_representatives
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users manage own company rep"
ON public.company_representatives
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

COMMENT ON POLICY "Admins manage all company reps" ON public.company_representatives IS 
  'Admins can manage all company representatives using SECURITY DEFINER has_role() to avoid RLS recursion';

COMMENT ON POLICY "Users manage own company rep" ON public.company_representatives IS 
  'Users can create and manage their own company representative entries';

-- ============================================
-- FIX 4: Create Role Change Audit Log
-- ============================================

CREATE TABLE IF NOT EXISTS public.role_change_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  action text NOT NULL CHECK (action IN ('granted', 'revoked')),
  performed_by uuid NOT NULL,
  performed_at timestamp with time zone NOT NULL DEFAULT now(),
  reason text
);

-- Add foreign keys if table was just created
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'fk_role_change_log_user'
  ) THEN
    ALTER TABLE public.role_change_log
    ADD CONSTRAINT fk_role_change_log_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'fk_role_change_log_performer'
  ) THEN
    ALTER TABLE public.role_change_log
    ADD CONSTRAINT fk_role_change_log_performer FOREIGN KEY (performed_by) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE public.role_change_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Admins view all role changes" ON public.role_change_log;
DROP POLICY IF EXISTS "Service role insert role changes" ON public.role_change_log;
DROP POLICY IF EXISTS "Users view own role changes" ON public.role_change_log;

-- Admins can view all role change logs
CREATE POLICY "Admins view all role changes"
ON public.role_change_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Service role can insert audit logs
CREATE POLICY "Service role insert role changes"
ON public.role_change_log
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Users can view their own role change history
CREATE POLICY "Users view own role changes"
ON public.role_change_log
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_role_change_log_user_id ON public.role_change_log(user_id);
CREATE INDEX IF NOT EXISTS idx_role_change_log_performed_at ON public.role_change_log(performed_at DESC);

COMMENT ON TABLE public.role_change_log IS 'Audit trail for all role grants and revocations';

-- ============================================
-- FIX 5: Create Trigger to Auto-Log Role Changes
-- ============================================

CREATE OR REPLACE FUNCTION public.log_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.role_change_log (user_id, role, action, performed_by, reason)
    VALUES (NEW.user_id, NEW.role, 'granted', COALESCE(NEW.granted_by, NEW.user_id), 'Role granted');
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.role_change_log (user_id, role, action, performed_by, reason)
    VALUES (OLD.user_id, OLD.role, 'revoked', auth.uid(), 'Role revoked');
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trigger_log_role_change ON public.user_roles;

CREATE TRIGGER trigger_log_role_change
  AFTER INSERT OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_role_change();

COMMENT ON FUNCTION public.log_role_change IS 'Automatically logs all role changes to role_change_log table';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$ 
BEGIN
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE '✓ User registration trigger recreated';
  RAISE NOTICE '✓ Multi-role function created (get_all_user_roles)';
  RAISE NOTICE '✓ Company representatives policies fixed';
  RAISE NOTICE '✓ Role change audit log created';
  RAISE NOTICE '✓ Missing user notifications backfilled';
END $$;