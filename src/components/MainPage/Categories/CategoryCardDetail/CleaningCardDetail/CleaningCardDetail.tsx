import React from 'react'
import PageNameArrow from '../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CategoryCardDetail.module.scss'
import CleaningCardDetailLeft from './sides/CleaningCardDetailLeft'
import CleaningCardDetailRight from './sides/CleaningCardDetailRight'

const CleaningCardDetail: React.FC = () => {
	return (
		<div className={styles['cardDetail_overlay']}>
			<div className={styles['cardDetail']}>
				<PageNameArrow
					style={{ position: 'absolute', left: 0, top: -50 }}
					pageName='КЛИНИНГ'
					routeBack={'/'} />
				<div className={styles['cardDetail_mainContent']}>
					<CleaningCardDetailLeft />
					<CleaningCardDetailRight />
				</div>
			</div>
		</div>
	)
}

export default CleaningCardDetail
