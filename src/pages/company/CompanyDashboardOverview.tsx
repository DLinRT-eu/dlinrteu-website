import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
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
  AlertCircle
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format, formatDistanceToNow } from 'date-fns';

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

  const revisionColumns: ColumnDef<CompanyRevision>[] = [
    {
      accessorKey: 'product_id',
      header: 'Product',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('product_id')}</div>
      ),
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
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revisions">Recent Updates</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Certified products in catalog
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Verified Products</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.verifiedProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active certifications
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
                  {stats.totalProducts > 0
                    ? Math.round((stats.verifiedProducts / stats.totalProducts) * 100)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Products up to date
                </p>
              </CardContent>
            </Card>
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
                          <p className="font-medium">{revision.product_id}</p>
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
    </PageLayout>
  );
}
