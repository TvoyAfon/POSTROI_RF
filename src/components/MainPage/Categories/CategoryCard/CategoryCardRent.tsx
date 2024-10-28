import React from 'react'
import { Link } from 'react-router-dom'
import rent_svg from '../../../../assets/images/mainpage_images/newCategories/rent.svg'
 
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'

const CategoryCardRent: React.FC<ICategoryCard> = ({ to }) => {
	return (
		<Link
			className={styles['mainPage_categories_rent']}
			to={to}>
			<div style={{ paddingTop: 5 }}>
				<span>АРЕНДА <br /> ИНСТРУМЕНТА <br />и ОБОРУДОВАНИЯ</span>
			</div>
			<img src={rent_svg} alt="rent_svg" />
		</Link>
	)
}

export default CategoryCardRent
