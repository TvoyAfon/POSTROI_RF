import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ratingStar from '../../../assets/images/profile/rating-star-checked.svg'
import { useModal } from '../../../hooks/useModal'
import { orderService } from '../../../services/order/order'
import { OrderStatus } from '../../../services/order/types/enums'
import { deleteMyOrder } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { ICardOrderInfo } from '../../OrdersAndProjectsPage/section/props'
import IconSignature from '../../Profile/ui/IconSignature'
import SignsCardDeleteConfirm from '../../Signs/SignsCard/modal/SignsCardDeleteConfirm'
import Button from '../../ui/Button/Button'
import CardOrderClarify from '../modal/CardOrderClarify'
import SearchOrderCardDetail from '../modal/SearchOrderCardDetail'
import CardOrderData from './CardOrderData/CardOrderData'
import styles from './CardOrderInfo.module.scss'
import CardOrderUser from './CardOrderUser/CardOrderUser'
import RewievsAndQuestion from './RewievsAndQuestions.tsx/RewievsAndQuestion'
import OrderCompleted from './ui/OrderCompleted'

const CardOrderInfo: React.FC<ICardOrderInfo> = ({
	openMap,
	...order
}) => {
	const { handleOpen, isOpen, handleClose } = useModal()
	const [openClarify, setOpenClarify] = useState(false)
	const nav = useNavigate()
	const dispatch = useDispatch()
	const [isOpenConfirm, setIsOpenConfirm] = useState(false)
	const { user } = useSelector((state: RootState) => state.auth)
	const [isLoading, setIsLoading] = useState<boolean>(false)


	const isMyOrder = user?.id === order.client_data?.id
	const isCompleted = order.status === OrderStatus.COMPLETED

	const handleOpenConfirm = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsOpenConfirm(true)
	}

	const handleDelete = async () => {
		if (!user || !user?.id) return

		try {
			setIsLoading(true)
			await orderService.delete({
				client_id: user.id,
				order_id: order.id
			})
			dispatch(deleteMyOrder(order.id))
			setIsOpenConfirm(false)
		}
		catch (error) {
		}
		finally {
			setIsLoading(false)
		}
	}

	const clientUsername = useMemo(() => {
		const surnameFirstLetter = order.client_data?.last_name?.charAt(0)
		return `${order.client_data?.first_name} ${surnameFirstLetter || ''}`
	}, [order])

	const executorUsername = useMemo(() => {
		const surnameFirstLetter = order.client_data?.last_name?.charAt(0)
		return `${order.client_data?.first_name} ${surnameFirstLetter || ''}`
	}, [order])

	const navToUserProfile = (userId?: number | null) => {
		if (!userId) return
		nav(`/profile/${userId}`)
	}

	const handleOpenCardDetail = (e: React.MouseEvent) => {
		e.stopPropagation()
		handleOpen()
	}


	return (
		<>
			{isOpenConfirm &&
				<SignsCardDeleteConfirm
					isLoading={isLoading}
					onDelete={handleDelete}
					onClose={() => setIsOpenConfirm(false)}
					cardType='Заказ' />}
			{openClarify &&
				<CardOrderClarify onClose={() => setOpenClarify(false)} />}
			{isOpen &&
				<SearchOrderCardDetail
					onDelete={handleDelete}
					isMyOrder={isMyOrder}
					order={order}
					onClose={handleClose}
				/>}
			<div
				style={{ backgroundColor: '#F4F3F1', padding: 0, borderRadius: 16 }}
				onClick={handleOpenCardDetail}
				className={!openMap ? styles.cardOrderInfo : styles.cardOrderInfoMap}>
				<CardOrderData
					{...order}
					openMap={openMap}
				/>
				{!openMap && <>
					{!isMyOrder ?
						<section
							style={{ display: 'flex', flexDirection: 'column', gap: !openMap ? 40 : 8, padding: '16px' }}>
							<div className='flex-column gap-medium'>
								{
									isCompleted
									&&
									<OrderCompleted />
								}
								<CardOrderUser
									onClick={() => navToUserProfile(order.client_data?.id)}
									userAvatar={order.client_data?.profile_photo}
									userName={clientUsername}
									lastVisit='Был недавно'
								/>
								<IconSignature signatureStyle={{ fontWeight: 'bold' }} icon={ratingStar}>
									4,3
								</IconSignature>
								{
									!isCompleted
									&&
									<>
										<Button
											onClick={(event) => event.stopPropagation()}
											style={{ fontSize: 14, fontWeight: 400 }}>
											Откликнуться
										</Button>
										<Button onClick={(event) => {
											event.stopPropagation()
											setOpenClarify(true)
										}} style={{ backgroundColor: '#8E8E93', fontSize: 14, fontWeight: 400 }}>Уточнить детали</Button>
										<Button style={{ fontSize: 14, fontWeight: 400 }}>Показать телефон</Button>
									</>
								}
							</div>
							{
								order.executor_data
								&&
								<CardOrderUser
									onClick={() => navToUserProfile(order.executor_data?.id)}
									style={{
										marginTop: 'auto'
									}}
									isExecutor
									userAvatar={order.executor_data?.profile_photo}
									userName={executorUsername}
								/>
							}
							{
								isCompleted
								&&
								<Button style={{
									marginTop: 'auto',
									fontWeight: 400,
									fontSize: '14px'
								}}>
									Оставить отзыв
								</Button>
							}
						</section> :
						<section className='flex-column gap-medium' style={{
							padding: '24px', justifyContent: !order.executor_data ? undefined : 'space-between'
						}}>
							<RewievsAndQuestion />
							<div className='flex-column gap-medium'>
								<Button
									style={{ fontSize: 14, fontWeight: 400 }}
									onClick={() => nav(`/edit-order/${order.id}`)}>Редактировать</Button>
								<Button
									onClick={handleOpenConfirm}
									style={{ backgroundColor: '#8E8E93', fontSize: 14, fontWeight: 400 }}>Удалить</Button>
							</div>
						</section>
					}
				</>}
			</div>
		</>
	)
}

export default CardOrderInfo
