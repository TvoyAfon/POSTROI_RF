import React from 'react'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'
import geo_svg from '../../../../assets/images/mainpage_images/newCategories/geo.svg'

const CategoryCardGeo: React.FC<ICategoryCard> = ({ to }) => {
	return (

		<Link
			className={styles['mainPage_categories_geo']}
			to={to}>
			<div style={{ paddingTop: 5 }}>
				<span>ИНЖЕНЕРНО-<br />ГЕОДЕЗИЧЕСКИЕ<br /> ИЗЫСКАНИЯ<br /> и КАДАСТРОВЫЕ<br /> УСЛУГИ</span>
			</div>
			<img src={geo_svg} alt="geo" />
		</Link>
	)
}

export default CategoryCardGeo
