import React from 'react'
import styles from './OrderHeader.module.scss'

const OrderHeader: React.FC = () => {
	return (
		<div className={styles.order_header}>
			<span style={{ fontWeight: '600', fontSize: '18px', color: 'white' }}>Как будут видеть вашу заявку исполнители</span>
		</div>
	)
}

export default OrderHeader
