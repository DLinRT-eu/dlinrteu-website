 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Progress } from '@/components/ui/progress';
 import { Badge } from '@/components/ui/badge';
 import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
 import { ProductDetails } from '@/types/productDetails';
 
 interface ProductVerification {
   id: string;
   product_id: string;
   verified_at: string;
   product_last_revised: string | null;
   content_hash: string | null;
 }
 
 interface CertificationProgressWidgetProps {
   products: ProductDetails[];
   verifications: ProductVerification[];
   className?: string;
 }
 
 export default function CertificationProgressWidget({
   products,
   verifications,
   className = '',
 }: CertificationProgressWidgetProps) {
   // Calculate certification statistics
   const totalProducts = products.length;
   const verificationMap = new Map(verifications.map(v => [v.product_id, v]));
   
   // Products with active certification
   const certifiedProducts = products.filter(p => {
     const verification = verificationMap.get(p.id);
     if (!verification) return false;
     
     // Check if certification is still current (product hasn't been modified since)
     if (verification.product_last_revised && p.lastRevised) {
       const verificationProductDate = new Date(verification.product_last_revised);
       const currentProductDate = new Date(p.lastRevised);
       return verificationProductDate >= currentProductDate;
     }
     return true;
   });
   
   // Products with outdated certification (product modified after certification)
   const outdatedProducts = products.filter(p => {
     const verification = verificationMap.get(p.id);
     if (!verification) return false;
     
     if (verification.product_last_revised && p.lastRevised) {
       const verificationProductDate = new Date(verification.product_last_revised);
       const currentProductDate = new Date(p.lastRevised);
       return verificationProductDate < currentProductDate;
     }
     return false;
   });
   
   // Products never certified
   const uncertifiedProducts = products.filter(p => !verificationMap.has(p.id));
   
   const progressPercentage = totalProducts > 0 
     ? Math.round((certifiedProducts.length / totalProducts) * 100) 
     : 0;
 
   if (totalProducts === 0) {
     return null;
   }
 
   return (
     <Card className={className}>
       <CardHeader className="pb-2">
         <CardTitle className="text-base flex items-center gap-2">
           <TrendingUp className="h-4 w-4" />
           Certification Progress
         </CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
         {/* Progress Bar */}
         <div className="space-y-2">
           <div className="flex items-center justify-between text-sm">
             <span className="text-muted-foreground">Coverage</span>
             <span className="font-medium">{progressPercentage}%</span>
           </div>
           <Progress value={progressPercentage} className="h-2" />
         </div>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-2 rounded-lg bg-primary/10">
            <CheckCircle2 className="h-4 w-4 text-primary mb-1" />
            <span className="text-lg font-bold text-primary">{certifiedProducts.length}</span>
             <span className="text-xs text-muted-foreground">Certified</span>
           </div>
           
          <div className="flex flex-col items-center p-2 rounded-lg bg-secondary">
            <AlertTriangle className="h-4 w-4 text-secondary-foreground/70 mb-1" />
            <span className="text-lg font-bold text-secondary-foreground">{outdatedProducts.length}</span>
             <span className="text-xs text-muted-foreground">Outdated</span>
           </div>
           
           <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
             <Clock className="h-4 w-4 text-muted-foreground mb-1" />
             <span className="text-lg font-bold">{uncertifiedProducts.length}</span>
             <span className="text-xs text-muted-foreground">Pending</span>
           </div>
         </div>
 
         {/* Needs Attention */}
         {(outdatedProducts.length > 0 || uncertifiedProducts.length > 0) && (
           <div className="pt-2 border-t">
             <p className="text-xs text-muted-foreground mb-2">Needs Attention:</p>
             <div className="flex flex-wrap gap-1.5">
               {outdatedProducts.slice(0, 3).map(product => (
                <Badge key={product.id} variant="outline" className="text-xs bg-secondary border-secondary">
                   {product.name}
                 </Badge>
               ))}
               {uncertifiedProducts.slice(0, 3).map(product => (
                 <Badge key={product.id} variant="outline" className="text-xs">
                   {product.name}
                 </Badge>
               ))}
               {(outdatedProducts.length + uncertifiedProducts.length) > 6 && (
                 <Badge variant="secondary" className="text-xs">
                   +{(outdatedProducts.length + uncertifiedProducts.length) - 6} more
                 </Badge>
               )}
             </div>
           </div>
         )}
       </CardContent>
     </Card>
   );
 }