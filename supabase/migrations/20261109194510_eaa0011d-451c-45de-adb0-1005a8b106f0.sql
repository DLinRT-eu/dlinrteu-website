CREATE TABLE public.company_product_ownership (
  company_id text NOT NULL,
  product_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (company_id, product_id)
);
GRANT SELECT ON public.company_product_ownership TO authenticated;
GRANT ALL ON public.company_product_ownership TO service_role;
ALTER TABLE public.company_product_ownership ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read product ownership" ON public.company_product_ownership FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage product ownership" ON public.company_product_ownership FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.company_product_ownership (company_id, product_id) VALUES
('atomoai','atomoai-icontour-pipeline'),('neuralrad','neuralrad-brain-pipeline'),('ai-medical','ai-medical-jazz'),('carina-ai','carina-intcontour'),('coreline-soft','coreline-aview-rt-acs'),('everfortune-ai','everfortune-rt-suite'),('everfortune-ai','everfortune-seg-pro-v3'),('hura-imaging','hura-dvtarget'),('limbus-ai','limbus-contour'),('manteia','manteia-accucontour'),('manteia','manteia-acculearning'),('manteia','manteia-mozi'),('manteia','manteia-artassistant'),('mim-software','mim-contour-protegeai'),('mirada-medical','mirada-dlc'),('mvision-ai','mvision-ai-contouring'),('mvision-ai','mvision-verify'),('mvision-ai','mvision-ai-workspace-plus'),('mvision-ai','mvision-dose-plus'),('mvision-ai','mvision-image-plus'),('mvision-ai','mvision-adapt-plus'),('radformation','radformation-autocontour'),('synaptiq','synaptiq-mediq-rt'),('synaptiq','synaptiq-mediq-rt-4dct-pipeline'),('therapanacea','therapanacea-art-plan-segmentation'),('therapanacea','therapanacea-art-plan-planning'),('therapanacea','therapanacea-art-plan-adaptive'),('vysioneer','vysioner-vbrain'),('wisdom-tech','wisdom-deep-contour'),('wisdom-tech','wisdom-deep-plan'),('aitewan','aitewan-deepbt-detector-plus'),('oncosoft','oncosoft-oncostudio'),('medcom','medcom-prosoma-dart'),('ge-healthcare','ge-auto-segmentation'),('ge-healthcare','ge-air-recon-dl'),('ge-healthcare','ge-air-recon-dl-enhancement'),('ge-healthcare','ge-healthcare-irt'),('ge-healthcare','ge-irt-theranostics-pipeline'),('ge-healthcare','ge-mr-contour-dl'),('ge-healthcare','ge-precision-dl'),('ge-healthcare','ge-truefidelity'),('philips-healthcare','philips-mrcat-prostate-auto-contouring'),('philips-healthcare','philips-mrcat-head-and-neck'),('philips-healthcare','philips-mrcat-brain'),('philips-healthcare','philips-mrcat-pelvis'),('philips-healthcare','philips-precise-image'),('philips-healthcare','philips-smartspeed'),('philips-healthcare','philips-smartspeed-precise'),('philips-healthcare','philips-petct-adaptive-reconstruction'),('philips-healthcare','philips-precise-position'),('siemens-healthineers','siemens-syngo-ct'),('siemens-healthineers','siemens-ai-rad-companion'),('siemens-healthineers','siemens-directorgans'),('siemens-healthineers','siemens-deep-resolve'),('canon-medical','canon-aice-ct'),('canon-medical','canon-aice-mr'),('canon-medical','canon-piqe'),('united-imaging','united-uai-vision-recon'),('united-imaging','united-uaifi-umr'),('united-imaging','united-hd-tof'),('united-imaging','united-urt-auto-contouring'),('united-imaging','united-urt-auto-planning'),('united-imaging','united-uct610-sim-dl-recon-pipeline'),('taiwan-medical-imaging','taimedimg-deepmets'),('algomedica','algomedica-pixelshine'),('spectronic-medical','spectronic-mriplanner'),('informai','informai-radoncai'),('airato','airato-ratoai'),('raysearch','raysearch-raystation'),('raysearch','raysearch-raystation-planning'),('raysearch','raysearch-rayintelligence'),('airs-medical','airs-swiftmr'),('claripi','claripi-clarict-ai'),('claripi','claripi-clariace'),('subtle-medical','subtle-mr'),('subtle-medical','subtle-pet'),('subtle-medical','subtle-hd-pet'),('subtle-medical','subtle-aimify'),('subtle-medical','subtle-hd'),('subtle-medical','subtle-hd-ct'),('ptw-dosimetry','ptw-aqualis'),('pymedix','pymedix-registration'),('medlever','medlever-assistant-pipeline'),('medlever','medlever-copilot-pipeline'),('medmind-technology','medmind-rt-mind-ai'),('quanta-computer','quanta-qoca-image-smart-rt'),('lumonus','lumonus-ai'),('elekta','elekta-iris'),('elekta','elekta-monaco-segmentation-unity'),('accuray','accuray-synchrony'),('sun-nuclear','plan-ai'),('md-anderson','rpa-radiation-planning-assistant'),('brainlab','brainlab-elements-rt-seg'),('varian','varian-ethos-ai-segmentation'),('varian','varian-eclipse-ai-contouring')
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.create_company_revision(p_product_id text, p_company_id text, p_changes_summary text, p_revision_date date DEFAULT CURRENT_DATE)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT has_role(auth.uid(), 'company'::app_role) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Company role required');
  END IF;
  IF NOT can_represent_company(auth.uid(), p_company_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'You are not authorized to submit revisions for this company');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.company_product_ownership o WHERE o.company_id = p_company_id AND o.product_id = p_product_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'This product does not belong to the selected company');
  END IF;
  INSERT INTO company_revisions (product_id, company_id, revised_by, revision_date, changes_summary, verification_status)
  VALUES (p_product_id, p_company_id, auth.uid(), p_revision_date, p_changes_summary, 'pending');
  RETURN jsonb_build_object('success', true, 'message', 'Revision submitted successfully');
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_company_revision(p_product_id text, p_company_id text, p_changes_summary text, p_revision_date date DEFAULT CURRENT_DATE, p_field_updates jsonb DEFAULT NULL::jsonb, p_submission_type text DEFAULT 'free_text'::text)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT has_role(auth.uid(), 'company'::app_role) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Company role required');
  END IF;
  IF NOT can_represent_company(auth.uid(), p_company_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'You are not authorized to submit revisions for this company');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.company_product_ownership o WHERE o.company_id = p_company_id AND o.product_id = p_product_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'This product does not belong to the selected company');
  END IF;
  IF p_submission_type NOT IN ('free_text','structured') THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid submission type');
  END IF;
  INSERT INTO company_revisions (product_id, company_id, revised_by, revision_date, changes_summary, verification_status, field_updates, submission_type)
  VALUES (p_product_id, p_company_id, auth.uid(), p_revision_date, p_changes_summary, 'pending', p_field_updates, COALESCE(p_submission_type, 'free_text'));
  RETURN jsonb_build_object('success', true, 'message', 'Revision submitted successfully');
END;
$function$;