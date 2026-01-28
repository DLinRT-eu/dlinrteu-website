import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create clients
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    // User client to verify the caller's identity and admin status
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Service role client for actual deletion
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authenticated user
    const { data: { user: callerUser }, error: authError } = await userClient.auth.getUser();
    if (authError || !callerUser) {
      console.error('Authentication failed:', authError);
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin delete request from user:', callerUser.id);

    // Verify caller is admin using database function
    const { data: isAdmin, error: adminCheckError } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', callerUser.id)
      .eq('role', 'admin')
      .single();

    if (adminCheckError || !isAdmin) {
      console.error('Admin check failed:', adminCheckError);
      return new Response(
        JSON.stringify({ error: 'Access denied: admin role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return new Response(
        JSON.stringify({ error: 'Target user ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prevent self-deletion through admin interface
    if (targetUserId === callerUser.id) {
      return new Response(
        JSON.stringify({ error: 'Cannot delete your own account through admin interface' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Deleting user:', targetUserId);

    // Get target user info for logging
    const { data: targetProfile } = await adminClient
      .from('profiles')
      .select('email, first_name, last_name')
      .eq('id', targetUserId)
      .single();

    const targetEmail = targetProfile?.email || 'unknown';
    const targetName = targetProfile ? `${targetProfile.first_name} ${targetProfile.last_name}` : 'unknown';

    // Delete related data in order (respecting foreign key constraints)
    const tablesToClean = [
      'mfa_backup_codes',
      'mfa_activity_log',
      'notifications',
      'role_requests',
      'user_roles',
      'consent_audit_log',
      'user_registration_notifications',
      'reviewer_expertise',
      'company_representatives',
      'user_products',
      'profile_documents',
      'profile_document_access_log',
    ];

    for (const table of tablesToClean) {
      const { error: cleanError } = await adminClient
        .from(table)
        .delete()
        .eq('user_id', targetUserId);
      
      if (cleanError) {
        console.log(`Note: Could not clean ${table}:`, cleanError.message);
        // Continue anyway - some tables might not have data for this user
      }
    }

    // Delete profile
    const { error: profileError } = await adminClient
      .from('profiles')
      .delete()
      .eq('id', targetUserId);

    if (profileError) {
      console.error('Error deleting profile:', profileError);
      // Continue - the auth user deletion is most important
    }

    // Log the admin action before deletion
    const { error: logError } = await adminClient
      .from('admin_audit_log')
      .insert({
        action_type: 'admin_user_deletion',
        performed_by: callerUser.id,
        performed_by_email: callerUser.email,
        target_user_id: targetUserId,
        target_user_email: targetEmail,
        details: {
          target_name: targetName,
          deleted_at: new Date().toISOString(),
          method: 'admin_delete_user_edge_function'
        }
      });

    if (logError) {
      console.error('Error logging admin action:', logError);
      // Continue with deletion
    }

    // Delete the auth user using service role
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(targetUserId);

    if (deleteError) {
      console.error('Error deleting auth user:', deleteError);
      return new Response(
        JSON.stringify({ error: `Failed to delete user: ${deleteError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User deleted successfully:', targetUserId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `User ${targetEmail} has been permanently deleted` 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error in admin-delete-user:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
