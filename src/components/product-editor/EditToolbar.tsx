import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProductEdit } from './ProductEditContext';
import { 
  Save, 
  X, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';

export function EditToolbar() {
  const {
    isEditMode,
    changedFields,
    isSaving,
    currentDraft,
    saveDraft,
    discardChanges,
    submitForReview,
    disableEditMode
  } = useProductEdit();
  
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [editSummary, setEditSummary] = useState('');
  
  if (!isEditMode) return null;
  
  const hasChanges = changedFields.length > 0;
  
  const handleSubmit = async () => {
    if (!editSummary.trim()) return;
    await submitForReview(editSummary);
    setShowSubmitDialog(false);
    setEditSummary('');
  };
  
  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 bg-background border border-border rounded-xl shadow-lg px-4 py-3">
          {/* Status indicator */}
          <div className="flex items-center gap-2 pr-3 border-r border-border">
            {hasChanges ? (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-300">
                <AlertCircle className="h-3 w-3 mr-1" />
                {changedFields.length} change{changedFields.length !== 1 ? 's' : ''}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-300">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                No changes
              </Badge>
            )}
          </div>
          
          {/* Draft status */}
          {currentDraft && (
            <Badge variant="secondary" className="text-xs">
              Draft saved
            </Badge>
          )}
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={discardChanges}
              disabled={!hasChanges || isSaving}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => saveDraft()}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-1" />
              )}
              Save Draft
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowSubmitDialog(true)}
              disabled={!hasChanges || isSaving}
            >
              <Send className="h-4 w-4 mr-1" />
              Submit
            </Button>
            
            <div className="w-px h-6 bg-border mx-1" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={disableEditMode}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Submit Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Changes for Review</DialogTitle>
            <DialogDescription>
              Describe the changes you've made. This will help reviewers understand your edits.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Modified fields ({changedFields.length}):
              </p>
              <div className="flex flex-wrap gap-1">
                {changedFields.slice(0, 10).map(field => (
                  <Badge key={field} variant="secondary" className="text-xs">
                    {field}
                  </Badge>
                ))}
                {changedFields.length > 10 && (
                  <Badge variant="outline" className="text-xs">
                    +{changedFields.length - 10} more
                  </Badge>
                )}
              </div>
            </div>
            
            <Textarea
              placeholder="Describe your changes (e.g., 'Updated FDA clearance number and added new clinical evidence')"
              value={editSummary}
              onChange={(e) => setEditSummary(e.target.value)}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!editSummary.trim() || isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-1" />
              )}
              Submit for Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
