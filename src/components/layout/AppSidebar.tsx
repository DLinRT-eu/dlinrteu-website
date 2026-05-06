import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  ShieldCheck,
  Package,
  Building2,
  FileText,
  Settings,
  CalendarClock,
  Newspaper,
  BookOpen,
  UserCheck,
  RefreshCw,
  Mail,
  ClipboardCheck,
  Eye,
  BadgeCheck,
  Bell,
  User as UserIcon,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRoles } from "@/contexts/RoleContext";

type Item = { title: string; url: string; icon: any };

const personalItems: Item[] = [
  { title: "Dashboard", url: "/dashboard-home", icon: Home },
  { title: "Profile", url: "/profile", icon: UserIcon },
  { title: "My Products", url: "/my-products", icon: Package },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

const adminItems: Item[] = [
  { title: "Admin Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Registrations", url: "/admin/registrations", icon: UserCheck },
  { title: "Review Rounds", url: "/admin/review-rounds", icon: RefreshCw },
  { title: "Review Assignments", url: "/admin/reviews", icon: FileCheck },
  { title: "Edit Approvals", url: "/admin/edit-approvals", icon: ClipboardCheck },
  { title: "Companies", url: "/admin/companies", icon: Building2 },
  { title: "Certifications", url: "/admin/certifications", icon: BadgeCheck },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Newsletter", url: "/admin/newsletter", icon: Mail },
  { title: "Security", url: "/admin/security", icon: ShieldCheck },
  { title: "Changelog", url: "/admin/changelog", icon: Newspaper },
  { title: "Admin Guide", url: "/admin/guide", icon: BookOpen },
];

const reviewerItems: Item[] = [
  { title: "Review Dashboard", url: "/review", icon: Eye },
  { title: "Assigned Reviews", url: "/reviewer/dashboard", icon: ClipboardCheck },
  { title: "Due Reviews", url: "/reviewer/due-reviews", icon: CalendarClock },
  { title: "Expertise Preferences", url: "/reviewer/preferences", icon: Settings },
  { title: "Reviewer Guide", url: "/reviewer/guide", icon: BookOpen },
];

const companyItems: Item[] = [
  { title: "Company Overview", url: "/company/overview", icon: Building2 },
  { title: "Submit Revision", url: "/company/dashboard", icon: FileText },
  { title: "My Products", url: "/company/products", icon: Package },
  { title: "Certify Product", url: "/company/certification", icon: BadgeCheck },
  { title: "Company Guide", url: "/company/guide", icon: BookOpen },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { hasAdminRole, hasReviewerRole, hasCompanyRole, activeRole } = useRoles();

  const isActive = (url: string) =>
    url === "/admin" || url === "/review"
      ? pathname === url
      : pathname === url || pathname.startsWith(url + "/");

  const renderGroup = (label: string, items: Item[]) => {
    const expanded = items.some((i) => isActive(i.url));
    return (
      <SidebarGroup defaultOpen={expanded}>
        {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                  <NavLink to={item.url} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  // Show the active role's group first, then others
  const groups: Array<{ label: string; items: Item[]; show: boolean }> = [
    { label: "Personal", items: personalItems, show: true },
    { label: "Admin", items: adminItems, show: hasAdminRole },
    { label: "Reviewer", items: reviewerItems, show: hasReviewerRole },
    { label: "Company", items: companyItems, show: hasCompanyRole },
  ];

  // Reorder: active role group right after personal
  const ordered = [
    groups[0],
    ...groups.slice(1).sort((a, b) => {
      const aActive = a.label.toLowerCase() === activeRole;
      const bActive = b.label.toLowerCase() === activeRole;
      return aActive === bActive ? 0 : aActive ? -1 : 1;
    }),
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {ordered.filter((g) => g.show).map((g) => (
          <div key={g.label}>{renderGroup(g.label, g.items)}</div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
