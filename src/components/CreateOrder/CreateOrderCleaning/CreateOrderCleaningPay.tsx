import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderCleaningData } from '../../../store/slices/data/OrderDataCleaning'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'
import Tooltip from '../../ui/Tooltip/Tooltip'

const CreateOrderCleaningPay: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const dispatch = useDispatch()
	const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontSize: 16, fontWeight: 700 }}>Укажите способ оплаты</span>
			<div style={{ display: 'flex', gap: 12 }}>
				<RadioButton
					onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, payMethod: 'settlement' }))}
					checked={dataCleaning.payMethod === 'settlement'}
					label='Наличными или переводом на карту, напрямую исполнителю' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<RadioButton
					onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, payMethod: 'fromApp' }))}
					checked={dataCleaning.payMethod === 'fromApp'}
					label='Через приложением после выполнения работы исполнителем' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<RadioButton
					onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, payMethod: 'cards' }))}
					checked={dataCleaning.payMethod === 'cards'}
					label='На расчетный счет самозанятого или организации' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			{error.radioButtonPayError && dataCleaning.payMethod === null && <error.radioButtonPayError />}
		</div>
	)
}

export default CreateOrderCleaningPay
