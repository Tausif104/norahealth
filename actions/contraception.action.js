'use server'

import { redirect } from 'next/navigation'

export const contraceptionStepOne = async (formData) => {
  redirect('/contraception-choices/step-2')
}

export const contraceptionStepTwo = async (formData) => {
  const reason = formData.get('reason')
  const sexualStatus = formData.get('sexual-health')
  redirect(
    `/contraception-choices/step-3?reason=${encodeURIComponent(
      reason
    )}&sexstatus=${encodeURIComponent(sexualStatus)}`
  )
}
