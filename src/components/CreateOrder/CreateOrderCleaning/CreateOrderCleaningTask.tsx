import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validationValue } from '../../../common/validationSize'
import { addOrderCleaningData } from '../../../store/slices/data/OrderDataCleaning'
import { addClickFlag, addInputDescriptionError, addInputSquareError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import TelephoneInput from '../../ui/CreateOrderContactInput/TelephoneInput'
import CreateOrderTextArea from '../../ui/CreateOrderTextArea/CreateOrderTextArea'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import RadioButton from '../../ui/RadioButton/RadioButton'

const CreateOrderCleaningTask: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)
	const dispatch = useDispatch()
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(addOrderCleaningData({ ...dataCleaning, description: e.target.value }))
		dispatch(addInputDescriptionError(e.target.value))
	}

	const handleChangeSquare = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderCleaningData({ ...dataCleaning, square: validationValue(e) }))
		dispatch(addInputSquareError(e.target.value))
	}

	return (
		<div className='flex-column '>
			<div className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Укажите площадь помещения где нужно сделать уборку (м²)</span>
				<TelephoneInput
					value={dataCleaning.square}
					onChange={handleChangeSquare}
					style={{ width: 180 }}
					placeholder='м2' />
				{error.inputSquareError && dataCleaning.square.length === 0 && <error.inputSquareError />}
			</div>
			<div className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Укажите степень загрязнения помещения</span>
				<RadioButton
					onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, pollution: 'daylyCleaning' }))}
					checked={dataCleaning.pollution === 'daylyCleaning'} label='Повседневная влажная уборка' />
				<RadioButton
					onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, pollution: 'generalCleaining' }))}
					checked={dataCleaning.pollution === 'generalCleaining'} label='Генеральная уборка' />
				<RadioButton
					onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, pollution: 'veryDirty' }))}
					checked={dataCleaning.pollution === 'veryDirty'}
					label='Очень грязно' />
				<RadioButton
					onClick={() => dispatch(addOrderCleaningData({ ...dataCleaning, pollution: 'afterRepair' }))}
					checked={dataCleaning.pollution === 'afterRepair'}
					label='После ремонта' />
				{error.radioPollutionError && dataCleaning.pollution === null && <error.radioPollutionError />}
			</div>
			<div className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Опишите задачу</span>
				<CreateOrderTextArea
					onChange={handleChange}
					value={dataCleaning.description} />
				{error.inputDescriptionError && dataCleaning.description.length === 0 && <error.inputDescriptionError />}
				<FilesUploader />
			</div>
		</div>
	)
}

export default CreateOrderCleaningTask
