import { supabase } from "@/integrations/supabase/client";
import { ALL_PRODUCTS } from "@/data";

export type AssignmentAlgorithm = 'balanced' | 'random' | 'expertise-first';

// Type for RPC responses
export interface RPCResponse {
  success: boolean;
  error?: string;
  message?: string;
  [key: string]: any;
}

export interface ReviewRound {
  id: string;
  name: string;
  description?: string;
  round_number: number;
  status: 'draft' | 'active' | 'completed' | 'archived';
  start_date: string;
  end_date?: string;
  default_deadline?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  total_products: number;
  total_assignments: number;
}

export interface ReviewRoundStats {
  id: string;
  round_id: string;
  total_assignments: number;
  completed_count: number;
  in_progress_count: number;
  pending_count: number;
  updated_at: string;
}

export interface ReviewerExpertise {
  user_id: string;
  preference_type: 'category' | 'company' | 'product';
  category?: string;
  company_id?: string;
  product_id?: string;
  priority: number;
  notes?: string;
}

export interface ReviewerWithExpertise {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  expertise: ReviewerExpertise[];
  current_workload: number;
}

export async function createReviewRound(roundData: {
  name: string;
  description?: string;
  round_number: number;
  start_date: string;
  end_date?: string;
  default_deadline?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  
  console.log('[createReviewRound] Attempting to insert:', {
    ...roundData,
    created_by: user?.id,
    status: 'draft'
  });
  
  const { data, error } = await supabase
    .from('review_rounds')
    .insert({
      ...roundData,
      created_by: user?.id,
      status: 'draft'
    })
    .select()
    .single();

  if (error) {
    console.error('[createReviewRound] Insert error:', error);
    throw error;
  }
  
  console.log('[createReviewRound] Success:', data);
  return data as ReviewRound;
}

export async function getReviewersByExpertise(category?: string): Promise<ReviewerWithExpertise[]> {
  const { data: reviewerRoles, error: rolesError } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('role', 'reviewer');

  if (rolesError) throw rolesError;
  if (!reviewerRoles || reviewerRoles.length === 0) return [];

  const reviewerIds = reviewerRoles.map(r => r.user_id);

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name')
    .in('id', reviewerIds);

  if (profilesError) throw profilesError;

  const { data: expertise, error: expertiseError } = await supabase
    .from('reviewer_expertise')
    .select('*')
    .in('user_id', reviewerIds);

  if (expertiseError) throw expertiseError;

  const { data: reviews, error: reviewsError } = await supabase
    .from('product_reviews')
    .select('assigned_to')
    .in('assigned_to', reviewerIds)
    .in('status', ['pending', 'in_progress']);

  if (reviewsError) throw reviewsError;

  const reviewers: ReviewerWithExpertise[] = profiles.map(profile => {
    const userExpertise = (expertise?.filter(e => e.user_id === profile.id) || []) as ReviewerExpertise[];
    const workload = reviews?.filter(r => r.assigned_to === profile.id).length || 0;

    return {
      user_id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      expertise: userExpertise,
      current_workload: workload
    };
  });

  if (category) {
    return reviewers.filter(r => 
      r.expertise.some(e => e.preference_type === 'category' && e.category === category)
    );
  }

  return reviewers;
}

export function calculateReviewerWorkload(
  reviewers: ReviewerWithExpertise[],
  totalProducts: number
): Map<string, number> {
  const workloadMap = new Map<string, number>();
  
  if (reviewers.length === 0) return workloadMap;

  const baseAllocation = Math.floor(totalProducts / reviewers.length);
  const remainder = totalProducts % reviewers.length;

  const sortedReviewers = [...reviewers].sort((a, b) => 
    a.current_workload - b.current_workload
  );

  sortedReviewers.forEach((reviewer, index) => {
    let allocation = baseAllocation;
    
    if (index < remainder) {
      allocation += 1;
    }
    
    workloadMap.set(reviewer.user_id, allocation);
  });

  return workloadMap;
}

/**
 * Calculate match score for a product-reviewer pair
 */
function calculateMatchScore(product: any, expertise: ReviewerExpertise[]): number {
  let score = 0;

  // Product match (100 points)
  const productMatch = expertise.find(e => 
    e.preference_type === 'product' && e.product_id === product.id
  );
  if (productMatch) {
    score += 100;
  }

  // Company match (50 points)
  const companyMatch = expertise.find(e => 
    e.preference_type === 'company' && 
    e.company_id === product.company.toLowerCase().replace(/\s+/g, '-')
  );
  if (companyMatch) {
    score += 50;
  }

  // Category match (10 points)
  const categoryMatch = expertise.find(e => 
    e.preference_type === 'category' && e.category === product.category
  );
  if (categoryMatch) {
    score += 10;
  }

  return score;
}

/**
 * Calculate proposed assignments with algorithm selection
 */
export async function calculateProposedAssignments(
  productIds: string[],
  selectedReviewerIds?: string[],
  algorithm: AssignmentAlgorithm = 'balanced'
): Promise<Array<{ product_id: string; assigned_to: string; match_score: number }>> {
  let reviewers = await getReviewersByExpertise();
  
  if (selectedReviewerIds && selectedReviewerIds.length > 0) {
    reviewers = reviewers.filter(r => selectedReviewerIds.includes(r.user_id));
  }
  
  if (reviewers.length === 0) {
    throw new Error('No reviewers available for assignment');
  }

  const products = ALL_PRODUCTS.filter(p => productIds.includes(p.id))
    .map(p => ({
      id: p.id,
      name: p.name,
      company: p.company,
      category: p.category
    }));

  const productsMap = new Map(products.map(p => [p.id, p]));

  // Route to algorithm
  if (algorithm === 'random') {
    return calculateRandomAssignments(products, reviewers);
  } else if (algorithm === 'expertise-first') {
    return calculateExpertiseFirstAssignments(products, reviewers, productsMap);
  } else {
    return calculateBalancedAssignments(products, reviewers, productsMap);
  }
}

/**
 * Pure random assignment - ignores expertise
 */
function calculateRandomAssignments(
  products: any[],
  reviewers: ReviewerWithExpertise[]
): Array<{ product_id: string; assigned_to: string; match_score: number }> {
  const assignments: Array<{ product_id: string; assigned_to: string; match_score: number }> = [];
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
  
  shuffledProducts.forEach((product, index) => {
    const reviewer = reviewers[index % reviewers.length];
    assignments.push({
      product_id: product.id,
      assigned_to: reviewer.user_id,
      match_score: 0,
    });
  });
  
  return assignments;
}

/**
 * Expertise-first assignment (legacy)
 */
function calculateExpertiseFirstAssignments(
  products: any[],
  reviewers: ReviewerWithExpertise[],
  productsMap: Map<string, any>
): Array<{ product_id: string; assigned_to: string; match_score: number }> {
  const scoredPairs: Array<{
    productId: string;
    reviewerId: string;
    score: number;
  }> = [];

  for (const product of products) {
    for (const reviewer of reviewers) {
      const score = calculateMatchScore(product, reviewer.expertise);
      scoredPairs.push({
        productId: product.id,
        reviewerId: reviewer.user_id,
        score,
      });
    }
  }

  scoredPairs.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const workloadA = reviewers.find(r => r.user_id === a.reviewerId)?.current_workload || 0;
    const workloadB = reviewers.find(r => r.user_id === b.reviewerId)?.current_workload || 0;
    return workloadA - workloadB;
  });

  const assignments: Array<{ product_id: string; assigned_to: string; match_score: number }> = [];
  const assignedProducts = new Set<string>();
  const reviewerWorkload = new Map<string, number>();
  
  reviewers.forEach(r => reviewerWorkload.set(r.user_id, r.current_workload));

  for (const pair of scoredPairs) {
    if (assignedProducts.has(pair.productId)) continue;
    
    assignments.push({
      product_id: pair.productId,
      assigned_to: pair.reviewerId,
      match_score: pair.score,
    });
    
    assignedProducts.add(pair.productId);
    reviewerWorkload.set(
      pair.reviewerId,
      (reviewerWorkload.get(pair.reviewerId) || 0) + 1
    );
  }

  return assignments;
}

