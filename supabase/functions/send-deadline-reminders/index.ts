import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReviewReminder {
  review_id: string;
  product_id: string;
  reviewer_id: string;
  reviewer_email: string;
  reviewer_first_name: string;
  reviewer_last_name: string;
  deadline: string;
  status: string;
  days_until_deadline: number;
  round_name: string | null;
}

const getUrgencyLevel = (daysUntil: number): { label: string; color: string; bgColor: string } => {
  if (daysUntil < 0) {
    return { label: 'OVERDUE', color: '#dc2626', bgColor: '#fef2f2' };
  }
  if (daysUntil === 0) {
    return { label: 'DUE TODAY', color: '#dc2626', bgColor: '#fef2f2' };
  }
  if (daysUntil === 1) {
    return { label: 'DUE TOMORROW', color: '#ea580c', bgColor: '#fff7ed' };
  }
  return { label: `DUE IN ${daysUntil} DAYS`, color: '#d97706', bgColor: '#fffbeb' };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting deadline reminder check...");

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body for optional overrides
    let thresholdDays: number | undefined;
    let minIntervalHours: number | undefined;
    let forceRun = false;
    
    if (req.method === "POST") {
      try {
        const body = await req.json();
        thresholdDays = body.threshold_days;
        minIntervalHours = body.min_interval_hours;
        forceRun = body.force === true;
        console.log("Request params:", { thresholdDays, minIntervalHours, forceRun });
      } catch {
        // No body or invalid JSON, use defaults from settings
      }
    }

    // Get settings from database if not overridden
    const { data: settings } = await supabase.rpc('get_reminder_settings');
    console.log("Retrieved settings:", settings);

    const enabled = settings?.enabled !== false;
    const finalThreshold = thresholdDays ?? settings?.threshold_days ?? 3;
    const finalInterval = minIntervalHours ?? settings?.min_interval_hours ?? 24;

    // Check if reminders are enabled (unless force run)
    if (!enabled && !forceRun) {
      console.log("Reminders are disabled and not force run.");
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Reminders are disabled",
        sent: 0 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Using threshold: ${finalThreshold} days, interval: ${finalInterval} hours`);

    // Get reviews needing reminders with configurable thresholds
    const { data: reviews, error: reviewsError } = await supabase
      .rpc('get_reviews_needing_reminders', {
        p_threshold_days: finalThreshold,
        p_min_interval_hours: forceRun ? 0 : finalInterval
      });

    if (reviewsError) {
      console.error("Error fetching reviews:", reviewsError);
      throw new Error(`Failed to fetch reviews: ${reviewsError.message}`);
    }

    if (!reviews || reviews.length === 0) {
      console.log("No reviews need reminders at this time.");
      return new Response(JSON.stringify({ 
        success: true, 
        message: "No reminders needed",
        sent: 0,
        settings: { threshold_days: finalThreshold, min_interval_hours: finalInterval }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Found ${reviews.length} reviews needing reminders`);

    // Group reviews by reviewer to send consolidated emails
    const reviewsByReviewer = new Map<string, ReviewReminder[]>();
    for (const review of reviews as ReviewReminder[]) {
      const existing = reviewsByReviewer.get(review.reviewer_id) || [];
      existing.push(review);
      reviewsByReviewer.set(review.reviewer_id, existing);
    }

    const siteUrl = "https://dlinrt.eu";
    let emailsSent = 0;
    let emailsFailed = 0;
    const sentReviewIds: string[] = [];

    // Send email to each reviewer
    for (const [reviewerId, reviewerReviews] of reviewsByReviewer.entries()) {
      const reviewer = reviewerReviews[0]; // All have same reviewer info
      
      // Sort by urgency (most urgent first)
      reviewerReviews.sort((a, b) => a.days_until_deadline - b.days_until_deadline);

      // Check for overdue reviews
      const overdueCount = reviewerReviews.filter(r => r.days_until_deadline < 0).length;
      const dueTodayCount = reviewerReviews.filter(r => r.days_until_deadline === 0).length;
      const dueSoonCount = reviewerReviews.filter(r => r.days_until_deadline > 0).length;

      // Determine subject line based on urgency
      let subject: string;
      if (overdueCount > 0) {
        subject = `⚠️ URGENT: ${overdueCount} Overdue Review${overdueCount > 1 ? 's' : ''} Require Attention`;
      } else if (dueTodayCount > 0) {
        subject = `🔔 Reminder: ${dueTodayCount} Review${dueTodayCount > 1 ? 's' : ''} Due Today`;
      } else {
        subject = `📅 Upcoming Deadline: ${dueSoonCount} Review${dueSoonCount > 1 ? 's' : ''} Due Soon`;
      }

      // Build review list HTML
      const reviewListHtml = reviewerReviews.map(review => {
        const urgency = getUrgencyLevel(review.days_until_deadline);
        const deadlineDate = new Date(review.deadline).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        return `
          <div style="background: ${urgency.bgColor}; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid ${urgency.color};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: 600; color: #374151;">${review.product_id}</span>
              <span style="background: ${urgency.color}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                ${urgency.label}
              </span>
            </div>
            <div style="color: #6b7280; font-size: 14px;">
              <div>📆 Deadline: ${deadlineDate}</div>
              ${review.round_name ? `<div>📋 Round: ${review.round_name}</div>` : ''}
              <div>📊 Status: ${review.status === 'pending' ? 'Not Started' : 'In Progress'}</div>
            </div>
          </div>
        `;
      }).join('');

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Review Deadline Reminder</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, ${overdueCount > 0 ? '#dc2626, #b91c1c' : '#f59e0b, #d97706'}); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">
                ${overdueCount > 0 ? '⚠️ Review Deadline Alert' : '📅 Deadline Reminder'}
              </h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">
                Hello ${reviewer.reviewer_first_name} ${reviewer.reviewer_last_name},
              </p>
              
              <p style="font-size: 16px;">
                This is a reminder about your upcoming and overdue review assignments:
              </p>

              <!-- Summary Stats -->
              <div style="display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap;">
                ${overdueCount > 0 ? `
                  <div style="background: #fef2f2; padding: 12px 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 100px;">
                    <div style="font-size: 24px; font-weight: bold; color: #dc2626;">${overdueCount}</div>
                    <div style="font-size: 12px; color: #991b1b;">Overdue</div>
                  </div>
                ` : ''}
                ${dueTodayCount > 0 ? `
                  <div style="background: #fff7ed; padding: 12px 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 100px;">
                    <div style="font-size: 24px; font-weight: bold; color: #ea580c;">${dueTodayCount}</div>
                    <div style="font-size: 12px; color: #c2410c;">Due Today</div>
                  </div>
                ` : ''}
                ${dueSoonCount > 0 ? `
                  <div style="background: #fffbeb; padding: 12px 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 100px;">
                    <div style="font-size: 24px; font-weight: bold; color: #d97706;">${dueSoonCount}</div>
                    <div style="font-size: 12px; color: #b45309;">Due Soon</div>
                  </div>
                ` : ''}
              </div>

              <!-- Review List -->
              <div style="margin: 25px 0;">
                <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Your Reviews:</h2>
                ${reviewListHtml}
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${siteUrl}/reviewer/dashboard" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.25);">
                  Go to Reviewer Dashboard
                </a>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 5px 0;">
                  <strong>Need help?</strong> Contact your administrator if you have questions about your assignments.
                </p>
                <p style="margin: 5px 0; color: #9ca3af;">
                  This is an automated reminder from DLinRT.eu. You will receive at most one reminder per day.
                </p>
              </div>
            </div>
          </body>
        </html>
      `;

      try {
        const emailResponse = await resend.emails.send({
          from: "DLinRT.eu Review System <noreply@dlinrt.eu>",
          to: [reviewer.reviewer_email],
          subject,
          html: htmlContent,
        });

        console.log(`Email sent to ${reviewer.reviewer_email}:`, emailResponse);
        emailsSent++;
        
        // Track which review IDs had reminders sent
        sentReviewIds.push(...reviewerReviews.map(r => r.review_id));
      } catch (emailError: any) {
        console.error(`Failed to send email to ${reviewer.reviewer_email}:`, emailError);
        emailsFailed++;
      }
    }

    // Update last_reminder_sent_at for sent reviews
    if (sentReviewIds.length > 0) {
      const { data: updateResult, error: updateError } = await supabase
        .rpc('mark_reminder_sent', { p_review_ids: sentReviewIds });

      if (updateError) {
        console.error("Error updating reminder timestamps:", updateError);
      } else {
        console.log(`Updated reminder timestamp for ${updateResult} reviews`);
      }
    }

    const summary = {
      success: true,
      message: `Deadline reminder process completed`,
      reviewsProcessed: reviews.length,
      reviewersNotified: reviewsByReviewer.size,
      emailsSent,
      emailsFailed,
    };

    console.log("Reminder summary:", summary);

    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-deadline-reminders function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
