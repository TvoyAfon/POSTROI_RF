import React from 'react'
import { ILeaveConfirmModal } from '../../../interface/leaveConfirmModal.props'
import Button from '../Button/Button'
import OverLay from '../OverLay'
import styles from './LeaveConfirmModal.module.scss'

const LeaveConfirmModal: React.FC<ILeaveConfirmModal> = ({ handleClickLeave, handleClickStay }) => {
	return (
		<>
			<OverLay />
			<div className={styles.leaveConfirmModal}>
				<span className='textSizeL'>ПОКИНУТЬ СТРАНИЦУ?</span>
				<span style={{ fontSize: 16, fontWeight: 300 }}>Введенные вами данные сохранены не будут</span>
				<div style={{ display: 'flex', gap: 16 }}>
					<button onClick={handleClickLeave} className={styles.button1}>Покинуть</button>
					<Button onClick={handleClickStay} className={styles.button2}>Остаться</Button>
				</div>
			</div>
		</>
	)
}

export default LeaveConfirmModal
