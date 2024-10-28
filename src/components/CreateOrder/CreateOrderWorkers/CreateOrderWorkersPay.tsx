import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderWorkersData } from '../../../store/slices/data/OrderDataWorkers'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'
import Tooltip from '../../ui/Tooltip/Tooltip'

const CreateOrderWorkersPay: React.FC = () => {
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const dispatch = useDispatch()
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontSize: '16px', fontWeight: '700' }}>Укажите способ оплаты</span>
			<div style={{ display: 'flex', gap: 12 }}>
				<RadioButton
					checked={dataWorkers.payMethod === 'cash'}
					onClick={() => dispatch(addOrderWorkersData({ ...dataWorkers, payMethod: 'cards' }))}
					label='На расчетный счет исполнителя' /><Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<RadioButton
					checked={dataWorkers.payMethod === 'cards'}
					onClick={() => dispatch(addOrderWorkersData({ ...dataWorkers, payMethod: 'cash' }))}
					label='Переводом на карту' /><Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<RadioButton
					checked={dataWorkers.payMethod === 'fromApp'}
					onClick={() => dispatch(addOrderWorkersData({ ...dataWorkers, payMethod: 'fromApp' }))}
					label='Через приложение по тарифам приложения' /><Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			{error.radioButtonPayError && dataWorkers.payMethod === null && <error.radioButtonPayError />}
		</div>
	)
}

export default CreateOrderWorkersPay
