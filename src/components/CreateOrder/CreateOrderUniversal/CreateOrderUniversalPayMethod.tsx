import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderUniversalData } from '../../../store/slices/data/OrderUniversalData'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'

const CreateOrderUniversalPayMethod: React.FC = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])


	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const { dataUniversal } = useSelector((state: RootState) => state.createOrderUniversalData)


	return (
		<div className='flex-column gap-medium'>
			<span className='textSizeM'>Укажите способ оплаты</span>
			<RadioButton
				onClick={() => dispatch(addOrderUniversalData({ ...dataUniversal, paymethod: "cards" }))}
				checked={dataUniversal.paymethod === 'cards'}
				label='Наличными или переводом на карту,напрямую исполнителю' />
			<RadioButton
				onClick={() => dispatch(addOrderUniversalData({ ...dataUniversal, paymethod: "fromApp" }))}
				checked={dataUniversal.paymethod === 'fromApp'}
				label='Через приложением после выполнения работы исполнителем' />
			<RadioButton
				onClick={() => dispatch(addOrderUniversalData({ ...dataUniversal, paymethod: "settlement" }))}
				checked={dataUniversal.paymethod === 'settlement'}
				label='На расчетный счет самозанятого или организации' />
			{error.radioButtonPayError && dataUniversal.paymethod === null && <error.radioButtonPayError />}
		</div>
	)
}

export default CreateOrderUniversalPayMethod
