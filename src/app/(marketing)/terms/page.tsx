import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Sale — Reilly Design Studio",
  description: "Digital Product Terms of Sale for Reilly Design Studio LLC",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Terms of Sale</h1>
      <p className="text-zinc-500 mb-12">Reilly Design Studio LLC &mdash; Last updated: February 2026</p>

      <div className="prose prose-invert prose-zinc max-w-none space-y-10">

        <Section title="1. Products and Licensing">
          <Subsection title="1.1 What You're Buying">
            <p>When you purchase a digital product from Reilly Design Studio LLC (&quot;Studio&quot;), you are purchasing a <strong>license to use</strong> the product — not ownership of the underlying design, artwork, or intellectual property.</p>
          </Subsection>
          <Subsection title="1.2 Personal / Commercial License (Standard)">
            <p>Unless otherwise stated, each purchase grants you a <strong>non-exclusive, non-transferable, perpetual license</strong> to:</p>
            <ul>
              <li>Use the product for personal and commercial projects</li>
              <li>Modify the product for your own use</li>
              <li>Use the product in client work you create on behalf of others</li>
            </ul>
          </Subsection>
          <Subsection title="1.3 Restrictions — You May NOT">
            <ul>
              <li>Resell, redistribute, or sublicense the product (in original or modified form)</li>
              <li>Share, give away, or transfer the product to third parties</li>
              <li>Claim the original design as your own work</li>
              <li>Use the product to create a competing product or template for resale</li>
              <li>Use the product in any unlawful manner</li>
            </ul>
          </Subsection>
          <Subsection title="1.4 Extended License">
            <p>For use cases not covered by the standard license (e.g., resale as part of a template marketplace, large-scale distribution), contact Studio to purchase an Extended License.</p>
          </Subsection>
        </Section>

        <Section title="2. No Refund Policy">
          <p><strong>All digital product sales are final.</strong> Studio does not offer refunds on digital downloads due to the nature of digital goods (they cannot be &quot;returned&quot; once downloaded).</p>
          <p><strong>Exceptions — Studio will issue a refund if:</strong></p>
          <ul>
            <li>The file is corrupted and Studio cannot provide a working replacement within 5 business days</li>
            <li>The product is materially different from its description</li>
          </ul>
          <p>If you experience a technical issue with your download, contact <a href="mailto:robert.reilly@reillydesignstudio.com" className="text-violet-400 hover:text-violet-300">robert.reilly@reillydesignstudio.com</a> within <strong>7 days of purchase</strong> and Studio will make it right.</p>
        </Section>

        <Section title="3. Delivery">
          <Subsection title="3.1 Instant Delivery">
            <p>Digital products are delivered via secure download link immediately upon payment confirmation. The download link is sent to your email and is also accessible from your account dashboard.</p>
          </Subsection>
          <Subsection title="3.2 Download Limits">
            <p>Download links are valid for <strong>30 days</strong> from purchase and limited to <strong>5 downloads</strong>. If you need your link refreshed, contact Studio with your order number.</p>
          </Subsection>
          <Subsection title="3.3 File Formats">
            <p>File formats are listed in each product description. Studio is not responsible for compatibility issues with your specific software version.</p>
          </Subsection>
        </Section>

        <Section title="4. Support">
          <p>Studio provides <strong>30 days of support</strong> after purchase for questions about using the product as intended. Support does not include custom modifications, training, or troubleshooting your own design software.</p>
          <p>Contact <a href="mailto:robert.reilly@reillydesignstudio.com" className="text-violet-400 hover:text-violet-300">robert.reilly@reillydesignstudio.com</a> with your order number in the subject line.</p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>Studio retains all copyright and intellectual property rights to all digital products. The license granted in Section 1 is the full extent of your rights.</p>
          <p>Products may not be reverse-engineered, decompiled, or used to create substantially similar products for distribution.</p>
        </Section>

        <Section title="6. Warranties and Disclaimer">
          <p>Products are provided <strong>&quot;as is.&quot;</strong> Studio makes no warranties regarding fitness for a particular purpose or compatibility with any specific software, version, or system.</p>
          <p>Studio is not liable for any damages arising from use or inability to use a digital product, including but not limited to lost profits or data.</p>
        </Section>

        <Section title="7. Governing Law">
          <p>These Terms are governed by the laws of the Commonwealth of Virginia. Disputes are subject to the dispute resolution provisions of the Client Service Agreement.</p>
        </Section>

        <Section title="8. Changes to These Terms">
          <p>Studio may update these Terms at any time. Purchases made before a change are governed by the Terms in effect at the time of purchase.</p>
        </Section>

        <Section title="9. Contact">
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
