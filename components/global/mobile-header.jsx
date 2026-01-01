"use client";
import { Mail, Phone, User, LogInIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { menuItems } from "@/data/menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { applyGoogleTranslateLang } from "@/lib/googleTranslateController";
import { BlogContext } from "@/lib/BlogContext";

const LANGS = [
  {
    code: "en",
    name: "English",
    flag: "/images/australia.svg",
    alt: "English",
  },
  { code: "fr", name: "French", flag: "/images/france.png", alt: "French" },
  { code: "es", name: "Spanish", flag: "/images/spain.png", alt: "Spanish" },
  {
    code: "pt",
    name: "Portuguese",
    flag: "/images/portugal.png",
    alt: "Portuguese",
  },
];

const MobileHeader = ({ payload, logoutAction }) => {
  const isAdmin = payload?.payload?.isAdmin;

  const [currentLang, setCurrentLang] = useState("en");

  const { control, setControl } = useContext(BlogContext);

  useEffect(() => {
    const saved = Cookies.get("userLang");
    if (!saved) {
      Cookies.set("userLang", "en", { expires: 7, path: "/" });
      setCurrentLang("en");
    } else {
      setCurrentLang(saved);
    }
  }, []);

  const handleLangChange = async (lang) => {
    Cookies.set("userLang", lang, { expires: 7, path: "/" });
    setCurrentLang(lang);

    // যদি BlogContext না লাগে তাহলে এই লাইন remove করে দাও
    setControl(!control);

    await applyGoogleTranslateLang(lang);
  };

  const currentLangObj = LANGS.find((l) => l.code === currentLang) || LANGS[0];

  return (
    <header className='block lg:hidden'>
      {/* announcement bar */}
      <div className='px-[24px] bg-theme py-[10px]'>
        <div className='flex justify-between notranslate' translate='no'>
          <div className='flex items-center gap-2'>
            <span className='bg-[#ffffff30] w-[25px] h-[25px] rounded-full flex justify-center items-center'>
              <Mail className='text-white' width={13} />
            </span>
            <a
              href='mailto:thepharmaclinic@gmail.com'
              className='text-white cursor-pointer text-[12px]'
            >
              thepharmaclinic@gmail.com
            </a>
          </div>

          <div className='flex items-center gap-2'>
            <span className='bg-[#ffffff30] w-[25px] h-[25px] rounded-full flex justify-center items-center'>
              <Phone className='text-white' width={13} />
            </span>
            <a
              href='tel:02086797198'
              className='text-white cursor-pointer text-[12px]'
            >
              0208 679 7198
            </a>
          </div>
        </div>
      </div>

      {/* header */}
      <div className='px-[24px] py-[12px] bg-[#F4E7E1]'>
        <div className='flex items-center justify-between'>
          <div className='site-logo'>
            <Link href='/'>
              <Image
                src='/images/logo.svg'
                width={256}
                height={50}
                alt='Nora Health'
                className='max-w-[150px]'
              />
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            {/* ✅ Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className='focus:outline-0'>
                <div className=''>
                  <Image
                    src={currentLangObj.flag}
                    width={40}
                    height={40}
                    alt={currentLangObj.alt}
                    className=''
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='font-bold'>
                  Language
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {LANGS.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => handleLangChange(l.code)}
                    className='cursor-pointer'
                  >
                    <div className='flex items-center gap-2'>
                      <Image
                        src={l.flag}
                        width={18}
                        height={18}
                        alt={l.alt}
                        className='w-[18px] h-[18px]'
                      />
                      <span
                        className={
                          currentLang === l.code ? "font-semibold" : ""
                        }
                      >
                        {l.name}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account Icon */}
            {payload?.payload?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-0'>
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
                    <DropdownMenuItem>
                      <Link href='/admin'>Admin</Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <Link href='/profile'>Profile</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <form action={logoutAction}>
                      <button
                        type='submit'
                        className='w-full text-left cursor-pointer'
                      >
                        Log Out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href='/login'
                className='text-[#D6866B] w-[40px] h-[40px] border border-[#D6866B] flex items-center justify-center rounded-full hover:bg-[#D6866B] hover:text-white transition'
              >
                <LogInIcon width={22} />
              </Link>
            )}

            {/* Hamburger */}
            <DropdownMenu>
              <DropdownMenuTrigger className='focus:outline-0'>
                <Image
                  src='/images/hamburger.svg'
                  width={40}
                  height={40}
                  alt='Hamburger'
                  className='min-w-[40px]'
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='font-bold'>
                  Navigation
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.id}>
                    <Link href={item.link}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
