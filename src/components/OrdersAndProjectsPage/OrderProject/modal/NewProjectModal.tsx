import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IDefaultModal } from '../../../../interface/modal.props'
import { setTriggerCreateProject } from '../../../../store/slices/other/triggerFetch'
import ErrorSignature from '../../../Auth/ui/ErrorSignature'
import Button from '../../../ui/Button/Button'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import CreateOrderTextArea from '../../../ui/CreateOrderTextArea/CreateOrderTextArea'
import Field from '../../../ui/Field/Field'
import Loader from '../../../ui/Loader/Loader'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import { useCreateProject } from '../hooks/useCreateProject'


const NewProjectModal: React.FC<IDefaultModal> = ({ onClose }) => {
	const [error, setError] = useState(false)
	const dispatch = useDispatch()
	const [newProject, setNewProject] = useState({
		name: '',
		description: ''
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setNewProject(prev => ({
			...prev,
			[name]: value
		}))
	}
	const { createProject, loading } = useCreateProject(newProject.name, newProject.description)

	const handleCreate = async () => {
		try {
			setError(false)
			await createProject()
			onClose && onClose()
			dispatch(setTriggerCreateProject())
		} catch (error) {
			setError(true)
		}
	}

	return (
		<div >
			<ModalContainer
				style={{ width: 874 }}
				isOnOverlay={true}
				zIndex={11}>
				<div className='flex-column gap-large'>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span className='textSizeL'>НОВЫЙ ПРОЕКТ</span>
						<CloseButton onClick={onClose} />
					</div>
					<div className='flex-column gap-medium'>
						<span className='textSizeL'>Название проекта</span>
						<Field
							value={newProject.name}
							onChange={handleChange}
							name='name'
							style={{ width: '100%' }}
							placeholder='Название проекта' />
					</div>
					<div className='flex-column gap-medium'>
						<span className='textSizeL'>Описание проекта</span>
						<CreateOrderTextArea
							value={newProject.description}
							onChange={handleChange}
							name='description'
							placeholder='Краткое описание проекта' />
					</div>
					<Button onClick={handleCreate}>{loading ? <Loader color='white' /> : 'Создать'}</Button>
					{error && <ErrorSignature>Не удалось создать проект</ErrorSignature>}
				</div>
			</ModalContainer>
		</div>
	)
}

export default NewProjectModal
