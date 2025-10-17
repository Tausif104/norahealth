import Link from 'next/link'
import { User, ShoppingCart } from 'lucide-react'
import { menuItems } from '@/data/menu'

const Navigation = () => {
  return (
    <nav className='flex items-center gap-6'>
      <ul className='flex items-center gap-6'>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              className='font-medium xl:text-[16px] lg:text-[14px] text-[16px]'
              href={item.link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex items-center gap-2'>
        <Link
          href='/user'
          className='text-[#D6866B] w-[48px] h-[48px] border border-[#D6866B] flex items-center justify-center rounded-full hover:bg-[#D6866B] hover:text-white transition'
        >
          <User width={22} />
        </Link>

        <Link
          href='/order'
          className='bg-transparent text-[#D6866B] border border-[#D6866B] rounded-full hover:bg-[#D6866B] hover:text-white py-3 text-[16px] flex px-4 gap-2 font-medium transition'
        >
          <ShoppingCart width={22} /> <span>Order</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
