const PageBanner = ({ title, update, subTitle, subTitle2, subTitle3 }) => {
  return (
    <section className='bg-[url(/images/page-banner.svg)] xl:py-[100px] py-[50px] bg-cover bg-center'>
      <div className='container custom-container mx-auto'>
        <h1 className='xl:text-[48px] text-[30px] font-bold text-center leading-[1.2] max-w-[800px] mx-auto'>
          {title}
        </h1>
        {update && (
          <p className='xl:text-[24px] text-[18px] font-medium text-center leading-[1.2] mt-2'>
            Last update : <span className='text-[#CE8936]'>{update}</span>
          </p>
        )}
        <div className='space-y-2'>
          {subTitle && (
            <p className='xl:text-[20px] text-[16px] font-medium text-center leading-[1.2] mt-2 max-w-[900px] mx-auto'>
              {subTitle}
            </p>
          )}
          {subTitle2 && (
            <p className='xl:text-[20px] text-[16px] font-medium text-center leading-[1.2] mt-2 max-w-[900px] mx-auto'>
              {subTitle2}
            </p>
          )}
          {subTitle3 && (
            <p className='xl:text-[20px] text-[16px] font-medium text-center leading-[1.2] mt-2 max-w-[900px] mx-auto'>
              {subTitle3}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
