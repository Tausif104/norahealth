import OutlineBtn from '@/components/global/outline-btn'
import PrimaryBtn from '@/components/global/primary-btn'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className='bg-[#F4EBE9] relative xl:pb-0 lg:pb-[60px] pb-[60px]'>
      <Image
        src='/images/shape.svg'
        width={500}
        height={565}
        alt='shape'
        className='absolute right-0 top-0 z-0 lg:block md:block sm:hidden hidden'
      />
      <Image
        src='/images/hero-bar.svg'
        width={0}
        height={0}
        alt='shape'
        className='absolute w-full max-h-[60px] bottom-0 right-0 z-20 lg:block md:hidden hidden'
      />
      <div className='container custom-container mx-auto'>
        <div className='grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-1 items-center 2xl:order-first xl:order-first lg:order-first md:order-last sm:order-last order-last '>
          <div className='2xl:col-span-3 xl:col-span-3 lg:col-span-3 sm:px-0 px-[24px]'>
            <h1 className='text-theme 2xl:text-[72px] xl:text-[65px] lg:text-[52px] text-[30px] font-semibold leading-[1.2] '>
              Free Oral <br /> Contraception, <br />
              <span className='text-[#D6866B]'>Delivered to Your Door</span>
            </h1>
            <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg mt-5'>
              We provide contraceptive services that are safe, easy to access,
              and 100% confidential — empowering you to make informed choices
              about your reproductive health with complete peace of mind.
            </p>
            <div className='flex xl:gap-5 lg:gap-4 gap-3 xl:mt-15 md:mt-[24px] mt-[24px] sm:flex-row flex-col'>
              <PrimaryBtn label='Order Now' url='/order-now' />
              <OutlineBtn label='Learn More' url='/learn-more' />
            </div>
          </div>

          <div className='2xl:col-span-2 lg:col-span-2 md:col-span-2 xl:mt-[100px] lg:mt-[50px] md:mt-[20px] mt-0 2xl:order-last xl:order-last lg:order-last md:order-first sm:order-first order-first text-center '>
            <Image
              src='/images/woman.svg'
              width={615}
              height={800}
              alt='Woman'
              className='relative z-10 md:mx-auto mx-auto lg:block md:block md:mb-[15px] sm:hidden hidden'
            />
            <Image
              src='/images/mobile-thumb-hero.png'
              width={615}
              height={800}
              alt='Woman'
              className='relative z-10 md:mx-auto mx-auto w-full md:hidden sm:block block mb-[54px]'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
