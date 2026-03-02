/**
 * Send notification emails via Zoho SMTP.
 * Falls back silently if SMTP is not configured — notifications are best-effort.
 */

const ADMIN_EMAIL = "robert.reilly@reillydesignstudio.com";
const FROM_EMAIL = "robert.reilly@reillydesignstudio.com";

interface NotifyOptions {
  subject: string;
  text: string;
  html?: string;
  to?: string;
}

export async function notifyAdmin(options: NotifyOptions): Promise<boolean> {
  const { subject, text, html, to = ADMIN_EMAIL } = options;

  // Try Zoho SMTP via nodemailer if available
  try {
    const nodemailer = await import("nodemailer");

    const host = process.env.SMTP_HOST || "smtp.zoho.com";
    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER || FROM_EMAIL;
    const pass = process.env.SMTP_PASS || "xye1MPMmPvXz";

    if (!pass) {
      console.log("[notify] SMTP_PASS not set, skipping email notification");
      return false;
    }

    const transporter = nodemailer.default.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Reilly Design Studio" <${FROM_EMAIL}>`,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, "<br>"),
    });

    console.log(`[notify] Email sent: ${subject}`);
    return true;
  } catch (error) {
    console.error("[notify] Failed to send email:", error);
    return false;
  }
}

export function quoteNotification(data: {
  name: string;
  email: string;
  service: string;
  description: string;
  company?: string;
  budget?: string;
}) {
  return notifyAdmin({
    subject: `📋 New Quote Request: ${data.service}`,
    text: `New quote request from ${data.name} (${data.email})${data.company ? ` at ${data.company}` : ""}

Service: ${data.service}
Budget: ${data.budget || "Not specified"}

Message:
${data.description}

---
View in admin: https://reillydesignstudio.com/admin/quotes`,
  });
}

export function contactNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  return notifyAdmin({
    subject: `💬 Contact Form: ${data.name}`,
    text: `New message from ${data.name} (${data.email})

${data.message}

---
Reply directly to: ${data.email}`,
  });
}

export function orderNotification(data: {
  customerEmail: string;
  amount: number;
  service: string;
}) {
  return notifyAdmin({
    subject: `💰 New Order: ${data.service} ($${(data.amount / 100).toFixed(2)})`,
    text: `Payment received!

Customer: ${data.customerEmail}
Service: ${data.service}
Amount: $${(data.amount / 100).toFixed(2)}

---
View in Stripe Dashboard`,
  });
}
