import React from 'react'
import Profile from './_components/profile'
import { loggedInUserAction } from '@/actions/user.action'
import { redirect } from 'next/navigation'

const page = async () => {
  const payload = await loggedInUserAction()

  return (
    <>
      <Profile />
    </>
  )
}

export default page
