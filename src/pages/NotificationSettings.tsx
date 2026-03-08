import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import NotificationPreferences from '@/components/notifications/NotificationPreferences';

export default function NotificationSettings() {
  return (
    <PageLayout>
      <div className="container max-w-3xl py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/notifications">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Notifications
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Notification Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure how and when you receive notifications
          </p>
        </div>

        <NotificationPreferences />
      </div>
    </PageLayout>
  );
}
