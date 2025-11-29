import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, CheckCircle2, Clock, AlertCircle, Plus, FileText, Trash2, Search, Filter, X } from 'lucide-react';

interface CompanyProduct {
  id: string;
  company_id: string;
  product_id: string;
  verified_at: string | null;
  verification_notes: string | null;
  supporting_documents: any;
  created_at: string;
  updated_at: string;
}

export default function CompanyProductsManager() {
  const { user, loading: authLoading } = useAuth();
  const { isCompany, isAdmin } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<CompanyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [certificationToDelete, setCertificationToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || (!isCompany && !isAdmin)) {
      navigate('/auth');
      return;
    }

    fetchProducts();
  }, [user, isCompany, isAdmin, authLoading, navigate]);

  const fetchProducts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      let query = supabase
        .from('company_product_verifications')
        .select('*')
        .order('created_at', { ascending: false });

      // If company role, filter by their company
      if (isCompany && !isAdmin) {
        const { data: companyData } = await supabase
          .from('company_representatives')
          .select('company_id')
          .eq('user_id', user.id)
          .eq('verified', true)
          .single();

        if (companyData) {
          query = query.eq('company_id', companyData.company_id);
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load product certifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCertification = async (certificationId: string) => {
    try {
      const { error } = await supabase
        .from('company_product_verifications')
        .delete()
        .eq('id', certificationId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Certification removed successfully',
      });
      fetchProducts();
      setCertificationToDelete(null);
    } catch (error: any) {
      console.error('Error removing certification:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove certification',
        variant: 'destructive',
      });
    }
  };

  const getVerificationBadge = (product: CompanyProduct) => {
    if (product.verified_at) {
      return <Badge className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />Verified</Badge>;
    }
    return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
  };

  if (authLoading || loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  // Filter products based on search and date filters
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.product_id.toLowerCase().includes(query) ||
        product.company_id.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Date range filter
    if (dateFrom) {
      const productDate = new Date(product.created_at);
      const fromDate = new Date(dateFrom);
      if (productDate < fromDate) return false;
    }

    if (dateTo) {
      const productDate = new Date(product.created_at);
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999); // Include the entire day
      if (productDate > toDate) return false;
    }

    return true;
  });

  const verifiedProducts = filteredProducts.filter(p => p.verified_at);
  const pendingProducts = filteredProducts.filter(p => !p.verified_at);

  const clearFilters = () => {
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = searchQuery || dateFrom || dateTo;

  return (
    <PageLayout>
      <div className="container max-w-6xl py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8" />
              Product Certifications
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your product certification submissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {[searchQuery, dateFrom, dateTo].filter(Boolean).length}
                </Badge>
              )}
            </Button>
            <Button onClick={() => navigate('/company/dashboard')}>
              <Plus className="h-4 w-4 mr-2" />
              New Certification
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Product ID or Company ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="dateFrom">From Date</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo">To Date</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {filteredProducts.length === 0 && products.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Certifications Yet</AlertTitle>
            <AlertDescription>
              You haven't submitted any product certifications. Start by submitting your first certification from the Company Dashboard.
            </AlertDescription>
          </Alert>
        ) : filteredProducts.length === 0 ? (
          <Alert>
            <Search className="h-4 w-4" />
            <AlertTitle>No Results Found</AlertTitle>
            <AlertDescription>
              No certifications match your search criteria. Try adjusting your filters.
            </AlertDescription>
          </Alert>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">
                All ({filteredProducts.length})
              </TabsTrigger>
              <TabsTrigger value="verified">
                Verified ({verifiedProducts.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingProducts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid gap-4">
                {filteredProducts.map(product => (
                  <Card key={product.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Product ID: {product.product_id}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Company: {product.company_id}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getVerificationBadge(product)}
                          {isAdmin && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setCertificationToDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Submitted:</span>
                          <span>{new Date(product.created_at).toLocaleDateString()}</span>
                        </div>
                        {product.verified_at && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Verified:</span>
                            <span>{new Date(product.verified_at).toLocaleDateString()}</span>
                          </div>
                        )}
                        {product.verification_notes && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium">Verification Notes:</span>
                            </div>
                            <p className="text-sm">{product.verification_notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verified">
              <div className="grid gap-4">
                {verifiedProducts.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Verified Products</AlertTitle>
                    <AlertDescription>
                      You don't have any verified certifications yet.
                    </AlertDescription>
                  </Alert>
                ) : (
                  verifiedProducts.map(product => (
                    <Card key={product.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>Product ID: {product.product_id}</CardTitle>
                            <CardDescription>Company: {product.company_id}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getVerificationBadge(product)}
                            {isAdmin && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setCertificationToDelete(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Verified:</span>
                            <span>{new Date(product.verified_at!).toLocaleDateString()}</span>
                          </div>
                          {product.verification_notes && (
                            <div className="mt-4 p-3 bg-muted rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4" />
                                <span className="font-medium">Notes:</span>
                              </div>
                              <p className="text-sm">{product.verification_notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="grid gap-4">
                {pendingProducts.length === 0 ? (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>All Products Verified</AlertTitle>
                    <AlertDescription>
                      Great! All your certifications have been verified.
                    </AlertDescription>
                  </Alert>
                ) : (
                  pendingProducts.map(product => (
                    <Card key={product.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>Product ID: {product.product_id}</CardTitle>
                            <CardDescription>Company: {product.company_id}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getVerificationBadge(product)}
                            {isAdmin && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setCertificationToDelete(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Submitted:</span>
                            <span>{new Date(product.created_at).toLocaleDateString()}</span>
                          </div>
                          <Alert className="mt-4">
                            <Clock className="h-4 w-4" />
                            <AlertDescription>
                              Your certification is awaiting review by our team.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      <AlertDialog open={!!certificationToDelete} onOpenChange={() => setCertificationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Certification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this product certification? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => certificationToDelete && handleRemoveCertification(certificationToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
}
