
import { forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../../../../hooks/useModal'
import { setActiveModal } from '../../../../../store/slices/other/checkActiveModal'
import { IDirectoryPopup } from '../../types/projectTypes'
import styles from './Directory.module.scss'
import DeleteFolderModal from './modal/DeleteFolderModal'
import FolderProjectDetail from './modal/FolderProjectDetail'


const DirectoryPopUp = forwardRef<HTMLDivElement, IDirectoryPopup>(({ deleteFolder, folderId, projectId, activeModal, isOpen: isOpenDirectoryPopup }, ref) => {
	const { handleClose, handleOpen, isOpen } = useModal()
	const [openFolderDetail, setOpenFolderDetail] = useState(false)
	const dispatch = useDispatch()

	const handleOpenFolderDetail = () => {
		setOpenFolderDetail(true)
		dispatch(setActiveModal(''))
		/* Сброс модального окна при открытии следующего */
	}

	const settingsType = [
		{
			name: 'Удалить',
			onClick: handleOpen
		},
		{
			name: 'Открыть',
			onClick: handleOpenFolderDetail
		},
		{
			name: 'Настроить доступ',
			onClick: undefined
		}
	]
	return (
		<div ref={!isOpen ? ref : null}>
			{openFolderDetail &&
				<FolderProjectDetail
					folderId={folderId}
					projectId={projectId}
					onClose={() => setOpenFolderDetail(false)} />}
			{isOpen &&
				<DeleteFolderModal
					deleteFolder={deleteFolder}
					onClose={handleClose} />}
			{
				isOpenDirectoryPopup &&
				activeModal === 'directoryPopup' &&
				<div className={styles['popup']} >
					{settingsType.map((el, index) => (
						<span onClick={el.onClick} key={index} style={{ cursor: 'pointer' }}>{el.name}</span>
					))}
				</div>}
		</div>
	)
})

export default DirectoryPopUp