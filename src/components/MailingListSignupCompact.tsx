
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Valid email required' }),
  emailConfirm: z.string().email({ message: 'Valid email required' }),
  consent: z.boolean().refine(val => val === true, {
    message: 'Consent required'
  }),
}).refine((data) => data.email === data.emailConfirm, {
  message: "Emails don't match",
  path: ["emailConfirm"],
});

type FormValues = z.infer<typeof formSchema>;

const MailingListSignupCompact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      emailConfirm: '',
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Extract name from email if possible (before @)
      const emailPrefix = data.email.split('@')[0];
      
      const { data: responseData, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: {
          firstName: emailPrefix,
          lastName: '',
          email: data.email,
          consentGiven: data.consent,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to subscribe');
      }

      if (responseData?.error) {
        throw new Error(responseData.error);
      }

      setIsSuccess(true);
      form.reset();
      toast.success('Successfully subscribed!');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md text-center p-4 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
        <p className="text-sm text-green-700 font-medium">Thank you for subscribing!</p>
        <p className="text-xs text-green-600 mt-1">Check your email for confirmation.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <h3 className="text-sm font-semibold text-foreground mb-3">Stay Updated</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Get the latest updates on deep learning solutions in radiotherapy.
      </p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Input
          type="email"
          placeholder="Your email"
          className="text-xs"
          {...form.register('email')}
        />
        
        <Input
          type="email"
          placeholder="Confirm email"
          className="text-xs"
          {...form.register('emailConfirm')}
        />
        
        <div className="flex items-start space-x-2">
          <Checkbox
            id="compact-consent"
            checked={form.watch('consent')}
            onCheckedChange={(checked) => form.setValue('consent', !!checked)}
          />
          <label htmlFor="compact-consent" className="text-xs text-muted-foreground leading-tight">
            I agree to join the mailing list for updates. Data stored securely in the EU.
          </label>
        </div>
        
        <Button 
          type="submit" 
          size="sm"
          className="w-full text-xs" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Join Mailing List'}
          <Mail className="ml-2 h-3 w-3" />
        </Button>
      </form>
      
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="mt-2">
          {Object.values(form.formState.errors).map((error, index) => (
            <p key={index} className="text-xs text-destructive">{error?.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailingListSignupCompact;
