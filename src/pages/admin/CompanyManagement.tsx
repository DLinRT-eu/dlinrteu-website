import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Building2, UserPlus, UserCheck, UserX, Search, AlertCircle, ArrowUpDown, ArrowUp, ArrowDown, Download, FileSpreadsheet, FileText, RefreshCcw, Shield } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { COMPANIES } from '@/data';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as XLSX from 'xlsx';

interface CompanyRepresentative {
  id: string;
  user_id: string;
  company_name: string;
  company_id: string;
  position: string | null;
  verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  created_at: string;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

type SortField = 'name' | 'reps' | 'verified';
type SortOrder = 'asc' | 'desc';

export default function CompanyManagement() {
  const { user } = useAuth();
  const [representatives, setRepresentatives] = useState<CompanyRepresentative[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [position, setPosition] = useState('');
  const [processing, setProcessing] = useState(false);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedReps, setSelectedReps] = useState<Set<string>>(new Set());
  const [processingBulk, setProcessingBulk] = useState(false);

  useEffect(() => {
    fetchRepresentatives();
  }, []);

  const fetchRepresentatives = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('company_representatives')
        .select(`
          *,
          profiles!inner(email, first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRepresentatives(data as unknown as CompanyRepresentative[]);
    } catch (error: any) {
      console.error('Error fetching representatives:', error);
      toast.error('Failed to load company representatives');
    } finally {
      setLoading(false);
    }
  };

  const getCompanyReps = (companyId: string) => {
    return representatives.filter(rep => rep.company_id === companyId);
  };

  const getVerifiedCount = (companyId: string) => {
    return representatives.filter(rep => rep.company_id === companyId && rep.verified).length;
  };

  const handleAssignUser = async () => {
    if (!userEmail || !selectedCompanyId || !user) {
      toast.error('Please fill in all fields');
      return;
    }

    setProcessing(true);
    try {
      // Find user by email
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', userEmail.trim())
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profileData) {
        toast.error('User not found with that email address');
        return;
      }

      // Check if already assigned - match both company_id AND company_name
      const company = COMPANIES.find(c => c.id === selectedCompanyId);
      const companyName = company?.name || selectedCompanyId;
      
      const existing = representatives.find(
        rep => rep.user_id === profileData.id && 
               (rep.company_id === selectedCompanyId || rep.company_name === companyName)
      );

      if (existing) {
        toast.error('This user is already a representative for this company');
        return;
      }

      // Check limit
      const verifiedCount = getVerifiedCount(selectedCompanyId);
      if (verifiedCount >= 5) {
        toast.error('Company already has 5 verified representatives (maximum)');
        return;
      }

      // Create company representative
      const { error: insertError } = await supabase
        .from('company_representatives')
        .insert({
          user_id: profileData.id,
          company_name: company?.name || selectedCompanyId,
          company_id: selectedCompanyId,
          position: position.trim() || null,
          verified: false,
          verified_by: null,
        });

      if (insertError) throw insertError;

      toast.success('User assigned to company successfully');
      setAssignDialogOpen(false);
      setUserEmail('');
      setPosition('');
      setSelectedCompanyId(null);
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error assigning user:', error);
      // Better error message for duplicate key constraint
      if (error.message?.includes('duplicate key') || error.message?.includes('company_representatives_user_id_company_name_key')) {
        toast.error('This user is already a representative for this company');
      } else {
        toast.error(error.message || 'Failed to assign user');
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleVerify = async (rep: CompanyRepresentative) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('company_representatives')
        .update({
          verified: true,
          verified_by: user.id,
          verified_at: new Date().toISOString(),
        })
        .eq('id', rep.id);

      if (error) throw error;

      // Also grant company role if not already granted
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: rep.user_id,
          role: 'company',
          granted_by: user.id,
        });

      // Ignore duplicate key error (role already exists)
      if (roleError && !roleError.message.includes('duplicate')) {
        throw roleError;
      }

      toast.success('Representative verified successfully');
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error verifying representative:', error);
      toast.error(error.message || 'Failed to verify representative');
    }
  };

  const handleUnverify = async (rep: CompanyRepresentative) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('company_representatives')
        .update({
          verified: false,
          verified_by: null,
          verified_at: null,
        })
        .eq('id', rep.id);

      if (error) throw error;

      toast.success('Representative unverified');
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error unverifying representative:', error);
      toast.error(error.message || 'Failed to unverify representative');
    }
  };

  const handleRemove = async (rep: CompanyRepresentative) => {
    if (!confirm('Are you sure you want to remove this representative?')) return;

    try {
      const { error } = await supabase
        .from('company_representatives')
        .delete()
        .eq('id', rep.id);

      if (error) throw error;

      toast.success('Representative removed');
      fetchRepresentatives();
    } catch (error: any) {
      console.error('Error removing representative:', error);
      toast.error(error.message || 'Failed to remove representative');
    }
  };

  const handleBulkVerify = async () => {
    if (selectedReps.size === 0) return;
    
    setProcessingBulk(true);
    const selectedArray = Array.from(selectedReps);
    let successCount = 0;
    let failCount = 0;

    for (const repId of selectedArray) {
      const rep = representatives.find(r => r.id === repId);
      if (rep && !rep.verified) {
        try {
          const { error: updateError } = await supabase
            .from('company_representatives')
            .update({
              verified: true,
              verified_by: user?.id,
              verified_at: new Date().toISOString(),
            })
            .eq('id', repId);

          if (updateError) throw updateError;

          const { error: roleError } = await supabase
            .from('user_roles')
            .insert([{
              user_id: rep.user_id,
              role: 'company',
              granted_by: user?.id,
            }]);

          if (roleError && !roleError.message.includes('duplicate key')) {
            throw roleError;
          }

          successCount++;
        } catch (error) {
          console.error(`[handleBulkVerify] Error verifying ${repId}:`, error);
          failCount++;
        }
      }
    }

    if (successCount > 0) {
      toast.success(`Verified ${successCount} representative${successCount > 1 ? 's' : ''}`);
    }
    if (failCount > 0) {
      toast.error(`Failed to verify ${failCount} representative${failCount > 1 ? 's' : ''}`);
    }

    setSelectedReps(new Set());
    setProcessingBulk(false);
    fetchRepresentatives();
  };

  const handleBulkReject = async () => {
    if (selectedReps.size === 0) return;
    
    if (!confirm(`Are you sure you want to remove ${selectedReps.size} representative${selectedReps.size > 1 ? 's' : ''}?`)) {
      return;
    }

    setProcessingBulk(true);
    const selectedArray = Array.from(selectedReps);
    let successCount = 0;
    let failCount = 0;

    for (const repId of selectedArray) {
      try {
        const { error } = await supabase
          .from('company_representatives')
          .delete()
          .eq('id', repId);

        if (error) throw error;
        successCount++;
      } catch (error) {
        console.error(`[handleBulkReject] Error removing ${repId}:`, error);
        failCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`Removed ${successCount} representative${successCount > 1 ? 's' : ''}`);
    }
    if (failCount > 0) {
      toast.error(`Failed to remove ${failCount} representative${failCount > 1 ? 's' : ''}`);
    }

    setSelectedReps(new Set());
    setProcessingBulk(false);
    fetchRepresentatives();
  };

  const exportToCSV = () => {
    const csvData = representatives.map(rep => ({
      'First Name': rep.profiles.first_name,
      'Last Name': rep.profiles.last_name,
      'Email': rep.profiles.email,
      'Company': rep.company_name,
      'Company ID': rep.company_id || '',
      'Position': rep.position || '',
      'Status': rep.verified ? 'Verified' : 'Pending',
      'Verified Date': rep.verified_at ? new Date(rep.verified_at).toLocaleDateString() : '',
      'Created Date': new Date(rep.created_at).toLocaleDateString(),
    }));

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => 
      Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company_representatives_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('CSV export downloaded');
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: All Representatives
    const repData = representatives.map(rep => ({
      'First Name': rep.profiles.first_name,
      'Last Name': rep.profiles.last_name,
      'Email': rep.profiles.email,
      'Company': rep.company_name,
      'Company ID': rep.company_id || '',
      'Position': rep.position || '',
      'Status': rep.verified ? 'Verified' : 'Pending',
      'Verified Date': rep.verified_at ? new Date(rep.verified_at).toLocaleDateString() : '',
      'Created Date': new Date(rep.created_at).toLocaleDateString(),
    }));

    const repSheet = XLSX.utils.json_to_sheet(repData);
    XLSX.utils.book_append_sheet(workbook, repSheet, 'Representatives');

    // Sheet 2: Summary by Company
    const companySummary = COMPANIES.map(company => ({
      'Company': company.name,
      'Total Reps': getCompanyReps(company.id).length,
      'Verified': getVerifiedCount(company.id),
      'Pending': getCompanyReps(company.id).length - getVerifiedCount(company.id),
    }));

    const summarySheet = XLSX.utils.json_to_sheet(companySummary);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Company Summary');

    XLSX.writeFile(workbook, `company_representatives_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast.success('Excel export downloaded');
  };

  const toggleSelectAll = () => {
    const pendingReps = representatives.filter(rep => !rep.verified);
    if (selectedReps.size === pendingReps.length) {
      setSelectedReps(new Set());
    } else {
      setSelectedReps(new Set(pendingReps.map(r => r.id)));
    }
  };

  const toggleSelectRep = (repId: string) => {
    const newSelected = new Set(selectedReps);
    if (newSelected.has(repId)) {
      newSelected.delete(repId);
    } else {
      newSelected.add(repId);
    }
    setSelectedReps(newSelected);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const filteredCompanies = COMPANIES.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    let compareValue = 0;
    
    if (sortField === 'name') {
      compareValue = a.name.localeCompare(b.name);
    } else if (sortField === 'reps') {
      compareValue = getCompanyReps(a.id).length - getCompanyReps(b.id).length;
    } else if (sortField === 'verified') {
      compareValue = getVerifiedCount(a.id) - getVerifiedCount(b.id);
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  // Filter out admin oversight entries for statistics
  const realCompanyReps = representatives.filter(r => r.company_id !== 'admin_all_companies');
  const adminOversightCount = representatives.filter(r => r.company_id === 'admin_all_companies').length;
  const pendingCount = realCompanyReps.filter(r => !r.verified).length;
  const totalCompaniesWithReps = new Set(realCompanyReps.map(r => r.company_id)).size;
  
  // For Representatives tab - add search and sort
  const [repSearchQuery, setRepSearchQuery] = useState('');
  const [repSortField, setRepSortField] = useState<'name' | 'email' | 'company' | 'status' | 'date'>('date');
  const [repSortOrder, setRepSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const filteredReps = representatives.filter(rep => {
    const searchLower = repSearchQuery.toLowerCase();
    return (
      rep.profiles.first_name.toLowerCase().includes(searchLower) ||
      rep.profiles.last_name.toLowerCase().includes(searchLower) ||
      rep.profiles.email.toLowerCase().includes(searchLower) ||
      rep.company_name.toLowerCase().includes(searchLower)
    );
  });
  
  const sortedReps = [...filteredReps].sort((a, b) => {
    let compareValue = 0;
    if (repSortField === 'name') {
      compareValue = `${a.profiles.first_name} ${a.profiles.last_name}`.localeCompare(`${b.profiles.first_name} ${b.profiles.last_name}`);
    } else if (repSortField === 'email') {
      compareValue = a.profiles.email.localeCompare(b.profiles.email);
    } else if (repSortField === 'company') {
      compareValue = a.company_name.localeCompare(b.company_name);
    } else if (repSortField === 'status') {
      compareValue = (a.verified ? 1 : 0) - (b.verified ? 1 : 0);
    } else if (repSortField === 'date') {
      compareValue = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return repSortOrder === 'asc' ? compareValue : -compareValue;
  });

  // Sort pending representatives by date
  const sortedPendingReps = [...representatives]
    .filter(rep => !rep.verified)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (loading) {
    return (
      <PageLayout title="Company Management">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Company Management"
      description="Manage company representatives and verify certification permissions"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Company Management</h1>
        <Button variant="outline" asChild>
          <a href="/admin/company-mapping-validator">
            <Shield className="mr-2 h-4 w-4" />
            Validate Mappings
          </a>
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">All Companies</TabsTrigger>
          <TabsTrigger value="representatives">
            Representatives
            <Badge variant="secondary" className="ml-2">
              {representatives.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending Verifications
            <Badge 
              variant={pendingCount > 0 ? "destructive" : "secondary"} 
              className="ml-2"
            >
              {pendingCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search statistics..."
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{COMPANIES.length}</p>
                <p className="text-sm text-muted-foreground">
                  {totalCompaniesWithReps} with representatives
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Representatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{realCompanyReps.length}</p>
                <p className="text-sm text-muted-foreground">
                  {realCompanyReps.filter(r => r.verified).length} verified
                </p>
                {adminOversightCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    + {adminOversightCount} admin oversight
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Awaiting admin review</p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Each company can have a maximum of 5 verified representatives.
              Representatives must be verified to certify products.
              Admins can certify any company's products without being a representative.
            </AlertDescription>
          </Alert>

          {/* Debug Info Card */}
          <Card className="bg-muted/50 border-dashed">
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Debug Info</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="text-xs space-y-1">
                <p>Total loaded: {representatives.length}</p>
                <p>Verified: {representatives.filter(r => r.verified).length}</p>
                <p>Pending in memory: {representatives.filter(r => !r.verified).length}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    console.log('All representatives:', representatives);
                    console.log('Pending:', representatives.filter(r => !r.verified));
                    fetchRepresentatives();
                    toast.success('Data refreshed - check console');
                  }}
                  className="mt-2"
                >
                  <RefreshCcw className="h-3 w-3 mr-1" />
                  Refresh & Debug
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort('name')}
                className="gap-2"
              >
                Name {getSortIcon('name')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort('reps')}
                className="gap-2"
              >
                Reps {getSortIcon('reps')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort('verified')}
                className="gap-2"
              >
                Verified {getSortIcon('verified')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sortedCompanies.map(company => {
              const companyReps = getCompanyReps(company.id);
              const verifiedCount = getVerifiedCount(company.id);

              return (
                <Card key={company.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <CardTitle>{company.name}</CardTitle>
                          <CardDescription>{company.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={verifiedCount >= 5 ? 'default' : 'secondary'}>
                          {verifiedCount}/5 verified
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={verifiedCount >= 5}
                          onClick={() => {
                            setSelectedCompanyId(company.id);
                            setAssignDialogOpen(true);
                          }}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign User
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {companyReps.length > 0 && (
                    <CardContent>
                      <div className="space-y-2">
                        {companyReps.map(rep => (
                          <div
                            key={rep.id}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div>
                              <p className="font-medium">
                                {rep.profiles.first_name} {rep.profiles.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">{rep.profiles.email}</p>
                              {rep.position && (
                                <p className="text-xs text-muted-foreground">{rep.position}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {rep.verified ? (
                                <>
                                  <Badge variant="default">
                                    <UserCheck className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUnverify(rep)}
                                  >
                                    Unverify
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleVerify(rep)}
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Verify
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemove(rep)}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="representatives" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search representatives..."
                value={repSearchQuery}
                onChange={(e) => setRepSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setRepSortField('name');
                          setRepSortOrder(repSortField === 'name' && repSortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                      >
                        Name {repSortField === 'name' && (repSortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setRepSortField('email');
                          setRepSortOrder(repSortField === 'email' && repSortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                      >
                        Email {repSortField === 'email' && (repSortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setRepSortField('company');
                          setRepSortOrder(repSortField === 'company' && repSortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                      >
                        Company {repSortField === 'company' && (repSortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Position</th>
                      <th 
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setRepSortField('status');
                          setRepSortOrder(repSortField === 'status' && repSortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                      >
                        Status {repSortField === 'status' && (repSortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setRepSortField('date');
                          setRepSortOrder(repSortField === 'date' && repSortOrder === 'asc' ? 'desc' : 'asc');
                        }}
                      >
                        Created {repSortField === 'date' && (repSortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sortedReps.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No representatives found
                        </td>
                      </tr>
                    ) : (
                      sortedReps.map(rep => (
                        <tr key={rep.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">
                            {rep.profiles.first_name} {rep.profiles.last_name}
                          </td>
                          <td className="px-4 py-3 text-sm">{rep.profiles.email}</td>
                          <td className="px-4 py-3 text-sm">{rep.company_name}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {rep.position || '-'}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={rep.verified ? 'default' : 'secondary'}>
                              {rep.verified ? 'Verified' : 'Pending'}
                            </Badge>
                            {rep.company_id === 'admin_all_companies' && (
                              <Badge variant="outline" className="ml-1">Admin Oversight</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {new Date(rep.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {rep.verified ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUnverify(rep)}
                                >
                                  Unverify
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleVerify(rep)}
                                >
                                  Verify
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemove(rep)}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pending..."
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {sortedPendingReps.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedReps.size === sortedPendingReps.length && sortedPendingReps.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedReps.size > 0 
                    ? `${selectedReps.size} selected` 
                    : 'Select all'}
                </span>
              </div>
              {selectedReps.size > 0 && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleBulkVerify}
                    disabled={processingBulk}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Verify Selected
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleBulkReject}
                    disabled={processingBulk}
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Remove Selected
                  </Button>
                </div>
              )}
            </div>
          )}

          {pendingCount === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No pending verifications. All representatives are verified.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {sortedPendingReps.map(rep => {
                  const company = COMPANIES.find(c => c.id === rep.company_id);
                  return (
                    <Card key={rep.id}>
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedReps.has(rep.id)}
                            onCheckedChange={() => toggleSelectRep(rep.id)}
                            className="mt-1"
                          />
                          <div className="flex items-center justify-between flex-1">
                            <div>
                              <CardTitle className="text-lg">
                                {rep.profiles.first_name} {rep.profiles.last_name}
                              </CardTitle>
                              <CardDescription>
                                {rep.profiles.email} • {company?.name || rep.company_id}
                              </CardDescription>
                              {rep.position && (
                                <p className="text-sm text-muted-foreground mt-1">{rep.position}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="default"
                                onClick={() => handleVerify(rep)}
                              >
                                <UserCheck className="h-4 w-4 mr-2" />
                                Verify
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleRemove(rep)}
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign User to Company</DialogTitle>
            <DialogDescription>
              Add a user as a representative for{' '}
              {COMPANIES.find(c => c.id === selectedCompanyId)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="position">Position (Optional)</Label>
              <Input
                id="position"
                placeholder="e.g., Product Manager"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignUser} disabled={processing}>
              {processing ? 'Assigning...' : 'Assign User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
