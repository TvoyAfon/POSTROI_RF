import React from 'react'
import styles from '../Footer.module.scss'
import { fourthsection } from './common/footerSections'

const FourthSection: React.FC = () => {
	return (
		<div className={styles['fourthsection']}>
			<h3 style={{ fontSize: 14, fontWeight: 600 }}>Для бизнеса</h3>
			<section className={styles['fourthsection_section']}>
				{fourthsection.map((el, index) => (
					<span key={index}>{el.name}</span>
				))}
			</section>
		</div>
	)
}

export default FourthSection
