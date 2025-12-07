import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DuplicateInfo {
  productId: string;
  reviewRoundId: string;
  keepingId: string;
  deletingIds: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify caller is admin
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check admin role
    const { data: roles, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (roleError || !roles) {
      console.error('Role check failed:', roleError)
      return new Response(
        JSON.stringify({ error: 'Admin access required' }), 
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const body = await req.json().catch(() => ({}))
    const execute = body.execute === true

    console.log(`[Cleanup] Starting duplicate review cleanup (execute: ${execute})`)

    // Find duplicate product_reviews: same product_id AND review_round_id with multiple entries
    const { data: allReviews, error: reviewsError } = await supabaseAdmin
      .from('product_reviews')
      .select('id, product_id, review_round_id, created_at, assigned_to')
      .order('created_at', { ascending: true })

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError)
      throw new Error(`Failed to fetch reviews: ${reviewsError.message}`)
    }

    // Group by product_id + review_round_id
    const groupedReviews = new Map<string, typeof allReviews>()
    
    for (const review of allReviews || []) {
      const key = `${review.product_id}|${review.review_round_id || 'null'}`
      if (!groupedReviews.has(key)) {
        groupedReviews.set(key, [])
      }
      groupedReviews.get(key)!.push(review)
    }

    // Find duplicates (groups with more than 1 entry)
    const duplicates: DuplicateInfo[] = []
    const reviewsToDelete: string[] = []

    for (const [key, reviews] of groupedReviews) {
      if (reviews.length > 1) {
        // Sort by created_at ascending, keep the first one (oldest)
        reviews.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        
        const [keep, ...toDelete] = reviews
        const deleteIds = toDelete.map(r => r.id)
        
        duplicates.push({
          productId: keep.product_id,
          reviewRoundId: keep.review_round_id || 'null',
          keepingId: keep.id,
          deletingIds: deleteIds
        })
        
        reviewsToDelete.push(...deleteIds)
      }
    }

    console.log(`[Cleanup] Found ${duplicates.length} products with duplicates, ${reviewsToDelete.length} reviews to delete`)

    let deletedCount = 0

    if (execute && reviewsToDelete.length > 0) {
      console.log('[Cleanup] Executing deletion...')
      
      // Delete related records first (cascading)
      // 1. Delete review_checklist_items for these reviews
      const { error: checklistError } = await supabaseAdmin
        .from('review_checklist_items')
        .delete()
        .in('review_id', reviewsToDelete)

      if (checklistError) {
        console.warn('[Cleanup] Error deleting checklist items:', checklistError)
      }

      // 2. Delete review_comments for these reviews
      const { error: commentsError } = await supabaseAdmin
        .from('review_comments')
        .delete()
        .in('review_id', reviewsToDelete)

      if (commentsError) {
        console.warn('[Cleanup] Error deleting comments:', commentsError)
      }

      // 3. Delete github_file_checks for these reviews
      const { error: githubError } = await supabaseAdmin
        .from('github_file_checks')
        .delete()
        .in('review_id', reviewsToDelete)

      if (githubError) {
        console.warn('[Cleanup] Error deleting github checks:', githubError)
      }

      // 4. Delete the duplicate product_reviews
      const { data: deleted, error: deleteError } = await supabaseAdmin
        .from('product_reviews')
        .delete()
        .in('id', reviewsToDelete)
        .select('id')

      if (deleteError) {
        console.error('[Cleanup] Error deleting reviews:', deleteError)
        throw new Error(`Failed to delete reviews: ${deleteError.message}`)
      }

      deletedCount = deleted?.length || 0
      console.log(`[Cleanup] Successfully deleted ${deletedCount} duplicate reviews`)

      // 5. Update review_round statistics
      const affectedRoundIds = [...new Set(duplicates.map(d => d.reviewRoundId).filter(id => id !== 'null'))]
      
      for (const roundId of affectedRoundIds) {
        // Count remaining assignments for this round
        const { count } = await supabaseAdmin
          .from('product_reviews')
          .select('id', { count: 'exact', head: true })
          .eq('review_round_id', roundId)

        // Update the round's total_assignments
        await supabaseAdmin
          .from('review_rounds')
          .update({ 
            total_assignments: count || 0,
            updated_at: new Date().toISOString()
          })
          .eq('id', roundId)
      }

      // 6. Log to admin_audit_log
      await supabaseAdmin
        .from('admin_audit_log')
        .insert({
          action_type: 'cleanup_duplicate_reviews',
          performed_by: user.id,
          performed_by_email: user.email || 'unknown',
          details: {
            duplicateProductsCount: duplicates.length,
            deletedReviewsCount: deletedCount,
            affectedRoundIds
          }
        })
    }

    const report = {
      success: true,
      dryRun: !execute,
      totalReviews: allReviews?.length || 0,
      duplicateProducts: duplicates.length,
      reviewsToDelete: reviewsToDelete.length,
      reviewsAfterCleanup: (allReviews?.length || 0) - (execute ? deletedCount : reviewsToDelete.length),
      deletedCount: execute ? deletedCount : 0,
      details: duplicates.slice(0, 20) // Limit details to first 20 for response size
    }

    console.log('[Cleanup] Completed:', report)

    return new Response(
      JSON.stringify(report),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[Cleanup] Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
