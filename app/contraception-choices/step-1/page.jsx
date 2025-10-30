import ChoiceRadio from '@/components/global/choice-radio'
import OutlineBtn from '@/components/global/outline-btn'
import PageBanner from '@/components/global/page-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import { reasons } from '@/data/contraception'
import { ArrowRight } from 'lucide-react'

const ContraceptaionPage = async () => {
  return (
    <>
      <PageBanner title='Find Your Best Contraception Match' />
      <div className='md:my-[130px] my-[60px]'>
        <div className='container custom-container mx-auto  md:mb-[80px] mb-[60px] sm:px-0 px-[24px]'>
          <h2 className='text-heading md:text-[36px] text-[20px] font-semibold leading-[1.2] text-center'>
            This tool is designed to help you learn about your contraception
            choices but it doesn't replace medical advice. Always book an
            appointment with us before beginning any new contraception.
          </h2>
        </div>

        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <div className='flex items-center justify-between lg:flex-row flex-col lg:gap-0 gap-3'>
            <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] lg:text-left text-center'>
              Which of these best describes the{' '}
              <br className='md:block hidden' /> main reason you want
              contraception?
            </h3>
            <PrimaryBtn url='/' label='Book a Free Call' />
          </div>

          <div className='mt-[50px]'>
            {/* contraception options */}
            <form>
              <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
                {reasons.map((reason) => (
                  <ChoiceRadio key={reason.id} reason={reason} name='reason' />
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

export default ContraceptaionPage
