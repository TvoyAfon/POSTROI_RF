import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSignsData } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'

const SignsTask: React.FC = () => {
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const { dataSigns } = useSelector((state: RootState) => state.signsData)
	const dispatch = useDispatch()

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(addInputDescriptionError(e.target.value))
		dispatch(addSignsData({ ...dataSigns, description: e.target.value }))
	}

	return (
		<div style={{ display: 'flex', gap: 32, flexDirection: 'column' }}>
			<h3 style={{ fontSize: 16, fontWeight: 700 }}>Описание</h3>
			<div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
				<span style={{ fontWeight: 300, fontSize: 16, color: '#8E8E93' }}>Не указывайте здесь телефон и почту — для них есть отдельные поля</span>
				<textarea
					onChange={handleChange}
					value={dataSigns.description}
					placeholder='Текст'
					style={{ width: 800, height: 180 }} />
				{error.inputDescriptionError && dataSigns.description.length === 0 && <error.inputDescriptionError />}
			</div>
			<FilesUploader />
		</div>
	)
}

export default SignsTask
