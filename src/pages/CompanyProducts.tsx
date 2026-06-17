import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Building, Clock, ExternalLink, Package, ShieldCheck } from "lucide-react";
import dataService from "@/services/DataService";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFeedbackBanner from "@/components/ProductFeedbackBanner";
import { Badge } from "@/components/ui/badge";

const CompanyProducts = () => {
  const { companyId = "" } = useParams<{ companyId: string }>();

  const company = useMemo(() => dataService.getCompanyById(companyId), [companyId]);
  const products = useMemo(
    () => (company ? dataService.getProductsByCompany(company.id) : []),
    [company]
  );
  const pipelineProducts = useMemo(
    () =>
      company
        ? dataService
            .getPipelineProducts()
            .filter((p) => company.productIds.includes(p.id || ""))
        : [],
    [company]
  );


  const stats = useMemo(() => {
    const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    const ceCount = products.filter((p) => p.regulatory?.ce?.status).length;
    const fdaCount = products.filter((p) => {
      const fda = p.regulatory?.fda;
      return typeof fda === "string" ? !!fda : !!fda?.status;
    }).length;
    return { categories, ceCount, fdaCount };
  }, [products]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const p of products) {
      const key = p.category || "Other";
      if (!map.has(key)) map.set(key, [] as typeof products);
      map.get(key)!.push(p);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [products]);

  if (!company) {
    return (
      <div className="min-h-screen bg-white">
        <SEO title="Company not found" description="The requested company could not be found." />
        <main className="max-w-3xl mx-auto px-4 md:px-8 py-16 text-center">
          <Building className="h-10 w-10 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Company not found</h1>
          <p className="text-gray-600 mb-6">
            We could not find a company with this identifier.
          </p>
          <Link to="/products" className="text-[#00A6D6] hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to all products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const canonical = `https://dlinrt.eu/products/company/${company.id}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${company.name} — Products`,
    description: `All AI/Deep Learning radiotherapy products from ${company.name} catalogd on DLinRT.eu`,
    url: canonical,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        brand: { "@type": "Organization", name: company.name },
        url: `https://dlinrt.eu/product/${p.id}`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${company.name} — Products`}
        description={`Explore the ${products.length} AI radiotherapy product${products.length === 1 ? "" : "s"} from ${company.name} on DLinRT.eu.`}
        canonical={canonical}
        structuredData={structuredData}
      />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Link
          to="/products"
          className="text-sm text-gray-500 hover:text-[#00A6D6] inline-flex items-center gap-1 mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all products
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border">
            <img
              src={company.logoUrl || "/placeholder.svg"}
              alt={`${company.name} logo`}
              className="w-20 h-20 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="text-3xl font-bold text-[#1a1a2e]">{company.name}</h1>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00A6D6] hover:text-[#00A6D6]/80 inline-flex items-center gap-1 text-sm"
                >
                  Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <p className="text-gray-600 max-w-3xl">{company.description}</p>
            {(company.primaryTask || (company.secondaryTasks?.length ?? 0) > 0) && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {company.primaryTask && (
                  <Badge className="bg-[#00A6D6] text-white text-xs hover:bg-[#00A6D6]/90">
                    {company.primaryTask}
                  </Badge>
                )}
                {company.secondaryTasks?.map((task) => (
                  <Badge
                    key={task}
                    variant="outline"
                    className="text-xs border-[#00A6D6]/40 text-[#00A6D6]"
                  >
                    {task}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
              <Package className="h-4 w-4" /> Products
            </div>
            <div className="text-2xl font-bold mt-1">{products.length}</div>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <div className="text-gray-500 text-xs uppercase tracking-wide">Categories</div>
            <div className="text-2xl font-bold mt-1">{stats.categories.length}</div>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
              <ShieldCheck className="h-4 w-4" /> CE
            </div>
            <div className="text-2xl font-bold mt-1">{stats.ceCount}</div>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
              <ShieldCheck className="h-4 w-4" /> FDA
            </div>
            <div className="text-2xl font-bold mt-1">{stats.fdaCount}</div>
          </div>
        </div>

        {/* Products grouped by category */}
        {products.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <p className="text-muted-foreground">
              No certified products are currently catalogd for this company.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {grouped.map(([category, items]) => (
              <section key={category}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {category}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({items.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {items.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      regulatory={product.regulatory}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {pipelineProducts.length > 0 && (
          <section className="mt-12">
            <Link to="/products/pipeline" className="block mb-4">
              <div className="p-4 bg-violet-50 rounded-lg border border-violet-200 hover:border-violet-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-violet-600" />
                    <span className="text-lg font-semibold text-violet-900">
                      {company.name} products in pipeline ({pipelineProducts.length})
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-violet-600" />
                </div>
                <p className="text-sm text-violet-700 mt-1 ml-7">
                  Announced products not yet certified (CE/FDA). Click to browse the full pipeline catalog.
                </p>
              </div>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pipelineProducts.map((product) => (
                <ProductCard key={product.id} {...product} regulatory={product.regulatory} />
              ))}
            </div>
          </section>
        )}

        <ProductFeedbackBanner className="mt-10" />
      </main>
      <Footer />
    </div>
  );
};

export default CompanyProducts;
