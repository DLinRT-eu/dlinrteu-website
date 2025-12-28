import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Shield, CheckCircle, AlertCircle, RefreshCw, ExternalLink, ChevronDown, Info } from 'lucide-react';

interface SecurityHeader {
  name: string;
  expected: string;
  actual?: string;
  status: 'pass' | 'fail' | 'warning' | 'unverifiable';
  description: string;
  configuredInHeaders?: boolean;
}

// Headers that are configured in public/_headers but cannot be verified client-side due to CORS
const CONFIGURED_HEADERS = [
  'X-Frame-Options',
  'X-Content-Type-Options', 
  'X-XSS-Protection',
  'Content-Security-Policy',
  'Referrer-Policy',
  'Strict-Transport-Security'
];

export const SecurityHeadersValidator: React.FC = () => {
  const [headers, setHeaders] = useState<SecurityHeader[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [showDevToolsGuide, setShowDevToolsGuide] = useState(false);

  const expectedHeaders = [
    {
      name: 'Strict-Transport-Security',
      expected: 'max-age=31536000; includeSubDomains; preload',
      description: 'Forces HTTPS connections and prevents downgrade attacks'
    },
    {
      name: 'X-Content-Type-Options',
      expected: 'nosniff',
      description: 'Prevents MIME type sniffing attacks'
    },
    {
      name: 'X-Frame-Options',
      expected: 'DENY',
      description: 'Prevents clickjacking attacks'
    },
    {
      name: 'X-XSS-Protection',
      expected: '1; mode=block',
      description: 'Enables browser XSS protection'
    },
    {
      name: 'Referrer-Policy',
      expected: 'strict-origin-when-cross-origin',
      description: 'Controls referrer information leakage'
    },
    {
      name: 'Content-Security-Policy',
      expected: 'default-src \'self\'',
      description: 'Prevents XSS and code injection attacks'
    }
  ];

  const checkSecurityHeaders = async () => {
    setLoading(true);
    try {
      const testUrl = `${window.location.origin}/favicon.svg`;
      const response = await fetch(testUrl, { 
        method: 'GET',
        cache: 'no-cache'
      });
      
      const checkedHeaders: SecurityHeader[] = expectedHeaders.map(header => {
        const actualValue = response.headers.get(header.name);
        const isConfigured = CONFIGURED_HEADERS.includes(header.name);
        
        let status: 'pass' | 'fail' | 'warning' | 'unverifiable' = 'fail';
        
        if (actualValue) {
          // Header was returned and can be verified
          if (header.name === 'Content-Security-Policy') {
            status = actualValue.includes('default-src') ? 'pass' : 'warning';
          } else if (header.name === 'Strict-Transport-Security') {
            status = actualValue.includes('max-age') ? 'pass' : 'warning';
          } else if (header.name === 'X-Content-Type-Options') {
            status = actualValue.toLowerCase() === 'nosniff' ? 'pass' : 'warning';
          } else if (header.name === 'X-Frame-Options') {
            status = actualValue.toUpperCase() === 'DENY' ? 'pass' : 'warning';
          } else if (header.name === 'X-XSS-Protection') {
            status = actualValue === '1; mode=block' ? 'pass' : 'warning';
          } else if (header.name === 'Referrer-Policy') {
            status = actualValue.includes('strict-origin') ? 'pass' : 'warning';
          } else {
            status = actualValue.includes(header.expected.split(';')[0]) ? 'pass' : 'warning';
          }
        } else if (isConfigured) {
          // Header is configured in _headers but browser doesn't expose it (CORS limitation)
          status = 'unverifiable';
        }

        return {
          ...header,
          actual: actualValue || undefined,
          status,
          configuredInHeaders: isConfigured
        };
      });

      setHeaders(checkedHeaders);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error checking security headers:', error);
      const errorHeaders = expectedHeaders.map(h => ({ 
        ...h, 
        status: 'unverifiable' as const,
        actual: undefined,
        configuredInHeaders: CONFIGURED_HEADERS.includes(h.name)
      }));
      setHeaders(errorHeaders);
      setLastChecked(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSecurityHeaders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'unverifiable': return <Info className="h-4 w-4 text-blue-500" />;
      case 'fail': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string, configuredInHeaders?: boolean) => {
    switch (status) {
      case 'pass': return <Badge variant="default" className="bg-green-500">Verified</Badge>;
      case 'warning': return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>;
      case 'unverifiable': 
        return configuredInHeaders 
          ? <Badge variant="secondary" className="bg-blue-500 text-white">Configured (Cannot verify)</Badge>
          : <Badge variant="outline">Cannot verify</Badge>;
      case 'fail': return <Badge variant="destructive">Missing</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const passCount = headers.filter(h => h.status === 'pass').length;
  const failCount = headers.filter(h => h.status === 'fail').length;
  const unverifiableCount = headers.filter(h => h.status === 'unverifiable').length;
  const warningCount = headers.filter(h => h.status === 'warning').length;

  const openExternalChecker = () => {
    window.open(`https://securityheaders.com/?q=${encodeURIComponent(window.location.origin)}&followRedirects=on`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Headers Validation
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={openExternalChecker}
              size="sm"
              variant="outline"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Verify Externally
            </Button>
            <Button 
              onClick={checkSecurityHeaders} 
              disabled={loading}
              size="sm"
              variant="outline"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Browser Limitation Notice */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> Browsers restrict access to security headers via JavaScript (CORS). 
            Headers marked "Configured (Cannot verify)" are set in the <code className="bg-muted px-1 rounded">_headers</code> file 
            but cannot be verified client-side. Use the "Verify Externally" button or browser DevTools for accurate verification.
          </AlertDescription>
        </Alert>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{passCount}</div>
            <div className="text-sm text-muted-foreground">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{unverifiableCount}</div>
            <div className="text-sm text-muted-foreground">Configured</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{warningCount}</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{failCount}</div>
            <div className="text-sm text-muted-foreground">Missing</div>
          </div>
        </div>

        {/* Headers List */}
        <div className="space-y-3">
          {headers.map((header) => (
            <div 
              key={header.name}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(header.status)}
                <div>
                  <div className="font-medium">{header.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {header.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Expected: {header.expected}
                  </div>
                  {header.actual ? (
                    <div className="text-xs text-muted-foreground">
                      Actual: {header.actual}
                    </div>
                  ) : header.status === 'unverifiable' && header.configuredInHeaders ? (
                    <div className="text-xs text-blue-600">
                      ✓ Configured in _headers file (verify via DevTools or external tool)
                    </div>
                  ) : null}
                </div>
              </div>
              {getStatusBadge(header.status, header.configuredInHeaders)}
            </div>
          ))}
        </div>

        {/* DevTools Instructions */}
        <Collapsible open={showDevToolsGuide} onOpenChange={setShowDevToolsGuide}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>How to verify headers manually</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDevToolsGuide ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
              <p className="font-medium">Using Browser DevTools:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Open DevTools (F12 or Right-click → Inspect)</li>
                <li>Go to the <strong>Network</strong> tab</li>
                <li>Refresh the page (F5)</li>
                <li>Click on the first request (usually the HTML document)</li>
                <li>Select the <strong>Headers</strong> tab</li>
                <li>Scroll to <strong>Response Headers</strong> section</li>
                <li>Look for security headers (X-Frame-Options, CSP, etc.)</li>
              </ol>
              <p className="mt-3 font-medium">Using External Tools:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li><a href="https://securityheaders.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">securityheaders.com</a> - Comprehensive header analysis</li>
                <li><a href="https://observatory.mozilla.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Observatory</a> - Security assessment</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {lastChecked && (
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Last checked: {lastChecked.toLocaleString()}
          </div>
        )}

        {failCount > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {failCount} security header(s) are missing. 
              Configure them in your <code className="bg-destructive/20 px-1 rounded">public/_headers</code> file or server configuration.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};