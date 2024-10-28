import React from 'react'
import { IDefaultModal } from '../../../../interface/modal.props'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import UserCornerMessage from './Message/UserCornerMessage'
import styles from './UserCornerModal.module.scss'

const UserCornerNotification: React.FC<IDefaultModal> = ({ onClose }) => {
	return (
		<div className={styles.modalNotificat}>
			<div className={styles.modalNotificat_text}>
				<span className='textSizeL'>УВЕДОМЛЕНИЯ</span>
				<CloseButton onClick={onClose} />
			</div>
			<div className={styles.modalNotificat_section} style={{ padding: 42, display: 'flex', flexDirection: 'column', gap: 16 }}>
				<UserCornerMessage />
				<UserCornerMessage />
				<UserCornerMessage />
				<UserCornerMessage />
				<UserCornerMessage />
				<UserCornerMessage />
			</div>
		</div>
	)
}

export default UserCornerNotification
