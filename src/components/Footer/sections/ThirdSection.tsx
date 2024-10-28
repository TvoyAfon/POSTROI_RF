import React from 'react'
import styles from '../Footer.module.scss'
import { thirdSection } from './common/footerSections'

const ThirdSection: React.FC = () => {
	return (
		<div className={styles['thirdsection']}>
			<h3 style={{ fontSize: 14, fontWeight: 600 }}>Заказчикам и исполнителям</h3>
			<section className={styles['thirdsection_section']}>
				{thirdSection.map((el, index) => (
					<span key={index}>{el.name}</span>
				))}
			</section>
		</div>
	)
}

export default ThirdSection
