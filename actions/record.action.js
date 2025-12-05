'use server'

import { prisma } from '@/lib/client/prisma'
import { loggedInUserAction } from './user.action'

// create record
export const createRecordAction = async (prevState, formData) => {
  const userId = Number(formData.get('userId'))
  const weight = formData.get('weight')
  const height = formData.get('height')
  const lwhcheck = new Date(formData.get('lwhcheck'))
  const bp = formData.get('bp')
  const lbpcheck = new Date(formData.get('lbpcheck'))

  const payload = await loggedInUserAction()

  if (!payload?.payload?.id) {
    return {
      msg: 'User not logged In',
      success: false,
    }
  }

  if (!weight || !height || !lwhcheck || !bp || !lbpcheck) {
    return {
      msg: 'Please insert all the fields',
      success: false,
    }
  }

  const record = await prisma.record.create({
    data: {
      userId,
      weight,
      height,
      lastwhCheck: lwhcheck,
      bloodPressure: bp,
      lastBpCheckDate: lbpcheck,
    },
  })

  if (record) {
    return {
      msg: 'Record Created',
      success: true,
    }
  }
}

// get all the record
