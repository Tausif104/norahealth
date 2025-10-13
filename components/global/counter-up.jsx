import { CountingNumber } from '../ui/shadcn-io/counting-number'

const CounterUpBox = (props) => {
  const { num, label, prefix, suffix } = props

  return (
    <div className='border border-[#EDEDED] inline-block rounded-[16px] px-7 py-4  shadow-[0_10px_80px_rgba(30,96,221,0.1)]'>
      <span className='flex items-center'>
        {prefix && (
          <span className='text-theme text-4xl font-semibold'>{prefix}</span>
        )}
        <CountingNumber
          className='text-theme text-5xl font-semibold'
          number={num}
          inView={true}
          transition={{ stiffness: 100, damping: 30 }}
        />
        {suffix && (
          <span className='text-theme text-4xl font-semibold'>{suffix}</span>
        )}
      </span>
      <p className='text-[#5C616C] text-[20px] mt-2'>{label}</p>
    </div>
  )
}

export default CounterUpBox
