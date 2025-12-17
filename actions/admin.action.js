"use server";

import { verifyToken } from "@/lib/jwt/jwt";
import { prisma } from "@/lib/client/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
const isAdminRole = (role) => role === "ADMIN" || role === "SUPERADMIN";

const isSuperAdmin = (role) => role === "SUPERADMIN";
const ROLE_PRIORITY = {
  SUPERADMIN: 1,
  ADMIN: 2,
  AUTHOR: 3,
  PATIENT: 4,
};

// get admin user action
export const getAdminUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const payload = await verifyToken(token);

  if (payload && (payload.role === "ADMIN" || payload.role === "SUPERADMIN")) {
    return { success: true, admin: payload };
  }

  return null;
};

// get all users action
export const getAllUsersAction = async () => {
  const user = await getAdminUser();

  if (!user || !isAdminRole(user.admin.role)) {
    return { success: false, message: "Unauthorized" };
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  // 🔥 Custom role-based ordering
  users.sort((a, b) => {
    // 1️⃣ Role priority
    const roleDiff = ROLE_PRIORITY[a.role] - ROLE_PRIORITY[b.role];

    if (roleDiff !== 0) return roleDiff;

    // 2️⃣ createdAt DESC within same role
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return { success: true, users };
};

// create an user action
export const createUserAction = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const isAdminUser = formData.get("isAdmin") === "true" ? true : false;

  if (!email || !password || !isAdminUser === undefined) {
    return { success: false, msg: "All fields are required" };
  }

  const user = await getAdminUser();

  const isAdmin = user?.admin?.isAdmin || false;

  if (!isAdmin) {
    return { success: false, message: "Unauthorized. User is not admin" };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return { success: false, msg: "User with this email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      isAdmin: isAdminUser,
    },
  });

  if (newUser) {
    revalidatePath("/admin");
    return { success: true, msg: "User created successfully" };
  } else {
    return { success: false, msg: "Failed to create user" };
  }
};

export const updateUserRoleAction = async ({ userId, newRole }) => {
  const actor = await getAdminUser();

  if (!actor) {
    return { success: false, message: "Unauthorized" };
  }

  const actorRole = actor.admin.role;
  const actorId = actor.admin.id;

  // ❌ No self role change
  if (actorId === userId) {
    return { success: false, message: "You cannot change your own role" };
  }

  // ❌ AUTHOR & PATIENT cannot change roles
  if (actorRole === "AUTHOR" || actorRole === "PATIENT") {
    return { success: false, message: "Permission denied" };
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!targetUser) {
    return { success: false, message: "User not found" };
  }

  const targetRole = targetUser.role;

  // 🔒 ADMIN: ONLY PATIENT ↔ AUTHOR
  if (actorRole === "ADMIN") {
    const allowedRoles = ["PATIENT", "AUTHOR"];

    if (!allowedRoles.includes(targetRole) || !allowedRoles.includes(newRole)) {
      return {
        success: false,
        message: "Admin can only change Patient ↔ Author",
      };
    }
  }

  // 🔒 SUPERADMIN: ANY role except self (already checked)
  if (actorRole === "SUPERADMIN") {
    // Superadmin has full access
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/admin");

  return { success: true, message: "User role updated successfully" };
};
