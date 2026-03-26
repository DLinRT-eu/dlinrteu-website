import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Loader2, Settings, Clock, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ReminderSettings {
  enabled: boolean;
  threshold_days: number;
  min_interval_hours: number;
}

interface ReminderResult {
  success: boolean;
  message: string;
  sent?: number;
  reviewsProcessed?: number;
  reviewersNotified?: number;
  emailsSent?: number;
  emailsFailed?: number;
  settings?: {
    threshold_days: number;
    min_interval_hours: number;
  };
}

export default function DeadlineReminderControls() {
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: true,
    threshold_days: 3,
    min_interval_hours: 24,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState<ReminderResult | null>(null);
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    fetchSettings();
    fetchPendingCount();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('reminder_settings')
        .select('setting_value')
        .eq('setting_key', 'deadline_reminders')
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data?.setting_value) {
        const settingValue = data.setting_value as unknown as ReminderSettings;
        setSettings({
          enabled: settingValue.enabled ?? true,
          threshold_days: settingValue.threshold_days ?? 3,
          min_interval_hours: settingValue.min_interval_hours ?? 24,
        });
      }
    } catch (error) {
      console.error('Error fetching reminder settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCount = async () => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('id', { count: 'exact', head: true })
        .in('status', ['pending', 'in_progress'])
        .not('deadline', 'is', null)
        .not('assigned_to', 'is', null);

      if (!error && data !== null) {
        setPendingCount(data.length || 0);
      }
    } catch (error) {
      console.error('Error fetching pending count:', error);
    }
  };

  const updateSetting = async (key: keyof ReminderSettings, value: boolean | number) => {
    setSaving(true);
    try {
      const params: Record<string, boolean | number | null> = {
        p_enabled: null,
        p_threshold_days: null,
        p_min_interval_hours: null,
      };

      if (key === 'enabled') {
        params.p_enabled = value as boolean;
      } else if (key === 'threshold_days') {
        params.p_threshold_days = value as number;
      } else if (key === 'min_interval_hours') {
        params.p_min_interval_hours = value as number;
      }

      const { data, error } = await supabase.rpc('update_reminder_settings', params);

      if (error) throw error;

      const newSettings = data as unknown as ReminderSettings;
      setSettings({
        enabled: newSettings.enabled ?? settings.enabled,
        threshold_days: newSettings.threshold_days ?? settings.threshold_days,
        min_interval_hours: newSettings.min_interval_hours ?? settings.min_interval_hours,
      });

      toast.success('Settings updated');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const triggerReminders = async (force = false) => {
    setSending(true);
    setLastResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('send-deadline-reminders', {
        body: {
          force,
          threshold_days: settings.threshold_days,
          min_interval_hours: settings.min_interval_hours,
        },
      });

      if (error) throw error;

      const result = data as ReminderResult;
      setLastResult(result);

      if (result.emailsSent && result.emailsSent > 0) {
        toast.success(`Sent ${result.emailsSent} reminder email${result.emailsSent > 1 ? 's' : ''}`);
      } else if (result.message === 'No reminders needed') {
        toast.info('No reminders needed at this time');
      } else if (result.message === 'Reminders are disabled') {
        toast.warning('Reminders are currently disabled');
      } else {
        toast.success(result.message);
      }

      // Refresh pending count after sending
      fetchPendingCount();
    } catch (error) {
      console.error('Error triggering reminders:', error);
      toast.error('Failed to send reminders');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Deadline Reminder Controls
            </CardTitle>
            <CardDescription>
              Configure and manually trigger review deadline reminders
            </CardDescription>
          </div>
          <Badge variant={settings.enabled ? 'default' : 'secondary'}>
            {settings.enabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Settings Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </h3>

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="enabled" className="font-medium">
                Automatic Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Send daily reminders to reviewers with upcoming deadlines
              </p>
            </div>
            <Switch
              id="enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => updateSetting('enabled', checked)}
              disabled={saving}
            />
          </div>

          {/* Threshold Days */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="font-medium">Reminder Threshold</Label>
              <p className="text-sm text-muted-foreground">
                Send reminders when deadline is within this many days
              </p>
            </div>
            <Select
              value={settings.threshold_days.toString()}
              onValueChange={(value) => updateSetting('threshold_days', parseInt(value))}
              disabled={saving}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="2">2 days</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="5">5 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minimum Interval */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="font-medium">Minimum Interval</Label>
              <p className="text-sm text-muted-foreground">
                Minimum time between reminders for the same review
              </p>
            </div>
            <Select
              value={settings.min_interval_hours.toString()}
              onValueChange={(value) => updateSetting('min_interval_hours', parseInt(value))}
              disabled={saving}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
                <SelectItem value="48">48 hours</SelectItem>
                <SelectItem value="72">72 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Manual Trigger Section */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Manual Trigger
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => triggerReminders(false)}
              disabled={sending || !settings.enabled}
              className="flex-1"
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Pending Reminders
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => triggerReminders(true)}
              disabled={sending}
              className="flex-1"
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Force Send All
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            "Send Pending" respects the interval setting. "Force Send All" ignores previous reminders and resends to all eligible reviewers.
          </p>
        </div>

        {/* Last Result */}
        {lastResult && (
          <div className="pt-4 border-t">
            <h3 className="text-sm font-semibold mb-3">Last Result</h3>
            <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Status:</span>{' '}
                <Badge variant={lastResult.success ? 'default' : 'destructive'}>
                  {lastResult.success ? 'Success' : 'Failed'}
                </Badge>
              </p>
              <p>
                <span className="text-muted-foreground">Message:</span> {lastResult.message}
              </p>
              {lastResult.reviewsProcessed !== undefined && (
                <p>
                  <span className="text-muted-foreground">Reviews processed:</span>{' '}
                  {lastResult.reviewsProcessed}
                </p>
              )}
              {lastResult.emailsSent !== undefined && (
                <p>
                  <span className="text-muted-foreground">Emails sent:</span>{' '}
                  {lastResult.emailsSent}
                  {lastResult.emailsFailed ? ` (${lastResult.emailsFailed} failed)` : ''}
                </p>
              )}
              {lastResult.reviewersNotified !== undefined && (
                <p>
                  <span className="text-muted-foreground">Reviewers notified:</span>{' '}
                  {lastResult.reviewersNotified}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
