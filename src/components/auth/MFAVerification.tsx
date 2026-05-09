import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertCircle } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface MFAVerificationProps {
  onVerify: (code: string) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  error?: string;
}

export const MFAVerification = ({ onVerify, onCancel, loading, error }: MFAVerificationProps) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onVerify(code);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <CardTitle>Two-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Enter the verification code from your authenticator app to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Verification Code</Label>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
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
            type="submit"
            className="w-full"
            disabled={loading || code.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel and sign out
            </Button>
          )}

          <Alert>
            <AlertDescription className="text-xs">
              Lost access to your authenticator app? Contact support at{' '}
              <a href="mailto:m.maspero@umcutrecht.nl" className="underline">
                m.maspero@umcutrecht.nl
              </a>{' '}
              to recover your account.
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
    </Card>
  );
};
