"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const DecorativeBanner = ({ image }) => {
  const router = useRouter();

  return (
    <div className='relative bg-[#FFF8EF] rounded-xl border border-[#D6866B] px-[60px] xl:py-22 lg:p-6 lg:py-16  py-20 pb-10 mb-8'>
      <button
        className='absolute left-4 top-4 inline-flex items-center gap-2 bg-[#CE8936] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm cursor-pointer hover:bg-[#491F40] transition group duration-300'
        onClick={() => router.back()}
      >
        <ChevronLeft className='w-5 h-5' /> Back to resources
      </button>
      <Link
        href='/booking'
        className='absolute right-4 top-4 inline-flex items-center gap-2 bg-[#CE8936] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm cursor-pointer hover:bg-[#491F40] transition group duration-300'
      >
        <span className='flex items-center justify-center'>
          <span>Book a Free Call</span>
          <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
            <ArrowRight />
          </span>
        </span>
      </Link>

      <div className='flex justify-center items-center'>
        <div className=''>
          <Image
            className='object-contain max-h-[300px]'
            src={image}
            alt='illustration'
            width={650}
            height={350}
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
};

export default DecorativeBanner;
