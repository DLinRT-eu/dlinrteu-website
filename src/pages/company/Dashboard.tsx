import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Building2, FileEdit, Clock, CheckCircle2, XCircle, BadgeCheck, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '@/data';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getCompanyIdByName } from '@/utils/companyUtils';

interface CompanyRevision {
  id: string;
  product_id: string;
  company_id?: string;
  revision_date: string;
  changes_summary: string;
  verification_status: 'pending' | 'approved' | 'rejected' | string;
  verified_by?: string | null;
  verified_at?: string | null;
  created_at: string;
}

interface CompanyUser {
  id: string;
  user_id: string;
  company_name: string;
  assigned_by: string | null;
  assigned_at: string;
  is_active: boolean;
}

export default function CompanyDashboard() {
  const { user } = useAuth();
  const { isCompany, isAdmin, hasCompanyRole, hasAdminRole } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [revisions, setRevisions] = useState<CompanyRevision[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [certifyDialogOpen, setCertifyDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [changesSummary, setChangesSummary] = useState('');
  const [certificationDate, setCertificationDate] = useState<Date>(new Date());
  const [companyUser, setCompanyUser] = useState<CompanyUser | null>(null);
  const [companyProducts, setCompanyProducts] = useState<any[]>([]);

  const products = ALL_PRODUCTS;

  useEffect(() => {
    // Allow through if user exists AND (has company role OR is admin)
    if (!user || (!hasCompanyRole && !hasAdminRole)) {
      navigate('/auth');
      return;
    }

    fetchCompanyUser();
  }, [user, hasCompanyRole, hasAdminRole]);

  const fetchCompanyUser = async () => {
    if (!user) return;

    // Check if user has admin role - admins have oversight of all companies
    if (hasAdminRole) {
      // Admin gets access to all companies
      const mappedCompanyUser: CompanyUser = {
        id: 'admin-oversight',
        user_id: user.id,
        company_name: 'ADMIN_OVERSIGHT',
        assigned_by: user.id,
        assigned_at: new Date().toISOString(),
        is_active: true,
      };
      
      setCompanyUser(mappedCompanyUser);
      setCompanyProducts(products); // All products
      fetchRevisions();
      setLoading(false);
      return;
    }

    // Regular company user logic
    const { data: companyRepData, error: companyError } = await supabase
      .from('company_representatives')
      .select('*')
      .eq('user_id', user.id)
      .eq('verified', true)
      .maybeSingle();

    if (companyError || !companyRepData) {
      toast({
        title: 'No Company Assignment',
        description: 'You are not assigned to any company. Please contact an administrator.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Map company_representatives data to CompanyUser format
    const mappedCompanyUser: CompanyUser = {
      id: companyRepData.id,
      user_id: companyRepData.user_id,
      company_name: companyRepData.company_name,
      assigned_by: companyRepData.verified_by,
      assigned_at: companyRepData.verified_at || companyRepData.created_at,
      is_active: companyRepData.verified,
    };
    
    setCompanyUser(mappedCompanyUser);
    
    // Filter products for this company
    const filteredProducts = products.filter(p => p.company === companyRepData.company_name);
    setCompanyProducts(filteredProducts);

    // Fetch revisions
    fetchRevisions();
    setLoading(false);
  };

  const fetchRevisions = async () => {
    if (!user) return;

    try {
      // Use secure RPC that bypasses RLS
      const { data, error } = await supabase
        .rpc('get_my_company_revisions');

      if (!error && data) {
        setRevisions(data as CompanyRevision[]);
      }
    } catch (error) {
      console.error('Error fetching revisions:', error);
    }
    setLoading(false);
  };

  const handleCertifyProduct = async () => {
    if (!selectedProduct || !certificationDate) {
      toast({
        title: 'Error',
        description: 'Please select a product and certification date',
        variant: 'destructive',
      });
      return;
    }

    const product = companyProducts.find(p => p.id === selectedProduct);
    if (!product || !companyUser) return;

    try {
      // Convert company display name to standardized company ID
      const companyId = getCompanyIdByName(product.company);
      
      // Calculate content hash (excluding lastRevised and temporal fields)
      const { calculateProductContentHash } = await import('@/utils/productHash');
      const contentHash = await calculateProductContentHash(product);
      
      // Use secure RPC to certify product with lastRevised date and content hash
      const { data, error } = await supabase.rpc('certify_product', {
        p_product_id: selectedProduct,
        p_company_id: companyId,
        p_notes: 'Product information certified as accurate by company representative',
        p_product_last_revised: product.lastRevised ? new Date(product.lastRevised).toISOString() : null,
        p_content_hash: contentHash,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; message?: string };

      if (!result.success) {
        toast({
          title: 'Error',
          description: result.error || 'Failed to certify product',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: `${product.name} has been certified. The verification badge will now appear on the product page.`,
      });
      setCertifyDialogOpen(false);
      setSelectedProduct('');
      setCertificationDate(new Date());
      fetchRevisions();
    } catch (error: any) {
      console.error('Error in certification process:', error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitRevision = async () => {
    if (!selectedProduct || !changesSummary.trim()) {
      toast({
        title: 'Error',
        description: 'Please select a product and provide a summary of changes',
        variant: 'destructive',
      });
      return;
    }

    const product = companyProducts.find(p => p.id === selectedProduct);
    if (!product) return;

    try {
      // Convert company display name to standardized company ID
      const companyId = getCompanyIdByName(product.company);
      
      // Use secure RPC to create revision
      const { data, error } = await supabase.rpc('create_company_revision', {
        p_product_id: selectedProduct,
        p_company_id: companyId,
        p_changes_summary: changesSummary,
        p_revision_date: new Date().toISOString().split('T')[0],
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; message?: string };

      if (!result.success) {
        toast({
          title: 'Error',
          description: result.error || 'Failed to submit revision',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Revision submitted for verification',
      });
      setDialogOpen(false);
      setSelectedProduct('');
      setChangesSummary('');
      fetchRevisions();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  const pendingRevisions = revisions.filter(r => r.verification_status === 'pending');
  const approvedRevisions = revisions.filter(r => r.verification_status === 'approved');
  const rejectedRevisions = revisions.filter(r => r.verification_status === 'rejected');

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        {companyUser?.company_name === 'ADMIN_OVERSIGHT' && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Company Oversight Mode</AlertTitle>
            <AlertDescription>
              You are viewing the company oversight dashboard with administrator privileges. You can see all company revisions and certifications across the platform.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-8 w-8" />
              {companyUser?.company_name === 'ADMIN_OVERSIGHT' ? 'Company Oversight' : 'Company Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {companyUser?.company_name === 'ADMIN_OVERSIGHT' 
                ? 'Monitor and manage all company product revisions and certifications'
                : 'Manage your product revisions and certifications'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/company/overview">Dashboard Overview</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/company/products">Manage Certifications</Link>
            </Button>
            <Dialog open={certifyDialogOpen} onOpenChange={setCertifyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  Certify Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Certify Product</DialogTitle>
                  <DialogDescription>
                    Certify that your product information is accurate and up to date
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Product</Label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">Select a product</option>
                      {companyProducts.length === 0 ? (
                        <option disabled>No products assigned to your company</option>
                      ) : (
                        companyProducts.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Certification Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !certificationDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {certificationDate ? format(certificationDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={certificationDate}
                          onSelect={(date) => setCertificationDate(date || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCertifyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCertifyProduct}>
                    Certify Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <FileEdit className="h-4 w-4" />
                  Submit Revision
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Product Revision</DialogTitle>
                <DialogDescription>
                  Submit changes for review and verification
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Product</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">Select a product</option>
                    {companyProducts.length === 0 ? (
                      <option disabled>No products assigned to your company</option>
                    ) : (
                      companyProducts.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Changes Summary</Label>
                  <Textarea
                    placeholder="Describe the changes made to the product information..."
                    value={changesSummary}
                    onChange={(e) => setChangesSummary(e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRevision}>
                  Submit for Review
                </Button>
              </DialogFooter>
            </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Revisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revisions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingRevisions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{approvedRevisions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{rejectedRevisions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Revisions List */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({revisions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRevisions.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedRevisions.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedRevisions.length})</TabsTrigger>
          </TabsList>

          {['all', 'pending', 'approved', 'rejected'].map(tab => {
            const tabRevisions = tab === 'all' ? revisions : 
              tab === 'pending' ? pendingRevisions :
              tab === 'approved' ? approvedRevisions : rejectedRevisions;

            return (
              <TabsContent key={tab} value={tab} className="space-y-4 mt-6">
                {tabRevisions.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <FileEdit className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">No {tab === 'all' ? 'revisions' : `${tab} revisions`} yet</p>
                      <p className="text-sm text-muted-foreground max-w-md">
                        {companyUser?.company_name === 'ADMIN_OVERSIGHT' 
                          ? 'When companies submit product revisions or certifications, they will appear here for oversight and verification.'
                          : 'Submit a revision or certification for your products to get started. Once approved, your products will display a verified badge.'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  tabRevisions.map(revision => {
                    const product = products.find(p => p.id === revision.product_id);
                    return (
                      <Card key={revision.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">
                                {product?.name || revision.product_id}
                              </CardTitle>
                              <CardDescription>
                                Submitted on {new Date(revision.created_at).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(revision.verification_status)}
                              <Badge variant={getStatusBadgeVariant(revision.verification_status)}>
                                {revision.verification_status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <Label className="text-sm font-medium">Changes Summary:</Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {revision.changes_summary}
                              </p>
                            </div>
                            {revision.verified_at && (
                              <div className="text-xs text-muted-foreground">
                                Verified on {new Date(revision.verified_at).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </PageLayout>
  );
}
