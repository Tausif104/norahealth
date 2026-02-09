import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import OrderDetailsClient from "../../_components/OrderDetailsClient";
import { prisma } from "@/lib/client/prisma";

export default async function Page({ params }) {
  const { id } = await params;
  noStore();

  const orderId = Number(id);
  if (!orderId || Number.isNaN(orderId)) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        include: { account: true },
      },
    },
  });

  if (!order) notFound();

  // ✅ make serializable for client component
  const safeOrder = {
    id: order.id,
    medicineName: order.medicineName,
    trackingId: order.trackingId,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    userId: order.userId,
    user: order.user
      ? {
          id: order.user.id,
          email: order.user.email,
          role: order.user.role,
          account: order.user.account
            ? {
                firstName: order.user.account.firstName,
                lastName: order.user.account.lastName,
                phoneNumber: order.user.account.phoneNumber,
                secondEmail: order.user.account.secondEmail,
                address: order.user.account.address,
                zipCode: order.user.account.zipCode,
                deliveryAddress: order.user?.account?.deliveryAddress
              }
            : null,
        }
      : null,
  };

  return <OrderDetailsClient order={safeOrder} />;
}
