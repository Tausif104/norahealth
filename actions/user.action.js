'use server'

import bcrypt from 'bcrypt'
import { prisma } from '@/lib/client/prisma'
import { signToken, verifyToken } from '@/lib/jwt/jwt'
import { cookies } from 'next/headers'

// register action
export const registerAction = async (prevState, formData) => {
  const email = formData.get('email')
  const password = formData.get('password')
  const confirm = formData.get('confirm-password')

  if (!email || !password) {
    return {
      msg: 'Please enter all the fields',
      success: false,
    }
  }

  const userExists = await prisma.user.findUnique({ where: { email } })

  if (userExists) {
    return {
      msg: 'User Already Exists',
      success: false,
    }
  }

  if (password !== confirm) {
    return {
      msg: 'Password do to match',
      success: false,
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  })

  if (user) {
    return {
      msg: 'Congratulations! You are registered.',
      success: true,
    }
  }
}

// Login Action
export const loginAction = async (prevState, formData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    return {
      msg: 'Please enter all the fields',
      success: false,
    }
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return {
      msg: 'Invalid Email',
      success: false,
    }
  }

  // password check
  const passwordCheck = await bcrypt.compare(password, user.password)
  if (!passwordCheck) {
    return {
      msg: 'Invalid Password',
      success: false,
    }
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  }

  const token = signToken(safeUser)

  const coookiesStore = await cookies()

  coookiesStore.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  })

  return {
    msg: 'You are Logged In',
    success: true,
  }
}

// Log out Action
export const logoutAction = async () => {
  const coookiesStore = await cookies()

  coookiesStore.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 0,
  })
}

// Get Logged In User
export const loggedInUserAction = async () => {
  const coookiesStore = await cookies()
  const token = coookiesStore.get('auth_token')?.value

  if (!token) {
    return null
  }

  const payload = verifyToken(token)

  if (!payload) {
    return null
  }

  return {
    payload,
  }
}
