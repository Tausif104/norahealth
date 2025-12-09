'use server'

import { verifyToken } from '@/lib/jwt/jwt'
import { prisma } from '@/lib/client/prisma'
import { cookies } from 'next/headers'
import { loggedInUserAction } from './user.action'

// get admin user action
export const getAdminUser = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    return null
  }

  const payload = await verifyToken(token)

  if (payload && payload.isAdmin) {
    return { success: true, admin: payload }
  }
}

// get all users action
export const getAllUsersAction = async () => {
  const user = await getAdminUser()

  const isAdmin = user?.admin?.isAdmin || false

  if (!isAdmin) {
    return { success: false, message: 'Unauthorized. User is not admin' }
  }

  const res = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      account: true,
    },
  })

  if (res) {
    return { success: true, users: res }
  }
}
