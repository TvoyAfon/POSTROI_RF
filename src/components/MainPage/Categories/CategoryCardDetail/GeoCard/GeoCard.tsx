import React, { useState } from 'react'
import PageNameArrow from '../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CategoryCardDetail.module.scss'
import { focusType, nofocusType } from '../styles/stylesCategoryCard'
import GeoCardLeft from './sides/GeoCardLeft'
import GeoCardRight from './sides/GeoCardRight'

const GeoCard: React.FC = () => {

	const [currentType, setCurrentType] = useState<'Геология Геодезия' | 'Кадастровые услуги' | 'Бурение скважин на воду'>('Геология Геодезия')


	return (
		<div className={styles['cardDetail_overlay']}>
			<div className={styles['cardDetail']}>
				<PageNameArrow
					style={{ position: 'absolute', left: 0, top: -50 }}
					pageName='ГЕОЛОГИЯ,ГЕОДЕЗИЯ и КАДАСТРОВЫЕ УСЛУГИ'
					routeBack={'/'} />
				<div className={styles['cardDetail_type']}>
					<div
						style={currentType === 'Геология Геодезия' ? focusType : nofocusType}
						onClick={() => setCurrentType('Геология Геодезия')}
						className={styles['cardDetail_type_1']}>
						<span>Геология Геодезия</span>
					</div>
					<div
						style={currentType === 'Бурение скважин на воду' ? focusType : nofocusType}
						onClick={() => setCurrentType('Бурение скважин на воду')}
						className={styles['cardDetail_type_2']}>
						<span>Бурение скважин на воду</span>
					</div>
					<div
						style={currentType === 'Кадастровые услуги' ? focusType : nofocusType}
						onClick={() => setCurrentType('Кадастровые услуги')}
						className={styles['cardDetail_type_2']}>
						<span>Кадастровые услуги</span>
					</div>
				</div>
				<div className={styles['cardDetail_mainContent']}>
					<GeoCardLeft />
					<GeoCardRight currentType={currentType}/>
				</div>
			</div>
		</div>
	)
}

export default GeoCard
