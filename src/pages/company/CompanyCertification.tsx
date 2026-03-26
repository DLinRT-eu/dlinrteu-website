import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { 
  BadgeCheck,
  AlertTriangle,
  CircleDashed,
  Building2,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  FileCheck,
  Shield,
  Clock,
  RefreshCw
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CompanyCertification() {
  return (
    <PageLayout
      title="Company Certification Program | DLinRT"
      description="Learn how manufacturers can certify their product information on DLinRT. Understand badge states, the certification process, and FAQs for company representatives."
      canonical="https://dlinrt.eu/company/certification"
    >
      <div className="container max-w-5xl py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-500/10 rounded-full">
              <BadgeCheck className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Company Certification Program</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enable manufacturers to verify and certify the accuracy of their product information on DLinRT
          </p>
        </div>

        {/* Quick Links */}
        <Card className="mb-8 border-green-500/20">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
            <CardDescription>Jump to the section you need or visit related pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <Button variant="outline" asChild className="justify-start">
                <a href="#badge-states"><BadgeCheck className="h-4 w-4 mr-2" />Badge States</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#certification-process"><FileCheck className="h-4 w-4 mr-2" />Certification Process</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#prerequisites"><Shield className="h-4 w-4 mr-2" />Prerequisites</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="#faq"><HelpCircle className="h-4 w-4 mr-2" />FAQ</a>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/company/guide"><Building2 className="h-4 w-4 mr-2" />Company Guide</Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/roles/faq"><HelpCircle className="h-4 w-4 mr-2" />Role FAQs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What is Certification */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-green-500" />
              What is Product Certification?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Product certification allows manufacturers to officially verify that the information displayed about their 
              products on DLinRT is accurate and up-to-date. When a company representative certifies a product, users 
              can trust that the manufacturer has reviewed and confirmed the listed details.
            </p>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Benefits of Certification
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Builds trust with healthcare professionals browsing your products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Displays a visible "Verified by Company" badge on your product listing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Complements independent expert reviews with manufacturer verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Demonstrates commitment to data accuracy and transparency</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Badge States Section */}
        <section id="badge-states" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Certification Badge States</h2>
          <p className="text-muted-foreground mb-6">
            Products on DLinRT can display different badge states depending on their certification status:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Verified Badge */}
            <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-full">
                    <BadgeCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-green-700 dark:text-green-400">
                    Verified by Company
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>What it means:</strong> A verified company representative has reviewed and certified 
                  that the product information is accurate.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>User benefit:</strong> Users can trust that the manufacturer has confirmed the 
                  listed specifications, certifications, and capabilities.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Validity:</strong> The certification remains valid until the product information 
                  is updated on DLinRT.
                </p>
              </CardContent>
            </Card>

            {/* Outdated Badge */}
            <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500/20 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg text-amber-700 dark:text-amber-400">
                    Certification Outdated
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>What it means:</strong> The product was previously certified, but the information 
                  has since been updated. Re-certification is needed.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>When it appears:</strong> After independent reviewers or platform administrators 
                  update the product information following the original certification.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Action needed:</strong> Review the updated information and re-certify if accurate.
                </p>
              </CardContent>
            </Card>

            {/* No Badge */}
            <Card className="border-muted">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-muted rounded-full">
                    <CircleDashed className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg">
                    Not Yet Certified
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>What it means:</strong> The product has not been certified by a company 
                  representative yet.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Default state:</strong> All products start in this state. The information is 
                  maintained by independent reviewers.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>How to certify:</strong> Follow the certification process below to add the 
                  "Verified by Company" badge.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Certification Process */}
        <section id="certification-process" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Certification Process</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Step-by-Step Certification Guide</CardTitle>
              <CardDescription>Follow these steps to certify your company's products</CardDescription>
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
                  <h4 className="font-semibold mb-2">Ensure You Have Company Representative Access</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    You must be a verified company representative to certify products. If you haven't 
                    registered yet, follow our registration guide.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/company/guide#registration">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View Registration Guide
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
                  <h4 className="font-semibold mb-2">Access Your Company Dashboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigate to the Company Dashboard from your profile menu. Here you'll see all products 
                    associated with your company.
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
                  <h4 className="font-semibold mb-2">Select Product to Certify</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose the product you want to certify from your product list. Products that need 
                    certification or re-certification will be clearly marked.
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
                  <h4 className="font-semibold mb-2">Review All Product Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Carefully review all displayed information including specifications, certifications, 
                    input/output formats, and capabilities. Ensure everything is accurate and current.
                  </p>
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
                  <h4 className="font-semibold mb-2">Click "Certify Product"</h4>
                  <p className="text-sm text-muted-foreground">
                    Once you've verified all information is correct, click the "Certify Product" button. 
                    You can optionally add notes about your certification.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
                    6
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-2">Certification Complete</h4>
                  <p className="text-sm text-muted-foreground">
                    Your product now displays the "Verified by Company" badge. Users will see that 
                    the manufacturer has confirmed the accuracy of the listing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Note */}
          <Card className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-2">Re-Certification Process</h4>
                  <p className="text-sm text-muted-foreground">
                    If product information is updated after certification (by reviewers or administrators), 
                    your certification status will change to "Outdated". Simply review the changes and 
                    re-certify using the same process above to restore the "Verified by Company" badge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Prerequisites */}
        <section id="prerequisites" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Prerequisites for Certification</h2>
          
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="p-3 bg-green-500/10 rounded-full mb-3">
                    <Building2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Verified Representative</h4>
                  <p className="text-sm text-muted-foreground">
                    You must be a verified company representative with admin-approved access
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="p-3 bg-green-500/10 rounded-full mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Product Ownership</h4>
                  <p className="text-sm text-muted-foreground">
                    The product must belong to your company (as listed in our database)
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="p-3 bg-green-500/10 rounded-full mb-3">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">No Pending Certification</h4>
                  <p className="text-sm text-muted-foreground">
                    No previous certification must be pending review for this product
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-6">
            Questions specific to the certification program. For general role questions, see our{' '}
            <Link to="/roles/faq" className="text-primary hover:underline">Role FAQs</Link>.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                When does a certification expire?
              </AccordionTrigger>
              <AccordionContent>
                Certifications do not have a fixed expiry date. A certification remains valid until 
                the product information is updated on DLinRT. When updates occur (from independent reviewers 
                or administrators), the status changes to "Certification Outdated" and re-certification 
                is needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                What happens when product information changes?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  When product information is updated after certification:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The badge changes from "Verified by Company" (green) to "Certification Outdated" (amber)</li>
                  <li>Users can still see that the product was previously certified</li>
                  <li>You'll receive a notification about the change</li>
                  <li>Re-certification requires reviewing the new information and clicking "Certify Product" again</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I certify products from another company?
              </AccordionTrigger>
              <AccordionContent>
                No. You can only certify products that belong to your verified company. The system 
                automatically restricts certification to products associated with your company's ID 
                in our database.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                Do I need to certify every product?
              </AccordionTrigger>
              <AccordionContent>
                No, certification is optional. Products without certification are still displayed 
                normally and are maintained by our independent reviewer community. However, certification 
                adds an extra layer of trust by showing manufacturer verification.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                What if I find incorrect information during review?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  If you discover inaccurate information while reviewing a product:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Do not certify the product with incorrect information</li>
                  <li>Use the revision workflow to submit corrections</li>
                  <li>Wait for the revision to be approved by administrators</li>
                  <li>Once corrections are applied, you can then certify the product</li>
                </ol>
                <p className="mt-2">
                  See the{' '}
                  <Link to="/company/guide#revision-workflow" className="text-primary hover:underline">
                    Revision Workflow guide
                  </Link>{' '}
                  for detailed instructions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                How long does certification take?
              </AccordionTrigger>
              <AccordionContent>
                Certification is instant. Once you click "Certify Product" after reviewing the 
                information, the "Verified by Company" badge appears immediately. There is no 
                additional approval step for certifications (unlike product revisions which require 
                admin review).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                Can multiple representatives certify the same product?
              </AccordionTrigger>
              <AccordionContent>
                Any verified representative from your company can certify products. However, only 
                the most recent certification is tracked. If the information changes, any representative 
                can re-certify the product.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Call to Action */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you're a company representative, access your dashboard to start certifying products. 
                If you haven't registered yet, follow our guide to become a verified representative.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link to="/company/dashboard">
                    <BadgeCheck className="h-5 w-5 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/company/guide">
                    <Building2 className="h-5 w-5 mr-2" />
                    Registration Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/support">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
