import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderServicesData } from '../../../store/slices/data/OrderDataServices'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'
import Tooltip from '../../ui/Tooltip/Tooltip'

const CreateOrderServicesPay: React.FC = () => {
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])


	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const dispatch = useDispatch()
	const { dataServices } = useSelector((state: RootState) => state.createOrderServicesData)

	return (
		<div className='flex-column'>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: 16, fontWeight: 700 }}>Минимальная стоимость заказа</span>
				<span>Минимальная стоимость заказа 3 часа (1 час дороги+2 часа работы)
				</span>
			</div>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: 16, fontWeight: 700 }}>Укажите способ оплаты</span>
				<div style={{ display: 'flex', gap: 12 }}>
					<RadioButton
						checked={dataServices.payMethod === 'settlement'}
						onClick={() => dispatch(addOrderServicesData({ ...dataServices, payMethod: "settlement" }))}
						label='Наличными или переводом на карту водителю (стоимость договорная)' />
					<Tooltip>Всплывающая подсказка</Tooltip>
				</div>

				<div style={{ display: 'flex', gap: 12 }}>
					<RadioButton
						checked={dataServices.payMethod === 'fromApp'}
						onClick={() => dispatch(addOrderServicesData({ ...dataServices, payMethod: "fromApp" }))} label='Через приложение по тарифам приложения' />
					<Tooltip>Всплывающая подсказка</Tooltip>
				</div>

				<div style={{ display: 'flex', gap: 12 }}>
					<RadioButton
						checked={dataServices.payMethod === 'cards'}
						onClick={() => dispatch(addOrderServicesData({ ...dataServices, payMethod: "cards" }))}
						label='На расчетный счет самозанятого, ИП или юридического лица' />
					<Tooltip>Всплывающая подсказка</Tooltip>
				</div>
				{error.radioButtonPayError && dataServices.payMethod === null && <error.radioButtonPayError />}
				<span style={{ fontWeight: 300 }}>В этом случае на вашу заявку смогут откликаться самозанятые, ип или юридические лица. </span>
			</div>
		</div>
	)
}

export default CreateOrderServicesPay
