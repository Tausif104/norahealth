import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DecorativeBanner = ({ link, image }) => {
  return (
    <div className='relative bg-[#FFF8EF] rounded-xl border border-[#D6866B] px-[60px] py-28 lg:p-6 lg:py-16 mb-8'>
      <Link
        href={link}
        className='absolute left-4 top-4 inline-flex items-center gap-2 bg-[#CE8936] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm cursor-pointer'
      >
        <ChevronLeft className='w-5 h-5' /> Back to resources
      </Link>

      <div className='flex justify-center items-center'>
        <div className=''>
          <Image
            src={image}
            alt='illustration'
            width={368}
            height={250}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DecorativeBanner;
