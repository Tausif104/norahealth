import React from 'react'
import Profile from './_components/profile'
import { getUserAccount } from '@/actions/account.action'
import { redirect } from 'next/navigation'

const page = async () => {
  const account = await getUserAccount()

  if (!account?.account) {
    redirect('/account')
  }

  return (
    <>
      <Profile account={account?.account} />
    </>
  )
}

export default page
