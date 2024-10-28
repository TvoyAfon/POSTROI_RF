
import React, { useRef } from 'react'
import settings_img from '../../../../../../assets/images/other/settings_forImg.svg'
import white_cancel from '../../../../../../assets/images/other/white_cancel.svg'
import { useModal } from '../../../../../../hooks/useModal'
import { useOutsideClick } from '../../../../../../hooks/useOutside'
import FileFormat from '../../../../../ui/FileFormat/FileFormat'
import Loader from '../../../../../ui/Loader/Loader'
import OverLay from '../../../../../ui/OverLay'
import { useGetFiles } from '../../../hooks/folder/useGetFiles'
import { useGetFolderById } from '../../../hooks/folder/useGetFolderByid'
import { IFolderProjectDetail } from '../../../types/projectTypes'
import styles from '../Directory.module.scss'
import FolderDetailPopup from './FolderDetailPopup'

const FolderProjectDetail: React.FC<IFolderProjectDetail> = ({ onClose, folderId, projectId }) => {
	const { handleOpen, isOpen, handleClose: handleClosePopup } = useModal()
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose!)
	const { loading, folderData } = useGetFolderById(folderId, projectId)
	const { files } = useGetFiles(folderId, projectId)

	const folderDataIsLoaded = folderData && folderData.folder_id && folderData.project_id

	const isImageFile = (fileName: string) => {
		const extension = fileName.split('.').pop()?.toLowerCase()
		return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension!)
	}

	const imageFiles = files?.filter(file => isImageFile(file.file_name))
	const otherFiles = files?.filter(file => !isImageFile(file.file_name))

	return (
		<>
			<OverLay />
			<div ref={ref} className={styles['folderProject']}>
				<div className={styles['folderProject_header']}>
					<span>{folderData?.folder_name}</span>
					<div style={{ position: 'relative' }}>
						<img onClick={handleOpen} src={settings_img} alt="settings" />
						<img onClick={onClose} src={white_cancel} alt="cancel" />
						{isOpen && folderDataIsLoaded && (
							<FolderDetailPopup
								folderId={folderData.folder_id}
								projectId={folderData.project_id}
								onClose={handleClosePopup}
							/>
						)}
					</div>
				</div>
				<div className={styles['folderProject_content']}>
					{loading ? <Loader style={{ position: 'absolute', right: 300 }} text='Обновление...' /> : null}
					<span>Файлы</span>
					<section>
						{otherFiles?.map(file => (
							<FileFormat fileName={file.file_name} />
						))}
					</section>
					<span>Фото</span>
					<section>
						{imageFiles?.map(file => (
							<img
								key={file.file_id}
								style={{ width: 160, height: 148, borderRadius: 16, objectFit: 'contain' }}
								src={file.file_link}
								alt={file.file_name} />
						))}
					</section>
				</div>
			</div>
		</>
	)
}

export default FolderProjectDetail