import React, { useState } from 'react'
import arrow_down from '../../../../assets/images/createOrder_img/circle-arrow-down-01.svg'
import { IMaterialCard } from '../../../../interface/cardMaterials.props'
import styles from '../CreateOrderMaterials.module.scss'
import OrderMaterialsPopup from '../OrderMaterialsPopUp/OrderMaterialsPopup'

const MaterialCard: React.FC<IMaterialCard> = ({ material }) => {

	const [showPopup, setShowPopup] = useState<boolean>(false)

	const handleClick = () => {
		setShowPopup(!showPopup)
	}

	return (<>
		<div className={styles.categories_list} >{material}
			<img onClick={handleClick} style={{ cursor: 'pointer' }} src={arrow_down} alt='arrow' />
		</div>
		{showPopup && <OrderMaterialsPopup>
			<li>
				категория1
			</li>
			<li>
				категория2
			</li>
			</OrderMaterialsPopup>}
	</>
	)
}

export default MaterialCard
