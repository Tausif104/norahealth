'use client'

import { useActionState } from 'react'
import { contraceptionStepOne } from '@/actions/contraception.action'
import StepOneForm from './_components/step-one-form'
import SkeletonLoading from '../_components/loading-skeleton'
import StepsCount from '../_components/steps'

const ContraceptaionPage = () => {
  const initialState = {
    data: '',
  }

  const [state, action, loading] = useActionState(
    contraceptionStepOne,
    initialState
  )

  return (
    <>
      {/* <PageBanner title='How Can We Help? ' /> */}
      <div className='md:my-[130px] my-[30px]'>
        <div className='container custom-container mx-auto  md:mb-[30px] mb-[20px] sm:px-0 px-[24px]'>
          <div className='mb-5 md:mb-10'>
            <StepsCount step={1} />
          </div>
          <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] text-center'>
            I am looking to
          </h3>
          <div className='mt-[30px]'>
            {loading ? (
              <SkeletonLoading items={4} />
            ) : (
              <StepOneForm action={action} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ContraceptaionPage
