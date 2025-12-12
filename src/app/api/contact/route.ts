import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/contact - Send contact form email
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for environment variables
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_EMAIL_TO
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
      console.error("Missing email configuration environment variables");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New Portfolio Contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%); border-radius: 10px;">
  <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(211, 51, 51, 0.1);">
    <h2 style="color: #d73333; margin-top: 0; border-bottom: 3px solid #d73333; padding-bottom: 10px;">
      New Portfolio Contact
    </h2>
    
    <div style="margin: 20px 0; padding: 15px; background: #fef2f2; border-left: 4px solid #d73333; border-radius: 4px;">
      <p style="margin: 5px 0; color: #2c1810;">
        <strong style="color: #d73333;">Name:</strong> ${name}
      </p>
      <p style="margin: 5px 0; color: #2c1810;">
        <strong style="color: #d73333;">Email:</strong> 
        <a href="mailto:${email}" style="color: #d73333; text-decoration: none;">${email}</a>
      </p>
    </div>
    
    <div style="margin: 20px 0;">
      <h3 style="color: #d73333; margin-bottom: 10px;">Message:</h3>
      <div style="padding: 15px; background: #fff5f5; border-radius: 4px; line-height: 1.6; color: #2c1810;">
        ${message.replace(/\n/g, '<br>')}
      </div>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #fca5a5; text-align: center; color: #6b4a3a; font-size: 12px;">
      <p>This message was sent from your portfolio contact form</p>
      <p style="margin: 5px 0;">
        Reply directly to this email to respond to ${name}
      </p>
    </div>
  </div>
</div>
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
