import PageBanner from "@/components/global/page-banner";
import ContactInfo from "./_components/contact-info";

import Faq from "../_components/faq";
import GetInTouch from "./_components/get-in-touch";

export const metadata = {
  title: "Contact Us",
  description: "Contact Us",
};

const ContactPage = () => {
  return (
    <>
      <PageBanner title='Contact Us' />
      <div className='container custom-container mx-auto section-padding'>
        <div className='grid lg:grid-cols-5 grid-cols-1 gap-[30px] sm:px-0 px-[24px]'>
          <div className='lg:col-span-2 col-span-1'>
            <ContactInfo />
          </div>
          <div className='lg:col-span-3 col-span-1'>
            <GetInTouch />
          </div>
        </div>
      </div>
      <Faq />
    </>
  );
};

export default ContactPage;
