import OutlineBtn from '@/components/global/outline-btn'
import PageBanner from '@/components/global/page-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import { sexualStatus } from '@/data/contraception'
import { ArrowRight } from 'lucide-react'
import { contraceptionStepTwo } from '@/actions/contraception.action'
import ChoiceCheckBox from '@/components/global/choice-check'

const StepTwo = async ({ searchParams }) => {
  const { reason } = await searchParams

  return (
    <>
      <PageBanner title='Contraception Choices' />
      <div className='md:my-[130px] my-[60px]'>
        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <div className='flex items-center justify-between lg:flex-row flex-col lg:gap-0 gap-3'>
            <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] lg:text-left text-center'>
              Are you sexually active at the
              <br className='md:block hidden' /> moment?
            </h3>
            <PrimaryBtn url='/' label='Book a Free Call' />
          </div>

          <div className='mt-[50px]'>
            {/* contraception options */}
            <form action={contraceptionStepTwo}>
              <input type='hidden' name='reason' value={reason} />
              <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
                {sexualStatus.map((item) => (
                  <ChoiceCheckBox
                    key={item.id}
                    item={item}
                    name='sexual-status'
                  />
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
                <OutlineBtn
                  url='/contraception-choices/step-1'
                  label='Start Again'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default StepTwo
