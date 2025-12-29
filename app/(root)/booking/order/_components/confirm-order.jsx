"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBookingOrder } from "@/actions/booking.action";
import { toast } from "sonner";

const ConfirmOrder = ({ userDetails }) => {
  const originalSubmitWrapRef = useRef(null);
  const formRef = useRef(null);
  const [showStickySubmit, setShowStickySubmit] = useState(false);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const fullName = userDetails?.account
    ? `${userDetails.account.firstName || ""} ${
        userDetails.account.lastName || ""
      }`.trim()
    : "";

  const [form, setForm] = useState({
    fullName,
    email: userDetails?.email || "",
    phoneNumber: userDetails?.account?.phoneNumber || "",
    ocRequest: "SAME_OC",
    appointmentRequest: "false", // ✅ default false
    notes: "",
    date: today,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function getTodayDate() {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:mm
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => formData.set(key, value));
      // ✅ FORCE booking date & time
      formData.set("bookingdate", getTodayDate());
      formData.set("bookingtime", getCurrentTime());

      formData.set("serviceName", "Oral Contraception");
      formData.set("providerName", "Manor Chemist");
      formData.set("nhsService", "NHS Service");

      const res = await createBookingOrder(formData);

      if (!res.success) {
        toast.error(res.msg || "Order failed");
        return;
      }

      toast.success("Contraceptives ordered successfully");
      router.push("/profile");
    } catch (err) {
      toast.error("Something went wrong");
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
      <div className='container custom-container mx-auto px-6'>
        {/* <Link href='/booking' className='flex items-center gap-2 mb-6'>
          <ArrowLeft /> Back
        </Link> */}

        <form onSubmit={handleSubmit} ref={formRef}>
          <div className='grid lg:grid-cols-3 gap-8 bg-[#FAF9F8] p-4 2xl:p-8 rounded-2xl'>
            {/* LEFT */}
            <div className='lg:col-span-2 space-y-5'>
              <Input
                label='Name'
                name='fullName'
                value={form.fullName}
                onChange={handleChange}
              />
              <Input
                label='Email'
                name='email'
                type='email'
                value={form.email}
                onChange={handleChange}
              />
              <Input
                label='Phone number'
                name='phoneNumber'
                value={form.phoneNumber}
                onChange={handleChange}
              />

              {/* OC Request */}
              <RadioGroup
                label='Oral Contraceptive (OC) Request'
                name='ocRequest'
                value={form.ocRequest}
                onChange={handleChange}
                options={[
                  { label: "Same OC", value: "SAME_OC" },
                  { label: "Different OC", value: "DIFFERENT_OC" },
                  { label: "Morning After Pill", value: "MORNING_AFTER_PILL" },
                ]}
              />

              {/* Appointment Request */}
              <RadioGroup
                label='Would you like to request an appointment?'
                name='appointmentRequest'
                value={form.appointmentRequest}
                onChange={handleChange}
                options={[
                  { label: "No", value: "false" }, // ✅ boolean string
                  { label: "Yes", value: "true" }, // ✅ boolean string
                ]}
              />

              <div>
                <label className='block mb-2'>Notes (Optional)</label>
                <textarea
                  name='notes'
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  className='w-full border rounded p-3'
                  placeholder='Please indicate which contraceptive medicine you are currently on'
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className='space-y-5'>
              <div className='booking-img max-[1367px]:max-h-40  overflow-hidden rounded-2xl'>
                <Image
                  src='/images/booking.png'
                  width={370}
                  height={200}
                  alt='booking'
                  className='rounded-2xl w-full'
                />
              </div>

              <div className='bg-[#F4E7E1] p-4 rounded-2xl'>
                <div className='space-y-1'>
                  <p className='text-sm'>
                    Once your order has been placed, your contraception tablets
                    will be securely and discreetly dispatched, and should
                    arrive within 3–5 working days.
                  </p>
                  <p className='text-sm'>
                    If you require your medication sooner, please contact us and
                    we will do our best to accommodate your request.
                  </p>
                  <p className='text-sm'>
                    If you are due for your annual review, we may be able to
                    complete this promptly and conveniently over the phone
                    without delaying your tablets.
                  </p>
                </div>
                {/* <h3 className='text-xl font-medium mb-2'>
                  Order Contraception
                </h3>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(form.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  })}
                </p>

                <p>
                  <strong>Provider:</strong> Manor Chemist
                </p>

                <p>
                  <strong>NHS Service:</strong> NHS Service
                </p> */}

                {/* <button
                  type='submit'
                  disabled={submitting}
                  className='mt-4 w-full bg-theme text-white py-4 rounded-full flex justify-center items-center gap-2'
                >
                  {submitting ? "Processing..." : "Order Contraception"}
                  {submitting ? "" : <ArrowRight />}
                </button> */}
                <div ref={originalSubmitWrapRef}>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='mt-4 text-white cursor-pointer inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full disabled:opacity-60 disabled:cursor-not-allowed'
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
                    "lg:hidden fixed left-0 right-0 bottom-20 sm:bottom-5 z-50 p-3 px-[44px]",
                    "container custom-container mx-auto",
                    showStickySubmit ? "block" : "hidden",
                  ].join(" ")}
                >
                  <button
                    type='submit'
                    disabled={submitting}
                    className='mt-4 w-full text-white bg-theme text-[16px] font-medium py-4 rounded-full disabled:opacity-60 disabled:cursor-not-allowed'
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

/* ---------- Reusable Inputs ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className='block text-base mb-2 text-[#0D060C]'>{label}</label>
    <input
      {...props}
      className='bg-white border border-[#EEE0CF] text-black w-full py-4.25 px-4 rounded-[6px]'
      required
    />
  </div>
);

const RadioGroup = ({ label, name, value, onChange, options }) => (
  <div>
    <label className='block mb-2'>{label}</label>
    <div className='flex gap-6'>
      {options.map((opt) => (
        <label key={opt.value} className='flex items-center gap-2'>
          <input
            type='radio'
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            className='hidden peer'
          />
          <span className="w-6 h-6 rounded-full border border-[#cd8936] peer-checked:border-[#cd8936] relative after:content-[''] after:w-4 after:h-4 after:bg-[#cd8936] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 peer-checked:after:block after:hidden"></span>

          <span className='text-[#0D060C]'> {opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export default ConfirmOrder;
