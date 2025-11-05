import ChoiceCheckBox from '@/components/global/choice-check'
import OutlineBtn from '@/components/global/outline-btn'
import { myHealth } from '@/data/contraception'
import { ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const StepThreeForm = ({ action }) => {
  const searchParams = useSearchParams()
  const sexhealth = searchParams.get('sexhealth')

  return (
    <>
      <form action={action}>
        <input type='hidden' value={sexhealth} name='sex-health' />
        <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
          {myHealth.map((item) => (
            <ChoiceCheckBox key={item.id} item={item} name='my-health' />
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
        </div>
      </form>
    </>
  )
}

export default StepThreeForm
