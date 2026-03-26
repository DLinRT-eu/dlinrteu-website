import React, { useState, useMemo } from 'react';
import { ProductDetails } from '@/types/productDetails';
import dataService from '@/services/DataService';
import StructureComparisonTable from '@/components/comparison/StructureComparisonTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layers, ArrowLeft, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

const CompareStructures = () => {
  // Get all products with supported structures
  const allProducts = useMemo(() => {
    return dataService.getAllProducts().filter(p => 
      p.supportedStructures && 
      Array.isArray(p.supportedStructures) && 
      p.supportedStructures.length > 0
    );
  }, []);

  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(() => {
    // Pre-select first 3 products by default
    const defaultSelection = new Set<string>();
    allProducts.slice(0, 3).forEach(p => defaultSelection.add(p.id));
    return defaultSelection;
  });

  const selectedProducts = useMemo(() => {
    return allProducts.filter(p => selectedProductIds.has(p.id));
  }, [allProducts, selectedProductIds]);

  const toggleProduct = (productId: string) => {
    setSelectedProductIds(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedProductIds(new Set(allProducts.map(p => p.id)));
  };

  const clearAll = () => {
    setSelectedProductIds(new Set());
  };

  // Group products by company
  const productsByCompany = useMemo(() => {
    const groups: Record<string, ProductDetails[]> = {};
    allProducts.forEach(product => {
      const company = product.company || 'Unknown';
      if (!groups[company]) {
        groups[company] = [];
      }
      groups[company].push(product);
    });
    return groups;
  }, [allProducts]);

  return (
    <>
      <SEO
        title="Structure Comparison | Compare Auto-Contouring Structures"
        description="Compare anatomical structures supported by different auto-contouring products. Find unique and common structures across vendors."
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Structure Comparison</h1>
                <p className="text-muted-foreground">
                  Compare anatomical structures across auto-contouring products
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Product Selection Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Select Products</CardTitle>
                  <CardDescription>
                    Choose products to compare ({selectedProductIds.size} selected)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quick actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={selectAll}
                      className="flex-1"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearAll}
                      className="flex-1"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  </div>

                  {/* Product list */}
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {Object.entries(productsByCompany).map(([company, products]) => (
                        <div key={company} className="space-y-2">
                          <h4 className="text-sm font-semibold text-muted-foreground">
                            {company}
                          </h4>
                          {products.map(product => {
                            const structureCount = Array.isArray(product.supportedStructures) 
                              ? product.supportedStructures.length 
                              : 0;
                            const isSelected = selectedProductIds.has(product.id);
                            
                            return (
                              <div
                                key={product.id}
                                className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                  isSelected 
                                    ? 'bg-primary/10 border border-primary/20' 
                                    : 'hover:bg-muted/50'
                                }`}
                                onClick={() => toggleProduct(product.id)}
                              >
                                <Checkbox 
                                  checked={isSelected}
                                  className="mt-0.5"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {product.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">
                                      {structureCount} structures
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {selectedProductIds.size < 2 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded">
                      Select at least 2 products to compare structures
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Comparison Content */}
            <div className="lg:col-span-3">
              {selectedProducts.length >= 2 ? (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Comparing {selectedProducts.length} Products
                      </CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {selectedProducts.map(p => (
                          <Badge key={p.id} variant="outline" className="text-xs">
                            {p.company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <StructureComparisonTable products={selectedProducts} />
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex items-center justify-center min-h-[400px]">
                  <CardContent className="text-center py-12">
                    <Layers className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Select Products to Compare
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      Choose at least 2 products from the sidebar to compare their 
                      supported anatomical structures. You'll see which structures 
                      are unique to each vendor and which are commonly supported.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CompareStructures;
