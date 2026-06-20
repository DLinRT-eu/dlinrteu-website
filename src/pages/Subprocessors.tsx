import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

interface Row {
  name: string;
  role: string;
  data: string;
  location: string;
  safeguard: string;
  url: string;
}

const SUBPROCESSORS: Row[] = [
  {
    name: "Supabase",
    role: "Hosting, Postgres database, authentication, edge functions, storage",
    data: "All account & application data (profiles, roles, MFA, content submissions, analytics, security events, email logs)",
    location: "European Union (Frankfurt region)",
    safeguard: "EU hosting; DPA in place",
    url: "https://supabase.com/privacy",
  },
  {
    name: "Resend",
    role: "Transactional email delivery (account notifications, contact replies, reviewer/role workflow emails)",
    data: "Recipient email address, sender metadata, email subject & body, delivery status",
    location: "United States",
    safeguard: "EU Standard Contractual Clauses (SCCs); DPA in place",
    url: "https://resend.com/legal/privacy-policy",
  },
  {
    name: "Paddle",
    role: "Donation processing (Merchant of Record)",
    data: "Donor name, billing email, country, donation amount, payment method metadata (no card numbers stored by DLinRT)",
    location: "United Kingdom / United States",
    safeguard: "Paddle acts as independent controller for payment & tax data; EU SCCs apply for transfers",
    url: "https://www.paddle.com/legal/privacy",
  },
  {
    name: "GitHub (Microsoft)",
    role: "Source-code hosting and automated pull-request creation for approved product edits",
    data: "GitHub usernames of approved company representatives or reviewers; product-edit content (non-personal)",
    location: "United States",
    safeguard: "EU SCCs via Microsoft DPA",
    url: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
  },
  {
    name: "Lovable",
    role: "Application build, preview hosting, and deployment platform",
    data: "Operational logs only; no end-user PII is shared for the production runtime beyond what Supabase already stores",
    location: "European Union",
    safeguard: "EU hosting; DPA in place",
    url: "https://lovable.dev/privacy",
  },
];

const Subprocessors = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Sub-processors"
      description="List of third-party sub-processors that may process personal data on behalf of DLinRT.eu, including their role, location, and transfer safeguards."
      canonical="https://dlinrt.eu/subprocessors"
    />
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Sub-processors</h1>
      <p className="text-sm text-gray-500 mb-6"><strong>Last updated: June 21, 2026</strong></p>

      <p className="mb-6">
        DLinRT.eu uses a small number of carefully selected service providers ("sub-processors")
        to operate the website, deliver email, accept donations, and publish reviewed content.
        Each sub-processor is bound by a Data Processing Agreement (DPA) and processes personal
        data only on documented instructions. International transfers outside the EEA rely on
        the European Commission's Standard Contractual Clauses (SCCs).
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Sub-processor</th>
              <th className="p-3 border">Purpose</th>
              <th className="p-3 border">Data categories</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Transfer safeguard</th>
            </tr>
          </thead>
          <tbody>
            {SUBPROCESSORS.map((s) => (
              <tr key={s.name} className="align-top">
                <td className="p-3 border font-semibold">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#5090D0] hover:underline">{s.name}</a>
                </td>
                <td className="p-3 border">{s.role}</td>
                <td className="p-3 border">{s.data}</td>
                <td className="p-3 border">{s.location}</td>
                <td className="p-3 border">{s.safeguard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-3">Changes to this list</h2>
      <p className="mb-4">
        We update this page whenever we add, remove, or replace a sub-processor that
        processes personal data. Material changes will be reflected in the "Last updated"
        date above and, where appropriate, communicated by email to newsletter subscribers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Questions</h2>
      <p className="mb-4">
        For questions about our sub-processors, transfer safeguards, or to request a copy
        of the SCCs that apply to a specific transfer, contact us at{" "}
        <a href="mailto:info@dlinrt.eu" className="text-[#5090D0] hover:underline">info@dlinrt.eu</a>.
      </p>
    </main>
    <Footer />
  </div>
);

export default Subprocessors;
