import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const menuItems = [
    {
      id: 1,
      label: 'Home',
      link: '/',
    },
    {
      id: 2,
      label: 'About Us',
      link: '/about-us',
    },
    {
      id: 3,
      label: 'Get Contraception',
      link: '/get-contraception',
    },
    {
      id: 4,
      label: 'Contraception Choices',
      link: '/contraception-choices',
    },
    {
      id: 5,
      label: 'Contact us',
      link: '/contact-us',
    },
  ]

  return (
    <footer>
      <div
        className='2xl:pt-[130px] sm:pt-[60px] pt-[60px] pb-[110px] bg-cover bg-bottom'
        style={{ backgroundImage: `url(/images/footer-bg.svg)` }}
      >
        <div className='container custom-container mx-auto'>
          <div className='text-center'>
            <Image
              src='/images/footer-logo.svg'
              width={340}
              height={65}
              alt='Footer Logo'
              className='mx-auto'
            />
          </div>

          <div className='py-[25px]'>
            <ul className='flex items-center justify-center gap-6 2xl:flex-row xl:flex-row sm:flex-col flex-col'>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    className='text-white font-medium hover:underline hover:underline-offset-2'
                    href={item.link}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex justify-center items-center gap-3'>
            <a href='#' className='hover:opacity-60 transition'>
              <Image
                src='/images/social/facebook.svg'
                width={40}
                height={40}
                alt='facebook'
              />
            </a>
            <a href='#' className='hover:opacity-60 transition'>
              <Image
                src='/images/social/x.svg'
                width={40}
                height={40}
                alt='facebook'
              />
            </a>
            <a href='#' className='hover:opacity-60 transition'>
              <Image
                src='/images/social/instagram.svg'
                width={40}
                height={40}
                alt='facebook'
              />
            </a>
            <a href='#' className='hover:opacity-60 transition'>
              <Image
                src='/images/social/youtube.svg'
                width={40}
                height={40}
                alt='facebook'
              />
            </a>
          </div>
        </div>
      </div>

      <div className='bg-[#3F1836] py-4'>
        <div className='container custom-container mx-auto'>
          <p className='text-white opacity-80 text-center 2xl:text-[16px] xl:text-[16px] text-[14px]'>
            Copywriting all rights reserved &copy; 2025 NoraHelth
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
