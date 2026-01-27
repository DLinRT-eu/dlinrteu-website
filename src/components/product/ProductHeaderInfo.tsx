import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, XCircle, BadgeCheck } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductHeaderInfoProps {
  product: ProductDetails;
}

const ProductHeaderInfo = ({ product }: ProductHeaderInfoProps) => {
  const [verificationData, setVerificationData] = useState<{
    verified_at: string;
    verification_notes: string | null;
    content_hash: string | null;
  } | null>(null);

  // Fetch company verification from database
  useEffect(() => {
    const fetchVerification = async () => {
      const { data } = await supabase
        .from('company_product_verifications')
        .select('verified_at, verification_notes, content_hash')
        .eq('product_id', product.id)
        .eq('company_id', product.company)
        .order('verified_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setVerificationData(data);
      }
    };

    fetchVerification();
  }, [product.id, product.company]);

  // Generate logo URL based on company name if needed
  const generateLogoUrl = () => {
    if (product.logoUrl && product.logoUrl.trim() !== '') {
      return product.logoUrl.startsWith('/') ? product.logoUrl.trim() : `/${product.logoUrl.trim()}`;
    }
    
    // Create a standardized company logo filename
    const standardizedCompany = product.company.toLowerCase().replace(/\s+/g, '-');
    return `/logos/${standardizedCompany}.png`;
  };
  
  const logoSrc = generateLogoUrl();
  
  // Helper to check if a date string is valid
  const isValidDate = (dateStr: string | undefined): boolean => {
    if (!dateStr || dateStr === "0000-00-00" || dateStr.trim() === "") return false;
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  };

  // Check if product has been revised by company
  const hasCompanyRevision = isValidDate(product.companyRevisionDate);
  const isRecentCompanyRevision = hasCompanyRevision && 
    new Date().getTime() - new Date(product.companyRevisionDate!).getTime() < 6 * 30 * 24 * 60 * 60 * 1000;
  
  // Format company revision date
  const formattedCompanyRevisionDate = hasCompanyRevision
    ? new Date(product.companyRevisionDate!).toISOString().split('T')[0]
    : null;
  
  // Check if revision is recent (less than 6 months)
  const isRevised = !!product.lastRevised;
  const isRecentlyRevised = isRevised && 
    new Date().getTime() - new Date(product.lastRevised).getTime() < 6 * 30 * 24 * 60 * 60 * 1000;
  
  // Format revision date in YYYY-MM-DD format
  const formattedRevisionDate = product.lastRevised 
    ? new Date(product.lastRevised).toISOString().split('T')[0]
    : null;

  // Certification status logic: check if content has changed (not just lastRevised)
  const [isCertificationOutdated, setIsCertificationOutdated] = React.useState(false);
  
  React.useEffect(() => {
    const checkContentHash = async () => {
      if (!verificationData || !verificationData.content_hash) {
        // Legacy certification without hash - fall back to date comparison
        const outdated = verificationData && product.lastRevised && 
          new Date(product.lastRevised) > new Date(verificationData.verified_at);
        setIsCertificationOutdated(!!outdated);
        return;
      }

      // Compare content hashes to determine if certification is outdated
      const { calculateProductContentHash } = await import('@/utils/productHash');
      const currentHash = await calculateProductContentHash(product);
      const hasChanged = currentHash !== verificationData.content_hash;
      setIsCertificationOutdated(hasChanged);
    };

    checkContentHash();
  }, [verificationData, product]);

  const certificationStatus = verificationData 
    ? isCertificationOutdated 
      ? 'outdated' 
      : 'valid'
    : null;
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-24 h-24 rounded-md overflow-hidden bg-white">
          <img 
            src={logoSrc} 
            alt={product.name} 
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
              console.error(`Failed to load product logo: ${logoSrc}`);
            }}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {/* Company Verification Badge - Valid */}
            {certificationStatus === 'valid' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge 
                      variant="success"
                      className="flex items-center gap-1"
                    >
                      <BadgeCheck className="h-3 w-3" />
                      Verified by Company
                      <span className="text-xs ml-1">
                        ({new Date(verificationData!.verified_at).toLocaleDateString()})
                      </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold mb-1">Company Verified</p>
                    <p className="text-xs text-muted-foreground">
                      Verified on: {new Date(verificationData!.verified_at).toLocaleDateString()}
                    </p>
                    {verificationData!.verification_notes && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {verificationData!.verification_notes}
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Company Verification Badge - Outdated */}
            {certificationStatus === 'outdated' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge 
                      variant="warning"
                      className="flex items-center gap-1"
                    >
                      <BadgeCheck className="h-3 w-3" />
                      Certification Outdated
                      <span className="text-xs ml-1">
                        (certified {new Date(verificationData!.verified_at).toLocaleDateString()})
                      </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold mb-1 text-yellow-600">Certification Outdated</p>
                    <p className="text-xs text-muted-foreground">
                      Product was certified on {new Date(verificationData!.verified_at).toLocaleDateString()}, 
                      but has been updated on {new Date(product.lastRevised!).toLocaleDateString()}.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Company needs to re-certify the updated information.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Badge
              variant={isRecentlyRevised ? "success" : isRevised ? "outline" : "secondary"} 
              className={`flex items-center gap-1 ${isRecentlyRevised ? 'bg-green-100 text-green-800' : isRevised ? '' : 'bg-gray-100 text-gray-600'}`}
            >
              {isRecentlyRevised ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {formattedRevisionDate ? `Revised: ${formattedRevisionDate}` : "Not revised"}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {product.productUrl && (
          <Button asChild variant="outline">
            <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
              Product Website <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
        {product.companyUrl && (
          <Button asChild variant="secondary">
            <a href={product.companyUrl} target="_blank" rel="noopener noreferrer">
              Visit Company <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductHeaderInfo;
