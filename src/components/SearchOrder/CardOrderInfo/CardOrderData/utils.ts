import { IOrderFullInfo } from '../../../../services/order/types/types'
import { getOrderDate } from '../../../../utils/date'
import { getPaymentMethodRussian } from '../../../CreateOrder/utils/utils'

export function getOrderInfo(order: IOrderFullInfo) {
	const result: { param: string | null, value: string }[] = []

	const addField = (param: string | null, value: string) => {
		result.push({ param, value })
	}

	addField('Оплата:', getPaymentMethodRussian(order.payment_method))

	if (order.is_contract) {
		addField(null, 'Нужен договор')
	}

	if (order.start_date) {
		addField("Начать:", getOrderDate(order.start_date))
	}
	if (order.end_date) {
		addField("Закончить:", getOrderDate(order.end_date))
	}

	return result
}