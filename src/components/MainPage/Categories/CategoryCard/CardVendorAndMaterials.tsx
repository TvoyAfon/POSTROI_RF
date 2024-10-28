import React from 'react'
import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'
import materials_img from '../../../../assets/images/mainpage_images/PALKI.svg'
import box_img from '../../../../assets/images/mainpage_images/bricks.svg'
import bricks_img from '../../../../assets/images/mainpage_images/brickss (1).svg'
import loader_img from '../../../../assets/images/mainpage_images/pogruchik.svg'

const CardVendorAndMaterials:React.FC<ICategoryCard> = ({onClick,to}) => {
	return (
		<Link onClick={onClick} to={to} className={styles.mainPage_categories_materials}>
		<div style={{ width: '220px', height: '95px', borderRadius: '8px', padding: '10px', position: 'relative' }}>
			<span style={{ position: 'absolute', lineHeight: '26px' }}> ПОСТАВЩИКИ <br /> и СТРОИТЕЛЬНЫЕ <br />МАТЕРИАЛЫ</span>
		</div>
		<img className={styles.loader} src={loader_img} alt="loader" />
		<img className={styles.materials_img} src={materials_img} alt="car" />
		<img className={styles.box} src={box_img} alt="car" />
		<img className={styles.bricks} src={bricks_img} alt="car" />
	</Link>
	)
}

export default CardVendorAndMaterials
