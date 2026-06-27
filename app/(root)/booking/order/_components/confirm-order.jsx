"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBookingOrder } from "@/actions/booking.action";
import { toast } from "sonner";
import AppointmentPicker from "../../_components/appointment-picker";

const OC_OPTIONS = [
  {
    label: "I would like to order a pill which I am currently taking",
    value: "SAME_OC",
  },
  {
    label: "I would like to start a new type of pill",
    value: "DIFFERENT_OC",
  },
  {
    label: "I would like the Morning After Pill (aka Plan B)",
    value: "MORNING_AFTER_PILL",
  },
];

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
    ocRequest: "",
    appointmentRequest: "true",
    notes: "",
    date: today,
  });

  const [slot, setSlot] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!slot?.date || !slot?.time) {
      toast.error("Please select an appointment date and time slot.");
      return;
    }
    if (!form.ocRequest) {
      toast.error("Please select one of the options.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.set(key, value));
      formData.set("bookingdate", slot.date);
      formData.set("bookingtime", slot.time);
      formData.set("serviceName", "Oral Contraception");
      formData.set("providerName", "Manor Chemist");
      formData.set("nhsService", "NHS Service");

      const res = await createBookingOrder(formData);
      if (!res.success) {
        toast.error(res.msg || "Order failed");
        return;
      }
      toast.success("Contraceptives ordered successfully");
      router.push("/profile/orders");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");

    const setupObserver = () => {
      if (!mql.matches) {
        setShowStickySubmit(false);
        return;
      }
      const target = originalSubmitWrapRef.current;
      if (!target) return;

      const observer = new IntersectionObserver(
        ([entry]) => setShowStickySubmit(!entry.isIntersecting),
        { threshold: 0.1 }
      );
      observer.observe(target);
      return () => observer.disconnect();
    };

    let cleanup = setupObserver();
    const onResizeChange = () => {
      if (cleanup) cleanup();
      cleanup = setupObserver();
    };
    mql.addEventListener?.("change", onResizeChange);
    window.addEventListener("resize", onResizeChange);

    return () => {
      if (cleanup) cleanup();
      mql.removeEventListener?.("change", onResizeChange);
      window.removeEventListener("resize", onResizeChange);
    };
  }, []);

  return (
    <section className="py-8">
      <div className="container custom-container mx-auto px-6">
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="grid lg:grid-cols-3 gap-8 bg-[#FAF9F8] p-4 2xl:p-8 rounded-[12px]">
            {/* LEFT */}
            <div className="lg:col-span-2 min-w-0 flex flex-col gap-8">
              <Link
                href="/booking"
                className="flex items-center gap-[7px] text-[#3A3D42] w-fit"
              >
                <ArrowLeft className="size-6" strokeWidth={1.8} />
                <span className="text-base tracking-[-0.3px]">Back</span>
              </Link>

              <div className="flex flex-col gap-4">
                <Input
                  label="Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                <Input
                  label="Phone number"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                />

                <RadioGroup
                  label="Please choose one or more of the options below"
                  name="ocRequest"
                  value={form.ocRequest}
                  onChange={handleChange}
                  options={OC_OPTIONS}
                />
              </div>

              <Notes value={form.notes} onChange={handleChange} />

              <AppointmentPicker value={slot} onSelect={setSlot} />
            </div>

            {/* RIGHT */}
            <div className="min-w-0 flex flex-col gap-4">
              <div className="booking-img order-2 lg:order-1 max-[1367px]:max-h-40 overflow-hidden rounded-[16px]">
                <Image
                  src="/images/booking.png"
                  width={370}
                  height={200}
                  alt="booking"
                  className="rounded-[16px] w-full"
                />
              </div>

              <div className="order-1 lg:order-2 bg-[#F4E7E1] p-4 rounded-[16px]">
                <div className="flex flex-col gap-6">
                  <p className="text-sm text-[#3A3D42] tracking-[-0.2px] leading-[22px]">
                    After you place your order one of our clinicians will get in
                    touch for a quick consultation. Next day delivery is
                    available on all consultations complete by 1pm.
                  </p>

                  <div ref={originalSubmitWrapRef}>
                    <SubmitButton submitting={submitting} />
                  </div>
                </div>

                {/* Mobile sticky submit */}
                <div
                  className={[
                    "lg:hidden fixed left-0 right-0 bottom-20 sm:bottom-5 z-50 p-3 px-[44px]",
                    "container custom-container mx-auto",
                    showStickySubmit ? "block" : "hidden",
                  ].join(" ")}
                >
                  <SubmitButton submitting={submitting} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

/* ---------- Reusable pieces ---------- */

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-[#3A3D42] tracking-[-0.2px]">{label}</label>
    <input
      {...props}
      required
      className="bg-white border border-[#EEE0CF] text-[#0D060C] placeholder:text-[#0D060C] text-sm tracking-[-0.2px] w-full px-5 py-3.5 rounded-[8px] outline-none focus:border-[#CE8936] transition"
    />
  </div>
);

const RadioGroup = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-5">
    <p className="text-sm text-[#3A3D42] tracking-[-0.2px]">{label}</p>
    <div className="flex flex-wrap content-center items-center gap-3">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-start gap-2 cursor-pointer max-w-[310px]"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            className="hidden peer"
          />
          <span className="shrink-0 size-6 rounded-full border border-[#CE8936] relative after:content-[''] after:size-4 after:bg-[#CE8936] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:hidden peer-checked:after:block" />
          <span className="text-xs leading-5 tracking-[-0.2px] text-[#3A3D42] peer-checked:text-[#0D060C]">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const Notes = ({ value, onChange }) => (
  <div className="flex flex-col gap-[11px]">
    <label className="text-sm font-medium text-[#0D060C] tracking-[-0.2px]">
      Notes (Optional)
    </label>
    <textarea
      name="notes"
      rows={3}
      value={value}
      onChange={onChange}
      placeholder="Please indicate which contraceptive medicine you are currently on"
      className="border border-[#D9D9D9] rounded-[8px] px-4 pt-[15px] pb-4 text-sm tracking-[-0.2px] text-[#0D060C] placeholder:text-[#3A3D42]/50 w-full outline-none focus:border-[#CE8936] transition resize-none"
    />
  </div>
);

const SubmitButton = ({ submitting }) => (
  <button
    type="submit"
    disabled={submitting}
    className="group w-full bg-theme text-white text-base font-medium py-3 px-[18px] rounded-full hover:bg-[#491F40] transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
  >
    <span className="flex items-center justify-center gap-1.5">
      {submitting ? "Confirming…" : "Confirm booking"}
      {!submitting && (
        <ArrowUpRight className="size-5 group-hover:rotate-45 transition duration-300" />
      )}
    </span>
  </button>
);

export default ConfirmOrder;
