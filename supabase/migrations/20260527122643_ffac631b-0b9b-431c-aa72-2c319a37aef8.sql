
DROP POLICY IF EXISTS "Users can update own company rep" ON public.company_representatives;

CREATE POLICY "Users can update own company rep"
ON public.company_representatives
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND verified = false)
WITH CHECK (auth.uid() = user_id AND verified = false AND verified_by IS NULL AND verified_at IS NULL);
