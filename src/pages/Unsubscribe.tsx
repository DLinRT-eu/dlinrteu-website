import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailX, CheckCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const formSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
});

type FormValues = z.infer<typeof formSchema>;

const Unsubscribe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('unsubscribe-newsletter', {
        body: {
          email: data.email,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to unsubscribe');
      }

      if (responseData?.error) {
        throw new Error(responseData.error);
      }

      setIsSuccess(true);
      form.reset();
      toast.success(responseData?.message || 'Successfully unsubscribed');
    } catch (error: any) {
      console.error('Unsubscribe error:', error);
      toast.error(error.message || 'Failed to unsubscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Unsubscribe from Newsletter - DLinRT.eu"
        description="Unsubscribe from the DLinRT newsletter to stop receiving updates about deep learning solutions in radiotherapy."
        canonical="https://dlinrt.eu/unsubscribe"
      />
      
      <main className="container mx-auto px-4 py-12 max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
              <MailX className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Unsubscribe from Newsletter</CardTitle>
            <CardDescription>
              Enter your email address to unsubscribe from the DLinRT newsletter.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Unsubscribed Successfully
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  You will no longer receive newsletter emails from DLinRT.
                </p>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSuccess(false)}
                    className="w-full"
                  >
                    Unsubscribe another email
                  </Button>
                  <Link to="/">
                    <Button variant="default" className="w-full">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
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
                    disabled={isSubmitting}
                    variant="destructive"
                  >
                    {isSubmitting ? 'Processing...' : 'Unsubscribe'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Changed your mind? You can always{" "}
                    <Link to="/" className="text-primary hover:underline">
                      resubscribe
                    </Link>{" "}
                    from our homepage.
                  </p>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Unsubscribe;
