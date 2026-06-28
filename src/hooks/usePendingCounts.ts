import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';

export interface PendingCounts {
  // admin
  adminRegistrations: number;
  adminActiveReviews: number;
  adminPendingRevisions: number;
  // reviewer
  reviewerAssigned: number;
  reviewerInProgress: number;
  reviewerDueWeek: number;
  // company
  companyPendingRevisions: number;
  companyApprovedRevisions: number;
  // shared
  loading: boolean;
}

const EMPTY: PendingCounts = {
  adminRegistrations: 0,
  adminActiveReviews: 0,
  adminPendingRevisions: 0,
  reviewerAssigned: 0,
  reviewerInProgress: 0,
  reviewerDueWeek: 0,
  companyPendingRevisions: 0,
  companyApprovedRevisions: 0,
  loading: true,
};

/**
 * Shared pending-work counts. Used by the status bar, sidebar badges,
 * and dashboard primary cards so they stay in sync.
 */
export function usePendingCounts(): PendingCounts {
  const { user } = useAuth();
  const { hasAdminRole, hasReviewerRole, hasCompanyRole } = useRoles();
  const [counts, setCounts] = useState<PendingCounts>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setCounts({ ...EMPTY, loading: false });
      return;
    }

    (async () => {
      try {
        const next: PendingCounts = { ...EMPTY, loading: false };

        if (hasAdminRole) {
          const [regRes, revRes, revisionsRes] = await Promise.all([
            supabase.rpc('get_registration_notifications_admin'),
            supabase.from('product_reviews').select('id', { count: 'exact', head: true }).in('status', ['pending', 'in_progress']),
            supabase.from('company_revisions').select('id', { count: 'exact', head: true }).eq('verification_status', 'pending'),
          ]);
          next.adminRegistrations = Array.isArray(regRes.data) ? regRes.data.filter((r: any) => !r.verified).length : 0;
          next.adminActiveReviews = revRes.count || 0;
          next.adminPendingRevisions = revisionsRes.count || 0;
        }

        if (hasReviewerRole) {
          const today = new Date().toISOString().split('T')[0];
          const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          const [aRes, ipRes, dueRes] = await Promise.all([
            supabase.from('product_reviews').select('id', { count: 'exact', head: true })
              .eq('assigned_to', user.id).eq('status', 'pending'),
            supabase.from('product_reviews').select('id', { count: 'exact', head: true })
              .eq('assigned_to', user.id).eq('status', 'in_progress'),
            supabase.from('product_reviews').select('id', { count: 'exact', head: true })
              .eq('assigned_to', user.id).in('status', ['pending', 'in_progress'])
              .lte('deadline', nextWeek).gte('deadline', today),
          ]);
          next.reviewerAssigned = aRes.count || 0;
          next.reviewerInProgress = ipRes.count || 0;
          next.reviewerDueWeek = dueRes.count || 0;
        }

        if (hasCompanyRole) {
          const [pRes, apRes] = await Promise.all([
            supabase.from('company_revisions').select('id', { count: 'exact', head: true })
              .eq('revised_by', user.id).eq('verification_status', 'pending'),
            supabase.from('company_revisions').select('id', { count: 'exact', head: true })
              .eq('revised_by', user.id).eq('verification_status', 'approved'),
          ]);
          next.companyPendingRevisions = pRes.count || 0;
          next.companyApprovedRevisions = apRes.count || 0;
        }

        if (!cancelled) setCounts(next);
      } catch (e) {
        console.warn('[usePendingCounts] failed', e);
        if (!cancelled) setCounts({ ...EMPTY, loading: false });
      }
    })();

    return () => { cancelled = true; };
  }, [user, hasAdminRole, hasReviewerRole, hasCompanyRole]);

  return counts;
}
