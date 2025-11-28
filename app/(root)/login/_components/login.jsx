"use client";
import React from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import PrimaryBtn from "@/components/global/primary-btn";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <div className='p-4 md:p-[40px] shadow-[0_10px_80px_0_rgba(30,96,221,0.1)] rounded-[12px] max-w-[670px] mx-auto space-y-[30px]'>
          <h2 className='text-center text-[#1F2122] text-[24px] md:text-[32px] font-semibold'>
            Let’s Sign you in
          </h2>
          <form action=''>
            <div className='space-y-5'>
              <div className='relative'>
                <label
                  className='block text-base  mb-2 text-[#0D060C]'
                  htmlFor='email'
                >
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='Email address'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] md:py-[18px]  pl-[48px] pr-[24px]   rounded-[6px]'
                />
                <Mail className='absolute left-4 bottom-3.5 md:bottom-4.5 text-[#3A3D42]' />
              </div>
              <div className='relative'>
                <label
                  className='block text-base  mb-2 text-[#0D060C]'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  placeholder='Password'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] md:py-[18px]  pl-[48px] pr-[24px]   rounded-[6px]'
                />
                <LockKeyhole className='absolute left-4 bottom-3.5  md:bottom-4.5 text-[#3A3D42]' />
                <span>
                  {showPassword ? (
                    <Eye
                      className='absolute right-4 bottom-4.5 text-[#3A3D42] cursor-pointer'
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeOff
                      className='absolute right-4 bottom-4.5 text-[#3A3D42] cursor-pointer'
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='remember'
                    className='mr-2 w-5 h-5 rounded-[8px] accent-[#d67b0e]  '
                  />
                  <label htmlFor='remember' className='text-[#3A3D42]'>
                    Remember me
                  </label>
                </div>
                <Link
                  href='#'
                  className='text-[#0D060C] underline hover:text-[#cd8936] transition duration-300'
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type='submit'
                className=' text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full'
              >
                <span className='flex items-center justify-center'>
                  <span>Sign in</span>
                  <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                    <ArrowRight />
                  </span>
                </span>
              </button>
            </div>
          </form>
          <p className='text-center text-[#1D2D44] text-base'>
            By logging in, you agree to the personal data processing policy{" "}
            <br />
            Don’t have an account yet?{" "}
            <Link href='/register' className='text-[#d67b0e] underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
