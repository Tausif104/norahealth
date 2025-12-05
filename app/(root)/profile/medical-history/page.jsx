import { HistoryTable } from './_components/history-table'
import { getAllHistoryAction } from '@/actions/history.action'

const MedicalHistory = async () => {
  const history = await getAllHistoryAction()

  return (
    <>
      <HistoryTable history={history?.history} />
    </>
  )
}

export default MedicalHistory
