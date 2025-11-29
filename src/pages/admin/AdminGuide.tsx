import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Shield, Users, ClipboardList, Building2, Lock, UserCheck, AlertTriangle, Settings, FileText, TrendingUp } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const AdminGuide = () => {
  const navigate = useNavigate();

  const quickNavCards = [
    {
      title: 'User Management',
      icon: Users,
      description: 'Manage users, roles, and permissions',
      href: '/admin/users'
    },
    {
      title: 'Review Rounds',
      icon: ClipboardList,
      description: 'Create and manage review rounds',
      href: '/admin/review-rounds'
    },
    {
      title: 'Review Assignment',
      icon: FileText,
      description: 'Assign products to reviewers',
      href: '/admin/reviews'
    },
    {
      title: 'Company Management',
      icon: Building2,
      description: 'Verify representatives and manage companies',
      href: '/admin/companies'
    },
    {
      title: 'Security Dashboard',
      icon: Lock,
      description: 'Monitor platform security and activity',
      href: '/admin/security'
    },
    {
      title: 'Registration Review',
      icon: UserCheck,
      description: 'Review and approve new registrations',
      href: '/admin/registrations'
    }
  ];

  const guideSections = [
    {
      id: 'role-overview',
      title: 'Administrator Role Overview',
      icon: Shield,
      content: `As a DLinRT Administrator, you are responsible for maintaining the platform's integrity, managing users, and ensuring smooth operations for the entire community.

**Core Responsibilities:**
- User account and role management
- Review round creation and oversight
- Reviewer assignment and workload distribution
- Company representative verification
- Platform security monitoring
- Registration approval and verification
- System configuration and maintenance
- Community support and conflict resolution

**Access Levels:**
Administrators have elevated privileges across the entire platform, including:
- Full database access (read/write for all tables)
- User role assignment and revocation
- Security event monitoring
- Audit log access
- System configuration settings

**Important Note:**
With great power comes great responsibility. Always follow the principle of least privilege and document significant administrative actions.`
    },
    {
      id: 'access-workflow',
      title: 'Administrator Access & Authentication',
      icon: UserCheck,
      content: `Administrator access is granted by the organization, not through the standard role request process.

**How Admin Access is Granted:**

**Method 1: Initial Admin Setup (Database)**
For the first administrator(s):
1. Organization owner/technical lead executes SQL command
2. Directly inserts admin role into user_roles table
3. Uses the user's UUID from auth.users table

Example SQL:
\`\`\`sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');
\`\`\`

**Method 2: Granted by Existing Admin**
Once at least one admin exists:
1. Existing admin logs into the platform
2. Navigates to User Management (/admin/users)
3. Searches for the target user
4. Clicks "Add Role" → Selects "Admin"
5. Confirms the action (logged in audit trail)

**Access Verification:**
After admin role is granted:
- User logs out and logs back in
- Admin menu items appear in navigation
- Access to /admin/* routes is enabled
- Role indicator shows "Administrator" badge

**Security Notes:**
✓ Admin role cannot be self-requested (by design)
✓ All admin grants are logged in admin_audit_log
✓ Organization should maintain 2-3 admins minimum
✓ Regular security audits of admin accounts recommended
✓ Consider MFA requirement for all admin accounts`
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      content: `Manage user accounts, roles, and access permissions through the User Management interface.

**Accessing User Management:**
Navigate to /admin/users from the admin menu.

**Key Features:**

**Search & Filter:**
- Search by name, email, or institution
- Filter by role (Admin, Reviewer, Company, User)
- Sort by registration date, name, or activity
- View approval status (Approved, Pending, Rejected)

**User Actions:**

**1. Add Roles:**
- Click "Add Role" button next to user
- Select role: Admin, Reviewer, or Company
- Action is logged in audit trail
- User receives notification of new role

**2. Remove Roles:**
- Click "Remove" button next to role badge
- Confirm removal in dialog
- Action is logged and user is notified
- Cannot remove last role (must keep 'user' role)

**3. Handle Role Requests:**
- View pending requests in dedicated tab
- Review justification and user background
- Approve or reject with optional feedback
- Auto-approve available for institutional emails

**4. Approve Registrations:**
- Review new user registrations
- Verify institutional email if provided
- Check for spam or fake accounts
- Approve or reject with reason

**Best Practices:**
✓ Review user credentials before granting elevated roles
✓ Document reason for role grants/revocations
✓ Respond to role requests within 1-3 business days
✓ Monitor for suspicious account activity
✓ Regularly audit user permissions

**Company Representative Limits:**
- Maximum 5 representatives per company
- System enforces this limit automatically
- Existing reps must be removed before adding new ones`
    },
    {
      id: 'review-rounds',
      title: 'Review Round Management',
      icon: ClipboardList,
      content: `Organize product reviews into structured rounds for efficient workload distribution.

**What are Review Rounds?**
Review rounds are time-bound periods where multiple products are assigned to reviewers for evaluation. They help organize review activities and track progress.

**Creating a Review Round:**

**Step 1: Plan the Round**
- Determine scope (which products to include)
- Identify available reviewers
- Set timeline and deadlines
- Define round objectives

**Step 2: Create Round**
Navigate to /admin/review-rounds → Click "Create Review Round"
- **Name**: Descriptive title (e.g., "Q1 2025 CE Compliance Review")
- **Round Number**: Sequential number (auto-suggested)
- **Start Date**: When reviewers can begin
- **Default Deadline**: Target completion date
- **Description**: Round objectives and scope
- **Task**: Specific instructions for reviewers

**Step 3: Assign Products & Reviewers**

**Auto-Assignment (Recommended):**
1. Select products to include in round
2. System analyzes reviewer preferences
3. Automatically distributes based on:
   - Expertise match (category, company, product preferences)
   - Current workload balance
   - Historical performance
4. Review and adjust assignments as needed

**Manual Assignment:**
1. Select specific product
2. Choose reviewer from dropdown
3. Set custom deadline if needed
4. Add notes for reviewer
5. Confirm assignment

**Step 4: Start the Round**
- Click "Start Round" to activate
- Reviewers receive notifications
- Assignments appear in their dashboards
- Status changes to "Active"

**Monitoring Progress:**
- View round statistics (pending, in progress, completed)
- Track individual reviewer progress
- Send reminders for approaching deadlines
- Identify bottlenecks or delays

**Completing a Round:**
- All reviews must be submitted
- Admin reviews and validates submissions
- Round status changes to "Completed"
- Generate completion report (optional)

**Best Practices:**
✓ Assign 3-10 products per reviewer per round
✓ Allow 2-4 weeks for completion
✓ Balance workload across reviewers
✓ Consider reviewer expertise and preferences
✓ Send mid-round progress reminders
✓ Document any issues or changes`
    },
    {
      id: 'review-assignment',
      title: 'Review Assignment & Management',
      icon: FileText,
      content: `Manage individual product review assignments outside of review rounds.

**When to Use Manual Assignment:**
- Urgent product reviews needed
- Specialized expertise required
- Follow-up reviews after revisions
- Ad-hoc verification requests
- Correcting assignment issues

**Assigning a Product Review:**

**Step 1: Navigate to Reviews**
Go to /admin/reviews to see all product reviews.

**Step 2: Create Assignment**
Click "Assign Review" button:
- **Product**: Select from dropdown or search
- **Reviewer**: Choose based on expertise
- **Priority**: Low, Medium, High, or Urgent
- **Deadline**: Set completion date (optional)
- **Notes**: Add specific instructions or context
- **Review Round**: Associate with round (optional)

**Step 3: Confirm**
- Review assignment details
- Click "Assign" to send to reviewer
- Reviewer receives notification

**Managing Existing Assignments:**

**Reassignment:**
When a reviewer cannot complete an assignment:
1. Navigate to the review
2. Click "Reassign"
3. Select new reviewer
4. Provide reason for change
5. Original reviewer is notified

**Updating Assignments:**
- Change priority level
- Extend deadline
- Add/update notes
- Track time spent

**Removing Assignments:**
If needed, completely remove an assignment:
1. Click "Remove" button
2. Provide reason (logged)
3. Reviewer is notified

**Viewing Assignment Details:**
- Current status (Pending, In Progress, Completed)
- Time assigned and time spent
- Reviewer notes and comments
- Checklist completion status
- Review history and activity

**Bulk Operations:**
Review rounds allow bulk assignment operations:
- Assign multiple products to multiple reviewers
- Set common deadline for all assignments
- Apply priority to entire batch
- Send batch notifications

**Priority Levels:**

**Urgent** (Complete within 24-48 hours)
- Critical safety issues
- Regulatory deadlines
- Legal compliance requirements

**High** (Complete within 1 week)
- Important updates
- New product launches
- Pending certifications

**Medium** (Complete within 2-3 weeks)
- Standard review assignments
- Routine verifications
- Scheduled updates

**Low** (Complete when available)
- Non-urgent improvements
- Optional enhancements
- Reference checks

**Best Practices:**
✓ Match assignments to reviewer expertise
✓ Check reviewer workload before assigning
✓ Set realistic deadlines
✓ Provide context in notes
✓ Monitor assignment progress
✓ Follow up on overdue assignments`
    },
    {
      id: 'company-management',
      title: 'Company Management',
      icon: Building2,
      content: `Verify company representatives and manage company-related activities.

**Accessing Company Management:**
Navigate to /admin/companies from the admin menu.

**Interface Overview:**

**Representatives Tab:**
View and manage all company representatives:
- Pending verification requests
- Verified representatives
- Representative limits (max 5 per company)
- Verification history

**Products Tab:**
- View products by company
- Assign product ownership
- Track certification status
- Monitor product updates

**Certifications Tab:**
- View all company certifications
- Admin-issued certifications
- Certification history
- Export certification reports

**Verifying Company Representatives:**

**Step 1: Review Request**
When a user requests company role:
- View their profile and credentials
- Check institutional email (if provided)
- Review LinkedIn profile (if provided)
- Verify company affiliation

**Step 2: Verification Process**
- Click "Verify" next to pending representative
- **Options:**
  - ✓ Verify: Grant company role and associate with company
  - ✗ Reject: Deny request with reason
  - ⏸ Request More Info: Ask for additional verification

**Step 3: Associate with Company**
Once verified:
- Link representative to company ID
- Set position/title (optional)
- Add verification notes (internal)
- Representative gains access to company dashboard

**Representative Limits:**
- Maximum 5 representatives per company (enforced)
- To add 6th: Remove an existing representative first
- Logged in audit trail
- Representatives notified of status changes

**Managing Company Products:**

**Product Ownership:**
- Assign products to specific companies
- Allow representatives to submit revisions
- Track revision history
- Monitor compliance updates

**Certification Management:**
- Admins can certify products on behalf of companies
- Useful for verified official data
- Requires evidence and documentation
- Logged with admin details

**Company Analytics:**
- View product adoption rates (with user consent)
- Track revision activity
- Monitor compliance status
- Generate reports

**Best Practices:**
✓ Verify company email or LinkedIn before approval
✓ Document verification evidence in notes
✓ Monitor for fraudulent representative requests
✓ Regular audits of company associations
✓ Respond to verification requests within 2-3 days
✓ Maintain clear communication with representatives`
    },
    {
      id: 'security-monitoring',
      title: 'Security Monitoring',
      icon: Lock,
      content: `Monitor platform security, user activity, and respond to potential threats.

**Accessing Security Dashboard:**
Navigate to /admin/security from the admin menu.

**Key Metrics:**

**Authentication Events:**
- Failed login attempts
- Unusual login patterns
- Account lockouts
- Password reset requests
- MFA enrollment/removal

**User Activity:**
- Role changes and grants
- Permission modifications
- Suspicious access patterns
- Bulk data exports
- Administrative actions

**Data Access:**
- Profile document access logs
- Sensitive data queries
- API usage patterns
- Download activities

**Security Events:**
System automatically logs:
- Multiple failed login attempts (5+ in 15 min)
- Login from new location/device
- Role privilege changes
- Mass data access
- Unusual API patterns
- Potential GDPR violations

**Severity Levels:**

**Critical** (Immediate action required)
- Potential data breach
- Unauthorized admin access
- Mass data export
- Security vulnerability exploitation

**High** (Investigate within 1 hour)
- Repeated failed logins
- Suspicious role changes
- Unusual access patterns
- Potential account compromise

**Medium** (Review within 24 hours)
- Minor policy violations
- Borderline activity patterns
- Configuration warnings

**Low** (Routine monitoring)
- Normal failed logins
- Standard access patterns
- Informational events

**Responding to Security Events:**

**Step 1: Assess**
- Review event details and context
- Check related events and patterns
- Determine if it's a false positive
- Assess potential impact

**Step 2: Investigate**
- Check user's recent activity
- Review audit logs
- Contact user if needed
- Gather evidence

**Step 3: Take Action**
- **Revoke Access**: Remove compromised accounts
- **Reset Credentials**: Force password reset
- **Lock Account**: Temporarily disable access
- **Document**: Add notes to security event
- **Notify**: Alert affected users if needed

**Step 4: Follow Up**
- Mark event as resolved
- Document response and outcome
- Implement preventive measures
- Update security policies if needed

**Emergency Procedures:**

**Suspected Data Breach:**
1. Immediately lock affected accounts
2. Document everything
3. Notify organization leadership
4. Contact affected users (GDPR requirement)
5. Implement containment measures
6. Begin formal incident response

**Suspected Inappropriate Content:**
1. Review reported content
2. Determine policy violation severity
3. Remove content if violates terms
4. Warn or suspend user account
5. Document decision and reasoning
6. Consider law enforcement notification if needed

**Best Practices:**
✓ Review security dashboard daily
✓ Investigate all medium+ severity events
✓ Document all administrative responses
✓ Maintain GDPR compliance at all times
✓ Regular security audits (monthly)
✓ Keep incident response plan updated
✓ Train team on security procedures`
    },
    {
      id: 'registration-review',
      title: 'Registration Review & Approval',
      icon: UserCheck,
      content: `Review and approve new user registrations to maintain platform quality and security.

**Accessing Registration Review:**
Navigate to /admin/registrations from the admin menu.

**Registration Types:**

**Institutional Email:**
- Automatic verification for @dlinrt.eu emails
- Higher trust level
- Expedited approval process

**Public Email:**
- Requires manual verification
- Additional scrutiny needed
- Check for authenticity

**What to Verify:**

**1. Email Authenticity**
✓ Check domain validity
✓ Look for typos in institutional domains
✓ Verify email is not temporary/disposable
✓ Confirm institution exists and is legitimate

**2. Profile Completeness**
✓ First and last name provided
✓ Institution specified (for institutional users)
✓ Professional-sounding profile
✓ No obvious spam indicators

**3. Red Flags**
⚠ Generic or nonsensical names
⚠ Suspicious email patterns
⚠ Multiple registrations from same IP
⚠ Obvious bot activity
⚠ No institution for professional email

**Approval Process:**

**Step 1: Review Registration**
- Check all provided information
- Verify email domain
- Look for red flags
- Check for duplicate accounts

**Step 2: Make Decision**

**Approve:**
- User gains full platform access
- Email confirmation sent
- Can now request additional roles
- Add to active users list

**Reject:**
- User access remains limited
- Email notification with reason
- Account can be deleted (optional)
- Logged in audit trail

**Request More Information:**
- Send email requesting clarification
- User can update profile
- Re-review after response

**Step 3: Document**
- Add verification notes (internal)
- Record decision reasoning
- Flag any concerns for future reference

**Auto-Approval Criteria:**
System can automatically approve users with:
- @dlinrt.eu email address
- Verified institutional email domains
- Invitation token from admin
- Complete profile information

**Handling Suspicious Registrations:**

**Bot Detection:**
- Multiple registrations in short time
- Similar profile patterns
- Nonsensical information
- Reject and flag IP

**Spam Accounts:**
- Promotional content in profile
- Commercial email addresses
- Obvious fake names
- Reject immediately

**Duplicate Accounts:**
- Check for existing accounts with same name/email
- Contact user to clarify
- Merge accounts if legitimate
- Reject duplicates

**Best Practices:**
✓ Review new registrations daily
✓ Approve within 24-48 hours
✓ Verify institutional emails carefully
✓ Document rejection reasons clearly
✓ Communicate professionally with users
✓ Monitor for patterns of abuse
✓ Keep rejection criteria consistent`
    },
    {
      id: 'best-practices',
      title: 'Administrator Best Practices',
      icon: TrendingUp,
      content: `**Access Management:**
✓ Follow principle of least privilege
✓ Grant roles only when necessary
✓ Regularly audit user permissions
✓ Revoke inactive admin accounts
✓ Require MFA for all administrators
✓ Limit admin accounts to 2-5 per organization

**Documentation:**
✓ Document all significant administrative actions
✓ Add notes when granting/revoking roles
✓ Record reasoning for decisions
✓ Maintain incident response logs
✓ Keep security procedures updated

**Communication:**
✓ Respond to role requests promptly (1-3 days)
✓ Provide clear feedback on rejections
✓ Notify users of significant changes
✓ Maintain professional tone in all communications
✓ Keep community informed of platform updates

**Security:**
✓ Review security dashboard daily
✓ Investigate suspicious activities immediately
✓ Enable audit logging for all admin actions
✓ Follow GDPR and data protection guidelines
✓ Regular security training for admin team
✓ Incident response plan ready and tested

**Workload Management:**
✓ Distribute reviewer assignments fairly
✓ Monitor reviewer workload and burnout
✓ Balance expertise with availability
✓ Set realistic deadlines
✓ Provide adequate review time (2-4 weeks)

**Platform Quality:**
✓ Maintain high standards for approvals
✓ Ensure data accuracy and completeness
✓ Monitor product information quality
✓ Address user feedback promptly
✓ Continuously improve processes

**Compliance:**
✓ Follow European GDPR regulations
✓ Respect user data privacy
✓ Maintain consent records
✓ Enable user data export/deletion
✓ Document data processing activities
✓ Regular compliance audits

**Conflict Resolution:**
✓ Stay neutral and objective
✓ Listen to all parties involved
✓ Document conflicts and resolutions
✓ Follow established procedures
✓ Escalate serious issues appropriately`
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting Common Issues',
      icon: AlertTriangle,
      content: `**User Can't Access Admin Features:**
1. Verify admin role is in user_roles table
2. Check user has logged out and back in
3. Clear browser cache/cookies
4. Verify RLS policies allow admin access
5. Check for database role configuration issues

**Role Request Not Appearing:**
1. Check role_requests table for entry
2. Verify RLS policies on role_requests
3. Confirm notification was sent
4. Check spam folder for emails
5. Verify admin has proper permissions to view

**Reviews Not Appearing for Reviewer:**
1. Verify reviewer role is active
2. Check product_reviews table for assignments
3. Confirm assignment status is correct
4. Check RLS policies on product_reviews
5. Verify reviewer's user_id matches assignment

**Permission Error (403):**
1. Check user's roles in user_roles table
2. Verify RLS policies for the resource
3. Confirm function permissions (SECURITY DEFINER)
4. Check has_role() function is working
5. Review Supabase auth configuration

**Company Representative Can't See Products:**
1. Verify company_representatives entry exists
2. Check company_id matches product's company
3. Confirm representative is verified
4. Check RLS policies on products table
5. Verify company_id is correctly set

**Assignments Not Distributing:**
1. Check reviewer preferences are set
2. Verify products have categories assigned
3. Confirm reviewers have appropriate expertise
4. Check auto-assignment algorithm configuration
5. Review error logs in review round creation

**Security Events Not Logging:**
1. Verify security_events table exists
2. Check RLS policies allow writes
3. Confirm trigger functions are active
4. Review Supabase logs for errors
5. Test event creation manually

**Email Notifications Not Sending:**
1. Check notification preferences
2. Verify email service configuration
3. Confirm notification templates exist
4. Check spam folder
5. Review edge function logs

**Data Export Issues:**
1. Check user has permission for export
2. Verify GDPR consent requirements
3. Confirm export functions are working
4. Check for rate limiting
5. Review edge function timeouts

**When to Escalate:**
- Database corruption or data loss
- Security breaches or compromises
- GDPR violation allegations
- Legal requests or subpoenas
- Persistent technical failures
- User safety concerns`
    }
  ];

  return (
    <PageLayout
      title="Administrator Guide - DLinRT"
      description="Comprehensive guide for platform administrators including user management, security monitoring, and system oversight"
      canonical="https://dlinrt.eu/admin/guide"
    >
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-500/10 via-gray-600/10 to-gray-500/10 border-b">
          <div className="container mx-auto px-4 py-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-500/20 rounded-lg">
                <Shield className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Administrator Guide</h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Complete guide to managing the DLinRT platform with security and efficiency
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Navigation Cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickNavCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Button
                    key={card.title}
                    variant="outline"
                    className="h-auto p-4 justify-start"
                    onClick={() => navigate(card.href)}
                  >
                    <Card className="w-full border-0 shadow-none">
                      <CardHeader className="p-0">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-500/10 rounded-lg">
                            <Icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-base">{card.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">{card.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Guide Content */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Administrator Guide</CardTitle>
              <CardDescription>
                Comprehensive documentation for platform administration and oversight
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {guideSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <AccordionItem key={section.id} value={section.id} id={section.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-600 flex-shrink-0" />
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
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={() => navigate('/admin')} variant="outline">
              Go to Admin Dashboard
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

export default AdminGuide;
