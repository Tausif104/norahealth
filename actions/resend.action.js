"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const resendEmailAction = async (prevState, formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  const emailTemplate = `<div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 6px; overflow: hidden; border: 1px solid #eee;">
    
    <!-- Header -->
    <tr>
      <td style="background: #cd8936; padding: 16px; text-align: center; color: #ffffff; font-size: 22px; font-weight: bold;">
        Norahealth
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td style="padding: 20px 20px 0; font-size: 20px; color: #333; font-weight: bold;">
        New Contact Message
      </td>
    </tr>

    <!-- Content Table -->
    <tr>
      <td style="padding: 10px 20px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px; color: #333;">
          
          <tr>
            <td style="padding: 8px 0; width: 120px; font-weight: bold; color: #cd8936;">Name:</td>
            <td>${name}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #cd8936;">Email:</td>
            <td>${email}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #cd8936;">Phone:</td>
            <td>${phone}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0; vertical-align: top; font-weight: bold; color: #cd8936;">Message:</td>
            <td>${message}</td>
          </tr>

        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #f3f3f3; padding: 12px; text-align: center; font-size: 13px; color: #777;">
        © ${new Date().getFullYear()} Norahealth. All rights reserved.
      </td>
    </tr>

  </table>
</div>`;

  if (!name || !email || !phone || !message) {
    return {
      ...prevState,
      msg: "All fields are required.",
      success: false,
    };
  }

  try {
    const res = await resend.emails.send({
      from: "Norahealth <onboarding@resend.dev>",
      to: "tausifahmed49@gmail.com",
      subject: "New Contact Message",
      html: emailTemplate,
    });

    console.log("Resend contact email response:", res);

    if (res?.data?.id) {
      return {
        msg: "Your message has been sent successfully.",
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
