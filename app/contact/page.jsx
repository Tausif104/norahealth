import PageBanner from '@/components/global/page-banner'
import ContactInfo from './_components/contact-info'

const ContactPage = () => {
  return (
    <>
      <PageBanner title='Contact Us' />
      <div className='container custom-container mx-auto section-padding'>
        <div className='grid grid-cols-5 sm:px-0 px-[24px]'>
          <div className='col-span-2'>
            <ContactInfo />
          </div>
          <div className='col-span-3'>Get in touch</div>
        </div>
      </div>
    </>
  )
}

export default ContactPage
