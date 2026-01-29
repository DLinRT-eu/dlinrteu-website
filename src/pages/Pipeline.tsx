import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Info } from "lucide-react";
import SearchHeader from "@/components/SearchHeader";
import PipelineProductGrid from "@/components/pipeline/PipelineProductGrid";
import PipelineFilterBar from "@/components/pipeline/PipelineFilterBar";
import { FilterState } from "@/types/filters";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import dataService from "@/services/DataService";
import Footer from "@/components/Footer";
import ActiveFilterChips from "@/components/filters/ActiveFilterChips";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Pipeline = () => {
  const [filtersActive, setFiltersActive] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    tasks: [],
    locations: [],
    certifications: [],
    modalities: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const pipelineProducts = dataService.getPipelineProducts();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Products in Pipeline - Upcoming AI Solutions for Radiotherapy",
    "description": "Track upcoming AI products for radiotherapy that have been announced but not yet certified (CE/FDA).",
    "url": "https://dlinrt.eu/products/pipeline",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };

  const handleResetFilters = () => {
    const event = new CustomEvent('resetFilters');
    window.dispatchEvent(event);
    setFiltersActive(false);
    setCurrentFilters({
      tasks: [],
      locations: [],
      certifications: [],
      modalities: [],
    });
    setSearchQuery("");
    toast.success("Filters have been reset");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAdvancedSearchToggle = (enabled: boolean) => {
    setAdvancedSearch(enabled);
  };

  const handleFilterUpdate = (newFilters: FilterState) => {
    setCurrentFilters(newFilters);
    setFiltersActive(
      Object.values(newFilters).some(filterArray => filterArray.length > 0)
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Products in Pipeline - Upcoming AI Solutions for Radiotherapy"
        description="Track upcoming AI products for radiotherapy that have been announced but not yet certified. Browse deep learning solutions in development."
        canonical="https://dlinrt.eu/products/pipeline"
        structuredData={structuredData}
      />
      
      <section className="w-full bg-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-8 w-8 text-violet-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Products in Pipeline
            </h1>
          </div>
          
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Announced products not yet certified (CE/FDA). These products are in various stages of development and regulatory approval.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <Alert className="mb-6 bg-violet-50 border-violet-200">
          <Info className="h-4 w-4 text-violet-600" />
          <AlertDescription className="text-violet-800">
            Products shown here have been publicly announced but have not yet received CE marking or FDA clearance. 
            Information is based on publicly available announcements and may change as products progress through development.
          </AlertDescription>
        </Alert>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Pipeline Products
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({pipelineProducts.length} products)
            </span>
          </h2>
          <button 
            onClick={handleResetFilters}
            className="text-sm text-gray-500 hover:text-[#00A6D6] transition-colors cursor-pointer"
          >
            {filtersActive || searchQuery ? 'Reset filters' : 'Showing all pipeline products'}
          </button>
        </div>
        
        <PipelineFilterBar 
          onFiltersChange={setFiltersActive}
          onFilterUpdate={handleFilterUpdate}
        />
        
        {filtersActive && (
          <ActiveFilterChips 
            filters={currentFilters}
            onRemoveFilter={(filterType, value) => {
              const newFilters = { ...currentFilters };
              newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
              handleFilterUpdate(newFilters);
            }}
            onClearAll={handleResetFilters}
            className="mb-6"
          />
        )}
        
        <PipelineProductGrid 
          filters={currentFilters} 
          searchQuery={searchQuery}
          advancedSearch={advancedSearch}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Pipeline;
