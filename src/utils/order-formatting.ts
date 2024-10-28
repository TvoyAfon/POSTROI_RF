import { IUserInfo } from '../services/auth/common/types'
import { orderService } from '../services/order/order'
import { IOrderFullInfo, IOrderInfo, IOrderListSchema, IOrderMyListSchema } from '../services/order/types/types'
import { userService } from '../services/user/user.service'

export async function getFormattedOrder(orderInfo: IOrderInfo): Promise<IOrderFullInfo> {
	const clientData = await userService.getInfo(orderInfo.client_id)
	const executorData = orderInfo.executor_id ? await userService.getInfo(orderInfo.executor_id) : null

	return {
		...orderInfo,
		client_data: {
			...clientData,
			id: orderInfo.client_id
		} as IUserInfo,
		executor_data: executorData ? {
			...executorData,
			id: orderInfo.executor_id
		} as IUserInfo : null
	}
}

export async function getMyFormattedOrders(myListSchema: IOrderMyListSchema) {
	const result: IOrderFullInfo[] = []

	try {
		const orders = await orderService.mylist(myListSchema)
		if (!orders) return

		for (let i = 0; i < orders.length; i++) {
			const order = await getFormattedOrder(orders[i])
			result.push(order)
		}
		console.log(result)
	}
	catch (error) {
		console.log('get my orders error', error)
	}

	return result
}

export async function getFormattedOrders(listSchema: IOrderListSchema) {
	const result: IOrderFullInfo[] = []

	try {
		const orders = await orderService.list(listSchema)
		console.log(orders)
		if (!orders) return

		for (let i = 0; i < orders.length; i++) {
			const order = await getFormattedOrder(orders[i])
			result.push(order)
		}
	}
	catch (error) {
		console.log('get orders error', error)
	}

	return result
}