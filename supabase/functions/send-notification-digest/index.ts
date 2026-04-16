import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// Resend shim — calls the HTTP API directly to avoid npm package resolution issues in Deno edge runtime
function createResend(apiKey: string | undefined) {
  return {
    emails: {
      async send(payload: Record<string, unknown>) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey ?? ""}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        let data: any = null;
        try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
        if (!res.ok) {
          const errMsg = (data && (data.message || data.error)) || `Resend HTTP ${res.status}`;
          throw new Error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
        }
        return { data, error: null };
      },
    },
  };
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = createResend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000"
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.lovable.app'));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Auth: service role or admin JWT
  const authHeader = req.headers.get("Authorization");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

  const isServiceRole = authHeader === `Bearer ${serviceRoleKey}`;

  if (!isServiceRole) {
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: roles } = await adminClient.from("user_roles").select("role")
      .eq("user_id", userData.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
  }

  try {
    const { frequency } = await req.json() as { frequency: 'daily' | 'weekly' };
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Determine time window
    const now = new Date();
    const windowStart = new Date(now);
    if (frequency === 'daily') {
      windowStart.setDate(windowStart.getDate() - 1);
    } else {
      windowStart.setDate(windowStart.getDate() - 7);
    }

    // Fetch unread notifications within time window
    const { data: notifications, error: notifError } = await adminClient
      .from("notifications")
      .select("id, user_id, title, type, created_at")
      .eq("read", false)
      .gte("created_at", windowStart.toISOString())
      .order("created_at", { ascending: false });

    if (notifError) throw notifError;

    if (!notifications || notifications.length === 0) {
      return new Response(JSON.stringify({
        success: true, message: "No unread notifications to digest", emailsSent: 0
      }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    // Group by user
    const byUser = new Map<string, typeof notifications>();
    for (const n of notifications) {
      if (!byUser.has(n.user_id)) byUser.set(n.user_id, []);
      byUser.get(n.user_id)!.push(n);
    }

    // Fetch profiles for all users
    const userIds = Array.from(byUser.keys());
    const { data: profiles } = await adminClient
      .from("profiles")
      .select("id, email, first_name, notification_preferences")
      .in("id", userIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

    let emailsSent = 0;
    let emailsFailed = 0;

    for (const [userId, userNotifs] of byUser) {
      const profile = profileMap.get(userId);
      if (!profile) continue;

      // Check notification preferences
      const prefs = (profile.notification_preferences as any) || {};
      if (prefs.email === false) continue;

      // Check digest frequency preference
      const userDigestFreq = prefs.digest_frequency || 'off';
      if (userDigestFreq === 'off') continue;
      if (userDigestFreq !== frequency) continue;

      // Group notifications by type
      const byType = new Map<string, number>();
      for (const n of userNotifs) {
        byType.set(n.type, (byType.get(n.type) || 0) + 1);
      }

      const typeRows = Array.from(byType.entries())
        .map(([type, count]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:600;">${count}</td></tr>`)
        .join('');

      const periodLabel = frequency === 'daily' ? 'last 24 hours' : 'last 7 days';

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">📬 Notification Digest</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">${frequency.charAt(0).toUpperCase() + frequency.slice(1)} summary</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">Hello ${profile.first_name},</p>
              <p style="font-size: 16px;">You have <strong>${userNotifs.length}</strong> unread notification${userNotifs.length > 1 ? 's' : ''} from the ${periodLabel}:</p>
              <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; margin: 20px 0;">
                <thead><tr style="background: #f3f4f6;"><th style="padding:10px 12px; text-align:left;">Category</th><th style="padding:10px 12px; text-align:center;">Count</th></tr></thead>
                <tbody>${typeRows}</tbody>
              </table>
              <div style="text-align: center; margin: 25px 0;">
                <a href="https://dlinrt.eu/notifications" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">View All Notifications</a>
              </div>
              <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
                <p style="margin: 5px 0;">You can change your digest frequency in <a href="https://dlinrt.eu/profile" style="color: #667eea;">your profile settings</a>.</p>
                <p style="margin: 5px 0; color: #9ca3af;">This is an automated notification from DLinRT.eu.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      try {
        await resend.emails.send({
          from: "DLinRT.eu <noreply@dlinrt.eu>",
          to: [profile.email],
          subject: `DLinRT.eu — ${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Notification Digest (${userNotifs.length} unread)`,
          html: htmlContent,
        });
        emailsSent++;
      } catch (emailErr) {
        console.error(`Failed to send digest to ${profile.email}:`, emailErr);
        emailsFailed++;
      }
    }

    console.log(`Digest complete: ${emailsSent} sent, ${emailsFailed} failed`);

    return new Response(JSON.stringify({
      success: true,
      message: `${frequency} digest sent`,
      emailsSent,
      emailsFailed,
      usersProcessed: byUser.size,
    }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (error: any) {
    console.error("Error in send-notification-digest:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
