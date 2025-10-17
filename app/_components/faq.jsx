import AccordionItemWrapper from '@/components/global/accordion-item'
import PrimaryBtn from '@/components/global/primary-btn'
import { Accordion } from '@/components/ui/accordion'
import { faqData } from '@/data/faq'

const Faq = () => {
  return (
    <section className='bg-[#FFF8EF] section-padding'>
      <div className='container custom-container mx-auto'>
        <div className='grid grid-cols-12 gap-[10px]'>
          <div className='sticky top-[130px] self-start col-span-5'>
            <h2 className='text-heading text-5xl font-semibold leading-[1.3] mb-7'>
              Frequently Asked Questions <br /> (FAQ)
            </h2>
            <PrimaryBtn label='Contact Us' url='/contact' />
          </div>

          <div className='col-span-7 '>
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
