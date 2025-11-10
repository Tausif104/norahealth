'use client'

import PageBanner from '@/components/global/page-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import { useActionState, useEffect } from 'react'
import { contraceptionStepFive } from '@/actions/contraception.action'
import SkeletonLoading from '../_components/loading-skeleton'
import StepFiveForm from './_components/step-five-form'
import { toast } from 'sonner'
import StepsCount from '../_components/steps'

const StepFour = () => {
  const initialState = {
    msg: '',
  }

  const [state, action, loading] = useActionState(
    contraceptionStepFive,
    initialState
  )

  useEffect(() => {
    if (state.msg) {
      toast.warning(state.msg)
      state.msg = ''
    }
  }, [state.msg])

  return (
    <>
      <PageBanner title='My Contraceptive' />
      <div className='md:my-[130px] my-[60px]'>
        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <StepsCount step={5} />
          <div className='flex items-center justify-between lg:flex-row flex-col lg:gap-0 gap-3'>
            <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] lg:text-left text-center'>
              Are any of these an absolute no for you? Ticking all of these may
              mean your results are not very helpful
            </h3>
            <PrimaryBtn url='/' label='Book a Free Call' />
          </div>

          <div className='mt-[50px]'>
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
  )
}

export default StepFour
