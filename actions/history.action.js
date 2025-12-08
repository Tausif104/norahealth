'use server'

import { revalidatePath } from 'next/cache'
import { loggedInUserAction } from './user.action'
import { prisma } from '@/lib/client/prisma'

export const createHistoryAction = async (prevState, formData) => {
  const history = formData.get('history')
  const userId = formData.get('userId')

  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }

  const res = await prisma.history.create({
    data: {
      history,
      userId: Number(userId),
    },
  })

  revalidatePath('/profile/medical-history')

  if (res) {
    return {
      success: true,
      msg: 'History Created',
    }
  }
}

// get all history
export const getAllHistoryAction = async () => {
  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }

  const userId = payload?.payload?.id

  const history = await prisma.history.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    history,
  }
}

// delete history
export const deleteHistory = async (formData) => {
  const historyId = formData.get('historyId')
  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }

  const userId = payload?.payload?.id

  await prisma.history.delete({
    where: {
      id: Number(historyId),
      userId: Number(userId),
    },
  })

  revalidatePath('/profile/medical-history')
}
