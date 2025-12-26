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
  }, // use your flag file
  { code: "fr", name: "French", flag: "/images/france.png", alt: "French" }, // use your flag file
];

const HeaderTop = () => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("en");
  console.log(currentLang, "hj");

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

  const handleLangChange = (lang) => {
    Cookies.set("userLang", lang, { expires: 7, path: "/" });

    // ✅ cookie Google Translate actually follows
    Cookies.set("googtrans", `/en/${lang}`, { expires: 7, path: "/" });

    setCurrentLang(lang);

    // Try to apply immediately (works even on first click)
    applyTranslateWhenReady(lang);

    // keep your event as backup (optional)
    window.dispatchEvent(new CustomEvent("userLangChange", { detail: lang }));

    // ❌ avoid refresh, it interrupts the widget
    // router.refresh();
  };

  return (
    <div className='bg-theme py-2'>
      <div className='container custom-container mx-auto flex items-center justify-between'>
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
