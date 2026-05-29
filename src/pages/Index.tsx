import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import OrbitHero from "@/components/homepage/OrbitHero";
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
      setStats({
        productCount: products.length,
        companyCount: dataService.getActiveCompanies().length,
      });
      const counts = new Map<string, number>();
      products.forEach(p => {
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
    <div className="min-h-screen bg-white">
      <SEO
        title="Deep Learning Products Database for Radiotherapy"
        description="Discover commercial deep learning solutions for radiotherapy. Browse AI products for auto-contouring, treatment planning, and imaging with regulatory data and clinical evidence."
        canonical="https://dlinrt.eu/"
        structuredData={structuredData}
      />

      <OrbitHero />
      <StatsRow productCount={stats.productCount} companyCount={stats.companyCount} />
      <FeatureCards />

      {/* Short value line + link to About */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-12 text-center">
        <p className="text-slate-600">
          Built for clinicians, researchers, physicists, and industry leaders advancing the future of radiotherapy.{" "}
          <Link to="/about" className="text-sky-600 hover:text-sky-700 font-medium">
            Learn more about DLinRT.eu →
          </Link>
        </p>
      </section>

      {/* Tasks across the patient workflow */}
      {taskCounts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Tasks Across the Patient Workflow
            </h2>
            <p className="mt-2 text-slate-600">
              Explore deep-learning solutions grouped by their role in the radiotherapy pathway.
            </p>
          </div>
          <TaskTaxonomy
            categories={taskCounts}
            onCategoryClick={(name) => navigate(`/products?task=${encodeURIComponent(name)}`)}
            filterType="task"
          />
        </section>
      )}


      {/* Mailing list */}
      <div className="bg-gradient-to-b from-white to-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.12)] p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Stay in the loop</h2>
                <p className="text-slate-600 text-sm">
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
