import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileCheck, 
  LayoutDashboard, 
  ShieldCheck, 
  Package, 
  Building2, 
  FileText,
  Settings,
  CalendarClock,
  Newspaper
} from 'lucide-react';

interface RoleQuickActionsProps {
  isAdmin: boolean;
  isReviewer: boolean;
  isCompany: boolean;
}

export function RoleQuickActions({ isAdmin, isReviewer, isCompany }: RoleQuickActionsProps) {
  // Don't show if user has no roles
  if (!isAdmin && !isReviewer && !isCompany) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Access your role-specific features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Admin Quick Actions */}
          {isAdmin && (
            <>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin/users">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin/reviews">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Review Assignments
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin/certifications">
                  <Package className="h-4 w-4 mr-2" />
                  Certification Management
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin/changelog">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Changelog Admin
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin/security">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Security Dashboard
                </Link>
              </Button>
            </>
          )}

          {/* Reviewer Quick Actions */}
          {isReviewer && !isAdmin && (
            <>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/reviewer/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  My Reviews Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/reviewer/due-reviews">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  Due Reviews
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/reviewer/preferences">
                  <Settings className="h-4 w-4 mr-2" />
                  Expertise Preferences
                </Link>
              </Button>
            </>
          )}

          {/* Company Quick Actions */}
          {isCompany && !isAdmin && (
            <>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/company/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Company Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/company/products">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Certifications
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/company/revisions">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Revision
                </Link>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
