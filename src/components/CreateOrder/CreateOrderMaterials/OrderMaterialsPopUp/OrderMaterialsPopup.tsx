import React from 'react'
import styles from './OrderMaterialsPopup.module.scss'
import { IOrderPopup } from '../../../../interface/orderPopup.props'

const OrderMaterialsPopup:React.FC<IOrderPopup> = ({children}) => {
	return (
		<div className={styles.popup_container}>
			<ul>
				{children}
			</ul>
		</div>
	)
}
export default OrderMaterialsPopup
