import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import Textarea from '../../ui/Textarea/Textarea'

const CreateOrderTasks: React.FC = () => {
	const dispatch = useDispatch()
	const { data } = useSelector((state: RootState) => state.createOrderData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const handleChangeTask = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(addOrderData({
			...data,
			description: e.target.value
		})
		)
		dispatch(addInputDescriptionError(e.target.value))
	}


	return (
		<div className='flex-column'>
			<span className='textSizeM'>Задача</span>
			<section className='flex-column gap-medium'>
				<span>Опишите свою задачу максимально понятно, чтобы мастер понял, что ему нужно для выполнения этой задачи</span>
				<Textarea
					onChange={handleChangeTask}
					value={data.description}
					placeholder='Пример: Нужно повесить картину, размер: ширина - 20 см, высота - 20 см, на кирпичную стену, на высоту 1,5 м. '
					style={{ width: '100%' }} />
				{error.inputDescriptionError && data.description.length === 0 && <error.inputDescriptionError />}
			</section>
			<section>
				<FilesUploader />
			</section>
		</div>
	)
}

export default CreateOrderTasks
