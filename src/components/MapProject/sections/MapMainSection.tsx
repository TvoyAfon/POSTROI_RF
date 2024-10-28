import React from 'react'
import PageNameArrow from '../../ui/PageName&Arrow/PageNameArrow'
import styles from '../MapProject.module.scss'
import { mapSections1, mapSections2 } from '../common/mapSections'

const MapMainSection: React.FC = () => {
	return (
		<div className={styles['mainsection']}>
			<div className='flex-column gap-medium'>
				<PageNameArrow styleName={{ color: 'gray', fontSize: 14 }} pageName='Главная' routeBack={'/'} />
				<span style={{ fontSize: 20, fontWeight: 600, textDecoration: 'none' }}>КАРТА САЙТА</span>
			</div>
			<div className={styles['mainsection_section']}>
				<h3 style={{ textDecoration: 'underline', fontSize: 16, fontWeight: 600 }}>ГЛАВНАЯ</h3>
				<div className='flex-column gap-medium'>
					{mapSections1.map((el, index) => (
						<span key={index}>{el}</span>
					))}
				</div>
				<div className='flex-column gap-medium'>
					{mapSections2.map((el, index) => (
						<span key={index}>{el}</span>
					))}
				</div>
			</div>
		</div>
	)
}

export default MapMainSection
