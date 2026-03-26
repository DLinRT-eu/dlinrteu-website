import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Mail, Linkedin, Info, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserRelationship {
  id: string;
  product_id: string;
  user_id: string;
  adoption_date: string | null;
  institution: string | null;
  department: string | null;
  relationship_status: string;
  relationship_status_other: string | null;
  experience_notes: string | null;
  use_case: string | null;
  contact_preference: 'email' | 'linkedin' | 'no_contact';
  first_name: string;
  last_name: string;
  email: string;
  linkedin_url: string | null;
  specialization: string | null;
}

interface UserRelationshipsProps {
  productId: string;
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  currently_using: 'Currently Using',
  previously_used: 'Previously Used',
  evaluating: 'Evaluating',
  planning_to_adopt: 'Planning to Adopt',
  owns: 'Owns',
  other: 'Other'
};

export default function UserRelationships({ productId }: UserRelationshipsProps) {
  const { user } = useAuth();
  const [relationships, setRelationships] = useState<UserRelationship[]>([]);
  const [myRelationship, setMyRelationship] = useState<UserRelationship | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRelationships();
    } else {
      setLoading(false);
    }
  }, [user, productId]);

  const fetchRelationships = async () => {
    if (!productId) return;

    // Fetch my relationship (if any)
    if (user) {
      const { data: myData } = await supabase
        .from('user_products')
        .select('*')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (myData) {
        setMyRelationship(myData as any);
      }
    }

    // Fetch shared relationships from other users
    const { data, error } = await supabase
      .from('user_product_experiences')
      .select('*')
      .eq('product_id', productId);

    if (!error && data) {
      // Filter out my own relationship from the shared list
      const othersRelationships = user 
        ? data.filter((r: any) => r.user_id !== user.id)
        : data;
      setRelationships(othersRelationships as UserRelationship[]);
    }
    setLoading(false);
  };

  if (!user) {
    return null; // Don't show for non-logged-in users
  }

  if (loading) {
    return null;
  }

  const totalUsers = relationships.length + (myRelationship ? 1 : 0);

  if (totalUsers === 0) {
    return null; // Don't show if no one has a relationship with this product
  }

  const formatRelationshipStatus = (status: string, other: string | null) => {
    if (status === 'other' && other) {
      return other;
    }
    return RELATIONSHIP_LABELS[status] || status.replace(/_/g, ' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community Experience
        </CardTitle>
        <CardDescription>
          {totalUsers} {totalUsers === 1 ? 'user has' : 'users have'} registered their relationship with this product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* My Relationship */}
        {myRelationship && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600">You</Badge>
              <Badge variant="outline">
                {formatRelationshipStatus(myRelationship.relationship_status, myRelationship.relationship_status_other)}
              </Badge>
            </div>
            {myRelationship.adoption_date && (
              <p className="text-sm text-muted-foreground">
                Since {new Date(myRelationship.adoption_date).toLocaleDateString()}
              </p>
            )}
            <Button asChild size="sm" variant="link" className="px-0 h-auto mt-2">
              <Link to="/my-products">
                Edit my relationship
              </Link>
            </Button>
          </div>
        )}

        {/* Other Users' Relationships */}
        {relationships.length > 0 && (
          <>
            <div className="space-y-3">
              {relationships.slice(0, expanded ? undefined : 3).map((rel) => (
                <div key={rel.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-sm">
                          {rel.first_name} {rel.last_name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {formatRelationshipStatus(rel.relationship_status, rel.relationship_status_other)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {rel.institution || 'Institution not specified'}
                        {rel.department && ` • ${rel.department}`}
                      </p>
                      {rel.adoption_date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Since {new Date(rel.adoption_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {rel.contact_preference !== 'no_contact' && (
                      <div className="flex gap-1">
                        {rel.contact_preference === 'email' && (
                          <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <a href={`mailto:${rel.email}`} title="Send email">
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {rel.contact_preference === 'linkedin' && rel.linkedin_url && (
                          <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <a href={rel.linkedin_url} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  {rel.use_case && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      <span className="font-medium">Use case:</span> {rel.use_case}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {relationships.length > 3 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setExpanded(!expanded)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {expanded ? 'Show Less' : `Show ${relationships.length - 3} More`}
              </Button>
            )}

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Users have explicitly consented to share this information. Contact them to learn more about their experience.
              </AlertDescription>
            </Alert>
          </>
        )}

        {!myRelationship && (
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link to="/my-products">
              Add this product to my list
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
