import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader active="privacy" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last updated: July 23, 2026</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to YieldGrower (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy
            and are committed to protecting it through our compliance with this privacy
            policy. This policy describes the types of information we may collect from
            you or that you may provide when you visit the website yieldgrower.com (our
            &quot;Website&quot;) and our practices for collecting, using, maintaining, protecting,
            and disclosing that information.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We do not require users to create an account, log in, or provide personal
            financial data to use our calculator. All calculations are performed locally
            in your browser. However, we may collect certain information automatically
            when you visit our Website:
          </p>
          <ul>
            <li>
              <strong>Usage Details:</strong> Information about your internet connection,
              the equipment you use to access our Website, and usage details.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies and
              similar tracking technologies to track the activity on our Website and hold
              certain information. This includes Google AdSense cookies for advertising
              purposes.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use information that we collect about you or that you provide to us:</p>
          <ul>
            <li>To present our Website and its contents to you.</li>
            <li>To improve our Website and user experience.</li>
            <li>To display advertisements via Google AdSense.</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>
            We use third-party services that may collect information used to identify
            you:
          </p>
          <ul>
            <li>
              <strong>Google AdSense:</strong> We use Google AdSense to display ads.
              Google&apos;s use of advertising cookies enables it and its partners to serve
              ads to our users based on their visit to our sites and/or other sites on
              the Internet. Users may opt out of personalized advertising by visiting
              Google&apos;s Ads Settings.
            </li>
            <li>
              <strong>Vercel:</strong> Our website is hosted on Vercel, which may collect
              basic server logs.
            </li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information
            from accidental loss and from unauthorized access, use, alteration, and
            disclosure. Since we do not collect sensitive personal or financial data, the
            risk is minimal.
          </p>

          <h2>6. Changes to Our Privacy Policy</h2>
          <p>
            It is our policy to post any changes we make to our privacy policy on this
            page. If we make material changes to how we treat our users&apos; personal
            information, we will notify you through a notice on the Website home page.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy
            practices, contact us at: support@yieldgrower.com
          </p>
        </div>
      </main>
    </div>
  );
}
