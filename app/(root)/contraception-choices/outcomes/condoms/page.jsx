import DecorativeBanner from "../../_components/decorative-banner";
import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

export const metadata = {
  title: "Contraception Choices",
  description: "Free Oral Contraception, Delivered to Your Door",
};

export default function CondomsSection() {
  return (
    <section className="p-6 sm:p-10">
      <div className="container custom-container mx-auto">
        <div className="bg-[#FFF8EF] rounded-2xl overflow-hidden">
          {/* ✅ items-stretch + h-full => left/right same height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 items-stretch">
            {/* Left column */}
            <div className='flex flex-col h-full space-y-6 relative before:content-none lg:before:content-[""] before:absolute before:bg-[#CE8936] before:w-[1px] before:h-full before:top-0 before:right-0 pr-5'>
              <DecorativeBanner image="/images/results/condoms.png" />

              <h3 className="text-xl lg:text-2xl font-semibold">
                How Do Condoms Work?
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
                      <strong>Barrier &amp; Protection:</strong> Condoms act as a
                      physical barrier, preventing sperm from entering the
                      uterus.
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
                      <strong>Protection Against STIs:</strong> Condoms are the
                      only contraceptive method that also reduces the risk of
                      sexually transmitted infections.
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold">
                How Effective Are They?
              </h3>

              <p className="text-base text-[#3A3D42]">
                With perfect use, condoms are about 98% effective at preventing
                pregnancy. With typical use they are about 85% effective. Using
                condoms correctly every time you have sex is the best way to
                maximize their effectiveness.
              </p>
            </div>

            {/* Right column */}
            <div className="flex flex-col h-full md:pl-8 space-y-6">
              <h3 className="text-xl lg:text-2xl font-semibold">Benefits</h3>

              <div className="text-base text-[#3A3D42] space-y-3">
                <ul className="list-disc list-inside space-y-1">
                  {[
                    "Helps prevent the transmission of sexually transmitted infections (STIs), including HIV",
                    "Available without prescription and easy to use",
                    "No serious side effects",
                    "Can be used along with other birth control methods for extra protection",
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
                Frequently Asked Questions
              </h3>

              <div className="mt-2 text-base text-[#3A3D42] space-y-2.5">
                {[
                  {
                    q: "Can I get pregnant if a condom breaks?",
                    a: "Yes, there's a risk of pregnancy if a condom breaks. Consider emergency contraception and STI testing if this occurs.",
                  },
                  {
                    q: "Will condoms affect my fertility?",
                    a: "No, condoms have no lasting impact on fertility and can be stopped at any time.",
                  },
                  {
                    q: "Do condoms expire?",
                    a: "Yes — always check the expiry date. Expired condoms are more likely to break.",
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
                Getting Started With Condoms
              </h3>

              <p className="text-base text-[#3A3D42]">
                If you&apos;re interested in using condoms, simply purchase them
                from a pharmacy, supermarket, or online. There is a wide variety
                of sizes, textures, and materials — try different types to find
                what works best for you.
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