import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const menuItems = [
    {
      id: 1,
      label: "Home",
      link: "/",
    },
    {
      id: 2,
      label: "About Us",
      link: "/about",
    },
    {
      id: 3,
      label: "Make an Appointment",
      link: "/booking",
    },
    {
      id: 4,
      label: "Contraception Choices",
      link: "/contraception-choices/begin",
    },
    {
      id: 5,
      label: "Policy",
      link: "/legal-policies",
    },
    {
      id: 6,
      label: "Contact us",
      link: "/contact",
    },
  ];

  return (
    <footer>
      <div className='2xl:pt-[130px] sm:pt-[60px] pt-[60px] md:pb-[110px] pb-[50px] bg-cover bg-bottom sm:bg-[url(/images/footer-bg.svg)] bg-[url(/images/footer-bg-mobile.png)]'>
        <div className='container custom-container mx-auto'>
          <div className='text-center'>
            <Image
              src='/images/footer-logo.svg'
              width={340}
              height={65}
              alt='Footer Logo'
              className='mx-auto md:max-w-[340px] max-w-[200px]'
            />
          </div>

          <div className='py-[25px] sm:px-0 px-[24px]'>
            <ul className='md:flex items-center grid grid-cols-2 justify-center md:gap-6 gap-3'>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    className='text-white md:text-[16px] text-[14px] font-medium hover:underline hover:underline-offset-2'
                    href={item.link}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='hidden justify-center items-center gap-3'>
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
  );
};

export default Footer;
