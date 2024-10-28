import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderUniversalData } from '../../../store/slices/data/OrderUniversalData'
import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CreateOrderTextArea from '../../ui/CreateOrderTextArea/CreateOrderTextArea'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import styles from './CreateOrderUniversal.module.scss'

const CreateOrderUniversalTask: React.FC = () => {
	const dispatch = useDispatch()
	const { dataUniversal } = useSelector((state: RootState) => state.createOrderUniversalData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value)
			dispatch(addOrderUniversalData({
				...dataUniversal,
				description: e.target.value
			}))
		dispatch(addInputDescriptionError(e.target.value))
	}

	return (
		<div className={styles['universaltask']}>
			<span>Задача</span>
			<div className='flex-column gap-medium'>
				<span>Опишите свою задачу максимально понятно, чтобы мастер понял, что ему нужно для выполнения этой задачи</span>
				<CreateOrderTextArea
					onChange={handleChangeDescription}
					value={dataUniversal?.description}
					placeholder='Пример: Нужно повесить картину, размер: ширина - 20 см, высота - 20 см, на кирпичную стену ' />
				{error.inputDescriptionError && dataUniversal?.description?.length === 0 && <error.inputDescriptionError />}
			</div>
			<FilesUploader />
		</div>
	)
}

export default CreateOrderUniversalTask
