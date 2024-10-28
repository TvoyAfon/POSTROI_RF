import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import CardOrderInfo from '../../SearchOrder/CardOrderInfo/CardOrderInfo'
import Loader from '../../ui/Loader/Loader'
import { IOrderSectionProps } from './props'

const MyOrderSection: React.FC<IOrderSectionProps> = () => {
	const { myOrdersList, isMyOrdersLoading } = useSelector((state: RootState) => state.orders)

	const [isLoading] = useState<boolean>(false)


	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
			{
				isMyOrdersLoading
					?
					<Loader
						text='Загрузка ваших заказов'
						style={{
							display: 'flex',
							justifyContent: 'center'
						}}
					/>
					:
					myOrdersList.length
						?
						<>
							{
								myOrdersList.map(order => (
									<CardOrderInfo
										openMap={false}
										key={order.id}
										{...order}
									/>
								))
							}
							{
								isLoading
								&& <Loader
									text='Подгрузка новых заказов...'
									style={{
										display: 'flex',
										justifyContent: 'center'
									}}
								/>
							}
						</>
						:
						<span style={{ textAlign: 'center' }} className='textSizeL'>
							Нет заказов
						</span>
			}
		</div>
	)
}

export default MyOrderSection;

