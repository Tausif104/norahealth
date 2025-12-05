import { HistoryTable } from './_components/history-table'
import { getAllRecordsAction } from '@/actions/record.action'

const MedicalHistory = async () => {
  const records = await getAllRecordsAction()
  return (
    <>
      <HistoryTable record={records?.records} />
    </>
  )
}

export default MedicalHistory
