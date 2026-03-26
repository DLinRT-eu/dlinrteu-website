import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const feedbackSchema = z.object({
  submission_type: z.enum(['missing_product', 'missing_info']),
  product_name: z.string().trim().min(1, 'Product name is required').max(200),
  company_name: z.string().trim().max(200).optional(),
  submitter_name: z.string().trim().min(1, 'Your name is required').max(100),
  submitter_email: z.string().trim().email('Please enter a valid email').max(254),
  details: z.string().trim().min(10, 'Please provide at least 10 characters of detail').max(5000),
  supporting_url: z.string().trim().url('Please enter a valid URL').max(500).optional().or(z.literal('')),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const ProductFeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      submission_type: 'missing_product',
      product_name: '',
      company_name: '',
      submitter_name: '',
      submitter_email: '',
      details: '',
      supporting_url: '',
    },
  });

  const submissionType = watch('submission_type');

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        supporting_url: data.supporting_url || undefined,
        company_name: data.company_name || undefined,
      };

      const { data: result, error } = await supabase.functions.invoke('submit-product-feedback', {
        body: payload,
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success('Thank you! Your feedback has been submitted.');
    } catch (err) {
      console.error('Feedback submission error:', err);
      toast.error('Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h3>
        <p className="text-gray-600">
          Your feedback has been submitted and will be reviewed by our team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Submission Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">What would you like to report?</Label>
        <RadioGroup
          value={submissionType}
          onValueChange={(val) => setValue('submission_type', val as 'missing_product' | 'missing_info')}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="missing_product" id="missing_product" />
            <Label htmlFor="missing_product" className="font-normal cursor-pointer">
              A product is missing from the catalogue
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="missing_info" id="missing_info" />
            <Label htmlFor="missing_info" className="font-normal cursor-pointer">
              Missing or incorrect information on an existing product
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="product_name">
          {submissionType === 'missing_product' ? 'Product name' : 'Which product?'} *
        </Label>
        <Input
          id="product_name"
          placeholder={submissionType === 'missing_product' ? 'e.g. AccuContour' : 'e.g. Limbus Contour'}
          {...register('product_name')}
        />
        {errors.product_name && (
          <p className="text-sm text-red-500">{errors.product_name.message}</p>
        )}
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="company_name">
          Company name {submissionType === 'missing_product' ? '*' : '(optional)'}
        </Label>
        <Input
          id="company_name"
          placeholder="e.g. Manteia Technologies"
          {...register('company_name')}
        />
        {errors.company_name && (
          <p className="text-sm text-red-500">{errors.company_name.message}</p>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2">
        <Label htmlFor="details">Details *</Label>
        <Textarea
          id="details"
          placeholder={
            submissionType === 'missing_product'
              ? 'Describe the product: what does it do, what certifications does it have, etc.'
              : 'What information is missing or incorrect? Please be specific.'
          }
          rows={4}
          {...register('details')}
        />
        {errors.details && (
          <p className="text-sm text-red-500">{errors.details.message}</p>
        )}
      </div>

      {/* Supporting URL */}
      <div className="space-y-2">
        <Label htmlFor="supporting_url">Supporting URL (optional)</Label>
        <Input
          id="supporting_url"
          type="url"
          placeholder="https://example.com/product-page or FDA listing"
          {...register('supporting_url')}
        />
        {errors.supporting_url && (
          <p className="text-sm text-red-500">{errors.supporting_url.message}</p>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Submitter Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="submitter_name">Your name *</Label>
          <Input id="submitter_name" placeholder="Jane Doe" {...register('submitter_name')} />
          {errors.submitter_name && (
            <p className="text-sm text-red-500">{errors.submitter_name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="submitter_email">Your email *</Label>
          <Input
            id="submitter_email"
            type="email"
            placeholder="jane.doe@hospital.org"
            {...register('submitter_email')}
          />
          {errors.submitter_email && (
            <p className="text-sm text-red-500">{errors.submitter_email.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto flex items-center gap-2">
        <Send className="h-4 w-4" />
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
};

export default ProductFeedbackForm;
