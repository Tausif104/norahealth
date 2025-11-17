const Oral = () => {
  return (
    <div>
      <div className='bg-white p-[15px] rounded-[16px]'>
        <div className='mt-[55px]'>
          <Link href='/'>
            <Image
              src='/images/tools/oral.png'
              width={250}
              height={170}
              alt='Copper IUD'
              className='mx-auto object-contain max-h-[170px]'
            />
          </Link>
        </div>
        <div className='flex flex-col items-end'>
          <Link
            href='/'
            className='bg-[#D6866B]  w-[48px] h-[48px] flex items-center justify-center rounded-full -rotate-45 hover:rotate-0 transtion duration-300'
          >
            <ArrowRight className='text-white ' />
          </Link>
        </div>
      </div>
      <h3 className='text-center font-semibold text-[24px] mt-4'>Condoms</h3>
    </div>
  )
}

export default Oral
