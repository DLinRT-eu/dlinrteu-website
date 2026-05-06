import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRoles } from "@/contexts/RoleContext";

interface Props {
  children: ReactNode;
}

const AUTH_PREFIXES = [
  "/dashboard-home",
  "/profile",
  "/my-products",
  "/notifications",
  "/notification-settings",
  "/admin",
  "/reviewer",
  "/company",
  "/review",
];

function isAuthenticatedPath(pathname: string) {
  // /review/:id is a public-ish review page, but /review root and /reviewer/* are authenticated
  if (pathname === "/review" || pathname.startsWith("/review/")) return true;
  return AUTH_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

/**
 * Wraps authenticated pages with a collapsible role-aware sidebar.
 * Public pages render unchanged.
 */
export function AuthenticatedLayout({ children }: Props) {
  const { user } = useAuth();
  const { roles } = useRoles();
  const { pathname } = useLocation();

  const shouldWrap = user && roles.length > 0 && isAuthenticatedPath(pathname);

  if (!shouldWrap) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-[calc(100vh-3.5rem)]">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-10 flex items-center border-b bg-background/60 backdrop-blur-sm px-2 sticky top-14 z-30">
            <SidebarTrigger />
            <span className="ml-2 text-xs text-muted-foreground">Workspace</span>
          </div>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
