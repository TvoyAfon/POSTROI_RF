import React from 'react'
import Button from '../../../../../ui/Button/Button'
import ModalContainer from '../../../../../ui/Modal/ModalContainer'
import { IDeleteFolderModal } from '../../../types/projectTypes'

const DeleteFolderModal: React.FC<IDeleteFolderModal> = ({ onClose, deleteFolder }) => {

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		await deleteFolder()
		onClose()
	}

	return (
		<ModalContainer isOnOverlay style={{ position: 'fixed', width: 400 }} zIndex={11}>
			<div className='flex-column'>
				<span style={{ fontSize: 20, fontWeight: 600, color: '#383940' }} >Вы действительно хотите удалить папку?</span>
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: 32 }}>
					<Button onClick={handleDelete} style={{ backgroundColor: 'gray' }}>Подтвердить</Button>
					<Button onClick={onClose}>Отменить</Button>
				</div>
			</div>
		</ModalContainer>
	)
}

export default DeleteFolderModal
