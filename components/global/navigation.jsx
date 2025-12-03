import Link from 'next/link'
import { User, LogInIcon } from 'lucide-react'
import { menuItems } from '@/data/menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { loggedInUserAction, logoutAction } from '@/actions/user.action'

const Navigation = async () => {
  const payload = await loggedInUserAction()

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
        {payload?.payload ? (
          <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-0 cursor-pointer'>
              <span className='text-[#D6866B] w-[40px] h-[40px] border border-[#D6866B] flex items-center justify-center rounded-full hover:bg-[#D6866B] hover:text-white transition'>
                <User width={22} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel className='font-bold'>
                {payload?.payload?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action={logoutAction}>
                  <button
                    type='submit'
                    className='w-full text-left cursor-pointer'
                  >
                    Log Out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href='/login'
            className='bg-transparent text-[#D6866B] border border-[#D6866B] rounded-full hover:bg-[#D6866B] hover:text-white py-2 text-[16px] flex px-4 gap-2 font-medium transition'
          >
            <LogInIcon width={15} /> <span>Log In</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation
