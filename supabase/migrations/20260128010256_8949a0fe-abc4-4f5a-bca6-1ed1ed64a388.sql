-- Create product_edit_drafts table for storing visual editor changes
CREATE TABLE public.product_edit_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- The edited product data (full ProductDetails JSON)
  draft_data jsonb NOT NULL,
  
  -- Track which fields were modified
  changed_fields text[] NOT NULL DEFAULT '{}',
  
  -- Edit summary for reviewers
  edit_summary text,
  
  -- Workflow status
  status text NOT NULL DEFAULT 'draft' 
    CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'applied')),
  
  -- Review metadata
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  review_feedback text,
  
  -- GitHub sync status
  github_pr_url text,
  github_synced_at timestamptz
);

-- Enable RLS
ALTER TABLE public.product_edit_drafts ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger
CREATE TRIGGER update_product_edit_drafts_updated_at
  BEFORE UPDATE ON public.product_edit_drafts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies

-- Admins can manage all drafts
CREATE POLICY "Admins can manage all drafts"
  ON public.product_edit_drafts
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Users can view their own drafts
CREATE POLICY "Users can view own drafts"
  ON public.product_edit_drafts
  FOR SELECT
  USING (created_by = auth.uid());

-- Users can create their own drafts
CREATE POLICY "Users can create own drafts"
  ON public.product_edit_drafts
  FOR INSERT
  WITH CHECK (created_by = auth.uid() AND (
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'reviewer') OR
    public.has_role(auth.uid(), 'company')
  ));

-- Users can update their own draft status drafts
CREATE POLICY "Users can update own pending drafts"
  ON public.product_edit_drafts
  FOR UPDATE
  USING (created_by = auth.uid() AND status IN ('draft', 'rejected'))
  WITH CHECK (created_by = auth.uid() AND status IN ('draft', 'pending_review'));

-- Users can delete their own draft status drafts
CREATE POLICY "Users can delete own drafts"
  ON public.product_edit_drafts
  FOR DELETE
  USING (created_by = auth.uid() AND status = 'draft');

-- Reviewers can view drafts for products they're assigned to review
CREATE POLICY "Reviewers can view drafts for assigned products"
  ON public.product_edit_drafts
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'reviewer') AND
    EXISTS (
      SELECT 1 FROM public.product_reviews pr
      WHERE pr.product_id = product_edit_drafts.product_id
        AND pr.assigned_to = auth.uid()
    )
  );

-- Deny anonymous access
CREATE POLICY "Deny anonymous access to product_edit_drafts"
  ON public.product_edit_drafts
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Service role full access for edge functions
CREATE POLICY "Service role full access product_edit_drafts"
  ON public.product_edit_drafts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create index for efficient lookups
CREATE INDEX idx_product_edit_drafts_product_id ON public.product_edit_drafts(product_id);
CREATE INDEX idx_product_edit_drafts_created_by ON public.product_edit_drafts(created_by);
CREATE INDEX idx_product_edit_drafts_status ON public.product_edit_drafts(status);