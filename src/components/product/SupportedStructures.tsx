/** @jsxImportSource react */
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, CircleDot, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { classifyStructure, StructureTypes, hasLateralityPattern, isInvestigationalStructure, cleanStructureName } from '@/utils/structureClassification';
import InvestigationalStructureBadge from "@/components/InvestigationalStructureBadge";
import { useProductEdit, StructuresEditor } from "@/components/product-editor";

interface SupportedStructuresProps {
  structures?: string[] | Array<{
    name: string;
    type: string;
    accuracy?: string;
    validationDataset?: string;
  }>;
}

interface StructureGroup {
  name: string;
  structures: StructureInfo[];
  types: StructureTypes;
  model?: string;
}

interface StructureInfo {
  name: string;
  supported: boolean;
  type: "OAR" | "GTV" | "Elective";
  isInvestigational: boolean;
}

const SupportedStructures: React.FC<SupportedStructuresProps> = ({ structures }) => {
  const { isEditMode, editedProduct, canEdit } = useProductEdit();
  
  // Use edited structures when in edit mode
  const displayStructures = isEditMode && editedProduct?.supportedStructures 
    ? editedProduct.supportedStructures 
    : structures;
  const showEditor = isEditMode && canEdit;
  
  // Show editor if in edit mode
  if (showEditor) {
    return (
      <div className="space-y-4">
        <StructuresEditor fieldPath="supportedStructures" />
        {/* Also show existing display below for reference */}
        {displayStructures && displayStructures.length > 0 && (
          <StructuresDisplay structures={displayStructures} />
        )}
      </div>
    );
  }

  if (!displayStructures || displayStructures.length === 0) {
    return null;
  }

  return <StructuresDisplay structures={displayStructures} />;
};

// Extracted display component
interface StructuresDisplayProps {
  structures: string[] | Array<{
    name: string;
    type: string;
    accuracy?: string;
    validationDataset?: string;
  }>;
}

