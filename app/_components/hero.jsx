import OutlineBtn from '@/components/global/outline-btn'
import PrimaryBtn from '@/components/global/primary-btn'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className='bg-[#F4EBE9] relative'>
      <Image
        src='/images/shape.svg'
        width={500}
        height={565}
        alt='shape'
        className='absolute right-0 top-0 z-0'
      />
      <Image
        src='/images/hero-bar.svg'
        width={0}
        height={0}
        alt='shape'
        className='absolute w-full max-h-[60px] bottom-0 right-0 z-20'
      />
      <div className='container custom-container mx-auto'>
        <div className='grid grid-cols-5 items-center'>
          <div className='col-span-3 '>
            <h1 className='text-theme text-[72px] font-semibold leading-22'>
              Free Oral <br /> Contraception, <br />{' '}
              <span className='text-[#D6866B]'>Delivered to Your Door</span>
            </h1>
            <p className='text-[24px] text-pg mt-5'>
              We provide contraceptive services that are safe, easy to access,
              and 100% confidential — empowering you to make informed choices
              about your reproductive health with complete peace of mind.
            </p>
            <div className='flex gap-5 mt-15'>
              <PrimaryBtn label='Order Now' url='/order-now' />
              <OutlineBtn label='Learn More' url='/learn-more' />
            </div>
          </div>

          <div className='col-span-2 mt-[100px]'>
            <Image
              src='/images/woman.svg'
              width={615}
              height={800}
              alt='Woman'
              className='relative z-10'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
