import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { BlogProvider } from "@/lib/BlogContext";
import "react-datepicker/dist/react-datepicker.css";
import GoogleTranslate from "./_components/GoogleTranslate";
import { loggedInUserAction, logoutAction } from "@/actions/user.action";

export const metadata = {
  title: {
    default: "Home",
    template: "%s | Nora Health",
  },
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default async function RootLayout({ children }) {
  const payload = await loggedInUserAction();

  const isAdmin =
    payload?.payload?.role === "ADMIN" ||
    payload?.payload?.role === "SUPERADMIN";
  const isAuthor = payload?.payload?.role === "AUTHOR";
  return (
    <BlogProvider>
      <GoogleTranslate />
      <Header
        isAdmin={isAdmin}
        isAuthor={isAuthor}
        payload={payload}
        logoutAction={logoutAction}
      />
      <main>{children}</main>
      <Footer />
    </BlogProvider>
  );
}
