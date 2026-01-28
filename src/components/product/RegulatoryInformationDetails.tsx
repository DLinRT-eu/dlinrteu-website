import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Info, HelpCircle } from "lucide-react";
import { getStandardizedCertificationTags, parseFDAInfo, parseCEInfo, formatFDAInfo, formatCEInfo } from "@/utils/regulatoryUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EditableField, useProductEdit, RegulatoryEditor } from "@/components/product-editor";

interface RegulatoryInformationProps {
  product: ProductDetails;
}

const MDR_EXEMPT_EXPLANATION = `MDR Exempt products are software tools that fall outside the scope of the EU Medical Device Regulation (MDR 2017/745).

These products are typically:
• Quality assurance and monitoring tools
• Educational or training software
• Administrative or workflow tools
• Research-only applications

They are NOT intended for diagnosis, treatment planning, or clinical decision-making and therefore don't require CE marking as a medical device.`;

const RegulatoryInformationDetails = ({ product }: RegulatoryInformationProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  
  const certificationTags = getStandardizedCertificationTags(displayProduct);
  const hasCE = certificationTags.some(tag => tag.startsWith('CE'));
  const hasFDA = certificationTags.some(tag => tag.startsWith('FDA'));
  const hasMDRExempt = certificationTags.includes('MDR Exempt');
  
  const getCEStatus = () => {
    const ceInfo = parseCEInfo(displayProduct.regulatory?.ce);
    
    if (!ceInfo) {
      return {
        label: "Not specified",
        icon: <Info className="h-3 w-3" />,
        variant: "outline" as const,
        description: "CE marking information not specified",
        details: null
      };
    }
    
    if (hasMDRExempt) {
      return {
        label: "MDR exempt",
        icon: <AlertTriangle className="h-3 w-3" />,
        variant: "warning" as const,
        description: "Medical Device Regulation Exempt",
        details: ceInfo
      };
    }
    
    // Check for explicit "Not Available" or similar negative statuses
    const negativeStatuses = ['not available', 'not specified', 'not applicable', 'n/a'];
    const isNegative = ceInfo.status && negativeStatuses.some(neg => 
      ceInfo.status!.toLowerCase().includes(neg)
    );
    
    if (isNegative) {
      return {
        label: "Not available",
        icon: <Info className="h-3 w-3" />,
        variant: "outline" as const,
        description: ceInfo.status,
        details: null
      };
    }
    
    // Check for "Under review" / pending status
    const pendingStatuses = ['under review', 'pending', 'in progress'];
    const isPending = ceInfo.status && pendingStatuses.some(pend => 
      ceInfo.status!.toLowerCase().includes(pend)
    );
    
    if (isPending) {
      return {
        label: "Under review",
        icon: <AlertTriangle className="h-3 w-3" />,
        variant: "warning" as const,
        description: ceInfo.status,
        details: ceInfo
      };
    }
    
    return {
      label: hasCE ? "CE Marked" : "Not CE Marked",
      icon: hasCE ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />,
      variant: hasCE ? "success" as const : "outline" as const,
      description: formatCEInfo(ceInfo),
      details: ceInfo
    };
  };
  
  const getFDAStatus = () => {
    const fdaInfo = parseFDAInfo(displayProduct.regulatory?.fda);
    
    if (!fdaInfo) {
      return {
        label: "Not specified",
        icon: <Info className="h-3 w-3" />,
        variant: "outline" as const,
        description: "FDA clearance information not specified",
        details: null
      };
    }
    
    // Check for explicit "Not Available" or similar negative statuses
    const negativeStatuses = ['not available', 'not specified', 'not applicable', 'n/a'];
    const isNegative = fdaInfo.status && negativeStatuses.some(neg => 
      fdaInfo.status.toLowerCase().includes(neg)
    );
    
    if (isNegative) {
      return {
        label: "Not available",
        icon: <Info className="h-3 w-3" />,
        variant: "outline" as const,
        description: fdaInfo.status,
        details: null
      };
    }
    
    // Check for "Under review" / pending status
    const pendingStatuses = ['under review', 'pending', 'in progress'];
    const isPending = fdaInfo.status && pendingStatuses.some(pend => 
      fdaInfo.status.toLowerCase().includes(pend)
    );
    
    if (isPending) {
      return {
        label: "Under review",
        icon: <AlertTriangle className="h-3 w-3" />,
        variant: "warning" as const,
        description: fdaInfo.status,
        details: null
      };
    }
    
    let label = fdaInfo.status;
    if (fdaInfo.clearanceNumber?.startsWith('K')) {
      label = "510(k) Cleared";
    } else if (fdaInfo.clearanceNumber?.startsWith('P')) {
      label = "PMA Approved";
    } else if (fdaInfo.status.includes("510(k)")) {
      label = "510(k) Cleared";
    } else if (fdaInfo.status.includes("PMA")) {
      label = "PMA Approved";
    }
    
    return {
      label,
      icon: hasFDA ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />,
      variant: hasFDA ? "success" as const : "outline" as const,
      description: formatFDAInfo(fdaInfo),
      details: fdaInfo
    };
  };
  
  const ceStatus = getCEStatus();
  const fdaStatus = getFDAStatus();
  
  return (
    <TooltipProvider>
      <Card>
      <CardHeader>
        <CardTitle>Regulatory Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">CE Status:</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant={ceStatus.variant}
                className="flex items-center gap-1"
              >
                {ceStatus.icon}
                <span>{ceStatus.label}</span>
              </Badge>
              {hasMDRExempt && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-4">
                    <p className="text-sm whitespace-pre-line">{MDR_EXEMPT_EXPLANATION}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {ceStatus.description && (
                <span className="text-sm text-muted-foreground">
                  {ceStatus.description}
                </span>
              )}
            </div>
            {ceStatus.details && (
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                {ceStatus.details.type && <div>Type: {ceStatus.details.type}</div>}
                {ceStatus.details.certificateNumber && <div>Certificate: {ceStatus.details.certificateNumber}</div>}
                {ceStatus.details.notifiedBody && <div>Notified Body: {ceStatus.details.notifiedBody}</div>}
                {ceStatus.details.regulation && <div>Regulation: {ceStatus.details.regulation}</div>}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">FDA Status:</p>
            <div className="flex items-center gap-2">
              <Badge 
                variant={fdaStatus.variant}
                className="flex items-center gap-1"
              >
                {fdaStatus.icon}
                <span>{fdaStatus.label}</span>
              </Badge>
              {fdaStatus.description && (
                <span className="text-sm text-muted-foreground">
                  {fdaStatus.description}
                </span>
              )}
            </div>
            {fdaStatus.details && (
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                {fdaStatus.details.clearanceNumber && <div>Clearance: {fdaStatus.details.clearanceNumber}</div>}
                {fdaStatus.details.class && <div>Class: {fdaStatus.details.class}</div>}
                {fdaStatus.details.regulationNumber && <div>Regulation: {fdaStatus.details.regulationNumber}</div>}
                {fdaStatus.details.productCode && <div>Product Code: {fdaStatus.details.productCode}</div>}
                {fdaStatus.details.type && <div>Type: {fdaStatus.details.type}</div>}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Intended Use Statement:</p>
          <EditableField
            fieldPath="regulatory.intendedUseStatement"
            value={displayProduct.regulatory?.intendedUseStatement}
            type="textarea"
            placeholder="Add intended use statement"
          >
            <p className="text-muted-foreground text-sm">
              {displayProduct.regulatory?.intendedUseStatement || "N/A"}
            </p>
          </EditableField>
        </div>
        <div>
          <p className="text-sm font-medium">AI Technology:</p>
          <p className="text-muted-foreground text-sm">
            This product utilizes {displayProduct.features?.filter(f => 
              f.toLowerCase().includes('deep learning') || 
              f.toLowerCase().includes('ai') ||
              f.toLowerCase().includes('artificial intelligence')
            ).join(', ') || "artificial intelligence"} technology for {displayProduct.category.toLowerCase()} applications.
          </p>
        </div>
        
        {/* Show RegulatoryEditor in edit mode */}
        {isEditMode && (
          <div className="pt-4 border-t">
            <RegulatoryEditor fieldPath="regulatory" />
          </div>
        )}
      </CardContent>
    </Card>
    </TooltipProvider>
  );
};

export default RegulatoryInformationDetails;
