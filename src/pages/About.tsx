import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import BlackPaperSection from "@/components/about/BlackPaperSection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import TeamSection from "@/components/about/TeamSection";
import StakeholderUseCases from "@/components/about/StakeholderUseCases";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Building2, User, BarChart3 } from "lucide-react";
import SponsorAcknowledgement from "@/components/SponsorAcknowledgement";
import usmanLulaAsset from "../../public/people/Usman_Lula.jpeg.asset.json";

const TEAM_MEMBERS = [
  {
    name: "Matteo Maspero",
    role: "Website creator, Lead Developer & Reviewer",
    image: "/people/matteo-maspero.jpg",
    bio: "https://cig-utrecht.org/members/matteo-maspero",
    email: "matteo.maspero@dlinrt.eu",
  },
  {
    name: "Mustafa Kadhim",
    role: "Maintainer & Reviewer",
    image: "/people/Musti_Kadhim.jpg",
    bio: "https://portal.research.lu.se/en/persons/mustafa-kadhim",
    email: "mustafa.kadhim@dlinrt.eu",
  },
  {
    name: "Paul Doolan",
    role: "Advisor & Reviewer",
    image: "/people/PDoolan_portrait.jpg",
    bio: "https://www.linkedin.com/in/pjdoolan1/",
    email: "paul.doolan@dlinrt.eu",
  },
  {
    name: "Ana Maria Barragan Montero",
    role: "Advisor & Reviewer",
    image: "/people/Ana.png",
    bio: "https://be.linkedin.com/in/ana-maria-barragan-montero-93090266",
    email: "ana.barragan@dlinrt.eu",
  },
  {
    name: "Federico Mastroleo",
    role: "Advisor & Reviewer",
    image: "/people/Federico.jpg",
    bio: "https://www.linkedin.com/in/federico-mastroleo/",
    email: "federico.mastroleo@dlinrt.eu",
  },
  {
    name: "Viktor Rogowski",
    role: "Advisor & Reviewer",
    image: "/people/Viktor.png",
    bio: "https://www.linkedin.com/in/viktor-rogowski/",
    email: "viktor.rogowski@dlinrt.eu",
  },
  {
    name: "Kareem Wahid",
    role: "Reviewer",
    image: "/people/Kareem.jpg",
    bio: "https://www.linkedin.com/in/kareem-wahid-307241178/",
    email: "kareem.wahid@dlinrt.eu",
  },
  {
    name: "Mark Gooding",
    role: "Reviewer",
    image: "/people/MarkGooding.jpg",
    bio: "https://www.inpictura.com/#WhoWeAre",
    email: "mark.gooding@dlinrt.eu",
  },
  {
    name: "Tamás Ungvári",
    role: "Reviewer",
    image: "/people/tamas-ungvari.jpg",
    bio: "https://linkedin.com/in/ungvaritamas",
    email: "tamas.ungvari@dlinrt.eu",
  },
    {
    name: "Amith Kamath",
    role: "Reviewer",
    image: "/people/akamath.jpeg",
    bio: "https://amithjkamath.github.io/",
    email: "amith.kamath@dlinrt.eu",
  },
  {
    name: "Szabolcs David",
    role: "Reviewer",
    image: "/people/Szabolcs.jpg",
    bio: "https://www.amsterdamumc.org/en/research/researchers/szabolcs-david",
    email: "szabolcs.david@dlinrt.eu",
  },
  {
    name: "Usman Lula",
    role: "Reviewer",
    image: usmanLulaAsset.url,
    bio: "https://www.linkedin.com/in/usman-lula-a67636b/",
    email: "usman.lula@dlinrt.eu",
  },
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const About = () => {
  const [shuffledTeamMembers, setShuffledTeamMembers] = useState(TEAM_MEMBERS);

  useEffect(() => {
    setShuffledTeamMembers(shuffleArray(TEAM_MEMBERS));
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DLinRT.eu & Team",
    description: "Learn about our mission, goals, and meet the experts who maintain the DLinRT products finder",
    url: "https://dlinrt.eu/about",
    isPartOf: {
      "@type": "WebSite",
      name: "Deep Learning in Radiotherapy",
      url: "https://dlinrt.eu",
    },
    about: {
      "@type": "Organization",
      name: "DLinRT Team",
      member: shuffledTeamMembers.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        image: member.image,
        sameAs: member.bio,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About - Mission, Team & Supporters"
        description="Learn about DLinRT.eu, the team behind the catalog, our supporter UMC Utrecht, and how user roles work on the platform."
        canonical="https://dlinrt.eu/about"
        structuredData={structuredData}
      />

      {/* Platform Overview (moved from homepage) */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
            About DLinRT.eu
          </h1>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            <p>
              DLinRT.eu is a dedicated resource for{" "}
              <Link to="/products" className="text-[#5090D0] hover:underline">commercial deep learning (DL) solutions</Link>{" "}
              in radiation oncology, focused on the European market and beyond. The platform supports the integration of
              DL technologies into routine clinical practice in radiotherapy.
            </p>
            <p>
              We <Link to="/products" className="text-[#5090D0] hover:underline">catalog and evaluate DL products</Link>{" "}
              across the radiotherapy workflow — from image reconstruction and enhancement to auto-contouring, treatment
              planning, and clinical prediction. We also include <strong>Performance Monitor tools</strong> that help
              quality-assure AI-based products, even if they don't use AI themselves. Each product entry includes
              technical specifications, regulatory status, clinical evidence, and market availability. Our{" "}
              <Link to="/dashboard" className="text-[#5090D0] hover:underline">analytics dashboard</Link> delivers
              quantitative insights into how deep learning solutions are distributed across categories and market
              segments, while our <Link to="/companies" className="text-[#5090D0] hover:underline">companies directory</Link>{" "}
              highlights the vendors pioneering DL integration in radiotherapy.
            </p>
            <p>
              Beyond product cataloguing, our{" "}
              <Link to="/resources-compliance" className="text-[#5090D0] hover:underline">Resources & Compliance section</Link>{" "}
              provides essential regulatory guidance, practical compliance checklists, and standards documentation to
              support the safe deployment of deep learning solutions in clinical radiotherapy workflows.
            </p>
            <p>
              Whether you're a medical physicist seeking{" "}
              <Link to="/products?task=Auto-contouring" className="text-[#5090D0] hover:underline">auto-contouring tools</Link>,
              a radiation oncologist exploring{" "}
              <Link to="/products?task=Treatment%20Planning" className="text-[#5090D0] hover:underline">treatment planning solutions</Link>,
              or a healthcare administrator reviewing new technologies, DLinRT.eu provides clear, up-to-date information
              to support informed decision-making. Stay informed via our{" "}
              <Link to="/news" className="text-[#5090D0] hover:underline">news section</Link> or reach out through our{" "}
              <Link to="/support" className="text-[#5090D0] hover:underline">support center</Link>.
            </p>
          </div>
        </div>
      </section>


      <BlackPaperSection />
      <MissionVisionSection />
      <StakeholderUseCases />
      <CoreValuesSection />

      <TeamSection teamMembers={shuffledTeamMembers} />

      {/* Sponsor Acknowledgement */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            With support from
          </h2>
          <SponsorAcknowledgement variant="compact" />
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Financial Transparency</CardTitle>
              <CardDescription>
                We publish an annual overview of income and expenses, including the support provided by UMC Utrecht.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to="/transparency"
                className="text-primary hover:underline font-medium"
              >
                View the annual financial overview →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Happens After You Log In Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Happens After You Log In?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              DLinRT.eu offers different experiences based on your role. Here's what you can expect after logging in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Regular User Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Regular User</CardTitle>
                <CardDescription>Explore and track AI/ML products in radiotherapy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Browse comprehensive product database</li>
                  <li>• View detailed product information and model cards</li>
                  <li>• Track products you use or have adopted</li>
                  <li>• Specify your relationship with products</li>
                  <li>• Optionally share experiences with community</li>
                  <li>• View other users' product experiences</li>
                  <li>• Export product data and analytics</li>
                  <li>• Request reviewer or company roles from profile</li>
                </ul>
              </CardContent>
            </Card>

            {/* Reviewer Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                  <Eye className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Reviewer</CardTitle>
                <CardDescription>Validate and improve product information quality</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Access dedicated reviewer dashboard</li>
                  <li>• Review assigned products for accuracy</li>
                  <li>• Set expertise preferences (categories, companies, products)</li>
                  <li>• View all user product experiences and feedback</li>
                  <li>• Suggest improvements via review mode</li>
                  <li>• Track review assignments and progress</li>
                  <li>• Submit feedback on product information</li>
                  <li>• All regular user capabilities</li>
                </ul>
              </CardContent>
            </Card>

            {/* Company Representative Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                  <Building2 className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Company Representative</CardTitle>
                <CardDescription>Manage your company's product information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Access company products dashboard</li>
                  <li>• Submit product information updates and revisions</li>
                  <li>• View users who adopted your products (with consent)</li>
                  <li>• Access user feedback and experience notes</li>
                  <li>• Contact users who opted in for communication</li>
                  <li>• Track revision status and approval</li>
                  <li>• Max 10 representatives per company</li>
                  <li>• All regular user capabilities</li>
                </ul>
              </CardContent>
            </Card>

            {/* Administrator Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Administrator</CardTitle>
                <CardDescription>Full platform management and oversight</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Manage all user accounts and roles</li>
                  <li>• Approve role requests (reviewer, company)</li>
                  <li>• Create and manage review rounds</li>
                  <li>• Assign review tasks to reviewers</li>
                  <li>• Access security events and audit logs</li>
                  <li>• Monitor user registrations</li>
                  <li>• Oversee company certifications</li>
                  <li>• Full access to all platform features</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Users with multiple roles can switch between them at any time using the role selector in the header menu.
            </p>
            <a href="/roles" className="text-primary hover:underline font-medium">
              Learn more about roles and permissions →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
