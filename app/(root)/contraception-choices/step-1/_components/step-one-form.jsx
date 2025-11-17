import ChoiceCheckBox from '@/components/global/choice-check'
import OutlineBtn from '@/components/global/outline-btn'
import PrimaryBtn from '@/components/global/primary-btn'
import { help } from '@/data/contraception'
import { ArrowRight } from 'lucide-react'

const StepOneForm = ({ action }) => {
  return (
    <>
      {/* contraception options */}
      <form action={action}>
        <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
          {help.map((item) => (
            <ChoiceCheckBox key={item.id} item={item} name='reason' />
          ))}
        </div>
        <div className='flex items-center sm:flex-row flex-col gap-[20px] justify-center md:mt-[50px] mt-[30px]'>
          <button
            type='submit'
            className='text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 sm:w-auto w-full cursor-pointer'
          >
            <span className='flex items-center justify-center'>
              <span>Next</span>
              <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                <ArrowRight />
              </span>
            </span>
          </button>
          <OutlineBtn url='/contraception-choices/step-1' label='Start Again' />
          <PrimaryBtn url='/' label='Book a Call' />
        </div>
      </form>
    </>
  )
}

export default StepOneForm
