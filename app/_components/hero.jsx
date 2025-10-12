import Image from 'next/image'

const Hero = () => {
  return (
    <section className='bg-[#F4EBE9] relative'>
      <Image
        src='/images/shape.svg'
        width={735}
        height={565}
        alt='shape'
        className='absolute right-0 top-0 z-0'
      />
      <div className='container custom-container mx-auto'>
        <div className='grid grid-cols-5 items-center'>
          <div className='col-span-3'>
            <h1 className='text-theme text-[72px] font-semibold leading-22'>
              Free Oral <br /> Contraception, <br />{' '}
              <span className='text-[#D6866B]'>Delivered to Your Door</span>
            </h1>
            <p className='text-[24px] text-pg mt-5'>
              We provide contraceptive services that are safe, easy to access,
              and 100% confidential — empowering you to make informed choices
              about your reproductive health with complete peace of mind.
            </p>
          </div>

          <div className='col-span-2'>
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
