"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
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
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
