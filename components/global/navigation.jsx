"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { User, LogInIcon } from "lucide-react";
import { menuItems } from "@/data/menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoutMenuItem from "@/app/(root)/_components/LogoutMenuItem";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "@/lib/BlogContext";

const Navigation = ({ isAdmin, payload, isAuthor, logoutAction }) => {
  const [currentLang, setCurrentLang] = useState("en");
  const { control, setControl } = useContext(BlogContext);
  useEffect(() => {
    const saved = Cookies.get("userLang");
    if (!saved) {
      Cookies.set("userLang", "en", { expires: 7 });
      setCurrentLang("en");
    } else {
      setCurrentLang(saved);
    }
  }, [control]);
  return (
    <nav className='flex items-center gap-6'>
      <ul className='flex items-center gap-2.5 2xl:gap-6'>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              className={`font-medium   text-[16px] ${
                currentLang === "en"
                  ? " lg:text-[13px] xl:text-[16px]"
                  : "  lg:text-[12px] 2xl:text-[13px] xl:text-[14px]"
              }`}
              href={item.link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex items-center gap-2'>
        {payload?.payload ? (
          <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-0 cursor-pointer'>
              <span className='text-[#D6866B] w-[40px] h-[40px] border border-[#D6866B] flex items-center justify-center rounded-full hover:bg-[#D6866B] hover:text-white transition'>
                <User width={22} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel className='font-bold'>
                {payload?.payload?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isAdmin ? (
                <Link href='/admin' className='cursor-pointer!'>
                  <DropdownMenuItem className='cursor-pointer!'>
                    Admin
                  </DropdownMenuItem>
                </Link>
              ) : isAuthor ? (
                <DropdownMenuItem className='cursor-pointer!'>
                  <Link href='/author'>Author</Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className='cursor-pointer!'>
                  <Link href='/profile'>Profile</Link>
                </DropdownMenuItem>
              )}

              <form action={logoutAction}>
                {/* <DropdownMenuItem>
                  <button
                    type='submit'
                    className='w-full text-left cursor-pointer'
                  >
                    Log Out
                  </button>
                </DropdownMenuItem> */}
                <LogoutMenuItem />
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href='/login'
            className='bg-transparent text-[#D6866B] border border-[#D6866B] rounded-full hover:bg-[#D6866B] hover:text-white py-2 text-[16px] flex px-4 gap-2 font-medium transition'
          >
            <LogInIcon width={15} /> <span>Log In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
