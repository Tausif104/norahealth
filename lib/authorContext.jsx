"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
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
    <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
  );
};

export const useAuthor = () => useContext(AuthorContext);
