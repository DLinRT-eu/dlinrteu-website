import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

interface InviteCompanyRepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
  companyName: string;
  onSent?: () => void;
}

const buildInviteMessage = (firstName: string) =>
  `Dear ${firstName?.trim() ? firstName.trim() : '[First Name]'},

Thank you very much for contributing to the accuracy of this initiative. We hope the radiotherapy community will benefit greatly from our platform, bringing users, clinical teams, and vendors one step closer together in our shared mission to improve patient care.

Information about the company review process can be found at: https://dlinrt.eu/company/guide

Best regards,`;

const buildForceMessage = (firstName: string, companyName: string) =>
  `Dear ${firstName?.trim() ? firstName.trim() : '[First Name]'},

A DLinRT.eu administrator has created a company representative account for you on behalf of ${companyName}. You are now registered and linked to this company.

To activate your account, please click the button below to set your password. After that you can sign in, certify product information, submit revisions, and manage your company's catalogue listings.

Information about the company review process can be found at: https://dlinrt.eu/company/guide

Best regards,`;

export default function InviteCompanyRepDialog({
  open,
  onOpenChange,
  companyId,
  companyName,
  onSent,
}: InviteCompanyRepDialogProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [forceRegister, setForceRegister] = useState(false);
  const [message, setMessage] = useState(() => buildInviteMessage(''));
  const [sending, setSending] = useState(false);
  const messageEditedRef = useRef(false);

  // Keep the default template in sync with first name + mode until the admin edits it manually.
  useEffect(() => {
    if (!messageEditedRef.current) {
      setMessage(
        forceRegister
          ? buildForceMessage(firstName, companyName)
          : buildInviteMessage(firstName)
      );
    }
  }, [firstName, forceRegister, companyName]);

  const reset = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPosition('');
    setForceRegister(false);
    messageEditedRef.current = false;
    setMessage(buildInviteMessage(''));
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        'invite-company-representative',
        {
          body: {
            email: email.trim(),
            companyId,
            companyName,
            firstName: firstName.trim() || undefined,
            lastName: lastName.trim() || undefined,
            position: position.trim() || undefined,
            message: message.trim() || undefined,
            forceRegister,
          },
        }
      );
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      toast.success(
        forceRegister
          ? `Account created — password-setup email sent to ${email}`
          : `Invitation sent to ${email}`
      );
      reset();
      onOpenChange(false);
      onSent?.();
    } catch (err: any) {
      console.error('Invite failed', err);
      toast.error(err.message || 'Failed to send invitation');
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Representative</DialogTitle>
          <DialogDescription>
            Send an email invitation to a new representative for <strong>{companyName}</strong>.
            They will set their own password and be automatically linked to this company.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="invite-email">Email *</Label>
            <Input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="person@company.com"
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="invite-first">First name</Label>
              <Input
                id="invite-first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="invite-last">Last name</Label>
              <Input
                id="invite-last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="invite-position">Position</Label>
            <Input
              id="invite-position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Product Manager"
            />
          </div>
          <div className="flex items-start gap-2 rounded-md border bg-muted/40 p-3">
            <Checkbox
              id="invite-force"
              checked={forceRegister}
              onCheckedChange={(v) => {
                const next = v === true;
                setForceRegister(next);
                // Reset the message to the matching template unless admin already edited it.
                if (!messageEditedRef.current) {
                  setMessage(
                    next
                      ? buildForceMessage(firstName, companyName)
                      : buildInviteMessage(firstName)
                  );
                }
              }}
            />
            <div className="space-y-1">
              <Label htmlFor="invite-force" className="cursor-pointer">
                Register the representative now and send a password-setup email
              </Label>
              <p className="text-xs text-muted-foreground">
                Creates the account immediately and links it to {companyName}. The recipient
                receives a Set-Password email instead of an invitation link.
              </p>
            </div>
          </div>
          <div>
            <Label htmlFor="invite-message">Email message</Label>
            <Textarea
              id="invite-message"
              value={message}
              onChange={(e) => {
                messageEditedRef.current = true;
                setMessage(e.target.value);
              }}
              rows={10}
              maxLength={3000}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Editable template. Line breaks are preserved. The signature block,
              {forceRegister ? ' Set-Password button' : ' accept-invitation button'} and expiry
              notice are appended automatically.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={sending}>
            <Mail className="h-4 w-4 mr-2" />
            {sending
              ? 'Sending...'
              : forceRegister
                ? 'Register & send password email'
                : 'Send invitation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
