import React, { useState } from 'react'
import PageNameArrow from '../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CategoryCardDetail.module.scss'
import { focusType, nofocusType } from '../styles/stylesCategoryCard'
import TruckingAndServicesLeft from './sides/TruckingAndServicesLeft'
import TruckingAndServicesRight from './sides/TruckingAndServicesRight'

const TruckingAndServices: React.FC = () => {
	const [currentType, setCurrentType] = useState<'Грузоперевозки' | 'Услуги спецтехники'>('Грузоперевозки')


	return (
		<div className={styles['cardDetail_overlay']}>
			<div className={styles['cardDetail']}>
				<PageNameArrow
					style={{ position: 'absolute', left: 0, top: -50 }}
					pageName='ГРУЗОПЕРЕВОЗКИ и УСЛУГИ СПЕЦТЕХНИКИ'
					routeBack={'/'} />
				<div className={styles['cardDetail_type']}>
					<div
						style={currentType === 'Грузоперевозки' ? focusType : nofocusType}
						onClick={() => setCurrentType('Грузоперевозки')}
						className={styles['cardDetail_type_1']}>
						<span>Грузоперевозки</span>
					</div>
					<div
						style={currentType === 'Услуги спецтехники' ? focusType : nofocusType}
						onClick={() => setCurrentType('Услуги спецтехники')}
						className={styles['cardDetail_type_2']}>
						<span>Услуги спецтехники</span>
					</div>
				</div>
				<div className={styles['cardDetail_mainContent']}>
					<TruckingAndServicesLeft currentType={currentType} />
					<TruckingAndServicesRight currentType={currentType} />
				</div>
			</div>
		</div>
	)
}

export default TruckingAndServices
