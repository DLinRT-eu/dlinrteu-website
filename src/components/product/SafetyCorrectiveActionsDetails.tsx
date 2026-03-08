import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import type { ProductDetails } from '@/types/productDetails';

interface SafetyCorrectiveActionsDetailsProps {
  product: ProductDetails;
}

const TYPE_COLORS: Record<string, string> = {
  recall: 'bg-red-100 text-red-800',
  FSCA: 'bg-orange-100 text-orange-800',
  advisory: 'bg-yellow-100 text-yellow-800',
  'software-update': 'bg-blue-100 text-blue-800',
};

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-red-100 text-red-800',
  closed: 'bg-green-100 text-green-800',
  terminated: 'bg-gray-100 text-gray-800',
};

export default function SafetyCorrectiveActionsDetails({ product }: SafetyCorrectiveActionsDetailsProps) {
  const actions = product.safetyCorrectiveActions;
  if (!actions || actions.length === 0) return null;

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          Safety Corrective Actions
          <Badge variant="destructive" className="ml-auto">{actions.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={TYPE_COLORS[action.type] || 'bg-gray-100 text-gray-800'}>
                {action.type.toUpperCase()}
              </Badge>
              {action.status && (
                <Badge className={STATUS_COLORS[action.status] || ''}>
                  {action.status.charAt(0).toUpperCase() + action.status.slice(1)}
                </Badge>
              )}
              {action.classification && (
                <Badge variant="outline">{action.classification}</Badge>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {new Date(action.date).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm">{action.description}</p>

            {action.action && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Action Taken</p>
                <p className="text-sm">{action.action}</p>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {action.authority && <span>Authority: <strong>{action.authority}</strong></span>}
              {action.identifier && <span>ID: {action.identifier}</span>}
            </div>

            {action.affectedVersions && action.affectedVersions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {action.affectedVersions.map((v, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">v{v}</Badge>
                ))}
              </div>
            )}

            {action.sourceUrl && (
              <a href={action.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                <ExternalLink className="h-3 w-3" /> View details
              </a>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
