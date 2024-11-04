import React from 'react'
import Button from '../../../../../ui/Button/Button'

const arrButtonName = ['Не важно', 'От 1 года', 'от 3 лет', 'от 5 лет']

const FilterVendorOnMarket: React.FC = () => {
	return (
		<div>
			<span className='textSizeL'>Поставщик на рынке</span>
			<div style={{ display: 'flex', gap: 17, paddingTop: 16 }}>{arrButtonName.map((button, index) => (
				<Button style={{ borderRadius: 32, width: 140 }} key={index}>{button}</Button>
			))}
			</div>
		</div>
	)
}

export default FilterVendorOnMarket
