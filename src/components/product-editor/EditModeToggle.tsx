import React from 'react';
import { Button } from '@/components/ui/button';
import { useProductEdit } from './ProductEditContext';
import { useRoles } from '@/contexts/RoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProductDetails } from '@/types/productDetails';
import { Pencil, Eye, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EditModeToggleProps {
  product: ProductDetails;
}

export function EditModeToggle({ product }: EditModeToggleProps) {
  const { user } = useAuth();
  const { hasAdminRole, hasReviewerRole, hasCompanyRole } = useRoles();
  const { isEditMode, enableEditMode, disableEditMode, isLoading, loadExistingDraft } = useProductEdit();
  
  const canEdit = Boolean(user && (hasAdminRole || hasReviewerRole || hasCompanyRole));
  
  if (!canEdit) {
    return null;
  }
  
  const handleToggle = async () => {
    if (isEditMode) {
      disableEditMode();
    } else {
      enableEditMode(product);
      // Try to load any existing draft
      await loadExistingDraft(product.id);
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isEditMode ? "default" : "outline"}
            size="sm"
            onClick={handleToggle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : isEditMode ? (
              <Eye className="h-4 w-4 mr-2" />
            ) : (
              <Pencil className="h-4 w-4 mr-2" />
            )}
            {isEditMode ? 'View Mode' : 'Edit Mode'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isEditMode 
            ? 'Switch to view mode (changes will be saved as draft)'
            : 'Enable visual editing for this product'
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
