import DecorativeBanner from '../../_components/decorative-banner'
import PrimaryBtn from '@/components/global/primary-btn'
import Image from 'next/image'

export default function OnlySection() {
  return (
    <section className=' p-6 sm:p-10'>
      <div className='container custom-container mx-auto'>
        <DecorativeBanner image='/images/results/only.png' />
        {/* Main content card */}
        <div className='bg-[#FFF8EF]   overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10'>
            {/* Left column */}
            <div className='space-y-6 relative before:content-none lg:before:content-[""]  before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <h3 className='text-xl lg:text-2xl font-semibold'>
                What is progesterone
              </h3>

              <p className='text-base text-[#3A3D42]'>
                Progesterone is a natural hormone produced by the ovaries that
                plays a key role in regulating the menstrual cycle and
                supporting pregnancy. It helps prepare the lining of the uterus
                for a fertilized egg and maintains early pregnancy.
              </p>

              <p className='text-base text-[#3A3D42]'>
                In contraception, synthetic forms of progesterone are used in
                progesterone-only contraceptives (POCs) to help prevent
                pregnancy through several mechanisms, including thickening
                cervical mucus, thinning the uterine lining, and sometimes
                stopping ovulation.
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
                    <span>
                      <strong>Prevent Ovulation (Sometimes): </strong> Some POCs
                      may stop your ovaries from releasing an egg, though this
                      effect can vary among users.
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
                      <strong>Thicken Cervical Mucus:</strong> POCs make the
                      mucus in your cervix thicker, which makes it much harder
                      for sperm to reach an egg. 
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
                      <strong>Thin the Uterine Lining:</strong> If an egg gets
                      fertilized, a thinner uterine lining makes it less likely
                      to attach and develop.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                How Effective Are They?
              </h3>

              <p className='text-base text-[#3A3D42]'>
                With perfect use, POCs are over 99% effective at preventing
                pregnancy. With typical use—if you miss pills or take them
                late—the effectiveness drops to about 90%. Taking your pill at
                the <strong>same time every day</strong> is especially important
                with POCs to maintain their effectiveness. Setting a daily
                reminder or pairing your pill with a routine habit can help you
                remember.
              </p>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                How Do You Take POCs?
              </h3>

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
                    <span>
                      ake one pill every day, at the same time. Unlike combined
                      pills, there are no hormone-free or "inactive" pills in
                      most POC packs.
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
                      Pill packs usually contain 28 active pills. You take one
                      pill each day without breaks between packs, so you're
                      always protected.
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
                      If you're more than 3 hours late (for traditional POCs) or
                      12 hours late (for some newer types), take the missed pill
                      as soon as you remember and use backup contraception for
                      the next 48 hours. Always check your pill pack
                      instructions or reach out to us for support if you miss a
                      pill.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                Benefits Beyond Birth Control
              </h3>

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
                    <span>
                      Prevents a period therefore may be more convenient & helps
                      reduce associated period pains
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
                      More suitable for those with a high BMI or suffer from
                      migraines
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
                      Safe for people who can't take estrogen-containing
                      contraceptives
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
                    <span>May be used while breastfeeding</span>
                  </li>
                </ul>
              </div>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                Possible Side Effects
              </h3>

              <p className='text-base text-[#3A3D42]'>
                Most people tolerate POCs well, but some may notice mild side
                effects at first. These can include
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
                    <span>Acne</span>
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
                      Irregular bleeding or spotting (although this usually
                      stops after the first few months)
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
                    <span>Breast tenderness </span>
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
                    <span>Mood changes </span>
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
                    <span>Nausea </span>
                  </li>
                </ul>
              </div>

              <p className='text-base text-[#3A3D42]'>
                Side effects often improve after a few months. If you continue
                to have bothersome symptoms, a different type of progestin-only
                pill or another contraceptive method may help. We offer free
                consultations before starting POCs—click here to book a
                consultation.
              </p>
            </div>

            {/* Right column (FAQ) */}
            <div className='md:pl-8 space-y-6'>
              <h3 className='text-xl lg:text-2xl font-semibold'>
                Who Should Not Use POCs?
              </h3>

              <p className='text-base text-[#3A3D42]'>
                POCs are safe for most women, but you may need a different
                option if you:
              </p>

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
                      A disease related to the heart or blood vessels
                      (cardiovascular disease)
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
                    <span>History of a stroke</span>
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
                    <span>A liver disease, such as cirrhosis</span>
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
                    <span>Active breast cancer</span>
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
                    <span>A kidney-related condition </span>
                  </li>
                </ul>
              </div>

              <p className='text-base text-[#3A3D42]'>
                Most women who cannot use estrogen-containing contraceptives can
                safely use POCs.
              </p>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                POC & Cancer
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
                      <strong>Breast cancer:</strong> Research indicates that
                      using the mini pill is associated with a slight increase
                      in breast cancer risk, which begins to decrease after
                      discontinuation. This pattern is also observed with the
                      combined pill.
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
                      <strong>Cervical cancer:</strong> There is currently
                      insufficient research to determine whether the mini pill
                      affects cervical cancer risk.
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
                      <strong>Endometrial (womb) cancer:</strong> Limited
                      studies suggest that the mini pill may lower the risk of
                      endometrial cancer, similar to the combined pill, but
                      further research is required for confirmation.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                Frequently Asked Questions
              </h3>

              <div className='mt-4 text-base ttext-[#3A3D42] space-y-2.5'>
                <div className='group   rounded-md flex items-start gap-2 '>
                  <span className='mt-[3px]'>
                    <Image
                      src='/images/results/arrow-narrow-right.png'
                      alt='faq'
                      width={24}
                      height={24}
                    />
                  </span>
                  <div>
                    <h5 className='font-semibold text-base mb-0 '>
                      Can I get pregnant if I miss a pill?
                    </h5>
                    <p className=' text-[#3A3D42]'>
                      Yes, missing or taking POCs late increases your risk of
                      pregnancy. Take the missed pill as soon as possible and
                      use backup contraception as recommended.
                    </p>
                  </div>
                </div>
                <div className='group   rounded-md flex items-start gap-2 '>
                  <span className='mt-[3px]'>
                    <Image
                      src='/images/results/arrow-narrow-right.png'
                      alt='faq'
                      width={18}
                      height={18}
                    />
                  </span>
                  <div>
                    <h5 className='font-semibold text-base mb-0 '>
                      Will the pill affect my fertility?
                    </h5>
                    <p className=' text-[#3A3D42]'>
                      No, fertility usually returns quickly after stopping POCs.
                    </p>
                  </div>
                </div>
                <div className='group   rounded-md flex items-start gap-2 '>
                  <span className='mt-[3px]'>
                    <Image
                      src='/images/results/arrow-narrow-right.png'
                      alt='faq'
                      width={18}
                      height={18}
                    />
                  </span>
                  <div>
                    <h5 className='font-semibold text-base mb-0 '>
                      Do I need to take breaks from the pill?
                    </h5>
                    <p className=' text-[#3A3D42]'>
                      No, you can use POCs for many years without needing breaks
                      unless your doctor advises otherwise.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className='mt-6 text-xl lg:text-2xl font-semibold'>
                Getting Started with POCs
              </h3>
              <p className='text-base text-[#3A3D42]'>
                If you're interested in starting progesterone-only
                contraceptives, the first step is to schedule a consultation
                with us. We'll review your medical history, answer your
                questions, and help you choose the best birth control option for
                your needs.
              </p>
              <p className='text-base text-[#3A3D42]'>
                At NoraHealth, we’re here to support you every step of the way.
                For more information or to book an appointment, click below.
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
