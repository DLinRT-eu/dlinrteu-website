
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Mail, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  emailConfirm: z.string().email({ message: 'Please enter a valid email address' }),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must agree to join the mailing list'
  }),
}).refine((data) => data.email === data.emailConfirm, {
  message: "Email addresses don't match",
  path: ["emailConfirm"],
});

type FormValues = z.infer<typeof formSchema>;

const MailingListSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      emailConfirm: '',
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
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
      toast.success('Successfully subscribed to newsletter!');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Welcome to the DLinRT Newsletter!
        </h3>
        <p className="text-green-700 text-sm">
          Thank you for subscribing. Check your email for a confirmation message.
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => setIsSuccess(false)}
        >
          Subscribe another email
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="emailConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Confirm your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  <strong>Mailing List Consent:</strong> I agree to join the DLinRT mailing list to receive updates about 
                  deep learning solutions in radiotherapy. I understand that:
                  <ul className="mt-2 ml-4 text-xs list-disc">
                    <li>My data will be securely stored and processed within the EU</li>
                    <li>I can unsubscribe at any time by contacting info@dlinrt.eu</li>
                    <li>My data will be deleted if I unsubscribe or request deletion</li>
                  </ul>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Join Mailing List'}
          <Mail className="ml-2 h-4 w-4" />
        </Button>
        
        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p className="font-semibold mb-1">Data Processing Notice:</p>
          <p className="mb-2">
            Your data is processed securely within the European Union using Supabase (EU-hosted). 
            We use industry-standard encryption and follow GDPR requirements.
          </p>
          <p>
            <strong>Your rights:</strong> Access, rectification, erasure, data portability. 
            Contact info@dlinrt.eu to exercise your rights or unsubscribe.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default MailingListSignup;
