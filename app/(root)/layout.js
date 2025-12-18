import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { BlogProvider } from "@/lib/BlogContext";
import "react-datepicker/dist/react-datepicker.css";

export const metadata = {
  title: "Home",
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default function RootLayout({ children }) {
  return (
    <BlogProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </BlogProvider>
  );
}
