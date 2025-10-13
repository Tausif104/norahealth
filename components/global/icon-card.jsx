import Image from 'next/image'

const IconCard = (props) => {
  const { index, img, title, description } = props
  return (
    <div className='rounded-[16px] border border-[#EDEDED] shadow-[0_10px_80px_rgba(30,96,221,0.1)] py-[30px] px-[20px] text-center relative'>
      <span className='text-[#D6866B] text-[80px] absolute top-2 right-2 leading-[1.0] font-bold opacity-10'>
        {index}
      </span>
      <div className='text-center'>
        <Image
          src={img}
          width={80}
          height={80}
          alt={title}
          className='mx-auto'
        />
      </div>
      <div>
        <h4 className='text-heading text-[24px] font-semibold leading-[1.4] mb-5 mt-7'>
          {title}
        </h4>
        <p className='text-pg text-[16px] leading-6'>{description}</p>
      </div>
    </div>
  )
}

export default IconCard
