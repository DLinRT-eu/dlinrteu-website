import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for security
const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000"
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // Create a client with the user's token to verify identity
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // User client to verify the user's identity
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

    // Get the authenticated user
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Failed to get user:', userError?.message);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Account deletion requested for user: ${user.id} (${user.email})`);

    // Parse request body for password verification
    const { password } = await req.json();
    
    if (!password) {
      console.error('No password provided');
      return new Response(
        JSON.stringify({ error: 'Password is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Re-authenticate to verify password
    const { error: signInError } = await userClient.auth.signInWithPassword({
      email: user.email!,
      password,
    });

    if (signInError) {
      console.error('Password verification failed:', signInError.message);
      return new Response(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Password verified successfully');

    // Create admin client with service role key
    const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Log the deletion for GDPR audit (before deleting)
    const { error: auditError } = await adminClient
      .from('admin_audit_log')
      .insert({
        action_type: 'account_self_deletion',
        performed_by: user.id,
        performed_by_email: user.email!,
        target_user_id: user.id,
        target_user_email: user.email,
        details: {
          deletion_type: 'self_service',
          requested_at: new Date().toISOString(),
        }
      });

    if (auditError) {
      console.warn('Failed to log audit entry (non-blocking):', auditError.message);
    }

    // Clean up user data (cascade should handle most, but be explicit for safety)
    // Delete from profiles (this should cascade to related tables)
    const { error: profileError } = await adminClient
      .from('profiles')
      .delete()
      .eq('id', user.id);

    if (profileError) {
      console.warn('Error deleting profile (may be expected if cascade):', profileError.message);
    }

    // Delete user roles
    const { error: rolesError } = await adminClient
      .from('user_roles')
      .delete()
      .eq('user_id', user.id);

    if (rolesError) {
      console.warn('Error deleting user roles:', rolesError.message);
    }

    // Delete MFA backup codes
    const { error: mfaError } = await adminClient
      .from('mfa_backup_codes')
      .delete()
      .eq('user_id', user.id);

    if (mfaError) {
      console.warn('Error deleting MFA backup codes:', mfaError.message);
    }

    // Delete notifications
    const { error: notifError } = await adminClient
      .from('notifications')
      .delete()
      .eq('user_id', user.id);

    if (notifError) {
      console.warn('Error deleting notifications:', notifError.message);
    }

    // Delete role requests
    const { error: roleReqError } = await adminClient
      .from('role_requests')
      .delete()
      .eq('user_id', user.id);

    if (roleReqError) {
      console.warn('Error deleting role requests:', roleReqError.message);
    }

    // Delete consent audit log entries
    const { error: consentError } = await adminClient
      .from('consent_audit_log')
      .delete()
      .eq('user_id', user.id);

    if (consentError) {
      console.warn('Error deleting consent audit log:', consentError.message);
    }

    // Finally, delete the user from auth.users using admin API
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error('Failed to delete user from auth:', deleteError.message);
      return new Response(
        JSON.stringify({ error: 'Failed to delete account. Please contact support.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully deleted user: ${user.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Account deleted successfully',
        deletedAt: new Date().toISOString()
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error in delete-account:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
