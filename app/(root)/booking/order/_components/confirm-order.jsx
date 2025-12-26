"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBookingOrder } from "@/actions/booking.action";
import { toast } from "sonner";

const ConfirmOrder = ({ userDetails }) => {
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

  return (
    <section className='section-padding'>
      <div className='container mx-auto px-6'>
        {/* <Link href='/booking' className='flex items-center gap-2 mb-6'>
          <ArrowLeft /> Back
        </Link> */}

        <form onSubmit={handleSubmit}>
          <div className='grid lg:grid-cols-3 gap-8 bg-[#FAF9F8] p-8 rounded-2xl'>
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
              <Image
                src='/images/booking.png'
                width={370}
                height={200}
                alt='booking'
                className='rounded-2xl w-full'
              />

              <div className='bg-[#F4E7E1] p-6 rounded-2xl'>
                <h3 className='text-xl font-medium mb-4'>Oral Contraception</h3>

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
                </p>

                <button
                  type='submit'
                  disabled={submitting}
                  className='mt-6 w-full bg-theme text-white py-4 rounded-full flex justify-center items-center gap-2'
                >
                  {submitting ? "Processing..." : "Order Contraceptives"}
                  {submitting ? "" : <ArrowRight />}
                </button>
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
