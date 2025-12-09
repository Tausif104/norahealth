import { OrderTable } from './_components/order-table'
import { getAllOrders } from '@/actions/order.action'

const OrderPage = async ({ params }) => {
  const { id } = await params
  const orders = await getAllOrders(id)

  return (
    <>
      <OrderTable orders={orders?.orders} userId={id} />
    </>
  )
}

export default OrderPage
