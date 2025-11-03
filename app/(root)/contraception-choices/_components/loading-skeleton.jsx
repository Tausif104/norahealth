import { Skeleton } from '@/components/ui/skeleton'

const SkeletonLoading = ({ items }) => {
  return (
    <>
      <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
        {Array.from({ length: items }).map((_, index) => (
          <Skeleton key={index} className='w-full h-[120px] bg-gray-100' />
        ))}
      </div>
      <div className='flex justify-center items-center gap-[20px] md:mt-[50px] mt-[30px]'>
        <Skeleton className='w-[140px] h-[56px] rounded-full' />
        <Skeleton className='w-[190px] h-[56px] rounded-full' />
      </div>
    </>
  )
}

export default SkeletonLoading
