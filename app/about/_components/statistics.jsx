import { CountingNumber } from '@/components/ui/shadcn-io/counting-number'

const StatisticsBoxes = () => {
  const statistics = [
    {
      id: 1,
      num: 1000,
      suffix: '+',
      text: 'Consultations delivered',
    },
    {
      id: 2,
      num: 98,
      suffix: '%',
      text: 'Customer satisfaction rate',
    },
    {
      id: 3,
      num: 15,
      suffix: '+',
      text: 'Years clinical experience',
    },
  ]

  return (
    <div className='max-w-[985px] lg:px-0 px-[24px] mx-auto section-padding'>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
        {statistics.map((item) => (
          <div
            key={item.id}
            className='shadow-theme rounded-[16px] pt-[20px] lg:pb-[50px] pb-[20px] px-[30px] border-[#CE8936] border-l-2'
          >
            <h2 className='text-theme lg:text-[48px] text-[30px] font-semibold'>
              <CountingNumber
                number={item.num}
                inView={true}
                transition={{ stiffness: 100, damping: 30 }}
              />
              <span className='text-theme lg:text-[48px] text-[30px] font-semibold'>
                {item.suffix}
              </span>
            </h2>
            <p className='text-[#5C616C] font-normal lg:text-[20px] text-[15px]'>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsBoxes
