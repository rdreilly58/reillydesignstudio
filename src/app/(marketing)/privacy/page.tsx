import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Reilly Design Studio",
  description: "Privacy Policy for Reilly Design Studio LLC",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-zinc-500 mb-12">Reilly Design Studio LLC &mdash; Last updated: February 2026</p>

      <div className="prose prose-invert prose-zinc max-w-none space-y-10">

        <Section title="1. Information We Collect">
          <Subsection title="1.1 Information You Provide">
            <ul>
              <li><strong>Account registration:</strong> name, email address, password</li>
              <li><strong>Orders:</strong> name, email, billing/shipping address, payment information</li>
              <li><strong>Quote requests:</strong> name, email, company, project details</li>
              <li><strong>Contact forms:</strong> name, email, message content</li>
            </ul>
          </Subsection>
          <Subsection title="1.2 Information Collected Automatically">
            <ul>
              <li><strong>Usage data:</strong> pages visited, time spent, referring URLs</li>
              <li><strong>Device data:</strong> browser type, operating system, IP address</li>
              <li><strong>Cookies:</strong> session management, preferences, analytics</li>
            </ul>
          </Subsection>
          <Subsection title="1.3 Payment Information">
            <p>Payment processing is handled by <strong>Stripe</strong>. We do not store credit card numbers on our servers. Stripe&apos;s privacy policy applies to payment data: <a href="https://stripe.com/privacy" className="text-violet-400 hover:text-violet-300">stripe.com/privacy</a>.</p>
          </Subsection>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul>
            <li>To process and fulfill orders</li>
            <li>To deliver digital products and manage download access</li>
            <li>To send order confirmations and updates</li>
            <li>To respond to inquiries and quote requests</li>
            <li>To improve the Site and our services</li>
            <li>To send marketing emails (only with your consent; unsubscribe anytime)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="3. How We Share Your Information">
          <p>We do not sell your personal information. We share data only with:</p>
          <ul>
            <li><strong>Stripe</strong> — payment processing</li>
            <li><strong>AWS</strong> — file storage and hosting infrastructure</li>
            <li><strong>Email service providers</strong> — transactional and marketing emails</li>
            <li><strong>Legal authorities</strong> — when required by law</li>
          </ul>
        </Section>

        <Section title="4. Cookies">
          <p>We use cookies for:</p>
          <ul>
            <li>Keeping you logged in (session cookies)</li>
            <li>Remembering your cart</li>
            <li>Analytics (aggregate, anonymous traffic data)</li>
          </ul>
          <p>You can disable cookies in your browser, but some Site features may not function correctly.</p>
        </Section>

        <Section title="5. Data Retention">
          <ul>
            <li>Account data: retained while your account is active, deleted upon written request</li>
            <li>Order data: retained for 7 years for legal and tax compliance</li>
            <li>Quote inquiries: retained for 2 years</li>
            <li>Analytics data: retained for 26 months</li>
          </ul>
        </Section>

        <Section title="6. Your Rights">
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data (subject to legal retention requirements)</li>
            <li>Opt out of marketing emails at any time</li>
          </ul>
          <p>To exercise these rights, email <a href="mailto:robert.reilly@reillydesignstudio.com" className="text-violet-400 hover:text-violet-300">robert.reilly@reillydesignstudio.com</a>.</p>
        </Section>

        <Section title="7. Security">
          <p>We implement reasonable technical and organizational measures to protect your information, including SSL encryption, access controls, and secure cloud infrastructure. No method of transmission over the Internet is 100% secure.</p>
        </Section>

        <Section title="8. Children">
          <p>The Site is not directed to children under 13. We do not knowingly collect information from children under 13.</p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>We may update this policy periodically. We&apos;ll notify you of material changes via email or a notice on the Site.</p>
        </Section>

        <Section title="10. Contact">
          <p>
            <strong>Reilly Design Studio LLC</strong><br />
            Reston, Virginia<br />
            <a href="mailto:robert.reilly@reillydesignstudio.com" className="text-violet-400 hover:text-violet-300">robert.reilly@reillydesignstudio.com</a>
          </p>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-zinc-800">{title}</h2>
      <div className="text-zinc-400 space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_strong]:text-zinc-200 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="text-base font-medium text-zinc-300 mb-2">{title}</h3>
      {children}
    </div>
  );
}
