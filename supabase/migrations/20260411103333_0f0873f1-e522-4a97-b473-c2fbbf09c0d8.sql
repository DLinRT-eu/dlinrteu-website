-- Fix: Restrict reviewer_expertise INSERT to users with the reviewer role
-- Currently any authenticated user can insert expertise records, which could influence assignment logic

DROP POLICY "Users can insert own expertise" ON public.reviewer_expertise;

CREATE POLICY "Reviewers can insert own expertise" ON public.reviewer_expertise
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND has_role(auth.uid(), 'reviewer'::app_role)
  );

-- Also restrict UPDATE and DELETE to reviewers (currently open to any authenticated user)
DROP POLICY "Users can update own expertise" ON public.reviewer_expertise;

CREATE POLICY "Reviewers can update own expertise" ON public.reviewer_expertise
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND has_role(auth.uid(), 'reviewer'::app_role))
  WITH CHECK (auth.uid() = user_id AND has_role(auth.uid(), 'reviewer'::app_role));

DROP POLICY "Users can delete own expertise" ON public.reviewer_expertise;

CREATE POLICY "Reviewers can delete own expertise" ON public.reviewer_expertise
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND has_role(auth.uid(), 'reviewer'::app_role));

-- Keep the SELECT policy as-is (users viewing own expertise is harmless)
