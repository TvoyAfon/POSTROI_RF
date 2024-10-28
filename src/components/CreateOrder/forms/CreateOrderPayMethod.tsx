import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../store/store'

import { PaymentMethod } from '../../../services/order/types/enums'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import RadioButton from '../../ui/RadioButton/RadioButton'
import Tooltip from '../../ui/Tooltip/Tooltip'
import { flexRow } from './styles/stylesCreateOrder'

const CreateOrderPayMethod: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])
	const { data } = useSelector((state: RootState) => state.createOrderData)
	const dispatch = useDispatch()
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	return (
		<div className='flex-column'>
			<span className='textSizeM'>Укажите способ оплаты</span>
			<div className='flex-column gap-medium'>
				<div style={flexRow}>
					<RadioButton
						onClick={() => dispatch(addOrderData({ ...data, paymethod: PaymentMethod.EXECUTOR }))}
						checked={data.paymethod === 'EXECUTOR'}
						label='Наличными или переводом на карту, напрямую исполнителю' /><Tooltip>Всплывающая подсказка</Tooltip>
				</div>
				<div style={flexRow}>
					<RadioButton
						onClick={() => dispatch(addOrderData({ ...data, paymethod: PaymentMethod.ORGANIZATION }))}
						checked={data.paymethod === 'ORGANIZATION'}
						label='На расчетный счет самозанятого ИП или организации' /><Tooltip>Всплывающая подсказка</Tooltip>
				</div>
				{error.radioButtonPayError && data.paymethod === null && <error.radioButtonPayError />}
			</div>
		</div>
	)
}
export default CreateOrderPayMethod

