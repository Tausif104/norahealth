"use client";

import { useState, useEffect, startTransition } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { registerFullAction } from "@/actions/user.action";
import DateField from "@/components/global/DateField";
import { toast } from "sonner";
import { format } from "date-fns";

const inputClass =
  "bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[16px] md:py-[18px] px-[16px] rounded-[6px] outline-none focus:ring-2 focus:ring-[#3A3D42]/40";

const RegisterForm = () => {
  const router = useRouter();

  const [dob, setDob] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Controlled so nothing is lost on a validation error (React 19 auto-resets
  // a <form action>, so we submit via onSubmit + a manual dispatch instead).
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    firstname: "",
    lastname: "",
    phone: "",
    nhs: "",
    address: "",
    zip: "",
    deliveryAddress: "",
    deliveryZip: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const initialState = { msg: "", success: false };
  const [state, action, loading] = useActionState(
    registerFullAction,
    initialState
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("email", form.email);
    fd.set("password", form.password);
    fd.set("confirm-password", form.confirm);
    fd.set("firstname", form.firstname);
    fd.set("lastname", form.lastname);
    fd.set("phone", form.phone);
    fd.set("dob", dob ? format(dob, "yyyy-MM-dd") : "");
    fd.set("nhs", form.nhs);
    fd.set("address", form.address);
    fd.set("zip", form.zip);
    fd.set("deliveryAddress", form.deliveryAddress);
    fd.set("deliveryZip", form.deliveryZip);
    startTransition(() => {
      action(fd);
    });
  };

  useEffect(() => {
    if (state.msg) {
      if (state.success) {
        toast.success(state.msg);
        router.push("/health");
      } else {
        toast.warning(state.msg);
      }
    }
    state.msg = "";
  }, [state.msg]);

  return (
    <form onSubmit={onSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {/* Email */}
        <div className='md:col-span-2'>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='email'>
            Email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email address'
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Password */}
        <div className='relative'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id='password'
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
            className={`${inputClass} pr-[48px]`}
          />
          <span
            className='absolute right-4 bottom-4 md:bottom-[18px] text-[#3A3D42] cursor-pointer'
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className='relative'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='Cpassword'
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id='Cpassword'
            name='confirm'
            placeholder='Confirm Password'
            value={form.confirm}
            onChange={handleChange}
            className={`${inputClass} pr-[48px]`}
          />
          <span
            className='absolute right-4 bottom-4 md:bottom-[18px] text-[#3A3D42] cursor-pointer'
            onClick={() => setShowConfirmPassword((v) => !v)}
          >
            {showConfirmPassword ? <Eye /> : <EyeOff />}
          </span>
        </div>

        {/* First name */}
        <div>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='firstName'
          >
            First name
          </label>
          <input
            type='text'
            id='firstName'
            name='firstname'
            placeholder='First name'
            value={form.firstname}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Last name */}
        <div>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='lastName'
          >
            Last name
          </label>
          <input
            type='text'
            id='lastName'
            name='lastname'
            placeholder='Last name'
            value={form.lastname}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='phone'>
            Phone Number
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            placeholder='Phone Number'
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Date of Birth */}
        <DateField
          id='dob'
          label='Date of Birth'
          selected={dob}
          onChange={setDob}
          name='dob'
          placeholder='Select date of birth'
          bg='bg-[#F6F5F4] border-0'
        />

        {/* Address */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='address'
          >
            Address
          </label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='Address'
            value={form.address}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Post code */}
        <div>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='zip'>
            Post code
          </label>
          <input
            type='text'
            id='zip'
            name='zip'
            placeholder='Post code'
            value={form.zip}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* NHS (Optional) */}
        <div>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='nhs'>
            NHS Number (Optional)
          </label>
          <input
            type='text'
            id='nhs'
            name='nhs'
            placeholder='10 Digits NHS Number'
            value={form.nhs}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Delivery Address */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='deliveryAddress'
          >
            Delivery Address
          </label>
          <input
            type='text'
            id='deliveryAddress'
            name='deliveryAddress'
            placeholder='Delivery Address'
            value={form.deliveryAddress}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Delivery Post code */}
        <div>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='deliveryZip'
          >
            Delivery Post code
          </label>
          <input
            type='text'
            id='deliveryZip'
            name='deliveryZip'
            placeholder='Delivery Post code'
            value={form.deliveryZip}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type='submit'
        className='mt-8 text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full cursor-pointer'
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
            <span>Register</span>
          )}
        </span>
      </button>
    </form>
  );
};

export default RegisterForm;
