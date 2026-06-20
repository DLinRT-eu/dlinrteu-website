import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, FileJson, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const DataExport = () => {
  const [loading, setLoading] = useState(false);
  const [showMFADialog, setShowMFADialog] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const verifyMFAAndExport = async () => {
    if (!profile?.mfa_enabled) {
      await exportData();
      return;
    }

    if (!mfaCode) {
      toast({
        title: 'MFA code required',
        description: 'Please enter your verification code',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const factor = factors?.totp?.find((f) => f.status === 'verified');
      
      if (factor) {
        const { data: challenge } = await supabase.auth.mfa.challenge({
          factorId: factor.id,
        });

        if (challenge) {
          const { error: verifyError } = await supabase.auth.mfa.verify({
            factorId: factor.id,
            challengeId: challenge.id,
            code: mfaCode,
          });

          if (verifyError) {
            toast({
              title: 'Invalid code',
              description: 'Please check your MFA code',
              variant: 'destructive',
            });
            setLoading(false);
            return;
          }
        }
      }

      await exportData();
      setShowMFADialog(false);
      setMfaCode('');
    } catch (error: any) {
      toast({
        title: 'Verification failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const exportData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) throw new Error("No active session");

      const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gdpr-data-export`;
      const res = await fetch(fnUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Export failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dlinrt-data-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: "Your full data export has been downloaded",
      });
    } catch (error: any) {
      toast({
        title: "Export failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleExport = () => {
    if (profile?.mfa_enabled) {
      setShowMFADialog(true);
    } else {
      exportData();
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Export
          </CardTitle>
          <CardDescription>
            Download all your personal data in JSON format (GDPR compliance)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <FileJson className="h-4 w-4" />
            <AlertDescription>
              Export includes: profile information, roles, role requests, MFA activity log, reviews, and revisions
            </AlertDescription>
          </Alert>

          <Button onClick={handleExport} disabled={loading}>
            <Download className="h-4 w-4 mr-2" />
            {loading ? 'Exporting...' : 'Export My Data'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showMFADialog} onOpenChange={setShowMFADialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              MFA Verification Required
            </DialogTitle>
            <DialogDescription>
              Please enter your MFA code to export your data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowMFADialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={verifyMFAAndExport}
                disabled={loading || !mfaCode}
                className="flex-1"
              >
                {loading ? 'Verifying...' : 'Verify & Export'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
