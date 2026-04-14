import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Mail, Pencil, X } from 'lucide-react';

interface ChangeEmailSectionProps {
  currentEmail: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ChangeEmailSection({ currentEmail }: ChangeEmailSectionProps) {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = newEmail.trim().toLowerCase();

    if (!trimmed) {
      setError('Please enter a new email address.');
      return;
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (trimmed === currentEmail.toLowerCase()) {
      setError('The new email is the same as your current email.');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        email: trimmed,
      });

      if (updateError) {
        // Handle common Supabase auth errors
        if (updateError.message.includes('rate')) {
          setError('Too many requests. Please wait a few minutes and try again.');
        } else if (updateError.message.includes('already registered') || updateError.message.includes('already been registered')) {
          setError('This email address is already in use by another account.');
        } else {
          setError(updateError.message);
        }
        return;
      }

      toast({
        title: 'Confirmation emails sent',
        description: 'Please check both your current and new email inboxes to confirm the change.',
      });

      setNewEmail('');
      setEditing(false);
    } catch (err: any) {
      console.error('Email change error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setNewEmail('');
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Mail className="h-5 w-5" />
          Login Email
        </CardTitle>
        <CardDescription>
          Change the email address used to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Current email</Label>
            <p className="font-medium mt-1">{currentEmail}</p>
          </div>

          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="gap-2">
              <Pencil className="h-4 w-4" />
              Change Email
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-email">New email address</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="your-new-email@example.com"
                  autoFocus
                  disabled={loading}
                  maxLength={255}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <AlertDescription>
                  Supabase will send a confirmation link to both your current and new email addresses. The change will only take effect after you confirm via both emails.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Confirmation'}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={handleCancel} disabled={loading} className="gap-1">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
