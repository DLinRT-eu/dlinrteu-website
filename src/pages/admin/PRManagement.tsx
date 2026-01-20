import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoles } from '@/contexts/RoleContext';
import SEO from '@/components/SEO';
import PageLayout from '@/components/layout/PageLayout';
import PRDashboard from '@/components/admin/PRManagement/PRDashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github } from 'lucide-react';

export default function PRManagement() {
  const navigate = useNavigate();
  const { isAdmin } = useRoles();

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <SEO
        title="PR Management | Admin | DLinRT.eu"
        description="Manage GitHub pull requests for the DLinRT website"
      />
      <PageLayout>
        <div className="container mx-auto py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Github className="h-8 w-8" />
                GitHub PR Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Review and prioritize open pull requests from the DLinRT website repository
              </p>
            </div>
          </div>

          {/* Dashboard */}
          <PRDashboard />
        </div>
      </PageLayout>
    </>
  );
}
