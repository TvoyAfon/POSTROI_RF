import React from 'react'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import human5 from '../../../../assets/images/mainpage_images/green_human.svg'
import human2 from '../../../../assets/images/mainpage_images/human.svg'
import human4 from '../../../../assets/images/mainpage_images/orange_human.svg'
import human3 from '../../../../assets/images/mainpage_images/white_human.svg'
import styles from '../../MainPage.module.scss'

const CardWorkersAndMasters: React.FC<ICategoryCard> = ({ onClick, to }) => {
	return (
		<Link
			onClick={onClick}
			to={to}
			className={styles.mainPage_categories_market}>
			<div style={{ width: '210px', height: '95px', borderRadius: '8px', padding: '10px', position: 'relative' }}>
				<span style={{ position: 'absolute', lineHeight: '26px' }}>БИРЖА <br />РАЗНОРАБОЧИХ и <br /> СПЕЦИАЛИСТОВ</span>
			</div>
			<img className={styles.human1} src={human4} alt="human1" />
			<img className={styles.human2} src={human5} alt="human2" />
			<img className={styles.human3} src={human3} alt="human3" />
			<img className={styles.human4} style={{ width: '98px', height: 'auto' }} src={human2} alt="human4" />
		</Link>
	)
}

export default CardWorkersAndMasters
