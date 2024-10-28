import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import settings from '../../../../../assets/images/other/settings-02 (1).svg'
import { useOutsideClick } from '../../../../../hooks/useOutside'
import { setActiveModal } from '../../../../../store/slices/other/checkActiveModal'
import { RootState } from '../../../../../store/store'
import { useDeleteFolder } from '../../hooks/folder/useDeleteFolder'
import { IFolderProject } from '../../types/projectTypes'
import styles from './Directory.module.scss'
import DirectoryPopUp from './DirectoryPopUp'

const Directory: React.FC<{ folder: IFolderProject, projectId: number }> = ({ folder, projectId }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)
	useOutsideClick(ref, () => setIsOpen(false))
	const { deleteFolder } = useDeleteFolder(folder.folder_id, projectId)
	const dispatch = useDispatch()
	const { isActiveModal } = useSelector((state: RootState) => state.checkActiveModal)

	const handleOpenDirectoryPopup = () => {
		setIsOpen(true)
		dispatch(setActiveModal('directoryPopup'))
	}

	return (
		<div className={styles['directory']}>
			<span
				style={{ color: '#fff', fontSize: 12, width: 50, textOverflow: 'ellipsis', overflow: 'hidden' }}>{folder.folder_name}</span>
			<img
				onClick={handleOpenDirectoryPopup}
				style={{ width: 20, height: 20, cursor: 'pointer', position: 'absolute', bottom: 5, left: 5 }}
				src={settings}
				alt="st" />
			<DirectoryPopUp
				isOpen={isOpen}
				activeModal={isActiveModal}
				folderId={folder.folder_id}
				projectId={projectId}
				deleteFolder={deleteFolder}
				ref={ref} />
		</div>
	)
}

export default Directory
