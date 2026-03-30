import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, Bell, Mail, Monitor, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CategoryPreference {
  email: boolean;
  in_app: boolean;
}

interface NotificationPrefs {
  email: boolean;
  in_app: boolean;
  digest_frequency: 'off' | 'daily' | 'weekly';
  categories: {
    review_assignments: CategoryPreference;
    review_deadlines: CategoryPreference;
    status_updates: CategoryPreference;
    system_announcements: CategoryPreference;
    company_revisions: CategoryPreference;
    registration_updates: CategoryPreference;
  };
}

const DEFAULT_PREFS: NotificationPrefs = {
  email: true,
  in_app: true,
  digest_frequency: 'off',
  categories: {
    review_assignments: { email: true, in_app: true },
    review_deadlines: { email: true, in_app: true },
    status_updates: { email: true, in_app: true },
    system_announcements: { email: true, in_app: true },
    company_revisions: { email: true, in_app: true },
    registration_updates: { email: true, in_app: true },
  },
};

const CATEGORY_LABELS: Record<string, { label: string; description: string }> = {
  review_assignments: {
    label: 'Review Assignments',
    description: 'When you are assigned a new product review',
  },
  review_deadlines: {
    label: 'Review Deadlines',
    description: 'Reminders for upcoming or overdue review deadlines',
  },
  status_updates: {
    label: 'Status Updates',
    description: 'Changes to review status, approval decisions, role requests',
  },
  system_announcements: {
    label: 'System Announcements',
    description: 'Platform updates, maintenance notices, and news',
  },
  company_revisions: {
    label: 'Company Revisions',
    description: 'When companies submit or update product revisions',
  },
  registration_updates: {
    label: 'Registration Updates',
    description: 'Account approval status and registration-related notifications',
  },
};

export default function NotificationPreferences() {
  const { user, profile } = useAuth();
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.notification_preferences) {
      const stored = profile.notification_preferences as Record<string, unknown>;
      setPrefs({
        email: (stored.email as boolean) ?? true,
        in_app: (stored.in_app as boolean) ?? true,
        digest_frequency: (stored.digest_frequency as 'off' | 'daily' | 'weekly') ?? 'off',
        categories: {
          ...DEFAULT_PREFS.categories,
          ...((stored.categories as Record<string, CategoryPreference>) ?? {}),
        },
      });
    }
    setLoading(false);
  }, [profile]);

  const updateGlobal = (channel: 'email' | 'in_app', value: boolean) => {
    setPrefs(prev => {
      const updated = { ...prev, [channel]: value };
      // When disabling a global channel, disable all categories for that channel
      if (!value) {
        const cats = { ...updated.categories };
        for (const key of Object.keys(cats)) {
          cats[key as keyof typeof cats] = {
            ...cats[key as keyof typeof cats],
            [channel]: false,
          };
        }
        updated.categories = cats;
      }
      return updated;
    });
  };

  const updateCategory = (
    category: keyof NotificationPrefs['categories'],
    channel: 'email' | 'in_app',
    value: boolean
  ) => {
    setPrefs(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [channel]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ notification_preferences: prefs as unknown as Record<string, never> })
      .eq('id', user.id);

    if (error) {
      toast.error('Failed to save preferences');
    } else {
      toast.success('Notification preferences saved');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Global Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Global Notification Channels
          </CardTitle>
          <CardDescription>
            Control which channels you receive notifications through. Disabling a channel here turns it off for all categories.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="global-email" className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch
              id="global-email"
              checked={prefs.email}
              onCheckedChange={(v) => updateGlobal('email', v)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="global-inapp" className="font-medium">In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications in the platform</p>
              </div>
            </div>
            <Switch
              id="global-inapp"
              checked={prefs.in_app}
              onCheckedChange={(v) => updateGlobal('in_app', v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Digest Preference */}
      {prefs.email && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Email Digest
            </CardTitle>
            <CardDescription>
              Receive a periodic summary of your unread notifications by email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Label className="font-medium min-w-[100px]">Frequency</Label>
              <Select
                value={prefs.digest_frequency}
                onValueChange={(v) => setPrefs(prev => ({ ...prev, digest_frequency: v as 'off' | 'daily' | 'weekly' }))}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="off">Off</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Per-Category Toggles */}
      <Card>
        <CardHeader>
          <CardTitle>Category Preferences</CardTitle>
          <CardDescription>
            Fine-tune which types of notifications you receive and through which channel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_80px_80px] gap-4 pb-2 text-sm font-medium text-muted-foreground">
              <span>Category</span>
              <span className="text-center">Email</span>
              <span className="text-center">In-App</span>
            </div>
            <Separator />
            {Object.entries(CATEGORY_LABELS).map(([key, { label, description }]) => {
              const catKey = key as keyof NotificationPrefs['categories'];
              return (
                <div key={key}>
                  <div className="grid grid-cols-[1fr_80px_80px] gap-4 py-3 items-center">
                    <div>
                      <p className="font-medium text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={prefs.categories[catKey].email}
                        onCheckedChange={(v) => updateCategory(catKey, 'email', v)}
                        disabled={!prefs.email}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={prefs.categories[catKey].in_app}
                        onCheckedChange={(v) => updateCategory(catKey, 'in_app', v)}
                        disabled={!prefs.in_app}
                      />
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
