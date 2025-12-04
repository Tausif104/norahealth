"use client";
import { useBooking } from "@/lib/BookingContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const ConfirmBooking = () => {
  const { bookingData, setBookingData } = useBooking();
  const router = useRouter();

  useEffect(() => {
    if (!bookingData?.bookingdate) {
      router.replace("/booking");
    }
  }, [bookingData, router]);
  console.log(bookingData);
  function formatBookingDate(dateStr, timeStr) {
    if (!dateStr || !timeStr) return "";

    const [year, month, day] = dateStr.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    const formatted = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

    return `${formatted}, ${timeStr}`;
  }

  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <Link
          href='/booking'
          className='flex items-center gap-1.5 text-[#3A3D42] mb-6'
        >
          <ArrowLeft /> Back
        </Link>
        <form action=''>
          <div className='grid grid-cols-1 lg:grid-cols-3 bg-[#FAF9F8] rounded-2xl p-6 md:p-[30px] xl:p-[50px] gap-[30px]'>
            <div className='lg:col-span-2 space-y-5'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-base mb-2 text-[#0D060C]'
                >
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='Enter your full name'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-base mb-2 text-[#0D060C]'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
                />
              </div>
              <div>
                <label
                  htmlFor='phone'
                  className='block text-base mb-2 text-[#0D060C]'
                >
                  Phone number
                </label>
                <input
                  id='phone'
                  type='number'
                  placeholder='Phone number'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
                />
              </div>
              <div>
                <label
                  htmlFor='notes'
                  className='block text-base mb-2 text-[#0D060C]'
                >
                  Notes (Optional)
                </label>
                <textarea
                  id='notes'
                  rows={6}
                  placeholder='If you have any specific questions or concerns you may write them here'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
                />
              </div>
              <div className='space-y-4'>
                <label className='block text-base text-[#3A3D42]'>
                  Oral Contraceptive (OC) Request
                </label>

                <div className='flex items-center gap-6'>
                  {/* Same OC */}
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='oc_request'
                      value='same'
                      className='hidden peer'
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          ocRequest: e.target.value,
                        })
                      }
                    />
                    <span className="w-6 h-6 rounded-full border border-[#0D060C] peer-checked:border-[#0D060C] relative after:content-[''] after:w-4 after:h-4 after:bg-[#0D060C] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 peer-checked:after:block after:hidden"></span>
                    <span className='text-[#0D060C]'>Same OC</span>
                  </label>

                  {/* Different OC */}
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='oc_request'
                      value='different'
                      className='hidden peer'
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          ocRequest: e.target.value,
                        })
                      }
                    />
                    <span className="w-6 h-6 rounded-full border border-[#0D060C] peer-checked:border-[#0D060C] relative after:content-[''] after:w-4 after:h-4 after:bg-[#0D060C] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 peer-checked:after:block after:hidden"></span>
                    <span className='text-[#0D060C]'>Different OC</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-5 lg:col-span-1'>
              <Image
                src='/images/booking.png'
                width={370}
                height={200}
                alt='booking'
                className='rounded-2xl object-cover w-full max-h-[200px]'
              />
              <div className='bg-[#F4E7E1] rounded-2xl p-[30px_24px]'>
                <h2 className=' text-[#0D060C] text-[18px] md:text-[24px] font-medium pb-5 border-b border-[#CE893646] mb-5'>
                  Oral Contraception
                </h2>
                <div className='space-y-5 mb-6'>
                  <div className='text-[#3A3D42] flex items-start gap-2'>
                    <span>Date:</span>{" "}
                    <span className='text-[#0D060C] font-medium'>
                      {formatBookingDate(
                        bookingData?.bookingdate,
                        bookingData?.bookingtime
                      )}
                    </span>
                  </div>
                  <div className='text-[#3A3D42] flex items-start gap-2'>
                    <span>Provider:</span>{" "}
                    <span className='text-[#0D060C] font-medium'>
                      Manor Chemist
                    </span>
                  </div>
                  <div className='text-[#3A3D42] flex items-start gap-2'>
                    <span>NHS Service:</span>
                    <span className='text-[#0D060C] font-medium'>
                      NHS Service
                    </span>
                  </div>
                </div>
                <button
                  type='submit'
                  className=' text-white cursor-pointer inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full'
                >
                  <span className='flex items-center justify-center'>
                    <span>Confirm Booking</span>
                    <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                      <ArrowRight />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConfirmBooking;
