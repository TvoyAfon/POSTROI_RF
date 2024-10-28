import React from 'react'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'
import cards_blue from '../../../../assets/images/mainpage_images/newCategories/blue_cards.svg'
import white_cards from '../../../../assets/images/mainpage_images/newCategories/white_Cards.svg'
import white_card from '../../../../assets/images/mainpage_images/newCategories/white_card.svg'

const CategoryCardSigns:React.FC<ICategoryCard> = ({to}) => {
	
	return (
		<Link
			className={styles['mainPage_categories_signs']}
			to={to}>
			<div style={{ paddingTop: 5 }}>
				<span>ОБЪЯВЛЕНИЯ</span>
			</div>
			<img src={cards_blue} alt="cards_blue" />
			<img src={white_cards} alt="white_cards" />
			<img src={white_card} alt="white_card" />
		</Link>
	)
}

export default CategoryCardSigns
