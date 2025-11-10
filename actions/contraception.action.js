'use server'

import { redirect } from 'next/navigation'

// step one
export const contraceptionStepOne = async (prevState, formData) => {
  redirect('/contraception-choices/step-2')
}

// step two
export const contraceptionStepTwo = async (prevState, formData) => {
  const sexualHealth = formData.get('sexual-health')

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

// step three
export const contraceptionStepThree = async (prevState, formData) => {
  const sexhealth = formData.get('sex-health')
  const myHealth = formData.getAll('my-health')

  if (!myHealth.length) {
    return {
      msg: 'Please Select any of the Options',
    }
  }

  redirect(
    `/contraception-choices/step-4?myhealth=${encodeURIComponent(
      myHealth
    )}&sexhealth=${sexhealth}`
  )
}

// step four
export const contraceptionStepFour = async (prevState, formData) => {
  const sexhealth = formData.get('sex-health')
  const myHealth = formData.get('my-health')

  const myHealthTwo = formData.getAll('my-health-two')

  if (!myHealthTwo.length) {
    return {
      msg: 'Please Select any of the Options',
    }
  }

  redirect(
    `/contraception-choices/step-5?myhealthtwo=${encodeURIComponent(
      myHealthTwo
    )}&myhealth=${myHealth}&sexhealth=${sexhealth}`
  )
}

// step five
export const contraceptionStepFive = async (prevState, formData) => {
  const sexhealth = formData.get('sex-health')
  const myHealth = formData.get('my-health')
  const myHealthTwo = formData.get('my-health-two')

  const contraceptive = formData.getAll('contraceptive')

  if (!contraceptive.length) {
    return {
      msg: 'Please Select any of the Options',
    }
  }

  redirect(
    `/contraception-choices/outcomes?contraceptive=${encodeURIComponent(
      contraceptive
    )}&myhealthtwo=${myHealthTwo}&myhealth=${myHealth}&sexhealth=${sexhealth}`
  )
}
