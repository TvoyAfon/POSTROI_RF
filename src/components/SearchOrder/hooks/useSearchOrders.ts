import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../../hooks/useDebounce'
import { addMyOrders, addOrders, setIsMyOrdersLoading, setIsOrdersLoading } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders, getMyFormattedOrders } from '../../../utils/order-formatting'

export const useSearchOrders = (searchTerm: string, currentPage: string, cityName: string | undefined) => {

	const dispatch = useDispatch()
	const { ordersPage, myOrdersPage } = useSelector((state: RootState) => state.orders)
	const { user } = useSelector((state: RootState) => state.auth)

	const debouncedOrdersValue = useDebounce(searchTerm, 400)

	useEffect(() => {
		const searchByName = async () => {
			try {
				if (!cityName) return
				if (currentPage === 'Найти заказ') {
					dispatch(setIsOrdersLoading(true))
					const filteredOrders = await getFormattedOrders({
						limit: 100,
						page: ordersPage,
						city: cityName,
						search_filter: debouncedOrdersValue!
					})

					if (filteredOrders)
						dispatch(addOrders({ orders: filteredOrders, addFlag: 'rewrite' }))
				}
				else if (currentPage === 'Мои заказы') {
					if (user?.id) {
						console.log('вызвался')
						dispatch(setIsMyOrdersLoading(true))
						const filteredMyOrders = await getMyFormattedOrders({
							client_id: user?.id,
							limit: 100,                     /* поиск заказов по городам */
							page: myOrdersPage,
							search_filter: debouncedOrdersValue!
						})
						if (filteredMyOrders) {
							dispatch(addMyOrders({ orders: filteredMyOrders, addFlag: 'rewrite' }))
						}
					}
				}
				else if (currentPage === 'Мои проекты') {
					return
				}
			} catch (error) {
				console.log(error)
			}
			finally {
				dispatch(setIsOrdersLoading(false))
				dispatch(setIsMyOrdersLoading(false))
			}
		}
		searchByName()
	}, [debouncedOrdersValue, cityName, currentPage])

}