import PrimaryBtn from '@/components/global/primary-btn'

const BeginSteps = () => {
  return (
    <>
      <div className='md:my-[130px] my-[60px]'>
        <div className='container custom-container mx-auto  md:mb-[50px] mb-[20px] sm:px-0 px-[24px]'>
          <h2 className='text-heading md:text-[36px] text-[18px] font-semibold leading-[1.2] text-center mb-5 '>
            This tool is designed to help you learn about your contraception
            choices but it doesn't replace medical advice.
          </h2>

          <p className='text-heading md:text-[36px] text-[18px] font-semibold leading-[1.2] text-center'>
            Always book an appointment with us before beginning any new
            contraception.
          </p>
        </div>

        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <div className=' text-center'>
            <PrimaryBtn label='Begin' url='/contraception-choices/step-1' />
          </div>
        </div>
      </div>
    </>
  )
}

export default BeginSteps
