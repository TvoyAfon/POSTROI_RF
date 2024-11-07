import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../../hooks/useDebounce'
import { addMyOrders, addOrders } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders, getMyFormattedOrders } from '../../../utils/order-formatting'

export enum CurrentPage {
	ORDERS = 'Найти заказ',
	MY_ORDERS = 'Мои заказы'
}

const fetchOrders = async (searchTerm: string, cityName: string, ordersPage: number, userId?: number,) => {
	const params: any = {
		limit: 100,
		page: ordersPage,
		city: cityName,
		search_filter: searchTerm,
	}

	if (userId) {
		params.client_id = userId
	}

	const filteredOrders = await getFormattedOrders(params)
	return filteredOrders
}

const fetchMyOrders = async (searchTerm: string, userId: number, myOrdersPage: number) => {
	const filteredMyOrders = await getMyFormattedOrders({
		client_id: userId,
		limit: 100,
		page: myOrdersPage,
		search_filter: searchTerm,
	})
	return filteredMyOrders
}

export const useSearchOrders = (searchTerm: string, currentPage: string, cityName: string | undefined) => {
	const dispatch = useDispatch()
	const { ordersPage, myOrdersPage } = useSelector((state: RootState) => state.orders)
	const { user } = useSelector((state: RootState) => state.auth)
	const debouncedOrdersValue = useDebounce(searchTerm, 400)

	const { isLoading: isLoadingOrder } = useQuery(
		['orders', debouncedOrdersValue, cityName, ordersPage],
		() => fetchOrders(debouncedOrdersValue!, cityName!, ordersPage, user?.id),
		{
			enabled: !!cityName && currentPage === CurrentPage.ORDERS,
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

	const { isLoading: isMyLoadingOrder } = useQuery(
		['myOrders', debouncedOrdersValue, user?.id, myOrdersPage],
		() => fetchMyOrders(debouncedOrdersValue!, user?.id!, myOrdersPage),
		{
			enabled: !!user?.id && currentPage === CurrentPage.MY_ORDERS,
			onSuccess: (data: any) => {
				dispatch(addMyOrders({ orders: data, addFlag: 'rewrite' }))
			},
			onError: (error: any) => {
				console.error(error)

			},
			refetchOnReconnect: false,
			refetchOnWindowFocus: false
		}
	)
	return { isLoadingOrder, isMyLoadingOrder }
}