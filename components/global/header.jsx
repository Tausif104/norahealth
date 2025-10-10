import Image from 'next/image'
import Link from 'next/link'
import Navigation from './navigation'
import { Mail, Phone } from 'lucide-react'

const Header = () => {
  return (
    <header>
      <div className='bg-color-theme py-2 '>
        <div className='container custom-container mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h3 className='text-white'>Language</h3>
            <div className='flex items-center gap-1'>
              <Image
                src='/images/australia.svg'
                width={20}
                height={20}
                alt='Australia'
              />
              <Image
                src='/images/china.svg'
                width={20}
                height={20}
                alt='China'
              />
              <Image
                src='/images/portugal.svg'
                width={20}
                height={20}
                alt='Portugal'
              />
              <Image
                src='/images/japan.svg'
                width={20}
                height={20}
                alt='japan'
              />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <span className='bg-[#ffffff30] bg-opacity-50 w-[25px] h-[25px] rounded-full flex justify-center items-center'>
                <Mail className='text-white' width={13} />
              </span>
              <a
                href='mailto:thepharmaclinic@gmail.com'
                className='text-white cursor-pointer'
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
                className='text-white cursor-pointer'
              >
                0208 679 7198
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#F4E7E1] py-3'>
        <div className='container custom-container mx-auto flex items-center justify-between'>
          <div className='site-logo'>
            <Link href='/'>
              <Image
                src='/images/logo.svg'
                width={256}
                height={50}
                alt='Nora Health'
              />
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
