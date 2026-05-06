import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Menu, X, Beaker, Info, BookOpen, Shield, User as UserIcon, LogOut, Eye, FileCheck, Settings, CalendarClock, BadgeCheck, ClipboardCheck, Mail, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { getRoleDashboardRoute } from '@/utils/roleDashboardUtils';
import { useToast } from '@/hooks/use-toast';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { roles, activeRole, setActiveRole, isAdmin, isReviewer, isCompany } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const canSwitchRoles = roles.length > 1;
  const isRegularUser = !activeRole || roles.length === 0;
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleRoleSwitch = (role: any) => {
    setActiveRole(role);
    navigate(getRoleDashboardRoute(role));
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  const linkClass = "flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum";
  const sectionLabel = "px-6 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 h-12 w-12 touch-target-minimum lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[280px] max-w-[85vw] p-0 bg-white border-l border-gray-200 z-[100]"
      >
        <SheetHeader className="p-6 pb-4 border-b border-gray-100">
          <SheetTitle className="text-left text-lg font-semibold text-gray-900">
            Navigation
          </SheetTitle>
        </SheetHeader>
        
        {/* User Info Section */}
        {user && profile && (
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-white">
                  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
              </div>
            </div>
            
            {activeRole && (
              <Badge variant="outline" className="mb-2">
                <Shield className="h-3 w-3 mr-1" />
                {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
              </Badge>
            )}
            
            {canSwitchRoles && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 mb-1">SWITCH ROLE</p>
                <div className="flex flex-wrap gap-2">
                  {roles.map(role => (
                    <Button
                      key={role}
                      variant={activeRole === role ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRoleSwitch(role)}
                      className="text-xs h-7"
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                      {activeRole === role && ' ✓'}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <nav className="flex flex-col py-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          <button
            onClick={() => { setIsOpen(false); window.dispatchEvent(new Event('open-command-palette')); }}
            className={`${linkClass} w-full text-left`}
          >
            <Search className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Search…</span>
            <kbd className="ml-auto text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
          {/* Role-specific links */}
          {isAdmin && (
            <>
              <p className={sectionLabel}>Admin</p>
              <Link to="/admin" onClick={handleLinkClick} className={linkClass}>
                <LayoutDashboard className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Admin Overview</span>
              </Link>
              <Link to="/admin/registrations" onClick={handleLinkClick} className={linkClass}>
                <Users className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Registrations</span>
              </Link>
              <Link to="/admin/certifications" onClick={handleLinkClick} className={linkClass}>
                <BadgeCheck className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Certifications</span>
              </Link>
              <Link to="/admin/companies" onClick={handleLinkClick} className={linkClass}>
                <Building2 className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Companies</span>
              </Link>
              <Link to="/review" onClick={handleLinkClick} className={linkClass}>
                <Eye className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Reviews</span>
              </Link>
              <Link to="/admin/users" onClick={handleLinkClick} className={linkClass}>
                <Users className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">User Management</span>
              </Link>
              <Link to="/admin/newsletter" onClick={handleLinkClick} className={linkClass}>
                <Newspaper className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Newsletter</span>
              </Link>
            </>
          )}

          {isReviewer && !isAdmin && (
            <>
              <p className={sectionLabel}>Reviewer</p>
              <Link to="/review" onClick={handleLinkClick} className={linkClass}>
                <Eye className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Reviews</span>
              </Link>
              <Link to="/reviewer/dashboard" onClick={handleLinkClick} className={linkClass}>
                <ClipboardCheck className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">My Assignments</span>
              </Link>
              <Link to="/reviewer/due-reviews" onClick={handleLinkClick} className={linkClass}>
                <CalendarClock className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Due Reviews</span>
              </Link>
              <Link to="/reviewer/preferences" onClick={handleLinkClick} className={linkClass}>
                <Settings className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Preferences</span>
              </Link>
            </>
          )}

          {isCompany && !isAdmin && !isReviewer && (
            <>
              <p className={sectionLabel}>Company</p>
              <Link to="/company/dashboard" onClick={handleLinkClick} className={linkClass}>
                <LayoutDashboard className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link to="/company/overview" onClick={handleLinkClick} className={linkClass}>
                <Building2 className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Overview</span>
              </Link>
              <Link to="/company/products" onClick={handleLinkClick} className={linkClass}>
                <Package className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">My Products</span>
              </Link>
              <Link to="/company/certification" onClick={handleLinkClick} className={linkClass}>
                <BadgeCheck className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Certification</span>
              </Link>
            </>
          )}

          {/* General links — always visible */}
          {!isRegularUser && <Separator className="my-2" />}
          <p className={sectionLabel}>Browse</p>
          
          <Link to="/products" onClick={handleLinkClick} className={linkClass}>
            <Package className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Products</span>
          </Link>
          <Link to="/companies" onClick={handleLinkClick} className={linkClass}>
            <Building2 className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Companies</span>
          </Link>
          <Link to="/dashboard" onClick={handleLinkClick} className={linkClass}>
            <LayoutDashboard className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/news" onClick={handleLinkClick} className={linkClass}>
            <Newspaper className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">News</span>
          </Link>
          <Link to="/resources-compliance" onClick={handleLinkClick} className={linkClass}>
            <BookOpen className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Resources & Compliance</span>
          </Link>
          <Link to="/initiatives" onClick={handleLinkClick} className={linkClass}>
            <Beaker className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Research & Initiatives</span>
          </Link>
          <Link to="/about" onClick={handleLinkClick} className={linkClass}>
            <Info className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">About</span>
          </Link>
          <Link to="/support" onClick={handleLinkClick} className={linkClass}>
            <LifeBuoy className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Support & Contact</span>
          </Link>
          
          {/* User Actions */}
          {user && (
            <>
              <Separator className="my-2" />
              <Link to="/profile" onClick={handleLinkClick} className={linkClass}>
                <UserIcon className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Profile</span>
              </Link>
              <button onClick={handleSignOut}
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors w-full text-left touch-target-minimum">
                <LogOut className="w-5 h-5 mr-3" />
                <span className="font-medium">Sign Out</span>
              </button>
            </>
          )}
          
          {!user && (
            <>
              <Separator className="my-2" />
              <Link to="/auth" onClick={handleLinkClick} className={linkClass}>
                <UserIcon className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Sign In</span>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
