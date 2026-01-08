import React from "react";
import Orders from "../_components/orders";
import {
  getPastOrderByUser,
  getRecentOrderByUser,
} from "@/actions/order.action";
export const metadata = {
  title: "Orders",
  description: "Free Oral Contraception, Delivered to Your Door",
};
const page = async () => {
  const recentRes = await getRecentOrderByUser();
  const pastRes = await getPastOrderByUser();
  return (
    <>
      <Orders
        recentOrders={recentRes.orders || []}
        pastOrders={pastRes.orders || []}
      />
    </>
  );
};

export default page;
