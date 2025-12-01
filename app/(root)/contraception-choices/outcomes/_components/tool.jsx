import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Tool = ({ img, name, url }) => {
  return (
    <div>
      <div className='bg-white p-[15px] rounded-[16px]'>
        <div className='sm:mt-[55px] my-5'>
          <Link href={url}>
            <Image
              src={img}
              width={250}
              height={170}
              alt={name}
              className='mx-auto object-contain md:max-h-[170px] max-h-[80px]'
            />
          </Link>
        </div>
        <div className='sm:flex hidden flex-col items-end'>
          <Link
            href={url}
            className='bg-[#D6866B]  w-[48px] h-[48px] flex items-center justify-center rounded-full -rotate-45 hover:rotate-0 transtion duration-300'
          >
            <ArrowRight className='text-white ' />
          </Link>
        </div>
      </div>
      <h3 className='text-center font-semibold md:text-[24px] text-[16px] mt-4'>
        {name}
      </h3>
    </div>
  )
}

export default Tool
