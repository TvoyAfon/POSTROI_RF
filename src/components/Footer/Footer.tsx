import React from 'react'
import ArrowToTop from '../MainPage/ArrowToTop/ArrowToTop'
import Line from '../ui/Line/Line'
import styles from './Footer.module.scss'
import FirstSection from './sections/FirstSection'
import FourthSection from './sections/FourthSection'
import SecondSection from './sections/SecondSection'
import ThirdSection from './sections/ThirdSection'
import UnderFooter from './sections/UnderFooter'

const Footer: React.FC = () => {
	return (
		<div className={styles['footer_overlay']} style={{ display: 'flex', justifyContent: 'center' }}>
			<div className={styles['footer']}>
				<Line lineWidth='100%' />
				<div className={styles['footer_section']}>
					<FirstSection />
					<SecondSection />
					<ThirdSection />
					<FourthSection />
				</div>
				<Line lineWidth='100%' />
				<UnderFooter />
				<ArrowToTop />
			</div>
		</div>
	)
}

export default Footer
