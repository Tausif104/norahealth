import ChoiceRadio from "@/components/global/choice-radio";
import OutlineBtn from "@/components/global/outline-btn";
import PrimaryBtn from "@/components/global/primary-btn";
import { sexualHealth } from "@/data/contraception";
import { ArrowRight } from "lucide-react";

const StepTwoForm = ({ action }) => {
  return (
    <>
      <form action={action}>
        <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
          {sexualHealth.map((item) => (
            <ChoiceRadio key={item.id} item={item} name='sexual-health' />
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
          <PrimaryBtn url='/booking' label='Book a Free Call' />
        </div>
      </form>
    </>
  );
};

export default StepTwoForm;
