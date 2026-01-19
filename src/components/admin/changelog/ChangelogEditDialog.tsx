import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Eye, Save, X, Sparkles, TrendingUp, Bug, FileText, Shield } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getCategoryLabel, getCategoryColor, type ChangelogCategory } from '@/data/changelog';

interface ChangelogEntry {
  id: string;
  entry_id: string;
  version: string;
  date: string;
  category: ChangelogCategory;
  title: string;
  description: string;
  details: string | null;
  author: string | null;
  status: 'draft' | 'pending' | 'published' | 'archived';
  auto_generated: boolean;
  github_data: any;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ChangelogEditDialogProps {
  entry: ChangelogEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES: ChangelogCategory[] = ['feature', 'improvement', 'bugfix', 'documentation', 'security'];

const getCategoryIcon = (category: ChangelogCategory) => {
  const icons = {
    feature: Sparkles,
    improvement: TrendingUp,
    bugfix: Bug,
    documentation: FileText,
    security: Shield,
  };
  const Icon = icons[category];
  return <Icon className="h-4 w-4" />;
};

export function ChangelogEditDialog({ entry, open, onOpenChange }: ChangelogEditDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>('edit');

  // Form state
  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('');
  const [category, setCategory] = useState<ChangelogCategory>('feature');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [author, setAuthor] = useState('');

  // Reset form when entry changes
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setVersion(entry.version);
      setCategory(entry.category);
      setDescription(entry.description);
      setDetails(entry.details || '');
      setAuthor(entry.author || '');
      setActiveTab('edit');
    }
  }, [entry]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!entry) return;
      
      const { error } = await supabase
        .from('changelog_entries')
        .update({
          title,
          version,
          category,
          description,
          details: details || null,
          author: author || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', entry.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog-entries-admin'] });
      toast({
        title: 'Entry Updated',
        description: 'The changelog entry has been saved.',
      });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Save and publish mutation
  const saveAndPublishMutation = useMutation({
    mutationFn: async () => {
      if (!entry) return;
      
      const { error } = await supabase
        .from('changelog_entries')
        .update({
          title,
          version,
          category,
          description,
          details: details || null,
          author: author || null,
          status: 'published',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', entry.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog-entries-admin'] });
      toast({
        title: 'Entry Published',
        description: 'The changelog entry has been saved and published.',
      });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (!entry) return null;

  const isPending = saveMutation.isPending || saveAndPublishMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Changelog Entry
            {entry.auto_generated && (
              <Badge variant="outline" className="text-xs font-normal">
                AI Generated
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Review and refine the changelog content before publishing. Use the preview tab to see how it will look.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">
              <FileText className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="flex-1 overflow-auto space-y-4 mt-4">
            {/* Basic Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="e.g., December 2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as ChangelogCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(cat)}
                          {getCategoryLabel(cat)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author (optional)</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., DLinRT Team"
                />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Release title..."
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description
                <span className="text-muted-foreground font-normal ml-2">
                  (One-liner summary for the changelog list)
                </span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of the changes..."
                rows={2}
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label htmlFor="details">
                Details
                <span className="text-muted-foreground font-normal ml-2">
                  (Markdown supported - full release notes)
                </span>
              </Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="## 🚀 New Features&#10;- Feature 1&#10;- Feature 2&#10;&#10;## ✨ Improvements&#10;- Improvement 1"
                rows={15}
                className="font-mono text-sm"
              />
            </div>

            {/* GitHub data info */}
            {entry.github_data?.commitsByCategory && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <Label className="text-xs text-muted-foreground">Source Commit Data</Label>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>Features: {entry.github_data.commitsByCategory.feature || 0}</span>
                  <span>Improvements: {entry.github_data.commitsByCategory.improvement || 0}</span>
                  <span>Bug Fixes: {entry.github_data.commitsByCategory.bugfix || 0}</span>
                  <span>Docs: {entry.github_data.commitsByCategory.documentation || 0}</span>
                  <span>Security: {entry.github_data.commitsByCategory.security || 0}</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-auto mt-4">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              {/* Preview Header */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  v{version}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(category)}>
                  {getCategoryIcon(category)}
                  <span className="ml-1">{getCategoryLabel(category)}</span>
                </Badge>
              </div>
              
              <h2 className="text-2xl font-bold">{title || 'Untitled'}</h2>
              
              <p className="text-muted-foreground">
                {format(new Date(entry.date), 'MMMM d, yyyy')}
                {author && <span> • {author}</span>}
              </p>
              
              <p className="text-sm">{description || 'No description'}</p>
              
              {details && (
                <div className="prose prose-sm max-w-none border-t pt-4 dark:prose-invert">
                  <ReactMarkdown>{details}</ReactMarkdown>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex-shrink-0 gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            variant="outline" 
            onClick={() => saveMutation.mutate()} 
            disabled={isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          {entry.status !== 'published' && (
            <Button onClick={() => saveAndPublishMutation.mutate()} disabled={isPending}>
              <Save className="h-4 w-4 mr-2" />
              Save & Publish
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
