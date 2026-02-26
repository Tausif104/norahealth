import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export const metadata = {
  title: "Contraception Choices",
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default function ImplantSection() {
  return (
    <section className="p-6 sm:p-10">
      <div className="container custom-container mx-auto">
        <div className="bg-[#FFF8EF] rounded-2xl overflow-hidden">
          {/* ✅ items-stretch + h-full => left/right same height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 items-stretch">
            {/* Left column */}
            <div className='flex flex-col h-full space-y-6 relative before:content-none lg:before:content-[""] before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image="/images/results/implant.png" />

              <h3 className="text-xl lg:text-2xl font-semibold">
                Contraceptive Implants
              </h3>

              <p className="text-base text-[#3A3D42]">
                Contraceptive implants are small, flexible rods placed under the
                skin of the upper arm by a healthcare professional. They release
                a steady dose of progestogen hormone, which prevents ovulation
                and thickens cervical mucus to block sperm from reaching the
                egg. Implants provide long-term protection, lasting up to three
                years, and are over 99% effective in preventing pregnancy. Once
                fitted, you don&apos;t need to think about contraception daily.
              </p>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Highly effective and long-lasting (up to three years)",
                    "May reduce or stop periods for some users",
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
              <h3 className="text-xl lg:text-2xl font-semibold">
                Considerations
              </h3>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Requires medical intervention to remove device",
                    "Not easily reversible",
                    "Irregular bleeding or spotting, especially within the first few months",
                    "Headaches, mood changes, or breast tenderness",
                    "Minor bruising or discomfort at the insertion site",
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
                Implants are suitable for most women but consult a healthcare
                professional if you have certain medical conditions or concerns
                about hormones.
              </p>

              <p className="text-base text-[#3A3D42]">
                NoraHealth do not offer services for the implant just yet, but we
                can still help answer any questions you may have. Click below to
                book an appointment.
              </p>
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