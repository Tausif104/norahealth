import React from 'react'
import { RecordTable } from './_components/record-table'
import { getAllRecordsAction } from '@/actions/record.action'

const page = async () => {
  const records = await getAllRecordsAction()

  console.log(records)

  return (
    <>
      <RecordTable record={records?.records} />
    </>
  )
}

export default page
