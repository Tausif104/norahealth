// lib/resend.js
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail({ to, resetUrl }) {
  await resend.emails.send({
    from: "Nora Health <no-reply@norahealth.co.uk>",
    to,
    subject: "Reset your password",
    text: `Reset your password using this link (valid for 15 minutes): ${resetUrl}`,
    html: `
      <p>Click the link below to reset your password (valid for <b>15 minutes</b>):</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
  });
}
