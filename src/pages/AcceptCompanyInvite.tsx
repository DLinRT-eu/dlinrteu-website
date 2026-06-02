import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { toast } from 'sonner';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface InvitationInfo {
  email: string;
  company_id: string;
  company_name: string;
  first_name: string | null;
  last_name: string | null;
  rep_position: string | null;
  message: string | null;
  status: string;
  expires_at: string;
}

export default function AcceptCompanyInvite() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') ?? '';

  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState<InvitationInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setErrorMsg('Missing invitation token.');
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.rpc('get_company_invitation_by_token', {
          _token: token,
        });
        if (error) throw error;
        const row = Array.isArray(data) ? data[0] : data;
        if (!row) {
          setErrorMsg('This invitation link is invalid.');
        } else if (row.status !== 'pending') {
          setErrorMsg('This invitation is no longer active.');
        } else if (new Date(row.expires_at).getTime() < Date.now()) {
          setErrorMsg('This invitation has expired.');
        } else {
          setInvitation(row as InvitationInfo);
          setFirstName(row.first_name ?? '');
          setLastName(row.last_name ?? '');
        }
      } catch (err: any) {
        console.error('Lookup failed', err);
        setErrorMsg('Unable to load invitation.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitation) return;
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('accept-company-invitation', {
        body: {
          token,
          password,
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      // Auto sign-in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: invitation.email,
        password,
      });
      if (signInError) throw signInError;

      toast.success(`Welcome to DLinRT.eu — you are now linked to ${invitation.company_name}.`);
      navigate('/company/dashboard', { replace: true });
    } catch (err: any) {
      console.error('Accept failed', err);
      toast.error(err.message || 'Failed to accept invitation.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Accept invitation — DLinRT.eu</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Company Representative Invitation</CardTitle>
            <CardDescription>
              {invitation
                ? `Set a password to manage ${invitation.company_name} on DLinRT.eu.`
                : 'Invitation details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMsg ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errorMsg}
                  <div className="mt-3">
                    <Link to="/" className="underline">
                      Return to homepage
                    </Link>
                  </div>
                </AlertDescription>
              </Alert>
            ) : invitation ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p>
                    <strong>Company:</strong> {invitation.company_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {invitation.email}
                  </p>
                  {invitation.rep_position && (
                    <p>
                      <strong>Position:</strong> {invitation.rep_position}
                    </p>
                  )}
                  {invitation.message && (
                    <p className="mt-2 italic text-muted-foreground">
                      "{invitation.message}"
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="first">First name</Label>
                    <Input
                      id="first"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last">Last name</Label>
                    <Input
                      id="last"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">At least 8 characters.</p>
                </div>
                <div>
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {submitting ? 'Creating account...' : 'Accept & create account'}
                </Button>
              </form>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
