import PageBanner from '@/components/global/page-banner'
import {
  coc,
  pop,
  condoms,
  rings,
  implantInjection,
} from '@/data/contraception-strings'

const OutComesPage = async ({ searchParams }) => {
  const { contraceptive, myhealthtwo, myhealth, sexhealth } = await searchParams

  const sexhealthArray = sexhealth.split(',')
  const myhealthArray = myhealth.split(',')
  const myhealthtwoArray = myhealthtwo.split(',')
  const contraceptiveArray = contraceptive.split(',')

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
      <PageBanner title='Contraception Choices' />
      <div className='container custom-container mx-auto'>
        <h1 className='font-bold text-5xl'>Outcomes</h1>
        <ul>
          <li className={excludeCoc ? 'hidden' : 'flex'}>
            Combined oral contraceptives (COC)
          </li>
          <li className={excludePop ? 'hidden' : 'flex'}>
            Progesterone only contraceptives (POP)
          </li>
          <li className={excludeCondom ? 'hidden' : 'flex'}>Condoms</li>
          <li className={excludeImplantInjection ? 'hidden' : 'flex'}>
            Implants & injections
          </li>
          <li className={excludeRings ? 'hidden' : 'flex'}>Rings</li>
          <li>Copper IUD</li>
        </ul>

        {myhealthtwo.includes('Current or recent breast cancer') && (
          <p>
            You have indicated that you have breast cancer and therefore we
            strongly recommend you to book a consultation with us before
            proceeding
          </p>
        )}
      </div>
    </>
  )
}

export default OutComesPage
