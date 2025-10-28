import Image from 'next/image'

const ContactInfo = () => {
  return (
    <div className='bg-[#FFF4EF] md:py-[32px] py-[20px] md:px-[40px] px-[20px] rounded-[16px] min-h-full flex flex-col justify-between'>
      <div>
        <h2 className='text-heading font-semibold md:text-[32px] text-[20px] md:mb-[30px] mb-[20px]'>
          Contact us
        </h2>
        <div>
          <div className='flex items-center gap-[15px] border-b border-[#E9D4BB] pb-[20px] mb-[20px]'>
            <Image
              src='/images/icons/envelope.svg'
              alt='email'
              width={46}
              height={46}
            />

            <div>
              <h4 className='text-theme text-[18px] font-semibold'>Email</h4>
              <p>
                <a href='mailto:thepharmaclinic@gmail.com' className='text-pg'>
                  thepharmaclinic@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className='flex items-center gap-[15px]'>
            <Image
              src='/images/icons/phone.svg'
              alt='email'
              width={46}
              height={46}
            />

            <div>
              <h4 className='text-theme text-[18px] font-semibold'>Phone</h4>
              <p>
                <a href='tel:thepharmaclinic@gmail.com' className='text-pg'>
                  0208 679 7198
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <Image
          src='/images/contact.png'
          width={490}
          height={310}
          alt='Contact Image'
          className='w-full'
        />
      </div>
    </div>
  )
}

export default ContactInfo
