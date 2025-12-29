import Cookies from "js-cookie";

export function setGoogTrans(lang) {
  // always write with same options so it can’t downgrade to Session
  Cookies.set("googtrans", `/en/${lang}`, {
    expires: 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // safety: sometimes a second write fixes “didn't stick” cases in dev
  setTimeout(() => {
    Cookies.set("googtrans", `/en/${lang}`, {
      expires: 7,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }, 0);
}
