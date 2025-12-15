const PageBanner = ({ title, update }) => {
  return (
    <section className='bg-[url(/images/page-banner.svg)] xl:py-[100px] py-[50px] bg-cover bg-center'>
      <div className='container custom-container mx-auto'>
        <h1 className='xl:text-[48px] text-[30px] font-bold text-center leading-[1.2]'>
          {title}
        </h1>
        {update && (
          <p className='xl:text-[24px] text-[18px] font-medium text-center leading-[1.2] mt-2'>
            Last update : <span className='text-[#CE8936]'>{update}</span>
          </p>
        )}
      </div>
    </section>
  );
};

export default PageBanner;
