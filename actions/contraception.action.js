'use server'

import { redirect } from 'next/navigation'

export const contraceptionStepOne = async (formData) => {
  const reason = formData.get('reason')
  redirect(`/contraception-choices/step-2?reason=${encodeURIComponent(reason)}`)
}

export const contraceptionStepTwo = async (formData) => {
  const reason = formData.get('reason')
  const sexualStatus = formData.getAll('sexual-status')
  redirect(
    `/contraception-choices/step-3?reason=${encodeURIComponent(
      reason
    )}&sexstatus=${encodeURIComponent(sexualStatus)}`
  )
}
