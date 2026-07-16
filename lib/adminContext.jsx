"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Desktop-only: minimise the sidebar to an icon rail. Persists across
  // in-admin navigation (provider stays mounted); reset on full reload.
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const value = {
    menuOpen,
    setMenuOpen,
    collapsed,
    setCollapsed,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
