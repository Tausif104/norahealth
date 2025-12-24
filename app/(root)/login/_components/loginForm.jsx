"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { Eye, EyeOff, LoaderIcon, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { loginAction } from "@/actions/user.action";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const LoginForm = () => {
  const router = useRouter();
  const [forgotOpen, setForgotOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const initialState = {
    msg: "",
    success: false,
  };

  const [state, action, loading] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.msg) {
      if (state.success) {
        toast.success(state.msg);
        // ✅ redirect back to original protected page
        router.push(decodeURIComponent(callbackUrl));
      } else {
        toast.warning(state.msg);
      }
    }
    state.msg = "";
  }, [state.msg]);

  return (
    <>
      <form action={action}>
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
              name='email'
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
              name='password'
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
              onClick={() => setForgotOpen(true)}
              className='text-[#0D060C] underline hover:text-[#cd8936] transition duration-300'
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type='submit'
            className=' text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full cursor-pointer'
          >
            <span className='flex items-center justify-center'>
              {loading ? (
                <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                  <LoaderIcon
                    role='status'
                    aria-label='Loading'
                    className='size-6 animate-spin mx-auto'
                  />
                </span>
              ) : (
                <span>Sign In</span>
              )}
            </span>
          </button>
        </div>
      </form>

      <ForgotPasswordDialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </>
  );
};

export default LoginForm;
