import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Building2, Newspaper, Eye, Shield, LayoutDashboard, BookOpen, Activity, FlaskConical, Lightbulb, Calendar, LogOut, User as UserIcon, Info, Search } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import MobileNav from './MobileNav';
import DropdownNavItem from './navigation/DropdownNavItem';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { useToast } from '@/hooks/use-toast';
import NotificationBell from './notifications/NotificationBell';
import { getRoleDashboardRoute } from '@/utils/roleDashboardUtils';
import { CommandPalette, useCommandPalette } from './CommandPalette';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const { roles, activeRole, setActiveRole, isAdmin, isReviewer, isCompany } = useRoles();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

  useEffect(() => {
    const handler = () => setPaletteOpen(true);
    window.addEventListener('open-command-palette', handler);
    return () => window.removeEventListener('open-command-palette', handler);
  }, [setPaletteOpen]);
  
  const isRegularUser = !activeRole || roles.length === 0;
  const canSwitchRoles = roles.length > 1;

  const handleRoleSwitch = (role: any) => {
    setActiveRole(role);
    navigate(getRoleDashboardRoute(role));
    toast({
      title: "Role Changed",
      description: `You are now using the ${role.charAt(0).toUpperCase() + role.slice(1)} role.`,
    });
  };

  return (
    <header className="bg-[#00A6D6] text-white py-3 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <Link to="/" className="text-sm md:text-base lg:text-lg font-bold hover:text-white/90">
          Deep Learning in Radiotherapy
        </Link>
        
        <MobileNav />
        
        {/* Desktop Navigation - Role-Based */}
        <nav className="hidden lg:flex items-center space-x-2">
          {/* Role-specific links */}
          {isAdmin && (
            <>
              <Link to="/admin" className="px-3 py-2 hover:text-white/90 text-sm">Admin</Link>
              <Link to="/admin/registrations" className="px-3 py-2 hover:text-white/90 text-sm">Registrations</Link>
              <Link to="/admin/certifications" className="px-3 py-2 hover:text-white/90 text-sm">Certifications</Link>
              <Link to="/admin/companies" className="px-3 py-2 hover:text-white/90 text-sm">Companies</Link>
              <Link to="/review" className="px-3 py-2 hover:text-white/90 text-sm">Reviews</Link>
            </>
          )}
          {isReviewer && !isAdmin && (
            <>
              <Link to="/reviewer/dashboard" className="px-3 py-2 hover:text-white/90 text-sm">My Assignments</Link>
              <Link to="/reviewer/due-reviews" className="px-3 py-2 hover:text-white/90 text-sm">Due Reviews</Link>
              <Link to="/review" className="px-3 py-2 hover:text-white/90 text-sm">Reviews</Link>
            </>
          )}
          {isCompany && !isAdmin && !isReviewer && (
            <>
              <Link to="/company/dashboard" className="px-3 py-2 hover:text-white/90 text-sm">Dashboard</Link>
              <Link to="/company/products" className="px-3 py-2 hover:text-white/90 text-sm">Products</Link>
              <Link to="/company/certification" className="px-3 py-2 hover:text-white/90 text-sm">Certification</Link>
              <Link to="/company/overview" className="px-3 py-2 hover:text-white/90 text-sm">Overview</Link>
            </>
          )}
          {/* Common links for all users */}
          <Link to="/products" className="px-3 py-2 hover:text-white/90 text-sm">Products</Link>
          {isRegularUser && (
            <>
              <Link to="/companies" className="px-3 py-2 hover:text-white/90 text-sm">Companies</Link>
              <Link to="/dashboard" className="px-3 py-2 hover:text-white/90 text-sm">Dashboard</Link>
              <Link to="/news" className="px-3 py-2 hover:text-white/90 text-sm">News</Link>
              <Link to="/resources-compliance" className="px-3 py-2 hover:text-white/90 text-sm">Resources & Compliance</Link>
              <Link to="/initiatives" className="px-3 py-2 hover:text-white/90 text-sm">Research & Initiatives</Link>
            </>
          )}
          {!isRegularUser && (
            <DropdownNavItem label="More" items={[
              { to: '/companies', label: 'Companies' },
              { to: '/dashboard', label: 'Analytics' },
              { to: '/news', label: 'News' },
              { to: '/resources-compliance', label: 'Resources & Compliance' },
              { to: '/initiatives', label: 'Research & Initiatives' },
              { to: '/about', label: 'About' },
              { to: '/support', label: 'Support & Contact' },
            ]} />
          )}
          {isRegularUser && (
            <>
              <Link to="/about" className="px-3 py-2 hover:text-white/90 text-sm">About</Link>
              <Link to="/support" className="px-3 py-2 hover:text-white/90 text-sm">Support & Contact</Link>
            </>
          )}
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPaletteOpen(true)}
            className="h-8 gap-1.5 text-xs"
            aria-label="Open search (Ctrl/Cmd + K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded">⌘K</kbd>
          </Button>
          {user && canSwitchRoles && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="h-8 gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">
                    {activeRole ? activeRole.charAt(0).toUpperCase() + activeRole.slice(1) : 'Select role'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">SWITCH ROLE</div>
                {roles.map(role => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={activeRole === role ? 'bg-accent font-medium' : ''}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                    {activeRole === role && ' ✓'}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {user && <NotificationBell />}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-white/20">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{profile?.first_name} {profile?.last_name}</p>
                  <p className="text-xs text-muted-foreground">{profile?.email}</p>
                  {activeRole && (
                    <Badge variant="outline" className="mt-2">
                      {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
                    </Badge>
                  )}
                  {!activeRole && roles.length === 0 && (
                    <Badge variant="outline" className="mt-2">
                      No Role
                    </Badge>
                  )}
                </div>
                
                {canSwitchRoles && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">SWITCH ROLE</p>
                      {roles.map(role => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => handleRoleSwitch(role)}
                          className={activeRole === role ? 'bg-accent font-medium' : ''}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                          {activeRole === role && ' ✓'}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/my-products">My Products</Link></DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notifications" className="flex items-center justify-between w-full">
                    Notification History
                    {profile && (
                      <Badge variant="secondary" className="ml-2">New</Badge>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                  await signOut();
                  navigate('/');
                  toast({
                    title: "Signed out",
                    description: "You have been signed out successfully.",
                  });
                }}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="secondary" size="sm"><Link to="/auth">Sign In</Link></Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
