-- Grant CRUD permissions to authenticated users for company_product_verifications
-- RLS policies will control which rows each user can actually access
GRANT INSERT, UPDATE, DELETE ON company_product_verifications TO authenticated;