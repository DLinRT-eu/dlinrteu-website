-- Fix Company Product Verifications RLS and Data

-- 1. Update existing certifications to use correct company IDs
UPDATE company_product_verifications 
SET company_id = 'philips-healthcare' 
WHERE company_id = 'Philips';

UPDATE company_product_verifications 
SET company_id = 'ge-healthcare' 
WHERE company_id = 'GE Healthcare';

UPDATE company_product_verifications 
SET company_id = 'siemens-healthineers' 
WHERE company_id = 'Siemens Healthineers';

UPDATE company_product_verifications 
SET company_id = 'canon-medical' 
WHERE company_id = 'Canon Medical Systems';

UPDATE company_product_verifications 
SET company_id = 'varian' 
WHERE company_id = 'Varian';

UPDATE company_product_verifications 
SET company_id = 'elekta' 
WHERE company_id = 'Elekta';

-- 2. Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Admins can manage verifications" ON company_product_verifications;
DROP POLICY IF EXISTS "Anyone can view verifications" ON company_product_verifications;
DROP POLICY IF EXISTS "Company reps can certify own products" ON company_product_verifications;
DROP POLICY IF EXISTS "Company reps delete own verifications" ON company_product_verifications;
DROP POLICY IF EXISTS "Company reps update own verifications" ON company_product_verifications;

-- 3. Create PERMISSIVE policies (they work with OR logic)
-- Admins have full access
CREATE POLICY "Admins can manage all verifications" 
ON company_product_verifications
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can view certifications (public data)
CREATE POLICY "Public can view verifications" 
ON company_product_verifications
FOR SELECT 
USING (true);

-- Company reps can insert certifications for their own company
CREATE POLICY "Company reps can certify own company products" 
ON company_product_verifications
FOR INSERT 
WITH CHECK (can_represent_company(auth.uid(), company_id));

-- Company reps can update their own company's certifications
CREATE POLICY "Company reps can update own company verifications" 
ON company_product_verifications
FOR UPDATE 
USING (can_represent_company(auth.uid(), company_id))
WITH CHECK (can_represent_company(auth.uid(), company_id));

-- Company reps can delete their own company's certifications
CREATE POLICY "Company reps can delete own company verifications" 
ON company_product_verifications
FOR DELETE 
USING (can_represent_company(auth.uid(), company_id));