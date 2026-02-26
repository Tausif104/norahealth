import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export const metadata = {
  title: "Contraception Choices",
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default function OnlySection() {
  return (
    <section className="p-6 sm:p-10">
      <div className="container custom-container mx-auto">
        <div className="bg-[#FFF8EF] rounded-2xl overflow-hidden">
          {/* ✅ items-stretch + h-full => left/right same height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 items-stretch">
            {/* Left column */}
            <div className='flex flex-col h-full space-y-6 relative before:content-none lg:before:content-[""] before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image="/images/results/only.png" />

              <h3 className="text-xl lg:text-2xl font-semibold">
                Progesterone-only contraception (POCs)
              </h3>

              <p className="text-base text-[#3A3D42]">
                POC’s (also known as the mini-pill) work by:
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
                      <strong>Preventing Ovulation:</strong> Some POCs may stop
                      your ovaries from releasing an egg, though this effect can
                      vary among users.
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
                      <strong>Thicken Cervical Mucus:</strong> POCs make the
                      mucus in your cervix thicker, which makes it much harder
                      for sperm to reach an egg.
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
                      <strong>Thin the Uterine Lining:</strong> If an egg gets
                      fertilized, a thinner uterine lining makes it less likely
                      to attach and develop.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold">
                How Effective Are They?
              </h3>

              <p className="text-base text-[#3A3D42]">
                With perfect use, POCs are over 99% effective at preventing
                pregnancy. With typical use—if you miss pills or take them
                late—the effectiveness drops to about 91%. Taking your pill at
                the same time every day is especially important with POCs to
                maintain their effectiveness. Setting a daily reminder or
                pairing your pill with a routine habit can help you remember.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                How Do You Take POCs?
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
                      Take one pill every day, at the same time, without a
                      break.
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
                      If you’re more than 3 hours late (for traditional POCs) or
                      12 hours late (for some newer types), take the missed pill
                      as soon as you remember and use backup contraception (e.g.
                      condoms) for the next 48 hours. Always check your pill
                      pack instructions or reach out to us for support if you
                      miss a pill.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold">
                Benefits Beyond Birth Control
              </h3>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "POC’s can sometimes prevent a period and therefore may be more convenient",
                    "More suitable for those with a high BMI or those who suffer from migraines",
                    "Safer for people who can’t take oestrogen-containing contraceptives",
                    "May be used while breastfeeding",
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
                Possible Side Effects
              </h3>

              <p className="text-base text-[#3A3D42]">
                Most people tolerate POCs well, but some may notice mild side
                effects at first. These can include:
              </p>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Acne",
                    "Irregular bleeding or spotting (although this usually stops after the first few months)",
                    "Breast tenderness",
                    "Mood changes (Note: the evidence does not show a consistent worsening or improvement of mental health for those with existing mental health conditions)",
                    "Nausea",
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
            </div>

            {/* Right column */}
            <div className="flex flex-col h-full md:pl-8 space-y-6">
              

              

              <p className="text-base text-[#3A3D42]">
                Side effects often improve after a few months. If you continue
                to have bothersome symptoms, a different type of progesterone-only
                pill or another contraceptive method may help. We offer free
                consultations before starting POCs—click below to book a free
                consultation.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                Who Should Not Use POCs?
              </h3>

              <p className="text-base text-[#3A3D42]">
                POCs are safe for most women (including those with a BMI over 35
                or have heart issues), but you may need a different option if
                you:
              </p>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "A liver disease, such as cirrhosis",
                    "Active breast cancer*",
                    "A kidney-related condition",
                    "Unexplained prolonged vaginal bleeding for more than 14 days should be investigated before starting or continuing contraception",
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
                *If you are in remission from breast cancer POC’s are usually
                not recommended unless supported by specialist advice.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                Cancer Risks &amp; Protective Effects
              </h3>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "There is a slight increase in breast cancer risk however the risk is low and declines after stopping",
                    "There is no evidence that POC’s increase the risk of ovarian or cervical cancer",
                    "POC’s may offer some protection against endometrial (womb) cancer however there is only limited data available to support this",
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
                For more information on the cancer risks associated with POC’s
                check out our articles by{" "}
                <a
                  href="/articles"
                  target="_blank"
                  className="underline hover:opacity-80"
                >
                  clicking here
                </a>
                .
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">
                Frequently Asked Questions
              </h3>

              <div className="mt-2 text-base text-[#3A3D42] space-y-2.5">
                {[
                  {
                    q: "Can I get pregnant if I miss a pill?",
                    a: "Yes, missing or taking POCs late increases your risk of pregnancy. Take the missed pill as soon as possible and use backup contraception as recommended.",
                  },
                  {
                    q: "Will the pill affect my fertility?",
                    a: "No, fertility usually returns quickly after stopping POCs.",
                  },
                  {
                    q: "Do I need to take breaks from the pill?",
                    a: "No, you can use POCs for many years without needing breaks unless your doctor advises otherwise.",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="group rounded-md flex items-start gap-2"
                  >
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
                Getting Started with POCs
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
              <div className="text-base text-[#3A3D42] space-y-2">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <a
                      className="underline hover:opacity-80"
                      href="https://www.cosrh.org/Common/Uploaded%20files/documents/fsrh-ceu-clinical-guideline-progestogen-only-pills-aug22-amended-11july-2023-.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      College of Sexual and Reproductive Health Guideline:
                      Progestogen-only Pills (August 2022, Amended July 2023)
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