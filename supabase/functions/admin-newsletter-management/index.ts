import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create client with service role for RLS bypass
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create client with user's auth to verify admin role
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated and get user info
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify admin role using service role client
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin');

    if (rolesError || !roles || roles.length === 0) {
      console.error('User is not admin:', user.id);
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Admin ${user.email} performing newsletter management operation`);

    const method = req.method;

    if (method === 'GET') {
      // List subscribers with optional filters
      const url = new URL(req.url);
      const search = url.searchParams.get('search') || '';
      const status = url.searchParams.get('status') || 'all';
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const offset = (page - 1) * limit;

      let query = supabaseAdmin
        .from('newsletter_subscribers')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (search) {
        query = query.or(`email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
      }

      // Apply status filter
      if (status === 'active') {
        query = query.is('unsubscribed_at', null);
      } else if (status === 'unsubscribed') {
        query = query.not('unsubscribed_at', 'is', null);
      }

      // Order and paginate
      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data: subscribers, error, count } = await query;

      if (error) {
        console.error('Error fetching subscribers:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch subscribers' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get stats
      const { count: totalCount } = await supabaseAdmin
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true });

      const { count: activeCount } = await supabaseAdmin
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .is('unsubscribed_at', null);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: recentCount } = await supabaseAdmin
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      return new Response(
        JSON.stringify({
          subscribers,
          total: count,
          page,
          totalPages: Math.ceil((count || 0) / limit),
          stats: {
            total: totalCount || 0,
            active: activeCount || 0,
            unsubscribed: (totalCount || 0) - (activeCount || 0),
            recent: recentCount || 0
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (method === 'POST') {
      // Add new subscriber
      const body = await req.json();
      const { email, firstName, lastName, consentGiven } = body;

      if (!email || !firstName || !lastName) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields: email, firstName, lastName' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if email already exists
      const { data: existing } = await supabaseAdmin
        .from('newsletter_subscribers')
        .select('id, unsubscribed_at')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (existing) {
        if (existing.unsubscribed_at) {
          // Resubscribe
          const { data: updated, error: updateError } = await supabaseAdmin
            .from('newsletter_subscribers')
            .update({
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              consent_given: consentGiven === true,
              unsubscribed_at: null,
              updated_at: new Date().toISOString()
            })
            .eq('id', existing.id)
            .select()
            .single();

          if (updateError) {
            console.error('Error resubscribing:', updateError);
            return new Response(
              JSON.stringify({ error: 'Failed to resubscribe' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          // Log action
          await supabaseAdmin.from('admin_audit_log').insert({
            performed_by: user.id,
            performed_by_email: user.email || 'unknown',
            action_type: 'newsletter_resubscribe',
            details: { email: email.toLowerCase().trim(), subscriber_id: existing.id }
          });

          return new Response(
            JSON.stringify({ success: true, subscriber: updated, action: 'resubscribed' }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } else {
          return new Response(
            JSON.stringify({ error: 'Email already subscribed' }),
            { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      // Insert new subscriber
      const { data: subscriber, error: insertError } = await supabaseAdmin
        .from('newsletter_subscribers')
        .insert({
          email: email.toLowerCase().trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          consent_given: consentGiven === true
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error adding subscriber:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to add subscriber' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Log action
      await supabaseAdmin.from('admin_audit_log').insert({
        performed_by: user.id,
        performed_by_email: user.email || 'unknown',
        action_type: 'newsletter_add',
        details: { email: email.toLowerCase().trim(), subscriber_id: subscriber.id }
      });

      console.log(`Added newsletter subscriber: ${email}`);

      return new Response(
        JSON.stringify({ success: true, subscriber, action: 'added' }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (method === 'DELETE') {
      // Remove subscriber
      const body = await req.json();
      const { id } = body;

      if (!id) {
        return new Response(
          JSON.stringify({ error: 'Missing subscriber id' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get subscriber info for audit log
      const { data: subscriber } = await supabaseAdmin
        .from('newsletter_subscribers')
        .select('email')
        .eq('id', id)
        .single();

      const { error: deleteError } = await supabaseAdmin
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting subscriber:', deleteError);
        return new Response(
          JSON.stringify({ error: 'Failed to delete subscriber' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Log action
      await supabaseAdmin.from('admin_audit_log').insert({
        performed_by: user.id,
        performed_by_email: user.email || 'unknown',
        action_type: 'newsletter_delete',
        details: { subscriber_id: id, email: subscriber?.email }
      });

      console.log(`Deleted newsletter subscriber: ${subscriber?.email}`);

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (method === 'PATCH') {
      // Resubscribe or update subscriber
      const body = await req.json();
      const { id, action } = body;

      if (!id) {
        return new Response(
          JSON.stringify({ error: 'Missing subscriber id' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (action === 'resubscribe') {
        const { data: subscriber, error: updateError } = await supabaseAdmin
          .from('newsletter_subscribers')
          .update({
            unsubscribed_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (updateError) {
          console.error('Error resubscribing:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to resubscribe' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Log action
        await supabaseAdmin.from('admin_audit_log').insert({
          performed_by: user.id,
          performed_by_email: user.email || 'unknown',
          action_type: 'newsletter_resubscribe',
          details: { subscriber_id: id, email: subscriber?.email }
        });

        console.log(`Resubscribed newsletter subscriber: ${subscriber?.email}`);

        return new Response(
          JSON.stringify({ success: true, subscriber }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Newsletter management error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
