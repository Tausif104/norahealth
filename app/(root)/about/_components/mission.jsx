import Image from 'next/image'

const Mission = () => {
  return (
    <section className='bg-[#FFF8EF] section-padding'>
      <div className='container custom-container mx-auto'>
        <div className='grid md:grid-cols-12 grid-cols-1 gap-7 sm:px-0 px-[24px]'>
          <div className='md:col-span-5 col-span-1'>
            <Image
              src='/images/mission-thumb.svg'
              width={600}
              height={530}
              alt='Mission Thumb'
              className='w-full'
            />
          </div>
          <div className='md:col-span-7 col-span-1'>
            <div className='flex flex-col gap-7'>
              <div className='bg-theme p-[20px] rounded-[12px]'>
                <h3 className='flex items-center gap-3 mb-[15px]'>
                  <Image
                    src='/images/icons/vision.svg'
                    width={45}
                    height={45}
                    alt='Vision'
                  />

                  <span className='md:text-[32px] text-[24px] text-white font-semibold'>
                    Our Vision
                  </span>
                </h3>
                <p className='2xl:text-[22px] xl:text-[20px] text-[16px] text-white'>
                  We envision a world where women can take control of their
                  health with confidence—supported by trusted clinicians,
                  innovative technology, and discreet care delivered right to
                  their door.
                </p>
              </div>
              <div className='bg-[#F6ECE3] p-[20px] rounded-[12px]'>
                <h3 className='flex items-center gap-3 mb-[15px]'>
                  <Image
                    src='/images/icons/mission.svg'
                    width={45}
                    height={45}
                    alt='Vision'
                  />

                  <span className='md:text-[32px] text-[24px] text-heading font-semibold'>
                    Our Mission
                  </span>
                </h3>
                <p className='2xl:text-[22px] xl:text-[20px] text-[16px] text-pg'>
                  At Nora Health, our mission is simple: to make womens
                  healthcare more <span className='text-theme'>accessible</span>
                  , <span className='text-theme'>private</span>, and{' '}
                  <span className='text-theme'>convenient</span>. We believe
                  every woman deserves safe, professional, and affordable access
                  to essential treatments without unnecessary barriers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
