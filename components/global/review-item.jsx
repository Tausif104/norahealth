import Image from 'next/image'

const ReviewItem = ({ item }) => {
  return (
    <div className='theme-shadow'>
      <ul className='flex items-center gap-1 mb-3'>
        {Array.from({ length: item.rating }).map((_, index) => (
          <li key={index}>
            <Image
              src='/images/star.svg'
              width={24}
              height={24}
              alt={`Star ${index}`}
            />
          </li>
        ))}
      </ul>

      <p className='text-[#0D060C] text-[20px]'>{item.body}</p>

      <div className='mt-[30px]'>
        <h4 className='text-[18px] font-semibold'>{item.name}</h4>
        <p className='text-[16px]'>Age: {item.age}</p>
      </div>
    </div>
  )
}

export default ReviewItem
