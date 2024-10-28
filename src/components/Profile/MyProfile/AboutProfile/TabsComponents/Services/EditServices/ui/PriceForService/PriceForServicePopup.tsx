import React from 'react'
import RadioButton from '../../../../../../../../ui/RadioButton/RadioButton'

const sections = ['кв.м', 'сотка', 'кв.по полу', 'кв.см']

const PriceForServicePopup: React.FC = () => {
	return (
		<div
			className='flex-column gap-medium'
			style={{
				position: 'absolute',
				width: 160,
				backgroundColor: '#fff',
				borderRadius: 8,
				padding: 16,
				top: 41,
				right: 0,
				zIndex: 11,
				border: '1px solid rgba(0,0,0,0.18)'
			}}>
			{sections.map((section, index) => (
				<RadioButton label={section} key={index} />
			))}
		</div>
	)
}

export default PriceForServicePopup
