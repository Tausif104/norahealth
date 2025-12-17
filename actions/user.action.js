"use server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/client/prisma";
import { signToken, verifyToken } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// register action
export const registerAction = async (prevState, formData) => {
  // getting all the data from the form
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm = formData.get("confirm-password");

  // check if all fields are filled
  if (!email || !password) {
    return {
      msg: "Please enter all the fields",
      success: false,
    };
  }

  // check if user exists
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return {
      msg: "User Already Exists",
      success: false,
    };
  }

  // check if passwords are matched
  if (password !== confirm) {
    return {
      msg: "Password do to match",
      success: false,
    };
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // creating user in database
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  // success message
  if (user) {
    // creating safe user
    const safeUser = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    };

    // creating token with user object
    const token = await signToken(safeUser);

    // initiate cookie from next.js
    const coookiesStore = await cookies();

    // setting logged in user to cookie
    coookiesStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return {
      msg: "Account Created Successfully!",
      success: true,
    };
  }
};

// Login Action
export const loginAction = async (prevState, formData) => {
  // getting all the from the login form
  const email = formData.get("email");
  const password = formData.get("password");

  // check if all the fields are filled
  if (!email || !password) {
    return {
      msg: "Please enter all the fields",
      success: false,
    };
  }

  // fetching user from database
  const user = await prisma.user.findUnique({ where: { email } });

  // check user is valid
  if (!user) {
    return {
      msg: "Invalid Email",
      success: false,
    };
  }

  // password check
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return {
      msg: "Invalid Password",
      success: false,
    };
  }

  // creating safe user
  const safeUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };

  // creating token with user object
  const token = await signToken(safeUser);

  // initiate cookie from next.js
  const coookiesStore = await cookies();

  // setting logged in user to cookie
  coookiesStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  });

  return {
    msg: "You are Logged In",
    success: true,
  };
};

// Log out Action
export const logoutAction = async () => {
  // initiate cookie from next.js
  const coookiesStore = await cookies();

  // removing user from cookie
  coookiesStore.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    maxAge: 0,
  });

  redirect("/login");
};

// Get Logged In User
export const loggedInUserAction = async () => {
  // initiate cookie from next.js
  const coookiesStore = await cookies();

  // getting token from cookie
  const token = coookiesStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  // verify token
  const payload = await verifyToken(token);

  if (!payload) {
    return null;
  }

  return {
    payload,
  };
};

// change password

export const changePasswordAction = async (prevState, formData) => {
  try {
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    // basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return {
        msg: "Please fill in all the fields",
        success: false,
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        msg: "New passwords do not match",
        success: false,
      };
    }

    // optional: enforce 8–12 chars like your UI hint
    if (newPassword.length < 8 || newPassword.length > 12) {
      return {
        msg: "Password must be 8–12 characters long",
        success: false,
      };
    }

    // get logged in user from cookie
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return {
        msg: "You must be logged in to change your password",
        success: false,
      };
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return {
        msg: "Invalid session. Please log in again.",
        success: false,
      };
    }

    // fetch user
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      return {
        msg: "User not found",
        success: false,
      };
    }

    // check current password
    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentValid) {
      return {
        msg: "Current password is incorrect",
        success: false,
      };
    }

    if (currentPassword === newPassword) {
      return {
        msg: "New password must be different from the current password",
        success: false,
      };
    }

    // hash and update
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return {
      msg: "Password updated successfully",
      success: true,
    };
  } catch (err) {
    console.error("changePasswordAction error:", err);
    return {
      msg: "Something went wrong. Please try again later.",
      success: false,
    };
  }
};

// upload profile image
export const uploadProfileImageAction = async (formData) => {
  const file = formData.get("file");

  try {
    if (!file) {
      return { msg: "No file selected", success: false };
    }

    const payload = await loggedInUserAction();
    console.log(payload, "payload");

    if (!payload || !payload.payload.id) {
      return {
        msg: "Invalid session. Please log in again.",
        success: false,
      };
    }

    const userId = payload.payload.id;

    if (!userId) {
      return { msg: "Unauthorized", success: false };
    }

    const uploadDir = path.join(process.cwd(), "public/profileImage");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExt = path.extname(file.name);
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 6)}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    await prisma.account.update({
      where: { userId },
      data: {
        profileImage: `/profileImage/${fileName}`,
      },
    });
    revalidatePath("/dashboard/profile");

    return {
      msg: "Profile image uploaded successfully",
      success: true,
      imagePath: `/profileImage/${fileName}`,
    };
  } catch (err) {
    console.error("Upload error:", err);
    return { msg: "Image upload failed", success: false };
  }
};

export async function forgotPasswordAction(prevState, formData) {
  const step = formData.get("step")?.toString();
  const email = formData.get("email")?.toString();

  if (step === "1") {
    // Step 1 → Check email exists
    if (!email) return { success: false, msg: "Email is required", step: 1 };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, msg: "Email not found", step: 1 };
    }

    return { success: true, msg: "Email found", step: 2 };
  }

  if (step === "2") {
    // Step 2 → Update password
    const password = formData.get("password")?.toString();
    const confirm = formData.get("confirm")?.toString();

    if (!password || !confirm) {
      return { success: false, msg: "Both fields required", step: 2 };
    }

    if (password !== confirm) {
      return { success: false, msg: "Passwords do not match", step: 2 };
    }

    if (!email) {
      return { success: false, msg: "Something went wrong", step: 1 };
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    return { success: true, msg: "Password updated", step: 3 };
  }

  return { success: false, msg: "Invalid step", step: 1 };
}
