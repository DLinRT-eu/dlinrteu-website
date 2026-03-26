import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Globe, ExternalLink } from 'lucide-react';
import type { ProductDetails } from '@/types/productDetails';

interface EvaluationDataDetailsProps {
  product: ProductDetails;
}

export default function EvaluationDataDetails({ product }: EvaluationDataDetailsProps) {
  const data = product.evaluationData;
  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FlaskConical className="h-5 w-5 text-primary" />
          Clinical Evaluation Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          {data.sites && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sites</p>
              <p className="text-sm font-semibold">{data.sites}</p>
            </div>
          )}
          {data.countries && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm"><span className="font-semibold">{data.countries}</span> countries</p>
            </div>
          )}
          {data.studyDesign && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Study Design</p>
              <Badge variant="outline">{data.studyDesign}</Badge>
            </div>
          )}
        </div>

        {data.demographics && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Demographics</p>
            <p className="text-sm">{data.demographics}</p>
          </div>
        )}

        {data.primaryEndpoint && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Primary Endpoint</p>
            <p className="text-sm">{data.primaryEndpoint}</p>
          </div>
        )}

        {data.results && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Results</p>
            <p className="text-sm">{data.results}</p>
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
