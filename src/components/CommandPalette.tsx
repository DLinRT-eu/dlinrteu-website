import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Package,
  Building2,
  Newspaper,
  BookOpen,
  LayoutDashboard,
  GitCompare,
  FlaskConical,
  Info,
  Mail,
  Shield,
  Bell,
  UserCheck,
  RefreshCw,
  FileCheck,
  Settings,
  BadgeCheck,
} from "lucide-react";
import dataService from "@/services/DataService";
import { useAuth } from "@/contexts/AuthContext";
import { useRoles } from "@/contexts/RoleContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasAdminRole, hasReviewerRole, hasCompanyRole } = useRoles();
  const [query, setQuery] = useState("");

  const products = useMemo(() => {
    try {
      return dataService.getAllProducts();
    } catch {
      return [] as any[];
    }
  }, []);

  const companies = useMemo(() => {
    try {
      return dataService.getActiveCompanies();
    } catch {
      return [] as any[];
    }
  }, []);

  const go = (path: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search products, companies, pages…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/products")}>
            <Package className="mr-2 h-4 w-4" /> Browse products
          </CommandItem>
          <CommandItem onSelect={() => go("/companies")}>
            <Building2 className="mr-2 h-4 w-4" /> Companies
          </CommandItem>
          <CommandItem onSelect={() => go("/compare/structures")}>
            <GitCompare className="mr-2 h-4 w-4" /> Compare structures
          </CommandItem>
          <CommandItem onSelect={() => go("/initiatives")}>
            <FlaskConical className="mr-2 h-4 w-4" /> Research & initiatives
          </CommandItem>
          <CommandItem onSelect={() => go("/news")}>
            <Newspaper className="mr-2 h-4 w-4" /> News
          </CommandItem>
          <CommandItem onSelect={() => go("/changelog")}>
            <Newspaper className="mr-2 h-4 w-4" /> Changelog
          </CommandItem>
          <CommandItem onSelect={() => go("/resources-compliance")}>
            <BookOpen className="mr-2 h-4 w-4" /> Resources & compliance
          </CommandItem>
          <CommandItem onSelect={() => go("/transparency")}>
            <Info className="mr-2 h-4 w-4" /> Transparency
          </CommandItem>
          <CommandItem onSelect={() => go("/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Analytics
          </CommandItem>
          <CommandItem onSelect={() => go("/about")}>
            <Info className="mr-2 h-4 w-4" /> About
          </CommandItem>
          <CommandItem onSelect={() => go("/support")}>
            <Mail className="mr-2 h-4 w-4" /> Support & contact
          </CommandItem>
        </CommandGroup>

        {user && (
          <>
            <CommandSeparator />
            <CommandGroup heading="My account">
              <CommandItem onSelect={() => go("/dashboard-home")}>
                <LayoutDashboard className="mr-2 h-4 w-4" /> My dashboard
              </CommandItem>
              <CommandItem onSelect={() => go("/profile")}>
                <Settings className="mr-2 h-4 w-4" /> Profile
              </CommandItem>
              <CommandItem onSelect={() => go("/notifications")}>
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </CommandItem>
              <CommandItem onSelect={() => go("/my-products")}>
                <Package className="mr-2 h-4 w-4" /> My products
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {hasAdminRole && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Admin">
              <CommandItem onSelect={() => go("/admin")}>
                <LayoutDashboard className="mr-2 h-4 w-4" /> Admin overview
              </CommandItem>
              <CommandItem onSelect={() => go("/admin/registrations")}>
                <UserCheck className="mr-2 h-4 w-4" /> Registrations
              </CommandItem>
              <CommandItem onSelect={() => go("/admin/review-rounds")}>
                <RefreshCw className="mr-2 h-4 w-4" /> Review rounds
              </CommandItem>
              <CommandItem onSelect={() => go("/admin/edit-approvals")}>
                <FileCheck className="mr-2 h-4 w-4" /> Edit approvals
              </CommandItem>
              <CommandItem onSelect={() => go("/admin/certifications")}>
                <BadgeCheck className="mr-2 h-4 w-4" /> Certifications
              </CommandItem>
              <CommandItem onSelect={() => go("/admin/security")}>
                <Shield className="mr-2 h-4 w-4" /> Security dashboard
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {hasReviewerRole && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Reviewer">
              <CommandItem onSelect={() => go("/reviewer/dashboard")}>
                <FileCheck className="mr-2 h-4 w-4" /> Assigned reviews
              </CommandItem>
              <CommandItem onSelect={() => go("/reviewer/due-reviews")}>
                <Bell className="mr-2 h-4 w-4" /> Due reviews
              </CommandItem>
              <CommandItem onSelect={() => go("/reviewer/preferences")}>
                <Settings className="mr-2 h-4 w-4" /> Expertise preferences
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {hasCompanyRole && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Company">
              <CommandItem onSelect={() => go("/company/overview")}>
                <Building2 className="mr-2 h-4 w-4" /> Company overview
              </CommandItem>
              <CommandItem onSelect={() => go("/company/products")}>
                <Package className="mr-2 h-4 w-4" /> My products
              </CommandItem>
              <CommandItem onSelect={() => go("/company/certification")}>
                <BadgeCheck className="mr-2 h-4 w-4" /> Certify product
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {query.length > 0 && products.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Products">
              {products.slice(0, 8).map((p: any) => (
                <CommandItem
                  key={p.id}
                  value={`product ${p.name} ${p.company ?? ""} ${p.category ?? ""}`}
                  onSelect={() => go(`/product/${p.id}`)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  <span className="truncate">{p.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground truncate">
                    {p.company}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {query.length > 0 && companies.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Companies">
              {companies.slice(0, 6).map((c: any) => (
                <CommandItem
                  key={c.id ?? c.name}
                  value={`company ${c.name}`}
                  onSelect={() => go(`/companies?selected=${encodeURIComponent(c.name)}`)}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  <span className="truncate">{c.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen };
}