/**
 * Balanced assignment with preferences and task grouping
 */
function calculateBalancedAssignments(
  products: any[],
  reviewers: ReviewerWithExpertise[],
  productsMap: Map<string, any>
): Array<{ product_id: string; assigned_to: string; match_score: number }> {
  const assignments: Array<{ product_id: string; assigned_to: string; match_score: number }> = [];
  const remainingProducts = new Set(products.map(p => p.id));
  
  const targetPerReviewer = Math.floor(products.length / reviewers.length);
  const remainder = products.length % reviewers.length;
  
  const reviewerAllocations = new Map<string, number>();
  const reviewerAssignedCategories = new Map<string, Set<string>>();
  const reviewerAssignments = new Map<string, number>();
  
  reviewers.forEach((reviewer, index) => {
    const allocation = targetPerReviewer + (index < remainder ? 1 : 0);
    reviewerAllocations.set(reviewer.user_id, allocation);
    reviewerAssignments.set(reviewer.user_id, 0);
    reviewerAssignedCategories.set(reviewer.user_id, new Set());
  });
  
  const hasExpertise = (reviewer: ReviewerWithExpertise) => {
    return reviewer.expertise.length > 0;
  };
  
  const calculateTaskGroupScore = (product: any, reviewerId: string): number => {
    const assignedCategories = reviewerAssignedCategories.get(reviewerId);
    if (!assignedCategories || assignedCategories.size === 0) {
      return 0;
    }
    
    if (assignedCategories.has(product.category)) {
      return 10;
    }
    return 0;
  };
  
  const maxRounds = Math.max(...Array.from(reviewerAllocations.values()));
  
  for (let round = 0; round < maxRounds; round++) {
    const shuffledReviewers = [...reviewers].sort(() => Math.random() - 0.5);
    
    for (const reviewer of shuffledReviewers) {
      const currentAssignments = reviewerAssignments.get(reviewer.user_id) || 0;
      const targetAllocation = reviewerAllocations.get(reviewer.user_id) || 0;
      
      if (currentAssignments >= targetAllocation) continue;
      if (remainingProducts.size === 0) break;
      
      let bestProduct: string | null = null;
      let bestScore = -1;
      
      for (const productId of remainingProducts) {
        const product = productsMap.get(productId);
        if (!product) continue;
        
        let score: number;
        
        if (hasExpertise(reviewer)) {
          score = calculateMatchScore(product, reviewer.expertise);
        } else {
          score = calculateTaskGroupScore(product, reviewer.user_id);
        }
        
        score += Math.random() * 0.1;
        
        if (score > bestScore) {
          bestScore = score;
          bestProduct = productId;
        }
      }
      
      if (bestProduct) {
        const product = productsMap.get(bestProduct);
        
        assignments.push({
          product_id: bestProduct,
          assigned_to: reviewer.user_id,
          match_score: Math.floor(bestScore),
        });
        
        remainingProducts.delete(bestProduct);
        reviewerAssignments.set(reviewer.user_id, currentAssignments + 1);
        
        if (product?.category) {
          reviewerAssignedCategories.get(reviewer.user_id)?.add(product.category);
        }
      }
    }
  }
  
  return assignments;
}

