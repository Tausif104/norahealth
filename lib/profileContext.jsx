"use client";
import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const value = {
    menuOpen,
    setMenuOpen,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
