import React, { CSSProperties, Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import styles from '../OrdersAndProjects.module.scss'

const OrderHeader: React.FC<{
	style?: CSSProperties
	currentCategory?: string
	setCurrentCategory: Dispatch<SetStateAction<string>>
}> = ({ style, currentCategory, setCurrentCategory }) => {

	const { ordersList } = useSelector((state: RootState) => state.orders)

	const getCategoryStyle = (category: string) => ({
		backgroundColor: currentCategory === category ? '#7099ED' : 'transparent',
		color: currentCategory === category ? 'white' : '#8E8E93',
	})

	const categories = [
		{ name: 'Заказы', count: ordersList ? ordersList.length : 0 },
		{ name: 'Проекты', count: localStorage.getItem('count_projects') },
	]

	return (
		<div style={{ display: 'grid', gridTemplateColumns: "7.2fr 1fr", ...style }}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{categories.slice(0, 2).map(({ name, count }) => (
					<div
						key={name}
						style={getCategoryStyle(name)}
						className={styles[name === 'Мои заказы' ? 'myOrders' : 'myProject']}
						onClick={() => setCurrentCategory(name)}
					>
						<span className='textSizeL'>{name}</span>
						<span>{count}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default OrderHeader