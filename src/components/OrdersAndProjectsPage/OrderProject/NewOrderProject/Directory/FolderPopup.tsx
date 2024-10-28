
import React, { useRef, useState } from 'react'
import { useModal } from '../../../../../hooks/useModal'
import { useOutsideClick } from '../../../../../hooks/useOutside'
import { useAddFiles } from '../../hooks/folder/useAddFiles'
import { IFolderPopup } from '../../types/projectTypes'
import styles from './Directory.module.scss'
import CreateFolderModal from './modal/CreateFolderModal'

const FolderPopup: React.FC<IFolderPopup> = ({ onClose, stateValue, projectId, folderId }) => {
	const { handleClose, handleOpen, isOpen } = useModal()
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose)
	const inputRef = useRef<HTMLInputElement>(null)

	const [file, setFile] = useState<File | null>(null)
	const { addFiles } = useAddFiles(folderId, projectId)

	const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0]
			setFile(selectedFile)
			if (file) await addFiles(file)
			e.target.value = ''
		}
	}

	const settingsType = [
		{
			name: 'Создать папку',
			onClick: handleOpen
		},
		{
			name: 'Загрузить файл',
			onClick: () => inputRef.current?.click()
		}
	]

	return (
		<>
			{isOpen && <CreateFolderModal projectId={projectId} onClose={handleClose} />}
			{stateValue && (
				<div ref={ref} className={styles['folderpopup']}>
					{settingsType.map((el, index) => (
						<span
							style={{ cursor: "pointer" }}
							onClick={el.onClick}
							key={index}>{el.name}</span>
					))}
					<input onChange={handleChangeFile} style={{ display: 'none' }} ref={inputRef} type="file" />
				</div>
			)}
		</>
	)
}

export default FolderPopup