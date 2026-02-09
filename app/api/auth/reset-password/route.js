// app/api/auth/reset-password/route.js

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/client/prisma";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();

    const rawToken = (token || "").toString().trim();
    const pass = (newPassword || "").toString();

    if (!rawToken || pass.length < 8) {
      return Response.json(
        { success: false, msg: "Invalid token or password too short." },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    const prt = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!prt) {
      return Response.json({ success: false, msg: "Invalid token." }, { status: 400 });
    }

    if (prt.usedAt) {
      return Response.json({ success: false, msg: "Token already used." }, { status: 400 });
    }

    if (prt.expiresAt < new Date()) {
      return Response.json({ success: false, msg: "Token expired." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(pass, 12);

    // Atomic: update password + mark token used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: prt.userId },
        data: { password: passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: prt.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return Response.json({ success: true, msg: "Password updated successfully." });
  } catch (e) {
    return Response.json(
      { success: false, msg: "Something went wrong." },
      { status: 500 }
    );
  }
}
