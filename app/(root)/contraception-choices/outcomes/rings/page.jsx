import DecorativeBanner from '../../_components/decorative-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import Image from 'next/image'

export default function RingsSection() {
  return (
    <section className=' p-6 sm:p-10'>
      <div className='container custom-container mx-auto'>
        <DecorativeBanner image='/images/results/rings.png' />
        {/* Main content card */}
        <div className='bg-[#FFF8EF]   overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10'>
            {/* Left column */}
            <div className='space-y-6 relative before:content-none lg:before:content-[""]  before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <h3 className='text-xl lg:text-2xl font-semibold'>
                Contraceptive Rings
              </h3>

              <p className='text-base text-[#3A3D42]'>
                The vaginal ring is a soft, flexible device placed inside the
                vagina. It releases oestrogen and progestogen, similar to the
                combined pill, preventing ovulation and thickening cervical
                mucus. The ring is worn for three weeks, removed for one week
                (during which a period-like bleed occurs), then replaced with a
                new ring. It is over 99% effective with perfect use and is a
                convenient method for those who prefer not to take pills daily.
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
                    <span>Easy to use and self-administered</span>
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
                    <span>Allows regular periods </span>
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
                    <span>Can be removed temporarily (up to three hours)</span>
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
                      Irregular periods Vaginal irritation or discomfort or
                      stopping periods altogether
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
                    <span>Headaches, breast tenderness, nausea </span>
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
                      Rare risk of blood clots (as with other
                      oestrogen-containing contraceptives)
                    </span>
                  </li>
                </ul>
              </div>

              <p className='mt-4'>
                Rings are not suitable for everyone, especially those with a
                history of blood clots or certain medical conditions. Speak to a
                healthcare provider for personalised advice.
              </p>

              <p className='mt-4'>
                NoraHealth do not offer services for the ring just yet but we
                can still help answer any questions you may have. Click here to
                book an appointment.
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
