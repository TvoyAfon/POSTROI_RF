import React from 'react'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'
import design_engineering from '../../../../assets/images/mainpage_images/newCategories/projectanddesign.svg'

const CardDesignEngineering: React.FC<ICategoryCard> = ({ to }) => {
	return (
		<Link
			className={styles['mainPage_categories_designEngineering']}
			to={to}>
			<div style={{paddingTop:5}}>
				<span>ПРОЕКТИРОВАНИЕ <br />и ДИЗАЙН</span>
			</div>
			<img src={design_engineering} alt="design" />
		</Link>
	)
}

export default CardDesignEngineering
