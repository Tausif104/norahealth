"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu whenever pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const value = {
    menuOpen,
    setMenuOpen,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
