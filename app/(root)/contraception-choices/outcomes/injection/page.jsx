import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export default function InjectionSection() {
  return (
    <section className=' p-6 sm:p-10'>
      <div className='container custom-container mx-auto'>
        {/* Main content card */}
        <div className='bg-[#FFF8EF]  rounded-2xl overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10'>
            {/* Left column */}
            <div className='space-y-6 relative before:content-none lg:before:content-[""]  before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image='/images/results/injection.png' />
              <h3 className='text-xl lg:text-2xl font-semibold'>
                Contraceptive Injections
              </h3>

              <p className='text-base text-[#3A3D42]'>
                The contraceptive injection contains progestogen and is
                administered every eight or twelve weeks, depending on the
                brand. It works by preventing ovulation and thickening cervical
                mucus. The injection is around 94% effective with typical use
                and is an option for those who prefer not to take daily pills.
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
                    <span>Lasts for up to 8–13 weeks per injection</span>
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
                    <span>Discreet and doesn’t require daily attention </span>
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
                      Can reduce period pain and bleeding for some users
                    </span>
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
                      Irregular periods or stopping periods altogether
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
                    <span>Weight gain, headaches, or mood changes</span>
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
                      Delayed return to fertility after stopping injections
                    </span>
                  </li>
                </ul>
              </div>

              <p className='mt-4'>
                Not suitable for everyone; discuss with your GP if you have
                osteoporosis risk or other health concerns.
              </p>

              <p className='mt-4'>
                NoraHealth do not offer services for injections just yet, but we
                can still help answer any questions you may have. Click here to
                book an appointment.
              </p>
            </div>
          </div>
        </div>
        {/* Bottom CTA */}
        <div className='pt-14  flex justify-center'>
          <PrimaryBtn label='Book a Free Call' url='/booking' />
        </div>
      </div>
    </section>
  );
}
