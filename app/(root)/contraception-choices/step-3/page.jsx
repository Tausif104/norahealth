"use client";

import PageBanner from "@/components/global/page-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import { useActionState, useEffect } from "react";
import { contraceptionStepThree } from "@/actions/contraception.action";
import SkeletonLoading from "../_components/loading-skeleton";
import StepThreeForm from "./_components/step-three-form";
import { toast } from "sonner";
import StepsCount from "../_components/steps";

const StepThree = () => {
  const initialState = {
    msg: "",
  };

  const [state, action, loading] = useActionState(
    contraceptionStepThree,
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
      {/* <PageBanner title='My Health' /> */}
      <div className='md:my-[130px] my-[30px]'>
        <div className='container custom-container mx-auto  md:mb-[30px] mb-[20px] sm:px-0 px-[24px]'>
          <div className='mb-5 md:mb-10'>
            <StepsCount step={3} />
          </div>
          <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] text-center'>
            Select all that apply to you
          </h3>

          <div className='mt-[30px]'>
            {/* contraception options */}
            {loading ? (
              <SkeletonLoading items={4} />
            ) : (
              <StepThreeForm action={action} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThree;
