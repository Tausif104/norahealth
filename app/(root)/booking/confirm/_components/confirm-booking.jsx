"use client";

import { useBooking } from "@/lib/BookingContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/booking.action";
import { toast } from "sonner";

const ConfirmBooking = ({ userDetails }) => {
  const originalSubmitWrapRef = useRef(null);
  const formRef = useRef(null);
  const [showStickySubmit, setShowStickySubmit] = useState(false);
  const { bookingData, setBookingData } = useBooking();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const isLoggedIn = Boolean(userDetails?.account);
  console.log(showStickySubmit, "submit");

  const fullNameFromAccount = userDetails?.account
    ? [userDetails.account.firstName, userDetails.account.lastName]
        .filter(Boolean)
        .join(" ")
    : "";

  const [form, setForm] = useState({
    fullName: fullNameFromAccount,
    email: userDetails?.email || "",
    phoneNumber: userDetails?.account?.phoneNumber || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (!bookingData?.bookingdate || !bookingData?.bookingtime) {
      router.replace("/booking");
    }
  }, [bookingData, router]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!bookingData?.bookingdate || !bookingData?.bookingtime) {
      toast.error("No booking slot selected.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);

      // ensure date & time go with the form
      formData.set("bookingdate", bookingData.bookingdate); // "YYYY-MM-DD"
      formData.set("bookingtime", bookingData.bookingtime); // "HH:MM"

      // default values for these (match what you show on right card)
      if (!formData.get("serviceName")) {
        formData.set("serviceName", "Oral Contraception");
      }
      if (!formData.get("providerName")) {
        formData.set("providerName", "Manor Chemist");
      }
      if (!formData.get("nhsService")) {
        formData.set("nhsService", "NHS Service");
      }

      const res = await createBooking(formData);

      if (!res.success) {
        toast.error(res.msg || "Booking failed.");
        return;
      }

      toast.success("Your appointment has been booked.");
      router.push("/"); // or wherever you want
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while booking.");
    } finally {
      setSubmitting(false);
    }
  }
  useEffect(() => {
    // Only for < 1024px
    const mql = window.matchMedia("(max-width: 1023px)");

    const setupObserver = () => {
      // On desktop, never show sticky
      if (!mql.matches) {
        setShowStickySubmit(false);
        return;
      }

      const target = originalSubmitWrapRef.current;
      if (!target) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // If original submit is visible -> hide sticky
          // If not visible -> show sticky
          setShowStickySubmit(!entry.isIntersecting);
        },
        {
          // Adjust if you want it to hide a bit earlier/later
          threshold: 0.1,
        }
      );

      observer.observe(target);
      return () => observer.disconnect();
    };

    let cleanup = setupObserver();

    const onResizeChange = () => {
      if (cleanup) cleanup();
      cleanup = setupObserver();
    };

    // modern browser support
    mql.addEventListener?.("change", onResizeChange);
    window.addEventListener("resize", onResizeChange);

    return () => {
      if (cleanup) cleanup();
      mql.removeEventListener?.("change", onResizeChange);
      window.removeEventListener("resize", onResizeChange);
    };
  }, []);

  return (
    <section className='py-8'>
      <div className='container custom-container mx-auto sm:px-4 px-[24px]'>
        <Link
          href='/booking'
          className='flex items-center gap-1.5 text-[#3A3D42] mb-6'
        >
          <ArrowLeft /> Back
        </Link>

        <form onSubmit={handleSubmit} ref={formRef}>
          <div className='grid grid-cols-1 lg:grid-cols-3 bg-[#FAF9F8] rounded-2xl p-6 md:p-[30px] 2xl:p-[50px] gap-[30px]'>
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
                  name='fullName'
                  type='text'
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
                  required
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
                  name='email'
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
                  required
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
                  name='phoneNumber'
                  type='tel'
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder='Phone number'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
                  required
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
                  name='notes'
                  rows={6}
                  placeholder='Please indicate which contraceptive medicine you are currently on'
                  className='bg-white border border-[#EEE0CF] text-black w-full py-4.25 px-4 rounded-[6px]'
                />
              </div>

              <div className='space-y-4 hidden'>
                <label className='block text-base text-[#3A3D42]'>
                  Oral Contraceptive (OC) Request
                </label>

                <div className='flex items-center gap-6'>
                  {/* Same OC */}
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='ocRequest'
                      value='SAME_OC'
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
                      name='ocRequest'
                      value='DIFFERENT_OC'
                      className='hidden peer'
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          ocRequest: e.target.value,
                        })
                      }
                    />
                    <span className="w-6 h-6 rounded-full border border-[#cd8936] peer-checked:border-[#cd8936] relative after:content-[''] after:w-4 after:h-4 after:bg-theme after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 peer-checked:after:block after:hidden"></span>
                    <span className='text-[#0D060C]'>Different OC</span>
                  </label>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-5 lg:col-span-1'>
              <div className='booking-img max-[1367px]:max-h-40  overflow-hidden rounded-2xl'>
                <Image
                  src='/images/booking.png'
                  width={370}
                  height={200}
                  alt='booking'
                  className='rounded-2xl w-full'
                />
              </div>
              <div className='bg-[#F4E7E1] rounded-2xl p-[20px] 2xl:p-[24px_24px]'>
                <h2 className=' text-[#0D060C] text-[18px] md:text-[24px] font-medium pb-2 2xl:pb-5 border-b border-[#CE893646] mb-3'>
                  Oral Contraception
                </h2>
                <div className='space-y-2 2xl:space-y-5 mb-3'>
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

                {/* Hidden fields for service/provider/nhs if you want to store them */}
                <input
                  type='hidden'
                  name='serviceName'
                  value='Oral Contraception'
                />
                <input
                  type='hidden'
                  name='providerName'
                  value='Manor Chemist'
                />
                <input type='hidden' name='nhsService' value='NHS Service' />
                {/* bookingdate / bookingtime get set in handleSubmit from context */}

                {/* <button
                  type='submit'
                  disabled={submitting}
                  className=' text-white cursor-pointer inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  <span className='flex items-center justify-center'>
                    <span>
                      {submitting ? "Confirming..." : "Confirm Booking"}
                    </span>
                    <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                      {submitting ? "" : <ArrowRight />}
                    </span>
                  </span>
                </button> */}
                <div ref={originalSubmitWrapRef}>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='text-white cursor-pointer inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    <span className='flex items-center justify-center'>
                      <span>
                        {submitting ? "Confirming..." : "Confirm Booking"}
                      </span>
                      <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                        {submitting ? "" : <ArrowRight />}
                      </span>
                    </span>
                  </button>
                </div>
                {/* Mobile sticky submit (shows only when original submit is NOT visible) */}
                <div
                  className={[
                    "lg:hidden fixed left-0 right-0 bottom-20 z-50 p-3 px-[44px]",
                    showStickySubmit ? "block" : "hidden",
                  ].join(" ")}
                >
                  <button
                    type='submit'
                    disabled={submitting}
                    className='w-full text-white bg-theme text-[16px] font-medium py-4 rounded-full disabled:opacity-60 disabled:cursor-not-allowed'
                    onClick={() => {
                      // optional: ensure required fields show validation nicely
                      // (the button is inside the same form, so normal submit works too)
                    }}
                  >
                    {submitting ? "Confirming..." : "Confirm Booking"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConfirmBooking;
