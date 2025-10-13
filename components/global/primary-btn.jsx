import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const PrimaryBtn = (props) => {
  const { label, url } = props

  return (
    <Link
      className='text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300'
      href={url}
    >
      <span className='flex items-center'>
        <span>{label}</span>
        <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
          <ArrowRight />
        </span>
      </span>
    </Link>
  )
}

export default PrimaryBtn
