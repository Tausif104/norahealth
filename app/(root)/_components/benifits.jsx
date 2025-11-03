import PrimaryBtn from '@/components/global/primary-btn'
import Image from 'next/image'

const Benifits = () => {
  const data = [
    {
      id: 1,
      img: '/images/benifits/icon-1.svg',
      title: 'Convenient Online Services',
      description:
        'Easily order prescriptions, book services, and manage your health anytime, anywhere.',
    },
    {
      id: 2,
      img: '/images/benifits/icon-2.svg',
      title: 'Patient-Centered Care',
      description:
        'Get in touch with our clinicians any time for a consultation at no extra charge.',
    },
    {
      id: 3,
      img: '/images/benifits/icon-3.svg',
      title: 'Clinician Review',
      description:
        'Every request is reviewed meticulously with the aim of prioritizing your health.',
    },
    {
      id: 4,
      img: '/images/benifits/icon-4.svg',
      title: 'Delivered to Your Door',
      description:
        'Fast Royal Mail delivery in plain packaging - discreet, confidential and always free.',
    },
  ]

  return (
    <section className='sm:px-0 px-[24px]'>
      <div className='container custom-container mx-auto'>
        <div className='grid lg:grid-cols-12 grid-cols-1'>
          <div className='col-span-5 lg:py-[190px] py-[60px] lg:pr-10'>
            <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl font-semibold leading-[1.2]'>
              Benefits of Using Nora's Free Oral Contraception Service
            </h2>
            <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:py-6 py-4'>
              Nora takes the stress out of getting contraception. No more
              chasing GP appointments, waiting in queues, or feeling
              uncomfortable discussing personal choices in person. With Nora,
              you're in control — from the first click to delivery at your door.
            </p>
            <PrimaryBtn label='Order Now' url='/' />
          </div>
          <div className='col-span-7 flex items-center'>
            <div className='bg-[#FFF8EF] w-full md:py-[50px] py-[16px] md:px-[40px] px-[16px] rounded-[16px] flex flex-col gap-[24px]'>
              {data.map((item) => (
                <div
                  className='flex md:items-center items-start md:flex-row flex-col  md:gap-[20px] border-b-[#491f402d] border-b pb-[24px] last-of-type:border-0 last-of-type:pb-0'
                  key={item.id}
                >
                  <div>
                    <Image
                      width={70}
                      height={70}
                      src={item.img}
                      className='rounded-full md:min-w-[70px] md:max-w-[70px] max-w-[40px] min-w-[40px] '
                      alt='icon-one'
                    />
                  </div>
                  <div>
                    <h3 className='text-heading lg:text-[32px] text-[20px] font-semibold md:my-0 my-[10px]'>
                      {item.title}
                    </h3>
                    <p className='text-pg lg:text-[18px] text-[14px]'>
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

export default Benifits
