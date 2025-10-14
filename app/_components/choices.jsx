const ChoicesSection = () => {
  return (
    <section className='section-padding bg-[#FFF8EF]'>
      <div className='container custom-container mx-auto'>
        <div>
          <h2 className='text-heading text-5xl font-semibold text-center mb-[15px]'>
            Contraception Choices
          </h2>
          <p className='text-[24px] text-pg text-center'>
            Not sure which option is right for you?
          </p>
        </div>
        <div className='mt-[50px]'>
          <div className='grid grid-cols-2 gap-8'>
            <div className='bg-[url(/images/choice-one.png)] h-[485px] bg-cover bg-center flex items-end justify-center pb-[25px] px-[40px] border border-[#FFF4EF] hover:border-[#CD8936] rounded-[16px] transition duration-300 group cursor-pointer'>
              <div className='bg-[#FFF4EF] w-full text-center p-[20px] rounded-[8px] group-hover:bg-[#CD8936] transition duration-300'>
                <h3 className='text-[24px] font-semibold group-hover:text-white transition duration-300'>
                  Combined Oral Contraceptive Pills
                </h3>
              </div>
            </div>
            <div className='bg-[url(/images/choice-two.png)] h-[485px] bg-cover bg-center flex items-end justify-center pb-[25px] px-[40px] border border-[#FFF4EF] hover:border-[#CD8936] rounded-[16px] transition duration-300 group cursor-pointer'>
              <div className='bg-[#FFF4EF] w-full text-center p-[20px] rounded-[8px] group-hover:bg-[#CD8936] transition duration-300'>
                <h3 className='text-[24px] font-semibold group-hover:text-white transition duration-300'>
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
