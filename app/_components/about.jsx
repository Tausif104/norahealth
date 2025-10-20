import Image from 'next/image'
import CounterUpBox from '@/components/global/counter-up'

const AboutSection = () => {
  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4  items-center'>
          <div>
            <Image
              src='/images/img-about.jpg'
              alt='About Thumbnail'
              width={640}
              height={500}
            />
          </div>
          <div>
            <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl  font-semibold'>
              About Nora Health
            </h2>
            <div className='my-4'>
              <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:mb-2 mb-1'>
                At Norahealth, we believe contraception should be simple, safe,
                and stigma-free.
              </p>
              <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:mb-2 mb-1'>
                Our trusted online services connect patients with a clinical
                team of experienced pharmacists and doctors — with over 15 years
                of expertise in women's health. We know that everyone's
                different. That's why our advice is{' '}
                <span className='text-theme'>personal</span>,{' '}
                <span className='text-theme'>inclusive</span>, and{' '}
                <span className='text-theme'>culturally sensitive</span> — so
                you feel heard, respected, and supported every step of the way.
              </p>
              <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:mb-2 mb-1'>
                We will not be stopping there however - Nora Health plans to
                expand to support women across every stage of life, from
                contraception to menopause. Whether you're seeking advice or
                treatment our mission is to empower you with compassionate,
                accessible healthcare.
              </p>
            </div>
            <div className='grid grid-cols-2 md:gap-5 gap-4'>
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
