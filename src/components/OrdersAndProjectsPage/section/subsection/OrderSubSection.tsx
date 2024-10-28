import React from 'react'
import Line from '../../../ui/Line/Line'

interface IOrderSubSection {
	handleCurrentCategoryClick: (category: string) => void,
	currentCategory: string
}

const OrderSubSection: React.FC<IOrderSubSection> = ({ handleCurrentCategoryClick, currentCategory }) => {

	const isCurrentCat = (category: string) => {
		if (currentCategory === category) {
			return '#231F20'
		}
		else return '#8E8E93'
	}

	const colorBorder = (category:string) =>{
		if(currentCategory === category){
			return '1px solid #231F20'
		}
		else return '1px solid #8E8E93'
	}

	return (

		<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
			<div
				onClick={() => handleCurrentCategoryClick('Мои заказы')}
				style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
				<span style={{ color: isCurrentCat('Мои заказы') }} className='textSizeL'>Мои заказы</span>
				<Line style={{border:colorBorder('Мои заказы')}} lineWidth='100%' />
			</div>
			<div
				onClick={() => handleCurrentCategoryClick('Найти заказ')}
				style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
				<span style={{ color: isCurrentCat('Найти заказ') }} className='textSizeL'>Найти заказ</span>
				<Line style={{border:colorBorder('Найти заказ')}} lineWidth='100%' />
			</div>
		</div>

	)
}

export default OrderSubSection
