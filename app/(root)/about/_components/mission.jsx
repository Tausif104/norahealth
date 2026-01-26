"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Mission = () => {
  return (
    <section className="bg-[#FFF8EF] section-padding">
      <div className="container custom-container mx-auto">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-7 sm:px-0 px-[24px]">
          {/* Left image */}
          <div className="md:col-span-5 col-span-1">
            <Image
              src="/images/mission-thumb.svg"
              width={600}
              height={530}
              alt="Mission Thumb"
              className="w-full h-full object-cover rounded-[12px]"
            />
          </div>

          {/* Right accordion */}
          <div className="md:col-span-7 col-span-1">
            <div className="flex flex-col gap-7">
              <Accordion
                type="single"
                collapsible={false} // ✅ always one open
                defaultValue="mission" // ✅ mission open by default
                className="flex flex-col gap-7"
              >
                {/* Mission */}
                <AccordionItem
                  value="mission"
                  className="group border-none rounded-[12px] overflow-hidden bg-[#F6ECE3] data-[state=open]:bg-[#CD8936] transition-colors duration-300"
                >
                  <AccordionTrigger className="px-[20px] py-[20px] hover:no-underline w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/icons/mission.svg"
                          width={45}
                          height={45}
                          alt="Mission"
                          className="group-data-[state=open]:[filter:brightness(0)_invert(1)]"
                        />
                        <span className="md:text-[32px] text-[24px] text-[#0D060C] font-semibold group-data-[state=open]:text-white transition-colors">
                          Our Mission
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-[20px] pb-[20px]">
                    <p className="2xl:text-[18px] xl:text-[18px] text-[16px] text-pg group-data-[state=open]:text-white transition-colors">
                      Nora Health exists to improve the quality and accessibility
                      of care available to women. We are building a service that
                      is private, compassionate, and genuinely responsive to
                      women’s needs.
                    </p>

                    <h3 className="xl:text-[22px] text-[18px] font-bold py-2 text-pg group-data-[state=open]:text-white transition-colors">
                      How We Deliver Our Mission
                    </h3>

                    <ul className="space-y-4">
                      <li className="2xl:text-[18px] xl:text-[18px] text-[16px] text-pg group-data-[state=open]:text-white transition-colors">
                        <span className="font-semibold">
                          Free, private contraceptive consultations
                        </span>
                        <br />
                        Confidential conversations with qualified clinicians to
                        help women explore their contraceptive options with
                        clarity and confidence.
                      </li>

                      <li className="2xl:text-[18px] xl:text-[18px] text-[16px] text-pg group-data-[state=open]:text-white transition-colors">
                        <span className="font-semibold">
                          Free, discreet delivery of contraceptive medicines
                        </span>
                        <br />
                        Medication delivered directly to patients in a way that
                        protects privacy and removes barriers to access.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Vision */}
                <AccordionItem
                  value="vision"
                  className="group border-none rounded-[12px] overflow-hidden bg-[#F6ECE3] data-[state=open]:bg-[#CD8936] transition-colors duration-300"
                >
                  <AccordionTrigger className="px-[20px] py-[20px] hover:no-underline w-full">
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/icons/vision.svg"
                          width={45}
                          height={45}
                          alt="Vision"
                          className="group-data-[state=open]:[filter:brightness(0)_invert(1)]"
                        />
                        <span className="md:text-[32px] text-[24px] text-pg font-semibold group-data-[state=open]:text-white transition-colors">
                          Our Vision
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-[20px] pb-[20px]">
                    <p className="2xl:text-[18px] xl:text-[18px] text-[16px] text-pg group-data-[state=open]:text-white transition-colors">
                      Building upon our existing work, we plan to create a
                      future where women can access holistic, evidence based
                      healthcare with dignity, ease, and confidence.
                    </p>

                    <h3 className="xl:text-[22px] text-[18px] font-bold py-2 text-pg group-data-[state=open]:text-white transition-colors">
                      What We’re Working Toward
                    </h3>

                    <ul className="space-y-4">
                      <li className="2xl:text-[18px] xl:text-[18px] text-[16px] text-pg group-data-[state=open]:text-white transition-colors">
                        <span className="font-semibold">
                          Holistic HRT and menopause care
                        </span>
                        <br />
                        A comprehensive service supporting women through
                        perimenopause and menopause with personalised, evidence
                        based care.
                      </li>

                      <li className="2xl:text-[18px] xl:text-[18px] text-[16px] text-pg group-data-[state=open]:text-white transition-colors">
                        <span className="font-semibold">
                          Partnerships with women’s health charities
                        </span>
                        <br />
                        Collaborations that amplify the work of trusted
                        organisations, extend our reach, and strengthen the
                        ecosystem of support available to women.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
