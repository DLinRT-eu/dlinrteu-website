import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { 
  Search, 
  CheckCircle2, 
  UserCheck, 
  FileText, 
  Clock,
  AlertCircle,
  ArrowRight,
  Shield,
  GitBranch,
  Eye,
  MessageSquare,
  Award,
  BookOpen,
  Github,
  ExternalLink,
  Send
} from 'lucide-react';

export default function ReviewerGuide() {
  return (
    <PageLayout
      title="Reviewer Guide | DLinRT"
      description="Complete guide for DLinRT reviewers. Learn how to evaluate products, verify specifications, and maintain quality standards for our radiotherapy AI database."
      canonical="https://dlinrt.eu/reviewer/guide"
    >
      <div className="container max-w-5xl py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-500/10 rounded-full">
              <Search className="h-12 w-12 text-purple-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reviewer Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about reviewing products and contributing to the DLinRT platform
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Button asChild>
              <Link to="/reviewer/dashboard">
                <Eye className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8 border-purple-500/20">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
            <CardDescription>Jump to the section you need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <Button variant="outline" asChild className="justify-start">
                <a href="#overview"><Search className="h-4 w-4 mr-2" />Role Overview</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#registration"><UserCheck className="h-4 w-4 mr-2" />Registration Process</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#dashboard"><Eye className="h-4 w-4 mr-2" />Dashboard Overview</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#review-workflow"><GitBranch className="h-4 w-4 mr-2" />Review Workflow</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#providing-feedback"><Send className="h-4 w-4 mr-2" />Providing Feedback</a>
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
                <Search className="h-5 w-5 text-purple-500" />
                What is a Reviewer?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Reviewers are expert volunteers who evaluate and maintain the quality of product information 
                on the DLinRT platform. As a reviewer, you'll assess product entries for accuracy, completeness, 
                and compliance with our standards.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-600" />
                  Your Responsibilities
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Review assigned products for accuracy and completeness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Verify technical specifications and regulatory information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Provide constructive feedback to improve product entries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Classify evidence levels using the dual-axis framework (E0–E3 rigor, I0–I5 impact)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Check data transparency (training data, evaluation data) and safety corrective actions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  Why Become a Reviewer?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Contribute to the radiotherapy community, stay informed about the latest DL technologies, 
                  and help ensure clinicians have access to accurate, reliable product information.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Registration & Authentication Workflow */}
        <section id="registration" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Registration Process</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>How to Become a Reviewer</CardTitle>
              <CardDescription>Follow these steps to join as a verified reviewer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Create a DLinRT Account</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sign up using your institutional email address (university, hospital, or research center). 
                    Verify your email to activate your account.
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Request Reviewer Role</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Navigate to your profile and select "Request Additional Role". Choose "Reviewer" and 
                    provide your expertise areas and justification.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Wait for Approval</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Platform administrators will review your credentials and expertise. You'll receive a 
                    notification once approved (typically 2-5 business days).
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      <strong>Approval typically takes 2-5 business days.</strong> Ensure your profile 
                      includes relevant credentials.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Workflow</CardTitle>
              <CardDescription>Visual overview of the reviewer registration process</CardDescription>
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
          <h2 className="text-3xl font-bold mb-6">Reviewer Dashboard</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dashboard Features</CardTitle>
              <CardDescription>Navigate your reviewer dashboard efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-500" />
                  My Reviews Tab
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  View all your assigned reviews organized by status:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      Pending
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Assigned reviews not yet started
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-blue-600" />
                      In Progress
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reviews currently being evaluated
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Completed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Finished reviews with submitted feedback
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  Expertise Preferences
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Configure your expertise across three dimensions so the assignment algorithm
                  can match you with the most relevant products:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside mb-3">
                  <li><strong>Task Categories</strong> — e.g. Auto-Contouring, Treatment Planning (priority 1–10)</li>
                  <li><strong>Companies</strong> — vendors you have experience with (priority 1–10)</li>
                  <li><strong>Products</strong> — specific products you know well (priority 1–10, with optional notes)</li>
                </ul>
                <Button asChild size="sm" variant="outline">
                  <Link to="/reviewer/preferences">
                    <Shield className="h-4 w-4 mr-2" />
                    Manage Preferences
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Review Workflow */}
        <section id="review-workflow" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Review Workflow</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Step-by-Step Review Process</CardTitle>
              <CardDescription>How to complete a product review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Receive Assignment</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a notification when a product is assigned to you. Check your dashboard 
                    for pending reviews and their deadlines.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Open the Visual Editor</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigate to the product page and click <strong>"Edit"</strong> in the header.
                    The page enters edit mode with the EditToolbar at the bottom. Use inline editors,
                    dropdowns, and specialised editors to modify fields. Changes auto-save as a draft
                    every 30 seconds.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Verify Key Fields</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Work through the product entry, checking each area:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Product name, version, company, and category</li>
                    <li>Regulatory status (CE, FDA, TGA, TFDA)</li>
                    <li>Evidence classification — assign <strong>E0–E3</strong> rigor and <strong>I0–I5</strong> impact</li>
                    <li>Data transparency — training data details and evaluation/validation data</li>
                    <li>Safety corrective actions — check FDA Recalls, BfArM, MHRA, EUDAMED</li>
                    <li>Supported modalities, anatomical structures, and features</li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                    4
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Submit Feedback</h4>
                  <p className="text-sm text-muted-foreground">
                    Write an edit summary describing your changes and click "Submit for Review".
                    An admin will approve or reject the edit. Approved changes automatically sync 
                    to GitHub as a pull request.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to Provide Feedback */}
        <section id="providing-feedback" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">How to Provide Feedback on Products</h2>
          <p className="text-muted-foreground mb-6">
            Spotted an error or a missing product? Choose the feedback method that fits your situation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Visual Editor */}
            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5 text-purple-500" />
                  Visual Editor
                </CardTitle>
                <CardDescription>
                  <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:text-purple-300">
                    Requires DLinRT login
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  The recommended method for reviewers. Edit product data directly on the site 
                  with auto-saving drafts and admin approval.
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Navigate to the product page</li>
                  <li>Click <strong>"Edit"</strong> in the header</li>
                  <li>Modify fields using inline editors</li>
                  <li>Click <strong>"Submit"</strong> with an edit summary</li>
                </ol>
                <p className="text-xs text-muted-foreground italic">
                  Approved edits automatically sync to GitHub as a pull request.
                </p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/products">
                    <Eye className="h-4 w-4 mr-2" />
                    Browse Products
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* GitHub Issue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Github className="h-5 w-5" />
                  GitHub Issue
                </CardTitle>
                <CardDescription>
                  <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-300">
                    GitHub account only
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Report a problem without editing data yourself. Describe what is wrong or 
                  missing and include a source or reference.
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open a new issue on the repository</li>
                  <li>Give it a descriptive title</li>
                  <li>Include the product name, the error, and a supporting link</li>
                </ol>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a
                    href="https://github.com/DLinRT-eu/dlinrteu-website/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Open GitHub Issue
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* GitHub Pull Request */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GitBranch className="h-5 w-5" />
                  GitHub Pull Request
                </CardTitle>
                <CardDescription>
                  <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                    For developers
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Fork the repository, edit the TypeScript product file in{' '}
                  <code className="text-xs">src/data/products/[category]/</code>, and open a pull 
                  request. At least two reviewers verify changes before merging.
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Fork and clone the repository</li>
                  <li>Edit the product file and commit</li>
                  <li>Open a PR with a summary and sources</li>
                </ol>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a
                    href="https://github.com/DLinRT-eu/dlinrteu-website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranch className="h-4 w-4 mr-2" />
                    View Repository
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Public Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5" />
                  Public Feedback Form
                </CardTitle>
                <CardDescription>
                  <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                    No login required
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Anyone can report a missing product or incorrect information via the support page. 
                  No account needed — just fill in the form.
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Choose "missing product" or "incorrect info"</li>
                  <li>Enter the product name and details</li>
                  <li>Add your name, email, and (optionally) a supporting URL</li>
                </ol>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/support#product-feedback">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Go to Feedback Form
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold">Method</th>
                      <th className="text-left py-2 pr-4 font-semibold">Login Required?</th>
                      <th className="text-left py-2 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4">Visual Editor</td>
                      <td className="py-2 pr-4">DLinRT account</td>
                      <td className="py-2">Reviewers fixing data directly</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">GitHub Issue</td>
                      <td className="py-2 pr-4">GitHub account</td>
                      <td className="py-2">Reporting a problem without editing</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">GitHub Pull Request</td>
                      <td className="py-2 pr-4">GitHub account</td>
                      <td className="py-2">Developers making code-level changes</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Public Feedback Form</td>
                      <td className="py-2 pr-4">None</td>
                      <td className="py-2">Anyone spotting an error or missing product</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-500" />
                Tips for Effective Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Be Thorough and Objective</h4>
                <p className="text-sm text-muted-foreground">
                  Verify all information against official sources — regulatory databases (FDA, BfArM, MHRA, EUDAMED),
                  company websites, and peer-reviewed publications. Do not copy marketing materials verbatim.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Always Set Evidence Levels</h4>
                <p className="text-sm text-muted-foreground">
                  Every product should have an evidence classification: assign <strong>E0–E3</strong> for
                  evidence rigor and <strong>I0–I5</strong> for clinical impact. Add justification notes
                  and cite the supporting publications.
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cite Your Sources</h4>
                <p className="text-sm text-muted-foreground">
                  Add references (DOIs, URLs) for any information you add or change so other reviewers
                  can verify it. Include links to clinical publications, validation studies, and regulatory filings.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Meet Deadlines</h4>
                <p className="text-sm text-muted-foreground">
                  Complete reviews within the assigned timeframe. If you need more time, communicate 
                  with administrators early at <strong>info@dlinrt.eu</strong>.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Keep informed about changes in regulations, standards, and best practices in 
                  radiotherapy AI/ML products. Update your expertise preferences as you gain experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Support Section */}
        <section className="mb-12">
          <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                If you have questions or need assistance with the review process, our support team is here to help.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Email us directly at <strong>info@dlinrt.eu</strong> for non-urgent matters, or open a
                GitHub issue for technical problems.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link to="/support">Contact Support</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/reviewer/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href="https://github.com/DLinRT-eu/dlinrteu-website/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report an Issue
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
