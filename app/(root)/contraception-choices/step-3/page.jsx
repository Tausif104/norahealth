import PageBanner from '@/components/global/page-banner'

const StepThree = async ({ searchParams }) => {
  const { reason, sexstatus } = await searchParams

  return (
    <>
      <PageBanner title='Step Three' />
      <p>{reason}</p>
      <p>{sexstatus}</p>
    </>
  )
}

export default StepThree
