const ChoicesSection = () => {
  return (
    <section className='section-padding bg-[#FFF8EF] sm:px-0 px-[24px]'>
      <div className='container custom-container mx-auto'>
        <div>
          <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl font-semibold text-center md:mb-[15px] mb-[10px]'>
            Contraception Choices
          </h2>
          <p className='2xl:text-[24px] xl:text-[24px] lg:text-[20px] text-[14px] text-pg text-center'>
            Not sure which option is right for you?
          </p>
        </div>
        <div className='md:mt-[50px] mt-[30px]'>
          <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4'>
            <div className='bg-[url(/images/choice-one.png)] lg:h-[485px] h-[320px] bg-cover bg-center flex items-end justify-center md:pb-[25px] pb-[20px] md:px-[40px] px-[20px] border border-[#FFF4EF] hover:border-[#CD8936] rounded-[16px] transition duration-300 group cursor-pointer'>
              <div className='bg-[#FFF4EF] w-full text-center p-[10px] rounded-[8px] group-hover:bg-[#CD8936] transition duration-300'>
                <h3 className='md:text-[24px] text-[16px] font-semibold group-hover:text-white transition duration-300'>
                  Combined Oral Contraceptive Pills
                </h3>
              </div>
            </div>
            <div className='bg-[url(/images/choice-two.png)] lg:h-[485px] h-[320px] bg-cover bg-center flex items-end justify-center md:pb-[25px] pb-[20px] md:px-[40px] px-[20px] border border-[#FFF4EF] hover:border-[#CD8936] rounded-[16px] transition duration-300 group cursor-pointer'>
              <div className='bg-[#FFF4EF] w-full text-center p-[10px] rounded-[8px] group-hover:bg-[#CD8936] transition duration-300'>
                <h3 className='md:text-[24px] text-[16px] font-semibold group-hover:text-white transition duration-300'>
                  Progestogen-Only Pills
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChoicesSection
