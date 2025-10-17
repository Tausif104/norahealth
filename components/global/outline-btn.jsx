import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const OutlineBtn = (props) => {
  const { label, url } = props
  return (
    <Link
      className='text-theme inline-block border border-[#CD8936] bg-transparent text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] hover:border-[#491F40] transition group duration-300 sm:w-auto w-full'
      href={url}
    >
      <span className='flex items-center justify-center'>
        <span className='group-hover:text-white transition'>{label}</span>
        <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
          <ArrowRight className='group-hover:text-white transition' />
        </span>
      </span>
    </Link>
  )
}

export default OutlineBtn
