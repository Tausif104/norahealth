import ChoiceCheckBox from "@/components/global/choice-check";
import OutlineBtn from "@/components/global/outline-btn";
import PrimaryBtn from "@/components/global/primary-btn";
import { contraceptive } from "@/data/contraception";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const StepFiveForm = ({ action }) => {
  const searchParams = useSearchParams();
  const sexhealth = searchParams.get("sexhealth");
  const myhealth = searchParams.get("myhealth");
  const myhealthtwo = searchParams.get("myhealthtwo");

  const [selected, setSelected] = useState([]);
  const [noneSelected, setNoneSelected] = useState(false);

  const handleChoiceChange = (value) => {
    setNoneSelected(false);
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleNoneChange = () => {
    setNoneSelected(!noneSelected);
    if (!noneSelected) setSelected([]);
  };

  return (
    <>
      <form action={action}>
        <input type='hidden' value={sexhealth} name='sex-health' />
        <input type='hidden' value={myhealth} name='my-health' />
        <input type='hidden' value={myhealthtwo} name='my-health-two' />
        <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
          <div>
            <input
              id='none'
              type='checkbox'
              className='peer hidden'
              value='None'
              name='contraceptive'
              checked={noneSelected}
              onChange={handleNoneChange}
            />
            <label
              htmlFor='none'
              className='peer-checked:text-white peer-checked:bg-[#D6866B] hover:bg-[#D6866B] hover:text-white transition duration-100 lg:text-[24px] md:text-[20px] font-semibold text-[#D6866B] bg-[#FFF2EE] w-full flex items-center text-center justify-center md:px-[24px] px-[15px] cursor-pointer rounded-[8px] md:min-h-[120px] min-h-[150px]'
            >
              None of these apply
            </label>
          </div>
          {contraceptive.map((item) => (
            <div key={item.id}>
              <input
                name='contraceptive'
                type='checkbox'
                id={item.id}
                className='peer hidden'
                value={item.value}
                checked={selected.includes(item.value)}
                onChange={() => handleChoiceChange(item.value)}
              />
              <label
                htmlFor={item.id}
                className='peer-checked:text-white peer-checked:bg-[#D6866B] hover:bg-[#D6866B] hover:text-white transition duration-100 lg:text-[24px] md:text-[20px] font-semibold text-[#D6866B] bg-[#FFF2EE] w-full flex items-center text-center justify-center md:px-[24px] px-[15px] cursor-pointer rounded-[8px] md:min-h-[120px] min-h-[150px]'
              >
                {item.value}
              </label>
            </div>
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
          <PrimaryBtn label='Book a free call' url='/booking' />
        </div>
      </form>
    </>
  );
};

export default StepFiveForm;
