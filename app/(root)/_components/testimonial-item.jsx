import Image from 'next/image'

const TestimonialItem = ({ testimonial }) => {
  const { body, img, name, age, rating } = testimonial

  return (
    <>
      <div className='flex md:flex-row flex-col items-center bg-[#F7F2E7] rounded-[20px] overflow-hidden'>
        <div className='w-full'>
          <Image
            width={600}
            height={500}
            alt={body}
            src={img}
            className='xl:min-w-[600px] lg:min-w-[400px] min-w-[300px] md:w-auto w-full'
          />
        </div>
        <div className='lg:p-[50px] p-[16px] md:p-[20px]'>
          <div>
            <ul className='flex gap-1'>
              {Array.from({ length: rating }).map((_, index) => (
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
            <h3 className='text-heading xl:text-[36px] lg:text-[25px] text-[20px] leading-[1.4] mt-[20px]'>
              {body}
            </h3>
            <div className='mt-[40px]'>
              <h4 className='text-[18px] font-semibold'>{name}</h4>
              <p className='text-[16px]'>Age: {age}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TestimonialItem
