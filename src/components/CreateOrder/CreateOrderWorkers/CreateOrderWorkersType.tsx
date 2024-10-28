import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderWorkersData } from '../../../store/slices/data/OrderDataWorkers'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'

const CreateOrderWorkersType: React.FC = () => {
	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const handleChangeWorker = () => {
		dispatch(addOrderWorkersData({
			...dataWorkers,
			workersType: {
				loader: false,
				worker: !dataWorkers.workersType.worker
			}
		}))
	}

	const handleChangeLoader = () => {
		dispatch(addOrderWorkersData({
			...dataWorkers,
			workersType: {
				worker: false,
				loader: !dataWorkers.workersType.loader
			}
		}))
	}

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontWeight: 700, fontSize: 16 }}>Укажите, кто вам требуется</span>
			<RadioButton onClick={handleChangeWorker} checked={dataWorkers.workersType.worker} label='Разнорабочие (8 часов + 1 час обед)' />
			<RadioButton onClick={handleChangeLoader} checked={dataWorkers.workersType.loader} label='Грузчики (от 2 часов)' />
			{error.radioButtonError && (dataWorkers.workersType.loader === false || dataWorkers.workersType.worker === false) && <error.radioButtonError />}
		</div>
	)
}

export default CreateOrderWorkersType
