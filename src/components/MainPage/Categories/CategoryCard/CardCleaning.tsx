import React from 'react'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'
import cleaning_img from '../../../../assets/images/mainpage_images/girl.svg'

const CardCleaning:React.FC<ICategoryCard> = ({onClick,to}) => {
	return (
		<Link onClick={onClick} to={to} className={styles.mainPage_categories_cleaning}>
		<div style={{ width: '120px', height: '42px', borderRadius: '8px', padding: '10px', position: 'relative' }}>
			<span style={{ position: 'absolute', lineHeight: '26px' }}>КЛИНИНГ</span>
		</div>
		<img src={cleaning_img} alt="car" />
	</Link>
	)
}

export default CardCleaning
