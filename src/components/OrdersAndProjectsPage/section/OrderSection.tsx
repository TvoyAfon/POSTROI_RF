import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import CardOrderInfo from '../../SearchOrder/CardOrderInfo/CardOrderInfo'
import Loader from '../../ui/Loader/Loader'
import { IOrderSectionProps } from './props'

const OrderSection: React.FC<IOrderSectionProps> = () => {

	const { isOrdersLoading, ordersList } = useSelector((state: RootState) => state.orders)


	/*	useEffect(() => {
			const handleScroll = () => {
				if (!sectionRef.current) return
	
				const { scrollTop, scrollHeight, clientHeight } = sectionRef.current
	
				if (scrollTop + clientHeight >= scrollHeight) {
					dispatch(incrementOrdersPage())
				}
			}
	
			sectionRef.current?.addEventListener('scroll', handleScroll)
	
			return () => {
				sectionRef.current?.removeEventListener('scroll', handleScroll)
			}
		}, [])
		*/

	/*	useEffect(() => {
			(async () => {
			
	
				try {
				
					const formattedOrders = await getFormattedOrders({
		
						limit: 100,
						page: ordersPage,
						
					})
	
					if (!formattedOrders) return
					dispatch(addOrders({ orders: formattedOrders, addFlag: 'append' }))
				}
				catch (error) {
				}
				finally {
				
				}
			
			})()
		}, [ordersPage])  */

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
			{
				isOrdersLoading
					?
					<Loader
						text='Загрузка заказов'
						style={{
							display: 'flex',
							justifyContent: 'center'
						}}
					/>
					:
					ordersList.length
						?
						<>
							{
								ordersList.map(order => (
									<CardOrderInfo
										openMap={false}
										key={order.id}
										{...order}
									/>
								))
							}
						</>
						:
						<span style={{ textAlign: 'center' }} className='textSizeL'>
							Заказов не найдено
						</span>
			}
		</div>
	)
}

export default OrderSection
