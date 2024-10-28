import React, { useState } from 'react'
import { catStyles, currentCatStyles } from './styles/filterstyles'

const categories = ['Все заказы', 'Я откликнулся', 'Меня пригласили', 'Мои категории']

const OrdersFilter: React.FC = () => {

	const [currentCat, setCurrentCat] = useState('')

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
			{categories.map((category, index) => (
				<div
					onClick={() => setCurrentCat(category)}
					style={currentCat === category ? currentCatStyles : catStyles}
					key={index}>
					{category}
				</div>
			))}
		</div>
	)
}

export default OrdersFilter
