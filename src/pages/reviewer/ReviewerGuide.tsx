import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Search, CheckCircle2, MessageSquare, UserCheck, FileText, Settings, BookOpen, Shield, Target, ClipboardList } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const ReviewerGuide = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('reviewer-guide-read', 'true');
  }, []);

  const quickNavCards = [
    {
      title: 'Role Overview',
      icon: Shield,
      description: 'Understanding the reviewer role',
      href: '#role-overview'
    },
    {
      title: 'Registration',
      icon: UserCheck,
      description: 'How to become a reviewer',
      href: '#registration'
    },
    {
      title: 'Dashboard',
      icon: Target,
      description: 'Navigate your reviewer dashboard',
      href: '#dashboard'
    },
    {
      title: 'Review Workflow',
      icon: ClipboardList,
      description: 'Step-by-step review process',
      href: '#workflow'
    },
    {
      title: 'Preferences',
      icon: Settings,
      description: 'Set your expertise areas',
      href: '#preferences'
    },
    {
      title: 'Best Practices',
      icon: CheckCircle2,
      description: 'Tips for effective reviews',
      href: '#best-practices'
    }
  ];

  const guideSections = [
    {
      id: 'role-overview',
      title: 'Role Overview',
      icon: Shield,
      content: `As a reviewer for DLinRT, you play a critical role in maintaining the accuracy and reliability of our product database. Reviewers are trusted community members with expertise in medical devices and regulatory compliance.

**Your Responsibilities:**
- Review assigned products for accuracy and completeness
- Verify regulatory compliance information (CE marking, FDA status)
- Check technical specifications and documentation
- Provide constructive feedback to improve product listings
- Maintain objectivity and follow evidence-based verification

**What Makes a Good Reviewer:**
- Domain expertise in medical devices or healthcare technology
- Understanding of regulatory frameworks (MDR, FDA)
- Attention to detail and commitment to accuracy
- Professional communication skills
- Ability to work independently and meet deadlines`,
      keywords: ['role', 'responsibilities', 'reviewer', 'overview', 'what']
    },
    {
      id: 'registration',
      title: 'Registration & Authentication Workflow',
      icon: UserCheck,
      content: `Follow these steps to become a verified reviewer:

**Step 1: Create a DLinRT Account**
- Visit the DLinRT website and sign up with your institutional email
- Institutional emails (@dlinrt.eu) are automatically verified
- Complete your profile with accurate information

**Step 2: Navigate to Your Profile**
- Log in to your account
- Click on your profile icon in the top right
- Select "Profile" from the dropdown menu

**Step 3: Request Reviewer Role**
- On your profile page, find the "Request Additional Role" section
- Click "Request New Role"
- Select "Reviewer" from the role options

**Step 4: Provide Verification Details**
- **Institutional Email**: Use your work email for verification (preferred)
- **Expertise Areas**: Specify your areas of expertise (e.g., cardiology devices, imaging systems)
- **Institution**: Provide your affiliated organization or institution
- **Justification**: Explain your qualifications and why you want to be a reviewer
  - Include relevant experience (years in field, specific domains)
  - Mention any certifications or credentials
  - Describe your familiarity with regulatory frameworks

**Step 5: Wait for Admin Approval**
- Admins review requests typically within 1-3 business days
- You'll receive a notification when your request is processed
- Note: Users with @dlinrt.eu emails are auto-approved
- Once approved, you'll have access to the Reviewer Dashboard

**Verification Tips:**
✓ Use your institutional email for faster verification
✓ Be specific about your expertise areas
✓ Provide concrete examples of relevant experience
✓ Include any relevant publications or certifications`,
      keywords: ['registration', 'become', 'request', 'sign up', 'how to', 'join', 'authentication', 'workflow']
    },
    {
      id: 'dashboard',
      title: 'Reviewer Dashboard Overview',
      icon: Target,
      content: `Your Reviewer Dashboard is your central hub for managing review assignments and preferences.

**Assignments Tab**
View all products assigned to you for review:
- **Pending**: Not yet started
- **In Progress**: Currently being reviewed
- **Completed**: Finished reviews

Each assignment shows:
- Product name and company
- Review round information
- Deadline (if applicable)
- Priority level
- Current status

**Preferences Tab**
Set your expertise and preferences to receive relevant assignments:
- **Category Preferences**: Select product categories you're knowledgeable about
- **Company Preferences**: Companies you prefer to review (or exclude)
- **Product Preferences**: Specific products you have expertise in
- **Priority Levels**: Set priority for different preference types

Admins use these preferences for auto-assignment in review rounds.

**History Tab**
Track your completed reviews:
- Review date and time spent
- Products reviewed
- Review scores (if applicable)
- Feedback provided

**Accessing the Dashboard:**
Click "Reviewer" in the top navigation menu to access your dashboard.`,
      keywords: ['dashboard', 'assignments', 'preferences', 'history', 'navigate', 'interface']
    },
    {
      id: 'getting-started',
      title: 'Getting Started with Your First Review',
      icon: BookOpen,
      content: `Welcome! Here's what you need to know to start reviewing:

**Understanding Your Assignment:**
- Check your deadline and priority level
- Review the product category and type
- Note any special instructions from admins
- Understand the review round objectives

**Before You Begin:**
1. Ensure you have sufficient time to complete the review
2. Gather any necessary reference materials
3. Clear your schedule to focus without interruptions
4. Familiarize yourself with the product's regulatory context

**Starting a Review:**
1. Navigate to your Reviewer Dashboard
2. Find the assigned product in your "Pending" list
3. Click "Start Review" to begin
4. The status changes to "In Progress"
5. The system tracks time spent on the review

**During the Review:**
- Work through verification checklist items systematically
- Document your findings as you go
- Take breaks if needed (your progress is saved)
- Add notes for unclear or questionable information

**Completing a Review:**
1. Ensure all checklist items are addressed
2. Add any final comments or recommendations
3. Click "Complete Review" when finished
4. Review is submitted and status changes to "Completed"`,
      keywords: ['getting started', 'first', 'begin', 'start', 'new', 'introduction']
    },
    {
      id: 'workflow',
      title: 'Review Workflow & Process',
      icon: ClipboardList,
      content: `Follow this systematic approach for effective product reviews:

**Phase 1: Initial Assessment (10-15 minutes)**
- Read the complete product listing
- Check for obvious errors or missing information
- Identify areas requiring deeper verification
- Note any red flags or concerns

**Phase 2: Regulatory Verification (20-30 minutes)**
- Verify CE marking status and classification
- Check FDA clearance/approval claims
- Confirm regulatory body certifications
- Cross-reference with official databases
- Verify compliance with current regulations (MDR vs MDD)

**Phase 3: Technical Review (15-25 minutes)**
- Verify technical specifications
- Check product description accuracy
- Confirm intended use statements
- Review contraindications and warnings
- Validate clinical evidence claims

**Phase 4: Documentation Check (10-15 minutes)**
- Verify manufacturer information
- Check for complete contact details
- Confirm product identifiers (UDI, catalog numbers)
- Review documentation links and references
- Ensure proper citations

**Phase 5: Final Assessment (5-10 minutes)**
- Complete all checklist items
- Add comprehensive review comments
- Assign review score (if applicable)
- Make recommendations for improvements
- Submit completed review

**Time Management:**
Most reviews take 60-90 minutes. Plan accordingly and take breaks if needed.`,
      keywords: ['workflow', 'process', 'steps', 'procedure', 'how to review']
    },
    {
      id: 'what-to-review',
      title: 'What to Review & Verify',
      icon: FileText,
      content: `**Regulatory Compliance:**
✓ CE marking status and validity
✓ FDA clearance/approval status
✓ Classification (Class I, IIa, IIb, III)
✓ Notified Body information (for CE)
✓ 510(k) numbers or PMA numbers (for FDA)
✓ Regulatory body certifications (TGA, Health Canada, etc.)
✓ Current regulation compliance (MDR vs MDD transition)

**Product Information:**
✓ Accurate product name and description
✓ Manufacturer details and contact information
✓ Intended use and indications
✓ Technical specifications
✓ Contraindications and warnings
✓ Clinical evidence references

**Documentation:**
✓ Valid UDI (Unique Device Identifier)
✓ Catalog/model numbers
✓ IFU (Instructions for Use) availability
✓ Technical documentation links
✓ Supporting literature references

**Common Issues to Flag:**
⚠ Expired or invalid certifications
⚠ Inconsistent regulatory information
⚠ Missing critical safety information
⚠ Outdated product versions
⚠ Broken documentation links
⚠ Unsubstantiated claims`,
      keywords: ['verify', 'check', 'what', 'items', 'checklist', 'validation']
    },
    {
      id: 'sources',
      title: 'Verification Sources & Tools',
      icon: Search,
      content: `**Official Regulatory Databases:**

**European Union:**
- EUDAMED (EU Medical Device Database)
- Notified Body NANDO Database
- European Commission Medical Devices Portal

**United States:**
- FDA 510(k) Premarket Notification Database
- FDA PMA Database
- FDA Establishment Registration Database
- FDA UDI Database (GUDID)

**Other Jurisdictions:**
- Health Canada Medical Devices Active Licence Listing
- TGA (Australia) ARTG Database
- PMDA (Japan) Medical Device Information
- ANVISA (Brazil) Medical Device Registry

**Industry Resources:**
- Manufacturer websites (official product pages)
- IFU (Instructions for Use) documents
- Technical specifications sheets
- Clinical evidence publications (PubMed, clinical trial registries)
- Professional medical device associations

**Verification Best Practices:**
✓ Always use official regulatory databases as primary sources
✓ Cross-reference information across multiple sources
✓ Check date of last verification/update
✓ Document your sources in review comments
✓ When in doubt, contact the manufacturer directly`,
      keywords: ['sources', 'databases', 'verify', 'tools', 'where', 'FDA', 'CE', 'regulatory']
    },
    {
      id: 'preferences',
      title: 'Setting Your Expertise Preferences',
      icon: Settings,
      content: `Configure your expertise preferences to receive relevant assignments:

**Why Set Preferences?**
- Receive assignments matching your expertise
- Improve review quality and efficiency
- Reduce time spent on unfamiliar products
- Help admins optimize workload distribution

**Types of Preferences:**

**1. Category Preferences (Recommended)**
- Select broad product categories (e.g., Cardiovascular, Imaging, Diagnostics)
- Helps with automated assignment in review rounds
- Can select multiple categories

**2. Company Preferences (Optional)**
- Specify companies you're familiar with
- Useful for avoiding conflicts of interest
- Can mark companies as "preferred" or "excluded"

**3. Product Preferences (Advanced)**
- Select specific products you have deep expertise in
- Used for targeted assignments
- Helpful for complex or specialized reviews

**How to Set Preferences:**
1. Go to Reviewer Dashboard → Preferences Tab
2. Click "Add Preference"
3. Select preference type (Category, Company, or Product)
4. Choose items from dropdown
5. Set priority level (High, Medium, Low)
6. Save your preferences

**Tips:**
✓ Start with 3-5 category preferences
✓ Update preferences as your expertise grows
✓ Be honest about your knowledge level
✓ You can always update preferences later`,
      keywords: ['preferences', 'expertise', 'settings', 'configure', 'assignments']
    },
    {
      id: 'best-practices',
      title: 'Best Practices & Tips',
      icon: CheckCircle2,
      content: `**Quality Review Practices:**
✓ Always verify information against official sources
✓ Document your verification sources in comments
✓ Be thorough but efficient with your time
✓ Flag uncertainties rather than making assumptions
✓ Provide constructive feedback for improvements
✓ Maintain objectivity and avoid bias

**Time Management:**
✓ Set aside dedicated time blocks for reviews
✓ Aim for 60-90 minutes per standard product review
✓ Take breaks for complex or lengthy reviews
✓ Don't rush - accuracy is more important than speed
✓ Start with easier assignments to build confidence

**Communication:**
✓ Write clear, specific review comments
✓ Use professional and respectful language
✓ Explain your reasoning for flagged issues
✓ Suggest specific improvements when possible
✓ Respond to admin queries promptly

**Continuous Improvement:**
✓ Learn from feedback on your reviews
✓ Stay updated on regulatory changes
✓ Attend reviewer training sessions (if offered)
✓ Share knowledge with fellow reviewers
✓ Update your preferences as expertise grows

**Ethical Considerations:**
✓ Disclose any conflicts of interest
✓ Respect confidentiality of proprietary information
✓ Avoid reviewing products from your employer
✓ Maintain independence and objectivity
✓ Follow GDPR and data protection guidelines`,
      keywords: ['best practices', 'tips', 'advice', 'quality', 'standards', 'ethics']
    },
    {
      id: 'common-questions',
      title: 'Common Questions & Troubleshooting',
      icon: MessageSquare,
      content: `**Q: How long does it take to become a verified reviewer?**
A: Typically 1-3 business days. Users with @dlinrt.eu emails are auto-approved immediately.

**Q: How many products will I be assigned?**
A: It varies based on review rounds and your preferences. You can expect 3-10 products per active review round.

**Q: What if I can't complete a review by the deadline?**
A: Contact an admin as soon as possible to request an extension or reassignment. It's better to communicate early than miss a deadline.

**Q: Can I decline an assignment?**
A: Yes, contact an admin if you're unable to review an assigned product. Update your preferences to avoid similar assignments in the future.

**Q: What if I find conflicting information?**
A: Document all sources and the conflicting information in your review comments. Flag it for admin attention and provide your assessment.

**Q: How detailed should my review comments be?**
A: Provide enough detail for admins and companies to understand your findings. Include specific issues, sources consulted, and recommendations.

**Q: Can I review products from my own company?**
A: No, to maintain objectivity. Add your employer to your excluded companies in preferences.

**Q: What if I'm unsure about something?**
A: It's better to flag uncertainty and ask for guidance than to make incorrect assumptions. Add a comment explaining your uncertainty.

**Q: How do I report a serious safety concern?**
A: Flag it in your review and immediately contact an admin with details. Serious safety issues require urgent attention.

**Q: Can I see other reviewers' comments?**
A: No, reviews are independent to maintain objectivity. Admins may aggregate feedback from multiple reviewers.`,
      keywords: ['questions', 'FAQ', 'help', 'troubleshooting', 'problems', 'issues', 'how']
    }
  ];

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return guideSections;
    
    const query = searchQuery.toLowerCase();
    return guideSections.filter(section => 
      section.title.toLowerCase().includes(query) ||
      section.content.toLowerCase().includes(query) ||
      section.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const accordionValue = searchQuery ? filteredSections.map(s => s.id) : undefined;

  return (
    <PageLayout
      title="Reviewer Guide - DLinRT"
      description="Comprehensive guide for product reviewers including workflow, best practices, and verification procedures"
      canonical="https://dlinrt.eu/reviewer/guide"
    >
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-500/10 via-purple-600/10 to-purple-500/10 border-b">
          <div className="container mx-auto px-4 py-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/reviewer')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Search className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Reviewer Guide</h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Complete guide to reviewing medical device products with accuracy and expertise
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {quickNavCards.map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.title}
                  href={card.href}
                  className="block group"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-purple-200/50">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                          <Icon className="h-5 w-5 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-2">{card.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              );
            })}
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Guide
              </CardTitle>
              <CardDescription>
                Find information quickly by searching for keywords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for topics, keywords, or questions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery && (
                <div className="mt-3 text-sm text-muted-foreground">
                  {filteredSections.length} {filteredSections.length === 1 ? 'result' : 'results'} found
                  {filteredSections.length > 0 && ' - All sections expanded below'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guide Content */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Reviewer Guide</CardTitle>
              <CardDescription>
                Comprehensive documentation for effective product reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredSections.length > 0 ? (
                <Accordion type="multiple" value={accordionValue} className="w-full">
                  {filteredSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <AccordionItem key={section.id} value={section.id} id={section.id}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <span className="font-semibold">{section.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none pl-8 whitespace-pre-line">
                            {section.content}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No results found for "{searchQuery}"
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearchQuery('')}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={() => navigate('/reviewer')} variant="outline">
              Go to Dashboard
            </Button>
            <Button onClick={() => navigate('/support')} variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReviewerGuide;
