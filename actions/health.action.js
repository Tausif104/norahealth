'use server'

import { revalidatePath } from 'next/cache'
import { loggedInUserAction } from './user.action'
import { prisma } from '@/lib/client/prisma'

// create health action
export const createHealthAction = async (prevState, formData) => {
  const weight = formData.get('weight')?.toString() || ''
  const height = formData.get('height')?.toString() || ''
  const whdate = formData.get('whdate')
    ? new Date(formData.get('whdate'))
    : undefined
  const bptop = formData.get('bptop')?.toString() || ''
  const bpbottom = formData.get('bpbottom')?.toString() || ''
  const bpdate = formData.get('bpdate')
    ? new Date(formData.get('bpdate'))
    : undefined
  const medicalconditions = formData.get('medicalconditions')?.toString() || ''
  const currentmedicines = formData.get('currentmedicines')?.toString() || ''

  if (
    !weight ||
    !height ||
    !whdate ||
    !bptop ||
    !bpbottom ||
    !bpdate ||
    !medicalconditions ||
    !currentmedicines
  ) {
    return {
      success: false,
      msg: 'Please insert all the fields',
    }
  }

  // getting the user from cookie
  const payload = await loggedInUserAction()

  // checking the user is logged in
  if (!payload?.payload?.email) {
    return {
      success: false,
      msg: 'User not found',
    }
  }

  const user = payload?.payload

  const health = await prisma.health.upsert({
    where: {
      userId: user.id,
    },

    update: {
      weight: weight,
      height: height,
      weightHeightCheckDate: whdate,
      bpTop: bptop,
      bpBottom: bpbottom,
      bpCheckDate: bpdate,
      medicalConditions: medicalconditions,
      currentMedicines: currentmedicines,
    },

    create: {
      userId: user.id,
      weight: weight,
      height: height,
      weightHeightCheckDate: whdate,
      bpTop: bptop,
      bpBottom: bpbottom,
      bpCheckDate: bpdate,
      medicalConditions: medicalconditions,
      currentMedicines: currentmedicines,
    },
  })

  if (health) {
    return {
      msg: 'Health details saved successfullly!',
      success: true,
    }
  }
}

// fetch health of logged in user
export const getUserHealth = async () => {
  // getting the user from cookie
  const payload = await loggedInUserAction()

  // checking the user is logged in
  if (!payload?.payload?.email) {
    return {
      success: false,
      msg: 'User not found',
    }
  }

  const user = payload?.payload

  // fetch logged in user account
  const health = await prisma.health.findUnique({
    where: {
      userId: user.id,
    },
  })

  return {
    health,
  }
}

// update health Profile
export const updatehealthAction = async (prevState, formData) => {
  const payload = await loggedInUserAction()

  if (!payload?.payload?.email) {
    return {
      success: false,
      msg: 'User not found',
    }
  }

  const loggedInUserId = payload?.payload?.id

  const userId = formData.get('userId').toString()
  const weight = formData.get('weight')
  const height = formData.get('height')
  const whdate = new Date(formData.get('whdate'))
  const bptop = formData.get('bptop')
  const bpbottom = formData.get('bpbottom')
  const bpdate = new Date(formData.get('bpdate'))
  const medicalconditions = formData.get('medicalconditions')
  const currentmedicines = formData.get('currentmedicines')

  if (loggedInUserId.toString() !== userId) {
    return null
  }

  const updatedAcount = await prisma.health.upsert({
    where: {
      userId: loggedInUserId,
    },

    update: {
      weight: weight,
      height: height,
      weightHeightCheckDate: whdate,
      bpTop: bptop,
      bpBottom: bpbottom,
      bpCheckDate: bpdate,
      medicalConditions: medicalconditions,
      currentMedicines: currentmedicines,
    },

    create: {
      userId: loggedInUserId,
      weight: weight,
      height: height,
      weightHeightCheckDate: whdate,
      bpTop: bptop,
      bpBottom: bpbottom,
      bpCheckDate: bpdate,
      medicalConditions: medicalconditions,
      currentMedicines: currentmedicines,
    },
  })

  revalidatePath('/profile/health-profile')

  if (updatedAcount) {
    return {
      msg: 'Health Profile Updated!',
      success: true,
    }
  }
}
