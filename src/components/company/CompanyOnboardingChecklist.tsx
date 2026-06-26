import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, BookOpen, Building2, BadgeCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface CompanyOnboardingChecklistProps {
  hasProducts: boolean;
  hasActivity: boolean;
}

const DISMISS_KEY = 'company_onboarding_dismissed';
const GUIDE_READ_KEY = 'company_guide_read';
const OVERVIEW_VISITED_KEY = 'company_overview_visited';

export default function CompanyOnboardingChecklist({
  hasProducts,
  hasActivity,
}: CompanyOnboardingChecklistProps) {
  const [dismissed, setDismissed] = useState(false);
  const [hasReadGuide, setHasReadGuide] = useState(false);
  const [hasVisitedOverview, setHasVisitedOverview] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === 'true');
    setHasReadGuide(localStorage.getItem(GUIDE_READ_KEY) === 'true');
    setHasVisitedOverview(localStorage.getItem(OVERVIEW_VISITED_KEY) === 'true');
  }, []);

  const steps = [
    {
      id: 'guide',
      title: 'Read the Company Representative Guide',
      description: 'Understand your role, workflows, and tools available',
      completed: hasReadGuide,
      icon: BookOpen,
      link: '/company/guide',
      action: 'Read Guide',
    },
    {
      id: 'overview',
      title: 'Review your company & products',
      description: 'Check your assigned company and product portfolio',
      completed: hasVisitedOverview && hasProducts,
      icon: Building2,
      link: '/company/overview',
      action: 'Open Overview',
    },
    {
      id: 'activity',
      title: 'Certify a product or submit an update',
      description: 'Confirm product information is accurate or propose changes',
      completed: hasActivity,
      icon: BadgeCheck,
      link: '#',
      action: 'Get Started',
    },
  ];

  const completedSteps = steps.filter((s) => s.completed).length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;
  const isComplete = completedSteps === totalSteps;

  if (dismissed || isComplete) return null;

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              Getting Started as a Company Representative
            </CardTitle>
            <CardDescription className="mt-2">
              Complete these steps to get the most out of your representative account
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8 -mt-2 -mr-2"
            aria-label="Dismiss onboarding checklist"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedSteps} of {totalSteps} completed
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              step.completed
                ? 'bg-muted/50 border-muted'
                : 'bg-background border-border hover:border-primary/50'
            }`}
          >
            <div className="mt-0.5">
              {step.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <h4
                      className={`font-medium text-sm ${
                        step.completed ? 'text-muted-foreground line-through' : ''
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                </div>
                {!step.completed && step.link !== '#' && (
                  <Button asChild size="sm" variant="outline" className="flex-shrink-0">
                    <Link to={step.link}>{step.action}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
