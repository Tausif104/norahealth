import OutlineBtn from '@/components/global/outline-btn'
import Image from 'next/image'

const WhyChooseNora = () => {
  const data = [
    {
      id: 1,
      img: '/images/why-choose-us/1.svg',
      title: 'Privacy',
      description:
        'Discreet assessments and packaging for complete confidentiality',
    },
    {
      id: 2,
      img: '/images/why-choose-us/2.svg',
      title: 'Convenience',
      description: 'Within 24 hours (Monday-Friday) during working hours',
    },
    {
      id: 3,
      img: '/images/why-choose-us/3.svg',
      title: 'Safety',
      description: 'Reviewed by qualified UK clinicians before approval',
    },
  ]

  return (
    <section className='relative py-[60px] md:py-0  z-10 after:absolute after:content-[""] after:w-[50%] after:h-full md:after:bg-[url("/images/why-choose.svg")] after:bg-fixed after:top-0 after:left-[50%] after:-z-10 after:bg-cover after:bg-center'>
      <div className='container custom-container mx-auto'>
        <div className='grid md:grid-cols-12 grid-cols-1'>
          <div className='col-span-6 md:py-[190px] md:pr-10 sm:px-0 px-[24px]'>
            <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl font-semibold leading-[1.2]'>
              Why Choose Nora Health
            </h2>
            <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg py-6'>
              We combine medical safety with real convenience. Our contraception
              service is designed to fit around your life — not the other way
              around. Whether you value privacy, speed, or professional support,
              we ensure you get the care you need without the hassle of
              traditional appointments.
            </p>
            <OutlineBtn label='Order Now' url='/' />
          </div>
          <div className='col-span-6  flex items-center md:mt-0 mt-[60px]'>
            <div className='md:pl-[80px] flex flex-col md:gap-5 gap-4 md:bg-none bg-[url("/images/why-choose.svg")] sm:px-0 px-[24px] md:py-0 py-[60px] w-full'>
              {data.map((item) => (
                <div
                  key={item.id}
                  className='bg-white flex md:items-center  items-start md:flex-row flex-col rounded-[16px] py-[24px] px-[30px] md:gap-5 gap-2'
                >
                  <div>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={80}
                      height={80}
                      className='lg:min-w-[80px] lg:w-[80px] min-w-[40px] w-[40px]'
                    />
                  </div>
                  <div>
                    <h3 className='lg:text-[32px] text-[22px]  font-semibold text-heading mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-pg xl:text-[20px] lg:text-[20px] text-[14px]'>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseNora
