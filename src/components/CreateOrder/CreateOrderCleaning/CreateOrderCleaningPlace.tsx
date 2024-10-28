import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderCleaningData } from '../../../store/slices/data/OrderDataCleaning'
import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import TelephoneInput from '../../ui/CreateOrderContactInput/TelephoneInput'
import RadioButton from '../../ui/RadioButton/RadioButton'

const CreateOrderCleaningPlace: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const dispatch = useDispatch()
	const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderCleaningData({ ...dataCleaning, otherPlace: e.target.value }))
		dispatch(addInputDescriptionError(e.target.value))
	}

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontWeight: 700, fontSize: 16 }}>Где нужно сделать уборку</span>
			<RadioButton
				onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, place: 'appartament' }))}
				checked={dataCleaning.place === 'appartament'}
				label='Квартира' />
			<RadioButton
				onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, place: 'house' }))}
				checked={dataCleaning.place === 'house'}
				label='Дом' />
			<RadioButton
				onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, place: 'office' }))}
				checked={dataCleaning.place === 'office'}
				label='Офис или административное здание' />
			<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><RadioButton
				onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, place: 'other' }))}
				checked={dataCleaning.place === 'other'}
				label='Другое' />
				<>
					{
						dataCleaning.place === 'other' ? <>
							<TelephoneInput onChange={handleChange} value={dataCleaning.otherPlace} placeholder='Укажите что' />
							{error.inputDescriptionError && <error.inputDescriptionError />}
						</> : null
					}
				</>
			</div>
			{error.radioButtonError && dataCleaning.place === null && <error.radioButtonError />}
		</div>
	)
}

export default CreateOrderCleaningPlace
