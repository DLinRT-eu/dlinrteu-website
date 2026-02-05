import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp, 
  FileText,
  Activity,
  Calendar,
  UserCheck,
  AlertCircle,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Package,
  BookOpen,
  BadgeCheck,
  FileEdit,
  HelpCircle
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { ALL_PRODUCTS } from '@/data';
import { getCompanyProducts } from '@/utils/companyUtils';
import { getProductNameById } from '@/utils/companyUtils';
import { getDaysSinceRevision, getUrgencyLevel } from '@/utils/revisionUtils';
import { ProductDetails } from '@/types/productDetails';
import CertificationProgressWidget from '@/components/company/CertificationProgressWidget';
import ProductCardWithActions from '@/components/company/ProductCardWithActions';

interface CompanyStats {
  totalProducts: number;
  verifiedProducts: number;
  pendingVerifications: number;
  totalRepresentatives: number;
  verifiedRepresentatives: number;
  recentRevisions: number;
}

interface ProductVerification {
  id: string;
  product_id: string;
  verified_at: string;
  verification_notes: string | null;
  verified_by: string | null;
  product_last_revised: string | null;
  content_hash: string | null;
}

interface CompanyRevision {
  id: string;
  product_id: string;
  revision_date: string;
  changes_summary: string;
  verification_status: string;
  created_at: string;
  revised_by: string;
  revised_by_name?: string;
}

interface Representative {
  id: string;
  user_id: string;
  position: string | null;
  verified: boolean;
  verified_at: string | null;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function CompanyDashboardOverview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CompanyStats>({
    totalProducts: 0,
    verifiedProducts: 0,
    pendingVerifications: 0,
    totalRepresentatives: 0,
    verifiedRepresentatives: 0,
    recentRevisions: 0,
  });
  const [verifications, setVerifications] = useState<ProductVerification[]>([]);
  const [revisions, setRevisions] = useState<CompanyRevision[]>([]);
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [companyInfo, setCompanyInfo] = useState<{ id: string; name: string } | null>(null);
  const [companyProducts, setCompanyProducts] = useState<ProductDetails[]>([]);
  
  // Edit/Delete state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState<CompanyRevision | null>(null);
  const [editForm, setEditForm] = useState({ changesSummary: '', revisionDate: '' });
  const [certifyDialogOpen, setCertifyDialogOpen] = useState(false);
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [changesSummary, setChangesSummary] = useState('');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get user's company info
      const { data: repData, error: repError } = await supabase
        .from('company_representatives')
        .select('company_id, company_name')
        .eq('user_id', user?.id)
        .eq('verified', true)
        .single();

      if (repError || !repData) {
        toast.error('You are not assigned to any company');
        return;
      }

      setCompanyInfo({ id: repData.company_id, name: repData.company_name });

      // Get company products from catalog
      const products = getCompanyProducts(repData.company_name, ALL_PRODUCTS);
      setCompanyProducts(products);

      // Fetch all data in parallel
      const [verificationsRes, revisionsRes, representativesRes] = await Promise.all([
        // Product verifications
        supabase
          .from('company_product_verifications')
          .select('*')
          .eq('company_id', repData.company_id)
          .order('verified_at', { ascending: false }),

        // Company revisions
        supabase
          .from('company_revisions')
          .select('*')
          .eq('company_id', repData.company_id)
          .order('created_at', { ascending: false })
          .limit(20),

        // Company representatives
        supabase
          .from('company_representatives')
          .select(`
            *,
            profiles!inner(first_name, last_name, email)
          `)
          .eq('company_id', repData.company_id)
          .order('created_at', { ascending: false }),
      ]);

      if (verificationsRes.error) throw verificationsRes.error;
      if (revisionsRes.error) throw revisionsRes.error;
      if (representativesRes.error) throw representativesRes.error;

      const verificationsData = verificationsRes.data || [];
      const revisionsData = revisionsRes.data || [];
      const representativesData = representativesRes.data || [];

      setVerifications(verificationsData);
      setRevisions(revisionsData);
      setRepresentatives(representativesData as Representative[]);

