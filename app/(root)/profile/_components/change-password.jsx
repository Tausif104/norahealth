"use client";
import { useProfile } from "@/lib/profileContext";
import { ArrowRight, CircleCheck, PanelLeft } from "lucide-react";
import React from "react";

const ChangePassword = () => {
  const { setMenuOpen } = useProfile();
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to your API
  };
  return (
    <div className='max-w-[630px] mx-auto flex-1 space-y-6 py-[24px] md:py-[150px] px-[24px] md:px-0'>
      {/* Header */}
      <div className='flex items-center gap-[50px]'>
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-[#0D060C] text-[20px] md:text-[24px] font-semibold'>
          Change Password
        </h2>
      </div>

      {/* form */}

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Current password */}
        <div>
          <label
            htmlFor='currentPassword'
            className='block text-base mb-2 text-[#0D060C]'
          >
            Your Password
          </label>
          <input
            id='currentPassword'
            type='password'
            placeholder='Current password'
            className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* New password */}
        <div>
          <label
            htmlFor='newPassword'
            className='block text-base mb-2 text-[#0D060C]'
          >
            New Password
          </label>
          <input
            id='newPassword'
            type='password'
            placeholder='Enter your new password'
            className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
          />

          {/* helper text */}
          <p className='flex items-center gap-2 text-[16px] text-[#9a9b9d] mt-2'>
            <CircleCheck className='inline-block w-4 h-4' />
            <span>Your password must be 8–12 characters long</span>
          </p>
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor='confirmPassword'
            className='block text-base mb-2 text-[#0D060C]'
          >
            Re enter your new password
          </label>
          <input
            id='confirmPassword'
            type='password'
            placeholder='Confirm password'
            className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* Buttons */}
        <div className='flex items-center gap-4 pt-2'>
          <button
            type='button'
            className='cursor-pointer inline-flex items-center justify-center border border-[#D6866B] text-[#D6866B] text-[16px] font-medium py-4 px-8 rounded-full hover:bg-[#D6866B] hover:text-white transition'
          >
            Cancel
          </button>

          <button
            type='submit'
            className='cursor-pointer text-white inline-block bg-[#D6866B] text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 sm:w-auto w-full'
          >
            <span className='flex items-center justify-center'>
              <span>Update</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
