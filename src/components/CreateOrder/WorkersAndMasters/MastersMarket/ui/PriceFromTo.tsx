import React from 'react'
import Field from '../../../../ui/Field/Field'

const PriceFromTo: React.FC = () => {
	return (
		<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
			<span style={{ fontWeight: 700 }}>Зарплата от</span>
			<Field style={{ width: 102 }} />
			<span style={{ fontWeight: 700 }}>до</span>
			<Field style={{ width: 102 }} />
		</div>
	)
}

export default PriceFromTo
