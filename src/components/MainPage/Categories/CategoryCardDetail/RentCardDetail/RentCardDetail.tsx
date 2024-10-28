import React, { useState } from 'react'
import PageNameArrow from '../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CategoryCardDetail.module.scss'
import { focusType, nofocusType } from '../styles/stylesCategoryCard'
import RentCardDetailLeft from './sides/RentCardDetailLeft'
import RentCardDetailRight from './sides/RentCardDetailRight'

const RentCardDetail: React.FC = () => {
	const [currentType, setCurrentType] = useState('1')


	return (
		<div className={styles['cardDetail_overlay']}>
			<div className={styles['cardDetail']}>
				<PageNameArrow
					style={{ position: 'absolute', left: 0, top: -50 }}
					pageName='АРЕНДА ИНСТРУМЕНТА И ОБОРУДОВАНИЯ'
					routeBack={'/'} />
				<div className={styles['cardDetail_type']}>
					<div
						style={currentType === '1' ? focusType : nofocusType}
						onClick={() => setCurrentType('1')}
						className={styles['cardDetail_type_rent1']}>
						<span>Аренда ручного,<br />
							электро- и бензо-инструмента</span>
					</div>
					<div
						style={currentType === '2' ? focusType : nofocusType}
						onClick={() => setCurrentType('2')}
						className={styles['cardDetail_type_rent2']}>
						<span>Аренда<br />
							оборудования</span>
					</div>
					<div
						style={currentType === '3' ? focusType : nofocusType}
						onClick={() => setCurrentType('3')}
						className={styles['cardDetail_type_rent3']}>
						<span>Ремонт
							инструмента<br /> и оборудования</span>
					</div>
				</div>
				<div className={styles['cardDetail_mainContent']}>
					<RentCardDetailLeft />
					<RentCardDetailRight currentType={currentType} />
				</div>
			</div>
		</div>
	)
}

export default RentCardDetail
