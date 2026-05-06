import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
}

/**
 * Wraps authenticated pages with a collapsible role-aware sidebar.
 * The public Header remains mounted at the App level — this layout
 * adds an in-page strip with the SidebarTrigger so users can collapse
 * the sidebar without losing access.
 *
 * For unauthenticated visitors, renders children unchanged so public
 * routes that occasionally land on protected paths are not impacted.
 */
export function AuthenticatedLayout({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
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
