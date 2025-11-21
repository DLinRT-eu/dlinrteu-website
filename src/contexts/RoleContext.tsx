import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { useAuth } from './AuthContext';

export type AppRole = Database['public']['Enums']['app_role'];

interface RoleContextType {
  roles: AppRole[];
  activeRole: AppRole | null;
  highestRole: AppRole | null;
  isAdmin: boolean;  // True if admin is ACTIVE role
  isReviewer: boolean;  // True if reviewer is ACTIVE role
  isCompany: boolean;  // True if company is ACTIVE role
  hasAdminRole: boolean;  // True if user HAS admin role (regardless of active)
  hasReviewerRole: boolean;  // True if user HAS reviewer role
  hasCompanyRole: boolean;  // True if user HAS company role
  requiresRoleSelection: boolean;
  loading: boolean;
  setActiveRole: (role: AppRole) => void;
  refetch: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [activeRole, setActiveRoleState] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRoles = useCallback(async () => {
    if (!userId) {
      setRoles([]);
      setActiveRoleState(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let userRoles: AppRole[] = [];

      // 1) Try new get_all_user_roles function (returns array of all roles)
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_all_user_roles', {
        _user_id: userId
      });
      
      if (!rpcError && rpcData && Array.isArray(rpcData)) {
        userRoles = rpcData;
      } else {
        console.warn('[Roles] get_all_user_roles failed, falling back to direct select', rpcError);
        // 2) Fallback to direct select with RLS
        const { data: rows, error: selectError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);
        if (!selectError && rows) {
          userRoles = rows.map((r) => r.role);
        } else {
          console.warn('[Roles] Direct select failed, trying get_highest_role as last resort', selectError);
          // 3) Last resort: get single highest role via old RPC
          const { data: highest, error: highestError } = await supabase.rpc('get_highest_role', {
            _user_id: userId,
          });
          if (!highestError && highest) {
            userRoles = [highest];
          } else {
            console.error('[Roles] All role fetching methods failed:', highestError);
            throw highestError || selectError || rpcError;
          }
        }
      }

      setRoles(userRoles);

      // Set active role from localStorage or use highest role
      const storedRole = localStorage.getItem('activeRole') as AppRole | null;
      if (storedRole && userRoles.includes(storedRole)) {
        setActiveRoleState(storedRole);
      } else {
        if (storedRole) localStorage.removeItem('activeRole');
        if (userRoles.length > 0) {
          const highestRole = getHighestRole(userRoles);
          if (highestRole) {
            setActiveRoleState(highestRole);
            localStorage.setItem('activeRole', highestRole);
          } else {
            setActiveRoleState(null);
          }
        } else {
          setActiveRoleState(null);
        }
      }
    } catch (error) {
      console.error('[Roles] Error fetching roles:', error);
      setRoles([]);
      setActiveRoleState(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const getHighestRole = (roleList: AppRole[]): AppRole | null => {
    if (roleList.includes('admin')) return 'admin';
    if (roleList.includes('reviewer')) return 'reviewer';
    if (roleList.includes('company')) return 'company';
    return null;
  };

  const setActiveRole = useCallback((role: AppRole) => {
    if (roles.includes(role)) {
      setActiveRoleState(role);
      localStorage.setItem('activeRole', role);
    }
  }, [roles]);

  const highestRole = useMemo(() => getHighestRole(roles), [roles]);
  
  // Check if user HAS these roles (for general permissions)
  const hasAdminRole = roles.includes('admin');
  const hasReviewerRole = roles.includes('reviewer');
  const hasCompanyRole = roles.includes('company');
  
  // Check if these are the ACTIVE role (for UI display)
  const isAdmin = activeRole === 'admin';
  const isReviewer = activeRole === 'reviewer';
  const isCompany = activeRole === 'company';
  
  const requiresRoleSelection = roles.length > 1 && !activeRole;

  const value = useMemo(() => ({
    roles,
    activeRole,
    highestRole,
    isAdmin,
    isReviewer,
    isCompany,
    hasAdminRole,
    hasReviewerRole,
    hasCompanyRole,
    requiresRoleSelection,
    loading,
    setActiveRole,
    refetch: fetchRoles,
  }), [roles, activeRole, highestRole, isAdmin, isReviewer, isCompany, hasAdminRole, hasReviewerRole, hasCompanyRole, requiresRoleSelection, loading, fetchRoles, setActiveRole]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRoles() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within a RoleProvider');
  }
  return context;
}
