import { BookingProvider } from "@/lib/BookingContext";
import React from "react";

export const metadata = {
  title: "Booking",
  description: "Free Oral Contraception, Delivered to Your Door",
};

const layout = ({ children }) => {
  return <BookingProvider>{children}</BookingProvider>;
};

export default layout;
