import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const AccordionItemWrapper = ({ item }) => {
  const { id, title, body } = item

  return (
    <AccordionItem
      value={`item-${id}`}
      className='group border border-[#D6866B] md:p-[24px] p-[10px] rounded-[8px] last:border-[#D6866B] last:border data-[state=open]:bg-[#CD8936]'
    >
      <AccordionTrigger className='hover:no-underline cursor-pointer p-0 flex items-center accordion-trigger'>
        <h3 className='md:text-[20px] text-[16px] font-semibold text-heading group-data-[state=open]:text-white'>
          <span className='text-[#3A3D42] opacity-50 font-bold mr-2 group-data-[state=open]:text-white'>
            {id}
          </span>
          {title}
        </h3>
      </AccordionTrigger>
      <AccordionContent className='flex flex-col gap-4 text-balance pb-0 mt-3'>
        <p className='md:text-[16px] text-[14px] leading-[1.6] group-data-[state=open]:text-white font-medium'>
          {body}
        </p>
      </AccordionContent>
    </AccordionItem>
  )
}

export default AccordionItemWrapper
