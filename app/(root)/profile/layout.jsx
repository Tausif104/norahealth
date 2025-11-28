import { ProfileProvider } from "@/lib/profileContext";
import React from "react";
import Sidebar from "./_components/sidebar";

const layout = ({ children }) => {
  return (
    <ProfileProvider>
      <section className='py-0 md:py-[130px]'>
        <div className='container custom-container mx-auto px-0 md:px-[24px] sm:px-0'>
          <div className='relative bg-[#FAF9F8] md:bg-[#FAF9F8] rounded-[16px] shadow-[0_10px_80px_0_rgba(30,96,221,0.06)] flex   gap-6'>
            {/* SIDEBAR */}
            <Sidebar />
            {/* MAIN CONTENT */}
            {children}
          </div>
        </div>
      </section>
    </ProfileProvider>
  );
};

export default layout;
