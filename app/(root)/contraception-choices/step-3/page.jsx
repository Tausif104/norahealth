import PageBanner from '@/components/global/page-banner'

const StepThree = async ({ searchParams }) => {
  const { sexhealth } = await searchParams

  return (
    <>
      <PageBanner title='Step Three' />
      <p>{sexhealth}</p>
    </>
  )
}

export default StepThree
