import React from "react";

import {
  getPastOrderByUser,
  getRecentOrderByUser,
} from "@/actions/order.action";
import Orders from "../_components/orders";

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
