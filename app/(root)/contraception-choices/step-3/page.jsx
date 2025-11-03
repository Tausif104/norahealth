import PageBanner from '@/components/global/page-banner'

const StepThree = async ({ searchParams }) => {
  const { sexstatus } = await searchParams

  return (
    <>
      <PageBanner title='Step Three' />
      <p>{sexstatus}</p>
    </>
  )
}

export default StepThree
