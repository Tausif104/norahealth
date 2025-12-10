import { RecordTable } from './_components/record-table'
import { getRecordByUserId } from '@/actions/record.action'

const Records = async ({ params }) => {
  const { id } = await params
  const records = await getRecordByUserId(id)

  return (
    <>
      <RecordTable record={records?.records} userId={id} />
    </>
  )
}

export default Records
