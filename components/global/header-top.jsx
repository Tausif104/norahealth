"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { applyGoogleTranslateLang } from "@/lib/googleTranslateController";
import { BlogContext } from "@/lib/BlogContext";

const LANGS = [
  {
    code: "en",
    name: "English",
    flag: "/images/australia.svg",
    alt: "English",
  },
  {
    code: "fr",
    name: "French",
    flag: "/images/france.png",
    alt: "French",
  },
  {
    code: "es",
    name: "Spanish",
    flag: "/images/spain.png",
    alt: "Spanish",
  },
  {
    code: "pt",
    name: "Portuguese",
    flag: "/images/portugal.png",
    alt: "Portuguese",
  },
];

const LANG_VALUE_MAP = {
  en: ["en"],
  fr: ["fr"],
  es: ["es", "es-419", "es-ES"],
  pt: ["pt", "pt-PT", "pt-BR"],
};

const HeaderTop = () => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("en");
  const { control, setControl } = useContext(BlogContext);
  const applyTranslateWhenReady = (lang) => {
    let tries = 0;
    const timer = setInterval(() => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
        clearInterval(timer);
      }
      tries += 1;
      if (tries > 40) clearInterval(timer); // ~6 seconds max
    }, 150);
  };

  useEffect(() => {
    const saved = Cookies.get("userLang");
    if (!saved) {
      Cookies.set("userLang", "en", { expires: 7 });
      setCurrentLang("en");
    } else {
      setCurrentLang(saved);
    }
  }, []);
  const handleLangChange = async (lang) => {
    // Cookies.set("googtrans", `/en/${lang}`, { expires: 7, path: "/" });

    setControl(!control);
    setCurrentLang(lang);
    applyGoogleTranslateLang(lang);

    // if (lang === "en") {
    //   console.log(
    //     " 🚫 hard reset to original language (Google Translate is messy without this)"
    //   );

    //   // ✅ hard reset to original language (Google Translate is messy without this)
    //   setTimeout(async () => {
    //     // window.location.reload();
    //     // router.prefetch();
    //     await applyGoogleTranslateLang(lang);
    //   }, 50);
    //   return;
    // } else {
    //   console.log(" 🌐 switching language to:", lang);
    //   await applyGoogleTranslateLang(lang);
    // }
    // apply only once, waits for combo & picks correct option
    // applyGoogleTranslateLang(lang);
    // ✅ one call only

    // router.refresh(); // keep OFF
  };

  return (
    <div className='bg-theme py-2'>
      <div className='container custom-container mx-auto flex items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <h3 className='text-white'>Language</h3>

          <div className='flex items-center gap-2'>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type='button'
                onClick={() => handleLangChange(l.code)}
                className={`rounded p-1 transition ${
                  currentLang === l.code
                    ? "ring-2 ring-white rounded-full"
                    : "opacity-80 hover:opacity-100"
                }`}
                aria-label={`Switch language to ${l.name}`}
                title={l.name}
              >
                <Image src={l.flag} width={20} height={20} alt={l.alt} />
              </button>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-4 notranslate' translate='no'>
          <div className='flex items-center gap-2'>
            <span className='bg-[#ffffff30] w-[25px] h-[25px] rounded-full flex justify-center items-center'>
              <Mail className='text-white' width={13} />
            </span>
            <a href='mailto:thepharmaclinic@gmail.com' className='text-white'>
              thepharmaclinic@gmail.com
            </a>
          </div>

          <div className='flex items-center gap-2'>
            <span className='bg-[#ffffff30] w-[25px] h-[25px] rounded-full flex justify-center items-center'>
              <Phone className='text-white' width={13} />
            </span>
            <a href='tel:02086797198' className='text-white'>
              0208 679 7198
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
