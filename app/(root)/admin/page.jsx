import { UserTable } from './_components/user-table'
import { getAllUsersAction } from '@/actions/admin.action'
import { getAdminUser } from '@/actions/admin.action'

const AdminPanel = async () => {
  const users = await getAllUsersAction()
  const adminUser = await getAdminUser()

  return (
    <>
      <UserTable users={users?.users} admin={adminUser} />
    </>
  )
}

export default AdminPanel
