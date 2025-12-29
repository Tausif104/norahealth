"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Mail, Phone } from "lucide-react";

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

  useEffect(() => {
    const saved = Cookies.get("userLang");
    if (!saved) {
      Cookies.set("userLang", "en", { expires: 7 });
      setCurrentLang("en");
    } else {
      setCurrentLang(saved);
    }
  }, []);

  const setCookieEverywhere = (name, value) => {
    // normal
    Cookies.set(name, value, { expires: 7, path: "/" });

    // also set on root domain (helps on www / subdomains)
    const hostParts = window.location.hostname.split(".");
    if (hostParts.length >= 2) {
      const rootDomain = "." + hostParts.slice(-2).join(".");
      Cookies.set(name, value, { expires: 7, path: "/", domain: rootDomain });
    }
  };

  const applyTranslateWhenReady = (lang) => {
    let tries = 0;

    const timer = setInterval(() => {
      const combo = document.querySelector(".goog-te-combo");
      if (!combo) {
        if (++tries > 80) clearInterval(timer);
        return;
      }

      const candidates = LANG_VALUE_MAP[lang] || [lang];

      const match = candidates.find((c) =>
        Array.from(combo.options).some((o) => o.value === c)
      );

      if (!match) {
        if (++tries > 80) clearInterval(timer);
        return;
      }

      combo.value = match;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      clearInterval(timer);
    }, 150);
  };

  const handleLangChange = (lang) => {
    setCookieEverywhere("userLang", lang);

    // ✅ best compatibility
    setCookieEverywhere("googtrans", `/auto/${lang}`);
    setCookieEverywhere("googtrans", `/en/${lang}`);

    setCurrentLang(lang);

    applyTranslateWhenReady(lang);
    setTimeout(() => applyTranslateWhenReady(lang), 800);

    window.dispatchEvent(new CustomEvent("userLangChange", { detail: lang }));
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
