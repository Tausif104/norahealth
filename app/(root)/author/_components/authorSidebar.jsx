"use client";

import { useAuthor } from "@/lib/authorContext";
import {
  PanelLeft,
  User,
  ClipboardClock,
  Contact,
  Pen,
  NotebookPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthorSidebar = () => {
  const { menuOpen, setMenuOpen } = useAuthor();
  const pathname = usePathname();

  const baseClasses =
    "w-full flex items-center gap-2 py-2.5 px-3 rounded-[16px] text-left transition";
  const activeClasses = "bg-[#d67b0e] text-white";
  const inactiveClasses = "text-[#3A3D42] hover:bg-[#f4d9c0]";

  return (
    <aside
      className={`w-[300px] bg-[#F4E7E1] lg:rounded-[12px] p-6 pr-8 lg:p-12 flex-shrink-0 absolute lg:relative top-0 lg:top-auto lg:left-0 h-dvh lg:h-auto ${
        menuOpen ? "left-0" : "-left-[500px]"
      } transition-all duration-500 z-20`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className='lg:hidden w-[40px] h-[40px] items-center gap-2 bg-[#CE8936] text-white flex justify-center rounded-full absolute top-6 -right-5 z-10'
      >
        <PanelLeft />
      </button>

      <nav className='space-y-2 text-base'>
        {/* Profile */}
        <Link
          href='/author'
          className={`${baseClasses} ${
            pathname === "/author" ? activeClasses : inactiveClasses
          }`}
        >
          <NotebookPen className='w-4 h-4' />
          <span>Blogs</span>
        </Link>
      </nav>
    </aside>
  );
};

export default AuthorSidebar;
