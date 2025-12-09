'use client'
import React, { createContext, useContext, useState } from 'react'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const value = {
    menuOpen,
    setMenuOpen,
  }
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)
