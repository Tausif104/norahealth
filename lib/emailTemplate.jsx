import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


function formatDate(date) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });
}


function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDateTime(date) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });
}
export const orderEmailTemplate = ({ medicineName, trackingId, status }) => `
<div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
  <table width="100%" style="max-width:600px;margin:auto;background:#fff;border:1px solid #eee;border-radius:6px;">
    <tr>
      <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
        Norahealth
      </td>
    </tr>

    <tr>
      <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
        Order Confirmation
      </td>
    </tr>

    <tr>
      <td style="padding:0 20px 20px;color:#333;font-size:15px;">
        <p>Your order has been successfully created.</p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Medicine:</td>
            <td>${medicineName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Tracking ID:</td>
            <td>${trackingId || "Pending"}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Status:</td>
            <td>${status}</td>
          </tr>
        </table>

        <p style="margin-top:20px;">
          We will notify you once your order is shipped.
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
        © ${new Date().getFullYear()} Norahealth. All rights reserved.
      </td>
    </tr>
  </table>
</div>
`;


export const orderStatusEmailTemplate=({ customerName, orderId, status, trackingId }) =>{
  const safeName = escapeHtml(customerName || "Customer");
  const safeStatus = escapeHtml(status || "");
  const safeTracking = escapeHtml(trackingId || "Pending");

  return `
  <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#fff;border:1px solid #eee;border-radius:6px;overflow:hidden;">
      <tr>
        <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
          Norahealth
        </td>
      </tr>

      <tr>
        <td style="padding:20px 20px 0;font-size:18px;font-weight:bold;color:#333;">
          Order Status Updated
        </td>
      </tr>

      <tr>
        <td style="padding:12px 20px 20px;font-size:15px;color:#333;">
        
          <p style="margin:0 0 16px;">Your order status has been updated.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#333;">
            <tr>
              <td style="padding:6px 0;width:140px;font-weight:bold;color:#cd8936;">Order ID:</td>
              <td>#${escapeHtml(orderId)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Status:</td>
              <td>${safeStatus}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Tracking ID:</td>
              <td>${safeTracking}</td>
            </tr>
          </table>

          <p style="margin:16px 0 0;color:#555;font-size:13px;">
            If you have any questions, just reply to this email.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
          © ${new Date().getFullYear()} Norahealth. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;
};

export async function sendBookingConfirmationEmail({
  to,
  fullName,
  serviceName,
  providerName,
  nhsService,
  appointment,
  notes,
}) {
  const html = `
  <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <table width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:6px;border:1px solid #eee;">
      <tr>
        <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
          Norahealth
        </td>
      </tr>

      <tr>
        <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
          Booking Confirmation
        </td>
      </tr>

      <tr>
        <td style="padding:0 20px 20px;font-size:15px;color:#333;">
          <p>Hi ${escapeHtml(fullName)},</p>

          <p>Your appointment has been successfully booked. Here are the details:</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Service:</td>
              <td>${escapeHtml(serviceName)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Provider:</td>
              <td>${escapeHtml(providerName)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">NHS Service:</td>
              <td>${escapeHtml(nhsService)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Appointment:</td>
              <td>${formatDateTime(appointment)}</td>
            </tr>
            ${
              notes
                ? `<tr>
                     <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Notes:</td>
                     <td>${escapeHtml(notes)}</td>
                   </tr>`
                : ""
            }
          </table>

          

          <p style="font-size:13px;color:#555;">
            If you need to change or cancel your appointment, please contact us.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
          © ${new Date().getFullYear()} Norahealth. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;

  await resend.emails.send({
    from: "Norahealth <contact@norahealth.co.uk>",
    to,
    subject: "Your Appointment Is Confirmed",
    replyTo: "contact@norahealth.co.uk",
    html,
  });
}

export async function sendOrderBookingConfirmationEmail({
  to,
  fullName,
  serviceName,
  providerName,
  nhsService,
  ocRequest,
  appointmentRequest,
  createdAt,
  notes,
}) {
  const html = `
  <div style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">
    <table width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:6px;border:1px solid #eee;">
      <tr>
        <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
          Norahealth
        </td>
      </tr>

      <tr>
        <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
          Order Confirmation
        </td>
      </tr>

      <tr>
        <td style="padding:0 20px 20px;font-size:15px;color:#333;">
          <p>Hi ${escapeHtml(fullName)},</p>

          <p>
            Thank you for placing your contraceptive order with Norahealth.
            We have received your request and it is being reviewed.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Service:</td>
              <td>${escapeHtml(serviceName)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Provider:</td>
              <td>${escapeHtml(providerName)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">NHS Service:</td>
              <td>${escapeHtml(nhsService)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Request Type:</td>
              <td>${escapeHtml(ocRequest)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Appointment Requested:</td>
              <td>${appointmentRequest ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Submitted At:</td>
              <td>${formatDate(createdAt)}</td>
            </tr>
            ${
              notes
                ? `<tr>
                     <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Notes:</td>
                     <td>${escapeHtml(notes)}</td>
                   </tr>`
                : ""
            }
          </table>

          <p style="margin-top:16px;font-size:13px;color:#555;">
            Our clinical team will review your request and contact you if needed.
            Please keep an eye on your email.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
          © ${new Date().getFullYear()} Norahealth. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;

  await resend.emails.send({
    from: "Norahealth <contact@norahealth.co.uk>",
    to,
    subject: "Your Contraceptive Order Has Been Received",
    replyTo: "contact@norahealth.co.uk",
    html,
  });
}


export const orderFromBookingEmailTemplate=({
  fullName,
  medicineName,
  status,
  trackingId,
})=> {
  return `
  <div style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">
    <table width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:6px;border:1px solid #eee;">
      <tr>
        <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
          Norahealth
        </td>
      </tr>

      <tr>
        <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
          Order Created From Your Booking
        </td>
      </tr>

      <tr>
        <td style="padding:0 20px 20px;font-size:15px;color:#333;">
          <p>Hi ${escapeHtml(fullName)},</p>

          <p>
            Your booking has been successfully converted into an order.
            Here are the order details:
          </p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Medicine:</td>
              <td>${escapeHtml(medicineName)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Status:</td>
              <td>${escapeHtml(status)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Tracking ID:</td>
              <td>${escapeHtml(trackingId || "Pending")}</td>
            </tr>
          </table>

          <p style="margin-top:16px;font-size:13px;color:#555;">
            Our clinical team will review your order and update you shortly.
            If you have questions, simply reply to this email.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
          © ${new Date().getFullYear()} Norahealth. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;
}
