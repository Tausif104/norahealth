'use server'

import { verifyToken } from '@/lib/jwt/jwt'
import { prisma } from '@/lib/client/prisma'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'

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
    },
  })

  if (res) {
    return { success: true, users: res }
  }
}

// create an user action
export const createUserAction = async (prevState, formData) => {
  const email = formData.get('email')
  const password = formData.get('password')
  const isAdminUser = formData.get('isAdmin') === 'true' ? true : false

  if (!email || !password || !isAdminUser === undefined) {
    return { success: false, msg: 'All fields are required' }
  }

  const user = await getAdminUser()

  const isAdmin = user?.admin?.isAdmin || false

  if (!isAdmin) {
    return { success: false, message: 'Unauthorized. User is not admin' }
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (existingUser) {
    return { success: false, msg: 'User with this email already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      isAdmin: isAdminUser,
    },
  })

  if (newUser) {
    revalidatePath('/admin')
    return { success: true, msg: 'User created successfully' }
  } else {
    return { success: false, msg: 'Failed to create user' }
  }
}
