import Image from 'next/image'
import CounterUpBox from '@/components/global/counter-up'

const AboutSection = () => {
  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4  items-center'>
          <div>
            <Image
              src='/images/about.png'
              alt='About Thumbnail'
              width={640}
              height={500}
            />
          </div>
          <div>
            <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl  font-semibold'>
              About Nora Health
            </h2>
            <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:my-7 my-3'>
              At Nora Health, we believe contraception should be simple, safe,
              and stigma-free. Our trusted online service connects patients with
              qualified UK clinicians without the hassle of GP appointments or
              long waits. Run by experienced pharmacists, our mission is to
              enhance women’s health by offering free contraceptive pill
              delivery to your door.
            </p>
            <div className='grid grid-cols-2 gap-5'>
              <CounterUpBox
                num='480'
                label='Happy Customers'
                prefix=''
                suffix='+'
              />
              <CounterUpBox
                num='4'
                label='Years Experience'
                prefix=''
                suffix=''
              />
            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 md:mt-8 mt-4'>
          <div className='bg-[#FFF4EF] rounded-[12px] p-5'>
            <h3 className='lg:text-[32px] text-[24px] text-heading font-semibold mb-1'>
              Our Mission
            </h3>
            <p className='text-pg lg:text-[18px] text-[14px]'>
              At Nora Health, our mission is simple: to make women's healthcare
              more <span className='text-theme'>accessible</span>,{' '}
              <span className='text-theme'>private</span>, and{' '}
              <span className='text-theme'>convenient</span>. We believe every
              woman deserves safe, professional, and affordable access to
              essential treatments without unnecessary barriers.
            </p>
          </div>
          <div className='bg-[#F7F2E7] rounded-[12px] p-5'>
            <h3 className='lg:text-[32px] text-[24px] text-heading font-semibold mb-1'>
              Our Vision
            </h3>
            <p className='text-pg lg:text-[18px] text-[14px]'>
              We envision a world where women can take control of their health
              with confidence—supported by trusted clinicians, innovative
              technology, and discreet care delivered right to their door.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
