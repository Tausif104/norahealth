import { UserTable } from './_components/user-table'
import { getAllUsersAction } from '@/actions/admin.action'

const AdminPanel = async () => {
  const users = await getAllUsersAction()

  return (
    <>
      <UserTable users={users?.users} />
    </>
  )
}

export default AdminPanel
