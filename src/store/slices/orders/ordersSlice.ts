import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEditOrderState } from '../../../components/CreateOrder/edit/types'
import { IOrderFullInfo } from '../../../services/order/types/types'

export interface IOrdersState {
	myOrdersList: IOrderFullInfo[]
	ordersList: IOrderFullInfo[]
	isMyOrdersLoading: boolean
	isOrdersLoading: boolean
	myOrdersPage: number
	ordersPage: number
	pageScrollY: number
}

const initialState: IOrdersState = {
	myOrdersList: [],
	ordersList: [],
	isMyOrdersLoading: false,
	isOrdersLoading: false,
	myOrdersPage: 0,
	ordersPage: 0,
	pageScrollY: 0
}

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addMyOrder(state, action: PayloadAction<IOrderFullInfo>) {
			state.myOrdersList = [action.payload, ...state.myOrdersList]
		},

		addMyOrders(state, action: PayloadAction<{
			orders: IOrderFullInfo[],
			addFlag: 'rewrite' | 'append'
		}>) {
			const { orders, addFlag } = action.payload
			let result: IOrderFullInfo[] = []

			if (addFlag === 'rewrite') {
				result = orders
			}
			else if (addFlag === 'append') {
				result = [...state.myOrdersList, ...orders]
			}

			state.myOrdersList = result
		},

		addOrders(state, action: PayloadAction<{
			orders: IOrderFullInfo[],
			addFlag: 'rewrite' | 'append'
		}>) {
			const { orders, addFlag } = action.payload
			let result: IOrderFullInfo[] = []

			if (addFlag === 'rewrite') {
				result = orders
			}
			else if (addFlag === 'append') {
				result = [...state.ordersList, ...orders]
			}

			state.ordersList = result
		},

		deleteMyOrder(state, action: PayloadAction<number>) {
			state.myOrdersList = state.myOrdersList
				.filter(order => order.id !== action.payload)
		},

		editOrder(state, action: PayloadAction<{
			orderId: number,
			data: IEditOrderState
		}>) {
			const {
				orderId,
				data: {
					title, address,
					contactPhone, paymentMethod,
					description, files
				}
			} = action.payload

			state.myOrdersList = state.myOrdersList
				.map(order => {
					if (order.id !== orderId) {
						return order
					}

					const base = {
						...order,
						name: title,
						address, description,
						payment_method: paymentMethod,
						contact_phone: contactPhone,
					}

					if (files) {
						return { ...base, files }
					}

					return base
				})
		},

		setIsMyOrdersLoading(state, action: PayloadAction<boolean>) {
			state.isMyOrdersLoading = action.payload
		},

		setIsOrdersLoading(state, action: PayloadAction<boolean>) {
			state.isOrdersLoading = action.payload
		},

		incrementMyOrdersPage(state) {
			state.myOrdersPage = state.myOrdersPage + 1
		},

		incrementOrdersPage(state) {
			state.ordersPage = state.ordersPage + 1
		},

		setPageScrollY(state, action: PayloadAction<number>) {
			state.pageScrollY = action.payload
		}
	}
})

export default ordersSlice.reducer
export const {
	addMyOrder, deleteMyOrder,
	addMyOrders, setIsOrdersLoading,
	incrementMyOrdersPage, incrementOrdersPage,
	editOrder, setPageScrollY,
	addOrders, setIsMyOrdersLoading
} = ordersSlice.actions