export async function bulkAssignProducts(
  roundId: string,
  productIds: string[],
  deadline?: string,
  proposedAssignments?: Array<{ product_id: string; assigned_to: string; match_score: number }>
): Promise<{ success: number; failed: number; errors: string[] }> {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    let assignments;
    
    if (proposedAssignments && proposedAssignments.length > 0) {
      assignments = proposedAssignments.map(pa => ({
        product_id: pa.product_id,
        assigned_to: pa.assigned_to,
        review_round_id: roundId,
        status: 'pending' as const,
        priority: 'medium' as const,
        deadline: deadline || null
      }));
    } else {
      const proposed = await calculateProposedAssignments(productIds);
      assignments = proposed.map(pa => ({
        product_id: pa.product_id,
        assigned_to: pa.assigned_to,
        review_round_id: roundId,
        status: 'pending' as const,
        priority: 'medium' as const,
        deadline: deadline || null
      }));
    }

    const { error: insertError } = await supabase
      .from('product_reviews')
      .insert(assignments);

    if (insertError) throw insertError;

    success = assignments.length;

    const historyRecords = assignments.map(a => ({
      review_round_id: roundId,
      product_id: a.product_id,
      assigned_to: a.assigned_to,
      changed_by: user.id,
      change_type: 'initial' as const,
      reason: 'Automatic assignment during round start'
    }));

    const { error: historyError } = await supabase
      .from('assignment_history')
      .insert(historyRecords);

    if (historyError) {
      console.error('Error creating assignment history:', historyError);
    }

    const { data: round } = await supabase
      .from('review_rounds')
      .select('name')
      .eq('id', roundId)
      .single();

    const assignmentsByReviewer = new Map<string, string[]>();
    assignments.forEach(a => {
      const products = assignmentsByReviewer.get(a.assigned_to) || [];
      products.push(a.product_id);
      assignmentsByReviewer.set(a.assigned_to, products);
    });

    const notificationPromises = Array.from(assignmentsByReviewer.entries()).map(
      async ([reviewerId, productIds]) => {
        try {
          const productNames = productIds
            .map(id => ALL_PRODUCTS.find(p => p.id === id)?.name)
            .filter(Boolean) as string[];

          await supabase.functions.invoke('notify-reviewer-assignment', {
            body: {
              reviewerId,
              roundName: round?.name || 'Review Round',
              assignmentCount: productIds.length,
              deadline: deadline || null,
              productNames
            }
          });
        } catch (error) {
          console.error(`Failed to send notification to reviewer ${reviewerId}:`, error);
        }
      }
    );

    Promise.all(notificationPromises).catch(err => 
      console.error('Some notifications failed:', err)
    );

    await supabase
      .from('review_rounds')
      .update({
        total_products: productIds.length,
        total_assignments: assignments.length
      })
      .eq('id', roundId);

  } catch (error) {
    console.error('Bulk assignment error:', error);
    errors.push(error instanceof Error ? error.message : 'Unknown error');
    failed = productIds.length - success;
  }

  return { success, failed, errors };
}

