import React from 'react';
import { ProductDetails } from '@/types/productDetails';
import { StructureComparisonResult } from '@/utils/comparison/structureComparison';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Star, Users } from 'lucide-react';

interface StructureComparisonSummaryProps {
  products: ProductDetails[];
  comparisonResult: StructureComparisonResult;
}

const StructureComparisonSummary = ({ 
  products, 
  comparisonResult 
}: StructureComparisonSummaryProps) => {
  const { commonStructures, uniqueStructures, productStats, allStructures } = comparisonResult;

  return (
    <div className="space-y-4">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Structures</span>
            </div>
            <p className="text-2xl font-bold mt-1">{allStructures.length}</p>
            <p className="text-xs text-muted-foreground">across all products</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Common</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-green-700 dark:text-green-400">
              {commonStructures.length}
            </p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70">
              in all {products.length} products
            </p>
          </CardContent>
        </Card>

        {products.slice(0, 2).map((product) => {
          const stats = productStats[product.id];
          return (
            <Card 
              key={product.id}
              className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-400 truncate">
                    {product.company}
                  </span>
                </div>
                <p className="text-2xl font-bold mt-1 text-amber-700 dark:text-amber-400">
                  {stats?.unique || 0}
                </p>
                <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                  unique structures
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Product Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product) => {
          const stats = productStats[product.id];
          const uniqueCount = stats?.unique || 0;
          const topUnique = uniqueStructures[product.id]?.slice(0, 3) || [];
          
          return (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.company}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stats?.total || 0} total
                  </Badge>
                </div>
                
                <div className="flex gap-4 text-xs mb-3">
                  <div>
                    <span className="text-muted-foreground">Unique: </span>
                    <span className="font-semibold text-amber-600">{uniqueCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Common: </span>
                    <span className="font-semibold text-green-600">{stats?.common || 0}</span>
                  </div>
                </div>
                
                {topUnique.length > 0 && (
                  <div className="border-t pt-2">
                    <p className="text-xs text-muted-foreground mb-1">Top unique structures:</p>
                    <div className="flex flex-wrap gap-1">
                      {topUnique.map((structure, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                        >
                          {structure}
                        </Badge>
                      ))}
                      {uniqueCount > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{uniqueCount - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StructureComparisonSummary;
