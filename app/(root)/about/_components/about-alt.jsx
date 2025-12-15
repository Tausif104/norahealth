import PrimaryBtn from "@/components/global/primary-btn";
import Image from "next/image";

const AboutAlt = () => {
  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <div className='grid md:grid-cols-4 grid-cols-1 items-center'>
          <div className='col-span-2 md:order-first order-last'>
            <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl  font-semibold'>
              About Nora Health
            </h2>
            <div className='mt-5 mb-8'>
              <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:mb-2 mb-1'>
                At Norahealth, we believe contraception should be simple, safe,
                and stigma-free.
              </p>
              <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:mb-2 mb-1'>
                Our trusted online services connect patients with a clinical
                team of experienced pharmacists and doctors — with over 15 years
                of expertise in women's health. We know that everyone's
                different. That's why our advice is{" "}
                <span className='text-theme'>personal</span>,{" "}
                <span className='text-theme'>inclusive</span>, and{" "}
                <span className='text-theme'>culturally sensitive</span> — so
                you feel heard, respected, and supported every step of the way.
              </p>
              <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg lg:mb-2 mb-1'>
                We will not be stopping there however - Nora Health plans to
                expand to support women across every stage of life, from
                contraception to menopause. Whether you're seeking advice or
                treatment our mission is to empower you with compassionate,
                accessible healthcare.
              </p>
            </div>
            <div>
              <PrimaryBtn url='/booking' label='Order Now' />
            </div>
          </div>
          <div className='col-span-2 md:mb-0 mb-4'>
            <Image
              src='/images/about-alt-thumbnail.svg'
              alt='About Thumbnail'
              width={625}
              height={530}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAlt;
