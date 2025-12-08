'use server'

import { prisma } from '@/lib/client/prisma'
import { loggedInUserAction } from './user.action'
import { revalidatePath } from 'next/cache'

// create medication action
export const createMedicationAction = async (prevState, formData) => {
  const medication = formData.get('medication')

  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }

  const res = await prisma.medication.create({
    data: {
      label: medication,
      userId: Number(payload?.payload?.id),
    },
  })

  revalidatePath('/profile/medications')

  if (res) {
    return {
      msg: 'Medication Created',
      success: true,
    }
  }
}

// get all medications action
export const getAllMedicationsAction = async () => {
  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }

  const res = await prisma.medication.findMany({
    where: {
      userId: Number(payload?.payload?.id),
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    success: true,
    medications: res,
  }
}

// delete medication action
export const deleteMedicationAction = async (formData) => {
  const medicationId = formData.get('medicationId')

  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }

  const res = await prisma.medication.delete({
    where: {
      id: Number(medicationId),
      userId: Number(payload?.payload?.id),
    },
  })

  revalidatePath('/profile/medications')

  if (res) {
    return {
      msg: 'Medication Deleted',
      success: true,
    }
  }
}
