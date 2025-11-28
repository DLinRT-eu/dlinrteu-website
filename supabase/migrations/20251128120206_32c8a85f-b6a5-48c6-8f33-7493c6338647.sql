-- Add DELETE policy for users to delete their own expertise preferences
CREATE POLICY "Users can delete own expertise"
  ON public.reviewer_expertise
  FOR DELETE
  USING (auth.uid() = user_id);