import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, ShieldCheck, ShieldAlert, Download, Copy, RefreshCw, AlertTriangle, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const NUM_BACKUP_CODES = 10;

const generateLocalBackupCodes = (): string[] => {
  const codes: string[] = [];
  for (let i = 0; i < NUM_BACKUP_CODES; i++) {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    const code = Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
      .match(/.{1,4}/g)
      ?.join('-') || '';
    codes.push(code);
  }
  return codes;
};

export const MFASettings = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [unenrolling, setUnenrolling] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showUnenrollDialog, setShowUnenrollDialog] = useState(false);
  const [showRegenDialog, setShowRegenDialog] = useState(false);
  const [regenTotp, setRegenTotp] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [enrollVerified, setEnrollVerified] = useState(false);
  const [savedConfirmed, setSavedConfirmed] = useState(false);
  const [codesCopied, setCodesCopied] = useState(false);
  const [unenrollTotp, setUnenrollTotp] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    checkMFAStatus();
  }, []);

  const checkMFAStatus = async () => {
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const hasTOTP = factors?.totp?.some((f) => f.status === 'verified');
      setMfaEnabled(!!hasTOTP);

      if (hasTOTP) {
        const factor = factors.totp.find((f) => f.status === 'verified');
        if (factor) setFactorId(factor.id);
      }
    } catch (error) {
      console.error('Error checking MFA status:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEnrollment = async () => {
    setEnrolling(true);
    try {
      // Remove any existing unverified factors first
      const { data: existingFactors } = await supabase.auth.mfa.listFactors();
      const unverifiedFactor = existingFactors?.totp?.find((f) => f.status === 'unverified');
      if (unverifiedFactor) {
        await supabase.auth.mfa.unenroll({ factorId: unverifiedFactor.id });
      }

      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'DLinRT Authenticator',
      });
      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setFactorId(data.id);
      setBackupCodes([]);
      setEnrollVerified(false);
      setVerificationCode('');
      setShowEnrollDialog(true);
    } catch (error: any) {
      toast({
        title: 'Enrollment Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setEnrolling(false);
    }
  };

  const verifyEnrollment = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: 'Invalid Code',
        description: 'Please enter a 6-digit code',
        variant: 'destructive',
      });
      return;
    }

    setVerifying(true);
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verificationCode,
      });
      if (verify.error) throw verify.error;

      // Now that TOTP is verified, generate and persist backup codes (batched)
      const codes = generateLocalBackupCodes();
      const { error: storeError } = await supabase.functions.invoke('store-backup-code', {
        body: { codes, reset: true },
      });
      if (storeError) throw storeError;
      setBackupCodes(codes);

      // Update profile flags
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({
            mfa_enabled: true,
            mfa_enrolled_at: new Date().toISOString(),
            mfa_backup_codes_generated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      }

      setEnrollVerified(true);
      setMfaEnabled(true);
      toast({
        title: 'MFA Enabled',
        description: 'Save your backup codes in a safe place before closing this dialog.',
      });
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setVerifying(false);
    }
  };

  // Cleanup pending (unverified) enrollment if user closes dialog early
  const handleEnrollDialogChange = async (open: boolean) => {
    if (!open && !enrollVerified && factorId) {
      try {
        await supabase.auth.mfa.unenroll({ factorId });
      } catch (e) {
        console.error('Failed to clean up unverified factor:', e);
      }
      setFactorId('');
    }
    if (!open) {
      setVerificationCode('');
      setBackupCodes([]);
      setQrCode('');
      setSecret('');
      setSavedConfirmed(false);
      setCodesCopied(false);
      setEnrollVerified(false);
    }
    setShowEnrollDialog(open);
  };

  const startUnenrollment = () => {
    setUnenrollTotp('');
    setShowUnenrollDialog(true);
  };

  const confirmUnenrollment = async () => {
    if (unenrollTotp.length !== 6) {
      toast({
        title: 'Code Required',
        description: 'Enter the 6-digit code from your authenticator app',
        variant: 'destructive',
      });
      return;
    }

    setUnenrolling(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      // Require a fresh TOTP code against the existing factor before unenrolling.
      // This proves AAL2 / current device possession, not just password knowledge.
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: unenrollTotp,
      });
      if (verify.error) throw new Error('Invalid verification code');

      const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId });
      if (unenrollError) throw unenrollError;

      // Delete all backup codes for this user
      await supabase
        .from('mfa_backup_codes')
        .delete()
        .eq('user_id', user.id);

      // Update profile
      await supabase
        .from('profiles')
        .update({
          mfa_enabled: false,
          mfa_enrolled_at: null,
          mfa_backup_codes_generated_at: null,
        })
        .eq('id', user.id);

      toast({
        title: 'MFA Disabled',
        description: 'Two-factor authentication has been removed from your account',
      });

      setMfaEnabled(false);
      setShowUnenrollDialog(false);
      setUnenrollTotp('');
    } catch (error: any) {
      toast({
        title: 'Unenrollment Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUnenrolling(false);
    }
  };

  const downloadBackupCodes = () => {
    const content = backupCodes.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mfa-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast({ title: 'Copied', description: 'Secret key copied to clipboard' });
  };

  const copyAllBackupCodes = async () => {
    try {
      await navigator.clipboard.writeText(backupCodes.join('\n'));
      setCodesCopied(true);
      toast({ title: 'Copied', description: 'All backup codes copied to clipboard' });
    } catch {
      toast({ title: 'Copy failed', description: 'Please copy manually', variant: 'destructive' });
    }
  };

  const startRegenerate = () => {
    setRegenTotp('');
    setShowRegenDialog(true);
  };

  const confirmRegenerate = async () => {
    if (regenTotp.length !== 6) return;
    setRegenerating(true);
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;
      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: regenTotp,
      });
      if (verify.error) throw new Error('Invalid verification code');

      const codes = generateLocalBackupCodes();
      const { error: storeError } = await supabase.functions.invoke('store-backup-code', {
        body: { codes, reset: true },
      });
      if (storeError) throw storeError;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({ mfa_backup_codes_generated_at: new Date().toISOString() })
          .eq('id', user.id);
      }

      setBackupCodes(codes);
      setEnrollVerified(true);
      setSavedConfirmed(false);
      setCodesCopied(false);
      setShowRegenDialog(false);
      setRegenTotp('');
      setShowEnrollDialog(true);
      toast({
        title: 'New backup codes generated',
        description: 'Previous codes are now invalid. Save the new ones immediately.',
      });
    } catch (error: any) {
      toast({
        title: 'Regeneration failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading MFA settings...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </div>
            {mfaEnabled ? (
              <Badge variant="default" className="gap-1">
                <ShieldCheck className="h-3 w-3" />
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <ShieldAlert className="h-3 w-3" />
                Disabled
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mfaEnabled ? (
            <>
              <Alert>
                <AlertDescription>
                  Two-factor authentication is active. You'll need to enter a code from
                  your authenticator app each time you sign in.
                </AlertDescription>
              </Alert>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={startRegenerate}
                  variant="outline"
                  disabled={unenrolling || regenerating}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate backup codes
                </Button>
                <Button
                  onClick={startUnenrollment}
                  variant="destructive"
                  disabled={unenrolling}
                >
                  Disable MFA
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Enable two-factor authentication using an authenticator app like Google
                Authenticator, Authy, or 1Password.
              </p>
              <Button onClick={startEnrollment} disabled={enrolling}>
                Enable MFA
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={handleEnrollDialogChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              {enrollVerified
                ? 'Save these backup codes in a safe place. They will not be shown again.'
                : 'Scan the QR code with your authenticator app, then enter the verification code to complete setup.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!enrollVerified ? (
              <>
                {/* QR Code */}
                <div className="flex justify-center p-4 bg-background border rounded-lg">
                  <QRCodeSVG value={qrCode} size={200} />
                </div>

                {/* Manual Entry */}
                <div className="space-y-2">
                  <Label className="text-xs">Can't scan? Enter this key manually:</Label>
                  <div className="flex gap-2">
                    <Input value={secret} readOnly className="font-mono text-xs" />
                    <Button size="icon" variant="outline" onClick={copySecret}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Verification */}
                <div className="space-y-2">
                  <Label>Enter the 6-digit code from your app</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={verificationCode}
                      onChange={setVerificationCode}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button
                  onClick={verifyEnrollment}
                  disabled={verifying || verificationCode.length !== 6}
                  className="w-full"
                >
                  {verifying ? 'Verifying...' : 'Verify and Enable MFA'}
                </Button>
              </>
            ) : (
              <>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>These codes will be shown only once.</strong> Each code works a
                    single time if you lose your authenticator. Store them in a password
                    manager or print them — once you close this dialog they cannot be
                    retrieved. To get a new set, use "Regenerate backup codes" (this
                    invalidates the old ones).
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Your backup codes</Label>
                    <span className="text-xs text-muted-foreground">
                      {backupCodes.length} codes
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg font-mono text-sm select-all">
                    {backupCodes.map((code, i) => (
                      <div key={i}>{code}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={copyAllBackupCodes}
                      variant="outline"
                      size="sm"
                    >
                      {codesCopied ? (
                        <><Check className="h-4 w-4 mr-2" />Copied</>
                      ) : (
                        <><Copy className="h-4 w-4 mr-2" />Copy all</>
                      )}
                    </Button>
                    <Button
                      onClick={downloadBackupCodes}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download .txt
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 border rounded-lg">
                  <Checkbox
                    id="saved-confirm"
                    checked={savedConfirmed}
                    onCheckedChange={(c) => setSavedConfirmed(c === true)}
                  />
                  <Label htmlFor="saved-confirm" className="text-sm font-normal leading-tight cursor-pointer">
                    I have saved these backup codes in a secure location and understand
                    they will not be shown again.
                  </Label>
                </div>
                <Button
                  onClick={() => handleEnrollDialogChange(false)}
                  disabled={!savedConfirmed}
                  className="w-full"
                >
                  Done — close and continue
                </Button>

              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Unenrollment Dialog */}
      <Dialog open={showUnenrollDialog} onOpenChange={setShowUnenrollDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter a current code from your authenticator app to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                Disabling MFA will make your account less secure.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label>Authenticator code</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={unenrollTotp} onChange={setUnenrollTotp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowUnenrollDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmUnenrollment}
                variant="destructive"
                disabled={unenrolling || unenrollTotp.length !== 6}
                className="flex-1"
              >
                {unenrolling ? 'Disabling...' : 'Disable MFA'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Regenerate Backup Codes Dialog */}
      <Dialog open={showRegenDialog} onOpenChange={setShowRegenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Regenerate backup codes</DialogTitle>
            <DialogDescription>
              Confirm with a code from your authenticator app. This will invalidate all
              existing backup codes and issue a new set.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Any previously saved backup codes will stop working immediately.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label>Authenticator code</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={regenTotp} onChange={setRegenTotp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowRegenDialog(false)}
                variant="outline"
                className="flex-1"
                disabled={regenerating}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmRegenerate}
                disabled={regenerating || regenTotp.length !== 6}
                className="flex-1"
              >
                {regenerating ? 'Generating...' : 'Generate new codes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
