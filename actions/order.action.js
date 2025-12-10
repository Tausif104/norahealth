'use server'

import { prisma } from '@/lib/client/prisma'
import { getAdminUser } from './admin.action'
import { revalidatePath } from 'next/cache'

// create order by admin
export const createOrderByAdmin = async (prevState, formData) => {
  const userId = Number(formData.get('userId'))
  const medicineName = formData.get('medicineName')
  const trackingId = formData.get('trackingId')
  const status = formData.get('status')

  const user = await getAdminUser()

  const isAdmin = user?.admin?.isAdmin || false

  if (!isAdmin) {
    return { success: false, message: 'Unauthorized. User is not admin' }
  }

  if (!medicineName || !trackingId || !status) {
    return {
      msg: 'Please insert all the fields',
      success: false,
    }
  }

  const order = await prisma.order.create({
    data: {
      userId,
      medicineName,
      trackingId,
      status,
    },
  })

  revalidatePath(`/admin/${userId}/orders`)

  if (order) {
    return {
      msg: 'Order Created',
      success: true,
    }
  }
}

// get all orders by admin
export const getAllOrders = async (userId) => {
  const user = await getAdminUser()

  const isAdmin = user?.admin?.isAdmin || false

  if (!isAdmin) {
    return { success: false, message: 'Unauthorized. User is not admin' }
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: 'desc' },
  })

  return {
    orders,
  }
}
