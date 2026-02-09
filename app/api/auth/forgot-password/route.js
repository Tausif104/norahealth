// app/api/auth/forgot-password/route.js

import { prisma } from "@/lib/client/prisma";
import { sendResetEmail } from "@/lib/reset";
import crypto from "crypto";


export async function POST(req) {
  try {
    const { email } = await req.json();
    const cleanEmail = (email || "").toString().trim().toLowerCase();

    const okResponse = Response.json({
      success: true,
      msg: "If that email exists, a reset link has been sent.",
    });

    if (!cleanEmail) return okResponse;

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      select: { id: true, email: true },
    });

    if (!user) return okResponse;

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    });

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: { tokenHash, userId: user.id, expiresAt },
    });

    const resetUrl = `${process.env.APP_URL}/reset-password?token=${rawToken}`;

    await sendResetEmail({ to: user.email, resetUrl });

    return okResponse;
  } catch (e) {
    return Response.json(
      { success: false, msg: "Something went wrong." },
      { status: 500 }
    );
  }
}