const StructuresDisplay: React.FC<StructuresDisplayProps> = ({ structures }) => {

  // Parse and categorize structures
  const groupedStructures: Record<string, StructureGroup> = {};
  let hasOARs = false;
  let hasGTV = false;
  let hasElective = false;
  let hasInvestigational = false;
  const modelTypes: Record<string, StructureTypes> = {};
  let totalOARs = 0;
  let totalGTV = 0;
  let totalElective = 0;
  let totalInvestigational = 0;
  let approvedOARs = 0;
  let approvedGTV = 0;
  let approvedElective = 0;

  // Process and group structures
  const processStructures = structures.map(structure => {
    // Handle both string and object structures
    if (typeof structure === 'object' && structure !== null) {
      return {
        structureName: structure.name,
        structureType: structure.type,
        region: 'Default',
        model: 'Default',
        isSupported: true,
        isInvestigational: false
      };
    } else if (typeof structure === 'string') {
      const parts = structure.split(":");
      if (parts.length > 1) {
        const region = parts[0].trim();
        const structureName = parts[1].trim();
        
        // Extract model name if present
        const modelMatch = region.match(/(.*?(?:-(?:CT|MR(?:I)?(?:\s+T[12])?))?$)/i);
        const model = modelMatch ? modelMatch[1].trim() : region;
        
        const isSupported = !structureName.includes("(unsupported)");
        const isInvestigational = isInvestigationalStructure(structureName);
        const cleanName = cleanStructureName(structureName);
        
        return {
          structureName: cleanName,
          region: region,
          model: model,
          isSupported: isSupported,
          isInvestigational: isInvestigational,
          structureType: ''  // Will be classified below
        };
      }
      const isInvestigational = isInvestigationalStructure(structure);
      return {
        structureName: cleanStructureName(structure),
        region: 'Default',
        model: 'Default',
        isSupported: true,
        isInvestigational: isInvestigational,
        structureType: ''
      };
    }
    return null;
  }).filter(Boolean);

  // Process each structure
  processStructures.forEach(item => {
    if (!item) return;
    
    const { structureName, region, model, isSupported, isInvestigational } = item;
    let structureType = item.structureType;
    
    // Use shared utility for classification if type is not already provided
    if (!structureType) {
      const structureString = `${region}:${structureName}`;
      const { isTarget, isElective } = classifyStructure(structureString);
      structureType = isTarget ? "GTV" : isElective ? "Elective" : "OAR";
    }
    
    const type = structureType === "GTV" ? "GTV" : structureType === "Elective" ? "Elective" : "OAR";
    const isGTV = type === "GTV";
    const isElectiveType = type === "Elective";
    const isOAR = type === "OAR";
    
    // Update structure counts with laterality check
    const multiplier = hasLateralityPattern(structureName) ? 2 : 1;
    
    // Track investigational separately
    if (isInvestigational) {
      totalInvestigational += multiplier;
      hasInvestigational = true;
    }
    
    if (isGTV) {
      totalGTV += multiplier;
      hasGTV = true;
      if (!isInvestigational) approvedGTV += multiplier;
    }
    if (isElectiveType) {
      totalElective += multiplier;
      hasElective = true;
      if (!isInvestigational) approvedElective += multiplier;
    }
    if (isOAR) {
      totalOARs += multiplier;
      hasOARs = true;
      if (!isInvestigational) approvedOARs += multiplier;
    }
    
    // Track which types each model supports
    if (!modelTypes[model]) {
      modelTypes[model] = { hasOAR: false, hasTargets: false, hasElective: false, hasGTV: false, hasInvestigational: false };
    }
    if (isGTV) {
      modelTypes[model].hasGTV = true;
      modelTypes[model].hasTargets = true; // GTV is a type of target
    }
    if (isElectiveType) modelTypes[model].hasElective = true;
    if (isOAR) modelTypes[model].hasOAR = true;
    if (isInvestigational) modelTypes[model].hasInvestigational = true;
    
    if (!groupedStructures[region]) {
      groupedStructures[region] = {
        name: region,
        structures: [],
        types: { hasOAR: false, hasTargets: false, hasGTV: false, hasElective: false, hasInvestigational: false },
        model
      };
    }
    
    groupedStructures[region].structures.push({
      name: structureName,
      supported: isSupported,
      type: type as "OAR" | "GTV" | "Elective",
      isInvestigational: isInvestigational
    });
    
    // Update group types
    if (isGTV) {
      groupedStructures[region].types.hasGTV = true;
      groupedStructures[region].types.hasTargets = true;
    }
    if (isElectiveType) groupedStructures[region].types.hasElective = true;
    if (isOAR) groupedStructures[region].types.hasOAR = true;
    if (isInvestigational) groupedStructures[region].types.hasInvestigational = true;
  });

  // Sort structures by type (investigational goes to the end)
  Object.values(groupedStructures).forEach(group => {
    group.structures.sort((a, b) => {
      // Investigational structures go to the end
      if (a.isInvestigational !== b.isInvestigational) {
        return a.isInvestigational ? 1 : -1;
      }
      const typeOrder: Record<string, number> = { 
        GTV: 0, 
        Elective: 1, 
        OAR: 2 
      };
      return typeOrder[a.type] - typeOrder[b.type];
    });
  });

  // Sort groups by importance (GTV > Elective > OAR)
  const sortedGroups = Object.values(groupedStructures).sort((a, b) => {
    const aTypeCount = Number(a.types.hasOAR) + Number(a.types.hasGTV) + Number(a.types.hasElective);
    const bTypeCount = Number(b.types.hasOAR) + Number(b.types.hasGTV) + Number(b.types.hasElective);
    if (bTypeCount !== aTypeCount) return bTypeCount - aTypeCount;
    if (a.types.hasGTV !== b.types.hasGTV) return b.types.hasGTV ? 1 : -1;
    if (a.types.hasElective !== b.types.hasElective) return b.types.hasElective ? 1 : -1;
    return 0;
  });

  // Create a combined category label
  const getCategoryLabel = () => {
    const categories = [];
    if (hasOARs) categories.push("OARs");
    if (hasGTV) categories.push("GTV");
    if (hasElective) categories.push("Elective");
    
    return categories.join(" + ");
  };

  // Function to get the appropriate icon and color for a structure type
  const getStructureIcon = (type: "OAR" | "GTV" | "Elective", isInvestigational: boolean) => {
    if (isInvestigational) {
      return <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />;
    }
    switch (type) {
      case "OAR":
        return <Shield className="h-4 w-4 text-blue-600" aria-hidden="true" />;
      case "GTV":
        return <Target className="h-4 w-4 text-red-600" aria-hidden="true" />;
      case "Elective":
        return <CircleDot className="h-4 w-4 text-purple-600" aria-hidden="true" />;
    }
  };

  const categoryLabel = getCategoryLabel();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Supported Structures {categoryLabel && <span className="text-base font-normal text-gray-500 ml-2">({categoryLabel})</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary badges section */}
        <div className="flex flex-wrap gap-3 mb-6">
          {approvedOARs > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-blue-50 text-blue-700 border-blue-200"
            )}>
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">OARs</span>
              <span className="font-normal">({approvedOARs})</span>
            </div>
          )}
          {approvedGTV > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-red-50 text-red-700 border-red-200"
            )}>
              <Target className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">Targets</span>
              <span className="font-normal">({approvedGTV})</span>
            </div>
          )}
          {approvedElective > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-purple-50 text-purple-700 border-purple-200"
            )}>
              <CircleDot className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">Elective</span>
              <span className="font-normal">({approvedElective})</span>
            </div>
          )}
          {totalInvestigational > 0 && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-amber-50 text-amber-700 border-amber-200"
            )}>
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium">Investigational</span>
              <span className="font-normal">({totalInvestigational})</span>
            </div>
          )}
        </div>

        {/* Detailed structures grouped by region */}
        <div className="space-y-4">
          {sortedGroups.map((group) => (
            <div key={group.name}>
              <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                <div className="flex gap-1">
                  {group.types.hasOAR && <Shield className="h-4 w-4 text-blue-600" aria-hidden="true" />}
                  {group.types.hasGTV && <Target className="h-4 w-4 text-red-600" aria-hidden="true" />}
                  {group.types.hasElective && <CircleDot className="h-4 w-4 text-purple-600" aria-hidden="true" />}
                  {group.types.hasInvestigational && <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />}
                </div>
                {group.name}
                <span className="text-sm text-gray-500 font-normal">
                  ({[
                    group.types.hasOAR ? "OARs" : null,
                    group.types.hasGTV ? "GTV" : null,
                    group.types.hasElective ? "Elective" : null,
                    group.types.hasInvestigational ? "Investigational" : null
                  ].filter(Boolean).join(" + ")})
                </span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.structures.map((structure, index) => (
                  <div
                    key={index}
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold gap-1",
                      structure.isInvestigational
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : structure.supported 
                          ? structure.type === "OAR"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : structure.type === "GTV"
                              ? "bg-red-50 text-red-800 border-red-200"
                              : "bg-purple-50 text-purple-800 border-purple-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                    )}
                  >
                    {getStructureIcon(structure.type, structure.isInvestigational)}
                    {structure.name}
                    {structure.isInvestigational && (
                      <InvestigationalStructureBadge className="ml-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Model capability badges section */}
        <div className="flex flex-wrap gap-3 border-t pt-4 mt-6">
          {hasOARs && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-blue-50 text-blue-700 border-blue-200"
            )}>
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>OARs</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasOAR).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
          
          {hasGTV && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-red-50 text-red-700 border-red-200"
            )}>
              <Target className="h-4 w-4" aria-hidden="true" />
              <span>GTV</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasGTV).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
          
          {hasElective && (
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "bg-purple-50 text-purple-700 border-purple-200"
            )}>
              <CircleDot className="h-4 w-4" aria-hidden="true" />
              <span>Elective</span>
              <span className="text-gray-500 font-normal">
                ({Object.entries(modelTypes).filter(([_, types]) => types.hasElective).map(([model]) => model).join(", ")})
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedStructures;
