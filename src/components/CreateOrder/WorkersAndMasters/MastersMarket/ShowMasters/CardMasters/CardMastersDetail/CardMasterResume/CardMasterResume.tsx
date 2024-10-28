import React from 'react'
import styles from '../../CardMasters.module.scss'

const CardMasterResume: React.FC = () => {
	return (
		<div className={styles['cardMasterResume']}>
			<span style={{ fontSize: 16, fontWeight: 800 }}>Инженер-строитель</span>
			<span style={{ fontSize: 16, fontWeight: 800 }} >50 000 на руки</span>
		</div>
	)
}

export default CardMasterResume
