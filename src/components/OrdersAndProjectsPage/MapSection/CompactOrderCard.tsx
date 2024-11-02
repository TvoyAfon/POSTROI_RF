import React from 'react'
import { checkPhotoFormat } from '../../../common/common'
import { IOrderFullInfo } from '../../../services/order/types/types'
import styles from '../OrdersAndProjects.module.scss'
import { compactCardStyle } from './styles/compactCardStyles'

const CompactOrderCard: React.FC<IOrderFullInfo> = ({ address, description, files, name }) => {
	return (
		<div className={styles['compactOrderCard']}>
			<img src={checkPhotoFormat(files)} alt="avatar" />
			<div className='flex-column gap-medium' style={{ padding: 8, alignItems: 'center' }}>
				<span
					className='textSizeL'
					style={compactCardStyle[0]}>{name.toUpperCase()}
				</span>
				<span style={compactCardStyle[1]}>{description.toLowerCase()}</span>
				<span style={compactCardStyle[2]}>{address}</span>
			</div>
		</div>
	)
}

export default CompactOrderCard
