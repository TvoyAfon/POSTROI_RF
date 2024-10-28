import React from 'react'
import { useNavigate } from 'react-router-dom'
import user_avatar from '../../../../../../assets/images/createOrder_img/avatar.svg'
import settings_icon from '../../../../../../assets/images/createOrder_img/settings-02.svg'
import { OPTIONAL_ROUTES } from '../../../../../../routes/routes'
import styles from './UserProfile.module.scss'

const UserProfileIcon: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div onClick={() => navigate(OPTIONAL_ROUTES.userWorkersProfile)} className={styles.userProfileIcon}>
			<img src={user_avatar} alt="avatar" />
			<span style={{ fontWeight: 600, paddingRight: 20, cursor: 'pointer' }}>Моя анкета</span>
			<img style={{ width: 20, height: 20 }} src={settings_icon} alt="settings" />
		</div>
	)
}

export default UserProfileIcon
