"use client";

import { ArrowRight, LoaderIcon } from "lucide-react";
import { resendEmailAction } from "@/actions/resend.action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const GetInTouch = () => {
  const initialState = {
    msg: "",
    success: false,
  };

  const [state, action, loading] = useActionState(
    resendEmailAction,
    initialState
  );

  console.log(state);

  useEffect(() => {
    if (!state?.msg) return;

    if (state.success) {
      toast.success(state.msg);
    } else {
      toast.warning(state.msg);
    }
    // state.msg = "";
  }, [state.msg]);

  return (
    <div className='shadow-theme md:py-[32px] py-[20px] md:px-[40px] px-[20px] rounded-[16px]'>
      <h2 className='text-heading font-semibold md:text-[32px] text-[20px] md:mb-[30px] mb-[20px]'>
        Get In Touch
      </h2>
      <form action={action}>
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='text-heading text-[16px] w-full mb-[8px] inline-block'
          >
            Enter your full name
          </label>
          <input
            type='text'
            placeholder='You name'
            id='name'
            name='name'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full md:py-[18px] md:px-[24px] p-3 rounded-[6px]'
          />
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5 mb-5'>
          <div>
            <label
              htmlFor='email'
              className='text-heading text-[16px] w-full mb-[8px] inline-block'
            >
              Email address
            </label>
            <input
              type='email'
              placeholder='You email address'
              id='email'
              name='email'
              className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full md:py-[18px] md:px-[24px] p-3 rounded-[6px]'
            />
          </div>
          <div>
            <label
              htmlFor='phone'
              className='text-heading text-[16px] w-full mb-[8px] inline-block'
            >
              Phone number
            </label>
            <input
              type='tel'
              placeholder='You phone number'
              id='phone'
              name='phone'
              className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full md:py-[18px] md:px-[24px] p-3 rounded-[6px]'
            />
          </div>
        </div>
        <div className='mb-5'>
          <label
            htmlFor='message'
            className='text-heading text-[16px] w-full mb-[8px] inline-block'
          >
            Message
          </label>
          <textarea
            placeholder='Lave us a message...'
            id='message'
            name='message'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full md:py-[18px] md:px-[24px] p-3 rounded-[6px] md:h-[145px] h-[100px]'
          ></textarea>
        </div>

        <button
          type='submit'
          className=' text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 sm:min-w-[200px] min-w-full cursor-pointer '
          disabled={loading}
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
              <span>Submit</span>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default GetInTouch;
