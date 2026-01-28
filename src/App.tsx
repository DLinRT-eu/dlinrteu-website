import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { ProductEditProvider } from "@/components/product-editor";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ApprovalGate } from "@/components/auth/ApprovalGate";
import Header from "./components/Header";

// Lazy-loaded page components for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Security = lazy(() => import("./pages/Security"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const Presentation = lazy(() => import("./pages/Presentation"));
const LiveDemoMode = lazy(() => import("./components/presentation/LiveDemoMode").then(m => ({ default: m.LiveDemoMode })));
const SecurityMonitoring = lazy(() => import("./pages/SecurityMonitoring"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Companies = lazy(() => import("./pages/Companies"));
const News = lazy(() => import("./pages/News"));
const Support = lazy(() => import("./pages/Support"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Products = lazy(() => import("./pages/Products"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Dashboard_Authenticated = lazy(() => import("./pages/Dashboard_Authenticated"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Initiatives = lazy(() => import("./pages/Initiatives"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const ReviewDashboard = lazy(() => import("./pages/ReviewDashboard"));
const ProductReview = lazy(() => import("./pages/ProductReview"));
const ResourcesCompliance = lazy(() => import("./pages/ResourcesCompliance"));
const Profile = lazy(() => import("./pages/Profile"));
const MyProducts = lazy(() => import("./pages/MyProducts"));
const RoleSelection = lazy(() => import("./pages/RoleSelection"));
const ProductExperiences = lazy(() => import("./pages/ProductExperiences"));
const Auth = lazy(() => import("./pages/Auth"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Roles = lazy(() => import("./pages/Roles"));
const RolesFAQ = lazy(() => import("./pages/RolesFAQ"));
const NotificationHistory = lazy(() => import("./pages/NotificationHistory"));
const EvidenceImpactGuide = lazy(() => import("./pages/EvidenceImpactGuide"));
const ChangelogGenerator = lazy(() => import("./pages/admin/ChangelogGenerator"));
const CompanyManagement = lazy(() => import("./pages/admin/CompanyManagement"));
const CompanyMappingValidator = lazy(() => import("./pages/admin/CompanyMappingValidator"));
const UserProductAdoptions = lazy(() => import("./pages/admin/UserProductAdoptions"));
const CertificationManagement = lazy(() => import("./pages/admin/CertificationManagement"));
const NewsletterManagement = lazy(() => import("./pages/admin/NewsletterManagement"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const CompareStructures = lazy(() => import("./pages/CompareStructures"));

// Admin Pages
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ReviewAssignment = lazy(() => import("./pages/admin/ReviewAssignment"));
const PRManagement = lazy(() => import("./pages/admin/PRManagement"));
const SecurityDashboard = lazy(() => import("./pages/admin/SecurityDashboard"));
const UserRegistrationReview = lazy(() => import("./pages/admin/UserRegistrationReview"));
const ChangelogAdmin = lazy(() => import("./pages/admin/ChangelogAdmin"));
const EditApprovals = lazy(() => import("./pages/admin/EditApprovals"));

// Company Pages
const CompanyDashboard = lazy(() => import("./pages/company/Dashboard"));
const CompanyDashboardOverview = lazy(() => import("./pages/company/CompanyDashboardOverview"));
const CompanyProductsManager = lazy(() => import("./pages/company/ProductsManager"));
const CompanyGuide = lazy(() => import("./pages/company/CompanyGuide"));
const CompanyCertification = lazy(() => import("./pages/company/CompanyCertification"));

// Reviewer Pages
const ReviewerDashboard = lazy(() => import("./pages/reviewer/Dashboard"));
const ReviewerGuide = lazy(() => import("./pages/reviewer/ReviewerGuide"));
const ReviewerPreferences = lazy(() => import("./pages/reviewer/Preferences"));
const DueReviews = lazy(() => import("./pages/reviewer/DueReviews"));

// Admin Guide
const AdminGuide = lazy(() => import("./pages/admin/AdminGuide"));

// Admin Review Pages
const ReviewRounds = lazy(() => import("./pages/admin/ReviewRounds"));
const ReviewRoundDetails = lazy(() => import("./pages/admin/ReviewRoundDetails"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RoleProvider>
        <ProductEditProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="products" element={<Products />} />
                <Route path="compare/structures" element={<CompareStructures />} />
                <Route path="initiatives" element={<Initiatives />} />
                <Route path="about" element={<About />} />
                <Route path="maintenance-team" element={<Navigate to="/about" replace />} />
                <Route path="donate" element={<Navigate to="/support" replace />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="security" element={<Security />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="update-password" element={<UpdatePassword />} />
                <Route path="export-presentation" element={<Navigate to="/presentation" replace />} />
                <Route path="presentation" element={<Presentation />} />
                <Route path="presentation/demo" element={<LiveDemoMode />} />
                <Route path="security-monitoring" element={<Navigate to="/admin/security" replace />} />
                <Route path="companies" element={<Companies />} />
                <Route path="news" element={<News />} />
                <Route path="support" element={<Support />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard-home" element={
                  <ProtectedRoute requireAuth={true}>
                    <Dashboard_Authenticated />
                  </ProtectedRoute>
                } />
                <Route path="timeline" element={<Timeline />} />
                <Route path="review" element={<ReviewDashboard />} />
                <Route path="review/:id" element={<ProductReview />} />
                <Route path="resources-compliance" element={<ResourcesCompliance />} />
                <Route path="evidence-impact-guide" element={<EvidenceImpactGuide />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-of-use" element={<TermsOfUse />} />
                <Route path="auth" element={<Auth />} />
                <Route path="changelog" element={<Changelog />} />
                <Route path="roles" element={<Roles />} />
                <Route path="roles/faq" element={<RolesFAQ />} />
                <Route path="unsubscribe" element={<Unsubscribe />} />
                {/* User Authenticated Routes - Protected by ApprovalGate */}
                <Route path="/profile" element={
                  <ProtectedRoute requireAuth={true}>
                    <ApprovalGate>
                      <Profile />
                    </ApprovalGate>
                  </ProtectedRoute>
                } />
                <Route path="/my-products" element={
                  <ProtectedRoute requireAuth={true}>
                    <ApprovalGate>
                      <MyProducts />
                    </ApprovalGate>
                  </ProtectedRoute>
                } />
                <Route path="/role-selection" element={
                  <ProtectedRoute requireAuth={true}>
                    <ApprovalGate>
                      <RoleSelection />
                    </ApprovalGate>
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute requireAuth={true}>
                    <ApprovalGate>
                      <NotificationHistory />
                    </ApprovalGate>
                  </ProtectedRoute>
                } />
                <Route path="/product/:productId/experiences" element={
                  <ProtectedRoute allowedRoles={['admin', 'reviewer', 'company']}>
                    <ApprovalGate>
                      <ProductExperiences />
                    </ApprovalGate>
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminOverview />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/reviews" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ReviewAssignment />
                  </ProtectedRoute>
                } />
                <Route path="/admin/review-rounds" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ReviewRounds />
                  </ProtectedRoute>
                } />
                <Route path="/admin/review-rounds/:roundId" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ReviewRoundDetails />
                  </ProtectedRoute>
                } />
                <Route path="/admin/security" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SecurityDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/registrations" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserRegistrationReview />
                  </ProtectedRoute>
                } />
                <Route path="/admin/changelog" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ChangelogAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/admin/changelog-generator" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ChangelogGenerator />
                  </ProtectedRoute>
                } />
                <Route path="/admin/pull-requests" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <PRManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/companies" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CompanyManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/company-mapping-validator" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CompanyMappingValidator />
                  </ProtectedRoute>
                } />
                <Route path="/admin/user-products" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserProductAdoptions />
                  </ProtectedRoute>
                } />
                <Route path="/admin/certifications" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CertificationManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/security-monitoring" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SecurityMonitoring />
                  </ProtectedRoute>
                } />
                <Route path="/admin/guide" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminGuide />
                  </ProtectedRoute>
                } />
                <Route path="/admin/newsletter" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <NewsletterManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit-approvals" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <EditApprovals />
                  </ProtectedRoute>
                } />
                
                {/* Reviewer Routes */}
                <Route path="/reviewer/dashboard" element={
                  <ProtectedRoute allowedRoles={['reviewer', 'admin']}>
                    <ReviewerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/reviewer/due-reviews" element={
                  <ProtectedRoute allowedRoles={['reviewer', 'admin']}>
                    <DueReviews />
                  </ProtectedRoute>
                } />
                <Route path="/reviewer/guide" element={
                  <ProtectedRoute allowedRoles={['reviewer', 'admin']}>
                    <ReviewerGuide />
                  </ProtectedRoute>
                } />
                <Route path="/reviewer/preferences" element={
                  <ProtectedRoute allowedRoles={['reviewer', 'admin']}>
                    <ReviewerPreferences />
                  </ProtectedRoute>
                } />
                
                {/* Company Routes */}
                <Route path="/company/dashboard" element={
                  <ProtectedRoute allowedRoles={['company', 'admin']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/company/overview" element={
                  <ProtectedRoute allowedRoles={['company', 'admin']}>
                    <CompanyDashboardOverview />
                  </ProtectedRoute>
                } />
                <Route path="/company/products" element={
                  <ProtectedRoute allowedRoles={['company', 'admin']}>
                    <CompanyProductsManager />
                  </ProtectedRoute>
                } />
                <Route path="/company/guide" element={
                  <ProtectedRoute allowedRoles={['company', 'admin']}>
                    <CompanyGuide />
                  </ProtectedRoute>
                } />
                <Route path="/company/certification" element={<CompanyCertification />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ProductEditProvider>
      </RoleProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
