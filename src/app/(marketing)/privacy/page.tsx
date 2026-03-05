import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Reilly Design Studio",
  description: "Privacy Policy for Reilly Design Studio LLC and OpenClaw iOS App",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-zinc-500 mb-12">Reilly Design Studio LLC &mdash; Last updated: March 2026</p>

      <div className="prose prose-invert prose-zinc max-w-none space-y-10">

        <Section title="1. Introduction">
          <p>
            This Privacy Policy applies to the websites and services operated by Reilly Design Studio LLC (&quot;we,&quot; &quot;us,&quot; or &quot;Studio&quot;),
            including the OpenClaw iOS application (&quot;App&quot;). We are committed to protecting your privacy and handling your data responsibly.
          </p>
          <p>
            <strong>Publisher:</strong> Reilly Design Studio LLC
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <Subsection title="2.1 Information You Provide">
            <ul>
              <li><strong>Account registration:</strong> name, email address, password</li>
              <li><strong>Orders:</strong> name, email, billing/shipping address, payment information</li>
              <li><strong>Quote requests:</strong> name, email, company, project details</li>
              <li><strong>Contact forms:</strong> name, email, message content</li>
              <li><strong>OpenClaw App:</strong> server connection details you configure (hostname, port, authentication keys)</li>
            </ul>
          </Subsection>
          <Subsection title="2.2 Information Collected Automatically (Website)">
            <ul>
              <li><strong>Usage data:</strong> pages visited, time spent, referring URLs</li>
              <li><strong>Device data:</strong> browser type, operating system, IP address</li>
              <li><strong>Cookies:</strong> session management, preferences, analytics</li>
            </ul>
          </Subsection>
          <Subsection title="2.3 OpenClaw App — Local Storage Only">
            <p>
              The OpenClaw iOS App stores all data <strong>locally on your device</strong>. This includes:
            </p>
            <ul>
              <li>Server connection configurations</li>
              <li>Ed25519 authentication keys (generated and stored securely in iOS Keychain)</li>
              <li>Chat history and session data</li>
              <li>User preferences and settings</li>
            </ul>
            <p>
              <strong>We do not collect, transmit, or store any of your App data on our servers.</strong> All data remains
              entirely on your device unless you explicitly connect to your own self-hosted OpenClaw server.
            </p>
          </Subsection>
          <Subsection title="2.4 Payment Information">
            <p>
              Website payment processing is handled by <strong>Stripe</strong>. In-app purchases (OpenClaw Pro subscription)
              are processed by <strong>Apple via StoreKit</strong>. We do not store credit card numbers on our servers.
              See <a href="https://stripe.com/privacy" className="text-violet-400 hover:text-violet-300">Stripe&apos;s privacy policy</a> and
              <a href="https://www.apple.com/legal/privacy/" className="text-violet-400 hover:text-violet-300"> Apple&apos;s privacy policy</a> for payment data handling.
            </p>
          </Subsection>
        </Section>

        <Section title="3. How We Use Your Information">
          <Subsection title="3.1 Website">
            <ul>
              <li>To process and fulfill orders</li>
              <li>To deliver digital products and manage download access</li>
              <li>To send order confirmations and updates</li>
              <li>To respond to inquiries and quote requests</li>
              <li>To improve the Site and our services</li>
              <li>To send marketing emails (only with your consent; unsubscribe anytime)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </Subsection>
          <Subsection title="3.2 OpenClaw App">
            <p>The App uses your locally stored data solely to:</p>
            <ul>
              <li>Connect to your configured OpenClaw servers</li>
              <li>Authenticate using your Ed25519 keys</li>
              <li>Display your chat sessions and channels</li>
              <li>Deliver push notifications (via Apple Push Notification service)</li>
              <li>Execute scheduled tasks (cron jobs) you configure</li>
            </ul>
          </Subsection>
        </Section>

        <Section title="4. Data Transmission and Security">
          <Subsection title="4.1 WebSocket TLS Encryption">
            <p>
              All communication between the OpenClaw App and your servers uses <strong>WebSocket connections secured with TLS (WSS)</strong>.
              This ensures that all data transmitted between your device and your servers is encrypted in transit.
            </p>
          </Subsection>
          <Subsection title="4.2 Ed25519 Authentication">
            <p>
              The App uses <strong>Ed25519 public-key cryptography</strong> for authentication. Your private keys are generated
              locally on your device and stored securely in the iOS Keychain. Private keys never leave your device.
            </p>
          </Subsection>
          <Subsection title="4.3 Push Notifications">
            <p>
              If you enable push notifications, the App uses <strong>Apple Push Notification service (APNs)</strong> to deliver
              notifications to your device. APNs requires a device token, which is managed by Apple. We only receive notification
              delivery status and do not have access to notification content after delivery.
            </p>
          </Subsection>
        </Section>

        <Section title="5. How We Share Your Information">
          <p>We do not sell your personal information. We share data only with:</p>
          <ul>
            <li><strong>Stripe</strong> — website payment processing</li>
            <li><strong>Apple (StoreKit)</strong> — in-app purchase processing</li>
            <li><strong>Apple (APNs)</strong> — push notification delivery</li>
            <li><strong>AWS</strong> — file storage and hosting infrastructure (website only)</li>
            <li><strong>Email service providers</strong> — transactional and marketing emails</li>
            <li><strong>Legal authorities</strong> — when required by law</li>
          </ul>
          <p>
            <strong>The OpenClaw App does not share any data with third parties.</strong> Your server connections,
            chat data, and configurations remain entirely on your device.
          </p>
        </Section>

        <Section title="6. No Tracking or Analytics in the App">
          <p>
            <strong>The OpenClaw iOS App does not include any tracking, analytics, or advertising SDKs.</strong> We do not:
          </p>
          <ul>
            <li>Track your usage patterns within the App</li>
            <li>Collect device identifiers for advertising purposes</li>
            <li>Share any data with analytics providers</li>
            <li>Display advertisements</li>
            <li>Use any third-party tracking technologies</li>
          </ul>
        </Section>

        <Section title="7. Cookies (Website Only)">
          <p>Our website uses cookies for:</p>
          <ul>
            <li>Keeping you logged in (session cookies)</li>
            <li>Remembering your cart</li>
            <li>Analytics (aggregate, anonymous traffic data)</li>
          </ul>
          <p>You can disable cookies in your browser, but some Site features may not function correctly. The OpenClaw App does not use cookies.</p>
        </Section>

        <Section title="8. Data Retention">
          <Subsection title="8.1 Website Data">
            <ul>
              <li>Account data: retained while your account is active, deleted upon written request</li>
              <li>Order data: retained for 7 years for legal and tax compliance</li>
              <li>Quote inquiries: retained for 2 years</li>
              <li>Analytics data: retained for 26 months</li>
            </ul>
          </Subsection>
          <Subsection title="8.2 App Data">
            <p>
              All OpenClaw App data is stored locally on your device. Data retention is entirely under your control.
              You can delete all App data at any time by:
            </p>
            <ul>
              <li>Using the &quot;Clear Data&quot; option in App settings</li>
              <li>Uninstalling the App from your device</li>
            </ul>
          </Subsection>
        </Section>

        <Section title="9. Your Rights and Data Deletion">
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data (subject to legal retention requirements)</li>
            <li>Opt out of marketing emails at any time</li>
          </ul>
          <Subsection title="9.1 Deleting Your Data">
            <p><strong>Website account data:</strong> Email <a href="mailto:robert.reilly@reillydesignstudio.com" className="text-violet-400 hover:text-violet-300">robert.reilly@reillydesignstudio.com</a> to request deletion of your account and associated data.</p>
            <p><strong>OpenClaw App data:</strong> Since all data is stored locally on your device, you can delete it directly:</p>
            <ul>
              <li>Open the App and navigate to Settings</li>
              <li>Select &quot;Clear All Data&quot; to remove all stored configurations and history</li>
              <li>Alternatively, uninstall the App to remove all data completely</li>
            </ul>
            <p><strong>Subscription cancellation:</strong> Manage or cancel your OpenClaw Pro subscription through your Apple ID settings in the iOS Settings app.</p>
          </Subsection>
        </Section>

        <Section title="10. Children&apos;s Privacy">
          <p>
            Our services, including the OpenClaw App, are not directed to children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us at <a href="mailto:robert.reilly@reillydesignstudio.com" className="text-violet-400 hover:text-violet-300">robert.reilly@reillydesignstudio.com</a> and
            we will take steps to delete such information.
          </p>
          <p>
            The OpenClaw App requires connection to self-hosted servers and is designed for adult users managing
            AI infrastructure. It is not intended for use by children.
          </p>
        </Section>

        <Section title="11. Security">
          <p>
            We implement reasonable technical and organizational measures to protect your information, including:
          </p>
          <ul>
            <li>SSL/TLS encryption for all website communications</li>
            <li>WebSocket TLS (WSS) for all App-to-server communications</li>
            <li>iOS Keychain for secure storage of authentication keys</li>
            <li>Access controls and secure cloud infrastructure</li>
          </ul>
          <p>No method of transmission over the Internet is 100% secure.</p>
        </Section>

        <Section title="12. International Data Transfers">
          <p>
            Our website services are hosted in the United States. If you access our services from outside the United States,
            please be aware that your information may be transferred to, stored, and processed in the United States.
          </p>
          <p>
            The OpenClaw App connects only to servers you configure. Data transfer locations depend entirely on where
            your self-hosted OpenClaw servers are located.
          </p>
        </Section>

        <Section title="13. Changes to This Policy">
          <p>
            We may update this policy periodically. We&apos;ll notify you of material changes via email or a notice on the Site.
            For App updates, significant privacy changes will be noted in App Store release notes.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            For any questions about this Privacy Policy or to exercise your data rights, contact:
          </p>
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
