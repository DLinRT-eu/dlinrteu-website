import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { Users, Search, Building2, Shield, ArrowRight, HelpCircle, FileText } from 'lucide-react';

export default function Roles() {
  return (
    <PageLayout
      title="User Roles | DLinRT"
      description="Learn about different user roles and how to contribute to the DLinRT community"
      canonical="https://dlinrt.eu/roles"
    >
      <div className="container max-w-7xl py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the DLinRT Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with professionals, share experiences, and contribute to advancing deep learning in radiotherapy
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* User Role */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">User</CardTitle>
              </div>
              <CardDescription className="text-base">
                Track products and share experiences with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What you can do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Browse comprehensive product database with detailed information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Track products you use, own, or are evaluating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Specify your relationship status with each product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Optionally share experiences with explicit consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>View community experiences from other users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Export product data and model cards</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-primary">Automatically granted upon signup</p>
              </div>
            </CardContent>
          </Card>

          {/* Reviewer Role */}
          <Card className="hover:shadow-lg transition-shadow border-purple-500/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Search className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-2xl">Reviewer</CardTitle>
              </div>
              <CardDescription className="text-base">
                Contribute your expertise by validating product information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What you can do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Access dedicated reviewer dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Review assigned products for accuracy and completeness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Set expertise preferences (categories, companies, specific products)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>View all user experiences and feedback for products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Submit detailed product reviews and suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Track review assignments and completion status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>All User role capabilities</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 space-y-2">
                <p className="text-sm font-medium text-purple-600">How to request:</p>
                <p className="text-xs text-muted-foreground">
                  Go to Profile → Request Role → Select Reviewer → Provide justification (expertise, institution, etc.)
                </p>
                <p className="text-xs text-muted-foreground">
                  Requires admin approval. Users with @dlinrt.eu email are auto-approved.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Role */}
          <Card className="hover:shadow-lg transition-shadow border-green-500/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Company Representative</CardTitle>
              </div>
              <CardDescription className="text-base">
                Manage and update your company's product information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What you can do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Access company products dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Submit product updates and corrections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>View users who adopted your products (with explicit consent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Access user feedback and relationship status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Contact users who opted in for communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Track revision submission and approval status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>All User role capabilities</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 space-y-2">
                <p className="text-sm font-medium text-green-600">How to request:</p>
                <p className="text-xs text-muted-foreground">
                  Go to Profile → Request Role → Select Company → Provide company name and verification details
                </p>
                <p className="text-xs text-muted-foreground">
                  Requires admin verification of company affiliation. Max 5 representatives per company.
                </p>
                <Button asChild size="sm" variant="outline" className="mt-2 gap-2">
                  <Link to="/company/guide">
                    <FileText className="h-4 w-4" />
                    View Complete Guide
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Admin Role */}
          <Card className="hover:shadow-lg transition-shadow border-muted">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-muted rounded-lg">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">Administrator</CardTitle>
              </div>
              <CardDescription className="text-base">
                Manage the platform, approve roles, and ensure data quality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What admins do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Approve and manage user role requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Assign review tasks to reviewers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Manage user accounts and permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Monitor platform security and compliance</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-muted-foreground">Not requestable - assigned by organization</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sign up to join the community and start tracking products. You can request additional roles from your profile page.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/auth">
                Sign Up Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/roles/faq">
                <HelpCircle className="h-4 w-4" />
                View FAQ
              </Link>
            </Button>
          </div>
        </div>

        {/* How to Request Roles */}
        <div className="mt-12 space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">How to Request Additional Roles</CardTitle>
              <CardDescription>Follow these steps to request Reviewer or Company representative access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm">1</span>
                    Navigate to Your Profile
                  </h4>
                  <p className="text-sm text-muted-foreground pl-8">
                    Log in and click on your profile icon in the header, then select "Profile" from the dropdown menu.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm">2</span>
                    Find Request Role Section
                  </h4>
                  <p className="text-sm text-muted-foreground pl-8">
                    Scroll to the "Request Additional Role" section on your profile page.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm">3</span>
                    Select Role and Provide Details
                  </h4>
                  <p className="text-sm text-muted-foreground pl-8">
                    Choose Reviewer or Company role, then provide justification (expertise, company affiliation, etc.).
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm">4</span>
                    Wait for Admin Approval
                  </h4>
                  <p className="text-sm text-muted-foreground pl-8">
                    Administrators will review your request. You'll be notified once approved or if more info is needed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Compatibility and Conflicts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Multiple Roles & Compatibility</CardTitle>
              <CardDescription>Understanding how roles work together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">✓ Compatible Role Combinations</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">User + Reviewer</p>
                      <p className="text-xs text-muted-foreground">Track your own products while reviewing others</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">User + Company</p>
                      <p className="text-xs text-muted-foreground">Manage company products (cannot have personal product adoptions)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-3 text-red-600">✗ Incompatible Role Combinations</h4>
                <div className="grid md:grid-cols-1 gap-3 text-sm">
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <div>
                      <p className="font-medium">Administrator + Company Representative</p>
                      <p className="text-xs text-muted-foreground">
                        Administrators have platform-wide oversight and cannot represent individual companies due to conflict of interest 
                        and governance requirements. This restriction ensures impartial platform management and prevents conflicts between 
                        administrative duties and company interests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Role Switching</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  If you have multiple roles, you can switch between them using the role selector in the header menu. 
                  Your active role determines which dashboard and features you see.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Click your profile icon → Select "Switch Role"</li>
                  <li>• Each role has a dedicated dashboard and features</li>
                  <li>• Your data and settings are preserved across roles</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold mb-2 text-amber-900">⚠️ Important: Role Conflicts</h4>
                <p className="text-sm text-amber-800 mb-2">
                  <strong>Reviewer and Company Representative roles cannot be held simultaneously</strong> due to conflict of interest.
                </p>
                <p className="text-sm text-amber-800">
                  If you attempt to request a Company role while having the Reviewer role (or vice versa), you will need to 
                  contact an administrator to remove your existing role before the new role can be granted.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">How long does role approval take?</h4>
                <p className="text-sm text-muted-foreground">
                  Typically 1-3 business days. Reviewer requests from recognized institutions may be faster. 
                  Users with @dlinrt.eu email addresses are automatically approved as reviewers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Can I be both a Reviewer and Company Representative?</h4>
                <p className="text-sm text-muted-foreground">
                  No, these roles are incompatible due to conflict of interest. You must choose one or the other. 
                  If you need to switch, contact an administrator to remove your current role first.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Can I represent multiple companies?</h4>
                <p className="text-sm text-muted-foreground">
                  No, each user can represent only one company. However, each company can have up to 3 representatives.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">What if my role request is denied?</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive a notification with the reason. You can provide additional information and resubmit 
                  your request. Common reasons include insufficient justification or unverified company affiliation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Can roles be revoked?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, administrators can revoke roles if they're misused or if you no longer meet the requirements 
                  (e.g., leaving a company). You'll be notified if this occurs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}