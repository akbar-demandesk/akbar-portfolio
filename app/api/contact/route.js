import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000", // Replace with your domain in production
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

// Email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>New Message Received</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <blockquote>${userMessage}</blockquote>
  </div>
`;

// Send Email
async function sendEmail(payload) {
  const { name, email, message: userMessage } = payload;

  const mailOptions = {
    from: "Portfolio",
    to: process.env.EMAIL_ADDRESS,
    subject: `New Message From ${name}`,
    text: `New message from ${name}\nEmail: ${email}\n\n${userMessage}`,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email Error:", error.message);
    return false;
  }
}

// ✅ POST Handler
export async function POST(request) {
  try {
    const payload = await request.json();

    const emailSuccess = await sendEmail(payload);

    if (emailSuccess) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: "Message sent via email successfully!",
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Failed to send email.",
      }),
      { status: 500, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Server Error:", error.message);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Internal server error.",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ OPTIONS Handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
