import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, X, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const DISMISS_KEY = 'dlinrt.onboarding.regular.dismissed.v1';
const VISITED_NOTIF_KEY = 'dlinrt.onboarding.regular.visited.notifications.v1';
const VISITED_NEWSLETTER_KEY = 'dlinrt.onboarding.regular.visited.newsletter.v1';
const VISITED_PRODUCTS_KEY = 'dlinrt.onboarding.regular.visited.products.v1';

interface Step {
  key: string;
  title: string;
  description: string;
  to: string;
  done: boolean;
  visitedKey?: string;
}

/**
 * Welcome checklist shown on /dashboard-home for signed-in users with no role.
 * Dismissible and persisted in localStorage.
 */
export function RegularUserOnboardingChecklist() {
  const { profile } = useAuth();
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(DISMISS_KEY) === '1';
  });
  // Tick to re-read localStorage flags after click-throughs.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const onFocus = () => setTick((t) => t + 1);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const steps: Step[] = useMemo(() => {
    const visited = (k: string) =>
      typeof window !== 'undefined' && window.localStorage.getItem(k) === '1';
    return [
      {
        key: 'profile',
        title: 'Complete your profile',
        description: 'Add your name and affiliation so reviewers can recognise you.',
        to: '/profile',
        done: !!(profile?.first_name && profile?.last_name),
      },
      {
        key: 'role',
        title: 'Request a role (optional)',
        description: 'Become a Reviewer or a Company Representative to contribute.',
        to: '/role-selection',
        done: visited('dlinrt.onboarding.regular.visited.role.v1'),
        visitedKey: 'dlinrt.onboarding.regular.visited.role.v1',
      },
      {
        key: 'notifications',
        title: 'Set notification preferences',
        description: 'Choose which emails you want to receive from DLinRT.',
        to: '/notification-settings',
        done: visited(VISITED_NOTIF_KEY),
        visitedKey: VISITED_NOTIF_KEY,
      },
      {
        key: 'newsletter',
        title: 'Opt in to the newsletter',
        description: 'Quarterly updates on new products, evidence reviews and standards.',
        to: '/profile#newsletter',
        done: visited(VISITED_NEWSLETTER_KEY),
        visitedKey: VISITED_NEWSLETTER_KEY,
      },
      {
        key: 'explore',
        title: 'Explore the catalogue',
        description: 'Browse AI products by clinical task, vendor or evidence level.',
        to: '/products',
        done: visited(VISITED_PRODUCTS_KEY),
        visitedKey: VISITED_PRODUCTS_KEY,
      },
    ];
    // tick triggers recompute
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.first_name, profile?.last_name, tick]);

  const completed = steps.filter((s) => s.done).length;
  const allDone = completed === steps.length;

  if (dismissed || allDone) return null;

  const markVisited = (k?: string) => {
    if (!k || typeof window === 'undefined') return;
    window.localStorage.setItem(k, '1');
  };

  return (
    <Card className="mb-6 border-[#5090D0]/30 bg-[#5090D0]/5">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Get started with DLinRT</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {completed} of {steps.length} done — a few quick steps to set up your account.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Dismiss onboarding checklist"
          onClick={() => {
            window.localStorage.setItem(DISMISS_KEY, '1');
            setDismissed(true);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="divide-y divide-border">
          {steps.map((step) => (
            <li key={step.key} className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-start gap-3 min-w-0">
                {step.done ? (
                  <CheckCircle2 className="h-5 w-5 text-[#5090D0] mt-0.5 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${step.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {!step.done && (
                <Button asChild size="sm" variant="outline" className="shrink-0">
                  <Link
                    to={step.to}
                    onClick={() => markVisited(step.visitedKey)}
                  >
                    Open
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default RegularUserOnboardingChecklist;
