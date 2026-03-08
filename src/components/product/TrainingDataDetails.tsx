import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Globe, Users, ExternalLink } from 'lucide-react';
import type { ProductDetails } from '@/types/productDetails';

interface TrainingDataDetailsProps {
  product: ProductDetails;
}

const DISCLOSURE_COLORS: Record<string, string> = {
  full: 'bg-green-100 text-green-800',
  partial: 'bg-yellow-100 text-yellow-800',
  minimal: 'bg-orange-100 text-orange-800',
  none: 'bg-red-100 text-red-800',
};

export default function TrainingDataDetails({ product }: TrainingDataDetailsProps) {
  const data = product.trainingData;
  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="h-5 w-5 text-primary" />
          Training Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.disclosureLevel && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Disclosure Level:</span>
            <Badge className={DISCLOSURE_COLORS[data.disclosureLevel] || ''}>
              {data.disclosureLevel.charAt(0).toUpperCase() + data.disclosureLevel.slice(1)}
            </Badge>
          </div>
        )}

        {data.description && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
            <p className="text-sm">{data.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {data.datasetSize && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dataset Size</p>
              <p className="text-sm font-semibold">{data.datasetSize}</p>
            </div>
          )}
          {data.institutions && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Institutions</p>
              <p className="text-sm font-semibold">{data.institutions}</p>
            </div>
          )}
          {data.countries && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm"><span className="font-semibold">{data.countries}</span> countries</p>
            </div>
          )}
        </div>

        {data.demographics && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              <Users className="h-4 w-4 inline mr-1" />Demographics
            </p>
            <p className="text-sm">{data.demographics}</p>
          </div>
        )}

        {data.datasetSources && data.datasetSources.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Data Sources</p>
            <div className="flex flex-wrap gap-1">
              {data.datasetSources.map((src, i) => (
                <Badge key={i} variant="outline" className="text-xs">{src}</Badge>
              ))}
            </div>
          </div>
        )}

        {data.scannerModels && data.scannerModels.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Scanner Models</p>
            <div className="flex flex-wrap gap-1">
              {data.scannerModels.map((m, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{m}</Badge>
              ))}
            </div>
          </div>
        )}

        {data.publicDatasets && data.publicDatasets.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Public Datasets</p>
            <div className="flex flex-wrap gap-1">
              {data.publicDatasets.map((ds, i) => (
                <Badge key={i} variant="outline" className="text-xs">{ds}</Badge>
              ))}
            </div>
          </div>
        )}

        {data.sourceUrl && (
          <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ExternalLink className="h-3 w-3" /> View source
          </a>
        )}
      </CardContent>
    </Card>
  );
}
