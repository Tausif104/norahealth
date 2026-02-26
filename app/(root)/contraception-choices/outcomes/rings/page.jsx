import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export const metadata = {
  title: "Contraception Choices",
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default function RingsSection() {
  return (
    <section className="p-6 sm:p-10">
      <div className="container custom-container mx-auto">
        <div className="bg-[#FFF8EF] rounded-2xl overflow-hidden">
          {/* ✅ items-stretch + h-full => left/right same height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 items-stretch">
            {/* Left column */}
            <div className='flex flex-col h-full space-y-6 relative before:content-none lg:before:content-[""] before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image="/images/results/rings.png" />

              <h3 className="text-xl lg:text-2xl font-semibold">
                Contraceptive Rings
              </h3>

              <p className="text-base text-[#3A3D42]">
                The vaginal ring is a soft, flexible device placed inside the
                vagina. It releases oestrogen and progestogen, similar to the
                combined pill, preventing ovulation and thickening cervical
                mucus.
              </p>

              <p className="text-base text-[#3A3D42]">
                The ring is worn for three weeks, removed for one week (during
                which a period-like bleed occurs), then replaced with a new
                ring. It is over 99% effective with perfect use and is a
                convenient method for those who prefer not to take pills daily.
              </p>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Easy to use and self-administered",
                    "Allows regular periods",
                    "Can be removed temporarily (up to three hours)",
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
                Possible Side Effects &amp; Risks
              </h3>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Irregular periods, vaginal irritation or discomfort, or stopping periods altogether",
                    "Headaches, breast tenderness, nausea",
                    "Rare risk of blood clots (as with other oestrogen-containing contraceptives)",
                    "Small increased risk of breast and cervical cancer",
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
                Rings are not suitable for everyone, especially those with a
                history of blood clots or certain medical conditions. Speak to a
                healthcare provider for personalised advice.
              </p>

              <p className="text-base text-[#3A3D42]">
                NoraHealth do not offer services for the ring just yet but we can
                still help answer any questions you may have. Click below to
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