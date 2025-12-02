'use server'

import bcrypt, { hash } from 'bcrypt'
import { prisma } from '@/lib/client/prisma'

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
