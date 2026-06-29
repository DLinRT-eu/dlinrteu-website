import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Clock,
  CalendarClock,
  FileCheck,
  Building2,
  ClipboardCheck,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { usePendingCounts } from '@/hooks/usePendingCounts';

/**
 * Persistent at-a-glance status strip for authenticated users.
 * Shows: active role, approval state, MFA state, and contextual
 * pending-task chips that link straight to the work.
 */
export function AuthenticatedStatusBar() {
  const { user, profile } = useAuth();
  const { activeRole, isAdmin, isReviewer, isCompany, roles } = useRoles();
  const counts = usePendingCounts();

  const [mfaEnabled, setMfaEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase.auth.mfa.listFactors();
        const enabled = !!data?.totp?.some((f) => f.status === 'verified');
        if (!cancelled) setMfaEnabled(enabled);
      } catch {
        if (!cancelled) setMfaEnabled(null);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const approval = profile?.approval_status as string | undefined;
  const approved = approval === 'approved';

  type Chip = { key: string; label: string; icon: any; to: string; tone: 'urgent' | 'warn' | 'info' };
  const chips: Chip[] = [];

  if (isAdmin) {
    if (counts.adminRegistrations > 0) chips.push({ key: 'reg', label: `${counts.adminRegistrations} registrations`, icon: UserCheck, to: '/admin/registrations', tone: 'warn' });
    if (counts.adminPendingRevisions > 0) chips.push({ key: 'rev', label: `${counts.adminPendingRevisions} revisions`, icon: Building2, to: '/admin/companies', tone: 'info' });
    if (counts.adminActiveReviews > 0) chips.push({ key: 'ar', label: `${counts.adminActiveReviews} active reviews`, icon: FileCheck, to: '/admin/reviews', tone: 'info' });
  }
  if (isReviewer) {
    if (counts.reviewerDueWeek > 0) chips.push({ key: 'due', label: `${counts.reviewerDueWeek} due this week`, icon: CalendarClock, to: '/reviewer/due-reviews', tone: 'urgent' });
    if (counts.reviewerAssigned > 0) chips.push({ key: 'rasg', label: `${counts.reviewerAssigned} assigned`, icon: ClipboardCheck, to: '/reviewer/dashboard', tone: 'info' });
    if (counts.reviewerInProgress > 0) chips.push({ key: 'rip', label: `${counts.reviewerInProgress} in progress`, icon: Clock, to: '/reviewer/dashboard', tone: 'info' });
  }
  if (isCompany) {
    if (counts.companyPendingRevisions > 0) chips.push({ key: 'cpend', label: `${counts.companyPendingRevisions} pending revisions`, icon: FileCheck, to: '/company/dashboard', tone: 'warn' });
  }

  const toneClass = (tone: Chip['tone']) =>
    tone === 'urgent'
      ? 'bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20'
      : tone === 'warn'
        ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700'
        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80';

  // Hide entirely if there's nothing useful to show (e.g. signed-out, or brand-new user with no role/approval/tasks).
  if (!user) return null;
  const hasSignal = !!activeRole || !!approval || mfaEnabled === false || chips.length > 0 || roles.length > 0;
  if (!hasSignal) return null;


  return (
    <div className="border-b bg-muted/40 px-3 py-1.5 flex items-center gap-2 flex-wrap text-xs">
      {/* Role */}
      {activeRole && (
        <Badge variant="outline" className="capitalize gap-1">
          <ShieldCheck className="h-3 w-3" />
          {activeRole}
        </Badge>
      )}

      {/* Approval */}
      {approval && (
        approved ? (
          <Badge variant="outline" className="gap-1 border-green-300 text-green-800 dark:text-green-300">
            <UserCheck className="h-3 w-3" /> Approved
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1 border-amber-300 text-amber-800 dark:text-amber-300">
            <Clock className="h-3 w-3" /> {approval === 'pending' ? 'Approval pending' : approval}
          </Badge>
        )
      )}

      {/* MFA */}
      {mfaEnabled === false && (
        <Link to="/profile">
          <Badge variant="outline" className="gap-1 border-amber-300 text-amber-800 hover:bg-amber-100 dark:text-amber-300 cursor-pointer">
            <ShieldAlert className="h-3 w-3" /> Add MFA
          </Badge>
        </Link>
      )}
      {mfaEnabled === true && (
        <Badge variant="outline" className="gap-1 border-green-300 text-green-800 dark:text-green-300">
          <ShieldCheck className="h-3 w-3" /> MFA on
        </Badge>
      )}

      {/* Task chips */}
      {chips.length > 0 && (
        <>
          <span className="text-muted-foreground mx-1" aria-hidden>•</span>
          {chips.slice(0, 4).map((c) => (
            <Link key={c.key} to={c.to} aria-label={c.label}>
              <Badge variant="outline" className={`gap-1 ${toneClass(c.tone)}`}>
                {c.tone === 'urgent' ? <AlertCircle className="h-3 w-3" /> : <c.icon className="h-3 w-3" />}
                {c.label}
              </Badge>
            </Link>
          ))}
        </>
      )}

      <div className="ml-auto flex items-center gap-1">
        <Button asChild variant="ghost" size="sm" className="h-6 text-xs">
          <Link to="/dashboard-home">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
