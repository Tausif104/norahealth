import { ArrowRight } from 'lucide-react'

const GetInTouch = () => {
  return (
    <div className='shadow-theme md:py-[32px] py-[20px] md:px-[40px] px-[20px] rounded-[16px]'>
      <h2 className='text-heading font-semibold md:text-[32px] text-[20px] md:mb-[30px] mb-[20px]'>
        Get In Touch
      </h2>
      <form>
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
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full md:py-[18px] md:px-[24px] p-3 rounded-[6px] md:h-[145px] h-[100px]'
          ></textarea>
        </div>

        <button className='text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full cursor-pointer'>
          <span className='flex items-center justify-center'>
            <span>Send Message</span>
            <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
              <ArrowRight />
            </span>
          </span>
        </button>
      </form>
    </div>
  )
}

export default GetInTouch
