import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import HomeIntroTop from "../components/homepage/HomeIntroTop";
import OrbitHero from "@/components/homepage/OrbitHero";
import SearchHero from "../components/homepage/SearchHero";
import StatsRow from "@/components/homepage/StatsRow";
import FeatureCards from "@/components/homepage/FeatureCards";
import TaskTaxonomy from "@/components/TaskTaxonomy";
import { useAuth } from "@/contexts/AuthContext";

const NewsSection = lazy(() => import("@/components/NewsSection"));
const MailingListSignup = lazy(() => import("@/components/MailingListSignup"));

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ productCount: 0, companyCount: 0 });
  const [taskCounts, setTaskCounts] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    if (user && !loading) navigate('/dashboard-home', { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) return;
    let cancelled = false;
    (async () => {
      const { default: dataService } = await import("@/services/DataService");
      if (cancelled) return;
      const products = dataService.getAllProducts();
      const pipelineProducts = dataService.getPipelineProducts();
      setStats({
        productCount: products.length + pipelineProducts.length,
        companyCount: dataService.getAllCompaniesWithProducts().length,
      });
      const counts = new Map<string, number>();
      [...products, ...pipelineProducts].forEach(p => {
        if (p.category) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
      });
      setTaskCounts(Array.from(counts, ([name, count]) => ({ name, count })));
    })();
    return () => { cancelled = true; };
  }, [user]);

  if (!loading && user) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Deep Learning in Radiotherapy",
    url: "https://dlinrt.eu",
    logo: "https://dlinrt.eu/logo.png",
    description: "Search and explore deep learning products in Radiotherapy",
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI & Deep Learning Products in Radiotherapy"
        description="Catalog of AI and deep learning products for radiotherapy: auto-contouring, treatment planning, imaging, with regulatory data and evidence."
        canonical="https://dlinrt.eu/"
        structuredData={structuredData}
      />

      <HomeIntroTop />
      <SearchHero />
      <StatsRow productCount={stats.productCount} companyCount={stats.companyCount} />
      <OrbitHero />
      <FeatureCards />

      {/* Short value line + link to About */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-12 text-center">
        <p className="text-muted-foreground">
          Built for clinicians, researchers, physicists, and industry leaders advancing the future of radiotherapy.{" "}
          <Link to="/about" className="text-primary hover:text-primary/80 font-medium">
            Learn more about DLinRT.eu →
          </Link>
        </p>
      </section>

      {/* Tasks across the patient workflow */}
      {taskCounts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12" aria-labelledby="task-taxonomy-heading">
          <h2 id="task-taxonomy-heading" className="sr-only">Tasks across the radiotherapy workflow</h2>
          <TaskTaxonomy
            categories={taskCounts}
            onCategoryClick={(name) => navigate(`/products?task=${encodeURIComponent(name)}`)}
            filterType="task"
          />
        </section>
      )}

      {/* Mailing list */}
      <div className="bg-muted/30 py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="bg-card border border-border rounded-2xl shadow-[0_10px_40px_-20px_rgba(15,23,42,0.12)] p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Stay in the loop</h2>
                <p className="text-muted-foreground text-sm">
                  Get updates on new products, releases, and community news — straight to your inbox.
                </p>
              </div>
              <div className="w-full">
                <Suspense fallback={<div style={{ minHeight: 80 }} />}>
                  <MailingListSignup />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Suspense fallback={<div style={{ minHeight: 200 }} />}>
        <NewsSection />
      </Suspense>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Footer />
      </main>
    </div>
  );
};

export default Index;
