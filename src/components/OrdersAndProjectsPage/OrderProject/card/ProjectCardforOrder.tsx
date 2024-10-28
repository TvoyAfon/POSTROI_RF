import React from 'react'
import bubble_chat_q from '../../../../assets/images/other/bubble-chat-question.svg'
import bubble_chat from '../../../../assets/images/other/bubble-chat.svg'
import order_img from '../../../../assets/images/signs/order_img_project.png'
import settings from '../../../../assets/images/signs/settings-white.svg'
import { useModal } from '../../../../hooks/useModal'
import styles from '../OrderProject.module.scss'
import ProjectCardOrderDetail from '../modal/ProjectCardOrderDetail'

const ProjectCardForOrder: React.FC = () => {
	const { handleClose, handleOpen, isOpen } = useModal()

	return (
		<>
			<ProjectCardOrderDetail stateValue={isOpen} onClose={handleClose} />
			<div className={styles['projectCardForOrder']}>
				<img src={order_img} />
				<div className={styles['projectCardForOrder_section']}>
					<div className='flex-column gap-small' style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom: 16 }}>
						<span style={{ color: 'white', fontWeight: 700, wordWrap: 'break-word', height: 40, overflow: 'hidden' }}>Покрасить стену  </span>
						<span onClick={handleOpen} style={{ color: '#8E8E93', cursor: 'pointer' }}>№ 65625944</span>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<img style={{ cursor: 'pointer' }} src={settings} alt="st" />
						<div style={{ display: 'flex', gap: 8 }}>
							<img style={{ cursor: 'pointer' }} src={bubble_chat} alt="chat" />
							<img style={{ cursor: 'pointer' }} src={bubble_chat_q} alt="quest" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProjectCardForOrder
