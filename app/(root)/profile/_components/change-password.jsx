'use client'

import { changePasswordAction } from '@/actions/user.action'
import { useProfile } from '@/lib/profileContext'
import { CircleCheck, PanelLeft } from 'lucide-react'
import React, { useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

const initialState = {
  msg: '',
  success: false,
}

const ChangePassword = () => {
  const { setMenuOpen } = useProfile()
  const formRef = useRef(null)

  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    initialState
  )

  // ✅ clean React reset
  useEffect(() => {
    if (state.msg) {
      if (state.success) {
        formRef.current?.reset()
        toast.success(state.msg)
      } else {
        toast.error(state.msg)
      }
    }
  }, [state.msg])

  return (
    <div className='max-w-[630px] mx-auto flex-1 space-y-6 py-[24px] md:py-[150px] px-[24px] md:px-0'>
      <div className='flex items-center gap-[50px]'>
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden w-[40px] h-[40px] items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-[#0D060C] text-[20px] md:text-[24px] font-semibold'>
          Change Password
        </h2>
      </div>

      <form ref={formRef} action={formAction} className='space-y-4'>
        <div>
          <label htmlFor='currentPassword' className='block text-base mb-2'>
            Your Password
          </label>
          <input
            id='currentPassword'
            name='currentPassword'
            type='password'
            required
            className='bg-white border border-[#EEE0CF] w-full py-[17px] px-[16px] rounded-[6px]'
          />
        </div>

        <div>
          <label htmlFor='newPassword' className='block text-base mb-2'>
            New Password
          </label>
          <input
            id='newPassword'
            name='newPassword'
            type='password'
            required
            minLength={8}
            maxLength={12}
            className='bg-white border border-[#EEE0CF] w-full py-[17px] px-[16px] rounded-[6px]'
          />
          <p className='flex items-center gap-2 text-[16px] text-[#9a9b9d] mt-2'>
            <CircleCheck className='inline-block w-4 h-4' />
            <span>Your password must be 8–12 characters long</span>
          </p>
        </div>

        <div>
          <label htmlFor='confirmPassword' className='block text-base mb-2'>
            Re enter your new password
          </label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            className='bg-white border border-[#EEE0CF] w-full py-[17px] px-[16px] rounded-[6px]'
          />
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='bg-[#D6866B] hover:bg-black text-white py-4 px-9 rounded-full transition-all duration-300 disabled:opacity-60 cursor-pointer'
        >
          {isPending ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
