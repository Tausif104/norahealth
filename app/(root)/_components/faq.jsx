import AccordionItemWrapper from '@/components/global/accordion-item'
import PrimaryBtn from '@/components/global/primary-btn'
import { Accordion } from '@/components/ui/accordion'
import { faqData } from '@/data/faq'

const Faq = () => {
  return (
    <section className='bg-[#FFF8EF] section-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <div className='grid lg:grid-cols-12 grid-cols-1 gap-[10px]'>
          <div className=' lg:text-left text-center lg:sticky lg:top-[130px] lg:self-start lg:col-span-5 col-span-1 lg:mb-0 mb-4'>
            <h2 className='text-heading xl:text-5xl lg:text-left text-center lg:text-4xl text-2xl  font-semibold leading-[1.3] mb-7'>
              Frequently Asked Questions <br className='lg:block hidden' />{' '}
              (FAQ)
            </h2>
            <PrimaryBtn label='Contact Us' url='/contact' />
          </div>

          <div className='lg:col-span-7 col-span-1'>
            <Accordion
              type='single'
              collapsible
              className='w-full flex flex-col gap-[20px]'
              defaultValue='item-1'
            >
              {faqData.map((item) => (
                <AccordionItemWrapper key={item.id} item={item} />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
