import React from 'react'
import { Link } from 'react-router-dom'
import human_worker_img from '../../../../assets/images/mainpage_images/human_stroitelstvo.svg'
import wall2_white from '../../../../assets/images/mainpage_images/wall2_whitee.svg'
import wall1_img from '../../../../assets/images/mainpage_images/wall_1.png'
import wall2_img from '../../../../assets/images/mainpage_images/wall_2.png'
import wall1_white from '../../../../assets/images/mainpage_images/wall_white.svg'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'


const CardBuilding: React.FC<ICategoryCard> = ({ to, onClick, onMouseEnter, onMouseLeave, wall }) => {
	return (
		<Link
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
			to={to}
			className={styles.mainPage_categories_construction}>
			<div style={{ width: '195px', height: '70px', borderRadius: '8px', padding: '10px', position: 'relative', zIndex: 2 }}>
				<span style={{ position: 'absolute', lineHeight: '26px' }}>СТРОИТЕЛЬСТВО <br /> и РЕМОНТ</span>
			</div>
			<img className={styles.human_worker} src={human_worker_img} alt="car" />
			{!wall ?
				<img className={styles.wall1} src={wall1_img} alt="car" /> :
				<img className={styles.wall3} src={wall2_white} alt="car" />}
			<img className={styles.wall2} src={wall ? wall1_white : wall2_img}
				alt="car" />
		</Link>
	)
}

export default CardBuilding
