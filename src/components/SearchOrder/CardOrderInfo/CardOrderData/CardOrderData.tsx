import React, { useMemo } from 'react'
import timeClocksIcon from '../../../../assets/images/createOrder_img/time-clocks.svg'
import searchorder_img from '../../../../assets/images/other/patterns 1.png'
import { getDate } from '../../../../utils/date'
import { ICardOrderInfo } from '../../../OrdersAndProjectsPage/section/props'
import IconSignature from '../../../Profile/ui/IconSignature'
import CardDetail from './CardDetail'
import { orderDescStyles } from './styles/cardOrderStyles'
import { getOrderInfo } from './utils'

const CardOrderData: React.FC<ICardOrderInfo> = ({
	openMap,
	...order
}) => {
	const fields = useMemo(
		() => getOrderInfo(order),
		[order]
	)

	const publishDate = useMemo(
		() => order.publish_at && getDate(order.publish_at).toLowerCase(),
		[order]
	)

	return (
		<div style={!openMap ?
			{ display: 'flex', gap: 32, cursor: 'pointer' } :
			{ justifyContent: 'center', alignItems: 'center', display: 'flex', gap: 8, flexDirection: 'column', cursor: 'pointer' }}>
			<img
				style={
					{ width: 317, height: 317, borderRadius: 16, objectFit: 'cover' }}
				src={order.files && order.files.length > 0 ? order.files[0].file : searchorder_img}
				alt="img"
			/>
			<section
				style={!openMap ?
					{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: '24px' } :
					{ display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 8 }}>
				<div style={{ wordBreak: 'break-word', paddingTop: '24px' }}>
					<span className='textSizeL'> {order.name.toUpperCase()}</span>
				</div>
				<span
					style={orderDescStyles}>{order.description}
				</span>
				<span style={{ color: '#231F20', fontWeight: 800 }}>{order.address}</span>
				{
					fields.map((field, index) => (
						<CardDetail key={index}>
							<span>{field.param}</span> <b style={{ fontWeight: '700' }}>{field.value}</b>
						</CardDetail>
					))
				}
				{ /*<span style={{ fontSize: 14, fontWeight: 800, color: '#8E8E93' }}>
					{
						`${order.sub_category.category_name} > ${order.sub_category.name}`
					}
				</span> */}
				<div style={{
					display: 'flex',
					gap: '22px'
				}}>
					<span style={{
						color: '#8E8E93'
					}}>Заказ № {order.id}</span>
					{
						publishDate
						&&
						<IconSignature
							icon={timeClocksIcon}
							iconStyle={{
								width: '14px',
								height: '14px'
							}}
							signatureStyle={{
								color: '#8E8E93'
							}}
						>
							{publishDate}
						</IconSignature>
					}
				</div>
			</section>
		</div>
	)
}

export default CardOrderData
