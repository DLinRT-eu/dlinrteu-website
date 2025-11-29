import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { ALL_PRODUCTS } from '@/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2, AlertTriangle, XCircle, Search, ExternalLink, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import SEO from '@/components/SEO';
import PageLayout from '@/components/layout/PageLayout';
import type { ProductDetails } from '@/types/productDetails';
import type { Tables } from '@/integrations/supabase/types';

type CertificationRecord = Tables<'company_product_verifications'>;

interface ProductWithCertification {
  product: ProductDetails;
  certificationRecord?: CertificationRecord;
  certificationStatus: 'valid' | 'outdated' | 'never';
}

export default function CertificationManagement() {
  const { isAdmin } = useRoles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [certifications, setCertifications] = useState<CertificationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'valid' | 'outdated' | 'never'>('all');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchCertifications();
  }, [isAdmin, navigate]);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('company_product_verifications')
        .select('*')
        .order('verified_at', { ascending: false });

      if (error) throw error;
      setCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      toast.error('Failed to load certification data');
    } finally {
      setLoading(false);
    }
  };

  // Process products with certification status
  const productsWithStatus: ProductWithCertification[] = useMemo(() => {
    // Create certification map (product_id -> latest certification)
    const certificationMap = new Map<string, CertificationRecord>();
    certifications.forEach((cert) => {
      if (!certificationMap.has(cert.product_id)) {
        certificationMap.set(cert.product_id, cert);
      }
    });

    // Determine status for each product
    return ALL_PRODUCTS.map((product) => {
      const cert = certificationMap.get(product.id || '');
      let status: 'valid' | 'outdated' | 'never' = 'never';

      if (!cert) {
        status = 'never';
      } else if (product.lastRevised && cert.verified_at) {
        const productRevised = new Date(product.lastRevised);
        const certifiedAt = new Date(cert.verified_at);
        status = productRevised > certifiedAt ? 'outdated' : 'valid';
      } else {
        status = 'valid';
      }

      return {
        product,
        certificationRecord: cert,
        certificationStatus: status,
      };
    });
  }, [certifications]);

  // Filter products based on search and active tab
  const filteredProducts = useMemo(() => {
    let filtered = productsWithStatus;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter((p) => p.certificationStatus === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.product.name.toLowerCase().includes(query) ||
          p.product.company.toLowerCase().includes(query) ||
          p.product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [productsWithStatus, searchQuery, activeTab]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: productsWithStatus.length,
      valid: productsWithStatus.filter((p) => p.certificationStatus === 'valid').length,
      outdated: productsWithStatus.filter((p) => p.certificationStatus === 'outdated').length,
      never: productsWithStatus.filter((p) => p.certificationStatus === 'never').length,
    };
  }, [productsWithStatus]);

  const getStatusBadge = (status: 'valid' | 'outdated' | 'never') => {
    switch (status) {
      case 'valid':
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </Badge>
        );
      case 'outdated':
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Outdated
          </Badge>
        );
      case 'never':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Not Certified
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading certification data...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      <SEO
        title="Certification Management | DLinRT.eu"
        description="Monitor and manage product certification status"
      />
      <PageLayout>
        <div className="container mx-auto py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Certification Management</h1>
              <p className="text-muted-foreground mt-2">
                Monitor and manage product certification status across all companies
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/admin/companies')}>
              <Building2 className="h-4 w-4 mr-2" />
              Manage Companies
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All products in catalog</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
                <p className="text-xs text-muted-foreground">Current certifications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outdated</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.outdated}</div>
                <p className="text-xs text-muted-foreground">Need re-certification</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Not Certified</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.never}</div>
                <p className="text-xs text-muted-foreground">Never certified</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Certifications</CardTitle>
                  <CardDescription>View and filter product certification status</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                  <TabsTrigger value="valid">Verified ({stats.valid})</TabsTrigger>
                  <TabsTrigger value="outdated">Outdated ({stats.outdated})</TabsTrigger>
                  <TabsTrigger value="never">Not Certified ({stats.never})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product Name</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Last Revised</TableHead>
                          <TableHead>Certification Status</TableHead>
                          <TableHead>Certified Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No products found matching your criteria
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredProducts.map((item) => (
                            <TableRow key={item.product.id}>
                              <TableCell className="font-medium">{item.product.name}</TableCell>
                              <TableCell>{item.product.company}</TableCell>
                              <TableCell>{item.product.category}</TableCell>
                              <TableCell>
                                {item.product.lastRevised
                                  ? format(new Date(item.product.lastRevised), 'MMM dd, yyyy')
                                  : 'N/A'}
                              </TableCell>
                              <TableCell>{getStatusBadge(item.certificationStatus)}</TableCell>
                              <TableCell>
                                {item.certificationRecord?.verified_at
                                  ? format(new Date(item.certificationRecord.verified_at), 'MMM dd, yyyy')
                                  : '-'}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => navigate(`/product/${item.product.id}`)}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </>
  );
}
