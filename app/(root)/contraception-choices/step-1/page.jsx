'use client'

import { useActionState } from 'react'
import PageBanner from '@/components/global/page-banner'
import PrimaryBtn from '@/components/global/primary-btn'
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
      <PageBanner title='How Can We Help? ' />
      <div className='md:my-[130px] my-[60px]'>
        <div className='container custom-container mx-auto  md:mb-[80px] mb-[60px] sm:px-0 px-[24px]'>
          <StepsCount step={1} />

          <h2 className='text-heading md:text-[36px] text-[20px] font-semibold leading-[1.2] text-center'>
            This tool is designed to help you learn about your contraception
            choices but it doesn't replace medical advice. Always book an
            appointment with us before beginning any new contraception.
          </h2>
        </div>

        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <div className='flex items-center justify-between lg:flex-row flex-col lg:gap-0 gap-3'>
            <h3 className='font-semibold lg:text-[32px] text-[20px] leading-[1.2] lg:text-left text-center'>
              I am looking to
            </h3>
            <PrimaryBtn url='/' label='Book a Free Call' />
          </div>

          <div className='mt-[50px]'>
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
