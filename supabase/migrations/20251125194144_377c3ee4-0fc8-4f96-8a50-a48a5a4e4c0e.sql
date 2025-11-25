-- Force PostgREST schema cache reload to ensure all functions are immediately available
-- This resolves the "Could not find the function in the schema cache" error
NOTIFY pgrst, 'reload schema';