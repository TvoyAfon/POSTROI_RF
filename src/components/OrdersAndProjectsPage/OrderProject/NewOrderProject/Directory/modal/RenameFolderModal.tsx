import React, { useState } from 'react'
import Button from '../../../../../ui/Button/Button'
import CloseButton from '../../../../../ui/CloseButton/CloseButton'
import Field from '../../../../../ui/Field/Field'
import ModalContainer from '../../../../../ui/Modal/ModalContainer'
import { useRenameFolder } from '../../../hooks/folder/useRenameFolder'
import { IRenameFolderModal } from '../../../types/projectTypes'

const RenameFolderModal: React.FC<IRenameFolderModal> = ({ onClose, folderId, projectId }) => {

	const [name, setName] = useState('')
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}
	const { renameFolder } = useRenameFolder(folderId, projectId, name)

	const handleRename = () => {
		renameFolder()
		onClose()
	}

	return (
		<ModalContainer
			style={{ position: 'fixed' }}
			zIndex={11}>
			<div className='flex-column'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span style={{ fontSize: 20, fontWeight: 600 }}>Переименовать папку</span>
					<CloseButton onClick={onClose} />
				</div>
				<Field
					onChange={handleChange}
					value={name} />
				<Button onClick={handleRename}>Подтвердить</Button>
			</div>
		</ModalContainer>
	)
}

export default RenameFolderModal
