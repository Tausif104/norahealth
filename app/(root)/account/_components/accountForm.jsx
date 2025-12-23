"use client";
import { useState, useEffect } from "react";
import DateField from "@/components/global/DateField";
import { useActionState } from "react";
import { createAccountAction } from "@/actions/account.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";

const AccountForm = ({ user }) => {
  const router = useRouter();

  const [dob, setDob] = useState(null);

  const initialState = {
    msg: "",
    success: false,
  };

  const [state, action, loading] = useActionState(
    createAccountAction,
    initialState
  );

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
    <form action={action}>
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
            name='firstname'
            type='text'
            id='firstName'
            placeholder='First name'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
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
            name='lastname'
            id='lastName'
            placeholder='Last name'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
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
            name='phone'
            id='phone'
            placeholder='Phone Number'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
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
            name='secondemail'
            type='email'
            id='email'
            defaultValue={user?.email}
            placeholder='Email address'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        <input type='hidden' name='dob' value={dob ? dob : ""} />
        <DateField
          id='dob'
          label='Date of Birth'
          selected={dob}
          onChange={setDob}
          name='dob'
          placeholder='27 October 2025'
          className='md:col-span-2'
          bg='bg-[#F6F5F4] border-0'
        />

        {/* NHS Number */}
        <div className='md:col-span-2'>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='nhs'>
            NHS Number (Optional)
          </label>
          <input
            type='text'
            name='nhs'
            id='nhs'
            placeholder='10 Digits NHS Number'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
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
            name='address'
            id='address'
            placeholder='Address'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* Zip code → 25% */}
        <div className='md:col-span-1'>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='zip'>
            Post code
          </label>
          <input
            type='text'
            name='zip'
            id='zip'
            placeholder='Post code'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-8'>
        {/* Submit button full row */}
        <div className='md:col-span-4'>
          <button
            type='submit'
            className=' text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full cursor-pointer '
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
                <span>Create Account</span>
              )}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
