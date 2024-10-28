import React from 'react'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'
import expertise_svg from '../../../../assets/images/mainpage_images/newCategories/exspertise (2).svg'

const CategoryCardExpertise: React.FC<ICategoryCard> = ({ to }) => {
	return (
		<Link
			className={styles['mainPage_categories_expertise']}
			to={to}>
			<div style={{ paddingTop: 5 }}>
				<span>СТРОИТЕЛЬНО-<br />
					ТЕХНИЧЕСКАЯ <br />
					ЭКСПЕРТИЗА<br />
					и КОНТРОЛЬ</span>
			</div>
			<img src={expertise_svg} alt="expertise_svg" />
		</Link>
	)
}

export default CategoryCardExpertise
