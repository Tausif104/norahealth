"use client";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BlogContext } from "@/lib/BlogContext";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation";

import MobileHeader from "./mobile-header";
import HeaderTop from "./header-top";

const Header = ({ isAdmin, isAuthor, payload, logoutAction }) => {
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
    <>
      <MobileHeader payload={payload} logoutAction={logoutAction} />
      <header className='lg:block hidden'>
        <HeaderTop />
        <div className='bg-[#F4E7E1] py-3'>
          <div className='container custom-container mx-auto flex items-center justify-between px-4'>
            <div className='site-logo'>
              <Link href='/'>
                <Image
                  src='/images/logo.svg'
                  width={256}
                  height={50}
                  alt='Nora Health'
                  className={`max-w-[160px] ${
                    currentLang === "en"
                      ? "xl:max-w-[190px] 2xl:max-w-[230px]"
                      : "lg:max-w-[130px] xl:max-w-[160px]"
                  } h-auto`}
                />
              </Link>
            </div>
            <Navigation
              isAdmin={isAdmin}
              isAuthor={isAuthor}
              payload={payload}
              logoutAction={logoutAction}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
