import React from 'react'
import styles from '../CardMasters.module.scss'
import CardMastersProfile from './CardMastersProfile'
import CardMastersRightSide from './CardMastersRightSide'

const CardMastersDetail: React.FC = () => {
	return (
		<div className={styles['cardMastersDetail']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 165 }}>
			<div style={{ display: 'flex', gap: 24 }}>
				<CardMastersProfile />
				<CardMastersRightSide />
			</div>
		</div>
	)
}

export default CardMastersDetail
