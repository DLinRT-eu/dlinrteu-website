import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { parseFile, ParseResult, ImportedSubscriber } from '@/utils/newsletterImport';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsletterImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: () => void;
}

export function NewsletterImportDialog({ open, onOpenChange, onImportComplete }: NewsletterImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [importResult, setImportResult] = useState<{ imported: number; duplicates: number; errors: number } | null>(null);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setParseResult(null);
    setImportResult(null);
    setParsing(true);

    try {
      const result = await parseFile(selectedFile);
      setParseResult(result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to parse file');
      setFile(null);
    } finally {
      setParsing(false);
    }
  }, []);

  const handleImport = useCallback(async () => {
    if (!parseResult || !consentConfirmed) return;

    const validSubscribers = parseResult.subscribers.filter(s => s.isValid);
    if (validSubscribers.length === 0) {
      toast.error('No valid subscribers to import');
      return;
    }

    setImporting(true);

    try {
      const response = await supabase.functions.invoke('admin-newsletter-management', {
        body: {
          action: 'bulk-import',
          subscribers: validSubscribers.map(s => ({
            email: s.email,
            firstName: s.firstName,
            lastName: s.lastName
          }))
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Import failed');
      }

      const result = response.data;
      setImportResult({
        imported: result.imported || 0,
        duplicates: result.duplicates || 0,
        errors: result.errors || 0
      });

      toast.success(`Successfully imported ${result.imported} subscribers`);
      onImportComplete();
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error instanceof Error ? error.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  }, [parseResult, consentConfirmed, onImportComplete]);

  const handleClose = useCallback(() => {
    setFile(null);
    setParseResult(null);
    setImportResult(null);
    setConsentConfirmed(false);
    onOpenChange(false);
  }, [onOpenChange]);

  const previewSubscribers = parseResult?.subscribers.slice(0, 5) || [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Newsletter Subscribers
          </DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file with subscriber data. The file should contain at minimum an email column.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload */}
          {!parseResult && !importResult && (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={parsing}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {parsing ? (
                  <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                ) : (
                  <Upload className="h-10 w-10 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">
                  {parsing ? 'Parsing file...' : 'Click to upload CSV or Excel file'}
                </span>
              </label>
            </div>
          )}

          {/* Parse Results */}
          {parseResult && !importResult && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Found {parseResult.totalRows} rows: {parseResult.validRows} valid, {parseResult.invalidRows} invalid
                </AlertDescription>
              </Alert>

              {/* Preview Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewSubscribers.map((sub, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-mono text-sm">{sub.email || '-'}</TableCell>
                        <TableCell>{sub.firstName || '-'}</TableCell>
                        <TableCell>{sub.lastName || '-'}</TableCell>
                        <TableCell>
                          {sub.isValid ? (
                            <span className="text-green-600 flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" /> Valid
                            </span>
                          ) : (
                            <span className="text-destructive flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" /> {sub.error}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {parseResult.totalRows > 5 && (
                  <div className="p-2 text-center text-sm text-muted-foreground bg-muted/50">
                    Showing first 5 of {parseResult.totalRows} rows
                  </div>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 p-4 border rounded-lg bg-muted/50">
                <Checkbox
                  id="consent"
                  checked={consentConfirmed}
                  onCheckedChange={(checked) => setConsentConfirmed(checked === true)}
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed">
                  I confirm that all imported subscribers have given their consent to receive newsletters 
                  in accordance with GDPR requirements.
                </Label>
              </div>
            </>
          )}

          {/* Import Result */}
          {importResult && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Import complete: {importResult.imported} imported, {importResult.duplicates} duplicates skipped
                {importResult.errors > 0 && `, ${importResult.errors} errors`}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          {importResult ? (
            <Button onClick={handleClose}>Close</Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {parseResult && (
                <Button
                  onClick={handleImport}
                  disabled={!consentConfirmed || parseResult.validRows === 0 || importing}
                >
                  {importing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    `Import ${parseResult.validRows} Subscribers`
                  )}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
