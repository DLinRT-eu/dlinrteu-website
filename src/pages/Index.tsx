
import React from 'react';
import IntroSection from "@/components/IntroSection";
import NewsSection from "@/components/NewsSection";
import { Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import TaskTaxonomy from "@/components/TaskTaxonomy";
import { getAllOptions } from "@/utils/filterOptions";
import dataService from "@/services/DataService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import MailingListSignup from "@/components/MailingListSignup";
import Footer from "@/components/Footer";
import QuickAccessSection from "@/components/homepage/QuickAccessSection";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, BarChart3, Building2, FileText, Package, Info } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  if (user) {
    return <Navigate to="/dashboard-home" />;
  }

  const products = dataService.getAllProducts();
  const companies = dataService.getAllCompanies();
  const categories = getAllOptions('category');

  const handleCategoryClick = (category: string) => {
    navigate('/products', { state: { selectedCategory: category } });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Deep Learning in Radiotherapy",
    "url": "https://dlinrt.eu",
    "logo": "https://dlinrt.eu/logo.png",
    "description": "Search and explore deep learning products in Radiotherapy"
  };

  const categoryCounts = categories.map(category => ({
    name: category,
    count: products.filter(p => p.category === category).length
  }));

  // Check if migration notice should be displayed (until December 15, 2025)
  const showMigrationNotice = new Date() < new Date('2025-12-15');

  // Public landing page
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="DLinRT - Deep learning-based products database for radiotherapy"
        description="Search and explore deep learning products for auto-contouring, treatment planning, and imaging in radiation oncology."
        canonical="https://dlinrt.eu/"
        structuredData={structuredData}
      />
      
      {/* Repository Migration Notice */}
      {showMigrationNotice && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Alert className="border-blue-300 bg-transparent">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-900 font-semibold">Repository URL Updated</AlertTitle>
              <AlertDescription className="text-blue-800">
                Our GitHub repository has moved! Please update your bookmarks and links from{' '}
                <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">DLinRT-eu/website</code> to{' '}
                <a 
                  href="https://github.com/DLinRT-eu/dlinrteu-website" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-blue-900"
                >
                  DLinRT-eu/dlinrteu-website
                </a>
                . All issues, pull requests, and documentation have been migrated.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      
      <IntroSection />
      
      {/* Quick Access Section */}
      <QuickAccessSection 
        productCount={products.length}
        companyCount={companies.length}
      />

      {/* Community Roles Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Join the DLinRT Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contribute to the radiotherapy community by becoming a reviewer or representing your company
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-lg">Reviewer</CardTitle>
                </div>
                <CardDescription>
                  Evaluate and maintain product information quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/reviewer/guide">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-lg">Company Rep</CardTitle>
                </div>
                <CardDescription>
                  Manage and update your company's product information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/company/guide">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">All Roles</CardTitle>
                </div>
                <CardDescription>
                  View all available roles and responsibilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/roles">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Website Description Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                DLinRT.eu is a dedicated resource for <Link to="/products" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">commercial deep learning (DL) solutions</Link> in radiation oncology, 
                focused on the European market and beyond. The platform supports the integration of DL technologies 
                into routine clinical practice in radiotherapy.
              </p>
              <p className="mb-4">
                We <Link to="/products" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">catalogue and evaluate DL products</Link> across the radiotherapy workflow—from image reconstruction 
                and enhancement to auto-contouring, treatment planning, and clinical prediction. Each product entry 
                includes technical specifications, regulatory status, clinical evidence, and market availability. 
                Our <Link to="/dashboard" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">analytics dashboard</Link> delivers quantitative insights into how deep learning solutions are distributed across different categories and market segments, while our <Link to="/companies" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">companies directory</Link> highlights 
                the vendors pioneering deep learning integration in radiotherapy product development.
              </p>
              <p className="mb-4">
                Beyond product cataloguing, our <Link to="/resources-compliance" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">Resources & Compliance section</Link> provides essential regulatory guidance, 
                practical compliance checklists, and comprehensive standards documentation to support the safe deployment 
                of deep learning solutions in clinical radiotherapy workflows. From understanding the regulatory landscape 
                to implementing quality management systems and post-market surveillance, we offer actionable resources 
                for both newcomers and experts navigating the complex requirements of medical AI deployment.
              </p>
              <p className="mb-4">
                Whether you're a medical physicist seeking <Link to="/products?task=Auto-contouring" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">auto-contouring tools</Link>, a radiation oncologist exploring 
                <Link to="/products?task=Treatment%20Planning" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline"> treatment planning solutions</Link>, or a healthcare administrator reviewing new technologies, DLinRT.eu 
                provides clear, up-to-date information to support informed decision-making. Our goal is to promote 
                the safe and effective adoption of DL tools in clinical radiotherapy. Learn more about our mission 
                and team on our <Link to="/about" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">about page</Link>, explore ongoing <Link to="/initiatives" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">research initiatives</Link>, or reach out through our <Link to="/support" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">support center</Link>.
              </p>
              <p>
                Stay informed about the latest developments in the field through our <Link to="/news" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">news section</Link>, which covers 
                product updates, research breakthroughs, and industry announcements. For questions, feedback, or 
                collaboration opportunities, our <Link to="/support" className="text-[#00A6D6] hover:text-[#00A6D6]/80 underline">support team</Link> is ready to assist you in navigating 
                the evolving landscape of deep learning in radiotherapy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <TaskTaxonomy 
          categories={categoryCounts} 
          onCategoryClick={handleCategoryClick}
          filterType="task"
        />
      </div>

      {/* Mailing List Signup Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Join Our Mailing List</h2>
                <p className="text-gray-600 mb-4">
                  Stay informed about the latest deep learning solutions in radiotherapy. Get updates on new products, 
                  industry news, and community announcements delivered to your inbox.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <MailingListSignup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsSection />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Footer />
      </main>
    </div>
  );
};

export default Index;
