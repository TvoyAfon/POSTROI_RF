import React from 'react'
import styles from '../Footer.module.scss'
import { underSection } from './common/footerSections'

const UnderFooter: React.FC = () => {
	return (
		<div className={styles['underfooter']}>
			<div className={styles['underfooter_section']}>
				{underSection[0].map((el, index) => (
					<span key={index}>{el.name}</span>
				))}
			</div>
			<div className={styles['underfooter_section']}>
				{underSection[1].map((el, index) => (
					<span key={index}>{el.name}</span>
				))}
			</div>
		</div>
	)
}

export default UnderFooter
