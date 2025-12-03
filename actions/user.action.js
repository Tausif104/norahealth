'use server'

import bcrypt from 'bcrypt'
import { prisma } from '@/lib/client/prisma'
import { signToken, verifyToken } from '@/lib/jwt/jwt'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// register action
export const registerAction = async (prevState, formData) => {
  // getting all the data from the form
  const email = formData.get('email')
  const password = formData.get('password')
  const confirm = formData.get('confirm-password')

  // check if all fields are filled
  if (!email || !password) {
    return {
      msg: 'Please enter all the fields',
      success: false,
    }
  }

  // check if user exists
  const userExists = await prisma.user.findUnique({ where: { email } })

  if (userExists) {
    return {
      msg: 'User Already Exists',
      success: false,
    }
  }

  // check if passwords are matched
  if (password !== confirm) {
    return {
      msg: 'Password do to match',
      success: false,
    }
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // creating user in database
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  })

  // success message
  if (user) {
    // creating safe user
    const safeUser = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    }

    // creating token with user object
    const token = signToken(safeUser)

    // initiate cookie from next.js
    const coookiesStore = await cookies()

    // setting logged in user to cookie
    coookiesStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    })

    return {
      msg: 'Account Created Successfully!',
      success: true,
    }
  }
}

// Login Action
export const loginAction = async (prevState, formData) => {
  // getting all the from the login form
  const email = formData.get('email')
  const password = formData.get('password')

  // check if all the fields are filled
  if (!email || !password) {
    return {
      msg: 'Please enter all the fields',
      success: false,
    }
  }

  // fetching user from database
  const user = await prisma.user.findUnique({ where: { email } })

  // check user is valid
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

  // creating safe user
  const safeUser = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  }

  // creating token with user object
  const token = signToken(safeUser)

  // initiate cookie from next.js
  const coookiesStore = await cookies()

  // setting logged in user to cookie
  coookiesStore.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: true,
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
  // initiate cookie from next.js
  const coookiesStore = await cookies()

  // removing user from cookie
  coookiesStore.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 0,
  })

  redirect('/login')
}

// Get Logged In User
export const loggedInUserAction = async () => {
  // initiate cookie from next.js
  const coookiesStore = await cookies()

  // getting token from cookie
  const token = coookiesStore.get('auth_token')?.value

  if (!token) {
    return null
  }

  // verify token
  const payload = verifyToken(token)

  if (!payload) {
    return null
  }

  return {
    payload,
  }
}
