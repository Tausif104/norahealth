'use server'

import { redirect } from 'next/navigation'

export const contraceptionStepOne = async (prevState, formData) => {
  redirect('/contraception-choices/step-2')
}

export const contraceptionStepTwo = async (prevState, formData) => {
  const sexualHealth = formData.get('sexual-health')

  console.log(sexualHealth)

  if (!sexualHealth) {
    return {
      msg: 'Please Select any of the Options',
    }
  }

  redirect(
    `/contraception-choices/step-3?sexhealth=${encodeURIComponent(
      sexualHealth
    )}`
  )
}
