const ChoiceCheckBox = ({ item, name }) => {
  return (
    <div key={item.id}>
      <input
        name={name}
        type='checkbox'
        id={item.id}
        className='peer hidden'
        value={item.value}
      />
      <label
        htmlFor={item.id}
        className='peer-checked:text-white peer-checked:bg-[#D6866B] hover:bg-[#D6866B] hover:text-white transition duration-100 lg:text-[24px] md:text-[20px] font-semibold text-[#D6866B] bg-[#FFF2EE] w-full flex items-center text-center justify-center md:px-[24px] px-[15px] cursor-pointer rounded-[8px] md:min-h-[120px] min-h-[150px]'
      >
        {item.value}
      </label>
    </div>
  )
}

export default ChoiceCheckBox
