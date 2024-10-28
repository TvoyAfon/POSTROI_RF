import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import { useModal } from '../../../../../hooks/useModal'
import { ROUTES_CATEGORY } from '../../../../../routes/routes'
import { RootState } from '../../../../../store/store'
import RightSide from '../../../../Profile/MyProfile/Sides/RightSide'
import EditField from '../../../../Profile/MyProfile/ui/EditField'
import Reviews from '../../../../Profile/UserProfile/ProfileComponents/Reviews/Reviews'
import LeftWorkerSide from './ProfileSide/LeftWorkerSide'
import MiddleWorkerSide from './ProfileSide/MiddleWorkerSide'
import styles from './UserProfileIcon/UserProfile.module.scss'
import AboutWorkerModal from './modal/AboutWorkerModal'
import NotificationSettings from './modal/NotificationSettings'

const UserWorkerProfile: React.FC = () => {
	const navigate = useNavigate()
	const { handleClose, handleOpen, isOpen } = useModal()
	const { userWorkerFormData } = useSelector((state: RootState) => state.formWorkerReducer)

	return (
		<>

			<div className={styles['overlay_userWorkerProfile']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 120 }}>

				<div className={styles.userWorkerProfile}>
					<NotificationSettings stateValue={isOpen} onClose={handleClose} />
					<div className='flex-column gap-medium' style={{ justifyContent: 'start' }}>
						<span style={{ fontWeight: 600, color: '#8E8E93' }}>Биржа разнорабочих</span>
						<div style={{ paddingBottom: 32, display: 'flex', gap: 32 }}>
							<img onClick={() => navigate(ROUTES_CATEGORY.showWorkersOrder)} style={{ cursor: 'pointer' }} src={arrow} alt="arrow" />
							<span className='textSizeL'>МОЙ ПРОФИЛЬ</span>
						</div>
						<div style={{ display: 'flex', gap: 70 }}>
							<LeftWorkerSide handleOpen={handleOpen} />
							<MiddleWorkerSide />
							<RightSide />
						</div>
						<AboutWorkerModal>
							<EditField styleTextField={{ paddingBottom: 24, width: 600, wordWrap: 'break-word' }} styleIcon={{ position: 'absolute', left: 90, top: 2 }} flexDirection={true} textField={userWorkerFormData.about} name='О себе:' textStyle={{
								fontSize: 20,
								fontWeight: 600
							}} />
						</AboutWorkerModal>
					</div>
					<Reviews />
				</div>
			</div>
		</>
	)
}

export default UserWorkerProfile
