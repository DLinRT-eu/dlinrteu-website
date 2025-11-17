-- Fix RLS policy to allow admins to insert company representatives for any user
-- Currently only users can insert their own records, but admins need to assign users

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Users can insert own company rep" ON public.company_representatives;

-- Create new policies: one for users (self-insert) and one for admins (any user)
CREATE POLICY "Users can insert own company rep" ON public.company_representatives
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can insert company reps for any user" ON public.company_representatives
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Also ensure admins can delete company representatives
DROP POLICY IF EXISTS "Admins can delete company reps" ON public.company_representatives;

CREATE POLICY "Admins can delete company reps" ON public.company_representatives
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
