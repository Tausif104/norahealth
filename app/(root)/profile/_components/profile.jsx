"use client";
import React from "react";
import Image from "next/image";
import {
  User,
  HeartPulse,
  ShoppingBag,
  Lock,
  ArrowRight,
  PanelLeft,
} from "lucide-react";
import DateField from "@/components/global/DateField";
import Link from "next/link";

const Profile = () => {
  const [dob, setDob] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <section className='py-0 md:py-[130px]'>
      <div className='container custom-container mx-auto px-0 md:px-[24px] sm:px-0'>
        <div className='relative bg-[FAF9F8] md:bg-[#FFF9F4] rounded-[16px] shadow-[0_10px_80px_0_rgba(30,96,221,0.06)] flex   gap-6'>
          {/* SIDEBAR */}
          <aside
            className={`w-[300px] bg-[#F6E6D6] md:rounded-[12px] p-6 pr-8 md:p-12 flex-shrink-0 absolute md:relative top-0 md:top-auto  md:left-0  h-dvh md:h-auto ${
              menuOpen ? "left-0" : "-left-[500px]"
            }  transition-all duration-500 z-20`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full absolute top-6 -right-5 z-10'
            >
              <PanelLeft />
            </button>
            {/* <div className='mb-6 flex items-center justify-between md:justify-start md:gap-3'>
              <button className='inline-flex items-center gap-2 bg-[#d67b0e] text-white text-sm font-medium py-2 px-4 rounded-full'>
                <User className='w-4 h-4' />
                <span className='hidden md:inline'>Profile</span>
              </button>
            </div> */}

            <nav className='space-y-2 text-base'>
              <Link
                href='#'
                className='w-full flex items-center gap-2 bg-[#d67b0e] text-white py-2.5 px-3 rounded-full text-left'
              >
                <User className='w-4 h-4' />
                <span>Profile</span>
              </Link>
              <Link
                href='#'
                className='w-full flex items-center gap-2 py-2.5 px-3 rounded-full text-left text-[#3A3D42] hover:bg-[#f4d9c0] transition'
              >
                <HeartPulse className='w-4 h-4' />
                <span>Health Profile</span>
              </Link>
              <Link
                href='#'
                className='w-full flex items-center gap-2 py-2.5 px-3 rounded-full text-left text-[#3A3D42] hover:bg-[#f4d9c0] transition'
              >
                <ShoppingBag className='w-4 h-4' />
                <span>Orders</span>
              </Link>
              <Link
                href='#'
                className='w-full flex items-center gap-2 py-2.5 px-3 rounded-full text-left text-[#3A3D42] hover:bg-[#f4d9c0] transition'
              >
                <Lock className='w-4 h-4' />
                <span>Change Password</span>
              </Link>
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <div className='flex-1 space-y-6 p-[24px] md:p-[50px]'>
            {/* Header */}
            <div className='flex items-center gap-[50px]'>
              <button
                onClick={() => setMenuOpen(true)}
                className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full'
              >
                <PanelLeft />
              </button>
              <h2 className='text-[#0D060C] text-[20px] md:text-[24px] font-semibold'>
                Your Profile
              </h2>
            </div>

            <div className='flex items-center justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <div className='relative w-[64px] lg:w-[100px] h-[64px] lg:h-[100px] rounded-full overflow-hidden bg-[#F6F5F4]'>
                  <Image
                    src='/images/profile-placeholder.png' // replace with real image
                    alt='Profile'
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h3 className='text-[#1F2122] text-[20px] md:text-[22px] font-semibold'>
                    Sarah M.
                  </h3>
                  <p className='text-sm text-[#3A3D42]'> Age: 28</p>
                </div>
              </div>

              <button className='hidden md:inline-flex items-center text-sm font-medium bg-[#d67b0e] text-white py-2.5 px-5 rounded-full hover:bg-[#b8680b] transition'>
                Edit Profile
              </button>
            </div>

            {/* MOBILE edit button */}
            <button className='md:hidden inline-flex items-center text-sm font-medium bg-[#d67b0e] text-white py-2.5 px-5 rounded-full hover:bg-[#b8680b] transition'>
              Edit Profile
            </button>

            {/* FORM */}
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {/* First / Last name */}
                <div className='md:col-span-2'>
                  <label
                    htmlFor='firstName'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    First name
                  </label>
                  <input
                    id='firstName'
                    type='text'
                    defaultValue='Sarah M.'
                    className='bg-white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label
                    htmlFor='lastName'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Last name
                  </label>
                  <input
                    id='lastName'
                    type='text'
                    defaultValue='Sarah M.'
                    className='bg-white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>

                {/* Email / Phone */}
                <div className='md:col-span-2'>
                  <label
                    htmlFor='email'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Email Address
                  </label>
                  <input
                    id='email'
                    type='email'
                    defaultValue='sarah@example.com'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label
                    htmlFor='phone'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Phone Number
                  </label>
                  <input
                    id='phone'
                    type='tel'
                    defaultValue='+447386235014'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>

                {/* DOB / NHS */}
                <DateField
                  id='dob'
                  label='Date of Birth'
                  selected={dob}
                  onChange={setDob}
                  placeholder='13 January 2002'
                  className='md:col-span-2'
                />
                <div className='md:col-span-2'>
                  <label
                    htmlFor='nhs'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    NHS number
                  </label>
                  <input
                    id='nhs'
                    type='text'
                    defaultValue='485 777 3456'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>

                {/* Home address / Zip */}
                <div className='md:col-span-3'>
                  <label
                    htmlFor='homeAddress'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Home Address
                  </label>
                  <input
                    id='homeAddress'
                    type='text'
                    defaultValue='Wellin Lane, Edwalton, United Kingdom'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>
                <div className='md:col-span-1'>
                  <label
                    htmlFor='homeZip'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Zip code
                  </label>
                  <input
                    id='homeZip'
                    type='text'
                    defaultValue='NG12 4AS'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>

                {/* Delivery address / Zip */}
                <div className='md:col-span-3'>
                  <label
                    htmlFor='deliveryAddress'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Delivery Address
                  </label>
                  <input
                    id='deliveryAddress'
                    type='text'
                    defaultValue='Wellin Lane, Edwalton, United Kingdom'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>
                <div className='md:col-span-1'>
                  <label
                    htmlFor='deliveryZip'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Zip code
                  </label>
                  <input
                    id='deliveryZip'
                    type='text'
                    defaultValue='NG12 4AS'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                  />
                </div>

                {/* Country / Language */}
                <div className='md:col-span-2'>
                  <label
                    htmlFor='country'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Country
                  </label>
                  <select
                    id='country'
                    defaultValue='England'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px] appearance-none'
                  >
                    <option>England</option>
                    <option>Scotland</option>
                    <option>Wales</option>
                    <option>Northern Ireland</option>
                  </select>
                </div>
                <div className='md:col-span-2'>
                  <label
                    htmlFor='language'
                    className='block text-base mb-2 text-[#0D060C]'
                  >
                    Language
                  </label>
                  <select
                    id='language'
                    defaultValue='English'
                    className='bg:white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px] appearance-none'
                  >
                    <option>English</option>
                  </select>
                </div>

                {/* Save button */}
                <div className='md:col-span-4'>
                  <button
                    type='submit'
                    className='w-full md:w-auto flex items-center justify-center gap-2 bg-[#d67b0e] text-white text-[16px] font-medium py-3 px-8 rounded-full hover:bg-[#b8680b] transition'
                  >
                    <span>Save now</span>
                    <ArrowRight className='w-4 h-4 -rotate-45' />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
