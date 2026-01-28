import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { 
  Building2, 
  CheckCircle2, 
  UserCheck, 
  FileText, 
  Clock,
  AlertCircle,
  ArrowRight,
  Mail,
  Linkedin,
  Shield,
  GitPullRequest,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

export default function CompanyGuide() {
  return (
    <PageLayout
      title="Company Representative Guide | DLinRT"
      description="Guide for company representatives on DLinRT. Learn how to manage product listings, submit updates, and connect with healthcare professionals using your solutions."
      canonical="https://dlinrt.eu/company/guide"
    >
      <div className="container max-w-5xl py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-500/10 rounded-full">
              <Building2 className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Company Representative Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about managing your company's products on DLinRT
          </p>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8 border-green-500/20">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
            <CardDescription>Jump to the section you need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button variant="outline" asChild className="justify-start">
                <a href="#overview"><Building2 className="h-4 w-4 mr-2" />Role Overview</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#registration"><UserCheck className="h-4 w-4 mr-2" />Registration & Authentication</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#dashboard"><Eye className="h-4 w-4 mr-2" />Dashboard Overview</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#revision-workflow"><GitPullRequest className="h-4 w-4 mr-2" />Revision Workflow</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#best-practices"><CheckCircle2 className="h-4 w-4 mr-2" />Best Practices</a>
              </Button>
              <Button variant="outline" asChild className="justify-start border-green-500/30 bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-950/40">
                <Link to="/company/certification"><Shield className="h-4 w-4 mr-2 text-green-600" />Certification Program</Link>
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
                <Building2 className="h-5 w-5 text-green-500" />
                What is a Company Representative?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Company Representatives are verified individuals authorized to manage and update their company's product 
                information on the DLinRT platform. This role ensures that product data remains accurate, up-to-date, 
                and compliant with regulatory requirements.
              </p>
              
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Benefits of Being Verified
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Direct control over your company's product information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Access to user adoption statistics and feedback (with consent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Ability to submit updates and corrections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Connect with users who are interested in your products</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  Important Limits
                </h4>
                <p className="text-sm text-muted-foreground">
                  Each company can have a maximum of <strong>5 verified representatives</strong> to ensure 
                  proper governance and accountability. Representatives must be verified by platform administrators.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Registration & Authentication Workflow */}
        <section id="registration" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Registration & Authentication Workflow</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Step-by-Step Registration Process</CardTitle>
              <CardDescription>Follow these steps to become a verified company representative</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Create a DLinRT Account</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Visit the DLinRT website and sign up for an account using your professional email address. 
                    You'll receive a verification email to confirm your account.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/auth">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Go to Sign Up
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Navigate to Your Profile</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    After logging in, click on your profile icon in the header and select "Profile" from the dropdown menu.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Request Company Representative Role</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Scroll to the "Request Additional Role" section on your profile page. Select "Company Representative" 
                    from the role options.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
                    4
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Provide Verification Details</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Fill in the required information to verify your company affiliation:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Mail className="h-4 w-4 mt-1 text-green-500" />
                      <span><strong>Company Email:</strong> Use your official company email address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 mt-1 text-green-500" />
                      <span><strong>Company Name:</strong> Exact name of your company</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <UserCheck className="h-4 w-4 mt-1 text-green-500" />
                      <span><strong>Position/Title:</strong> Your role within the company</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Linkedin className="h-4 w-4 mt-1 text-green-500" />
                      <span><strong>LinkedIn Profile:</strong> Optional but recommended for verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-1 text-green-500" />
                      <span><strong>Justification:</strong> Brief explanation of your need for this role</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
                    5
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Wait for Admin Verification</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Platform administrators will review your request and verify your company affiliation. This typically 
                    takes 1-3 business days. You'll receive a notification once your request is approved or if additional 
                    information is needed.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      <strong>Verification typically takes 1-3 business days.</strong> Ensure all information is accurate 
                      to avoid delays.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Workflow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Diagram</CardTitle>
              <CardDescription>Visual representation of the registration and authentication process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <UserCheck className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">Create Account</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">Request Role</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-2">
                      <Clock className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="font-semibold text-sm">Admin Review</p>
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

        {/* Dashboard Overview */}
        <section id="dashboard" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Company Dashboard Overview</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dashboard Features</CardTitle>
              <CardDescription>Navigate your company dashboard efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Products Tab */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-500" />
                  Products Tab
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  View all products associated with your company in the DLinRT catalog. Each product card displays:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Product Information:</strong> Name, category, and description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Certification Status:</strong> CE, FDA, and other regulatory approvals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Last Revision Date:</strong> When the product information was last updated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Quick Actions:</strong> View details, GitHub source, and export options</span>
                  </li>
                </ul>
              </div>

              {/* Revisions Tab */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <GitPullRequest className="h-5 w-5 text-green-500" />
                  Revisions Tab
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Track all product updates you've submitted and their approval status:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      Pending
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Waiting for admin review and approval
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Approved
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Merged into the main repository
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      Rejected
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Returned with feedback for revision
                    </p>
                  </div>
                </div>
              </div>

              {/* Analytics Tab */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Analytics Tab (With User Consent)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  View adoption statistics for your products, but only from users who have explicitly consented to share 
                  their information. This includes:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>User Experiences:</strong> Feedback from users who opted in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Adoption Status:</strong> Using, evaluating, or previously used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Contact Information:</strong> For users who agreed to be contacted</span>
                  </li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
                  <p className="text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 inline mr-1" />
                    <strong>Privacy First:</strong> All data shown respects user privacy settings and European data 
                    protection regulations (GDPR).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="justify-start h-auto p-4">
                  <Link to="/company/overview">
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="text-left">
                        <p className="font-semibold">Go to Dashboard</p>
                        <p className="text-xs text-muted-foreground">View your products and revisions</p>
                      </div>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start h-auto p-4">
                  <Link to="/profile">
                    <div className="flex items-start gap-3">
                      <UserCheck className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="text-left">
                        <p className="font-semibold">Manage Profile</p>
                        <p className="text-xs text-muted-foreground">Update your account settings</p>
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Revision Workflow */}
        <section id="revision-workflow" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Revision Workflow</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>How to Submit Product Revisions</CardTitle>
              <CardDescription>Step-by-step guide to updating product information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Submit Revision */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-green-500" />
                  1. Submit a Revision
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  From your company dashboard, locate the product you want to update and click the "Certify Product" 
                  or "Submit Revision" button. Provide:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Changes Summary:</strong> Brief description of what was updated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Product Last Revised Date:</strong> Official revision date (optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Verification Notes:</strong> Additional context for reviewers (optional)</span>
                  </li>
                </ul>
              </div>

              {/* Status Lifecycle */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  2. Revision Status Lifecycle
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Pending Review</p>
                      <p className="text-xs text-muted-foreground">
                        Your revision is queued for admin review. You can still edit or delete it at this stage.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto rotate-90" />
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Under Review</p>
                      <p className="text-xs text-muted-foreground">
                        Administrators are verifying the changes and checking for accuracy and compliance.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto rotate-90" />
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Approved</p>
                        <p className="text-xs text-muted-foreground">
                          Changes are merged into the main repository via GitHub pull request
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Rejected</p>
                        <p className="text-xs text-muted-foreground">
                          Returned with feedback. Review comments and resubmit with corrections
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Managing Revisions */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-green-500" />
                  3. Managing Pending Revisions
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  While a revision is pending, you have the following options:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Edit className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Edit Revision</p>
                      <p className="text-xs text-muted-foreground">
                        Update the changes summary or verification notes before admin review
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Trash2 className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Delete Revision</p>
                      <p className="text-xs text-muted-foreground">
                        Cancel the submission if you need to make major changes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* After Approval */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <GitPullRequest className="h-5 w-5 text-green-500" />
                  4. What Happens After Approval
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  When your revision is approved:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>A GitHub pull request is automatically created with your changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>The PR is reviewed and merged by administrators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Product information is updated on the live website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>You receive a notification confirming the update</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle>Revision Workflow Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
                      <Edit className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">Submit Revision</p>
                        <p className="text-xs text-muted-foreground">Company Representative</p>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <Clock className="h-6 w-6 text-amber-600" />
                      <div>
                        <p className="font-semibold text-sm">Pending Status</p>
                        <p className="text-xs text-muted-foreground">Can edit or delete</p>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <Eye className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-semibold text-sm">Admin Review</p>
                        <p className="text-xs text-muted-foreground">Verification and approval</p>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                  <div className="w-full grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-sm">Approved</p>
                        <p className="text-xs text-muted-foreground">Create GitHub PR</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-semibold text-sm">Rejected</p>
                        <p className="text-xs text-muted-foreground">Review feedback</p>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <GitPullRequest className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-sm">PR Merged</p>
                        <p className="text-xs text-muted-foreground">Live on website</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Guidelines for Company Representatives</CardTitle>
              <CardDescription>Follow these recommendations to ensure smooth collaboration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-950/10">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Keep Information Up to Date</p>
                    <p className="text-xs text-muted-foreground">
                      Regularly review and update your products' information, especially regulatory status, 
                      features, and supported structures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-950/10">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Provide Accurate Regulatory Information</p>
                    <p className="text-xs text-muted-foreground">
                      Ensure all CE marking, FDA clearance, and other regulatory information is accurate and 
                      properly documented. Include clearance numbers and dates when available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-950/10">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Write Clear Revision Summaries</p>
                    <p className="text-xs text-muted-foreground">
                      When submitting revisions, provide clear and concise summaries of what changed. This helps 
                      administrators review your submissions faster.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-950/10">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Respond Promptly to Feedback</p>
                    <p className="text-xs text-muted-foreground">
                      If a revision is rejected, review the admin feedback carefully and resubmit with necessary 
                      corrections promptly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-950/10">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Respect User Privacy</p>
                    <p className="text-xs text-muted-foreground">
                      Only contact users who have explicitly opted in for communication. Respect their privacy 
                      settings and preferences at all times.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/10">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Understand the Approval Process</p>
                    <p className="text-xs text-muted-foreground">
                      All revisions require admin approval to maintain data quality and compliance. This typically 
                      takes 2-5 business days depending on the complexity of changes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/10">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Coordinate with Your Team</p>
                    <p className="text-xs text-muted-foreground">
                      If your company has multiple representatives, coordinate to avoid duplicate submissions 
                      or conflicting updates.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Support Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>We're here to support you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you have questions or encounter any issues while managing your company's products, 
              don't hesitate to reach out for assistance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/support">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/roles/faq">
                  <FileText className="h-4 w-4 mr-2" />
                  View FAQ
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/company/overview">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
