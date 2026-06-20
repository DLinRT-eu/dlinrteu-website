import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Privacy Policy"
      description="How DLinRT.eu collects, processes, retains, and protects personal data, the sub-processors involved, and how to exercise GDPR rights."
      canonical="https://dlinrt.eu/privacy-policy"
    />
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="mb-4"><strong>Last updated: June 20, 2026</strong></p>

      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Controller</h2>
        <p className="mb-4">
          The data controller for personal data processed through this website is the
          DLinRT.eu maintainer team. Contact: <a className="text-[#5090D0] hover:underline" href="mailto:info@dlinrt.eu">info@dlinrt.eu</a>.
          For all rights requests, security reports, or privacy questions, please use this address.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Overview &amp; principles</h2>
        <p className="mb-4">
          You can browse DLinRT.eu anonymously. Personal data is collected only when you
          actively use a feature that requires it (e.g. creating an account, subscribing to the
          newsletter, contacting us, submitting feedback, donating). We process the minimum
          data needed, retain it only as long as necessary, and never sell it.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. What we collect, why, and on what legal basis</h2>
        <p className="mb-4">The table below describes every category of personal data we process under the GDPR (Art. 6, 9 N/A).</p>

        <div className="overflow-x-auto not-prose mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Data</th>
                <th className="p-2 border">Purpose</th>
                <th className="p-2 border">Lawful basis</th>
                <th className="p-2 border">Retention</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr><td className="p-2 border">Account &amp; profile</td><td className="p-2 border">Email, name, organisation, role, optional profile fields, hashed password (managed by Supabase Auth)</td><td className="p-2 border">Create and operate your account, gate access to authenticated features</td><td className="p-2 border">Contract (Art. 6(1)(b))</td><td className="p-2 border">Until account deletion</td></tr>
              <tr><td className="p-2 border">Roles &amp; permissions</td><td className="p-2 border">Role assignment (admin, reviewer, company), approval status, role-change history</td><td className="p-2 border">Authorise reviewer/company/admin workflows; audit trail</td><td className="p-2 border">Legitimate interest &amp; legal obligation (Art. 6(1)(f),(c))</td><td className="p-2 border">Until account deletion; audit log up to 2 years</td></tr>
              <tr><td className="p-2 border">Multi-factor authentication</td><td className="p-2 border">TOTP factor metadata, bcrypt-hashed backup codes, MFA activity log (action, factor type, timestamp, SHA-256-hashed IP, user agent)</td><td className="p-2 border">Protect your account; investigate suspicious activity</td><td className="p-2 border">Legal obligation &amp; legitimate interest (Art. 6(1)(c),(f))</td><td className="p-2 border">Activity log auto-purged after 365 days</td></tr>
              <tr><td className="p-2 border">Security events</td><td className="p-2 border">Event type, SHA-256-hashed IP, user agent, timestamp, user_id where applicable</td><td className="p-2 border">Detect abuse, brute force, anomalous access</td><td className="p-2 border">Legitimate interest (Art. 6(1)(f))</td><td className="p-2 border">Auto-purged after 180 days</td></tr>
              <tr><td className="p-2 border">Analytics (consented)</td><td className="p-2 border">Page path, session timestamps, anonymous visitor token, basic device/browser; <strong>no third-party trackers</strong></td><td className="p-2 border">Understand which content is useful</td><td className="p-2 border">Consent (Art. 6(1)(a))</td><td className="p-2 border">Auto-purged after 365 days; consent withdrawable anytime</td></tr>
              <tr><td className="p-2 border">Newsletter</td><td className="p-2 border">First name, last name, email, consent record, engagement (opens/clicks via Resend)</td><td className="p-2 border">Send DLinRT updates you asked for</td><td className="p-2 border">Consent (Art. 6(1)(a))</td><td className="p-2 border">Until you unsubscribe; one-click unsubscribe link in every email</td></tr>
              <tr><td className="p-2 border">Contact submissions</td><td className="p-2 border">Name, email, message, timestamp, status</td><td className="p-2 border">Respond to your inquiry</td><td className="p-2 border">Consent / pre-contractual steps (Art. 6(1)(a),(b))</td><td className="p-2 border">Up to 2 years after resolution, then auto-purged</td></tr>
              <tr><td className="p-2 border">Product feedback</td><td className="p-2 border">Optional name, institutional email, product reference, feedback content</td><td className="p-2 border">Improve catalogue accuracy and forward feedback to reviewers</td><td className="p-2 border">Consent (Art. 6(1)(a))</td><td className="p-2 border">Until processed; aggregated for catalogue updates</td></tr>
              <tr><td className="p-2 border">Reviewer / company representative workflow</td><td className="p-2 border">Assignment history, expertise, review comments, certification tasks, invitation tokens</td><td className="p-2 border">Operate peer-review and company-verification programs</td><td className="p-2 border">Contract / legitimate interest (Art. 6(1)(b),(f))</td><td className="p-2 border">Duration of role assignment</td></tr>
              <tr><td className="p-2 border">Products you use (user_products)</td><td className="p-2 border">Self-declared product adoption, experience notes</td><td className="p-2 border">Aggregate clinical-experience signals</td><td className="p-2 border">Consent (Art. 6(1)(a))</td><td className="p-2 border">Until you remove the entry or delete your account</td></tr>
              <tr><td className="p-2 border">Email send log</td><td className="p-2 border">Recipient address, subject, status, provider message id</td><td className="p-2 border">Deliverability monitoring, abuse handling</td><td className="p-2 border">Legitimate interest (Art. 6(1)(f))</td><td className="p-2 border">Auto-purged after 90 days</td></tr>
              <tr><td className="p-2 border">Consent audit log</td><td className="p-2 border">Action, consent version, timestamp, SHA-256-hashed IP</td><td className="p-2 border">Demonstrate proof of consent (Art. 7(1))</td><td className="p-2 border">Legal obligation (Art. 6(1)(c))</td><td className="p-2 border">Retained while consent is active; archived 3 years after withdrawal</td></tr>
              <tr><td className="p-2 border">Donations</td><td className="p-2 border">Handled by Paddle as Merchant of Record. We receive aggregated metadata only (amount, country, anonymised reference)</td><td className="p-2 border">Process donations and meet tax/accounting obligations</td><td className="p-2 border">Legal obligation (Art. 6(1)(c))</td><td className="p-2 border">Per statutory accounting periods (typically 7–10 years for tax records held by Paddle)</td></tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4">
          We never collect special-category data (Art. 9 GDPR) and the site is not directed at children under 16.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. IP address handling</h2>
        <p className="mb-4">
          We never store raw IP addresses. Where an IP is needed for security or rate-limiting,
          it is hashed with SHA-256 before storage and cannot be reversed to identify you.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Cookies &amp; tracking</h2>
        <p className="mb-4">
          Essential cookies (session, authentication, consent state) are set on first visit
          and do not require consent. First-party analytics cookies are set <strong>only after
          you grant consent</strong> via the cookie banner. We use <strong>no third-party
          advertising or tracking cookies</strong>. You can change your choice anytime via
          the "Cookie Settings" link in the footer.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Sub-processors &amp; international transfers</h2>
        <p className="mb-4">
          We use a limited number of sub-processors to host the site, deliver email, broadcast
          the newsletter, and process donations. Transfers outside the EEA rely on the European
          Commission's Standard Contractual Clauses (SCCs).
        </p>
        <p className="mb-4">
          The complete, up-to-date list (purpose, location, transfer safeguard) is published at{" "}
          <Link to="/subprocessors" className="text-[#5090D0] hover:underline">dlinrt.eu/subprocessors</Link>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. Your rights (GDPR Art. 15–22)</h2>
        <ul className="mb-4 ml-6 list-disc">
          <li><strong>Access &amp; portability:</strong> download a machine-readable JSON export of your data from <em>Profile → Data Export</em>.</li>
          <li><strong>Rectification:</strong> edit your profile fields directly on the <em>Profile</em> page.</li>
          <li><strong>Erasure ("right to be forgotten"):</strong> permanently delete your account and associated personal data from <em>Profile → Delete Account</em>. Free-text fields you submitted (contact messages, feedback) are also scrubbed of identifying email at the same time.</li>
          <li><strong>Withdraw consent:</strong> unsubscribe from any newsletter via the link in each email, or disable analytics in <em>Cookie Settings</em>.</li>
          <li><strong>Restriction &amp; objection:</strong> contact <a className="text-[#5090D0] hover:underline" href="mailto:info@dlinrt.eu">info@dlinrt.eu</a>.</li>
          <li><strong>Complaint:</strong> you may lodge a complaint with your local EU data protection authority.</li>
        </ul>
        <p className="mb-4">
          We respond to verified rights requests within one month (Art. 12(3)).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Security</h2>
        <p className="mb-4">
          We apply Row-Level Security on every personal-data table, TLS for all transport,
          bcrypt for MFA backup codes, SHA-256 IP hashing, role-based access control,
          and an append-only audit log for administrative actions. Vulnerability reports are
          welcome at <a className="text-[#5090D0] hover:underline" href="mailto:info@dlinrt.eu">info@dlinrt.eu</a> — see also our{" "}
          <Link to="/security" className="text-[#5090D0] hover:underline">Security page</Link>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">9. Automated decision-making</h2>
        <p className="mb-4">
          We do not perform automated decision-making or profiling within the meaning of Art. 22 GDPR.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">10. Changes to this policy</h2>
        <p className="mb-4">
          Material changes are reflected by updating the "Last updated" date above. Significant
          changes affecting newsletter subscribers will be communicated by email.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">11. Contact</h2>
        <p className="mb-4">
          Privacy questions or rights requests: <a className="text-[#5090D0] hover:underline" href="mailto:info@dlinrt.eu">info@dlinrt.eu</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Legal disclaimer</h2>
        <p className="mb-4">
          Catalogue content is revised periodically; maintainers do not assume liability for
          possible incorrect information. All content is provided for informational purposes only.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
