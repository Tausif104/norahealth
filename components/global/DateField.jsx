"use client";
import React from "react";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

export default function DateField({
  label,
  placeholder,
  selected,
  onChange,
  className = "",
  id,
}) {
  return (
    <div className={`relative ${className}`}>
      <label className='block text-base mb-2 text-[#0D060C]' htmlFor={id}>
        {label}
      </label>

      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat='dd MMMM yyyy'
        className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42]
        !w-full py-[15px] md:py-[18px] pl-[16px] pr-[40px] rounded-[6px]
        focus:outline-none'
      />

      <CalendarDays className='absolute right-3 bottom-3.5 md:bottom-4.5 text-[#3A3D42] w-5 h-5 pointer-events-none' />
    </div>
  );
}
