'use server'

import { loggedInUserAction } from './user.action'
import { prisma } from '@/lib/client/prisma'

export const createHistoryAction = async () => {
  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }
}
