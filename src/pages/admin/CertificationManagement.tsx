import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { ALL_PRODUCTS } from '@/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2, AlertTriangle, XCircle, ExternalLink, Building2, Info, Eye, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { format, formatDistanceToNow } from 'date-fns';
import SEO from '@/components/SEO';
import PageLayout from '@/components/layout/PageLayout';
import { DataControlsBar, SortDirection } from '@/components/common/DataControlsBar';
import { exportToExcelSimple } from '@/utils/excelExport';
import type { ProductDetails } from '@/types/productDetails';
import type { Tables } from '@/integrations/supabase/types';
import { calculateProductContentHash } from '@/utils/productHash';
import { HashStatusBadge, type HashStatus } from '@/components/admin/HashStatusBadge';
import { CertificationDetailDialog } from '@/components/admin/CertificationDetailDialog';
import { CertificationReminderDialog } from '@/components/admin/CertificationReminderDialog';

type CertificationRecord = Tables<'company_product_verifications'>;

interface ProductWithCertification {
  product: ProductDetails;
  certificationRecord?: CertificationRecord;
  certificationStatus: 'valid' | 'outdated' | 'never';
  hashStatus: HashStatus;
  currentHash?: string;
}

export default function CertificationManagement() {
  const { isAdmin } = useRoles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [certifications, setCertifications] = useState<CertificationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'valid' | 'outdated' | 'never'>('all');
  const [sortBy, setSortBy] = useState('product_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [productsWithHashes, setProductsWithHashes] = useState<ProductWithCertification[]>([]);
  const [calculatingHashes, setCalculatingHashes] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCertification | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchCertifications();
    fetchLastSent();
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

  // Calculate content hashes and determine status
  useEffect(() => {
    const calculateHashesForProducts = async () => {
      setCalculatingHashes(true);
      
      // Create certification map
      const certificationMap = new Map<string, CertificationRecord>();
      certifications.forEach((cert) => {
        if (!certificationMap.has(cert.product_id)) {
          certificationMap.set(cert.product_id, cert);
        }
      });

      // Calculate hash for each product and determine status
      const productsWithHashData = await Promise.all(
        ALL_PRODUCTS.map(async (product) => {
          const cert = certificationMap.get(product.id || '');
          const currentHash = await calculateProductContentHash(product);
          
          let status: 'valid' | 'outdated' | 'never' = 'never';
          let hashStatus: HashStatus = 'never';

          if (!cert) {
            status = 'never';
            hashStatus = 'never';
          } else if (cert.content_hash) {
            // Hash-based validation
            if (cert.content_hash === currentHash) {
              status = 'valid';
              hashStatus = 'valid';
            } else {
              status = 'outdated';
              hashStatus = 'mismatch';
            }
          } else {
            // Legacy: Fall back to date-based validation
            hashStatus = 'legacy';
            if (product.lastRevised && cert.verified_at) {
              const productRevised = new Date(product.lastRevised);
              const certifiedAt = new Date(cert.verified_at);
              status = productRevised > certifiedAt ? 'outdated' : 'valid';
            } else {
              status = 'valid';
            }
          }

          return {
            product,
            certificationRecord: cert,
            certificationStatus: status,
            hashStatus,
            currentHash,
          };
        })
      );

      setProductsWithHashes(productsWithHashData);
      setCalculatingHashes(false);
    };

    if (certifications.length > 0 || ALL_PRODUCTS.length > 0) {
      calculateHashesForProducts();
    }
  }, [certifications]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = productsWithHashes;

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

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let aVal: any, bVal: any;
      
      switch (sortBy) {
        case 'product_name':
          aVal = a.product.name;
          bVal = b.product.name;
          break;
        case 'company':
          aVal = a.product.company;
          bVal = b.product.company;
          break;
        case 'category':
          aVal = a.product.category;
          bVal = b.product.category;
          break;
        case 'certified_date':
          aVal = a.certificationRecord?.verified_at || '';
          bVal = b.certificationRecord?.verified_at || '';
          break;
        case 'last_revised':
          aVal = a.product.lastRevised || '';
          bVal = b.product.lastRevised || '';
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [productsWithHashes, searchQuery, activeTab, sortBy, sortDirection]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: productsWithHashes.length,
      valid: productsWithHashes.filter((p) => p.certificationStatus === 'valid').length,
      outdated: productsWithHashes.filter((p) => p.certificationStatus === 'outdated').length,
      never: productsWithHashes.filter((p) => p.certificationStatus === 'never').length,
      hashBased: productsWithHashes.filter((p) => p.hashStatus === 'valid' || p.hashStatus === 'mismatch').length,
      legacy: productsWithHashes.filter((p) => p.hashStatus === 'legacy').length,
    };
  }, [productsWithHashes]);

  const handleViewDetails = (item: ProductWithCertification) => {
    setSelectedProduct(item);
    setDetailDialogOpen(true);
  };

  const fetchLastSent = async () => {
    const { data } = await supabase
      .from('certification_reminder_logs')
      .select('sent_at')
      .order('sent_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data?.sent_at) setLastSentAt(data.sent_at);
  };


  const handleExportCSV = () => {
    const csvData = filteredProducts.map(item => ({
      'Product Name': item.product.name,
      'Company': item.product.company,
      'Category': item.product.category,
      'Last Revised': item.product.lastRevised ? format(new Date(item.product.lastRevised), 'yyyy-MM-dd') : 'N/A',
      'Certification Status': item.certificationStatus,
      'Hash Status': item.hashStatus,
      'Content Hash': item.currentHash || 'N/A',
      'Certified Date': item.certificationRecord?.verified_at ? format(new Date(item.certificationRecord.verified_at), 'yyyy-MM-dd') : '-',
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certifications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  const handleExportExcel = async () => {
    const data = filteredProducts.map(item => ({
      'Product Name': item.product.name,
      'Company': item.product.company,
      'Category': item.product.category,
      'Last Revised': item.product.lastRevised ? format(new Date(item.product.lastRevised), 'yyyy-MM-dd') : 'N/A',
      'Certification Status': item.certificationStatus,
      'Hash Status': item.hashStatus,
      'Content Hash': item.currentHash || 'N/A',
      'Certified Date': item.certificationRecord?.verified_at ? format(new Date(item.certificationRecord.verified_at), 'yyyy-MM-dd') : '-',
    }));

    await exportToExcelSimple(data, `certifications_${new Date().toISOString().split('T')[0]}.xlsx`, 'Certifications');
    toast.success('Exported to Excel');
  };

  const handleExportJSON = () => {
    const jsonData = JSON.stringify(filteredProducts, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certifications_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success('Exported to JSON');
  };

  if (loading || calculatingHashes) {
    return (
      <PageLayout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                {loading ? 'Loading certification data...' : 'Calculating content hashes...'}
              </p>
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
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setReminderDialogOpen(true)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Certification Reminders
                </Button>
                <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Manage Companies
                </Button>
              </div>
              {lastSentAt && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Last sent {formatDistanceToNow(new Date(lastSentAt), { addSuffix: true })}
                </span>
              )}
            </div>
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

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hash-Based</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.hashBased}</div>
                <p className="text-xs text-muted-foreground">Content hash tracked</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Legacy</CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.legacy}</div>
                <p className="text-xs text-muted-foreground">Date-based only</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Certifications</CardTitle>
                    <CardDescription>View and filter product certification status</CardDescription>
                  </div>
                </div>
                <DataControlsBar
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchPlaceholder="Search products, companies, categories..."
                  sortOptions={[
                    { value: 'product_name', label: 'Product Name' },
                    { value: 'company', label: 'Company' },
                    { value: 'category', label: 'Category' },
                    { value: 'last_revised', label: 'Last Revised' },
                    { value: 'certified_date', label: 'Certified Date' },
                  ]}
                  sortValue={sortBy}
                  onSortChange={setSortBy}
                  sortDirection={sortDirection}
                  onSortDirectionChange={setSortDirection}
                  showExportButton
                  onExportCSV={handleExportCSV}
                  onExportExcel={handleExportExcel}
                  onExportJSON={handleExportJSON}
                  onClearFilters={() => {
                    setSearchQuery('');
                    setSortBy('product_name');
                    setSortDirection('asc');
                  }}
                />
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
                          <TableHead>Hash Status</TableHead>
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
                              <TableCell>
                                <HashStatusBadge status={item.hashStatus} />
                              </TableCell>
                              <TableCell>
                                {item.certificationRecord?.verified_at
                                  ? format(new Date(item.certificationRecord.verified_at), 'MMM dd, yyyy')
                                  : '-'}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleViewDetails(item)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate(`/product/${item.product.id}`)}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
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

        {/* Certification Detail Dialog */}
        {selectedProduct && (
          <CertificationDetailDialog
            open={detailDialogOpen}
            onOpenChange={setDetailDialogOpen}
            product={selectedProduct.product}
            certificationRecord={selectedProduct.certificationRecord}
            hashStatus={selectedProduct.hashStatus}
            currentHash={selectedProduct.currentHash}
          />
        )}

        {/* Certification Reminder Dialog */}
        <CertificationReminderDialog
          open={reminderDialogOpen}
          onOpenChange={setReminderDialogOpen}
          onSent={() => fetchLastSent()}
        />
      </PageLayout>
    </>
  );
}

