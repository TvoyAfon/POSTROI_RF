import React from 'react'
import styles from '../../MainPage.module.scss'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import lineika_img from '../../../../assets/images/mainpage_images/newCategories/lineika.svg'
import calculator_img from '../../../../assets/images/mainpage_images/newCategories/calculator.svg'


const CategoryCardHelpBuilding:React.FC<ICategoryCard> = ({to}) => {
	return (
		<Link
		className={styles['mainPage_categories_helpBuild']}
		to={to}>
		<div style={{ paddingTop: 5 }}>
			<span>ПОМОЩЬ <br/>В СТРОИТЕЛЬСТВЕ</span>
		</div>
		<img src={lineika_img} alt="lineika_img" />
		<img src={calculator_img} alt="calculator_img" />
	</Link>
	)
}

export default CategoryCardHelpBuilding