export async function getRoundStatistics(roundId: string): Promise<ReviewRoundStats | null> {
  const { data, error } = await supabase
    .from('review_round_stats')
    .select('*')
    .eq('round_id', roundId)
    .single();

  if (error) {
    console.error('Error fetching round stats:', error);
    return null;
  }

  return data;
}

export async function updateProductReviewAdmin(
  reviewId: string,
  updates: {
    status?: string;
    priority?: string;
    deadline?: string;
    notes?: string;
  }
): Promise<RPCResponse> {
  const { data, error } = await supabase.rpc('update_product_review_admin', {
    p_review_id: reviewId,
    p_status: updates.status,
    p_priority: updates.priority,
    p_deadline: updates.deadline,
    p_notes: updates.notes
  });

  if (error) throw error;
  return data as RPCResponse;
}

export async function reassignProductReviewAdmin(
  reviewId: string,
  newReviewerId: string,
  reason?: string
): Promise<RPCResponse> {
  const { data, error } = await supabase.rpc('reassign_product_review_admin', {
    p_review_id: reviewId,
    p_new_reviewer_id: newReviewerId,
    p_reason: reason
  });

  if (error) throw error;
  return data as RPCResponse;
}

export async function removeProductReviewAdmin(
  reviewId: string,
  reason?: string
): Promise<RPCResponse> {
  const { data, error } = await supabase.rpc('remove_product_review_admin', {
    p_review_id: reviewId,
    p_reason: reason
  });

  if (error) throw error;
  return data as RPCResponse;
}

export async function updateRoundStatusAdmin(
  roundId: string,
  status: string
): Promise<RPCResponse> {
  const { data, error } = await supabase.rpc('update_round_status_admin', {
    p_round_id: roundId,
    p_status: status
  });

  if (error) throw error;
  return data as RPCResponse;
}

export async function cloneReviewRoundAdmin(
  sourceRoundId: string,
  newName: string,
  startDate?: string,
  description?: string,
  defaultDeadline?: string
): Promise<RPCResponse> {
  const { data, error } = await supabase.rpc('clone_review_round_admin', {
    p_source_round_id: sourceRoundId,
    p_new_name: newName,
    p_start_date: startDate,
    p_description: description,
    p_default_deadline: defaultDeadline
  });

  if (error) throw error;
  return data as RPCResponse;
}

export async function updateRoundStatus(roundId: string, status: string) {
  const { error } = await supabase
    .from('review_rounds')
    .update({ status })
    .eq('id', roundId);

  if (error) throw error;
}
