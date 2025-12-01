import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertTriangle, CheckCircle, RefreshCw, Shield } from "lucide-react";
import { validateCompanyMappings, notifyAdminsOfIssues, ValidationResult, CompanyMappingIssue } from "@/utils/companyMappingValidator";
import { ALL_PRODUCTS } from "@/data";
import { toast } from "sonner";

export default function CompanyMappingValidator() {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState<string | null>(null);

  const runValidation = async (silent = false) => {
    setIsValidating(true);
    if (!silent) {
      toast.info("Running validation...");
    }

    try {
      const result = await validateCompanyMappings(ALL_PRODUCTS);
      setValidationResult(result);
      setLastValidated(result.lastChecked);

      if (result.summary.highSeverity > 0) {
        toast.error(`Found ${result.summary.highSeverity} high-severity issue(s)`);
        // Notify admins of high-severity issues
        await notifyAdminsOfIssues(result.issues);
      } else if (result.summary.totalIssues > 0) {
        toast.warning(`Found ${result.summary.totalIssues} issue(s)`);
      } else {
        toast.success("No issues found! All mappings are correct.");
      }
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Failed to validate company mappings");
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    runValidation(true);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Shield className="h-4 w-4" />;
      case 'low':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const IssueCard = ({ issue }: { issue: CompanyMappingIssue }) => (
    <Card className="border-l-4" style={{
      borderLeftColor: issue.severity === 'high' ? 'hsl(var(--destructive))' : 
                       issue.severity === 'medium' ? 'hsl(var(--warning))' : 
                       'hsl(var(--muted))'
    }}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{issue.companyName}</CardTitle>
              <Badge variant={getSeverityColor(issue.severity)}>
                <span className="flex items-center gap-1">
                  {getSeverityIcon(issue.severity)}
                  {issue.severity.toUpperCase()}
                </span>
              </Badge>
              <Badge variant="outline">{issue.type.replace('_', ' ').toUpperCase()}</Badge>
            </div>
            {issue.productName && (
              <CardDescription>Product: {issue.productName}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{issue.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Expected Company ID:</span>
            <code className="ml-2 rounded bg-muted px-2 py-1">{issue.expectedCompanyId}</code>
          </div>
          {issue.actualCompanyId && (
            <div>
              <span className="font-medium">Actual Company ID:</span>
              <code className="ml-2 rounded bg-muted px-2 py-1">{issue.actualCompanyId}</code>
            </div>
          )}
        </div>

        {issue.representatives && issue.representatives.length > 0 && (
          <div className="mt-3 space-y-2">
            <span className="text-sm font-medium">Affected Representatives:</span>
            <div className="space-y-1">
              {issue.representatives.map((rep) => (
                <div key={rep.id} className="flex items-center gap-2 text-sm">
                  <Badge variant={rep.verified ? "default" : "secondary"}>
                    {rep.verified ? "Verified" : "Unverified"}
                  </Badge>
                  <span className="text-muted-foreground">{rep.email}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <PageLayout
      title="Company Mapping Validator"
      description="Detect mismatches between product company names and representative company IDs"
    >
      <div className="space-y-6">
        {/* Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Validation Summary</CardTitle>
                <CardDescription>
                  {lastValidated && `Last validated: ${new Date(lastValidated).toLocaleString()}`}
                </CardDescription>
              </div>
              <Button
                onClick={() => runValidation()}
                disabled={isValidating}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Run Validation
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {validationResult ? (
              <div className="space-y-4">
                {validationResult.summary.totalIssues === 0 ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      All company mappings are correct. No issues detected.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardDescription>Total Issues</CardDescription>
                          <CardTitle className="text-3xl">{validationResult.summary.totalIssues}</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardDescription>High Severity</CardDescription>
                          <CardTitle className="text-3xl text-destructive">
                            {validationResult.summary.highSeverity}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardDescription>Medium Severity</CardDescription>
                          <CardTitle className="text-3xl text-warning">
                            {validationResult.summary.mediumSeverity}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardDescription>Low Severity</CardDescription>
                          <CardTitle className="text-3xl text-muted-foreground">
                            {validationResult.summary.lowSeverity}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>

                    {validationResult.summary.highSeverity > 0 && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          {validationResult.summary.highSeverity} high-severity issue(s) detected that may cause authorization failures. 
                          All admins have been notified.
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Issues List */}
        {validationResult && validationResult.issues.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Issues Detected</h2>
            
            {/* High Severity Issues */}
            {validationResult.issues.filter(i => i.severity === 'high').length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-destructive">High Severity Issues</h3>
                {validationResult.issues
                  .filter(i => i.severity === 'high')
                  .map((issue, idx) => (
                    <IssueCard key={`high-${idx}`} issue={issue} />
                  ))}
              </div>
            )}

            {/* Medium Severity Issues */}
            {validationResult.issues.filter(i => i.severity === 'medium').length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-warning">Medium Severity Issues</h3>
                {validationResult.issues
                  .filter(i => i.severity === 'medium')
                  .map((issue, idx) => (
                    <IssueCard key={`medium-${idx}`} issue={issue} />
                  ))}
              </div>
            )}

            {/* Low Severity Issues */}
            {validationResult.issues.filter(i => i.severity === 'low').length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-muted-foreground">Low Severity Issues</h3>
                {validationResult.issues
                  .filter(i => i.severity === 'low')
                  .map((issue, idx) => (
                    <IssueCard key={`low-${idx}`} issue={issue} />
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
