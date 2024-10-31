import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMyOrders, addOrders, setIsMyOrdersLoading, setIsOrdersLoading } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders, getMyFormattedOrders } from '../../../utils/order-formatting'

export const useSearchOrdersByCity = (city: string | undefined, currentPage: string) => {
	const { ordersPage, myOrdersPage } = useSelector((state: RootState) => state.orders)
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		if (!city) return
		const filteredByCity = async () => {
			try {

				if (currentPage === 'Найти заказ') {
					dispatch(setIsOrdersLoading(true))
					const filteredOrdersByCity = await getFormattedOrders({
						limit: 100,
						city,
						page: ordersPage
					})
					if (filteredOrdersByCity) {
						dispatch(addOrders({ orders: filteredOrdersByCity, addFlag: 'rewrite' }))
					}
				}
				else if (currentPage === 'Мои заказы') {
					dispatch(setIsMyOrdersLoading(true))
					console.log('вызвался в моих заказх')
					if (!user?.id) return
					const filteredMyOrdersByCity = await getMyFormattedOrders({
						limit: 100,
						client_id: user?.id,
						page: myOrdersPage
					})
					if (filteredMyOrdersByCity) {
						dispatch(addMyOrders({ orders: filteredMyOrdersByCity, addFlag: 'rewrite' }))
					}
				}
				else if (currentPage === 'Мои проекты') {
					return
				}
			} catch (error) {
				dispatch(setIsOrdersLoading(false))
				dispatch(setIsMyOrdersLoading(false))
				console.error('Error fetching orders:', error) // Обрабатывать ошибки
			}
			finally {
				dispatch(setIsOrdersLoading(false))
				dispatch(setIsMyOrdersLoading(false))
			}
		}

		filteredByCity()

	}, [city]) // Добавляем зависимости
}