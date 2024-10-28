import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrders, setIsOrdersLoading } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders } from '../../../utils/order-formatting'

export const useGetAllOrders = () => {
	const { ordersPage } = useSelector((state: RootState) => state.orders)
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		if (user?.id) return
		const getOrders = async () => {
			try {
				dispatch(setIsOrdersLoading(true))
				const orders = await getFormattedOrders({
					limit: 100,
					page: ordersPage
				})
				if (orders) {
					dispatch(addOrders({ orders, addFlag: 'rewrite' }))
				}

			} catch (error) {
				dispatch(setIsOrdersLoading(false))
				console.log('Ошибка', error)
			}
			finally {
				dispatch(setIsOrdersLoading(false))
			}
		}
		getOrders()
	}, [])

}