import { IOrderFullInfo } from '../../../../services/order/types/types'
import { getOrderDate } from '../../../../utils/date'
import { getDegreeContamination, getPaymentMethodRussian, getTransportationType, getTypeRoom, getWorkSpecialization } from '../../../CreateOrder/utils/utils'

export function getOrderInfo(order: IOrderFullInfo) {
	const result: { param: string | null, value: string }[] = []

	const addField = (param: string | null, value: string) => {
		result.push({ param, value })
	}

	if (order.transportation) {
		addField(null, getTransportationType(order.transportation))
	}

	if (order.type_cleaning && order.type_room && order.square) {
		addField(
			null,
			`${getTypeRoom(order.type_room)}, ${order.square} м², ${getDegreeContamination(order.type_cleaning).toLowerCase()}`
		)
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

	if (order.work_specialization) {
		addField(null, getWorkSpecialization(order.work_specialization))
	}

	return result
}