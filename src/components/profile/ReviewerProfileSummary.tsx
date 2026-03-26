import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Settings, BookOpen, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ReviewerProfileSummaryProps {
  userId: string;
}

interface ExpertiseCount {
  total: number;
  categories: number;
  companies: number;
  products: number;
}

export function ReviewerProfileSummary({ userId }: ReviewerProfileSummaryProps) {
  const [expertiseCount, setExpertiseCount] = useState<ExpertiseCount>({
    total: 0,
    categories: 0,
    companies: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpertiseCount = async () => {
      try {
        const { data, error } = await supabase
          .from('reviewer_expertise')
          .select('preference_type')
          .eq('user_id', userId);

        if (error) throw error;

        const categories = data?.filter(e => e.preference_type === 'category').length || 0;
        const companies = data?.filter(e => e.preference_type === 'company').length || 0;
        const products = data?.filter(e => e.preference_type === 'product').length || 0;

        setExpertiseCount({
          total: data?.length || 0,
          categories,
          companies,
          products,
        });
      } catch (error) {
        console.error('Error fetching expertise:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertiseCount();
  }, [userId]);

  if (loading) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Reviewer Preferences
        </CardTitle>
        <CardDescription>Your expertise areas and review preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expertiseCount.total === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-2">No preferences set</p>
              <p className="text-sm text-muted-foreground mb-3">
                Set your expertise preferences to receive relevant review assignments that match your knowledge areas.
              </p>
              <Button asChild size="sm">
                <Link to="/reviewer/preferences">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Preferences
                </Link>
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Expertise Areas Configured</p>
                <div className="flex gap-2 flex-wrap">
                  {expertiseCount.categories > 0 && (
                    <Badge variant="secondary">
                      {expertiseCount.categories} {expertiseCount.categories === 1 ? 'Category' : 'Categories'}
                    </Badge>
                  )}
                  {expertiseCount.companies > 0 && (
                    <Badge variant="secondary">
                      {expertiseCount.companies} {expertiseCount.companies === 1 ? 'Company' : 'Companies'}
                    </Badge>
                  )}
                  {expertiseCount.products > 0 && (
                    <Badge variant="secondary">
                      {expertiseCount.products} {expertiseCount.products === 1 ? 'Product' : 'Products'}
                    </Badge>
                  )}
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/reviewer/preferences">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your preferences help us assign reviews that match your expertise, ensuring high-quality evaluations.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
