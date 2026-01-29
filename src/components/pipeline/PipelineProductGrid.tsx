import { useState, useEffect, useMemo } from "react";
import ProductGridControls from "../grid/ProductGridControls";
import ProductList from "../grid/ProductList";
import dataService from "@/services/DataService";
import { FilterState } from "@/types/filters";
import { SortOption } from "../grid/SortControls";
import { useProductSearch } from "../grid/ProductSearch";
import { useProductSorting } from "@/hooks/useProductSorting";
import { ProductDetails } from "@/types/productDetails";
import { normalizeAnatomicalLocations } from "@/utils/productFilters";

interface PipelineProductGridProps {
  filters?: FilterState;
  searchQuery?: string;
  advancedSearch?: boolean;
}

const PipelineProductGrid = ({ filters, searchQuery = "", advancedSearch = false }: PipelineProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [ascending, setAscending] = useState(true);

  // Get pipeline products and filter them
  const filteredProducts = useMemo(() => {
    const pipelineProducts = dataService.getPipelineProducts();
    
    if (!filters) return pipelineProducts;
    
    return pipelineProducts.filter((product: ProductDetails) => {
      // Apply task filter
      if (filters.tasks?.length) {
        const matchesTask = filters.tasks.some(task => {
          if (product.category === task) return true;
          if (product.secondaryCategories?.includes(task)) return true;
          return false;
        });
        if (!matchesTask) return false;
      }
      
      // Apply location filter
      if (filters.locations?.length) {
        const normalizedLocations = normalizeAnatomicalLocations(product.anatomicalLocation || []);
        if (!normalizedLocations.some(loc => filters.locations?.includes(loc))) {
          return false;
        }
      }
      
      // Apply modality filter
      if (filters.modalities?.length) {
        const productModalities = Array.isArray(product.modality) 
          ? product.modality 
          : (product.modality ? [product.modality] : []);
        if (!productModalities.some(m => filters.modalities?.includes(m))) {
          return false;
        }
      }
      
      return true;
    });
  }, [filters]);

  // Apply search filtering
  const searchFilteredProducts = useProductSearch({
    products: filteredProducts,
    searchQuery,
    advancedSearch
  });

  // Apply sorting
  const sortedProducts = useProductSorting({
    products: searchFilteredProducts,
    sortBy,
    ascending
  });

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setCurrentPage(1);
  };

  const handleDirectionChange = (isAscending: boolean) => {
    setAscending(isAscending);
    setCurrentPage(1);
  };

  const hasFilters = filters && (
    filters.tasks.length > 0 || 
    filters.locations.length > 0 || 
    filters.modalities.length > 0
  );

  return (
    <div>
      <ProductGridControls
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        products={sortedProducts}
        sortBy={sortBy}
        ascending={ascending}
        onSortChange={handleSortChange}
        onDirectionChange={handleDirectionChange}
      />
      
      <ProductList
        products={sortedProducts}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        advancedSearch={advancedSearch}
        hasFilters={!!hasFilters}
        isSelectable={false}
        selectedProducts={[]}
        onSelectionChange={() => {}}
        showAllInCompareMode={false}
      />
    </div>
  );
};

export default PipelineProductGrid;
