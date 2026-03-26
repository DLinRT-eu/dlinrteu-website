import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ProductDetails } from '@/types/productDetails';
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

export function useProductDraft() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all drafts for current user
  const fetchMyDrafts = useCallback(async (status?: DraftStatus | DraftStatus[]) => {
    if (!user) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('product_edit_drafts')
        .select('*')
        .eq('created_by', user.id)
        .order('updated_at', { ascending: false });
      
      if (status) {
        if (Array.isArray(status)) {
          query = query.in('status', status);
        } else {
          query = query.eq('status', status);
        }
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      return (data || []).map(d => ({
        ...d,
        draft_data: d.draft_data as unknown as ProductDetails
      })) as ProductEditDraft[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch pending drafts for admin review
  const fetchPendingDrafts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('product_edit_drafts')
        .select('*')
        .eq('status', 'pending_review')
        .order('updated_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      return (data || []).map(d => ({
        ...d,
        draft_data: d.draft_data as unknown as ProductDetails
      })) as ProductEditDraft[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get draft by ID
  const getDraft = useCallback(async (draftId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('product_edit_drafts')
        .select('*')
        .eq('id', draftId)
        .single();
      
      if (fetchError) throw fetchError;
      
      return {
        ...data,
        draft_data: data.draft_data as unknown as ProductDetails
      } as ProductEditDraft;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Approve a draft (admin only)
  const approveDraft = useCallback(async (draftId: string, feedback?: string) => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: updateError } = await supabase
        .from('product_edit_drafts')
        .update({
          status: 'approved',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          review_feedback: feedback || null
        })
        .eq('id', draftId);
      
      if (updateError) throw updateError;
      
      toast({
        title: "Draft Approved",
        description: "The draft has been approved and can now be applied."
      });
      
      return true;
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Reject a draft (admin only)
  const rejectDraft = useCallback(async (draftId: string, feedback: string) => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: updateError } = await supabase
        .from('product_edit_drafts')
        .update({
          status: 'rejected',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          review_feedback: feedback
        })
        .eq('id', draftId);
      
      if (updateError) throw updateError;
      
      toast({
        title: "Draft Rejected",
        description: "The draft has been rejected with feedback."
      });
      
      return true;
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Delete a draft
  const deleteDraft = useCallback(async (draftId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: deleteError } = await supabase
        .from('product_edit_drafts')
        .delete()
        .eq('id', draftId);
      
      if (deleteError) throw deleteError;
      
      toast({
        title: "Draft Deleted",
        description: "The draft has been deleted."
      });
      
      return true;
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchMyDrafts,
    fetchPendingDrafts,
    getDraft,
    approveDraft,
    rejectDraft,
    deleteDraft
  };
}
