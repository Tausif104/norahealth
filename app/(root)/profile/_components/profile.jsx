'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, PanelLeft, SquarePen } from 'lucide-react'
import DateField from '@/components/global/DateField'
import { useProfile } from '@/lib/profileContext'
import { formatDate } from '@/lib/utils'
import { useActionState } from 'react'
import { updateAccountAction } from '@/actions/account.action'
import { toast } from 'sonner'

const Profile = ({ account }) => {
  const [dob, setDob] = useState(null)
  const { setMenuOpen } = useProfile()
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedImage(URL.createObjectURL(file))
    }
  }

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    updateAccountAction,
    initialState
  )

  const {
    userId,
    firstName,
    lastName,
    dob: dateOfBirth,
    secondEmail,
    phoneNumber,
    nhsNumber,
    address,
    zipCode,
    weight,
    height,
    weightHeightCheckDate,
    bpTop,
    bpBottom,
    bpCheckDate,
    medicalConditions,
    currentMedicines,
  } = account

  console.log(account)

  useEffect(() => {
    if (state.msg) {
      if (state.success) {
        toast.success(state.msg)
      } else {
        toast.warning(state.msg)
      }
    }
    state.msg = ''
  }, [state.msg])

  return (
    <div className='flex-1 space-y-6 p-[24px] md:p-[50px]'>
      {/* Header */}
      <div className='flex items-center gap-[50px]'>
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-[#0D060C] text-[20px] md:text-[24px] font-semibold'>
          Your Profile
        </h2>
      </div>

      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='relative w-[64px] lg:w-[100px] h-[64px] lg:h-[100px] rounded-full  bg-[#F6F5F4]'>
            <Image
              src={uploadedImage || '/images/profile-placeholder.png'}
              alt='Profile'
              fill
              className='object-cover  w-[64px] lg:w-[100px] h-[64px] lg:h-[100px] rounded-full border-2 border-[#CE8936]'
            />
            {/* Upload Button on Image */}
            <label className='absolute bottom-0 right-0 bg-white shadow-lg p-2 rounded-full cursor-pointer'>
              <SquarePen className='w-4 h-4 text-[#d67b0e]' />
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
              />
            </label>
          </div>
          <div>
            <h3 className='text-[#1F2122] text-[20px] md:text-[22px] font-semibold'>
              {firstName} {lastName}
            </h3>
            <p className='text-sm text-[#3A3D42]'>
              DOB: {formatDate(dateOfBirth)}
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form className='space-y-6' action={action}>
        <input type='hidden' name='userId' value={userId} />
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {/* First / Last name */}
          <div className='md:col-span-2'>
            <label
              htmlFor='firstName'
              className='block text-base mb-2 text-[#0D060C]'
            >
              First name
            </label>
            <input
              id='firstName'
              type='text'
              name='firstname'
              defaultValue={firstName}
              className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
            />
          </div>
          <div className='md:col-span-2'>
            <label
              htmlFor='lastName'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Last name
            </label>
            <input
              id='lastName'
              type='text'
              name='lastName'
              defaultValue={lastName}
              className='bg-white border border-[#F0E3D6] text-[#3A3D42] w-full py-[15px] px-[16px] rounded-[6px]'
            />
          </div>
          {/* Email / Phone */}
          <div className='md:col-span-2'>
            <label
              htmlFor='email'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Email Address
            </label>
            <input
              id='email'
              defaultValue={secondEmail}
              name='email'
              type='email'
              className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
            />
          </div>
          <div className='md:col-span-2'>
            <label
              htmlFor='phone'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Phone Number
            </label>
            <input
              id='phone'
              name='phone'
              type='tel'
              defaultValue={phoneNumber}
              className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
            />
          </div>
          {/* DOB / NHS */}
          <DateField
            id='dob'
            label='Date of Birth'
            selected={dob}
            onChange={setDob}
            placeholder={formatDate(dateOfBirth)}
            className='md:col-span-2 '
            name='dob'
            bg='bg-white border border-[#EEE0CF] text-black'
          />
          <div className='md:col-span-2'>
            <label
              htmlFor='nhs'
              className='block text-base mb-2 text-[#0D060C]'
            >
              NHS number
            </label>
            <input
              id='nhs'
              type='text'
              defaultValue={nhsNumber}
              name='nhs'
              className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
            />
          </div>
          {/* Home address / Zip */}
          <div className='md:col-span-3'>
            <label
              htmlFor='homeAddress'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Home Address
            </label>
            <input
              id='homeAddress'
              type='text'
              defaultValue={address}
              name='address'
              placeholder='Wellin Lane, Edwalton, United Kingdom'
              className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
            />
          </div>
          <div className='md:col-span-1'>
            <label
              htmlFor='homeZip'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Zip code
            </label>
            <input
              id='homeZip'
              type='text'
              defaultValue={zipCode}
              name='zip'
              placeholder='NG12 4AS'
              className='bg-white border border-[#EEE0CF] text-black w-full py-[15px] px-[16px] rounded-[6px]'
            />
          </div>
          <input type='hidden' name='weight' defaultValue={weight} />
          <input type='hidden' name='height' defaultValue={weight} />
          <input
            type='hidden'
            name='whdate'
            defaultValue={weightHeightCheckDate}
          />
          <input type='hidden' name='bptop' defaultValue={bpTop} />
          <input type='hidden' name='bpbottom' defaultValue={bpBottom} />
          <input type='hidden' name='bpdate' defaultValue={bpCheckDate} />
          <input
            type='hidden'
            name='medicalconditions'
            defaultValue={medicalConditions}
          />
          <input
            type='hidden'
            name='currentmedicines'
            defaultValue={currentMedicines}
          />
          {/* Save button */}
          <div className='md:col-span-4'>
            <button
              type='submit'
              className='w-full md:w-auto flex items-center justify-center gap-2 bg-[#d67b0e] text-white text-[16px] font-medium py-3 px-8 rounded-full hover:bg-[#b8680b] transition'
            >
              <span>{loading ? 'loading' : 'Save Now'}</span>
              <ArrowRight className='w-4 h-4 -rotate-45' />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
