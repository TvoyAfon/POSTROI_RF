import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMyOrders, addOrders, setIsMyOrdersLoading, setIsOrdersLoading } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders, getMyFormattedOrders } from '../../../utils/order-formatting'

export const useGetOrders = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { myOrdersPage, ordersPage } = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    (async () => {
      if (!user || !user.id || !user.city) return
      console.log('вызвалась usegetallorders')
      dispatch(setIsMyOrdersLoading(true))
      dispatch(setIsOrdersLoading(true))

      try {
        const [myOrders, orders] = await Promise.all([
          getMyFormattedOrders({
            client_id: user.id,
            limit: 100,
            page: myOrdersPage
          }),
          getFormattedOrders({
            page: ordersPage,
            limit: 100,
          }),
        ])

        if (myOrders) {
          dispatch(addMyOrders({ orders: myOrders, addFlag: 'rewrite' }))
        }

        if (orders) {
          console.log("Fetched orders:", orders)
          dispatch(addOrders({ orders, addFlag: 'rewrite' }))
        }

      } catch (error) {
        console.log('get error', error)
      } finally {
        dispatch(setIsMyOrdersLoading(false))
        dispatch(setIsOrdersLoading(false))
      }
    })()
  }, [user])
}