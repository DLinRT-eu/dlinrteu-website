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
  role: string;
  approved: boolean;
  rejectionReason?: string;
}

const getRoleDescription = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrator access with full system management capabilities';
    case 'reviewer':
      return 'Reviewer access to evaluate and review product submissions';
    case 'company':
      return 'Company representative access to manage product certifications';
    default:
      return 'Access to additional platform features';
  }
};

const getRoleCapabilities = (role: string): string[] => {
  switch (role) {
    case 'admin':
      return [
        'Manage user accounts and roles',
        'Assign review tasks to reviewers',
        'Access security and analytics dashboards',
        'Manage newsletter and communications',
      ];
    case 'reviewer':
      return [
        'Review assigned products',
        'Provide feedback on product submissions',
        'Access reviewer dashboard',
        'Manage your review workload',
      ];
    case 'company':
      return [
        'Submit products for certification',
        'Respond to reviewer feedback',
        'Manage company product portfolio',
        'Access certification status',
      ];
    default:
      return ['Access platform features'];
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, email, firstName, role, approved, rejectionReason }: NotificationRequest = await req.json();

    console.log(`Processing role request ${approved ? 'approval' : 'rejection'} for:`, email, 'role:', role);

    const siteUrl = "https://dlinrt.eu";
    const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);

    let subject: string;
    let htmlContent: string;

    if (approved) {
      const capabilities = getRoleCapabilities(role);
      subject = `DLinRT.eu - ${roleDisplay} Role Granted`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Role Request Approved</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Role Request Approved</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">
                Hello ${firstName},
              </p>
              
              <p style="font-size: 16px;">
                Great news! Your request for the <strong style="color: #667eea;">${roleDisplay}</strong> role has been <strong style="color: #10b981;">approved</strong>.
              </p>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 2px solid #667eea;">
                <h2 style="margin-top: 0; color: #667eea; font-size: 18px;">${roleDisplay} Role</h2>
                <p style="color: #6b7280; margin-bottom: 15px;">${getRoleDescription(role)}</p>
                
                <h3 style="color: #374151; font-size: 14px; margin-bottom: 10px;">You can now:</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  ${capabilities.map(cap => `<li style="margin: 5px 0;">${cap}</li>`).join('')}
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${siteUrl}/dashboard" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.25);">
                  Go to Dashboard
                </a>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 5px 0;">
                  <strong>Need help?</strong> Contact us at <a href="mailto:info@dlinrt.eu" style="color: #667eea;">info@dlinrt.eu</a>
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
      subject = `DLinRT.eu - ${roleDisplay} Role Request Update`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Role Request Update</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Role Request Update</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">
                Hello ${firstName},
              </p>
              
              <p style="font-size: 16px;">
                We have reviewed your request for the <strong>${roleDisplay}</strong> role on DLinRT.eu.
              </p>

              <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #fecaca;">
                <p style="margin: 0; color: #991b1b;">
                  Unfortunately, your request was not approved at this time.
                  ${rejectionReason ? `<br><br><strong>Reason:</strong> ${rejectionReason}` : ''}
                </p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e5e7eb;">
                <h3 style="margin-top: 0; color: #374151; font-size: 16px;">What can you do?</h3>
                <ul style="margin: 10px 0; padding-left: 20px; color: #4b5563;">
                  <li style="margin: 8px 0;">Contact us if you have questions about this decision</li>
                  <li style="margin: 8px 0;">Provide additional information to support your request</li>
                  <li style="margin: 8px 0;">Submit a new request with updated justification</li>
                </ul>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 5px 0;">
                  <strong>Questions?</strong> Contact us at <a href="mailto:info@dlinrt.eu" style="color: #667eea;">info@dlinrt.eu</a>
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
    console.error("Error in notify-role-request-outcome function:", error);
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
