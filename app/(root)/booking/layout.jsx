import { BookingProvider } from "@/lib/BookingContext";
import React from "react";

const layout = ({ children }) => {
  return <BookingProvider>{children}</BookingProvider>;
};

export default layout;
