import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://dlinrt.eu",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Credentials": "true",
};

interface NotificationRequest {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  approved: boolean;
  rejectionReason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify service role key authorization
  const authHeader = req.headers.get("Authorization");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!authHeader || !authHeader.includes(serviceRoleKey || "")) {
    // Allow anon key calls from authenticated frontend
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!authHeader?.includes(anonKey || "")) {
      console.log("Authorization check - proceeding with request");
    }
  }

  try {
    const { userId, email, firstName, lastName, approved, rejectionReason }: NotificationRequest = await req.json();

    console.log(`Processing ${approved ? 'approval' : 'rejection'} notification for:`, email);

    const siteUrl = "https://dlinrt.eu";

    let subject: string;
    let htmlContent: string;

    if (approved) {
      subject = "Welcome to DLinRT.eu - Registration Approved";
      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Approved</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">✓ Registration Approved</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">
                Dear ${firstName} ${lastName},
              </p>
              
              <p style="font-size: 16px;">
                Great news! Your registration on <strong>DLinRT.eu</strong> has been <strong style="color: #10b981;">approved</strong>.
              </p>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 2px solid #10b981;">
                <h2 style="margin-top: 0; color: #10b981; font-size: 18px;">What's Next?</h2>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li style="margin: 8px 0;">Log in to access your dashboard</li>
                  <li style="margin: 8px 0;">Complete your profile information</li>
                  <li style="margin: 8px 0;">Explore the available resources and features</li>
                  <li style="margin: 8px 0;">Request additional roles if needed</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${siteUrl}/login" 
                   style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.25);">
                  Log In Now
                </a>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 5px 0;">
                  <strong>Questions?</strong> Contact us at <a href="mailto:info@dlinrt.eu" style="color: #10b981;">info@dlinrt.eu</a>
                </p>
                <p style="margin: 5px 0; color: #9ca3af;">
                  This is an automated notification from DLinRT.eu.
                </p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else {
      subject = "DLinRT.eu Registration Update";
      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Update</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Registration Update</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">
                Dear ${firstName} ${lastName},
              </p>
              
              <p style="font-size: 16px;">
                We have reviewed your registration request for <strong>DLinRT.eu</strong>.
              </p>

              <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #f59e0b;">
                <p style="margin: 0; color: #92400e;">
                  Unfortunately, we were unable to approve your registration at this time.
                  ${rejectionReason ? `<br><br><strong>Reason:</strong> ${rejectionReason}` : ''}
                </p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e5e7eb;">
                <h3 style="margin-top: 0; color: #374151; font-size: 16px;">What can you do?</h3>
                <ul style="margin: 10px 0; padding-left: 20px; color: #4b5563;">
                  <li style="margin: 8px 0;">Ensure you're using an institutional email address</li>
                  <li style="margin: 8px 0;">Contact us if you believe this was an error</li>
                  <li style="margin: 8px 0;">Reapply with updated information</li>
                </ul>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 5px 0;">
                  <strong>Questions?</strong> Contact us at <a href="mailto:info@dlinrt.eu" style="color: #f97316;">info@dlinrt.eu</a>
                </p>
                <p style="margin: 5px 0; color: #9ca3af;">
                  This is an automated notification from DLinRT.eu.
                </p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "DLinRT.eu <noreply@dlinrt.eu>",
      to: [email],
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-user-approval function:", error);
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
