import React from 'react'
import styles from '../Footer.module.scss'
import { secondSection } from './common/footerSections'

const SecondSection: React.FC = () => {
	return (
		<div className={styles['secondsection']}>
			<h3 style={{ fontSize: 14, fontWeight: 600 }}>Наши услуги</h3>
			<section className={styles['secondsection_section']}>
				{secondSection.map((el, index) => (
					<span key={index}>{el.name} <br /> {el.name2} </span>
				))}
			</section>
		</div>
	)
}

export default SecondSection
