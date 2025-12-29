"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

function applyGoogleTranslateLang(lang) {
  const tryApply = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return false;

    // Only apply if option exists
    const hasOption = Array.from(combo.options).some((o) => o.value === lang);
    if (!hasOption) return false;

    combo.value = lang;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };

  if (tryApply()) return;

  let attempts = 0;
  const t = setInterval(() => {
    attempts += 1;
    if (tryApply() || attempts > 80) clearInterval(t); // try longer
  }, 150);
}

const GoogleTranslate = () => {
  useEffect(() => {
    const init = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // your original site language
          includedLanguages: "en,fr,es,pt", // ONLY English + French + Spanish + Portuguese
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Apply saved language on load
      const saved = Cookies.get("userLang") || "en";
      if (saved !== "en") applyGoogleTranslateLang(saved);
    };

    // IMPORTANT: cb name must match the script `cb=googleTranslateElementInit`
    window.googleTranslateElementInit = init;

    // Load script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Script already exists; just apply cookie language
      const saved = Cookies.get("userLang") || "en";
      if (saved !== "en") applyGoogleTranslateLang(saved);
    }

    // Listen for language change events from Header
    const onLangChange = (e) => {
      const lang = e.detail || "en";

      Cookies.set("userLang", lang, { expires: 7, path: "/" });

      // ✅ set both formats
      Cookies.set("googtrans", `/auto/${lang}`, { expires: 7, path: "/" });
      Cookies.set("googtrans", `/en/${lang}`, { expires: 7, path: "/" });

      applyGoogleTranslateLang(lang);
      setTimeout(() => applyGoogleTranslateLang(lang), 700);
    };

    window.addEventListener("userLangChange", onLangChange);

    return () => {
      window.removeEventListener("userLangChange", onLangChange);
    };
  }, []);

  return <div id='google_translate_element' />;
};

export default GoogleTranslate;
