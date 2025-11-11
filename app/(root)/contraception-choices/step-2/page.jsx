'use client'

import { useActionState, useEffect } from 'react'
import PageBanner from '@/components/global/page-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import { contraceptionStepTwo } from '@/actions/contraception.action'
import StepTwoForm from './_components/step-two-form'
import SkeletonLoading from '../_components/loading-skeleton'
import { toast } from 'sonner'
import StepsCount from '../_components/steps'

const StepTwo = () => {
  const initialState = {
    msg: '',
  }

  const [state, action, loading] = useActionState(
    contraceptionStepTwo,
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
      {/* <PageBanner title='Sexual Health' /> */}
      <div className='md:my-[130px] my-[60px]'>
        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <StepsCount step={2} />

          <div className='flex items-center justify-between lg:flex-row flex-col lg:gap-0 gap-3'>
            <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] lg:text-left text-center'>
              Are you currently sexually active
            </h3>
            <PrimaryBtn url='/' label='Book a Free Call' />
          </div>

          <div className='mt-[50px]'>
            {/* contraception options */}
            {loading ? (
              <SkeletonLoading items={2} />
            ) : (
              <StepTwoForm action={action} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default StepTwo
