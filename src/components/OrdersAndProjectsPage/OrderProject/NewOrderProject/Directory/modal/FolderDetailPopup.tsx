import React, { useRef, useState } from 'react'
import { useModal } from '../../../../../../hooks/useModal'
import { useOutsideClick } from '../../../../../../hooks/useOutside'
import { useAddFiles } from '../../../hooks/folder/useAddFiles'
import { useDeleteFolder } from '../../../hooks/folder/useDeleteFolder'
import { IFolderDetailPopup } from '../../../types/projectTypes'
import styles from '../Directory.module.scss'
import DeleteFolderModal from './DeleteFolderModal'
import RenameFolderModal from './RenameFolderModal'

const FolderDetailPopup: React.FC<IFolderDetailPopup> = ({ onClose, folderId, projectId }) => {

	const ref = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	useOutsideClick(ref, onClose)
	const { handleClose, handleOpen, isOpen } = useModal()
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
	const { deleteFolder } = useDeleteFolder(folderId, projectId)
	const { addFiles } = useAddFiles(folderId, projectId)

	const handleChooseAccess = () => {

	}

	const handleLoadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0]
			await addFiles(selectedFile)
		}
	}

	const settingsType = [
		{
			name: 'Переименовать',
			onClick: handleOpen
		},
		{
			name: 'Удалить',
			onClick: () => setOpenDeleteConfirm(true)
		},
		{
			name: 'Настроить доступ',
			onClick: handleChooseAccess
		},
		{
			name: 'Загрузить фото и файлы',
			onClick: () => inputRef.current?.click()
		},

	]

	return (
		<div ref={ref} >
			{openDeleteConfirm && <DeleteFolderModal
				deleteFolder={deleteFolder}
				onClose={() => setOpenDeleteConfirm(false)} />}
			<div className={styles['folderdetailpopup']}>
				{isOpen && <RenameFolderModal
					projectId={projectId}
					folderId={folderId}
					onClose={handleClose} />}
				{
					settingsType.map((settings, index) => (
						<span
							key={index}
							onClick={settings.onClick}>
							{settings.name}
						</span>
					))
				}
				<input
					ref={inputRef}
					onChange={handleLoadFiles}
					style={{ display: 'none' }}
					type="file" />
			</div>
		</div>
	)
}

export default FolderDetailPopup
