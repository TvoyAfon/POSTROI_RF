import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../../hooks/useDebounce'
import { addOrders } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders } from '../../../utils/order-formatting'

export const useGetAllOrders = (searchTerm: string) => {
	const dispatch = useDispatch()
	const { ordersPage } = useSelector((state: RootState) => state.orders)
	const { user } = useSelector((state: RootState) => state.auth)
	const debouncedOrdersValue = useDebounce(searchTerm, 400)

	const fetchOrders = async (searchTerm: string, ordersPage: number) => {
		if (user?.id) return
		const filteredOrders = await getFormattedOrders({
			limit: 100,
			page: ordersPage,
			search_filter: searchTerm,
		})
		return filteredOrders
	}

	const { isLoading } = useQuery(
		['ordersUnAuth', debouncedOrdersValue, ordersPage],
		() => fetchOrders(debouncedOrdersValue!, ordersPage),
		{

			onSuccess: (data: any) => {
				dispatch(addOrders({ orders: data, addFlag: 'rewrite' }))
			},

			onError: (error: any) => {
				console.error(error)
			},
			refetchOnReconnect: false,
			refetchOnWindowFocus: false
		}
	)
	return isLoading
}