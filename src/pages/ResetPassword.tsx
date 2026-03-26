import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Mail, ArrowLeft, AlertTriangle } from 'lucide-react';
import SEO from '@/components/SEO';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Zod schema for password reset validation
const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email is too long' })
    .toLowerCase()
    .trim(),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// Rate limiting configuration
const RATE_LIMIT_KEY = 'password_reset_attempts';
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 3;

interface RateLimitData {
  attempts: number;
  timestamp: number;
}

export default function ResetPassword() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Check rate limit on component mount and set up timer
  useEffect(() => {
    checkRateLimit();
    
    const interval = setInterval(() => {
      const data = getRateLimitData();
      if (data && isRateLimited(data)) {
        const timeLeft = Math.ceil((data.timestamp + RATE_LIMIT_WINDOW - Date.now()) / 1000);
        setRemainingTime(timeLeft);
      } else {
        setRemainingTime(0);
        setRateLimitError('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRateLimitData = (): RateLimitData | null => {
    try {
      const data = localStorage.getItem(RATE_LIMIT_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  const setRateLimitData = (data: RateLimitData) => {
    try {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
    } catch {
      // Silent fail if localStorage is unavailable
    }
  };

  const isRateLimited = (data: RateLimitData): boolean => {
    const now = Date.now();
    const timeSinceFirstAttempt = now - data.timestamp;
    
    if (timeSinceFirstAttempt > RATE_LIMIT_WINDOW) {
      // Reset if window has passed
      return false;
    }
    
    return data.attempts >= MAX_ATTEMPTS;
  };

  const checkRateLimit = () => {
    const data = getRateLimitData();
    if (data && isRateLimited(data)) {
      const timeLeft = Math.ceil((data.timestamp + RATE_LIMIT_WINDOW - Date.now()) / 1000);
      setRemainingTime(timeLeft);
      setRateLimitError(
        `Too many password reset attempts. Please try again in ${Math.ceil(timeLeft / 60)} minutes.`
      );
      return false;
    }
    return true;
  };

  const recordAttempt = () => {
    const data = getRateLimitData();
    const now = Date.now();

    if (data) {
      const timeSinceFirstAttempt = now - data.timestamp;
      
      if (timeSinceFirstAttempt > RATE_LIMIT_WINDOW) {
        // Reset if window has passed
        setRateLimitData({ attempts: 1, timestamp: now });
      } else {
        // Increment attempts within window
        setRateLimitData({ attempts: data.attempts + 1, timestamp: data.timestamp });
      }
    } else {
      // First attempt
      setRateLimitData({ attempts: 1, timestamp: now });
    }
  };

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    setError('');
    setRateLimitError('');

    // Check rate limit
    if (!checkRateLimit()) {
      return;
    }

    // Record this attempt
    recordAttempt();

    // Use explicit production URL for password reset
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: 'https://dlinrt.eu/update-password',
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
      // Clear form
      form.reset();
    }
  };

  return (
    <>
      <SEO 
        title="Reset Password"
        description="Reset your DLinRT.eu password"
      />
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/auth')}
              className="w-fit mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Button>
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6" />
              <CardTitle>Reset Password</CardTitle>
            </div>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <Alert>
                <AlertDescription>
                  Check your email for a password reset link. If you don't see it, check your spam folder.
                </AlertDescription>
              </Alert>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {rateLimitError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        {rateLimitError}
                        {remainingTime > 0 && (
                          <span className="block mt-1 text-sm">
                            Time remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            disabled={form.formState.isSubmitting || remainingTime > 0}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={form.formState.isSubmitting || remainingTime > 0}
                  >
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
