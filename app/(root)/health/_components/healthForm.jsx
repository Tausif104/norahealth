'use client'

import { useState, useEffect } from 'react'
import DateField from '@/components/global/DateField'
import { useActionState } from 'react'
import { createHealthAction } from '@/actions/health.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'

const HealthForm = () => {
  const [weightDate, setWeightDate] = useState(null)
  const [bpDate, setBpDate] = useState(null)

  const router = useRouter()

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    createHealthAction,
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
    <>
      <form action={action}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {/* PERSONAL DETAILS */}
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
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-8'>
          {/* Submit button full row */}
          <div className='md:col-span-4'>
            <button
              type='submit'
              className=' text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 w-full cursor-pointer '
            >
              <span className='flex items-center justify-center'>
                {loading ? (
                  <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                    <LoaderIcon
                      role='status'
                      aria-label='Loading'
                      className='size-6 animate-spin mx-auto'
                    />
                  </span>
                ) : (
                  <span>Update Profile</span>
                )}
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default HealthForm
