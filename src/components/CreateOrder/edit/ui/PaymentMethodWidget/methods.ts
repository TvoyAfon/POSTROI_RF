import { PaymentMethod } from '../../../../../services/order/types/enums'

export const paymentMethods = [
	{
		name: "Наличными или переводом на карту, напрямую исполнителю",
		key: PaymentMethod.EXECUTOR,
		tooltip: 'Всплывающая подсказка'
	},
	,
	{
		name: "На расчетный счет самозанятого или организации",
		key: PaymentMethod.ORGANIZATION,
		tooltip: 'Всплывающая подсказка'
	}
]