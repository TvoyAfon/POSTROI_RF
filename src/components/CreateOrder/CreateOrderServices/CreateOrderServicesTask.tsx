import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderServicesData } from '../../../store/slices/data/OrderDataServices'
import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CreateOrderTextArea from '../../ui/CreateOrderTextArea/CreateOrderTextArea'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import styles from './CreateOrderServices.module.scss'

const CreateOrderServicesTask: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])


	const dispatch = useDispatch()
	const { dataServices } = useSelector((state: RootState) => state.createOrderServicesData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(addOrderServicesData({ ...dataServices, description: e.target.value }))
		dispatch(addInputDescriptionError(e.target.value))
	}

	return (
		<div className={styles.createOrderServicees}>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: 16, fontWeight: 700 }}>Что нужно будет сделать</span>
				<CreateOrderTextArea onChange={handleChange} value={dataServices.description} placeholder='' />
				{error.inputDescriptionError && <error.inputDescriptionError />}
				<FilesUploader />
			</div>
			<div className='flex-column gap-medium' >
				<span style={{ fontSize: 16, fontWeight: 700, paddingTop: 16 }}>Обратите внимание</span>
				<span style={{ fontSize: 16, fontWeight: 300, color: '#8E8E93' }}>Минимальная стоимость одного часа работы экскаватора погрузчика от 3000р.<br />
					Минимальное количество часов 3 часа (1 час дороги и 2 часа работы)<br />
					Максимальное количество часов работы на усмотрение водителя.<br />
					Минимальная сумма заказа от 9000р
				</span>
			</div>
		</div>
	)
}

export default CreateOrderServicesTask
