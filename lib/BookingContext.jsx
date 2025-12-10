"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const pathname = usePathname();

  // Close menu whenever pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const value = {
    menuOpen,
    setMenuOpen,
    bookingData,
    setBookingData,
  };
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
