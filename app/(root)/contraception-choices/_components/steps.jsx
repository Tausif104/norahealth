const StepsCount = ({ step }) => {
  return (
    <>
      <div className='flex justify-center gap-5'>
        <span
          className={`bg-[#F4E7E1] text-[#A3A3A3] w-[50px] h-[50px] flex text-[24px] font-semibold items-center justify-center rounded-full ${
            step > 0 && 'bg-theme text-white'
          }`}
        >
          1
        </span>
        <span
          className={`bg-[#F4E7E1] text-[#A3A3A3] w-[50px] h-[50px] flex text-[24px] font-semibold items-center justify-center rounded-full ${
            step > 1 && 'bg-theme text-white'
          }`}
        >
          2
        </span>
        <span
          className={`bg-[#F4E7E1] text-[#A3A3A3] w-[50px] h-[50px] flex text-[24px] font-semibold items-center justify-center rounded-full ${
            step > 2 && 'bg-theme text-white'
          }`}
        >
          3
        </span>
        <span
          className={`bg-[#F4E7E1] text-[#A3A3A3] w-[50px] h-[50px] flex text-[24px] font-semibold items-center justify-center rounded-full ${
            step > 3 && 'bg-theme text-white'
          }`}
        >
          4
        </span>
        <span
          className={`bg-[#F4E7E1] text-[#A3A3A3] w-[50px] h-[50px] flex text-[24px] font-semibold items-center justify-center rounded-full ${
            step > 4 && 'bg-theme text-white'
          }`}
        >
          5
        </span>
      </div>
    </>
  )
}

export default StepsCount
