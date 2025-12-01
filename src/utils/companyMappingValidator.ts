import { supabase } from "@/integrations/supabase/client";
import { ProductDetails } from "@/types/productDetails";
import { getCompanyIdByName } from "./companyUtils";

export interface CompanyMappingIssue {
  type: 'mismatch' | 'missing_mapping' | 'orphaned_representative';
  severity: 'high' | 'medium' | 'low';
  productId?: string;
  productName?: string;
  companyName: string;
  expectedCompanyId: string;
  actualCompanyId?: string;
  representativeCount?: number;
  representatives?: Array<{
    id: string;
    email: string;
    verified: boolean;
  }>;
  description: string;
}

export interface ValidationResult {
  issues: CompanyMappingIssue[];
  summary: {
    totalIssues: number;
    highSeverity: number;
    mediumSeverity: number;
    lowSeverity: number;
  };
  lastChecked: string;
}

/**
 * Validates company mappings between products and representatives
 */
export async function validateCompanyMappings(
  products: ProductDetails[]
): Promise<ValidationResult> {
  const issues: CompanyMappingIssue[] = [];

  // Fetch all company representatives from database
  const { data: representatives, error } = await supabase
    .from('company_representatives')
    .select('id, user_id, company_id, company_name, verified, profiles!inner(email)')
    .order('company_name');

  if (error) {
    console.error('[validateCompanyMappings] Error fetching representatives:', error);
    throw error;
  }

  // Create a map of company_id -> representatives
  const repsByCompanyId = new Map<string, typeof representatives>();
  representatives?.forEach(rep => {
    const companyId = rep.company_id || '';
    if (!repsByCompanyId.has(companyId)) {
      repsByCompanyId.set(companyId, []);
    }
    repsByCompanyId.get(companyId)!.push(rep);
  });

  // Create a map of company names -> expected company IDs
  const companyNameToId = new Map<string, string>();
  products.forEach(product => {
    const expectedId = getCompanyIdByName(product.company);
    companyNameToId.set(product.company, expectedId);
  });

  // Check 1: Products with representatives that have mismatched company IDs
  products.forEach(product => {
    const expectedCompanyId = getCompanyIdByName(product.company);
    const reps = representatives?.filter(r => r.company_name === product.company) || [];

    if (reps.length > 0) {
      // Check if any representative has a different company_id than expected
      const mismatchedReps = reps.filter(r => r.company_id !== expectedCompanyId);
      
      if (mismatchedReps.length > 0) {
        issues.push({
          type: 'mismatch',
          severity: 'high',
          productId: product.id,
          productName: product.name,
          companyName: product.company,
          expectedCompanyId,
          actualCompanyId: mismatchedReps[0].company_id || undefined,
          representativeCount: mismatchedReps.length,
          representatives: mismatchedReps.map(r => ({
            id: r.id,
            email: (r.profiles as any)?.email || 'Unknown',
            verified: r.verified || false,
          })),
          description: `Product "${product.name}" expects company ID "${expectedCompanyId}" but ${mismatchedReps.length} representative(s) have "${mismatchedReps[0].company_id}". This will cause authorization failures.`,
        });
      }
    }
  });

  // Check 2: Representatives with company IDs that don't match any product's expected ID
  representatives?.forEach(rep => {
    const expectedId = companyNameToId.get(rep.company_name);
    
    if (expectedId && rep.company_id !== expectedId) {
      // Only add if not already flagged in Check 1
      const alreadyFlagged = issues.some(
        issue => issue.companyName === rep.company_name && issue.type === 'mismatch'
      );
      
      if (!alreadyFlagged) {
        issues.push({
          type: 'missing_mapping',
          severity: 'medium',
          companyName: rep.company_name,
          expectedCompanyId: expectedId,
          actualCompanyId: rep.company_id || undefined,
          representativeCount: 1,
          representatives: [{
            id: rep.id,
            email: (rep.profiles as any)?.email || 'Unknown',
            verified: rep.verified || false,
          }],
          description: `Representative for "${rep.company_name}" has company_id "${rep.company_id}" but should be "${expectedId}" based on product catalog.`,
        });
      }
    }
  });

  // Check 3: Representatives for companies not in the product catalog
  const productCompanies = new Set(products.map(p => p.company));
  representatives?.forEach(rep => {
    if (!productCompanies.has(rep.company_name)) {
      issues.push({
        type: 'orphaned_representative',
        severity: 'low',
        companyName: rep.company_name,
        expectedCompanyId: rep.company_id || 'unknown',
        actualCompanyId: rep.company_id || undefined,
        representativeCount: 1,
        representatives: [{
          id: rep.id,
          email: (rep.profiles as any)?.email || 'Unknown',
          verified: rep.verified || false,
        }],
        description: `Representative exists for "${rep.company_name}" but no products found in catalog for this company.`,
      });
    }
  });

  // Calculate summary
  const summary = {
    totalIssues: issues.length,
    highSeverity: issues.filter(i => i.severity === 'high').length,
    mediumSeverity: issues.filter(i => i.severity === 'medium').length,
    lowSeverity: issues.filter(i => i.severity === 'low').length,
  };

  return {
    issues,
    summary,
    lastChecked: new Date().toISOString(),
  };
}

/**
 * Create admin notifications for high-severity issues
 */
export async function notifyAdminsOfIssues(issues: CompanyMappingIssue[]): Promise<void> {
  const highSeverityIssues = issues.filter(i => i.severity === 'high');
  
  if (highSeverityIssues.length === 0) {
    return;
  }

  // Get all admin users
  const { data: admins, error: adminError } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('role', 'admin');

  if (adminError || !admins) {
    console.error('[notifyAdminsOfIssues] Error fetching admins:', adminError);
    return;
  }

  // Create notifications for each admin
  const notifications = admins.map(admin => ({
    user_id: admin.user_id,
    type: 'alert',
    title: 'Company Mapping Issues Detected',
    message: `${highSeverityIssues.length} high-severity company mapping issue(s) found that may cause authorization failures.`,
    link: '/admin/company-mapping-validator',
  }));

  const { error: notifyError } = await supabase
    .from('notifications')
    .insert(notifications);

  if (notifyError) {
    console.error('[notifyAdminsOfIssues] Error creating notifications:', notifyError);
  }
}
