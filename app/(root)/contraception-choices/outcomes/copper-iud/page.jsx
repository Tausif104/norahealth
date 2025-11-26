import DecorativeBanner from '../../_components/decorative-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import Image from 'next/image'

export default function CopperSection() {
  return (
    <section className=' p-6 sm:p-10'>
      <div className='container custom-container mx-auto'>
        <DecorativeBanner image='/images/results/copper-iud.png' />
        {/* Main content card */}
        <div className='bg-[#FFF8EF]   overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10'>
            {/* Left column */}
            <div className='space-y-6 relative before:content-none lg:before:content-[""]  before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <h3 className='text-xl lg:text-2xl font-semibold'>
                Copper Intrauterine Device (IUD)
              </h3>

              <p className='text-base text-[#3A3D42]'>
                The copper IUD is a small, T-shaped device made of plastic and
                copper that is inserted into the uterus by a healthcare
                professional. It works by releasing copper, which acts as a
                spermicide, preventing sperm from surviving and fertilising an
                egg. The copper IUD provides long-term contraception, lasting
                between 5 and 10 years depending on the type, and is over 99%
                effective in preventing pregnancy. Once fitted, you do not need
                to think about contraception on a daily basis.
              </p>

              <div className='text-base text-[#3A3D42] space-y-3'>
                <ul className='list-disc list-inside space-y-1'>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Highly effective and long-lasting (5-10 years) </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Hormone-free option </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Fertility returns quickly after removal </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>No need to remember daily pills </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column (FAQ) */}
            <div className='md:pl-8'>
              <h3 className='text-xl lg:text-2xl font-semibold'>
                Possible Side Effects
              </h3>

              <div className='text-base text-[#3A3D42] space-y-3 mt-4'>
                <ul className='list-disc list-inside space-y-1'>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      Requires medical procedure for insertion and removal
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      Can cause heavier, longer, or more painful periods,
                      especially in the first few months
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Spotting or irregular bleeding may occur</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Cramping or discomfort after insertion </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='mt-[3px] min-w-5'>
                      <Image
                        src='/images/results/arrow-narrow-right.png'
                        alt='faq'
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Very rare risk of expulsion or perforation </span>
                  </li>
                </ul>
              </div>

              <p className='mt-4'>
                The copper IUD is suitable for many women, but it may not be the
                best choice if you have certain uterine abnormalities or are
                prone to heavy periods. Always consult a healthcare professional
                for individual advice.
              </p>

              <p className='mt-4'>
                NoraHealth do not offer services for the Copper-IUD just yet,
                but we can still help answer any questions you may have. Click
                here to book an appointment.
              </p>
            </div>
          </div>
        </div>
        {/* Bottom CTA */}
        <div className='pt-14  flex justify-center'>
          <PrimaryBtn label='Book a Free Call' url='/' />
        </div>
      </div>
    </section>
  )
}
