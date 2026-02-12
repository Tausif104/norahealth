import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


function getStatusLabel(status) {
  const s = String(status || "").toLowerCase();

  if (s === "clinicalreview") return "Under Clinical Review";
  if (s === "posted") return "Posted via Royal Mail";

  return status || "";
}

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
export const orderEmailTemplate = ({ medicineName, trackingId, status }) =>
   `
<div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
  <table width="100%" style="max-width:600px;margin:auto;background:#fff;border:1px solid #eee;border-radius:6px;">
    <tr>
      <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
        Nora Health
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
            <td style="padding:6px 0;font-weight:bold;">Contraceptive:</td>
            <td>${medicineName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Tracking ID:</td>
            <td>${trackingId || "Pending"}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:bold;">Status:</td>
            <td>${escapeHtml(getStatusLabel(status))}</td>
          </tr>
        </table>

        <p style="margin-top:20px;">
          We will notify you once your order is shipped.
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
        © ${new Date().getFullYear()} Nora Health. All rights reserved.
      </td>
    </tr>
  </table>
</div>
`;


export const orderStatusEmailTemplate=({ customerName, orderId, status, trackingId, medicineName }) =>{
  const safeName = escapeHtml(customerName || "Customer");
  const safeStatus = escapeHtml(getStatusLabel(status))
  const safeTracking = escapeHtml(trackingId || "Pending");

  return `
  <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#fff;border:1px solid #eee;border-radius:6px;overflow:hidden;">
      <tr>
        <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
          Nora Health
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
              <td style="padding:6px 0;width:140px;font-weight:bold;color:#cd8936;">Contraceptive:</td>
              <td>#${escapeHtml(medicineName)}</td>
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
          © ${new Date().getFullYear()} Nora Health. All rights reserved.
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
          Nora Health
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
          © ${new Date().getFullYear()} Nora Health. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;

  await resend.emails.send({
    from: "Nora Health <contact@norahealth.co.uk>",
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
  deliveryAddress,
  createdAt,
  notes,
}) {
  const html = `
  <div style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">
    <table width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:6px;border:1px solid #eee;">
      <tr>
        <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
          Nora Health
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
            Thank you for placing your contraceptive order with Nora Health. 
          </p>

           <p>
           Your request is under review by our clinical team. Once completed we will post your medication to you at:
            <strong>${escapeHtml(deliveryAddress)}</strong>. You should receive your medicine within 3-5 working days.
          </p>

          

          <p style="margin-top:16px;font-size:13px;color:#555;">
           Thank You
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
          © ${new Date().getFullYear()} Nora Health. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;

  await resend.emails.send({
    from: "Nora Health <contact@norahealth.co.uk>",
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
          Nora Health
        </td>
      </tr>

      <tr>
        <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
          Order Update
        </td>
      </tr>

      <tr>
        <td style="padding:0 20px 20px;font-size:15px;color:#333;">
          <p>Hi ${escapeHtml(fullName)},</p>

          <p>
            Please see below for updates to your contraceptive order::
          </p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Medicine:</td>
              <td>${escapeHtml(medicineName)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Status:</td>
              <td>${escapeHtml(getStatusLabel(status))}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Tracking ID:</td>
              <td>${escapeHtml(trackingId || "Pending")}</td>
            </tr>
          </table>

          <p style="margin-top:16px;font-size:13px;color:#555;"> 
            Our clinical team will review your order and update you shortly.
           
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
          © ${new Date().getFullYear()} Nora Health. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;
}
