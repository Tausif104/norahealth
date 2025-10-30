const ChoiceRadio = ({ reason, name }) => {
  return (
    <div key={reason.id}>
      <input
        name={name}
        type='radio'
        id={reason.id}
        className='peer hidden'
        value={reason.value}
      />
      <label
        htmlFor={reason.id}
        className='peer-checked:text-white peer-checked:bg-[#D6866B] hover:bg-[#D6866B] hover:text-white transition duration-100 lg:text-[24px] md:text-[20px] font-semibold text-[#D6866B] bg-[#FFF2EE] w-full flex items-center text-center justify-center md:px-[24px] px-[15px] cursor-pointer rounded-[8px] md:min-h-[120px] min-h-[150px]'
      >
        {reason.value}
      </label>
    </div>
  )
}

export default ChoiceRadio
