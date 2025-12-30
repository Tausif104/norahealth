import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export default function OralSection() {
  return (
    <section className=' p-6 sm:p-10'>
      <div className='container custom-container mx-auto'>
        {/* Main content card */}
        <div className='bg-[#FFF8EF] rounded-2xl   overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10'>
            {/* Left column */}
            <div className='space-y-6 relative before:content-none lg:before:content-[""]  before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image='/images/results/oral.png' />
              <h3 className='text-xl lg:text-2xl font-semibold'>
                What Are Combined Oral Contraceptives?
              </h3>

              <p className='text-base text-[#3A3D42]'>
                COCs are daily pills that contain two hormones: estrogen and
                progesterone. These hormones are similar to the ones naturally
                produced by your ovaries. By taking the pill at the same time
                every day, you can prevent pregnancy and enjoy additional health
                benefits.
              </p>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                How do they Work?
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
                      <strong>Prevent Ovulation:</strong> COCs stop your ovaries
                      from releasing an egg each month.
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
                      <strong>Thicken Cervical Mucus:</strong> This makes it
                      harder for sperm to reach the egg.
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
                      <strong>Thin the Uterine Lining:</strong> If an egg were
                      fertilized, it would have a harder time attaching to the
                      uterus.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                How Effective Are They?
              </h3>

              <p className='text-base text-[#3A3D42]'>
                With perfect use, COCs are over 99% effective. With typical use
                (forgetting a pill now and then), they’re about 90% effective.
                Setting reminders or combining the pill with a routine (like
                brushing your teeth) can help you remember to take it every day.
              </p>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                How Do You Take COCs?
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
                    <span>Take one pill every day, at the same time.</span>
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
                      Pill packs usually contain 21 active pills (with hormones)
                      and may additionaly contain 7 inactive pills. During the
                      inactive week, you can expect to have your period.
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
                      If you miss a pill, follow the instructions in your pill
                      pack or send us a message
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
                    <span>Regulates your menstrual cycle </span>
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
                    <span>Reduces menstrual cramps and pain</span>
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
                    <span>Can help clear up acne</span>
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
                      May lower your risk of ovarian and endometrial cancers
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
                      Can lessen symptoms of premenstrual syndrome (PMS)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column (FAQ) */}
            <div className='md:pl-8 space-y-6'>
              <h3 className='text-xl lg:text-2xl font-semibold'>
                Possible Side Effects
              </h3>

              <p className='text-base text-[#3A3D42]'>
                Most women tolerate COCs well, but some may experience mild side
                effects, especially in the first few months. These can include:
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
                    <span>Nausea or upset stomach</span>
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
                    <span>Breast tenderness</span>
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
                    <span>Spotting between periods </span>
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
                    <span>Mood changes</span>
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
                    <span>Headaches</span>
                  </li>
                </ul>
              </div>

              <p className='text-base text-[#3A3D42]'>
                These symptoms usually improve after a few months. If side
                effects persist, a different formulation of a combined pill may
                be helpful in alleviating symptoms. We offer free consultations
                prior to COC use – click here to book a consultation.
              </p>
              <h3 className='text-xl lg:text-2xl font-semibold'>
                Who Should Not Use COCs?
              </h3>

              <p className='text-base text-[#3A3D42]'>
                COCs are safe for most healthy women, but they may not be
                suitable if you:
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
                      Blood pressure checks recomSmoke and are over 35 years old
                      mended before starting COCs.
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
                      Have a history of blood clots or certain types of
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
                      Have certain health conditions like liver disease or
                      uncontrolled high blood pressure
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
                      A family history of breast cancer does not make you
                      automatically unsuitable for combined contraceptives
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className='text-xl lg:text-2xl font-semibold'>
                COC & Cancer
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
                      COC's have been shown to reduce the risk of endometrial
                      and ovarian cancer
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
                      COC's have been shown to increase the risk of breast and
                      cervical cancer
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
                      Approximately 5-10 years after stopping COC's the risk of
                      breast and cervical cancer normalises
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
                      Missing a pill increases your risk of pregnancy. Take the
                      missed pill as soon as you remember and use backup
                      protection if needed.
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
                      No, fertility returns quickly after stopping COCs.
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
                      No, you can safely use COCs for many years without taking
                      breaks, unless advised by your doctor 
                    </p>
                  </div>
                </div>
              </div>

              <h3 className='mt-6 text-xl lg:text-2xl font-semibold'>
                Getting Started with COCs
              </h3>
              <p className='text-base text-[#3A3D42]'>
                If you're interested in starting combined oral contraceptives,
                the first step is to schedule a consultation with us. We will
                discuss your medical history, answer your questions, and help
                you choose the best birth control option for your needs.
              </p>
              <p className='text-base text-[#3A3D42]'>
                At NoraHealth, we're here to support you every step of the way.
                For more information or to book an appointment click below.
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
