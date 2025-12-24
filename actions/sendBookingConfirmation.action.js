"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail({
  to,
  fullName,
  serviceName,
  providerName,
  nhsService,
  appointment,
  notes,
}) {
  if (!to) return;
  console.log(to);

  const appointmentText = appointment
    ? new Date(appointment).toLocaleString("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "We will contact you shortly to confirm the appointment.";

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f9f9f9;padding:20px">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:6px;border:1px solid #eaeaea;overflow:hidden">

      <div style="background:#cd8936;color:#ffffff;padding:16px;text-align:center;font-size:22px;font-weight:bold">
        Norahealth
      </div>

      <div style="padding:20px;color:#333;font-size:15px;line-height:1.6">
        <p>Dear <strong>${fullName}</strong>,</p>

        <p>Your booking has been successfully created. Below are the details:</p>

        <div style="margin-top:12px">
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Provider:</strong> ${providerName}</p>
          <p><strong>NHS Service:</strong> ${nhsService}</p>
          <p><strong>Appointment:</strong> ${appointmentText}</p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
        </div>

        <p style="margin-top:20px">
          If you have any questions, please contact us.
        </p>

        <p>
          Kind regards,<br />
          <strong>Norahealth Team</strong>
        </p>
      </div>

      <div style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777">
        © ${new Date().getFullYear()} Norahealth. All rights reserved.
      </div>

    </div>
  </div>
  `;

  try {
    await resend.emails.send({
      from: "Norahealth <onboarding@resend.dev>",
      to,
      subject: "Booking Confirmation – Norahealth",
      html,
    });
  } catch (error) {
    console.error("Resend booking email failed:", error);
  }
}
