import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMyOrders, addOrders, setIsOrdersLoading } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders, getMyFormattedOrders } from '../../../utils/order-formatting'

export const useSearchOrdersByName = (searchTerm: string, currentPage: string) => {

	const dispatch = useDispatch()
	const { ordersPage, myOrdersPage } = useSelector((state: RootState) => state.orders)
	const { user } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		const searchByName = async () => {
			try {
				if (!searchTerm) return
				dispatch(setIsOrdersLoading(true))

				if (currentPage === 'Заказы') {
					const filteredOrders = await getFormattedOrders({
						limit: 100,
						page: ordersPage,
						search_filter: searchTerm
					})

					if (filteredOrders)
						dispatch(addOrders({ orders: filteredOrders, addFlag: 'rewrite' }))
				}
				else if (currentPage === 'Мои заказы') {
					if (user?.id) {
						const filteredMyOrders = await getMyFormattedOrders({
							client_id: user?.id,
							limit: 100,
							page: myOrdersPage,
							search_filter: searchTerm
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
				dispatch(setIsOrdersLoading(true))
				console.log(error)
			}
			finally {
				dispatch(setIsOrdersLoading(false))
			}
		}
		searchByName()
	}, [searchTerm])

}