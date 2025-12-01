import { AppRole } from '@/contexts/RoleContext';

export const getRoleDashboardRoute = (role: AppRole): string => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'reviewer':
      return '/review';
    case 'company':
      return '/company/dashboard';
    default:
      return '/dashboard';
  }
};
