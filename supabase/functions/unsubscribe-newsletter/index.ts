
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

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

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 requests per 5 minutes per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `unsubscribe:${ip}`;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count++;
  rateLimitStore.set(key, current);
  return true;
}

interface UnsubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter unsubscribe function called");
  
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { 
          status: 429, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    const { email }: UnsubscribeRequest = await req.json();
    
    console.log("Received unsubscribe request for:", email);

    // Validate email format
    const isValidEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValidEmail) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Initialize Supabase client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if email exists
    const { data: subscriber, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, unsubscribed_at')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching subscriber:', fetchError);
      throw new Error('Failed to process unsubscribe request');
    }

    if (!subscriber) {
      // Don't reveal if email exists or not for privacy
      console.log(`Email not found: ${normalizedEmail}`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "If this email was subscribed, it has been unsubscribed." 
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    if (subscriber.unsubscribed_at) {
      console.log(`Email already unsubscribed: ${normalizedEmail}`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "This email has already been unsubscribed." 
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Update the subscriber to mark as unsubscribed
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error updating subscriber:', updateError);
      throw new Error('Failed to unsubscribe');
    }

    console.log(`Successfully unsubscribed: ${normalizedEmail}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "You have been successfully unsubscribed from the newsletter." 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in unsubscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process unsubscribe request"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
