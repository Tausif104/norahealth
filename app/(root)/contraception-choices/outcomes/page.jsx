import PageBanner from '@/components/global/page-banner'

const OutComesPage = async ({ searchParams }) => {
  const { contraceptive, myhealthtwo, myhealth, sexhealth } = await searchParams

  return (
    <>
      <PageBanner title='Contraception Choices' />
      <div className='container custom-container mx-auto'>
        <h1>Outcomes</h1>
        <ul>
          <li>Sex health: {sexhealth}</li>
          <li>My health: {myhealth}</li>
          <li>My Health Two:{myhealthtwo}</li>
          <li>Contraceptive: {contraceptive}</li>
        </ul>
      </div>
    </>
  )
}

export default OutComesPage
