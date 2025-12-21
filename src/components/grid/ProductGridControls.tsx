
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, FileJson } from "lucide-react";
import { Product } from "@/types/product";
import SortControls, { SortOption } from "./SortControls";
import { ProductDetails } from "@/types/productDetails";
import ExportService, { ExportFormat } from "@/services/ExportService";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import dataService from "@/services/DataService";

interface ProductGridControlsProps {
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
  products: Product[];
  sortBy: SortOption;
  ascending: boolean;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: (ascending: boolean) => void;
}

const ProductGridControls = ({ 
  itemsPerPage, 
  onItemsPerPageChange, 
  products,
  sortBy,
  ascending,
  onSortChange,
  onDirectionChange
}: ProductGridControlsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: ExportFormat, exportAll: boolean) => {
    const dataToExport = exportAll 
      ? dataService.getAllProducts() 
      : products;

    if (dataToExport.length === 0) {
      toast({
        title: "No data to export",
        description: "Please ensure there is data available for export.",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    
    try {
      await ExportService.exportProducts(dataToExport as ProductDetails[], format, {
        filename: exportAll ? 'all-products' : 'filtered-products'
      });
      
      toast({
        title: "Export successful",
        description: `${exportAll ? 'All' : 'Filtered'} products exported as ${format.toUpperCase()} file.`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "An error occurred during export. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const allProductsCount = dataService.getAllProducts().length;
  const filteredCount = products.length;
  const hasActiveFilters = filteredCount < allProductsCount;

  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Products per page:</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={onItemsPerPageChange}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((number) => (
                  <SelectItem key={number} value={String(number)}>
                    {number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <SortControls 
            sortBy={sortBy}
            ascending={ascending}
            onSortChange={onSortChange}
            onDirectionChange={onDirectionChange}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {hasActiveFilters && (
              <>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Filtered ({filteredCount} products)
                </div>
                <DropdownMenuItem onClick={() => handleExport('csv', false)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('excel', false)}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('json', false)}>
                  <FileJson className="w-4 h-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              All Products ({allProductsCount})
            </div>
            <DropdownMenuItem onClick={() => handleExport('csv', true)}>
              <FileText className="w-4 h-4 mr-2" />
              Export All as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('excel', true)}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export All as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('json', true)}>
              <FileJson className="w-4 h-4 mr-2" />
              Export All as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProductGridControls;
