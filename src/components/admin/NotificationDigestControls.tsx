import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Send, Loader2, Clock, UserPlus, CheckCircle2, XCircle, AlertTriangle, SkipForward } from 'lucide-react';
import { toast } from 'sonner';

interface DigestSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly';
}

interface RoleDigestState {
  last_sent_at?: string;
  pending_count?: number;
  emails_sent?: number;
  recipient_count?: number;
  skipped?: boolean;
  reason?: string;
  status?: 'success' | 'failure' | 'partial';
  error_message?: string | null;
  send_errors?: Array<{ email: string; error: string }> | null;
}

export default function NotificationDigestControls() {
  const [settings, setSettings] = useState<DigestSettings>({ enabled: false, frequency: 'daily' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [roleDigest, setRoleDigest] = useState<RoleDigestState | null>(null);
  const [sendingRoleDigest, setSendingRoleDigest] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchRoleDigestState();
  }, []);

  const fetchRoleDigestState = async () => {
    const { data } = await supabase
      .from('reminder_settings')
      .select('setting_value')
      .eq('setting_key', 'role_request_digest_last_sent')
      .maybeSingle();
    if (data?.setting_value) setRoleDigest(data.setting_value as any);
  };

  const handleSendRoleDigest = async () => {
    setSendingRoleDigest(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-role-request-digest', { body: {} });
      if (error) throw error;
      if (data?.skipped) {
        toast.info(data?.reason === 'no pending requests' ? 'No pending role requests — nothing to send.' : `Skipped: ${data?.reason ?? 'no recipients'}`);
      } else {
        toast.success(`Role-request digest sent: ${data?.emailsSent ?? 0} email${data?.emailsSent === 1 ? '' : 's'} delivered for ${data?.pendingCount ?? 0} pending request${data?.pendingCount === 1 ? '' : 's'}.`);
      }
      await fetchRoleDigestState();
    } catch (e: any) {
      console.error('Role-request digest error:', e);
      toast.error(e?.message ?? 'Failed to send role-request digest');
    } finally {
      setSendingRoleDigest(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('reminder_settings')
        .select('setting_value')
        .eq('setting_key', 'notification_digest')
        .maybeSingle();

      if (data?.setting_value) {
        const val = data.setting_value as any;
        setSettings({
          enabled: val.enabled ?? false,
          frequency: val.frequency ?? 'daily',
        });
      }
    } catch (error) {
      console.error('Error fetching digest settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from('reminder_settings')
        .select('id')
        .eq('setting_key', 'notification_digest')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('reminder_settings')
          .update({ setting_value: settings as any, updated_at: new Date().toISOString() })
          .eq('setting_key', 'notification_digest');
      } else {
        await supabase
          .from('reminder_settings')
          .insert({ setting_key: 'notification_digest', setting_value: settings as any });
      }

      toast.success('Digest settings saved');
    } catch (error) {
      console.error('Error saving digest settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSendNow = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-notification-digest', {
        body: { frequency: settings.frequency },
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(`Digest sent: ${data.emailsSent || 0} emails delivered`);
      } else {
        toast.info(data?.message || 'No emails to send');
      }
    } catch (error) {
      console.error('Error sending digest:', error);
      toast.error('Failed to send digest');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Email Digest
        </CardTitle>
        <CardDescription>
          Send periodic email summaries of unread notifications to users who opt in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="digest-enabled" className="font-medium">Enable digest emails</Label>
          <Switch
            id="digest-enabled"
            checked={settings.enabled}
            onCheckedChange={(v) => setSettings(prev => ({ ...prev, enabled: v }))}
          />
        </div>

        <div className="flex items-center gap-3">
          <Label className="font-medium min-w-[100px]">Frequency</Label>
          <Select
            value={settings.frequency}
            onValueChange={(v) => setSettings(prev => ({ ...prev, frequency: v as 'daily' | 'weekly' }))}
            disabled={!settings.enabled}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} disabled={saving} variant="outline" size="sm">
            {saving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Clock className="h-4 w-4 mr-1" />}
            Save Settings
          </Button>
          <Button onClick={handleSendNow} disabled={sending || !settings.enabled} size="sm">
            {sending ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Send className="h-4 w-4 mr-1" />}
            Send Digest Now
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Only users who have enabled email digest in their notification preferences will receive the summary.
          Schedule via pg_cron for automatic delivery.
        </p>

        <div className="border-t pt-4 mt-2 space-y-3">
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-sm">Pending role-request digest</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Sent automatically each morning (08:00 UTC) to all admins who have not opted out of registration updates,
            but only on days where at least one role request is still pending.
          </p>
          {roleDigest?.last_sent_at && (
            <p className="text-xs text-muted-foreground">
              Last run: {new Date(roleDigest.last_sent_at).toLocaleString()}
              {' · '}
              {roleDigest.skipped
                ? 'no pending requests (skipped)'
                : `${roleDigest.emails_sent ?? 0} email${roleDigest.emails_sent === 1 ? '' : 's'} for ${roleDigest.pending_count ?? 0} pending`}
            </p>
          )}
          <Button onClick={handleSendRoleDigest} disabled={sendingRoleDigest} size="sm" variant="outline">
            {sendingRoleDigest ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Send className="h-4 w-4 mr-1" />}
            Send role-request digest now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
