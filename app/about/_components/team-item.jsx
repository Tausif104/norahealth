import Image from 'next/image'

const TeamItem = ({ item }) => {
  return (
    <div className='transition duration-300 hover:-translate-y-3'>
      <Image
        className='w-full'
        src={item.image}
        width={315}
        height={340}
        alt={item.name}
      />
      <div className='bg-white -mt-8 relative mx-[20px] text-center rounded-[8px] shadow-[0_10px_80px_rgba(30,96,221,0.1)] py-3'>
        <h4 className='lg:text-[24px] text-[20px] font-semibold'>
          {item.name}
        </h4>
        <p className='text-pg'>{item.designation}</p>
      </div>
    </div>
  )
}

export default TeamItem
