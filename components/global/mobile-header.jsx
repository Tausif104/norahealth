import { Mail, Phone, User, LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/data/menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { loggedInUserAction, logoutAction } from "@/actions/user.action";

const MobileHeader = async () => {
  const payload = await loggedInUserAction();
  const isAdmin = payload?.payload?.isAdmin;
  return (
    <header className='block lg:hidden'>
      {/* announcement bar */}
      <div className='px-[24px] bg-theme py-[10px]'>
        <div className='flex  justify-between'>
          <div className='flex items-center gap-2'>
            <span className='bg-[#ffffff30] bg-opacity-50 w-[25px] h-[25px] rounded-full flex justify-center items-center '>
              <Mail className='text-white' width={13} />
            </span>
            <a
              href='mailto:thepharmaclinic@gmail.com'
              className='text-white cursor-pointer text-[12px]'
            >
              thepharmaclinic@gmail.com
            </a>
          </div>
          <div className='flex items-center gap-2'>
            <span className='bg-[#ffffff30] bg-opacity-50 w-[25px] h-[25px] rounded-full flex justify-center items-center'>
              <Phone className='text-white' width={13} />
            </span>
            <a
              href='mailto:02086797198'
              className='text-white cursor-pointer text-[12px]'
            >
              0208 679 7198
            </a>
          </div>
        </div>
      </div>

      {/* header */}
      <div className='px-[24px] py-[12px] bg-[#F4E7E1]'>
        <div className='flex items-center justify-between'>
          <div className='site-logo'>
            <Link href='/'>
              <Image
                src='/images/logo.svg'
                width={256}
                height={50}
                alt='Nora Health'
                className='max-w-[150px]'
              />
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            <Image
              src='/images/australia.svg'
              width={40}
              height={40}
              alt='Australia'
              className='w-[40px] max-w-[40px]'
            />

            {payload?.payload?.email ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className='focus:outline-0'>
                    <span className='text-[#D6866B] w-[40px] h-[40px] border border-[#D6866B] flex items-center justify-center rounded-full hover:bg-[#D6866B] hover:text-white transition'>
                      <User width={22} />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel className='font-bold'>
                      {payload?.payload?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isAdmin ? (
                      <DropdownMenuItem>
                        <Link href='/admin'>Admin</Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Link href='/profile'>Profile</Link>
                      </DropdownMenuItem>
                    )}

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
              </div>
            ) : (
              <>
                <Link
                  href='/login'
                  className='text-[#D6866B] w-[40px] h-[40px] border border-[#D6866B] flex items-center justify-center rounded-full hover:bg-[#D6866B] hover:text-white transition'
                >
                  <LogInIcon width={22} />
                </Link>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className='focus:outline-0'>
                <Image
                  src='/images/hamburger.svg'
                  width={40}
                  height={40}
                  alt='Hamburder'
                  className='min-w-[40px]'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='font-bold'>
                  Navigation
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.id}>
                    <Link href={item.link}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
