import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, Clock, AlertCircle, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CompanyProfileSummaryProps {
  userId: string;
}

interface CompanyInfo {
  companyName: string;
  verified: boolean;
  verifiedAt: string | null;
  productCount: number;
}

export function CompanyProfileSummary({ userId }: CompanyProfileSummaryProps) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        // Fetch company representative info
        const { data: repData, error: repError } = await supabase
          .from('company_representatives')
          .select('company_name, verified, verified_at, company_id')
          .eq('user_id', userId)
          .maybeSingle();

        if (repError) throw repError;

        if (repData) {
          // Fetch product count for this company
          const { data: productData, error: productError } = await supabase
            .from('company_product_verifications')
            .select('id', { count: 'exact', head: true })
            .eq('company_id', repData.company_id);

          setCompanyInfo({
            companyName: repData.company_name,
            verified: repData.verified || false,
            verifiedAt: repData.verified_at,
            productCount: productData?.length || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, [userId]);

  if (loading || !companyInfo) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company Representative
        </CardTitle>
        <CardDescription>Your company affiliation and verification status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="text-lg font-semibold">{companyInfo.companyName}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Status:</p>
              {companyInfo.verified ? (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Pending Verification
                </Badge>
              )}
            </div>
            {companyInfo.productCount > 0 && (
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">
                  {companyInfo.productCount} {companyInfo.productCount === 1 ? 'Product' : 'Products'} Certified
                </p>
              </div>
            )}
          </div>
        </div>

        {!companyInfo.verified && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Your company affiliation is pending verification by our team. You'll receive a notification once verified.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to="/company/dashboard">
              <Building2 className="h-4 w-4 mr-2" />
              Company Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to="/company/products">
              <Package className="h-4 w-4 mr-2" />
              Manage Products
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
