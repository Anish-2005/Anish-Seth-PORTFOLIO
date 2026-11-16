import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { createRateLimiter } from "@/lib/rate-limit";

const LIMITS = { name: 120, email: 200, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** A few messages per 15 minutes per IP is plenty for a person and stops a bot flooding the inbox. */
const rateLimited = createRateLimiter({ max: 4, windowMs: 15 * 60 * 1000 });

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Strip CR/LF so user input can never inject extra mail headers. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/**
 * POST /api/contact — send a contact-form email.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = singleLine(String(body.name ?? ""));
  const email = singleLine(String(body.email ?? ""));
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return NextResponse.json({ error: "Message is too long" }, { status: 413 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  // Only messages that would actually be sent count toward the limit.
  const wait = rateLimited(clientIp(req));
  if (wait) {
    return NextResponse.json(
      { error: "You've sent a few messages already. Give it a few minutes, or email me directly." },
      { status: 429, headers: { "Retry-After": String(wait) } },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
    console.error("Missing email configuration environment variables");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const port = Number.parseInt(SMTP_PORT, 10);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
<div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#faf8f6;border-radius:12px;">
  <div style="background:#ffffff;padding:28px;border-radius:10px;border:1px solid #eee5e2;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#766d71;">Portfolio contact</p>
    <h2 style="margin:0 0 20px;color:#141012;font-size:20px;">New message from ${safeName}</h2>
    <p style="margin:0 0 6px;color:#141012;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#c81e43;">${safeEmail}</a></p>
    <div style="margin-top:18px;padding:16px;background:#f3efec;border-left:3px solid #c81e43;border-radius:6px;line-height:1.6;color:#141012;">${safeMessage}</div>
    <p style="margin:22px 0 0;font-size:12px;color:#766d71;">Reply to this email to respond directly.</p>
  </div>
</div>`.trim(),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
