ALTER TABLE public.company_revisions
  ADD COLUMN IF NOT EXISTS field_updates jsonb,
  ADD COLUMN IF NOT EXISTS submission_type text NOT NULL DEFAULT 'free_text';

ALTER TABLE public.company_revisions
  DROP CONSTRAINT IF EXISTS company_revisions_submission_type_check;
ALTER TABLE public.company_revisions
  ADD CONSTRAINT company_revisions_submission_type_check
  CHECK (submission_type IN ('free_text','structured'));

CREATE OR REPLACE FUNCTION public.create_company_revision(
  p_product_id text,
  p_company_id text,
  p_changes_summary text,
  p_revision_date date DEFAULT CURRENT_DATE,
  p_field_updates jsonb DEFAULT NULL,
  p_submission_type text DEFAULT 'free_text'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT has_role(auth.uid(), 'company'::app_role) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Company role required');
  END IF;

  IF NOT can_represent_company(auth.uid(), p_company_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'You are not authorized to submit revisions for this company');
  END IF;

  IF p_submission_type NOT IN ('free_text','structured') THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid submission type');
  END IF;

  INSERT INTO company_revisions (
    product_id,
    company_id,
    revised_by,
    revision_date,
    changes_summary,
    verification_status,
    field_updates,
    submission_type
  ) VALUES (
    p_product_id,
    p_company_id,
    auth.uid(),
    p_revision_date,
    p_changes_summary,
    'pending',
    p_field_updates,
    COALESCE(p_submission_type, 'free_text')
  );

  RETURN jsonb_build_object('success', true, 'message', 'Revision submitted successfully');
END;
$function$;