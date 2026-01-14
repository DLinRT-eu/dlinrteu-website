import React, { useMemo, useState } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { 
  compareStructures, 
  filterStructures,
  StructureRow,
  StructureComparisonResult 
} from '@/utils/comparison/structureComparison';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Minus, Star, Search, Filter, Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import StructureComparisonSummary from './StructureComparisonSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as XLSX from 'xlsx';

interface StructureComparisonTableProps {
  products: ProductDetails[];
}

const StructureComparisonTable = ({ products }: StructureComparisonTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [modalityFilter, setModalityFilter] = useState<string>('all');
  const [showOnly, setShowOnly] = useState<'all' | 'unique' | 'common'>('all');

  // Compute comparison result
  const comparisonResult: StructureComparisonResult = useMemo(() => {
    return compareStructures(products);
  }, [products]);

  // Filter structures based on current filters
  const filteredStructures = useMemo(() => {
    return filterStructures(
      comparisonResult.allStructures,
      { region: regionFilter, modality: modalityFilter, showOnly, searchTerm },
      products.length
    );
  }, [comparisonResult.allStructures, regionFilter, modalityFilter, showOnly, searchTerm, products.length]);

  // Export to Excel
  const handleExport = () => {
    const exportData = filteredStructures.map(structure => {
      const row: Record<string, string> = {
        'Structure': structure.structureName,
        'Region': structure.region,
        'Modality': structure.modality,
        'Unique': structure.isUnique ? 'Yes' : 'No',
        'Products Supporting': String(structure.supportedByCount),
      };
      
      products.forEach(product => {
        row[product.name] = structure.availability[product.id] ? '✓' : '-';
      });
      
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Structure Comparison');
    XLSX.writeFile(wb, `structure-comparison-${Date.now()}.xlsx`);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="table">Detailed Table</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <StructureComparisonSummary 
            products={products} 
            comparisonResult={comparisonResult} 
          />
        </TabsContent>

        <TabsContent value="table" className="mt-4 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search structures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {comparisonResult.regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={modalityFilter} onValueChange={setModalityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Modality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modalities</SelectItem>
                {comparisonResult.modalities.map(modality => (
                  <SelectItem key={modality} value={modality}>{modality}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={showOnly} onValueChange={(v) => setShowOnly(v as typeof showOnly)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Structures</SelectItem>
                <SelectItem value="unique">Unique Only</SelectItem>
                <SelectItem value="common">Common Only</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing {filteredStructures.length} of {comparisonResult.allStructures.length} structures</span>
            {showOnly === 'unique' && (
              <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30">
                <Star className="h-3 w-3 mr-1" />
                Unique only
              </Badge>
            )}
            {showOnly === 'common' && (
              <Badge variant="outline" className="bg-green-50 dark:bg-green-950/30">
                <Check className="h-3 w-3 mr-1" />
                Common only
              </Badge>
            )}
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span>Supported</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                <Minus className="h-3 w-3 text-muted-foreground" />
              </div>
              <span>Not supported</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Star className="h-3 w-3 text-amber-600" />
              </div>
              <span>Unique to vendor</span>
            </div>
          </div>

          {/* Table */}
          <ScrollArea className="h-[400px] rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-[250px]">Structure</TableHead>
                  <TableHead className="w-[100px]">Region</TableHead>
                  {products.map(product => (
                    <TableHead key={product.id} className="text-center min-w-[100px]">
                      <div className="font-semibold">{product.company}</div>
                      <div className="text-xs text-muted-foreground font-normal truncate max-w-[100px]">
                        {product.name}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStructures.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={2 + products.length} 
                      className="text-center py-8 text-muted-foreground"
                    >
                      No structures found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStructures.map((structure, index) => (
                    <TableRow 
                      key={index}
                      className={structure.isUnique ? 'bg-amber-50/50 dark:bg-amber-950/10' : ''}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {structure.isUnique && (
                            <Star className="h-3 w-3 text-amber-500 flex-shrink-0" />
                          )}
                          <span className="truncate">{structure.structureName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {structure.region}
                        </Badge>
                      </TableCell>
                      {products.map(product => {
                        const isSupported = structure.availability[product.id];
                        const isUniqueToThis = structure.uniqueToProductId === product.id;
                        
                        return (
                          <TableCell key={product.id} className="text-center">
                            {isSupported ? (
                              isUniqueToThis ? (
                                <div className="inline-flex items-center justify-center w-7 h-7 rounded bg-amber-100 dark:bg-amber-900/30">
                                  <Star className="h-4 w-4 text-amber-600" />
                                </div>
                              ) : (
                                <div className="inline-flex items-center justify-center w-7 h-7 rounded bg-green-100 dark:bg-green-900/30">
                                  <Check className="h-4 w-4 text-green-600" />
                                </div>
                              )
                            ) : (
                              <div className="inline-flex items-center justify-center w-7 h-7 rounded bg-muted">
                                <Minus className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StructureComparisonTable;
