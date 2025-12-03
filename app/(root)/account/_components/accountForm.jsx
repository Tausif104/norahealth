'use client'
import { useState, useEffect } from 'react'
import DateField from '@/components/global/DateField'
import { useActionState } from 'react'
import { createAccountAction } from '@/actions/account.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const AccountForm = () => {
  const router = useRouter()

  const [dob, setDob] = useState(null)
  const [weightDate, setWeightDate] = useState(null)
  const [bpDate, setBpDate] = useState(null)

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    createAccountAction,
    initialState
  )

  useEffect(() => {
    if (state.msg) {
      if (state.success) {
        toast.success(state.msg)
        router.push('/profile')
      } else {
        toast.warning(state.msg)
      }
    }
    state.msg = ''
  }, [state.msg])

  return (
    <form action={action}>
      {/* PERSONAL DETAILS */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* First Name */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='firstName'
          >
            First name
          </label>
          <input
            name='firstname'
            type='text'
            id='firstName'
            placeholder='First name'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* Last Name */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='lastName'
          >
            Last name
          </label>
          <input
            type='text'
            name='lastname'
            id='lastName'
            placeholder='Last name'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* Phone Number */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='phone'
          >
            Phone Number
          </label>
          <input
            type='tel'
            name='phone'
            id='phone'
            placeholder='Phone Number'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* Email */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='email'
          >
            Email address
          </label>
          <input
            name='secondemail'
            type='email'
            id='email'
            placeholder='Email address'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        <input type='hidden' name='dob' value={dob ? dob : ''} />
        <DateField
          id='dob'
          label='Date of Birth'
          selected={dob}
          onChange={setDob}
          name='dob'
          placeholder='27 October 2025'
          className='md:col-span-2'
          bg='bg-[#F6F5F4] border-0'
        />

        {/* NHS Number */}
        <div className='md:col-span-2'>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='nhs'>
            NHS Number (Optional)
          </label>
          <input
            type='text'
            name='nhs'
            id='nhs'
            placeholder='10 Digits NHS Number'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* Address → 75% */}
        <div className='md:col-span-3'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='address'
          >
            Address
          </label>
          <input
            type='text'
            name='address'
            id='address'
            placeholder='Address'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>

        {/* Zip code → 25% */}
        <div className='md:col-span-1'>
          <label className='block text-base mb-2 text-[#0D060C]' htmlFor='zip'>
            Zip code
          </label>
          <input
            type='text'
            name='zip'
            id='zip'
            placeholder='Zip code'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
      </div>

      {/* HEALTH DETAILS title + line */}
      <div className='mt-8 mb-4 flex items-center gap-3'>
        <p className='text-[#1F2122] text-[18px] md:text-[20px] font-semibold'>
          Health Details
        </p>
        <span className='h-[1px] bg-[#F9E4CA] flex-1' />
      </div>

      {/* HEALTH DETAILS */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Weight (25%) */}
        <div className='md:col-span-1'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='weight'
          >
            Weight
          </label>
          <input
            type='text'
            name='weight'
            id='weight'
            placeholder='Kg/stones/pounds'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
        {/* Height (25%) */}
        <div className='md:col-span-1'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='height'
          >
            Height
          </label>
          <input
            type='text'
            name='height'
            id='height'
            placeholder='Cm/feet/inches'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
        <input
          type='hidden'
          name='whdate'
          value={weightDate ? weightDate : ''}
        />

        <DateField
          id='whDate'
          name='whdate'
          label='Weight and Height Checked Date'
          selected={weightDate}
          onChange={setWeightDate}
          placeholder='27 October 2025'
          className='md:col-span-2'
          bg='bg-[#F6F5F4] border-0'
        />
        {/* BP Top (25%) */}
        <div className='md:col-span-1'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='bpTop'
          >
            Blood Pressure (Top)
          </label>
          <input
            type='text'
            name='bptop'
            id='bpTop'
            placeholder='Sys'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
        {/* BP Bottom (25%) */}
        <div className='md:col-span-1'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='bpBottom'
          >
            Blood Pressure (Bottom)
          </label>
          <input
            type='text'
            name='bpbottom'
            id='bpBottom'
            placeholder='Dis'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
        <input type='hidden' name='bpdate' value={bpDate ? bpDate : ''} />
        <DateField
          id='bpDate'
          name='bpdate'
          label='Blood Pressure Date'
          selected={bpDate}
          onChange={setBpDate}
          placeholder='Date checked'
          className='md:col-span-2'
          bg='bg-[#F6F5F4] border-0'
        />
        {/* Medical Conditions (50%) */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='medicalConditions'
          >
            Medical Conditions
          </label>
          <input
            type='text'
            name='medicalconditions'
            id='medicalConditions'
            placeholder='Medical Conditions'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
        {/* Current Medicines (50%) */}
        <div className='md:col-span-2'>
          <label
            className='block text-base mb-2 text-[#0D060C]'
            htmlFor='currentMedicines'
          >
            Current Medicines
          </label>
          <input
            type='text'
            name='currentmedicines'
            id='currentMedicines'
            placeholder='Medicines name'
            className='bg-[#F6F5F4] text-[#3A3D42] placeholder:text-[#3A3D42] w-full py-[18px] px-[16px] rounded-[6px]'
          />
        </div>
        {/* Submit button full row */}
        <div className='md:col-span-4'>
          <button
            type='submit'
            className='text-white bg-theme font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition w-full cursor-pointer'
          >
            {loading ? 'loading' : 'Update Account'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AccountForm
