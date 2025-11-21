import {
  coc,
  pop,
  condoms,
  rings,
  implantInjection,
} from '@/data/contraception-strings'
import Tool from './_components/tool'

const OutComesPage = async ({ searchParams }) => {
  const { contraceptive, myhealthtwo, myhealth, sexhealth } = await searchParams

  const sexhealthArray = sexhealth?.split(',')
  const myhealthArray = myhealth?.split(',')
  const myhealthtwoArray = myhealthtwo?.split(',')
  const contraceptiveArray = contraceptive?.split(',')

  const combinedArray = [
    ...sexhealthArray,
    ...myhealthArray,
    ...myhealthtwoArray,
    ...contraceptiveArray,
  ]

  const excludeCondom = combinedArray.some((item) => condoms.includes(item))
  const excludeCoc = combinedArray.some((item) => coc.includes(item))
  const excludePop = combinedArray.some((item) => pop.includes(item))
  const excludeRings = combinedArray.some((item) => rings.includes(item))
  const excludeImplantInjection = combinedArray.some((item) =>
    implantInjection.includes(item)
  )

  return (
    <>
      {/* <PageBanner title='Contraception Choices' /> */}

      <div className='bg-[#FFF2EE] md:py-[130px] py-[80px]'>
        <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
          <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 justify-center'>
            <Tool
              img='/images/tools/copper-iud.png'
              name='Copper IUD'
              url='/'
            />
            <div className={excludeCondom ? 'hidden' : 'block'}>
              <Tool
                img='/images/tools/condoms.png'
                name='Condoms'
                url='/contraception-choices/outcomes/condoms'
              />
            </div>
            <div className={excludeRings ? 'hidden' : 'block'}>
              <Tool img='/images/tools/rings.png' name='Rings' url='/' />
            </div>
            <div className={excludeCoc ? 'hidden' : 'block'}>
              <Tool
                img='/images/tools/oral.png'
                name='Combined oral contraceptives'
                url='/'
              />
            </div>
            <div className={excludePop ? 'hidden' : 'block'}>
              <Tool
                img='/images/tools/only.png'
                name='Progesterone only contraceptives'
                url='/'
              />
            </div>
            <div className={excludeImplantInjection ? 'hidden' : 'block'}>
              <Tool img='/images/tools/implants.png' name='Implants' url='/' />
            </div>
            <div className={excludeImplantInjection ? 'hidden' : 'block'}>
              <Tool
                img='/images/tools/injection.png'
                name='Injections'
                url='/'
              />
            </div>
          </div>

          {myhealthtwo.includes('Current or recent breast cancer') && (
            <div className='text-center border border-[#D6866B] bg-[#FFF8EF] p-5 rounded-2xl mt-20'>
              <p className='font-semibold'>
                You have indicated that you have breast cancer and therefore we
                strongly recommend you to book a consultation with us before
                proceeding
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default OutComesPage
