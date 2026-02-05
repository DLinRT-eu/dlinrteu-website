 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Card } from '@/components/ui/card';
 import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
 import { CheckCircle2, Clock, AlertTriangle, ExternalLink, BadgeCheck, FileEdit, HelpCircle } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { ProductDetails } from '@/types/productDetails';
 import { getDaysSinceRevision, getUrgencyLevel } from '@/utils/revisionUtils';
 
 interface ProductVerification {
   id: string;
   product_id: string;
   verified_at: string;
   product_last_revised: string | null;
 }
 
 interface ProductCardWithActionsProps {
   product: ProductDetails;
   verification?: ProductVerification;
   onCertify: (productId: string) => void;
   onSuggestRevision: (productId: string) => void;
 }
 
 export default function ProductCardWithActions({
   product,
   verification,
   onCertify,
   onSuggestRevision,
 }: ProductCardWithActionsProps) {
   const daysSince = getDaysSinceRevision(product);
   const urgency = getUrgencyLevel(product);
   
   // Determine certification status
   const getCertificationStatus = () => {
     if (!verification) {
       return { status: 'uncertified', label: 'Not Certified', icon: Clock, color: 'text-muted-foreground' };
     }
     
     // Check if certification is outdated
     if (verification.product_last_revised && product.lastRevised) {
       const verificationDate = new Date(verification.product_last_revised);
       const productDate = new Date(product.lastRevised);
       if (verificationDate < productDate) {
         return { status: 'outdated', label: 'Needs Re-certification', icon: AlertTriangle, color: 'text-amber-600' };
       }
     }
     
     return { status: 'certified', label: 'Certified', icon: CheckCircle2, color: 'text-green-600' };
   };
   
   const certStatus = getCertificationStatus();
   const StatusIcon = certStatus.icon;
 
   return (
     <Card className="p-4 hover:shadow-md transition-shadow">
       <div className="space-y-3">
         {/* Product Header */}
         <div className="flex justify-between items-start gap-2">
           <div className="flex-1 min-w-0">
             <h4 className="font-medium text-sm truncate">{product.name}</h4>
             <p className="text-xs text-muted-foreground">{product.category}</p>
           </div>
           <TooltipProvider>
             <Tooltip>
               <TooltipTrigger asChild>
                 <Badge 
                   variant={
                     urgency === 'high' ? 'destructive' : 
                     urgency === 'medium' ? 'default' : 
                     urgency === 'low' ? 'secondary' : 
                     'outline'
                   }
                   className="shrink-0 text-xs"
                 >
                   {daysSince}d
                 </Badge>
               </TooltipTrigger>
               <TooltipContent>
                 <p>Days since last revision</p>
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
         </div>
 
         {/* Certification Status */}
         <div className="flex items-center gap-1.5">
           <StatusIcon className={`h-3.5 w-3.5 ${certStatus.color}`} />
           <span className={`text-xs ${certStatus.color}`}>{certStatus.label}</span>
           {verification?.verified_at && (
             <span className="text-xs text-muted-foreground ml-auto">
               {new Date(verification.verified_at).toLocaleDateString()}
             </span>
           )}
         </div>
         
         {/* Actions */}
         <div className="flex gap-2 pt-1">
           <Button 
             size="sm" 
             variant="outline" 
             asChild 
             className="flex-1 h-8 text-xs"
           >
             <Link to={`/product/${product.id}`}>
               <ExternalLink className="h-3 w-3 mr-1" />
               View
             </Link>
           </Button>
           
           {certStatus.status === 'uncertified' || certStatus.status === 'outdated' ? (
             <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger asChild>
                   <Button 
                     size="sm" 
                     variant={certStatus.status === 'outdated' ? 'default' : 'secondary'}
                     className="h-8 text-xs"
                     onClick={() => onCertify(product.id)}
                   >
                     <BadgeCheck className="h-3 w-3 mr-1" />
                     {certStatus.status === 'outdated' ? 'Re-certify' : 'Certify'}
                   </Button>
                 </TooltipTrigger>
                 <TooltipContent className="max-w-xs">
                   <p className="font-medium mb-1">Certify Product</p>
                   <p className="text-xs">Confirm the product information is accurate. This adds a "Verified by Company" badge visible to users.</p>
                 </TooltipContent>
               </Tooltip>
             </TooltipProvider>
           ) : (
             <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger asChild>
                   <Button 
                     size="sm" 
                     variant="outline"
                     className="h-8 text-xs"
                     onClick={() => onSuggestRevision(product.id)}
                   >
                     <FileEdit className="h-3 w-3 mr-1" />
                     Suggest Edit
                   </Button>
                 </TooltipTrigger>
                 <TooltipContent className="max-w-xs">
                   <p className="font-medium mb-1">Suggest Revision</p>
                   <p className="text-xs">Propose changes to update the product information. Our team will review and apply the updates.</p>
                 </TooltipContent>
               </Tooltip>
             </TooltipProvider>
           )}
         </div>
       </div>
     </Card>
   );
 }