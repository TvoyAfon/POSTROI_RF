import React from 'react'
import { ICategoryVendorCard } from './interface/ICategoryVendorCard'

const CategoryVendorCard: React.FC<ICategoryVendorCard> = ({ address, delivery, img, name, site }) => {

	return (

		<div style={{ padding: 32, backgroundColor: 'white', borderRadius: 32, cursor: 'pointer' }}>
			<div style={{ display: 'flex', gap: 32 }}>
				<img src={img} alt="img" />
				<div className='flex-column gap-medium'>
					<span className='textSizeL'>{name}</span>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#7099ED' }}>{site}</span>
					<span>Адрес:<span style={{ fontSize: 16, fontWeight: 800 }}>{address}</span></span>
					<span>Поставляет в регионы : <span style={{ fontSize: 16, fontWeight: 800 }}> {delivery}</span></span>
				</div>
			</div>
		</div>

	)
}

export default CategoryVendorCard
