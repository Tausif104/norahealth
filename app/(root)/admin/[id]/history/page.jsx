import AdminNavigation from '../_components/admin-navigation'
import { HistoryTable } from './_components/history-table'
import { getHistoryByUserId } from '@/actions/history.action'

const MedicalHistory = async ({ params }) => {
  const { id } = await params
  const history = await getHistoryByUserId(id)

  return (
    <>
      <HistoryTable history={history?.history} userId={id} />
    </>
  )
}

export default MedicalHistory
