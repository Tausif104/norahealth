import { getUserAccount } from '@/actions/account.action'
import { redirect } from 'next/navigation'
import HealthForm from './_components/healthForm'
import Link from 'next/link'

const HealthPage = async () => {
  const account = await getUserAccount()

  if (!account?.account) {
    redirect('/account')
  }
  return (
    <>
      <section className='section-padding'>
        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <div className='p-4 md:p-[40px] shadow-[0_10px_80px_0_rgba(30,96,221,0.1)] rounded-[12px] max-w-[900px] mx-auto space-y-[30px]'>
            <h2 className='text-center text-[#1F2122] text-[24px] md:text-[32px] font-semibold'>
              Health Information
            </h2>

            {/* Health Details title + line */}
            <div className='flex items-center gap-3'>
              <p className='text-[#1F2122] text-[18px] md:text-[20px] font-semibold'>
                Helath Details
              </p>
              <span className='h-[1px] bg-[#F9E4CA] flex-1' />
            </div>

            <HealthForm />

            <p className='text-center text-[#1D2D44] text-base'>
              This information is not required to create an account. You can{' '}
              <Link href='/profile' className='text-[#d67b0e] underline'>
                Skip
              </Link>{' '}
              for now and update it later.
              <br />
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HealthPage
