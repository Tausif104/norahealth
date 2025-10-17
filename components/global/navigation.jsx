import Link from 'next/link'
import { User, ShoppingCart } from 'lucide-react'
import { menuItems } from '@/data/menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-0 cursor-pointer'>
            <span className='text-[#D6866B] w-[40px] h-[40px] border border-[#D6866B] flex items-center justify-center rounded-full hover:bg-[#D6866B] hover:text-white transition'>
              <User width={22} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='font-bold'>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/Settings'>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/log-out'>Log Out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
