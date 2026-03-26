import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { 
  Shield, 
  CheckCircle2, 
  Users, 
  GitBranch, 
  AlertCircle,
  ArrowRight,
  Eye,
  Settings,
  Database,
  Lock,
  UserCheck,
  FileText,
  BarChart3
} from 'lucide-react';

export default function AdminGuide() {
  return (
    <PageLayout
      title="Administrator Guide | DLinRT"
      description="Comprehensive guide for platform administrators on managing users, reviews, and security"
      canonical="https://dlinrt.eu/admin/guide"
    >
      <div className="container max-w-5xl py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-500/10 rounded-full">
              <Shield className="h-12 w-12 text-gray-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Administrator Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about managing the DLinRT platform
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Button asChild>
              <Link to="/admin/dashboard">
                <Eye className="h-4 w-4 mr-2" />
                Go to Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8 border-gray-500/20">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Navigate to key admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <Button variant="outline" asChild className="justify-start">
                <Link to="/admin/dashboard"><Eye className="h-4 w-4 mr-2" />Admin Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/admin/user-management"><Users className="h-4 w-4 mr-2" />User Management</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/admin/review-rounds"><GitBranch className="h-4 w-4 mr-2" />Review Rounds</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/admin/security-monitoring"><Lock className="h-4 w-4 mr-2" />Security Monitoring</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#overview"><Shield className="h-4 w-4 mr-2" />Role Overview</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#best-practices"><CheckCircle2 className="h-4 w-4 mr-2" />Best Practices</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overview Section */}
        <section id="overview" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Role Overview</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-600" />
                What is a Platform Administrator?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Platform Administrators have full access to manage users, review rounds, security settings, 
                and all platform operations. This role carries significant responsibility for maintaining 
                the integrity and security of the DLinRT platform.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Core Responsibilities
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Manage user accounts, roles, and permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Create and manage review rounds and assignments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Monitor platform security and audit logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Review and approve role requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Oversee platform analytics and performance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  Security & Privacy
                </h4>
                <p className="text-sm text-muted-foreground">
                  Admin access includes sensitive user data. Always follow GDPR guidelines, document 
                  administrative actions, and maintain strict confidentiality of user information.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Access Workflow */}
        <section id="access" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Admin Access</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>How Admin Access is Granted</CardTitle>
              <CardDescription>Administrator roles are assigned by the organization, not requested by users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>Important:</strong> Admin access is granted directly by the organization. 
                    There is no self-service request process for this role.
                  </span>
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">Organization Decision</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <UserCheck className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">Admin Assignment</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="font-semibold text-sm">Access Granted</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Functions */}
        <section id="functions" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Key Administrative Functions</h2>
          
          <div className="space-y-4">
            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage all user accounts, roles, and permissions. Review role requests, approve or 
                  reject applications, and assign appropriate access levels.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/user-management">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Review Rounds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-purple-500" />
                  Review Rounds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and manage review rounds, assign products to reviewers, track progress, 
                  and monitor completion rates. Set deadlines and priorities for reviews.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/review-rounds">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Manage Review Rounds
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Security Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-500" />
                  Security Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor security events, review audit logs, and track administrative actions. 
                  Identify and respond to potential security threats.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/security-monitoring">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View Security Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Access comprehensive analytics on platform usage, user engagement, review 
                  performance, and system health metrics.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/dashboard">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-gray-600" />
                Guidelines for Effective Administration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-600" />
                  Regular Monitoring
                </h4>
                <p className="text-sm text-muted-foreground">
                  Review security logs, user activity, and system performance regularly. Address 
                  issues promptly to maintain platform integrity.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-red-600" />
                  Security First
                </h4>
                <p className="text-sm text-muted-foreground">
                  Always prioritize security and data protection. Follow GDPR guidelines, document 
                  all administrative actions, and maintain secure access practices.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-amber-600" />
                  Timely Role Reviews
                </h4>
                <p className="text-sm text-muted-foreground">
                  Process role requests promptly. Verify credentials thoroughly but respond to 
                  users within reasonable timeframes (2-5 business days).
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  Documentation
                </h4>
                <p className="text-sm text-muted-foreground">
                  Maintain clear documentation of administrative decisions, especially for role 
                  assignments, security incidents, and policy changes.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-green-600" />
                  Continuous Improvement
                </h4>
                <p className="text-sm text-muted-foreground">
                  Regularly review and improve administrative processes. Gather feedback from users 
                  and reviewers to enhance platform operations.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Support Section */}
        <section className="mb-12">
          <Card className="border-gray-500/20 bg-gray-50/30 dark:bg-gray-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-600" />
                Administrative Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                For technical support, system issues, or questions about administrative processes, 
                contact the platform development team.
              </p>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/support">Contact Support</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/admin/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
