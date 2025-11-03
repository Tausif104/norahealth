import { Skeleton } from '@/components/ui/skeleton'

const SkeletonLoading = () => {
  return (
    <>
      <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
        <Skeleton className='w-full h-[120px] bg-gray-100' />
        <Skeleton className='w-full h-[120px] bg-gray-100' />
        <Skeleton className='w-full h-[120px] bg-gray-100' />
        <Skeleton className='w-full h-[120px] bg-gray-100' />
      </div>
    </>
  )
}

export default SkeletonLoading
