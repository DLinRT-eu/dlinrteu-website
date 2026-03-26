import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductEdit, DosePredictionModelsEditor } from "@/components/product-editor";

interface DosePredictionModel {
  name: string;
  anatomicalSite: string;
  technique: string;
  intent?: string;
  description?: string;
  status?: 'approved' | 'investigational';
}

interface DosePredictionModelsProps {
  models?: DosePredictionModel[];
}

const DosePredictionModels = ({ models }: DosePredictionModelsProps) => {
  const { isEditMode, editedProduct, canEdit } = useProductEdit();
  
  const displayModels = isEditMode && editedProduct?.dosePredictionModels 
    ? editedProduct.dosePredictionModels 
    : models;
  const showEditor = isEditMode && canEdit;
  
  // Show editor if in edit mode
  if (showEditor) {
    return <DosePredictionModelsEditor fieldPath="dosePredictionModels" />;
  }
  
  if (!displayModels || displayModels.length === 0) return null;

  // Group models by anatomical site
  const groupedModels = displayModels.reduce((acc, model) => {
    if (!acc[model.anatomicalSite]) {
      acc[model.anatomicalSite] = [];
    }
    acc[model.anatomicalSite].push(model);
    return acc;
  }, {} as Record<string, DosePredictionModel[]>);

  // Define site order for consistent display
  const siteOrder = ["Head & Neck", "Brain", "Thorax", "Breast", "Pelvis", "Male Pelvis"];
  const sortedSites = Object.keys(groupedModels).sort((a, b) => {
    const aIndex = siteOrder.indexOf(a);
    const bIndex = siteOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-600" />
          Dose Prediction Models
          <span className="text-base font-normal text-muted-foreground">
            ({displayModels.length} models)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          {sortedSites.map((site) => (
            <div 
              key={site} 
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 bg-orange-50 text-orange-700 border-orange-200"
            >
              <Brain className="h-4 w-4" />
              <span className="font-medium">{site}</span>
              <span className="font-normal">({groupedModels[site].length})</span>
            </div>
          ))}
        </div>

        {/* Detailed models grouped by site */}
        <div className="space-y-4">
          {sortedSites.map((site) => (
            <div key={site}>
              <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-600" />
                {site}
              </h4>
              <div className="flex flex-wrap gap-2">
                {groupedModels[site].map((model, index) => (
                  <div
                    key={index}
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-sm gap-2",
                      model.status === 'investigational'
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-orange-50 text-orange-800 border-orange-200"
                    )}
                  >
                    <span className="font-semibold">{model.name}</span>
                    <span className="text-xs bg-white/50 px-1.5 py-0.5 rounded">
                      {model.technique}
                    </span>
                    {model.intent && (
                      <span className="text-xs text-muted-foreground">{model.intent}</span>
                    )}
                    {model.status === 'investigational' && (
                      <span className="text-xs italic">(unverified)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DosePredictionModels;
