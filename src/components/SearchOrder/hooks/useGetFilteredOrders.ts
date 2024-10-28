import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrders, setIsMyOrdersLoading, setIsOrdersLoading } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders } from '../../../utils/order-formatting'

export const useGetFilteredOrders = (category: string, city: string | undefined, currentPage: string) => {
	const { ordersPage, myOrdersPage } = useSelector((state: RootState) => state.orders)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchOrders = async () => {
			if (!category && !city) return

			try {
				if (category && category !== 'Выберите категорию заказов') {
					dispatch(setIsOrdersLoading(true))
					const filteredOrders = await getFormattedOrders({
						limit: 100,
						page: ordersPage,

					})
					if (filteredOrders) {
						dispatch(addOrders({ orders: filteredOrders, addFlag: 'rewrite' }))
					}
				}

				if (city) {
					if (currentPage === 'Заказы') {
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
						const filteredMyOrdersByCity = await getFormattedOrders({
							limit: 100,
							city,
							page: myOrdersPage
						})
						if (filteredMyOrdersByCity) {
							dispatch(addOrders({ orders: filteredMyOrdersByCity, addFlag: 'rewrite' }))
						}
					}
				}
			} catch (error) {
				console.error('Error fetching orders:', error)
			}
			finally {
				dispatch(setIsOrdersLoading(false))
				dispatch(setIsMyOrdersLoading(false))
			}
		}

		fetchOrders()
	}, [category, city, ordersPage, myOrdersPage, currentPage, dispatch]) // Добавление нужных зависимостей
}