import { Clock, MapPin, WalletMinimal } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookingCalander from "./booking-calander";

const Bookings = () => {
  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <h2 className='text-center text-[#1F2122] text-[18px] md:text-[24px] font-semibold max-w-[680px] mx-auto mb-[40px]'>
          Book a free telephone appointment in just a few clicks to discuss your
          contraceptive needs.
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-[30px]'>
          <div className='flex flex-col gap-5 lg:col-span-1'>
            <Image
              src='/images/booking.png'
              width={370}
              height={318}
              alt='booking'
              className='rounded-2xl object-cover w-full'
            />
            <div className='bg-[#F4E7E1] rounded-2xl p-[30px_24px]'>
              <h2 className=' text-[#0D060C] text-[18px] md:text-[24px] font-medium pb-5 border-b border-[#CE893646] mb-5'>
                Telephone Appointment
              </h2>
              <div className='space-y-5'>
                <div className='text-[#3A3D42] flex items-start gap-2'>
                  <Clock className='w-5 ' /> <span>5m</span>
                </div>
                <div className='text-[#3A3D42] flex items-start gap-2'>
                  <MapPin className='min-w-5 ' />{" "}
                  <span>
                    Manor Chemist & Clinic, 341 Tamworth Ln, Mitcham CR4 1DL
                  </span>
                </div>
                <div className='text-[#3A3D42] flex items-start gap-2'>
                  <WalletMinimal className='text-[#3A3D42] w-5' />{" "}
                  <span>Free NHS</span>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:col-span-2'>
            <BookingCalander />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bookings;
