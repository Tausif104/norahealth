import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


function getStatusLabel(status) {
  const s = String(status || "").toLowerCase();

  if (s === "clinicalreview") return "Awaiting Dispatch";
  if (s === "posted") return "Posted via Royal Mail";
  if (s === "declined") return "Declined";

  return status || "";
}

function firstNameOf(name) {
  return String(name || "").trim().split(/\s+/)[0] || "there";
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
// export const orderEmailTemplate = ({ medicineName, trackingId, status }) =>
//    `
// <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
//   <table width="100%" style="max-width:600px;margin:auto;background:#fff;border:1px solid #eee;border-radius:6px;">
//     <tr>
//       <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
//         Nora Health
//       </td>
//     </tr>

//     <tr>
//       <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
//         Order Confirmation
//       </td>
//     </tr>

//     <tr>
//       <td style="padding:0 20px 20px;color:#333;font-size:15px;">
//         <p>Your order has been successfully created.</p>

//         <table width="100%" cellpadding="0" cellspacing="0">
//           <tr>
//             <td style="padding:6px 0;font-weight:bold;">Contraceptive:</td>
//             <td>${medicineName}</td>
//           </tr>
//           <tr>
//             <td style="padding:6px 0;font-weight:bold;">Tracking ID:</td>
//             <td>${trackingId || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding:6px 0;font-weight:bold;">Status:</td>
//             <td>${escapeHtml(getStatusLabel(status))}</td>
//           </tr>
//         </table>

//         <p style="margin-top:20px;">
//           We will notify you once your order is shipped.
//         </p>
//       </td>
//     </tr>

//     <tr>
//       <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
//         © ${new Date().getFullYear()} Nora Health. All rights reserved.
//       </td>
//     </tr>
//   </table>
// </div>
// `;


export const orderEmailTemplate = ({
  firstName,
  customerName,
  phoneNumber,
  deliveryAddress,
}) => {
  const whatsappLink = "https://wa.me/447440126154";
  const supportEmail = "pharmacy.fap80@nhs.net";

  const name = escapeHtml(firstName || firstNameOf(customerName));
  const phone = escapeHtml(phoneNumber || "your registered number");
  const address = escapeHtml(deliveryAddress || "your delivery address");

  return `
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
      <td style="padding:0 20px 20px;color:#333;font-size:15px;line-height:1.5;">
        <p>Hi ${name},</p>

        <p>
          Your online Nora Health contraception request is under clinical review
          and we will contact you shortly on ${phone} to discuss it. We offer
          next day delivery on all consultations completed by 1pm (M&ndash;F).
        </p>

        <p>
          Once your consultation is complete we will post your medication to:
          <strong>${address}</strong>.
        </p>

        <p style="margin-top:16px;color:#555;font-size:13px;">
          If you have any queries, please
          <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="color:#cd8936;text-decoration:underline;">
            message us on WhatsApp
          </a>
          or email us at
          <a href="mailto:${supportEmail}" style="color:#cd8936;text-decoration:underline;">
            ${supportEmail}
          </a>. For urgent queries please
          <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="color:#cd8936;text-decoration:underline;">
            call us directly here via WhatsApp
          </a>.
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



export const orderStatusEmailTemplate = ({
  customerName,
  firstName,
  orderId,
  status,
  trackingId,
  medicineName,
  deliveryAddress,
}) => {
  const name = escapeHtml(firstName || firstNameOf(customerName));
  const med = escapeHtml(medicineName || "");
  const tracking = escapeHtml(trackingId || "Pending");
  const address = escapeHtml(deliveryAddress || "your delivery address");

  const whatsappLink = "https://wa.me/447440126154";
  const emailAddress = "pharmacy.fap80@nhs.net";

  const s = String(status || "").toLowerCase();

  const queryLine = `
    <p style="margin:16px 0 0;color:#555;font-size:13px;">
      If you have any queries regarding your order please
      <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="color:#cd8936;text-decoration:underline;">
        click here
      </a>
      to message us on WhatsApp or send us an email on
      <a href="mailto:${emailAddress}" style="color:#cd8936;text-decoration:underline;">
        ${emailAddress}
      </a>.
    </p>`;

  let title = "Contraception Update";
  let inner;

  if (s === "declined") {
    title = "Contraception Request Declined";
    inner = `
      <p style="margin:0 0 12px;">Hi ${name},</p>
      <p style="margin:0 0 12px;">
        Your contraceptive request didn&#39;t pass our clinical safety checks so we
        haven&#39;t been able to post your medicines yet.
      </p>
      <p style="margin:0 0 12px;">
        When you have a moment, please get in touch with us &mdash; we just need a
        little more information to make sure everything is safe for you. You can
        call us,
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="color:#cd8936;text-decoration:underline;">message us on WhatsApp</a>,
        or email us at
        <a href="mailto:${emailAddress}" style="color:#cd8936;text-decoration:underline;">${emailAddress}</a>.
      </p>
      <p style="margin:0;">We&#39;ll do our very best to sort this out quickly for you.</p>
    `;
  } else if (s === "posted") {
    title = "Contraception Posted";
    inner = `
      <p style="margin:0 0 12px;">Hi ${name},</p>
      <p style="margin:0 0 12px;">
        Your contraceptive has been posted via Royal Mail tracked service.
      </p>
      ${queryLine}
      <p style="margin:16px 0 8px;font-weight:bold;">Order details:</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;width:160px;font-weight:bold;color:#cd8936;">Contraceptive:</td>
          <td>#${med}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Delivery Address:</td>
          <td>${address}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Tracking ID:</td>
          <td>${tracking}</td>
        </tr>
      </table>
    `;
  } else {
    // clinicalreview -> Awaiting Dispatch (default)
    inner = `
      <p style="margin:0 0 12px;">Hi ${name},</p>
      <p style="margin:0 0 12px;">
        Your contraceptive request has been approved and is awaiting dispatch.
      </p>
      <p style="margin:16px 0 8px;font-weight:bold;">Order details:</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#333;">
        <tr>
          <td style="padding:6px 0;width:160px;font-weight:bold;color:#cd8936;">Oral Contraceptive:</td>
          <td>${med}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Status:</td>
          <td>${escapeHtml(getStatusLabel(status))}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Tracking ID:</td>
          <td>${tracking}</td>
        </tr>
      </table>
      ${queryLine}
    `;
  }

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
          ${title}
        </td>
      </tr>

      <tr>
        <td style="padding:12px 20px 20px;font-size:15px;color:#333;line-height:1.5;">
          ${inner}
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


// export async function sendBookingConfirmationEmail({
//   to,
//   fullName,
//   serviceName,
//   providerName,
//   nhsService,
//   appointment,
//   notes,
// }) {
//   const html = `
//   <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
//     <table width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:6px;border:1px solid #eee;">
//       <tr>
//         <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
//           Nora Health
//         </td>
//       </tr>

//       <tr>
//         <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
//           Booking Confirmation
//         </td>
//       </tr>

//       <tr>
//         <td style="padding:0 20px 20px;font-size:15px;color:#333;">
//           <p>Hi ${escapeHtml(fullName)},</p>

//           <p>Your appointment has been successfully booked. Here are the details:</p>

//           <table width="100%" cellpadding="0" cellspacing="0">
            
//             <tr>
//               <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Appointment:</td>
//               <td>${formatDateTime(appointment)}</td>
//             </tr>
//             ${
//               notes
//                 ? `<tr>
//                      <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Notes:</td>
//                      <td>${escapeHtml(notes)}</td>
//                    </tr>`
//                 : ""
//             }
//           </table>

          

//           <p style="font-size:13px;color:#555;">
//             If you need to change or cancel your appointment, please contact us.
//           </p>
//         </td>
//       </tr>

//       <tr>
//         <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
//           © ${new Date().getFullYear()} Nora Health. All rights reserved.
//         </td>
//       </tr>
//     </table>
//   </div>
//   `;

//   await resend.emails.send({
//     from: "Nora Health <contact@norahealth.co.uk>",
//     to,
//     subject: "Your Appointment Is Confirmed",
//     replyTo: "contact@norahealth.co.uk",
//     html,
//   });
// }

// export async function sendOrderBookingConfirmationEmail({
//   to,
//   fullName,
//   serviceName,
//   providerName,
//   nhsService,
//   ocRequest,
//   appointmentRequest,
//   deliveryAddress,
//   createdAt,
//   notes,
// }) {

  
//   const html = `
//   <div style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">
//     <table width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:6px;border:1px solid #eee;">
//       <tr>
//         <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
//           Nora Health
//         </td>
//       </tr>

//       <tr>
//         <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
//           Order Confirmation
//         </td>
//       </tr>

//       <tr>
//         <td style="padding:0 20px 20px;font-size:15px;color:#333;">
//           <p>Hi ${escapeHtml(fullName)},</p>

//           <p>
//             Thank you for placing your contraceptive order with Nora Health. 
//           </p>

//            <p>
//            Your request is under review by our clinical team. Once completed we will post your medication to you at:
//             <strong>${escapeHtml(deliveryAddress)}</strong>.  We offer free next day delivery on all consultations completed by 1:00 p.m..
//           </p>

          

//           <p style="margin-top:16px;font-size:13px;color:#555;">
//            Thank You
//           </p>
//         </td>
//       </tr>

//       <tr>
//         <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
//           © ${new Date().getFullYear()} Nora Health. All rights reserved.
//         </td>
//       </tr>
//     </table>
//   </div>
//   `;

//   await resend.emails.send({
//     from: "Nora Health <contact@norahealth.co.uk>",
//     to,
//     subject: "Your Contraceptive Order Has Been Received",
//     replyTo: "contact@norahealth.co.uk",
//     html,
//   });
// }


// export const orderFromBookingEmailTemplate=({
//   fullName,
//   medicineName,
//   status,
//   trackingId,
// })=> {
//   return `
//   <div style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;">
//     <table width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:6px;border:1px solid #eee;">
//       <tr>
//         <td style="background:#cd8936;color:#fff;padding:16px;text-align:center;font-size:22px;font-weight:bold;">
//           Nora Health
//         </td>
//       </tr>

//       <tr>
//         <td style="padding:20px;font-size:18px;font-weight:bold;color:#333;">
//           Order Update
//         </td>
//       </tr>

//       <tr>
//         <td style="padding:0 20px 20px;font-size:15px;color:#333;">
//           <p>Hi ${escapeHtml(fullName)},</p>

//           <p>
//             Please see below for updates to your contraceptive order::
//           </p>

//           <table width="100%" cellpadding="0" cellspacing="0">
//             <tr>
//               <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Medicine:</td>
//               <td>${escapeHtml(medicineName)}</td>
//             </tr>
//             <tr>
//               <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Status:</td>
//               <td>${escapeHtml(getStatusLabel(status))}</td>
//             </tr>
//             <tr>
//               <td style="padding:6px 0;font-weight:bold;color:#cd8936;">Tracking ID:</td>
//               <td>${escapeHtml(trackingId || "Pending")}</td>
//             </tr>
//           </table>

//           <p style="margin-top:16px;font-size:13px;color:#555;"> 
//             Our clinical team will review your order and update you shortly.
           
//           </p>
//         </td>
//       </tr>

//       <tr>
//         <td style="background:#f3f3f3;padding:12px;text-align:center;font-size:13px;color:#777;">
//           © ${new Date().getFullYear()} Nora Health. All rights reserved.
//         </td>
//       </tr>
//     </table>
//   </div>
//   `;
// }



export async function sendBookingConfirmationEmail({
  to,
  fullName,
  serviceName,
  providerName,
  nhsService,
  appointment,
  notes,
}) {
  const whatsappLink = "https://wa.me/447440126154";
  const whatsappNumber = "+44 7440126154";
  const supportEmail = "pharmacy.fap80@nhs.net";

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
            If you need to change or cancel your appointment, please
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" style="color:#cd8936;text-decoration:underline;">
              message us on WhatsApp
            </a>
            (${whatsappNumber}) or email us at
            <a href="mailto:${supportEmail}" style="color:#cd8936;text-decoration:underline;">
              ${supportEmail}
            </a>.
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
    bcc: "pharmacy.fap80@nhs.net",
    subject: "Your Appointment Is Confirmed",
    replyTo: "contact@norahealth.co.uk",
    html,
  });
}

export async function sendOrderBookingConfirmationEmail({
  to,
  fullName,
  firstName,
  phoneNumber,
  serviceName,
  providerName,
  nhsService,
  ocRequest,
  appointmentRequest,
  deliveryAddress,
  createdAt,
  notes,
}) {
  const html = orderEmailTemplate({
    firstName: firstName || firstNameOf(fullName),
    phoneNumber,
    deliveryAddress,
  });

  await resend.emails.send({
    from: "Nora Health <contact@norahealth.co.uk>",
    to,
    bcc: "pharmacy.fap80@nhs.net",
    subject: "Your Contraceptive Order Has Been Received",
    replyTo: "contact@norahealth.co.uk",
    html,
  });
}

export const orderFromBookingEmailTemplate = ({
  fullName,
  firstName,
  medicineName,
  status,
  trackingId,
  deliveryAddress,
}) => {
  return orderStatusEmailTemplate({
    firstName: firstName || firstNameOf(fullName),
    medicineName,
    status,
    trackingId,
    deliveryAddress,
  });
};



