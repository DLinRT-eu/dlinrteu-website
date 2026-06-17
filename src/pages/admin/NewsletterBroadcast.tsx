import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { parseNewsletterMarkdown, renderNewsletterHtml } from "@/utils/email/newsletterRender";
import { RefreshCcw, Upload, FlaskConical, Mail, ExternalLink } from "lucide-react";

// Load every markdown draft in src/data/newsletters/ at build time
const draftModules = import.meta.glob("/src/data/newsletters/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const drafts = Object.entries(draftModules)
  .filter(([path]) => !path.endsWith("/README.md"))
  .map(([path, content]) => ({
    slug: path.split("/").pop()!.replace(/\.md$/, ""),
    path,
    content,
  }))
  .sort((a, b) => b.slug.localeCompare(a.slug));

interface SyncCounts {
  supabaseTotal: number;
  supabaseActive: number;
  resendTotal: number;
  resendUnsubscribed: number;
  pushed: number;
  pushedUnsubscribed: number;
  pulledUnsubscribed: number;
}

export default function NewsletterBroadcast() {
  const { user } = useAuth();
  const [selectedSlug, setSelectedSlug] = useState<string>(drafts[0]?.slug ?? "");
  const [body, setBody] = useState<string>(drafts[0]?.content ?? "");
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");

  const [syncing, setSyncing] = useState(false);
  const [syncCounts, setSyncCounts] = useState<SyncCounts | null>(null);
  const [activeSubscribers, setActiveSubscribers] = useState<number | null>(null);
  const [sendingTest, setSendingTest] = useState(false);
  const [pushingDraft, setPushingDraft] = useState(false);
  const [lastBroadcastId, setLastBroadcastId] = useState<string | null>(null);
  const [lastBroadcastUrl, setLastBroadcastUrl] = useState<string | null>(null);

  // Whenever the source draft changes, re-derive subject/preheader from it
  useEffect(() => {
    const parsed = parseNewsletterMarkdown(body);
    setSubject((s) => s || parsed.subject || "");
    setPreheader((p) => p || parsed.preheader || "");
  }, [body]);

  // Load current active subscriber count from Supabase for the audience panel
  useEffect(() => {
    (async () => {
      const { count } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .is("unsubscribed_at", null);
      setActiveSubscribers(count ?? 0);
    })();
  }, []);

  useEffect(() => {
    if (user?.email && !testEmail) setTestEmail(user.email);
  }, [user, testEmail]);

  function handleSelectDraft(slug: string) {
    const d = drafts.find((x) => x.slug === slug);
    if (!d) return;
    setSelectedSlug(slug);
    setBody(d.content);
    const parsed = parseNewsletterMarkdown(d.content);
    setSubject(parsed.subject);
    setPreheader(parsed.preheader);
  }

  const previewHtml = useMemo(() => {
    const parsed = parseNewsletterMarkdown(body);
    return renderNewsletterHtml({
      subject: subject || parsed.subject,
      preheader: preheader || parsed.preheader,
      blocksHtml: parsed.blocksHtml,
      unsubscribeUrl: "https://dlinrt.eu/unsubscribe",
    });
  }, [body, subject, preheader]);

  async function runSync() {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-newsletter-audience", {
        body: {},
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Sync failed");
      setSyncCounts(data.counts as SyncCounts);
      toast.success(
        `Synced audience: ${data.counts.pushed} active, ${data.counts.pushedUnsubscribed} unsubscribed pushed; ${data.counts.pulledUnsubscribed} pulled back.`,
      );
    } catch (e) {
      toast.error("Sync failed", { description: (e as Error).message });
    } finally {
      setSyncing(false);
    }
  }

  async function sendTest() {
    if (!testEmail) {
      toast.error("Enter a test recipient email");
      return;
    }
    setSendingTest(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-newsletter-broadcast", {
        body: { subject, preheader, bodyMarkdown: body, testRecipient: testEmail },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Send failed");
      toast.success(`Test sent to ${testEmail}`);
    } catch (e) {
      toast.error("Test send failed", { description: (e as Error).message });
    } finally {
      setSendingTest(false);
    }
  }

  async function pushDraftToResend() {
    setPushingDraft(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-newsletter-broadcast", {
        body: {
          subject, preheader, bodyMarkdown: body,
          name: `DLinRT newsletter ${selectedSlug}`,
        },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Push failed");
      setLastBroadcastId(data.broadcastId);
      setLastBroadcastUrl(data.resendUrl ?? `https://resend.com/broadcasts/${data.broadcastId}`);
      toast.success("Draft pushed to Resend", {
        description: `Audience: ${data.activeSubscribers ?? "?"} active. Send the final broadcast from the Resend dashboard.`,
      });
    } catch (e) {
      toast.error("Push to Resend failed", { description: (e as Error).message });
    } finally {
      setPushingDraft(false);
    }
  }

  return (
    <PageLayout>
      <SEO title="Newsletter Broadcast | Admin" description="Compose, preview and send the DLinRT.eu newsletter via Resend." />
      <div className="container mx-auto py-8 space-y-6 max-w-7xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Newsletter Broadcast</h1>
            <p className="text-muted-foreground mt-1">
              Compose, preview and send the DLinRT.eu newsletter through Resend.
              Subscribers stay in sync between the website and the Resend audience.
            </p>
          </div>
        </div>

        {/* Audience panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Audience sync</CardTitle>
            <CardDescription>
              New subscribes and unsubscribes mirror to Resend automatically, and a daily cron does a full reconcile.
              Use the button below to force a reconcile right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <Badge variant="secondary">Website active: {activeSubscribers ?? "…"}</Badge>
              {syncCounts && (
                <>
                  <Badge variant="secondary">Resend total: {syncCounts.resendTotal}</Badge>
                  <Badge variant="outline">Resend unsubscribed: {syncCounts.resendUnsubscribed}</Badge>
                  <Badge variant="outline">Pushed: {syncCounts.pushed}</Badge>
                  <Badge variant="outline">Pulled back: {syncCounts.pulledUnsubscribed}</Badge>
                </>
              )}
            </div>
            <Button onClick={runSync} disabled={syncing} variant="outline">
              <RefreshCcw className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing…" : "Force full reconcile now"}
            </Button>
          </CardContent>
        </Card>

        {/* Composer + preview */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose</CardTitle>
              <CardDescription>
                Pick a draft from <code>src/data/newsletters/</code>, edit subject/preheader/body,
                then preview on the right.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Draft</Label>
                <Select value={selectedSlug} onValueChange={handleSelectDraft}>
                  <SelectTrigger><SelectValue placeholder="Select a draft" /></SelectTrigger>
                  <SelectContent>
                    {drafts.map((d) => (
                      <SelectItem key={d.slug} value={d.slug}>{d.slug}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preheader">Preheader</Label>
                <Input id="preheader" value={preheader} onChange={(e) => setPreheader(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body (Markdown blocks)</Label>
                <Textarea
                  id="body" value={body} onChange={(e) => setBody(e.target.value)}
                  rows={18} className="font-mono text-xs"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Live preview</CardTitle>
                  <CardDescription>Rendered with the DLinRT.eu newsletter template.</CardDescription>
                </div>
                <div className="flex gap-1 rounded-md border p-1">
                  <Button
                    size="sm"
                    variant={previewTheme === "light" ? "secondary" : "ghost"}
                    onClick={() => setPreviewTheme("light")}
                  >Light</Button>
                  <Button
                    size="sm"
                    variant={previewTheme === "dark" ? "secondary" : "ghost"}
                    onClick={() => setPreviewTheme("dark")}
                  >Dark</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <iframe
                title="newsletter preview"
                srcDoc={previewHtml}
                className={`w-full h-[720px] rounded-md border ${previewTheme === "dark" ? "bg-[#0f0f23]" : "bg-white"}`}
                style={{ colorScheme: previewTheme }}
              />
            </CardContent>
          </Card>

        </div>

        {/* Send controls */}
        <Card>
          <CardHeader>
            <CardTitle>Test & push</CardTitle>
            <CardDescription>
              Send a test from here or from Resend. The final broadcast is always sent from the Resend dashboard
              after pushing the draft below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="testEmail">Test recipient</Label>
                <Input
                  id="testEmail" type="email" placeholder="you@example.com"
                  value={testEmail} onChange={(e) => setTestEmail(e.target.value)}
                />
              </div>
              <Button onClick={sendTest} disabled={sendingTest} variant="secondary">
                <FlaskConical className="h-4 w-4 mr-2" />
                {sendingTest ? "Sending…" : "Send test from website"}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-3">
              <Button
                onClick={pushDraftToResend}
                disabled={pushingDraft}
                className="bg-[#5090D0] hover:bg-[#5090D0]/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                {pushingDraft ? "Pushing…" : "Push draft to Resend"}
              </Button>
              <p className="text-sm text-muted-foreground">
                This creates the broadcast in Resend (audience: ~{activeSubscribers ?? "?"} active subscribers)
                but does not send. Open it in Resend to send a test or the final newsletter.
              </p>

              {lastBroadcastId && (
                <div className="text-sm space-y-1">
                  <p className="text-muted-foreground">
                    Last pushed broadcast: <code>{lastBroadcastId}</code>
                  </p>
                  {lastBroadcastUrl && (
                    <a
                      href={lastBroadcastUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#5090D0] hover:underline"
                    >
                      Open in Resend <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
