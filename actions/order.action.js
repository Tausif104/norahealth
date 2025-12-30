"use server";

import { prisma } from "@/lib/client/prisma";
import { getAdminUser } from "./admin.action";
import { revalidatePath } from "next/cache";
import { loggedInUserAction } from "./user.action";

// create order by admin
export const createOrderByAdmin = async (prevState, formData) => {
  const userId = Number(formData.get("userId"));
  const medicineName = formData.get("medicineName");
  const trackingId = formData.get("trackingId");
  const status = formData.get("status");

  const user = await getAdminUser();

  const isAdmin = user?.admin?.isAdmin || false;

  if (!isAdmin) {
    return { success: false, message: "Unauthorized. User is not admin" };
  }

  if (!medicineName || !trackingId || !status) {
    return {
      msg: "Please insert all the fields",
      success: false,
    };
  }

  const order = await prisma.order.create({
    data: {
      userId,
      medicineName,
      trackingId,
      status,
    },
  });

  revalidatePath(`/admin/${userId}/orders`);

  if (order) {
    return {
      msg: "Order Created",
      success: true,
    };
  }
};

// get all orders by admin
export const getAllOrders = async (userId) => {
  const user = await getAdminUser();

  const isAdmin = user?.admin?.isAdmin || false;

  if (!isAdmin) {
    return { success: false, message: "Unauthorized. User is not admin" };
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: "desc" },
  });

  return {
    orders,
  };
};

// get order by user
export const getPastOrderByUser = async () => {
  const payload = await loggedInUserAction();

  if (!payload?.payload?.id) {
    return {
      msg: "User not logged In",
      success: false,
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: Number(payload?.payload?.id),
      status: "delivered",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { success: true, msg: "OK", orders };
};
export const getRecentOrderByUser = async () => {
  const payload = await loggedInUserAction();

  if (!payload?.payload?.id) {
    return {
      msg: "User not logged In",
      success: false,
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: Number(payload?.payload?.id),
      NOT: {
        status: "delivered",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { success: true, msg: "OK", orders };
};

export const updateOrderStatus = async (formData) => {
  const orderId = formData.get("orderId");
  const status = formData.get("status");
  const trackingId = formData.get("trackingId");
  const adminUser = await getAdminUser();
  if (!adminUser?.admin?.isAdmin) {
    return { success: false, msg: "Unauthorized. Not an admin." };
  }

  const order = await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status, trackingId },
  });

  if (!order) {
    return {
      msg: "Order not found",
      success: false,
    };
  }
  revalidatePath(`/admin`);

  if (order) {
    return {
      msg: "Order Status Updated Successfully",
      success: true,
    };
  }
};

export const deleteOrder = async (formData) => {
  const orderId = formData.get("orderId");

  const order = await prisma.order.delete({
    where: { id: Number(orderId) },
  });

  const adminUser = await getAdminUser();
  if (!adminUser?.admin?.isAdmin) {
    return { success: false, msg: "Unauthorized. Not an admin." };
  }

  if (!order) {
    return {
      msg: "Order not found",
      success: false,
    };
  }
  revalidatePath(`/admin`);

  if (order) {
    return {
      msg: "Order Deleted Successfully",
      success: true,
    };
  }
};
