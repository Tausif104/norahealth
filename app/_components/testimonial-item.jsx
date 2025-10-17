import Image from 'next/image'

const TestimonialItem = ({ testimonial }) => {
  const { body, img, name, age, rating } = testimonial

  return (
    <>
      <div className='flex items-center bg-[#F7F2E7] rounded-[20px] overflow-hidden'>
        <div>
          <Image
            width={600}
            height={500}
            alt={body}
            src={img}
            className='min-w-[600px]'
          />
        </div>
        <div className='p-[50px]'>
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
            <h3 className='text-heading text-[36px] leading-[1.4] mt-[20px]'>
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
