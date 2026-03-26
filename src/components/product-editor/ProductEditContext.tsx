import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type DraftStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'applied';

export interface ProductEditDraft {
  id: string;
  product_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  draft_data: ProductDetails;
  changed_fields: string[];
  edit_summary: string | null;
  status: DraftStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  review_feedback?: string;
  github_pr_url?: string;
  github_synced_at?: string;
}

interface ProductEditContextType {
  // State
  isEditMode: boolean;
  originalProduct: ProductDetails | null;
  editedProduct: ProductDetails | null;
  changedFields: string[];
  currentDraft: ProductEditDraft | null;
  isSaving: boolean;
  isLoading: boolean;
  
  // Actions
  enableEditMode: (product: ProductDetails) => void;
  disableEditMode: () => void;
  updateField: (fieldPath: string, value: any) => void;
  saveDraft: (summary?: string) => Promise<void>;
  discardChanges: () => void;
  submitForReview: (summary: string) => Promise<void>;
  loadExistingDraft: (productId: string) => Promise<void>;
  
  // Permissions
  canEdit: boolean;
}

const ProductEditContext = createContext<ProductEditContextType | undefined>(undefined);

// Helper to get nested value from object using dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

// Helper to set nested value in object using dot notation
function setNestedValue(obj: any, path: string, value: any): any {
  const result = JSON.parse(JSON.stringify(obj)); // Deep clone
  const parts = path.split('.');
  let current = result;
  
  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] === undefined) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  
  current[parts[parts.length - 1]] = value;
  return result;
}

// Detect which fields have changed between two objects
function detectChangedFields(original: ProductDetails, edited: ProductDetails): string[] {
  const changes: string[] = [];
  
  const compare = (orig: any, edit: any, path: string = '') => {
    if (orig === edit) return;
    
    if (typeof orig !== typeof edit) {
      if (path) changes.push(path);
      return;
    }
    
    if (Array.isArray(orig) && Array.isArray(edit)) {
      if (JSON.stringify(orig) !== JSON.stringify(edit)) {
        if (path) changes.push(path);
      }
      return;
    }
    
    if (typeof orig === 'object' && orig !== null && edit !== null) {
      const allKeys = new Set([...Object.keys(orig || {}), ...Object.keys(edit || {})]);
      allKeys.forEach(key => {
        compare(orig?.[key], edit?.[key], path ? `${path}.${key}` : key);
      });
      return;
    }
    
    if (orig !== edit && path) {
      changes.push(path);
    }
  };
  
  compare(original, edited);
  return changes;
}

