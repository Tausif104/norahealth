import { ProfileProvider } from "@/lib/profileContext";
import React from "react";
import Sidebar from "./_components/sidebar";

const layout = ({ children }) => {
  return (
    <ProfileProvider>
      <section className='py-0 lg:py-[130px] relative'>
        <div className='container custom-container mx-auto px-0 lg:px-[24px] sm:px-0'>
          <div className=' bg-[#FAF9F8] md:bg-[#FAF9F8] rounded-[16px] shadow-[0_10px_80px_0_rgba(30,96,221,0.06)] flex'>
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
