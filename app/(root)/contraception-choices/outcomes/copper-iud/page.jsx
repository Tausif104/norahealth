import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export const metadata = {
  title: "Contraception Choices",
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default function CopperSection() {
  return (
    <section className="p-6 sm:p-10">
      <div className="container custom-container mx-auto">
        <div className="bg-[#FFF8EF] rounded-2xl overflow-hidden">
          {/* ✅ items-stretch + h-full => left/right same height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 items-stretch">
            {/* Left column */}
            <div className='flex flex-col h-full space-y-6 relative before:content-none lg:before:content-[""] before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image="/images/results/copper-iud.png" />

              <h3 className="text-xl lg:text-2xl font-semibold">
                Intrauterine Devices &amp; Systems
              </h3>
<h3 className="text-xl lg:text-2xl font-semibold">What is an Intrauterine Device (IUD) or System (IUS)?</h3>
              <p className="text-base text-[#3A3D42]">
                 These are
                both small, T-shaped devices placed inside the uterus by a
                trained clinician. It provides long acting, reversible
                contraception.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">Copper IUD</h3>
              <p className="text-base text-[#3A3D42]">
                It works by releasing copper, which prevents sperm from surviving
                and fertilising an egg.
              </p>

              <h4 className="text-lg font-semibold text-[#3A3D42]">
                Advantages
              </h4>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Can be used as emergency contraception if fitted within 120 hours of unprotected intercourse",
                    "Highly effective (over 99% effective) and long-lasting (5-10 years)",
                    "Hormone-free option",
                    "Fertility returns quickly after removal",
                    "No need to remember daily pills",
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
              <h4 className="text-lg font-semibold text-[#3A3D42]">
                Considerations
              </h4>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Requires medical procedure for insertion and removal",
                    "Can cause heavier, longer, or more painful periods, especially in the first few months",
                    "Spotting or irregular bleeding may occur",
                    "Cramping or discomfort after insertion",
                    "Very rare risk of expulsion or perforation",
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
              <h3 className="text-xl lg:text-2xl font-semibold">Hormonal IUS</h3>

              <p className="text-base text-[#3A3D42]">
                It prevents pregnancy by slowly releasing progestogen into the
                uterus. This thickens the cervical mucus, so sperm struggle to
                reach an egg, and it also thins the uterine lining, which makes
                it unlikely for a fertilised egg to implant.
              </p>

              <h4 className="text-lg font-semibold text-[#3A3D42]">
                Advantages
              </h4>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Lighter periods: many people experience much less bleeding",
                    "Period pain often improves",
                    "Some users stop having periods altogether (safe and reversible)",
                    "Long-lasting: 3-8 years depending on the device",
                    "Can help with heavy menstrual bleeding",
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

              <h4 className="text-lg font-semibold text-[#3A3D42]">
                Possible Side Effects
              </h4>
              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Irregular bleeding or spotting in the first few months",
                    "Hormonal effects (usually mild): breast tenderness, mood changes, acne, headaches",
                    "Cramping after insertion",
                    "Small chance of infection during first few weeks after insertion",
                    "Very rare risk of expulsion or perforation",
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
                The IUD is suitable for many women, but it may not be the best
                choice if you have certain uterine abnormalities or are prone to
                heavy periods. Always consult a healthcare professional for
                individual advice.
              </p>

              <p className="text-base text-[#3A3D42]">
                NoraHealth do not offer services for the IUD just yet, but we can
                still help answer any questions you may have. Click below to
                book an appointment.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold">References</h3>
              <div className="text-base text-[#3A3D42]">
                <a
                  className="underline hover:opacity-80"
                  href="https://www.cosrh.org/Common/Uploaded%20files/documents/fsrh-clinical-guideline-intrauterine-contraception-mar-23-amended.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  College of Sexual and Reproductive Health: Guideline on
                  Intrauterine Contraception (March 2023, Amended Jan 2025)
                </a>
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