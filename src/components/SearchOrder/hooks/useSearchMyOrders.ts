import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../../hooks/useDebounce'
import { addOrders } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getMyFormattedOrders } from '../../../utils/order-formatting'


export const useSearchMyOrders = (searchTerm: string) => {
	const { myOrdersPage } = useSelector((state: RootState) => state.orders)
	const { user } = useSelector((state: RootState) => state.auth)
	const debVal = useDebounce(searchTerm, 500)
	const dispatch = useDispatch()

	if (!user?.id) return
	console.log('вызвался юз квери')
	const { data } = useQuery({
		queryKey: ['myOrders', [searchTerm]],
		queryFn: () => getMyFormattedOrders({
			client_id: user.id!,
			limit: 100,
			page: myOrdersPage,
			search_filter: debVal!
		}),
		refetchOnReconnect: false,
		refetchOnWindowFocus: false
	})
	if (data)
		dispatch(addOrders({ orders: data, addFlag: 'rewrite' }))
}
