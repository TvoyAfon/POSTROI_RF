import React from 'react'
import { ROUTES_CATEGORY } from '../../../../../../../routes/routes'
import PageNameArrow from '../../../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../CardVakancy.module.scss'
import CompanyIcon from '../CompanyIcon'
import CardVakancyInfo from './CardVakancyInfo'

const CardVakancyDetail: React.FC = () => {

	return (
		<div className={styles['cardVakancy_overlay']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 165, paddingBottom: 32 }}>
			<div className={styles['cardVakancy_container']} style={{ display: 'flex', gap: 12 }}>
				<div className={styles['cardVakancyBox']}>
					<CompanyIcon isCardInDetail={true} />
					<PageNameArrow style={{ position: 'absolute', bottom: 280, left: 0 }} routeBack={ROUTES_CATEGORY.showVakancy} pageName='БИРЖА СПЕЦИАЛИСТОВ' />
				</div>
				<CardVakancyInfo />
			</div>
		</div>
	)
}

export default CardVakancyDetail
