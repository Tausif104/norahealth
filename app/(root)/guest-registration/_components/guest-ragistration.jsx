"use client";
import React from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import DateField from "@/components/global/DateField";

const GuestRagistration = () => {
  const [dob, setDob] = React.useState(null);
  const [weightDate, setWeightDate] = React.useState(null);
  const [bpDate, setBpDate] = React.useState(null);
  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <div className='p-4 md:p-[40px] shadow-[0_10px_80px_0_rgba(30,96,221,0.1)] rounded-[12px] max-w-[900px] mx-auto space-y-[30px]'>
          <h2 className='text-center text-[#1F2122] text-[24px] md:text-[32px] font-semibold'>
            Account Registration
          </h2>

          {/* Personal Details title + line */}
          <div className='flex items-center gap-3'>
            <p className='text-[#1F2122] text-[18px] md:text-[20px] font-semibold'>
              Personal Details
            </p>
            <span className='h-[1px] bg-[#F9E4CA] flex-1' />
          </div>

          <form action=''>
            {/* PERSONAL DETAILS */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              {/* First Name */}
              <div className='md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='firstName'
                >
                  First name
                </label>
                <input
                  type='text'
                  id='firstName'
                  placeholder='First name'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Last Name */}
              <div className='md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='lastName'
                >
                  Last name
                </label>
                <input
                  type='text'
                  id='lastName'
                  placeholder='Last name'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Phone Number */}
              <div className='md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='phone'
                >
                  Phone Number
                </label>
                <input
                  type='tel'
                  id='phone'
                  placeholder='Phone Number'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Email */}
              <div className='md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='email'
                >
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='Email address'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Date of Birth */}

              {/* <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='dob'
                >
                  Date of Birth
                </label>
                <input
                  type='text'
                  id='dob'
                  placeholder='27 October 2025'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] pl-[16px] pr-[40px] rounded-[6px]'
                />
                <CalendarDays className='absolute right-3 bottom-3.5 w-5 h-5 text-[#3A3D42]' /> */}
              <DateField
                id='dob'
                label='Date of Birth'
                selected={dob}
                onChange={setDob}
                placeholder='27 October 2025'
                className='md:col-span-2'
                bg='bg-[#F6F5F4] border-0'
              />

              {/* NHS Number */}
              <div className='md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='nhs'
                >
                  NHS Number (Optional)
                </label>
                <input
                  type='text'
                  id='nhs'
                  placeholder='10 Digits NHS Number'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Address → 75% */}
              <div className='md:col-span-3'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='address'
                >
                  Address
                </label>
                <input
                  type='text'
                  id='address'
                  placeholder='Address'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Zip code → 25% */}
              <div className='md:col-span-1'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='zip'
                >
                  Zip code
                </label>
                <input
                  type='text'
                  id='zip'
                  placeholder='Zip code'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>
            </div>

            {/* HEALTH DETAILS title + line */}
            <div className='mt-8 mb-4 flex items-center gap-3'>
              <p className='text-[#1F2122] text-[18px] md:text-[20px] font-semibold'>
                Health Details
              </p>
              <span className='h-[1px] bg-[#F9E4CA] flex-1' />
            </div>

            {/* HEALTH DETAILS */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              {/* Weight (25%) */}
              <div className='md:col-span-1'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='weight'
                >
                  Weight
                </label>
                <input
                  type='text'
                  id='weight'
                  placeholder='Kg/stones/pounds'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Height (25%) */}
              <div className='md:col-span-1'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='height'
                >
                  Height
                </label>
                <input
                  type='text'
                  id='height'
                  placeholder='Cm/feet/inches'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Weight Check Date (50%) */}
              {/* <div className='relative md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='whDate'
                >
                  Weight and Height Checked Date
                </label>
                <input
                  type='text'
                  id='whDate'
                  placeholder='27 October 2025'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] pl-[16px] pr-[40px] rounded-[6px]'
                />
                <CalendarDays className='absolute right-3 bottom-3.5 text-[#3A3D42] w-5 h-5' />
              </div> */}
              <DateField
                id='whDate'
                label='Weight and Height Checked Date'
                selected={weightDate}
                onChange={setWeightDate}
                placeholder='27 October 2025'
                className='md:col-span-2'
                bg='bg-[#F6F5F4] border-0'
              />

              {/* BP Top (25%) */}
              <div className='md:col-span-1'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='bpTop'
                >
                  Blood Pressure (Top)
                </label>
                <input
                  type='text'
                  id='bpTop'
                  placeholder='Sys'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* BP Bottom (25%) */}
              <div className='md:col-span-1'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='bpBottom'
                >
                  Blood Pressure (Bottom)
                </label>
                <input
                  type='text'
                  id='bpBottom'
                  placeholder='Dis'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* BP Date (50%) */}
              {/* <div className='relative md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='bpDate'
                >
                  Blood Pressure Date
                </label>
                <input
                  type='text'
                  id='bpDate'
                  placeholder='Date checked'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] pl-[16px] pr-[40px] rounded-[6px]'
                />
                <CalendarDays className='absolute right-3 bottom-3.5 text-[#3A3D42] w-5 h-5' />
              </div> */}
              <DateField
                id='bpDate'
                label='Blood Pressure Date'
                selected={bpDate}
                onChange={setBpDate}
                placeholder='Date checked'
                className='md:col-span-2'
                bg='bg-[#F6F5F4] border-0'
              />

              {/* Medical Conditions (50%) */}
              <div className='md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='medicalConditions'
                >
                  Medical Conditions
                </label>
                <input
                  type='text'
                  id='medicalConditions'
                  placeholder='Medical Conditions'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Current Medicines (50%) */}
              <div className='md:col-span-2'>
                <label
                  className='block text-base mb-2 text-[#0D060C]'
                  htmlFor='currentMedicines'
                >
                  Current Medicines
                </label>
                <input
                  type='text'
                  id='currentMedicines'
                  placeholder='Medicines name'
                  className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
                />
              </div>

              {/* Submit button full row */}
              <div className='md:col-span-4'>
                <button
                  type='submit'
                  className='text-white bg-theme font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition w-full'
                >
                  Registration
                </button>
              </div>
            </div>
          </form>

          <p className='text-center text-[#1D2D44] text-base'>
            By logging in, you agree to the personal data processing policy
            <br />
            Already have an account?{" "}
            <Link href='/login' className='text-[#d67b0e] underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuestRagistration;
