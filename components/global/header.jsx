import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation";

import MobileHeader from "./mobile-header";
import HeaderTop from "./header-top";

const Header = () => {
  return (
    <>
      <MobileHeader />
      <header className='lg:block hidden'>
        <HeaderTop />
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
    </>
  );
};

export default Header;
