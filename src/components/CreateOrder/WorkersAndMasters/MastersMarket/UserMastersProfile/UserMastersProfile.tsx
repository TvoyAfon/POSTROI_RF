import React from 'react'
import CardMastersProfile from '../ShowMasters/CardMasters/CardMastersDetail/CardMastersProfile'
import CardMastersRightSide from '../ShowMasters/CardMasters/CardMastersDetail/CardMastersRightSide'
import styles from './UserMastersProfile.module.scss'

const UserMastersProfile: React.FC = () => {
	return (
		<div className={styles['userMastersProfile']}>
			<CardMastersProfile isMyProfile={true} />
			<CardMastersRightSide isMyProfile={true} />
		</div>

	)
}

export default UserMastersProfile
