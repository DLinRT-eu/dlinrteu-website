import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import { PendingStatsWidget } from '@/components/dashboard/PendingStatsWidget';
import { useGitHubPRCount } from '@/hooks/useGitHubPRCount';
import { 
  Users, 
  FileCheck, 
  Building2, 
  BarChart3, 
  Package, 
  ShoppingCart,
  Shield,
  Settings,
  Bell,
  UserCheck,
  User,
  ScrollText,
  Activity,
  CalendarClock,
  RefreshCw,
  Mail,
  ClipboardCheck,
  BadgeCheck,
  Eye,
  GitMerge
} from 'lucide-react';
import NewsSection from '@/components/NewsSection';

export default function Dashboard_Authenticated() {
  const { user, profile } = useAuth();
  const { activeRole, isAdmin, isReviewer, isCompany } = useRoles();
  const { data: prData } = useGitHubPRCount(isAdmin);

  const getRoleDescription = () => {
    if (activeRole === 'admin') {
      return 'Full system access - Manage users, reviews, and system settings';
    }
    if (activeRole === 'reviewer') {
      return 'Review and validate product information for quality assurance';
    }
    if (activeRole === 'company') {
      return 'Manage your company products and certifications';
    }
    return 'Browse and track AI medical imaging products';
  };

  const quickActions = [
    // Admin quick actions - ordered by workflow priority
    ...(isAdmin ? [
      {
        title: 'Registrations Review',
        description: 'Approve pending user registrations',
        icon: UserCheck,
        link: '/admin/registrations',
        color: 'bg-amber-50 text-amber-600 hover:bg-amber-100'
      },
      {
        title: 'Review Rounds',
        description: 'Manage review cycles and rounds',
        icon: RefreshCw,
        link: '/admin/review-rounds',
        color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
      },
      {
        title: 'Review Assignments',
        description: 'Assign products to reviewers',
        icon: FileCheck,
        link: '/admin/reviews',
        color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
      },
      {
        title: 'Company Revisions',
        description: 'Review company-submitted revisions',
        icon: Building2,
        link: '/admin/companies',
        color: 'bg-green-50 text-green-600 hover:bg-green-100'
      },
      {
        title: 'User Management',
        description: 'Assign roles and manage users',
        icon: Users,
        link: '/admin/users',
        color: 'bg-red-50 text-red-600 hover:bg-red-100'
      },
      {
        title: 'Newsletter',
        description: 'Manage newsletter subscribers',
        icon: Mail,
        link: '/admin/newsletter',
        color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      },
      {
        title: 'Security Monitoring',
        description: 'Monitor security events',
        icon: Activity,
        link: '/admin/security-monitoring',
        color: 'bg-red-50 text-red-600 hover:bg-red-100'
      },
      {
        title: 'Changelog',
        description: 'Manage platform changelog',
        icon: ScrollText,
        link: '/admin/changelog',
        color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
      },
      {
        title: 'Pull Requests',
        description: 'Review and prioritize open PRs',
        icon: GitMerge,
        link: '/admin/pull-requests',
        color: 'bg-gray-50 text-gray-600 hover:bg-gray-100',
        badge: prData?.count
      }
    ] : []),
    // Reviewer quick actions - ordered by workflow priority
    ...(isReviewer ? [
      {
        title: 'Review Dashboard',
        description: 'Browse all products for review',
        icon: Eye,
        link: '/review',
        color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      },
      {
        title: 'Assigned Reviews',
        description: 'View your assigned product reviews',
        icon: ClipboardCheck,
        link: '/reviewer/dashboard',
        color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      },
      {
        title: 'Due Reviews',
        description: 'Reviews approaching deadline',
        icon: CalendarClock,
        link: '/reviewer/due-reviews',
        color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
      },
      {
        title: 'Expertise Preferences',
        description: 'Configure your review preferences',
        icon: Settings,
        link: '/reviewer/preferences',
        color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
      }
    ] : []),
    // Company quick actions - ordered by workflow priority
    ...(isCompany ? [
      {
        title: 'Company Overview',
        description: 'View certification progress and products',
        icon: Building2,
        link: '/company/overview',
        color: 'bg-primary/10 text-primary hover:bg-primary/20'
      },
      {
        title: 'Submit Revision',
        description: 'Submit product revision for review',
        icon: FileCheck,
        link: '/company/revisions',
        color: 'bg-green-50 text-green-600 hover:bg-green-100'
      },
      {
        title: 'My Products',
        description: 'View your company products',
        icon: Package,
        link: '/company/products',
        color: 'bg-green-50 text-green-600 hover:bg-green-100'
      },
      {
        title: 'Certify Product',
        description: 'Request product certification',
        icon: BadgeCheck,
        link: '/company/certification',
        color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
      },
      {
        title: 'Company Dashboard',
        description: 'Overview of your company',
        icon: Building2,
        link: '/company/dashboard',
        color: 'bg-green-50 text-green-600 hover:bg-green-100'
      }
    ] : []),
    // Common quick actions for all users
    {
      title: 'My Profile',
      description: 'View and edit your profile',
      icon: User,
      link: '/profile',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: 'Products',
      description: 'Browse all AI medical products',
      icon: Package,
      link: '/products',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      title: 'Analytics',
      description: 'View product statistics',
      icon: BarChart3,
      link: '/dashboard',
      color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    },
    {
      title: 'My Tracked Products',
      description: 'Track your product adoptions',
      icon: ShoppingCart,
      link: '/my-products',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
    },
    {
      title: 'Notifications',
      description: 'View all notifications',
      icon: Bell,
      link: '/notifications',
      color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
    }
  ];

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {profile?.first_name || 'User'}!
          </h1>
          <p className="text-muted-foreground text-lg">
            {getRoleDescription()}
          </p>
        </div>

        {/* Pending Stats Widget */}
        <PendingStatsWidget isAdmin={isAdmin} isReviewer={isReviewer} isCompany={isCompany} />

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.link} to={action.link}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {action.title}
                      {'badge' in action && action.badge !== undefined && action.badge > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {action.badge}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Role-Specific Widgets */}
        {isAdmin && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/users">Manage Users</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/reviews">Assign Reviews</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/security">Security Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Oversight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/company/dashboard">Open Oversight</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Registration Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/registrations">Review Registrations</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitMerge className="h-5 w-5" />
                  Pull Requests
                  {prData?.count !== undefined && prData.count > 0 && (
                    <Badge variant="secondary">{prData.count} open</Badge>
                  )}
                </CardTitle>
                {prData?.rateRemaining && parseInt(prData.rateRemaining) < 10 && (
                  <p className="text-xs text-amber-600">
                    API rate limit low: {prData.rateRemaining} remaining
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/pull-requests">Review PRs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          </div>
        )}

        {/* News Section */}
        <div className="mb-8">
          <NewsSection />
        </div>
      </div>
    </PageLayout>
  );
}
