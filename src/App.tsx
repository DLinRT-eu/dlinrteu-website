import { lazy, Suspense, type ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { ProductEditProvider } from "@/components/product-editor";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ApprovalGate } from "@/components/auth/ApprovalGate";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Header from "./components/Header";
import { AuthenticatedLayout } from "./components/layout/AuthenticatedLayout";

const ConditionalHeader = () => {
  const { pathname } = useLocation();
  if (pathname === "/presentation/demo") return null;
  return <Header />;
};

const isDynamicImportError = (error: unknown) =>
  error instanceof TypeError &&
  error.message.includes("Failed to fetch dynamically imported module");

const lazyPage = <T extends ComponentType<any>>(loader: () => Promise<{ default: T }>) =>
  lazy(async () => {
    try {
      const page = await loader();
      sessionStorage.removeItem("lazy-route-reloaded");
      return page;
    } catch (error) {
      if (isDynamicImportError(error) && !sessionStorage.getItem("lazy-route-reloaded")) {
        sessionStorage.setItem("lazy-route-reloaded", "true");
        window.location.reload();
        return new Promise<{ default: T }>(() => undefined);
      }

      sessionStorage.removeItem("lazy-route-reloaded");
      throw error;
    }
  });

// Lazy-loaded page components for code splitting
const Index = lazyPage(() => import("./pages/Index"));
const NotFound = lazyPage(() => import("./pages/NotFound"));
const About = lazyPage(() => import("./pages/About"));
const Security = lazyPage(() => import("./pages/Security"));
const ResetPassword = lazyPage(() => import("./pages/ResetPassword"));
const UpdatePassword = lazyPage(() => import("./pages/UpdatePassword"));
const AcceptCompanyInvite = lazyPage(() => import("./pages/AcceptCompanyInvite"));
const Presentation = lazyPage(() => import("./pages/Presentation"));
const LiveDemoMode = lazyPage(() => import("./components/presentation/LiveDemoMode").then(m => ({ default: m.LiveDemoMode })));
const SecurityMonitoring = lazyPage(() => import("./pages/SecurityMonitoring"));
const ProductDetails = lazyPage(() => import("./pages/ProductDetails"));
const Companies = lazyPage(() => import("./pages/Companies"));
const News = lazyPage(() => import("./pages/News"));
const Support = lazyPage(() => import("./pages/Support"));
const Transparency = lazyPage(() => import("./pages/Transparency"));
const NewsDetail = lazyPage(() => import("./pages/NewsDetail"));
const Products = lazyPage(() => import("./pages/Products"));
const Pipeline = lazyPage(() => import("./pages/Pipeline"));
const CompanyProducts = lazyPage(() => import("./pages/CompanyProducts"));
const Dashboard = lazyPage(() => import("./pages/Dashboard"));
const Dashboard_Authenticated = lazyPage(() => import("./pages/Dashboard_Authenticated"));
const Timeline = lazyPage(() => import("./pages/Timeline"));
const Initiatives = lazyPage(() => import("./pages/Initiatives"));
const PrivacyPolicy = lazyPage(() => import("./pages/PrivacyPolicy"));
const Subprocessors = lazyPage(() => import("./pages/Subprocessors"));
const TermsOfUse = lazyPage(() => import("./pages/TermsOfUse"));
const ReviewDashboard = lazyPage(() => import("./pages/ReviewDashboard"));
const ProductReview = lazyPage(() => import("./pages/ProductReview"));
const ResourcesCompliance = lazyPage(() => import("./pages/ResourcesCompliance"));
const Profile = lazyPage(() => import("./pages/Profile"));
const MyProducts = lazyPage(() => import("./pages/MyProducts"));
const RoleSelection = lazyPage(() => import("./pages/RoleSelection"));
const ProductExperiences = lazyPage(() => import("./pages/ProductExperiences"));
const Auth = lazyPage(() => import("./pages/Auth"));
const Changelog = lazyPage(() => import("./pages/Changelog"));
const Roles = lazyPage(() => import("./pages/Roles"));
const RolesFAQ = lazyPage(() => import("./pages/RolesFAQ"));
const NotificationHistory = lazyPage(() => import("./pages/NotificationHistory"));
const NotificationSettings = lazyPage(() => import("./pages/NotificationSettings"));
const EvidenceImpactGuide = lazyPage(() => import("./pages/EvidenceImpactGuide"));
const AiAutoContouringComparison = lazyPage(() => import("./pages/guides/AiAutoContouringComparison"));
const ChangelogGenerator = lazyPage(() => import("./pages/admin/ChangelogGenerator"));
const CompanyManagement = lazyPage(() => import("./pages/admin/CompanyManagement"));
const CompanyMappingValidator = lazyPage(() => import("./pages/admin/CompanyMappingValidator"));
const UserProductAdoptions = lazyPage(() => import("./pages/admin/UserProductAdoptions"));
const CertificationManagement = lazyPage(() => import("./pages/admin/CertificationManagement"));
const NewsletterManagement = lazyPage(() => import("./pages/admin/NewsletterManagement"));
const NewsletterBroadcast = lazyPage(() => import("./pages/admin/NewsletterBroadcast"));
const Unsubscribe = lazyPage(() => import("./pages/Unsubscribe"));
const CompareStructures = lazyPage(() => import("./pages/CompareStructures"));

