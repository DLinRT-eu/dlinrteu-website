import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Lock, Pencil, X, CheckCircle, XCircle } from 'lucide-react';

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function ChangePasswordSection() {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allPassed = PASSWORD_RULES.every((r) => r.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!allPassed) {
      setError('Please meet all password requirements.');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        if (updateError.message.includes('same')) {
          setError('New password must be different from your current password.');
        } else {
          setError(updateError.message);
        }
        return;
      }

      // Log security event (best-effort)
      await supabase.from('security_events').insert({
        event_type: 'password_updated',
        severity: 'info',
        details: { source: 'profile_page', timestamp: new Date().toISOString() },
      }).then(() => {});

      toast({
        title: 'Password updated',
        description: 'Your password has been changed successfully.',
      });

      setNewPassword('');
      setConfirmPassword('');
      setEditing(false);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Lock className="h-5 w-5" />
          Password
        </CardTitle>
        <CardDescription>Update your account password</CardDescription>
      </CardHeader>
      <CardContent>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="gap-2">
            <Pencil className="h-4 w-4" />
            Change Password
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Enter new password"
                autoFocus
                disabled={loading}
                maxLength={128}
              />

              {newPassword && (
                <div className="space-y-1 text-sm">
                  {PASSWORD_RULES.map((rule) => {
                    const passed = rule.test(newPassword);
                    return (
                      <div key={rule.label} className="flex items-center gap-2">
                        {passed ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-destructive" />
                        )}
                        <span className={passed ? 'text-green-500' : 'text-destructive'}>
                          {rule.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Confirm new password"
                disabled={loading}
                maxLength={128}
              />
              {confirmPassword && !passwordsMatch && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Passwords do not match
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={loading || !allPassed || !passwordsMatch}>
                {loading ? 'Updating…' : 'Update Password'}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={handleCancel} disabled={loading} className="gap-1">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
