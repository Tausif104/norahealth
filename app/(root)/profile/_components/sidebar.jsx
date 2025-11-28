"use client";
import { useProfile } from "@/lib/profileContext";
import {
  Car,
  Cross,
  HeartPulse,
  Lock,
  LockOpen,
  PanelLeft,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const { menuOpen, setMenuOpen } = useProfile();
  const pathname = usePathname();

  const baseClasses =
    "w-full flex items-center gap-2 py-2.5 px-3 rounded-[16px] text-left transition";
  const activeClasses = "bg-[#d67b0e] text-white";
  const inactiveClasses = "text-[#3A3D42] hover:bg-[#f4d9c0]";

  return (
    <aside
      className={`w-[300px] bg-[#F4E7E1] md:rounded-[12px] p-6 pr-8 md:p-12 flex-shrink-0 absolute md:relative top-0 md:top-auto md:left-0 h-dvh md:h-auto ${
        menuOpen ? "left-0" : "-left-[500px]"
      } transition-all duration-500 z-20`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className='md:hidden w-[40px] h-[40px] items-center gap-2 bg-[#CE8936] text-white flex justify-center rounded-full absolute top-6 -right-5 z-10'
      >
        <PanelLeft />
      </button>

      <nav className='space-y-2 text-base'>
        {/* Profile */}
        <Link
          href='/profile'
          className={`${baseClasses} ${
            pathname === "/profile" ? activeClasses : inactiveClasses
          }`}
        >
          <User className='w-4 h-4' />
          <span>Profile</span>
        </Link>

        {/* Health Profile */}
        <Link
          href='/profile/health-profile'
          className={`${baseClasses} ${
            pathname === "/profile/health-profile"
              ? activeClasses
              : inactiveClasses
          }`}
        >
          <Cross className='w-4 h-4' />
          <span>Health Profile</span>
        </Link>

        {/* Orders */}
        <Link
          href='/profile/orders'
          className={`${baseClasses} ${
            pathname === "/profile/orders" ? activeClasses : inactiveClasses
          }`}
        >
          <Car className='w-4 h-4' />
          <span>Orders</span>
        </Link>

        {/* Change Password (set your real route here) */}
        <Link
          href='/profile/change-password'
          className={`${baseClasses} ${
            pathname === "/profile/change-password"
              ? activeClasses
              : inactiveClasses
          }`}
        >
          <LockOpen className='w-4 h-4' />
          <span>Change Password</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
