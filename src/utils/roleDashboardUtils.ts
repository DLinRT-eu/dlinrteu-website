import { AppRole } from '@/contexts/RoleContext';

export const getRoleDashboardRoute = (role: AppRole): string => {
  // All roles now land on the unified dashboard-home page
  return '/dashboard-home';
};