// Admin Pages
const AdminOverview = lazyPage(() => import("./pages/admin/AdminOverview"));
const FinancialsAdmin = lazyPage(() => import("./pages/admin/FinancialsAdmin"));
const AdminDashboard = lazyPage(() => import("./pages/admin/Dashboard"));
const UserManagement = lazyPage(() => import("./pages/admin/UserManagement"));
const ReviewAssignment = lazyPage(() => import("./pages/admin/ReviewAssignment"));
const PRManagement = lazyPage(() => import("./pages/admin/PRManagement"));
const SecurityDashboard = lazyPage(() => import("./pages/admin/SecurityDashboard"));
const UserRegistrationReview = lazyPage(() => import("./pages/admin/UserRegistrationReview"));
const ChangelogAdmin = lazyPage(() => import("./pages/admin/ChangelogAdmin"));
const EditApprovals = lazyPage(() => import("./pages/admin/EditApprovals"));
const MySubmissions = lazyPage(() => import("./pages/MySubmissions"));
const BulkRepresentativeEmail = lazyPage(() => import("./pages/admin/BulkRepresentativeEmail"));

// Company Pages
const CompanyDashboard = lazyPage(() => import("./pages/company/Dashboard"));
const CompanyDashboardOverview = lazyPage(() => import("./pages/company/CompanyDashboardOverview"));
const CompanyProductsManager = lazyPage(() => import("./pages/company/ProductsManager"));
const CompanyGuide = lazyPage(() => import("./pages/company/CompanyGuide"));
const CompanyCertification = lazyPage(() => import("./pages/company/CompanyCertification"));

// Reviewer Pages
const ReviewerDashboard = lazyPage(() => import("./pages/reviewer/Dashboard"));
const ReviewerGuide = lazyPage(() => import("./pages/reviewer/ReviewerGuide"));
const ReviewerPreferences = lazyPage(() => import("./pages/reviewer/Preferences"));
const DueReviews = lazyPage(() => import("./pages/reviewer/DueReviews"));

// Admin Guide
const AdminGuide = lazyPage(() => import("./pages/admin/AdminGuide"));

// Admin Review Pages
const ReviewRounds = lazyPage(() => import("./pages/admin/ReviewRounds"));
const ReviewRoundDetails = lazyPage(() => import("./pages/admin/ReviewRoundDetails"));

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
              <ConditionalHeader />
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                }>
                  <AuthenticatedLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="products" element={<Products />} />
                <Route path="products/pipeline" element={<Pipeline />} />
                <Route path="products/company/:companyId" element={<CompanyProducts />} />
                <Route path="compare/structures" element={<CompareStructures />} />
                <Route path="initiatives" element={<Initiatives />} />
                <Route path="about" element={<About />} />
                <Route path="maintenance-team" element={<Navigate to="/about" replace />} />
                <Route path="donate" element={<Navigate to="/support" replace />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="security" element={<Security />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="update-password" element={<UpdatePassword />} />
                <Route path="accept-company-invite" element={<AcceptCompanyInvite />} />
                <Route path="export-presentation" element={<Navigate to="/presentation" replace />} />
                <Route path="presentation" element={<Presentation />} />
                <Route path="presentation/demo" element={<LiveDemoMode />} />
                <Route path="security-monitoring" element={<Navigate to="/admin/security" replace />} />
                <Route path="companies" element={<Companies />} />
                <Route path="news" element={<News />} />
                <Route path="support" element={<Support />} />
                <Route path="transparency" element={<Transparency />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard-home" element={
                  <ProtectedRoute requireAuth={true}>
                    <ApprovalGate>
                      <Dashboard_Authenticated />
                    </ApprovalGate>
                  </ProtectedRoute>
                } />
                <Route path="timeline" element={<Timeline />} />
                <Route path="review" element={<ReviewDashboard />} />
                <Route path="review/:id" element={<ProductReview />} />
                <Route path="resources-compliance" element={<ResourcesCompliance />} />
                <Route path="resources" element={<Navigate to="/resources-compliance" replace />} />
                <Route path="evidence-impact-guide" element={<EvidenceImpactGuide />} />
                <Route path="guides/ai-auto-contouring-comparison" element={<AiAutoContouringComparison />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="subprocessors" element={<Subprocessors />} />
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
                <Route path="/my-submissions" element={
                  <ProtectedRoute requireAuth={true}>
                    <ApprovalGate>
                      <MySubmissions />
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
                <Route path="/notification-settings" element={
                  <ProtectedRoute requireAuth={true}>
                    <ApprovalGate>
                      <NotificationSettings />
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
                <Route path="/admin/financials" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <FinancialsAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/admin/newsletter" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <NewsletterManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/newsletter-broadcast" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <NewsletterBroadcast />
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit-approvals" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <EditApprovals />
                  </ProtectedRoute>
                } />
                <Route path="/admin/representatives-bulk-email" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <BulkRepresentativeEmail />
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
                <Route path="/company/certification" element={
                  <ProtectedRoute allowedRoles={['company', 'admin']}>
                    <CompanyCertification />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
                  </AuthenticatedLayout>
                </Suspense>
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </ProductEditProvider>
      </RoleProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
