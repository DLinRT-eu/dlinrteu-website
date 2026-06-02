import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const buildDefaultMessage = (firstName: string) =>
  `Dear ${firstName?.trim() ? firstName.trim() : '[First Name]'},

Thank you very much for contributing to the accuracy of this initiative. We hope the radiotherapy community will benefit greatly from our platform, bringing users, clinical teams, and vendors one step closer together in our shared mission to improve patient care.

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
  const [message, setMessage] = useState(() => buildDefaultMessage(''));
  const [sending, setSending] = useState(false);
  const messageEditedRef = useRef(false);

  // Keep the default template in sync with the first name until the admin edits it manually.
  useEffect(() => {
    if (!messageEditedRef.current) {
      setMessage(buildDefaultMessage(firstName));
    }
  }, [firstName]);

  const reset = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPosition('');
    messageEditedRef.current = false;
    setMessage(buildDefaultMessage(''));
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
          },
        }
      );
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      toast.success(`Invitation sent to ${email}`);
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
              Editable template. Line breaks are preserved. The signature block, accept-invitation
              button and expiry notice are appended automatically.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={sending}>
            <Mail className="h-4 w-4 mr-2" />
            {sending ? 'Sending...' : 'Send invitation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
