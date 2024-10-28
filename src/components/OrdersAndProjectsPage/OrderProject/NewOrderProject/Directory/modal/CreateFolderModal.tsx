import { useRef, useState } from 'react'
import { useOutsideClick } from '../../../../../../hooks/useOutside'
import Button from '../../../../../ui/Button/Button'
import CloseButton from '../../../../../ui/CloseButton/CloseButton'
import Field from '../../../../../ui/Field/Field'
import ModalContainer from '../../../../../ui/Modal/ModalContainer'
import { useCreateFolder } from '../../../hooks/folder/useCreateFolder'
import { ICreateFolderModal } from '../../../types/projectTypes'

const CreateFolderModal: React.FC<ICreateFolderModal> = ({ onClose, projectId }) => {
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose)
	const [name, setName] = useState('')


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}
	const { createFolder } = useCreateFolder(projectId, name)

	const handleCreateFolder = async () => {
		await createFolder()
		onClose()
	}

	return (
		<ModalContainer style={{ position: 'fixed' }} zIndex={11} isOnOverlay>
			<div ref={ref} style={{ position: 'relative' }} className='flex-column'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span className='textSizeL'>Новая папка</span>
					<CloseButton onClick={onClose} />
				</div>
				<Field value={name} onChange={handleChange} placeholder='Название новой папки' />
				<Button onClick={handleCreateFolder} >Создать</Button>
			</div>
		</ModalContainer>
	)
}

export default CreateFolderModal
