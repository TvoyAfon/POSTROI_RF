import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validationValue } from '../../../common/validationSize'
import { addOrderTruckingData } from '../../../store/slices/data/OrderDataTrucking'
import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import ErrorInputField from '../../ui/ErrorForm/ErrorInputField'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import styles from './CreateOrderTrucking.module.scss'


const CreateOrderTruckingTask: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const dispatch = useDispatch()
	const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const { clickFlag } = useSelector((state: RootState) => state.createOrderValidation)

	const handleInputChangeDescr = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(addOrderTruckingData({ ...dataTrucking, description: e.target.value }))
		dispatch(addInputDescriptionError(e.target.value))
	}

	const handleInputHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderTruckingData({ ...dataTrucking, inputParametres: { ...dataTrucking.inputParametres, height: validationValue(e) } }))
	}

	const handleInputWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderTruckingData({ ...dataTrucking, inputParametres: { ...dataTrucking.inputParametres, width: validationValue(e) } }))
	}

	const handleInputSize = (e: React.ChangeEvent<HTMLInputElement>) => {

		dispatch(addOrderTruckingData({ ...dataTrucking, inputParametres: { ...dataTrucking.inputParametres, size: validationValue(e) } }))
	}

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderTruckingData({
			...dataTrucking, inputParametres: {
				...dataTrucking.inputParametres,
				length: validationValue(e),
				diametr: ''
			}
		}))
	}
	return (
		<div className={styles.truckingTask}>
			<div className={styles.truckingTask_content} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
				<span style={{ fontSize: '16px', fontWeight: '700' }}>Опишите что за груз нужно увезти</span>
				<textarea
					value={dataTrucking.description}
					onChange={handleInputChangeDescr}
					placeholder='Описание груза' />

				{error.inputDescriptionError && dataTrucking.description.length === 0 && <error.inputDescriptionError />}
				<FilesUploader />
			</div>
			<div className='flex-column gap-medium'><span style={{ fontSize: '16px', fontWeight: '700' }}>параметры груза</span>

				<div style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '5fr 5fr 5fr 4fr' }}>
					<span>Длина (м)</span>
					<span>Ширина (м)</span>
					<span>Высота (м)</span>
					<span>Примерный объем (м³)</span>
				</div>
			</div>
			<div className={styles.trucking_input} style={{ display: 'flex', gap: '24px', paddingTop: 16 }}>
				<input
					onChange={handleInput}
					value={dataTrucking.inputParametres.length}
					type="text" name='length|diametr'
					placeholder='м' />
				<input
					onChange={handleInputWidth}
					value={dataTrucking.inputParametres.width}
					type="text"
					placeholder='м' />
				<input
					type="text"
					value={dataTrucking.inputParametres.height}
					onChange={handleInputHeight}
					placeholder='м' />
				<input
					onChange={handleInputSize}
					value={dataTrucking.inputParametres.size}
					type="text"
					placeholder='м³' />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
				{clickFlag ? <ErrorInputField /> : null}</div>
		</div>
	)
}

export default CreateOrderTruckingTask
