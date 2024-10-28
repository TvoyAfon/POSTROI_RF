import React from 'react'
import { Link } from 'react-router-dom'
import car_img from '../../../../assets/images/mainpage_images/newCategories/pogruschik.svg'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'

const CardTrucking: React.FC<ICategoryCard> = ({ onClick, to }) => {
	return (
		<Link
			onClick={onClick}
			to={to}
			className={styles.mainPage_categories_transport}>
			<div>
				<span style={{ position: 'absolute', lineHeight: '26px' }}>ГРУЗОПЕРЕВОЗКИ <br />и УСЛУГИ<br /> СПЕЦТЕХНИКИ</span>
			</div>
			<img src={car_img} alt="car" />
		</Link>
	)
}

export default CardTrucking
