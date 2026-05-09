import { useEffect, useState } from 'react';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';

type AppRole = 'admin' | 'reviewer' | 'company';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
  requireAuth?: boolean;
  requireActiveRole?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  requireAuth = true,
  requireActiveRole = false
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { roles, activeRole, requiresRoleSelection, loading: rolesLoading } = useRoles();
  const location = useLocation();
  const navigate = useNavigate();

  // AAL2 enforcement: if the user has MFA enrolled but has only an AAL1
  // session, force them through the MFA verification screen at /auth.
  // 'pending' means we're still checking; 'ok' means access granted; 'mfa' means redirect.
  const [aalState, setAalState] = useState<'pending' | 'ok' | 'mfa'>('pending');

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setAalState('ok');
      return;
    }
    (async () => {
      try {
        const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (cancelled) return;
        if (data?.currentLevel === 'aal1' && data?.nextLevel === 'aal2') {
          setAalState('mfa');
        } else {
          setAalState('ok');
        }
      } catch {
        if (!cancelled) setAalState('ok');
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  if (loading || rolesLoading || (requireAuth && user && aalState === 'pending')) {
    return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>;
  }

  if (!requireAuth) return <>{children}</>;
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  if (aalState === 'mfa' && location.pathname !== '/auth') {
    return <Navigate to="/auth?mfa=required" state={{ from: location }} replace />;
  }
  if (requiresRoleSelection && location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Check if user has any of the allowed roles (not just active role)
    const hasRequiredRole = roles.some(role => allowedRoles.includes(role as AppRole));
    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">
              This page requires one of the following roles: <strong>{allowedRoles.join(', ')}</strong>
            </p>
            {roles.length > 0 ? (
              <p className="text-sm text-muted-foreground">
                Your current roles: {roles.join(', ')}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                You don't have any special roles assigned yet.
              </p>
            )}
            <div className="flex gap-2 justify-center mt-6">
              <Button asChild variant="outline">
                <Link to="/profile">View Profile</Link>
              </Button>
              <Button asChild>
                <Link to="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (requireActiveRole && activeRole && !allowedRoles.includes(activeRole as AppRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Wrong Active Role</h2>
            <p className="mb-4">Switch to: {allowedRoles.join(' or ')}</p>
            <Button onClick={() => navigate('/role-selection')}>Switch Role</Button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
