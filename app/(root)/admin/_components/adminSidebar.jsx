"use client";
import { useAdmin } from "@/lib/adminContext";
import { PanelLeft, User, ClipboardClock, Contact } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminSidebar = () => {
  const { menuOpen, setMenuOpen } = useAdmin();
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
          href='/admin'
          className={`${baseClasses} ${
            pathname === "/admin" ? activeClasses : inactiveClasses
          }`}
        >
          <User className='w-4 h-4' />
          <span>Users</span>
        </Link>

        {/* Health Records */}
        <Link
          href='/admin/appointments'
          className={`${baseClasses} ${
            pathname === "/admin/appointments" ? activeClasses : inactiveClasses
          }`}
        >
          <ClipboardClock className='w-4 h-4' />
          <span>Appointments</span>
        </Link>
        {/* Booking Slot */}
        <Link
          href='/admin/booking-slot'
          className={`${baseClasses} ${
            pathname.startsWith("/admin/booking-slot")
              ? activeClasses
              : inactiveClasses
          }`}
        >
          <ClipboardClock className='w-4 h-4' />
          <span>Appointment Slot</span>
        </Link>

        {/* Medical History */}
        <Link
          href='/admin/lead'
          className={`${baseClasses} ${
            pathname === "/admin/lead" ? activeClasses : inactiveClasses
          }`}
        >
          <Contact className='w-4 h-4' />
          <span>Contact Lead</span>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
