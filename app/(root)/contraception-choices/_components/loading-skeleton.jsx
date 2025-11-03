import { Skeleton } from '@/components/ui/skeleton'

const SkeletonLoading = ({ items }) => {
  return (
    <>
      <div className='grid grid-cols-2 md:gap-[30px] gap-[15px]'>
        {Array.from({ length: items }).map((_, index) => (
          <Skeleton key={index} className='w-full h-[120px] bg-gray-100' />
        ))}
      </div>
    </>
  )
}

export default SkeletonLoading
