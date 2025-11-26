import { supabase } from "@/integrations/supabase/client";
import { ProductDetails } from "@/types/productDetails";

export interface CompanyInfo {
  id: string;
  name: string;
  productCount: number;
}

export interface CompanyRevision {
  id: string;
  product_id: string;
  company_id: string;
  revision_date: string;
  changes_summary: string;
  verification_status: string;
  created_at: string;
}

export interface RPCResponse {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Get all revisions for the current company user
 */
export async function getMyCompanyRevisions(): Promise<CompanyRevision[]> {
  const { data, error } = await supabase.rpc('get_my_company_revisions');

  if (error) {
    console.error('[getMyCompanyRevisions] Error:', error);
    throw error;
  }

  return data || [];
}

/**
 * Create a new company revision
 */
export async function createCompanyRevision(
  productId: string,
  companyId: string,
  changesSummary: string,
  revisionDate?: string
): Promise<RPCResponse> {
  const { data, error } = await supabase.rpc('create_company_revision', {
    p_product_id: productId,
    p_company_id: companyId,
    p_changes_summary: changesSummary,
    p_revision_date: revisionDate || new Date().toISOString().split('T')[0],
  });

  if (error) {
    console.error('[createCompanyRevision] Error:', error);
    throw error;
  }

  return data as unknown as RPCResponse;
}

/**
 * Certify a product for a company
 */
export async function certifyProduct(
  productId: string,
  companyId: string,
  notes?: string
): Promise<RPCResponse> {
  const { data, error } = await supabase.rpc('certify_product', {
    p_product_id: productId,
    p_company_id: companyId,
    p_notes: notes,
  });

  if (error) {
    console.error('[certifyProduct] Error:', error);
    throw error;
  }

  return data as unknown as RPCResponse;
}

/**
 * Extract unique companies from product catalog
 */
export const extractCompaniesFromProducts = (products: ProductDetails[]): CompanyInfo[] => {
  const companyMap = new Map<string, CompanyInfo>();

  products.forEach((product) => {
    const companyId = product.company.toLowerCase().replace(/\s+/g, '-');
    
    if (companyMap.has(companyId)) {
      const existing = companyMap.get(companyId)!;
      existing.productCount += 1;
    } else {
      companyMap.set(companyId, {
        id: companyId,
        name: product.company,
        productCount: 1,
      });
    }
  });

  return Array.from(companyMap.values());
};
