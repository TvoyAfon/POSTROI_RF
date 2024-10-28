import React, { useState } from 'react'
import { useModal } from '../../../../../../../hooks/useModal'
import styles from '../Potrfolio.module.scss'
import AlbumDeleteConfirm from './AlbumDeleteConfirm'
import ChangeAlbumNameModal from './ChangeAlbumNameModal'


const AlbumDetailPopup: React.FC<{ albumId: number }> = ({ albumId }) => {
	const { handleClose, handleOpen, isOpen } = useModal()
	const [openDeleteModal, setOpenDeleteModal] = useState(false)


	const settingsType = [
		{
			name: 'Переименовать',
			onClick: handleOpen
		},
		{
			name: 'Удалить',
			onClick: () => setOpenDeleteModal(true)
		},
		{
			name: 'Добавить фото',
			onClick: () => document.getElementById('file-upload')?.click()
		}
	]

	return (
		<>
			<AlbumDeleteConfirm albumId={albumId} onClose={() => setOpenDeleteModal(false)} stateValue={openDeleteModal} />
			<ChangeAlbumNameModal albumId={albumId} stateValue={isOpen} onClose={handleClose} />
			<div className={styles['popup_album']}>
				{settingsType.map((settings, index) => (
					<span onClick={settings.onClick} style={{ cursor: 'pointer' }} key={index}>{settings.name}</span>
				))}
			</div>
		</>
	)
}

export default AlbumDetailPopup
