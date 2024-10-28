import React, { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import add_circle from '../../../assets/images/other/add-circlee.svg'
import { useModal } from '../../../hooks/useModal'
import { ROUTES_CATEGORY } from '../../../routes/routes'
import AddGroupModal from '../../OrdersAndProjectsPage/OrderProject/modal/AddGroup/AddGroupModal'
import AddParticipantModal from '../../OrdersAndProjectsPage/OrderProject/modal/AddParticipant/AddParticipantModal'
import FolderPopup from '../../OrdersAndProjectsPage/OrderProject/NewOrderProject/Directory/FolderPopup'
import styles from './AddSmthCard.module.scss'

const AddSmthCard: React.FC<{
	addText?: string,
	style?: CSSProperties,
	isCurrentModal?: string,
	circleStyle?: CSSProperties,
	handleOpen?: () => void,
	projectId?: number,
	folderId?: number
}> = ({ addText, style, isCurrentModal, circleStyle, projectId, folderId }) => {

	const { handleClose, handleOpen, isOpen } = useModal()

	const nav = useNavigate()

	const handleOpenClick = () => {
		if (isCurrentModal === 'resume') {
			nav(ROUTES_CATEGORY.mastersResume)
		} else handleOpen()


	}
	return (
		<div style={{ position: 'relative' }}>
			{isCurrentModal === 'projectFolder' &&
				<FolderPopup
					folderId={folderId!}
					projectId={projectId!}   /* ДЛЯ ПРОЕКТОВ */
					stateValue={isOpen}
					onClose={handleClose} />}
			{isCurrentModal === 'group' && <AddGroupModal stateValue={isOpen} onClose={handleClose} />}
			{isCurrentModal === 'participant' && <AddParticipantModal stateValue={isOpen} onClose={handleClose} />}
			<div
				onClick={handleOpenClick}
				className={styles['addSmthCard']}
				style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', position: 'relative', ...style }}>
				<img style={{ ...circleStyle }} src={add_circle} alt="add" />
				<span style={{ fontWeight: 700, color: '#8E8E93' }}>{addText}</span>
			</div>
		</div>
	)
}

export default AddSmthCard
