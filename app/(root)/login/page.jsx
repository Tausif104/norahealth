import React from "react";
import LoginForm from "./_components/loginForm";
import Link from "next/link";

const page = async () => {
  return (
    <>
      <section className='section-padding'>
        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <div className='p-4 md:p-[40px] shadow-[0_10px_80px_0_rgba(30,96,221,0.1)] rounded-[12px] max-w-[670px] mx-auto space-y-[30px]'>
            <h2 className='text-center text-[#1F2122] text-[24px] md:text-[32px] font-semibold'>
              Let’s Sign you in
            </h2>
            <LoginForm />
            <p className='text-center text-[#1D2D44] text-base leading-[1.8]'>
              By logging in, you agree to the personal{" "}
              <Link href='/legal-policies' className='text-[#d67b0e] underline'>
                data processing policy
              </Link>
              <br />
              Don’t have an account yet?
              <Link href='/register' className='text-[#d67b0e] underline ml-2'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
