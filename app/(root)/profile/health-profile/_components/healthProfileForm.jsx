'use client'

import DateField from '@/components/global/DateField'
import { formatDate } from '@/lib/utils'
import { LoaderIcon, PanelLeft } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { updatehealthAction } from '@/actions/health.action'
import { toast } from 'sonner'

const HealthProfileForm = ({ health }) => {
  const [whDate, setWHDate] = useState(null)
  const [bpDate, setBPDate] = useState(null)

  const {
    userId,
    weight,
    height,
    weightHeightCheckDate,
    bpCheckDate,
    bpTop,
    bpBottom,
    medicalConditions,
    currentMedicines,
  } = health

  console.log(health)

  const accountInitialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    updatehealthAction,
    accountInitialState
  )

  useEffect(() => {
    if (!state.msg) return

    if (state.success) {
      toast.success(state.msg)
    } else {
      toast.warning(state.msg)
    }
    state.msg = ''
  }, [state.msg])

  return (
    <>
      <div className='flex-1 space-y-6 p-[24px] md:p-[50px]'>
        {/* Header */}
        <div className='flex items-center gap-[50px]'>
          <button
            onClick={() => setMenuOpen(true)}
            className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full'
          >
            <PanelLeft />
          </button>
        </div>

        {/* FORM */}
        <form className='space-y-6' action={action}>
          <input type='hidden' name='userId' value={userId} />
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {/* First / Last name */}
            <div className='col-span-4'>
              <h2 className='text-theme text-2xl font-semibold'>
                Health Profile
              </h2>
            </div>
            <div className='md:col-span-1'>
              <label
                htmlFor='weight'
                className='block text-base mb-2 text-[#0D060C]'
              >
                Weight
              </label>
              <input
                id='weight'
                type='text'
                defaultValue={weight}
                name='weight'
                placeholder='Kg/stones/pounds'
                className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
              />
            </div>
            <div className='md:col-span-1'>
              <label
                htmlFor='height'
                className='block text-base mb-2 text-[#0D060C]'
              >
                Height
              </label>
              <input
                id='height'
                type='text'
                defaultValue={height}
                name='height'
                placeholder='Cm/feet/inches'
                className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
              />
            </div>

            <input
              type='hidden'
              name='whdate'
              value={whDate ? whDate : weightHeightCheckDate}
            />
            <DateField
              id='wh-date'
              label='Weight Height Check Date'
              selected={whDate}
              onChange={setWHDate}
              placeholder={formatDate(weightHeightCheckDate)}
              className='md:col-span-2 '
              name='whdate'
              bg='bg-white border border-[#EEE0CF] text-black'
            />

            {/* Blood pressure */}
            <div className='md:col-span-1'>
              <label
                htmlFor='bp-top'
                className='block text-base mb-2 text-[#0D060C]'
              >
                Blood Pressure Top
              </label>
              <input
                id='bp-top'
                type='text'
                defaultValue={bpTop}
                name='bptop'
                placeholder='BP Top'
                className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
              />
            </div>

            <div className='md:col-span-1'>
              <label
                htmlFor='bp-bottom'
                className='block text-base mb-2 text-[#0D060C]'
              >
                Blood Pressure Bottom
              </label>
              <input
                id='bp-bottom'
                type='text'
                defaultValue={bpBottom}
                name='bpbottom'
                placeholder='BP Bottom'
                className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
              />
            </div>

            <input
              type='hidden'
              name='bpdate'
              value={bpDate ? bpDate : bpCheckDate}
            />
            <DateField
              id='bp-check-date'
              label='BP Check Date'
              selected={bpDate}
              onChange={setBPDate}
              placeholder={formatDate(bpCheckDate)}
              className='md:col-span-2 '
              name='bpdate'
              bg='bg-white border border-[#EEE0CF] text-black'
            />

            {/* Medical conditions / Medicines */}
            <div className='md:col-span-2'>
              <label
                htmlFor='med-con'
                className='block text-base mb-2 text-[#0D060C]'
              >
                Medical Conditions
              </label>
              <input
                id='med-con'
                type='text'
                defaultValue={medicalConditions}
                name='medicalconditions'
                placeholder='Medical Conditions'
                className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
              />
            </div>

            <div className='md:col-span-2'>
              <label
                htmlFor='current-med'
                className='block text-base mb-2 text-[#0D060C]'
              >
                Current Medicines
              </label>
              <input
                id='current-med'
                type='text'
                defaultValue={currentMedicines}
                name='currentmedicines'
                placeholder='Current Medicines'
                className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
              />
            </div>

            {/* Save button */}
            <div className='md:col-span-4'>
              <button
                type='submit'
                className=' text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 sm:min-w-[200px] min-w-full cursor-pointer '
                disabled={loading}
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
      </div>
    </>
  )
}

export default HealthProfileForm
