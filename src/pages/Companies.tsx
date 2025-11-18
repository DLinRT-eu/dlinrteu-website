
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Building, ArrowDownAZ, ArrowDownZA, Download, FileSpreadsheet, FileText, Code } from 'lucide-react';
import CompanyCard from '@/components/CompanyCard';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { exportCompaniesToExcel, exportCompaniesToPDF, exportCompaniesToJSON, CompanyExportData } from '@/utils/companyExport';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [sortActive, setSortActive] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Get companies and their products, filtering out companies with no products
  const companies = useMemo(() => {
    return dataService.getAllCompanies()
      .map(company => {
        const companyProducts = dataService.getProductsByCompany(company.id);
        return {
          ...company,
          products: companyProducts,
          productCount: companyProducts.length
        };
      })
      .filter(company => company.productCount > 0);
  }, []);

  // Shuffle companies randomly on each reload (only once)
  const shuffledCompanies = useMemo(() => {
    const arr = [...companies];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [companies]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Radiotherapy DL Companies",
    "description": "Leading companies developing innovative DL solutions for radiation therapy",
    "url": "https://dlinrt.eu/companies",
    "itemListOrder": "Unordered",
    "numberOfItems": shuffledCompanies.length,
    "itemListElement": shuffledCompanies.map((company, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": company.name,
        "description": company.description,
        "url": company.website
      }
    }))
  };

  // Filter companies based on search query
  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return shuffledCompanies;
    
    const query = searchQuery.toLowerCase();
    return shuffledCompanies.filter(company => 
      company.name.toLowerCase().includes(query) ||
      company.description.toLowerCase().includes(query) ||
      company.products.some(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      )
    );
  }, [shuffledCompanies, searchQuery]);

  // Sort companies based on name only if sortActive is true
  const sortedCompanies = useMemo(() => {
    if (!sortActive) return filteredCompanies;
    return [...filteredCompanies].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortAscending ? comparison : -comparison;
    });
  }, [filteredCompanies, sortAscending, sortActive]);

  const toggleSortDirection = () => {
    setSortActive(true);
    setSortAscending(prev => !prev);
  };

  const prepareExportData = (companies: typeof sortedCompanies): CompanyExportData[] => {
    return companies.map(company => {
      const categories = [...new Set(company.products.map(p => p.category))];
      const ceCount = company.products.filter(p => p.regulatory?.ce?.status).length;
      const fdaCount = company.products.filter(p => {
        const fda = p.regulatory?.fda;
        return typeof fda === 'string' ? fda : fda?.status;
      }).length;

      return {
        company: {
          id: company.id,
          name: company.name,
          website: company.website,
          logoUrl: company.logoUrl,
          description: company.description,
          productIds: company.products.map(p => p.id),
        },
        products: company.products,
        statistics: {
          totalProducts: company.productCount,
          categories,
          certifications: {
            ce: ceCount,
            fda: fdaCount,
          },
        },
      };
    });
  };

  const handleExport = async (format: 'excel' | 'pdf' | 'json') => {
    setIsExporting(true);
    try {
      const exportData = prepareExportData(sortedCompanies);
      
      if (format === 'excel') {
        exportCompaniesToExcel(exportData);
      } else if (format === 'pdf') {
        exportCompaniesToPDF(exportData);
      } else if (format === 'json') {
        exportCompaniesToJSON(exportData);
      }

      toast({
        title: 'Export successful',
        description: `Downloaded ${sortedCompanies.length} companies with their products as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export failed',
        description: 'There was an error exporting the data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Medical AI Companies Directory - Radiotherapy Deep Learning Vendors"
        description="Comprehensive directory of leading medical technology companies developing AI solutions for radiotherapy. Explore vendors offering deep learning tools for imaging, treatment planning, and clinical decision support."
        canonical="https://dlinrt.eu/companies"
        structuredData={structuredData}
      />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Building className="h-8 w-8 text-[#00A6D6]" />
          <h1 className="text-3xl font-bold">Companies</h1>
        </div>
        
        <p className="text-gray-600 mb-8 max-w-2xl">
          Explore leading companies developing innovative AI solutions for radiation therapy, medical imaging synthesis, and clinical decision support in radiotherapy.
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search companies or products..." 
              className="pl-10 bg-white border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Sort button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            title={sortAscending ? "Sort Z-A" : "Sort A-Z"}
            className="h-10 w-10"
          >
            {sortAscending ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowDownZA className="h-4 w-4" />}
          </Button>

          {/* Export dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={isExporting || sortedCompanies.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                Export to PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <Code className="h-4 w-4 mr-2" />
                Export to JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Companies count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedCompanies.length} {sortedCompanies.length === 1 ? 'company' : 'companies'}
            {sortActive ? (sortAscending ? ' (A-Z)' : ' (Z-A)') : ' (Random order)'}
          </p>
        </div>

        {/* Companies list */}
        <div className="space-y-6">
          {sortedCompanies.map((company) => (
            <CompanyCard 
              key={company.id} 
              name={company.name}
              website={company.website}
              logoUrl={company.logoUrl}
              products={company.products as any[]}
              description={company.description}
            />
          ))}
          
          {sortedCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No companies found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Companies;
