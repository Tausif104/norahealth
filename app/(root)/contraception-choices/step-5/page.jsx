"use client";

import PageBanner from "@/components/global/page-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import { useActionState, useEffect } from "react";
import { contraceptionStepFive } from "@/actions/contraception.action";
import SkeletonLoading from "../_components/loading-skeleton";
import StepFiveForm from "./_components/step-five-form";
import { toast } from "sonner";
import StepsCount from "../_components/steps";

const StepFour = () => {
  const initialState = {
    msg: "",
  };

  const [state, action, loading] = useActionState(
    contraceptionStepFive,
    initialState
  );

  useEffect(() => {
    if (state.msg) {
      toast.warning(state.msg);
      state.msg = "";
    }
  }, [state.msg]);

  return (
    <>
      {/* <PageBanner title='My Contraceptive' /> */}
      <div className='md:my-[130px] my-[30px]'>
        <div className='container custom-container mx-auto  md:mb-[30px] mb-[20px] sm:px-0 px-[24px]'>
          <div className='mb-5 md:mb-10'>
            <StepsCount step={5} />
          </div>
          <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] text-center'>
            Are any of these an absolute no for you? Ticking all of these may
            mean your results are not very helpful
          </h3>

          <div className='mt-[30px]'>
            {/* contraception options */}
            {loading ? (
              <SkeletonLoading items={9} />
            ) : (
              <StepFiveForm action={action} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepFour;
