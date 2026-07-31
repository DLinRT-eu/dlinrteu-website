import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, AlertTriangle } from 'lucide-react';
const RegulatoryLandscape = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
      {/* EU: MDR Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              EU: MDR (Medical Device Regulation)
            </CardTitle>
            <Badge variant="secondary">EU 2017/745</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            AI/ML software used for diagnosis, treatment planning or clinical decision support typically qualifies as a medical device under MDR (2017/745). Manufacturers need CE marking, technical documentation, clinical evaluation, quality management (e.g., ISO 13485) and post-market surveillance (PMS).
          </p>
          <a 
            href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0745" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>EUR-Lex Official Text</span>
          </a>
        </CardContent>
      </Card>

      {/* MDR Targeted Revision Alert */}
      <Card className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-lg font-semibold text-foreground">
              Proposed MDR Revision (December 2025)
            </CardTitle>
            <Badge variant="outline" className="border-amber-500 text-amber-700 dark:text-amber-400">
              Proposal
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-3">
            On 16 December 2025, the European Commission proposed a <strong>targeted simplification</strong> of MDR and IVDR rules. Key changes include revised requirements for <strong>in-house manufactured devices</strong>, simplified procedures for healthcare institutions, and support for digitalization. This proposal aims to make rules easier, faster, and more effective while maintaining patient safety.
          </p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://health.ec.europa.eu/medical-devices-sector/new-regulations_en#simpler-and-more-effective-rules-for-medical-devices--commission-proposal-for-a-targeted-revision-of-the-medical-devices-regulations"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>EC Overview</span>
            </a>
            <span className="text-muted-foreground">|</span>
            <a 
              href="https://health.ec.europa.eu/publications/proposal-regulation-simplify-rules-medical-and-vitro-diagnostic-devices_en"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Full Proposal</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* EU: AI Act Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-xl font-semibold text-foreground">
              EU: AI Act
            </CardTitle>
            <Badge variant="outline">AI Omnibus in force — enforcement from 2 Aug 2026</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The AI Act defines rules for AI systems, with strict obligations for <strong>high-risk</strong> systems (datasets, transparency, human oversight, risk management). From <strong>2 August 2026</strong> the Commission's <strong>AI Office</strong>, national competent authorities and the EDPS begin <strong>enforcing</strong> the Act, and the <strong>Article 50 transparency obligations start to apply</strong>. The <strong>AI Omnibus on AI</strong> (COM(2025) 836) is now in force and postpones the high-risk obligations; for regulated medical AI relevant to DLinRT these apply alongside MDR (see MDCG guidance).
          </p>
          <div className="mb-4 rounded-md border border-border bg-muted/40 p-4">
            <p className="text-sm font-semibold text-foreground mb-2">AI Act timeline</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li><strong>2 Feb 2025</strong> — prohibited AI practices applicable.</li>
              <li><strong>2 Aug 2025</strong> — obligations for providers of general-purpose AI (GPAI) models applicable.</li>
              <li><strong>2 Aug 2026 (now in effect)</strong> — enforcement begins: the AI Office supervises GPAI models and systems built on a GPAI model by the same provider (plus systems in VLOPs/VLOSEs), national competent authorities supervise other AI systems, and the EDPS supervises EU institutions. <strong>Article 50 transparency</strong> applies: disclose to users that they are interacting with AI, label deepfakes, and machine-readable marking of AI-generated or altered content.</li>
              <li><strong>2 Dec 2026</strong> — new prohibitions apply on AI systems generating non-consensual sexually explicit content and child sexual abuse material.</li>
              <li><strong>2 Dec 2027</strong> — Annex III high-risk AI obligations apply.</li>
              <li><strong>2 Aug 2028</strong> — Annex I high-risk AI embedded in regulated products, <strong>including medical devices</strong> — the date most relevant to radiotherapy AI.</li>
              <li><strong>Sectoral interplay (Annex I):</strong> where MDR and similar sectoral laws already impose AI-specific requirements equivalent to the AI Act, direct AI Act application is limited; the Commission must issue guidance to <em>minimise compliance burden</em> for Annex I operators — directly relevant to radiotherapy SaMD.</li>
              <li><strong>Machinery exemption:</strong> products covered by the Machinery Regulation (previously Annex I high-risk) are exempted from direct AI Act applicability; the Commission may add AI-related health &amp; safety requirements under the Machinery Regulation instead.</li>
            </ul>
          </div>
          <div className="mb-4 rounded-md border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-foreground mb-2">What 2 Aug 2026 means for radiotherapy AI</p>
            <p className="text-sm text-muted-foreground">
              CE-marked radiotherapy AI is high-risk under <strong>Annex I</strong> (via MDR), so the high-risk chapter does not apply until <strong>2 Aug 2028</strong>. However, <strong>Article 50 transparency already applies</strong> where a product generates or alters content shown to users, or interacts conversationally (for example an embedded assistant or chatbot in a planning platform). Enforcement powers, the complaint and whistleblower channels and the AI Act Service Desk are live as of 2 Aug 2026. This summary is informational and not legal advice.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>EU AI Act Official Text (Regulation 2024/1689)</span>
            </a>
            <a
              href="https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1714"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Commission press release IP/26/1714 — enforcement and transparency from 2 Aug 2026</span>
            </a>
            <a
              href="https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Enforcement of the AI Act</span>
            </a>
            <a
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0836"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>AI Omnibus — COM(2025) 836</span>
            </a>
          </div>

        </CardContent>
      </Card>

      {/* Interplay: MDR + AI Act */}
      <Card className="bg-primary/5 border-primary/20 lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              Interplay: MDR + AI Act
            </CardTitle>
            <Badge variant="default">Critical</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MDCG's FAQ (MDCG 2025-6) explains joint applicability, classification cues, and practical expectations for MDAI (Medical Device AI). Follow MDCG guidance for harmonised interpretation. Under the <strong>Digital Omnibus on AI</strong> (Council-approved 29 Jun 2026), the AI Act's direct application is narrowed where MDR already imposes equivalent AI-specific requirements, and the Commission is mandated to issue guidance that <em>minimises duplicate compliance</em> for Annex I operators such as medical-device manufacturers.
          </p>
          <a
            href="https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Public Health - MDCG Guidance Documents</span>
          </a>
        </CardContent>
      </Card>

      {/* USA: FDA Pathway */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              USA: FDA Pathway
            </CardTitle>
            <Badge variant="secondary">SaMD Framework</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The FDA expects premarket demonstration of safety & effectiveness for SaMD. Key guidance includes the AI/ML SaMD Action Plan, PCCP for iterative AI (Dec 2024), and transparency principles. FDA maintains an "AI-enabled medical device" list and expects post-market monitoring.
          </p>
          <a 
            href="https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>U.S. Food and Drug Administration - AI/ML Guidance</span>
          </a>
        </CardContent>
      </Card>

      {/* UK: UKCA Pathway */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              UK: UKCA Pathway
            </CardTitle>
            <Badge variant="secondary">Post-Brexit</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Post-Brexit, the UK follows its own regulatory framework under MHRA. Medical device AI requires UKCA marking with specific guidance on standalone software and AI/ML systems. MHRA published updated guidance in 2025 addressing AI-specific requirements.
          </p>
          <a 
            href="https://www.gov.uk/guidance/medical-device-standalone-software-including-apps-including-ivdmds" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>MHRA - Software and AI as Medical Devices</span>
          </a>
        </CardContent>
      </Card>

      {/* Australia & International */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              Australia & International
            </CardTitle>
            <Badge variant="secondary">TGA / IMDRF</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Australia's TGA has adopted IMDRF Good Machine Learning Practice (GMLP) principles and published specific evidence requirements for AI software. IMDRF's harmonized frameworks (SaMD, GMLP N88) provide international alignment for AI medical device regulation.
          </p>
          <a 
            href="https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>IMDRF Good Machine Learning Practice</span>
          </a>
        </CardContent>
      </Card>

      {/* EU: HTA Regulation */}
      <Card className="lg:col-span-2 border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-xl font-semibold text-foreground">
              EU: Health Technology Assessment Regulation (HTAR)
            </CardTitle>
            <Badge variant="secondary">EU 2021/2282</Badge>
            <Badge variant="outline">In application: 12 Jan 2025</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The HTA Regulation introduces <strong>Joint Clinical Assessments (JCA)</strong> and <strong>Joint Scientific Consultations (JSC)</strong> at EU level, coordinated by the Member State Coordination Group on HTA. Scope started with oncology medicines and ATMPs in 2025; <strong>medical devices and IVDs</strong> (including AI/SaMD used in radiotherapy) follow a staged scope. JCAs use the <strong>PICO framework</strong> (Population, Intervention, Comparator, Outcomes) and the EUnetHTA 21 methodology. HTAR is complementary to MDR/AI Act: regulatory approval is necessary but not sufficient for reimbursement and adoption decisions made by national HTA bodies.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://health.ec.europa.eu/health-technology-assessment/overview_en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>EC HTA Overview</span>
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2282"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Regulation 2021/2282 (EUR-Lex)</span>
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="https://www.eunethta.eu/jointhtawork/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>EUnetHTA Joint HTA Work</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* General-Purpose AI Governance */}
      <Card className="bg-primary/5 border-primary/20 lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-foreground">
              General-Purpose AI (GPAI) Governance
            </CardTitle>
            <Badge variant="outline">AI Act Chapter V</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The EU AI Act's <strong>Chapter V</strong> introduces obligations for providers of general-purpose AI models, including transparency, copyright compliance, and systemic risk assessment. The International AI Safety Report 2025 (Bengio et al.), commissioned by AI Safety Summit governments, provides the scientific foundation for GPAI risk evaluation. Complementary benchmarks — the Stanford AI Index and the MIT AI Agent Index — track deployment trends and safety features of frontier AI systems.
          </p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://internationalaisafetyreport.org/publication/international-ai-safety-report-2025"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>AI Safety Report 2025</span>
            </a>
            <span className="text-muted-foreground">|</span>
            <a 
              href="https://hai.stanford.edu/ai-index/2025-ai-index-report"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Stanford AI Index 2025</span>
            </a>
            <span className="text-muted-foreground">|</span>
            <a 
              href="https://aiagentindex.mit.edu/"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>MIT AI Agent Index</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryLandscape;