
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, FileJson, Scale, FileType, Network, Package, FileCode } from "lucide-react";
import { Product } from "@/types/product";
import SortControls, { SortOption } from "./SortControls";
import { ProductDetails } from "@/types/productDetails";
import ExportService, { ExportFormat } from "@/services/ExportService";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import dataService from "@/services/DataService";
import { COMPANIES } from "@/data/companies";


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

  const HEAVY_THRESHOLD = 50;

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

    // Warn before generating heavy exports (PDF / HTA workbook) on large sets
    if (
      (format === "pdf" || format === "hta") &&
      dataToExport.length > HEAVY_THRESHOLD
    ) {
      const proceed = window.confirm(
        `You are about to export ${dataToExport.length} products as ${format.toUpperCase()}. ` +
          `This can take 30+ seconds and produce a large file. Continue?`
      );
      if (!proceed) return;
    }

    setIsExporting(true);
    
    try {
      await ExportService.exportProducts(dataToExport as ProductDetails[], format, {
        filename: exportAll ? 'dlinrt-all-products' : 'dlinrt-filtered-products',
        companies: format === 'fhir' || format === 'bundle' ? COMPANIES : undefined,
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
          <DropdownMenuContent align="end" className="w-64">
            {hasActiveFilters && (
              <>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Filtered ({filteredCount} products)
                </div>
                <DropdownMenuItem onClick={() => handleExport('csv', false)}>
                  <FileText className="w-4 h-4 mr-2" />
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('excel', false)}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('json', false)}>
                  <FileJson className="w-4 h-4 mr-2" />
                  JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf', false)}>
                  <FileType className="w-4 h-4 mr-2" />
                  PDF report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('fhir', false)}>
                  <Network className="w-4 h-4 mr-2" />
                  FHIR R4 bundle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('hta', false)}>
                  <Scale className="w-4 h-4 mr-2" />
                  HTA dossier (Excel)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('aidrt', false)}>
                  <FileCode className="w-4 h-4 mr-2" />
                  AID-RT model cards
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('bundle', false)}>
                  <Package className="w-4 h-4 mr-2" />
                  Full bundle (ZIP)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              All products ({allProductsCount})
            </div>
            <DropdownMenuItem onClick={() => handleExport('csv', true)}>
              <FileText className="w-4 h-4 mr-2" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('excel', true)}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('json', true)}>
              <FileJson className="w-4 h-4 mr-2" />
              JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf', true)}>
              <FileType className="w-4 h-4 mr-2" />
              PDF report
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('fhir', true)}>
              <Network className="w-4 h-4 mr-2" />
              FHIR R4 bundle
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('hta', true)}>
              <Scale className="w-4 h-4 mr-2" />
              HTA dossier (Excel)
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProductGridControls;
