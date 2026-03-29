import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PageLayout from '@/components/layout/PageLayout';
import { PendingStatsWidget } from '@/components/dashboard/PendingStatsWidget';
import { useGitHubPRCount } from '@/hooks/useGitHubPRCount';
import { 
  Users, 
  FileCheck, 
  Building2, 
  BarChart3,
  LayoutDashboard,
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
  GitMerge,
  FilePenLine,
  Search,
  ChevronDown,
  Newspaper,
  BookOpen
} from 'lucide-react';
import NewsSection from '@/components/NewsSection';

interface QuickAction {
  title: string;
  description: string;
  icon: any;
  link: string;
  color: string;
  badge?: number;
}

function ActionCard({ action }: { action: QuickAction }) {
  return (
    <Link to={action.link}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
            <action.icon className="h-6 w-6" />
          </div>
          <CardTitle className="flex items-center gap-2 text-base">
            {action.title}
            {action.badge !== undefined && action.badge > 0 && (
              <Badge variant="secondary" className="text-xs">
                {action.badge}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>{action.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function PrimaryActionCard({ action }: { action: QuickAction }) {
  return (
    <Link to={action.link}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className={`w-14 h-14 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
            <action.icon className="h-7 w-7" />
          </div>
          <CardTitle className="flex items-center gap-2">
            {action.title}
            {action.badge !== undefined && action.badge > 0 && (
              <Badge variant="secondary" className="text-xs">
                {action.badge}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>{action.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function Dashboard_Authenticated() {
  const { user, profile } = useAuth();
  const { activeRole, isAdmin, isReviewer, isCompany } = useRoles();
  const { data: prData } = useGitHubPRCount(isAdmin);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllAdmin, setShowAllAdmin] = useState(false);

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

  // Admin actions split into primary and secondary
  const adminPrimary: QuickAction[] = [
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
      title: 'Certification Management',
      description: 'Manage product certifications',
      icon: BadgeCheck,
      link: '/admin/certifications',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
    },
    {
      title: 'Company Revisions',
      description: 'Review company-submitted revisions',
      icon: Building2,
      link: '/admin/companies',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
  ];

  const adminSecondary: QuickAction[] = [
    {
      title: 'Admin Overview',
      description: 'Central admin hub',
      icon: LayoutDashboard,
      link: '/admin',
      color: 'bg-slate-50 text-slate-600 hover:bg-slate-100'
    },
    {
      title: 'Review Assignments',
      description: 'Assign products to reviewers',
      icon: FileCheck,
      link: '/admin/reviews',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
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
      title: 'Edit Approvals',
      description: 'Review product edit submissions',
      icon: FilePenLine,
      link: '/admin/edit-approvals',
      color: 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100'
    },
    {
      title: 'Pull Requests',
      description: 'Review and prioritize open PRs',
      icon: GitMerge,
      link: '/admin/pull-requests',
      color: 'bg-gray-50 text-gray-600 hover:bg-gray-100',
      badge: prData?.count
    },
  ];

  // Reviewer actions split into primary and secondary
  const reviewerPrimary: QuickAction[] = [
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
      title: 'Review Dashboard',
      description: 'Browse all products for review',
      icon: Eye,
      link: '/review',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
  ];

  const reviewerSecondary: QuickAction[] = [
    {
      title: 'Expertise Preferences',
      description: 'Configure your review preferences',
      icon: Settings,
      link: '/reviewer/preferences',
      color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
    },
    {
      title: 'Reviewer Guide',
      description: 'Review process documentation',
      icon: BookOpen,
      link: '/reviewer/guide',
      color: 'bg-slate-50 text-slate-600 hover:bg-slate-100'
    },
  ];

  // Company actions split into primary and secondary
  const companyPrimary: QuickAction[] = [
    {
      title: 'Certify Product',
      description: 'Verify your product information',
      icon: BadgeCheck,
      link: '/company/certification',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
    },
    {
      title: 'My Products',
      description: 'View your company products',
      icon: Package,
      link: '/company/products',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      title: 'Submit Revision',
      description: 'Submit product revision for review',
      icon: FileCheck,
      link: '/company/dashboard',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
  ];

  const companySecondary: QuickAction[] = [
    {
      title: 'Company Overview',
      description: 'View certification progress',
      icon: Building2,
      link: '/company/overview',
      color: 'bg-primary/10 text-primary hover:bg-primary/20'
    },
    {
      title: 'Company Guide',
      description: 'Certification process docs',
      icon: BookOpen,
      link: '/company/guide',
      color: 'bg-slate-50 text-slate-600 hover:bg-slate-100'
    },
  ];

  // Common actions for all users
  const commonActions: QuickAction[] = [
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
    },
    {
      title: 'My Profile',
      description: 'View and edit your profile',
      icon: User,
      link: '/profile',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
  ];

  // Regular user (no role) primary actions
  const regularPrimary: QuickAction[] = [
    {
      title: 'Products',
      description: 'Browse all AI medical products',
      icon: Package,
      link: '/products',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      title: 'Companies',
      description: 'Browse AI companies',
      icon: Building2,
      link: '/companies',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      title: 'Analytics',
      description: 'View product statistics',
      icon: BarChart3,
      link: '/dashboard',
      color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    },
    {
      title: 'News',
      description: 'Latest platform updates',
      icon: Newspaper,
      link: '/news',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
  ];

  const isRegularUser = !isAdmin && !isReviewer && !isCompany;

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

        {/* Search Bar */}
        <div className="mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
            className="relative max-w-2xl"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search AI medical imaging products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 text-base"
            />
          </form>
        </div>

        {/* Pending Stats Widget */}
        <PendingStatsWidget isAdmin={isAdmin} isReviewer={isReviewer} isCompany={isCompany} />

        {/* Role-Specific Primary Actions */}
        {isAdmin && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Priority Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {adminPrimary.map((action) => (
                <PrimaryActionCard key={action.link} action={action} />
              ))}
            </div>

            <Collapsible open={showAllAdmin} onOpenChange={setShowAllAdmin}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="gap-2 text-muted-foreground mb-3">
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllAdmin ? 'rotate-180' : ''}`} />
                  {showAllAdmin ? 'Hide' : 'Show'} All Admin Tools ({adminSecondary.length})
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {adminSecondary.map((action) => (
                    <ActionCard key={action.link} action={action} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        {isReviewer && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {reviewerPrimary.map((action) => (
                <PrimaryActionCard key={action.link} action={action} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviewerSecondary.map((action) => (
                <ActionCard key={action.link} action={action} />
              ))}
            </div>
          </div>
        )}

        {isCompany && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Certification & Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {companyPrimary.map((action) => (
                <PrimaryActionCard key={action.link} action={action} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companySecondary.map((action) => (
                <ActionCard key={action.link} action={action} />
              ))}
            </div>
          </div>
        )}

        {isRegularUser && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regularPrimary.map((action) => (
                <PrimaryActionCard key={action.link} action={action} />
              ))}
            </div>
          </div>
        )}

        {/* Common Actions */}
        {!isRegularUser && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-muted-foreground">General</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {commonActions.map((action) => (
                <ActionCard key={action.link} action={action} />
              ))}
            </div>
          </div>
        )}

        {isRegularUser && (
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonActions.filter(a => a.link !== '/products').map((action) => (
                <ActionCard key={action.link} action={action} />
              ))}
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