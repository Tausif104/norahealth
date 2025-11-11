'use client'

import PageBanner from '@/components/global/page-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import { useActionState, useEffect } from 'react'
import { contraceptionStepThree } from '@/actions/contraception.action'
import SkeletonLoading from '../_components/loading-skeleton'
import StepThreeForm from './_components/step-three-form'
import { toast } from 'sonner'
import StepsCount from '../_components/steps'

const StepThree = () => {
  const initialState = {
    msg: '',
  }

  const [state, action, loading] = useActionState(
    contraceptionStepThree,
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
      {/* <PageBanner title='My Health' /> */}
      <div className='md:my-[130px] my-[60px]'>
        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <StepsCount step={3} />
          <div className='flex items-center justify-between lg:flex-row flex-col lg:gap-0 gap-3'>
            <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] lg:text-left text-center'>
              Select all that apply to you
            </h3>
            <PrimaryBtn url='/' label='Book a Free Call' />
          </div>

          <div className='mt-[50px]'>
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
  )
}

export default StepThree
