"use client";
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
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