export function ProductEditProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { hasAdminRole, hasReviewerRole, hasCompanyRole } = useRoles();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalProduct, setOriginalProduct] = useState<ProductDetails | null>(null);
  const [editedProduct, setEditedProduct] = useState<ProductDetails | null>(null);
  const [changedFields, setChangedFields] = useState<string[]>([]);
  const [currentDraft, setCurrentDraft] = useState<ProductEditDraft | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if user can edit products
  const canEdit = Boolean(user && (hasAdminRole || hasReviewerRole || hasCompanyRole));
  
  // Auto-save draft every 30 seconds when there are changes
  useEffect(() => {
    if (isEditMode && changedFields.length > 0 && !isSaving) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveDraft().catch(console.error);
      }, 30000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [editedProduct, changedFields, isEditMode]);
  
  const enableEditMode = useCallback((product: ProductDetails) => {
    if (!canEdit) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit products.",
        variant: "destructive"
      });
      return;
    }
    
    setOriginalProduct(product);
    setEditedProduct(JSON.parse(JSON.stringify(product)));
    setChangedFields([]);
    setIsEditMode(true);
  }, [canEdit]);
  
  const disableEditMode = useCallback(() => {
    setIsEditMode(false);
    setOriginalProduct(null);
    setEditedProduct(null);
    setChangedFields([]);
    setCurrentDraft(null);
  }, []);
  
  const updateField = useCallback((fieldPath: string, value: any) => {
    if (!editedProduct || !originalProduct) return;
    
    const updated = setNestedValue(editedProduct, fieldPath, value);
    setEditedProduct(updated);
    
    const newChangedFields = detectChangedFields(originalProduct, updated);
    setChangedFields(newChangedFields);
  }, [editedProduct, originalProduct]);
  
  const saveDraft = useCallback(async (summary?: string) => {
    if (!user || !editedProduct || !originalProduct) return;
    
    setIsSaving(true);
    try {
      const draftData = {
        product_id: originalProduct.id,
        created_by: user.id,
        draft_data: editedProduct,
        changed_fields: changedFields,
        edit_summary: summary || currentDraft?.edit_summary || null,
        status: 'draft' as DraftStatus
      };
      
      if (currentDraft) {
        // Update existing draft
        const { error } = await supabase
          .from('product_edit_drafts')
          .update({
            draft_data: draftData.draft_data as any,
            changed_fields: draftData.changed_fields,
            edit_summary: draftData.edit_summary,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentDraft.id);
          
        if (error) throw error;
      } else {
        // Create new draft
        const { data, error } = await supabase
          .from('product_edit_drafts')
          .insert(draftData as any)
          .select()
          .single();
          
        if (error) throw error;
        if (data) {
          setCurrentDraft({
            ...data,
            draft_data: data.draft_data as unknown as ProductDetails
          } as ProductEditDraft);
        }
      }
      
      toast({
        title: "Draft Saved",
        description: "Your changes have been saved as a draft."
      });
    } catch (error: any) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error Saving Draft",
        description: error.message || "Failed to save draft.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [user, editedProduct, originalProduct, changedFields, currentDraft]);
  
  const discardChanges = useCallback(() => {
    if (originalProduct) {
      setEditedProduct(JSON.parse(JSON.stringify(originalProduct)));
      setChangedFields([]);
    }
  }, [originalProduct]);
  
  const submitForReview = useCallback(async (summary: string) => {
    if (!user || !currentDraft) {
      // Save first if no draft exists
      await saveDraft(summary);
    }
    
    setIsSaving(true);
    try {
      const draftId = currentDraft?.id;
      
      if (draftId) {
        const { error } = await supabase
          .from('product_edit_drafts')
          .update({
            status: 'pending_review',
            edit_summary: summary,
            updated_at: new Date().toISOString()
          })
          .eq('id', draftId);
          
        if (error) throw error;
        
        setCurrentDraft(prev => prev ? { ...prev, status: 'pending_review', edit_summary: summary } : null);
        
        toast({
          title: "Submitted for Review",
          description: "Your changes have been submitted for admin review."
        });
        
        disableEditMode();
      }
    } catch (error: any) {
      console.error('Error submitting for review:', error);
      toast({
        title: "Error Submitting",
        description: error.message || "Failed to submit for review.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [user, currentDraft, saveDraft, disableEditMode]);
  
  const loadExistingDraft = useCallback(async (productId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_edit_drafts')
        .select('*')
        .eq('product_id', productId)
        .eq('created_by', user.id)
        .in('status', ['draft', 'rejected'])
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
        
      if (error) throw error;
      
      if (data) {
        setCurrentDraft({
          ...data,
          draft_data: data.draft_data as unknown as ProductDetails
        } as ProductEditDraft);
        setEditedProduct(data.draft_data as unknown as ProductDetails);
        setChangedFields(data.changed_fields || []);
      }
    } catch (error: any) {
      console.error('Error loading draft:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  const value: ProductEditContextType = {
    isEditMode,
    originalProduct,
    editedProduct,
    changedFields,
    currentDraft,
    isSaving,
    isLoading,
    enableEditMode,
    disableEditMode,
    updateField,
    saveDraft,
    discardChanges,
    submitForReview,
    loadExistingDraft,
    canEdit
  };
  
  return (
    <ProductEditContext.Provider value={value}>
      {children}
    </ProductEditContext.Provider>
  );
}

export function useProductEdit() {
  const context = useContext(ProductEditContext);
  if (context === undefined) {
    throw new Error('useProductEdit must be used within a ProductEditProvider');
  }
  return context;
}
