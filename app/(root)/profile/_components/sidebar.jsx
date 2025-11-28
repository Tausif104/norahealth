"use client";
import { useProfile } from "@/lib/profileContext";
import { HeartPulse, Lock, PanelLeft, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const { menuOpen, setMenuOpen } = useProfile();
  return (
    <aside
      className={`w-[300px] bg-[#F4E7E1] md:rounded-[12px] p-6 pr-8 md:p-12 flex-shrink-0 absolute md:relative top-0 md:top-auto  md:left-0  h-dvh md:h-auto ${
        menuOpen ? "left-0" : "-left-[500px]"
      }  transition-all duration-500 z-20`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#CE8936] text-white flex justify-center rounded-full absolute top-6 -right-5 z-10'
      >
        <PanelLeft />
      </button>
      {/* <div className='mb-6 flex items-center justify-between md:justify-start md:gap-3'>
              <button className='inline-flex items-center gap-2 bg-[#d67b0e] text-white text-sm font-medium py-2 px-4 rounded-full'>
                <User className='w-4 h-4' />
                <span className='hidden md:inline'>Profile</span>
              </button>
            </div> */}

      <nav className='space-y-2 text-base'>
        <Link
          href='/profile'
          className='w-full flex items-center gap-2 bg-[#d67b0e] text-white py-2.5 px-3 rounded-[16px] text-left'
        >
          <User className='w-4 h-4' />
          <span>Profile</span>
        </Link>
        <Link
          href='#'
          className='w-full flex items-center gap-2 py-2.5 px-3 rounded-[16px] text-left text-[#3A3D42] hover:bg-[#f4d9c0] transition'
        >
          <HeartPulse className='w-4 h-4' />
          <span>Health Profile</span>
        </Link>
        <Link
          href='#'
          className='w-full flex items-center gap-2 py-2.5 px-3 rounded-[16px] text-left text-[#3A3D42] hover:bg-[#f4d9c0] transition'
        >
          <ShoppingBag className='w-4 h-4' />
          <span>Orders</span>
        </Link>
        <Link
          href='#'
          className='w-full flex items-center gap-2 py-2.5 px-3 rounded-[16px] text-left text-[#3A3D42] hover:bg-[#f4d9c0] transition'
        >
          <Lock className='w-4 h-4' />
          <span>Change Password</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
