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
    <section className='relative z-10 after:absolute after:content-[""] after:w-[60%] after:h-full after:bg-[url("/images/why-choose.svg")] after:bg-fixed after:top-0 after:left-[45%] after:-z-10 after:bg-cover after:bg-center'>
      <div className='container custom-container mx-auto'>
        <div className='grid grid-cols-12'>
          <div className='col-span-5 py-[190px] pr-10'>
            <h2 className='text-heading text-5xl font-semibold leading-[1.2]'>
              Why Choose Nora Health
            </h2>
            <p className='text-[24px] text-pg py-6'>
              We combine medical safety with real convenience. Our contraception
              service is designed to fit around your life — not the other way
              around. Whether you value privacy, speed, or professional support,
              we ensure you get the care you need without the hassle of
              traditional appointments.
            </p>
            <OutlineBtn label='Order Now' url='/' />
          </div>
          <div className='col-span-7 flex items-center'>
            <div className='pl-[80px] flex flex-col gap-5'>
              {data.map((item) => (
                <div
                  key={item.id}
                  className='bg-white flex items-center rounded-[16px] py-[24px] px-[30px] gap-5'
                >
                  <div>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={80}
                      height={80}
                      className='min-w-[80px]'
                    />
                  </div>
                  <div>
                    <h3 className='text-[32px] font-semibold text-heading'>
                      {item.title}
                    </h3>
                    <p className='text-pg text-[24px]'>{item.description}</p>
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
