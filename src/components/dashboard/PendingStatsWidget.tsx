import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  UserCheck, 
  FileCheck, 
  Building2, 
  ClipboardCheck, 
  CalendarClock,
  AlertCircle
} from 'lucide-react';

interface PendingStatsWidgetProps {
  isAdmin: boolean;
  isReviewer: boolean;
  isCompany: boolean;
}

interface AdminStats {
  pendingRegistrations: number;
  activeReviews: number;
  pendingRevisions: number;
}

interface ReviewerStats {
  assignedReviews: number;
  inProgressReviews: number;
  dueReviews: number;
}

interface CompanyStats {
  pendingRevisions: number;
  approvedRevisions: number;
}

export function PendingStatsWidget({ isAdmin, isReviewer, isCompany }: PendingStatsWidgetProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [reviewerStats, setReviewerStats] = useState<ReviewerStats | null>(null);
  const [companyStats, setCompanyStats] = useState<CompanyStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      setLoading(true);

      try {
        // Fetch admin stats
        if (isAdmin) {
          const [registrationsRes, reviewsRes, revisionsRes] = await Promise.all([
            supabase.rpc('get_registration_notifications_admin'),
            supabase.from('product_reviews').select('id', { count: 'exact', head: true }).in('status', ['pending', 'in_progress']),
            supabase.from('company_revisions').select('id', { count: 'exact', head: true }).eq('verification_status', 'pending')
          ]);

          const pendingRegistrations = Array.isArray(registrationsRes.data) 
            ? registrationsRes.data.filter((r: any) => !r.verified).length 
            : 0;

          setAdminStats({
            pendingRegistrations,
            activeReviews: reviewsRes.count || 0,
            pendingRevisions: revisionsRes.count || 0
          });
        }

        // Fetch reviewer stats
        if (isReviewer) {
          const today = new Date().toISOString().split('T')[0];
          const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

          const [assignedRes, inProgressRes, dueRes] = await Promise.all([
            supabase.from('product_reviews').select('id', { count: 'exact', head: true })
              .eq('assigned_to', user.id)
              .eq('status', 'pending'),
            supabase.from('product_reviews').select('id', { count: 'exact', head: true })
              .eq('assigned_to', user.id)
              .eq('status', 'in_progress'),
            supabase.from('product_reviews').select('id', { count: 'exact', head: true })
              .eq('assigned_to', user.id)
              .in('status', ['pending', 'in_progress'])
              .lte('deadline', nextWeek)
              .gte('deadline', today)
          ]);

          setReviewerStats({
            assignedReviews: assignedRes.count || 0,
            inProgressReviews: inProgressRes.count || 0,
            dueReviews: dueRes.count || 0
          });
        }

        // Fetch company stats
        if (isCompany) {
          const [pendingRes, approvedRes] = await Promise.all([
            supabase.from('company_revisions').select('id', { count: 'exact', head: true })
              .eq('revised_by', user.id)
              .eq('verification_status', 'pending'),
            supabase.from('company_revisions').select('id', { count: 'exact', head: true })
              .eq('revised_by', user.id)
              .eq('verification_status', 'approved')
          ]);

          setCompanyStats({
            pendingRevisions: pendingRes.count || 0,
            approvedRevisions: approvedRes.count || 0
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, isAdmin, isReviewer, isCompany]);

  if (!isAdmin && !isReviewer && !isCompany) {
    return null;
  }

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Pending Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Pending Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Admin Stats */}
        {isAdmin && adminStats && (
          <>
            <Link to="/admin/registrations">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Pending Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{adminStats.pendingRegistrations}</span>
                    {adminStats.pendingRegistrations > 0 && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                        Action needed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/reviews">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Active Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{adminStats.activeReviews}</span>
                    {adminStats.activeReviews > 0 && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        In progress
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/companies">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Pending Revisions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{adminStats.pendingRevisions}</span>
                    {adminStats.pendingRevisions > 0 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        To review
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </>
        )}

        {/* Reviewer Stats */}
        {isReviewer && reviewerStats && (
          <>
            <Link to="/reviewer/dashboard">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Assigned Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{reviewerStats.assignedReviews}</span>
                    {reviewerStats.assignedReviews > 0 && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        Pending
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/reviewer/dashboard">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-indigo-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{reviewerStats.inProgressReviews}</span>
                    {reviewerStats.inProgressReviews > 0 && (
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                        Working
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/reviewer/due-reviews">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-orange-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CalendarClock className="h-4 w-4" />
                    Due This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{reviewerStats.dueReviews}</span>
                    {reviewerStats.dueReviews > 0 && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </>
        )}

        {/* Company Stats */}
        {isCompany && companyStats && (
          <>
            <Link to="/company/revisions">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Pending Revisions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{companyStats.pendingRevisions}</span>
                    {companyStats.pendingRevisions > 0 && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                        Awaiting review
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/company/revisions">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Approved Revisions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{companyStats.approvedRevisions}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Approved
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