      // Calculate recent revisions (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentRevisions = revisionsData.filter(
        r => new Date(r.created_at) > thirtyDaysAgo
      ).length;

      // Calculate stats
      setStats({
        totalProducts: verificationsData.length,
        verifiedProducts: verificationsData.length,
        pendingVerifications: revisionsData.filter(r => r.verification_status === 'pending').length,
        totalRepresentatives: representativesData.length,
        verifiedRepresentatives: representativesData.filter((r: Representative) => r.verified).length,
        recentRevisions,
      });
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRevision = (revision: CompanyRevision) => {
    setSelectedRevision(revision);
    setEditForm({
      changesSummary: revision.changes_summary,
      revisionDate: revision.revision_date,
    });
    setEditDialogOpen(true);
  };

  const handleUpdateRevision = async () => {
    if (!selectedRevision) return;

    try {
      const { error } = await supabase
        .from('company_revisions')
        .update({
          changes_summary: editForm.changesSummary,
          revision_date: editForm.revisionDate,
        })
        .eq('id', selectedRevision.id);

      if (error) throw error;

      toast.success('Revision updated successfully');
      setEditDialogOpen(false);
      fetchDashboardData();
    } catch (error: any) {
      console.error('Error updating revision:', error);
      toast.error('Failed to update revision');
    }
  };

  const handleDeleteRevision = async (revisionId: string) => {
    setSelectedRevision(revisions.find(r => r.id === revisionId) || null);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteRevision = async () => {
    if (!selectedRevision) return;

    try {
      const { error } = await supabase
        .from('company_revisions')
        .delete()
        .eq('id', selectedRevision.id);

      if (error) throw error;

      toast.success('Revision deleted successfully');
      setDeleteDialogOpen(false);
      fetchDashboardData();
    } catch (error: any) {
      console.error('Error deleting revision:', error);
      toast.error('Failed to delete revision');
    }
  };

  const handleCertifyProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCertifyDialogOpen(true);
  };

  const handleSuggestRevision = (productId: string) => {
    setSelectedProductId(productId);
    setRevisionDialogOpen(true);
  };

  const submitCertification = async () => {
    const product = companyProducts.find(p => p.id === selectedProductId);
    if (!product || !companyInfo) return;

    try {
      const { getCompanyIdByName } = await import('@/utils/companyUtils');
      const { calculateProductContentHash } = await import('@/utils/productHash');
      
      const companyId = getCompanyIdByName(product.company);
      const contentHash = await calculateProductContentHash(product);
      
      const { data, error } = await supabase.rpc('certify_product', {
        p_product_id: selectedProductId,
        p_company_id: companyId,
        p_notes: 'Product information certified as accurate',
        p_product_last_revised: product.lastRevised ? new Date(product.lastRevised).toISOString() : null,
        p_content_hash: contentHash,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        toast.error(result.error || 'Failed to certify product');
        return;
      }

      toast.success(`${product.name} has been certified successfully`);
      setCertifyDialogOpen(false);
      setSelectedProductId('');
      fetchDashboardData();
    } catch (error: any) {
      console.error('Error certifying product:', error);
      toast.error(error.message || 'Failed to certify product');
    }
  };

  const submitRevision = async () => {
    const product = companyProducts.find(p => p.id === selectedProductId);
    if (!product || !companyInfo || !changesSummary.trim()) {
      toast.error('Please provide a summary of changes');
      return;
    }

    try {
      const { getCompanyIdByName } = await import('@/utils/companyUtils');
      const companyId = getCompanyIdByName(product.company);
      
      const { data, error } = await supabase.rpc('create_company_revision', {
        p_product_id: selectedProductId,
        p_company_id: companyId,
        p_changes_summary: changesSummary,
        p_revision_date: new Date().toISOString().split('T')[0],
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        toast.error(result.error || 'Failed to submit revision');
        return;
      }

      toast.success('Revision submitted for review');
      setRevisionDialogOpen(false);
      setSelectedProductId('');
      setChangesSummary('');
      fetchDashboardData();
    } catch (error: any) {
      console.error('Error submitting revision:', error);
      toast.error(error.message || 'Failed to submit revision');
    }
  };

  const revisionColumns: ColumnDef<CompanyRevision>[] = [
    {
      accessorKey: 'product_id',
      header: 'Product',
      cell: ({ row }) => {
        const productId = row.getValue('product_id') as string;
        const productName = getProductNameById(productId, companyProducts);
        return (
          <div className="font-medium">{productName}</div>
        );
      },
    },
    {
      accessorKey: 'changes_summary',
      header: 'Changes',
      cell: ({ row }) => (
        <div className="max-w-md truncate">{row.getValue('changes_summary')}</div>
      ),
    },
    {
      accessorKey: 'verification_status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('verification_status') as string;
        return (
          <Badge
            variant={
              status === 'approved'
                ? 'default'
                : status === 'rejected'
                ? 'destructive'
                : 'secondary'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'revision_date',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('revision_date'));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Submitted',
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at'));
        return (
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(date, { addSuffix: true })}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const revision = row.original;
        const isPending = revision.verification_status === 'pending';
        
        if (!isPending) return <span className="text-xs text-muted-foreground">-</span>;
        
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleEditRevision(revision)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={() => handleDeleteRevision(revision.id)}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
  ];

  const representativeColumns: ColumnDef<Representative>[] = [
    {
      accessorKey: 'profiles.first_name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.profiles.first_name} {row.original.profiles.last_name}
        </div>
      ),
    },
    {
      accessorKey: 'profiles.email',
      header: 'Email',
    },
    {
      accessorKey: 'position',
      header: 'Position',
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue('position') || '-'}</div>
      ),
    },
    {
      accessorKey: 'verified',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.getValue('verified') ? 'default' : 'secondary'}>
          {row.getValue('verified') ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Joined',
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at'));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
  ];

  if (loading) {
    return (
      <PageLayout title="Company Dashboard">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  if (!companyInfo) {
    return (
      <PageLayout title="Company Dashboard">
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4" />
              <p>You are not assigned to any company or your assignment is pending verification.</p>
            </div>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${companyInfo.name} Dashboard`}
      description="Overview of your company's certifications and activity"
    >
      <div className="mb-4 flex justify-end">
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link to="/company/guide">
            <BookOpen className="h-4 w-4" />
            View Company Guide
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="revisions">Recent Updates</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Certification Progress + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <CertificationProgressWidget
              products={companyProducts}
              verifications={verifications}
              className="lg:col-span-1"
            />
            
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Catalog Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyProducts.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Products in the DLinRT catalog
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Certified</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{verifications.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  With verified badge
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting admin verification
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRepresentatives}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.verifiedRepresentatives} verified representatives
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recentRevisions}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Updates in last 30 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {companyProducts.length > 0
                    ? Math.round((verifications.length / companyProducts.length) * 100)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Products up to date
                </p>
              </CardContent>
            </Card>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes to your products</CardDescription>
            </CardHeader>
            <CardContent>
              {revisions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {revisions.slice(0, 5).map((revision) => (
                    <div
                      key={revision.id}
                      className="flex items-start gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="mt-1">
                        {revision.verification_status === 'approved' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : revision.verification_status === 'rejected' ? (
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        ) : (
                          <Clock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{getProductNameById(revision.product_id, companyProducts)}</p>
                          <Badge
                            variant={
                              revision.verification_status === 'approved'
                                ? 'default'
                                : revision.verification_status === 'rejected'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {revision.verification_status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {revision.changes_summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(revision.revision_date).toLocaleDateString()}
                          </span>
                          <span>
                            {formatDistanceToNow(new Date(revision.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          {/* Help Banner */}
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Certification vs. Revision</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li><strong>Certify:</strong> Confirm product information is accurate. Adds a "Verified by Company" badge.</li>
                    <li><strong>Suggest Edit:</strong> Propose changes to update product details. Our team will review and apply.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Company Products
              </CardTitle>
              <CardDescription>
                Products manufactured by {companyInfo.name} in the DLinRT catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              {companyProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No products found for this company in the catalog</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {companyProducts.map(product => (
                    <ProductCardWithActions
                      key={product.id}
                      product={product}
                      verification={verifications.find(v => v.product_id === product.id)}
                      onCertify={handleCertifyProduct}
                      onSuggestRevision={handleSuggestRevision}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revisions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Updates</CardTitle>
              <CardDescription>
                All product revision submissions and their verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={revisionColumns}
                data={revisions}
                defaultSort={[{ id: 'created_at', desc: true }]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Company representatives authorized to certify products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={representativeColumns}
                data={representatives}
                defaultSort={[{ id: 'verified', desc: true }]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Revision Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Revision</DialogTitle>
            <DialogDescription>
              Update the details of your pending revision submission
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-summary">Changes Summary</Label>
              <Textarea
                id="edit-summary"
                value={editForm.changesSummary}
                onChange={(e) => setEditForm({ ...editForm, changesSummary: e.target.value })}
                placeholder="Describe the changes..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="edit-date">Revision Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={editForm.revisionDate}
                onChange={(e) => setEditForm({ ...editForm, revisionDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRevision}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Revision Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Revision</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this revision submission? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedRevision && (
            <div className="bg-muted p-3 rounded-md space-y-1">
              <p className="text-sm font-medium">{getProductNameById(selectedRevision.product_id, companyProducts)}</p>
              <p className="text-xs text-muted-foreground">{selectedRevision.changes_summary}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteRevision}>
              Delete Revision
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certify Product Dialog */}
      <Dialog open={certifyDialogOpen} onOpenChange={setCertifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5" />
              Certify Product
            </DialogTitle>
            <DialogDescription>
              Confirm that the product information is accurate and up to date
            </DialogDescription>
          </DialogHeader>
          {selectedProductId && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">{getProductNameById(selectedProductId, companyProducts)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  By certifying, you confirm that all product information displayed on the catalog is accurate.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>A "Verified by Company" badge will be displayed on the product page.</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCertifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitCertification}>
              <BadgeCheck className="h-4 w-4 mr-2" />
              Certify Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suggest Revision Dialog */}
      <Dialog open={revisionDialogOpen} onOpenChange={setRevisionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileEdit className="h-5 w-5" />
              Suggest Revision
            </DialogTitle>
            <DialogDescription>
              Propose changes to update the product information
            </DialogDescription>
          </DialogHeader>
          {selectedProductId && (
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="font-medium text-sm">{getProductNameById(selectedProductId, companyProducts)}</p>
              </div>
              <div>
                <Label htmlFor="changes-summary">Describe the changes needed</Label>
                <Textarea
                  id="changes-summary"
                  value={changesSummary}
                  onChange={(e) => setChangesSummary(e.target.value)}
                  placeholder="Describe what information needs to be updated..."
                  rows={4}
                  className="mt-1.5"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevisionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitRevision} disabled={!changesSummary.trim()}>
              <FileEdit className="h-4 w-4 mr-2" />
              Submit for Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
