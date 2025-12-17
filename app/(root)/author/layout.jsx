import React from "react";

import { AuthorProvider } from "@/lib/authorContext";
import AuthorSidebar from "./_components/authorSidebar";

const layout = ({ children }) => {
  return (
    <AuthorProvider>
      <section className='py-0 lg:py-[130px] relative'>
        <div className='container custom-container mx-auto px-0 md:px-[24px] sm:px-0 py-0 sm:py-5 md:py-10 lg:py-0'>
          <div className=' bg-[#FAF9F8] md:bg-[#FAF9F8] rounded-[16px] shadow-[0_10px_80px_0_rgba(30,96,221,0.06)] flex'>
            {/* SIDEBAR */}
            <AuthorSidebar />
            {/* MAIN CONTENT */}
            {children}
          </div>
        </div>
      </section>
    </AuthorProvider>
  );
};

export default layout;
