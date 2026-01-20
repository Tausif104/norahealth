"use server";

import { prisma } from "@/lib/client/prisma";
import { getAdminUser } from "./admin.action";
import { revalidatePath } from "next/cache";
import { loggedInUserAction } from "./user.action";
// Build date range filter by createdAt
function buildCreatedAtRange({ year, month, day }) {
  const y = year ? Number(year) : null;
  const m = month ? Number(month) : null;
  const d = day ? Number(day) : null;

  if (!y) return null;

  // Use UTC range to stay consistent in DB timestamps
  let start;
  let end;

  if (y && !m) {
    start = new Date(Date.UTC(y, 0, 1, 0, 0, 0));
    end = new Date(Date.UTC(y + 1, 0, 1, 0, 0, 0));
  } else if (y && m && !d) {
    start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0));
    end = new Date(Date.UTC(y, m, 1, 0, 0, 0)); // next month
  } else {
    start = new Date(Date.UTC(y, (m || 1) - 1, d || 1, 0, 0, 0));
    end = new Date(Date.UTC(y, (m || 1) - 1, (d || 1) + 1, 0, 0, 0)); // next day
  }

  return { gte: start, lt: end };
}
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

  if (!medicineName || !status) {
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

// get all user orders by admin

export async function getAllOrdersAction({ year, month, day } = {}) {
  try {
    const user = await getAdminUser();

    const isAdmin = user?.admin?.isAdmin || false;

    if (!isAdmin) {
      return { success: false, message: "Unauthorized. User is not admin" };
    }
    const createdAtRange = buildCreatedAtRange({ year, month, day });

    const where = {};
    if (createdAtRange) where.createdAt = createdAtRange;

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          include: { account: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Flatten for table
    const formatted = orders.map((o) => {
      const acc = o.user?.account;

      const fullName =
        acc?.firstName || acc?.lastName
          ? `${acc?.firstName ?? ""} ${acc?.lastName ?? ""}`.trim()
          : "N/A";

      return {
        id: o.id,
        medicineName: o.medicineName,
        trackingId: o.trackingId,
        status: o.status,
        createdAt: o.createdAt.toISOString(),

        userId: o.userId,
        email: o.user?.email ?? "N/A",
        fullName,
        phoneNumber: acc?.phoneNumber ?? "N/A",
      };
    });

    return { success: true, orders: formatted };
  } catch (err) {
    console.error(err);
    return { success: false, orders: [], message: "Failed to fetch orders" };
  }
}

// get all orders by admin
export const getAllOrders = async (userId) => {
  const adminuser = await getAdminUser();

  const isAdmin = adminuser?.admin?.isAdmin || false;

  if (!isAdmin) {
    return { success: false, message: "Unauthorized. User is not admin" };
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      id: true,
      email: true,
      account: true,
      // add only what you need
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: "desc" },
  });

  return {
    success: true,
    user,
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
  revalidatePath(`/admin/orders`);

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
