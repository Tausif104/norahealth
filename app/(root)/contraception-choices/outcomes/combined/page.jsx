import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export const metadata = {
  title: "Contraception Choices",
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default function OralSection() {
  return (
    <section className="p-6 sm:p-10">
      <div className="container custom-container mx-auto">
        <div className="bg-[#FFF8EF] rounded-2xl overflow-hidden">
          {/* ✅ items-stretch + h-full makes left/right equal height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 items-stretch">
            {/* Left column */}
            <div className='flex flex-col h-full space-y-6 relative before:content-none lg:before:content-[""] before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image="/images/results/oral.png" />

              <h3 className="text-xl lg:text-2xl font-semibold">
                What Are Combined Oral Contraceptives (COC’s)?
              </h3>
              <p className="text-base text-[#3A3D42]">
                COC’s are daily pills that contain two hormones, oestrogen and
                progesterone, which are similar to the ones naturally produced
                by your ovaries. Taking the pill at the same time every day not
                only can help prevent pregnancy but also has other benefits.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                Benefits Beyond Birth Control
              </h3>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Regulates your menstrual cycle and reduces menstrual cramps and pain",
                    "Can lessen symptoms of premenstrual syndrome (PMS)",
                    "Can help clear up acne in some people",
                    "May lower your risk of ovarian, endometrial and bowel cancers",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <span className="mt-[3px] min-w-5">
                        <Image
                          src="/images/results/arrow-narrow-right.png"
                          alt="arrow"
                          width={18}
                          height={18}
                        />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold">
                How do COC’s Work?
              </h3>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] min-w-5">
                      <Image
                        src="/images/results/arrow-narrow-right.png"
                        alt="arrow"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      <strong>Prevent Ovulation:</strong> COC&apos;s stop your
                      ovaries from releasing an egg each month.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] min-w-5">
                      <Image
                        src="/images/results/arrow-narrow-right.png"
                        alt="arrow"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      <strong>Thicken Cervical Mucus:</strong> This makes it
                      harder for sperm to reach the egg.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] min-w-5">
                      <Image
                        src="/images/results/arrow-narrow-right.png"
                        alt="arrow"
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

              <h3 className="text-xl lg:text-2xl font-semibold">
                How Effective Are They?
              </h3>
              <p className="text-base text-[#3A3D42]">
                With perfect use, COC’s are over 99% effective. With typical use
                (forgetting a pill now and then), they’re about 90% effective.
                Setting reminders or combining the pill with a routine (like
                brushing your teeth) can help you remember to take it every day.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                How Do You Take COCs?
              </h3>
              <p className="text-base text-[#3A3D42]">
                The COC is available in two forms – patches and tablets. This
                page focuses on the pill form.
              </p>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] min-w-5">
                      <Image
                        src="/images/results/arrow-narrow-right.png"
                        alt="arrow"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      One pill needs to be taken every day, ideally at the same
                      time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] min-w-5">
                      <Image
                        src="/images/results/arrow-narrow-right.png"
                        alt="arrow"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      Pill packs usually contain 21 active pills (with hormones)
                      and some pill packs may also contain 7 inactive pills.
                      During the inactive or pill-free week, you can expect to
                      have your period.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] min-w-5">
                      <Image
                        src="/images/results/arrow-narrow-right.png"
                        alt="arrow"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      If you miss a pill the contraceptive effect may be
                      altered. Each type of pill has different regimes on how
                      to manage missed pills so follow the instructions in your
                      pill pack.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col h-full md:pl-8 space-y-6">
              <h3 className="text-xl lg:text-2xl font-semibold">
                Possible Side Effects
              </h3>
              <p className="text-base text-[#3A3D42]">
                Most women tolerate COCs well, but some may experience mild side
                effects, especially in the first few months. These can include:
              </p>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Nausea or upset stomach",
                    "Breast tenderness",
                    "Spotting between periods",
                    "Mood changes (there is no clear consistent evidence that COC improves or worsens mood in those with pre-existing anxiety and mood disorders)",
                    "Headaches",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <span className="mt-[3px] min-w-5">
                        <Image
                          src="/images/results/arrow-narrow-right.png"
                          alt="arrow"
                          width={18}
                          height={18}
                        />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-base text-[#3A3D42]">
                These symptoms usually improve after a few months. If side
                effects persist, a different formulation of a combined pill may
                be helpful in alleviating symptoms. We offer free consultations
                prior to COC use – click below to book a consultation.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                Cardiovascular Risks
              </h3>
              <p className="text-base text-[#3A3D42]">
                One of the main risks of combined pills is the increased risk of
                stroke. Therefore they may not be suitable for everyone and in
                particular those with a history of:
              </p>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Blood clots (VTE)",
                    "Heart attack or stroke",
                    "High BMI (over 35)",
                    "Smoker & some ex-smokers",
                    "Migraine with aura",
                    "Diabetes (note: some COC’s are suitable in some diabetic patients)",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <span className="mt-[3px] min-w-5">
                        <Image
                          src="/images/results/arrow-narrow-right.png"
                          alt="arrow"
                          width={18}
                          height={18}
                        />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-base text-[#3A3D42]">
                This is not a complete list so before starting any new COC it is
                important to let our team know of any health conditions you may
                have.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                Frequently Asked Questions
              </h3>

              <div className="mt-2 text-base text-[#3A3D42] space-y-2.5">
                {[
                  {
                    q: "Can I get pregnant if I miss a pill?",
                    a: "Missing a pill increases your risk of pregnancy. Take the missed pill as soon as you remember and use backup protection if needed.",
                  },
                  {
                    q: "Will the pill affect my fertility?",
                    a: "No, fertility returns quickly after stopping COCs.",
                  },
                  {
                    q: "Do I need to take breaks from the pill?",
                    a: "No, you can safely use COCs for many years without taking breaks, unless advised by your doctor.",
                  },
                ].map((item) => (
                  <div key={item.q} className="group rounded-md flex items-start gap-2">
                    <span className="mt-[3px]">
                      <Image
                        src="/images/results/arrow-narrow-right.png"
                        alt="arrow"
                        width={20}
                        height={20}
                      />
                    </span>
                    <div>
                      <h5 className="font-semibold text-base mb-0">{item.q}</h5>
                      <p className="text-[#3A3D42]">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mt-2 text-xl lg:text-2xl font-semibold">
                Getting Started with COCs
              </h3>
              <p className="text-base text-[#3A3D42]">
                At Nora Health, we&apos;re here to support you every step of the
                way. If you&apos;re interested in starting oral contraceptives,
                the first step is to schedule a consultation with us. We&apos;ll
                review your medical history, answer your questions, and help you
                choose the best birth control option for your needs.
              </p>
              <p className="text-base text-[#3A3D42]">
                Click below to book a free appointment.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">References</h3>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <a
                      className="underline hover:opacity-80"
                      href="https://www.cosrh.org/Common/Uploaded%20files/documents/fsrh-guideline-combined-hormonal-contraception-october-2023.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      The College of Sexual and Reproductive Health Clinical
                      Guideline: Combined Hormonal Contraception (January 2019,
                      Amended October 2023)
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline hover:opacity-80"
                      href="https://www.cosrh.org/Public/Public/Standards-and-Guidance/uk-medical-eligibility-criteria-for-contraceptive-use-ukmec.aspx"
                      target="_blank"
                      rel="noreferrer"
                    >
                      The College of Sexual and Reproductive Health: UK Medical
                      Eligibility Criteria for Contraceptive Use (2025)
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline hover:opacity-80"
                      href="https://www.cosrh.org/Common/Uploaded%20files/documents/UKMEC_2025_Hormonal_Contraception_Mental_Health_Statement.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      The College of Sexual and Reproductive Health Statement:
                      Effect of Hormonal Contraception in Individuals with
                      Anxiety and Mood (Affective) Disorders (2025)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 flex justify-center">
          <PrimaryBtn label="Book a Free Call" url="/booking" />
        </div>
      </div>
    </section>
  );
}