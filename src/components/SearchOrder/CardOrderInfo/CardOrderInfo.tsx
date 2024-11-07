import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ratingStar from '../../../assets/images/profile/rating-star-checked.svg'
import { useModal } from '../../../hooks/useModal'
import { chatService } from '../../../services/chat/chat'
import { ICreateChatSchema } from '../../../services/chat/common/types'
import { orderService } from '../../../services/order/order'
import { OrderStatus } from '../../../services/order/types/enums'
import { addChatList, openChat, setSelectedChatId } from '../../../store/slices/ChatSlice/ChatSlice'
import { openModal } from '../../../store/slices/FormSlice/FormSlice'
import { deleteMyOrder } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { ICardOrderInfo } from '../../OrdersAndProjectsPage/section/props'
import IconSignature from '../../Profile/ui/IconSignature'
import SignsCardDeleteConfirm from '../../Signs/SignsCard/modal/SignsCardDeleteConfirm'
import Button from '../../ui/Button/Button'
import CardNumberModal from '../../ui/CardNumberModal/CardNumberModal'
import Loader from '../../ui/Loader/Loader'
import CardOrderRespond from '../modal/CardOrderRespond'
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
	const nav = useNavigate()
	const dispatch = useDispatch()
	const [isOpenConfirm, setIsOpenConfirm] = useState(false)
	const { user } = useSelector((state: RootState) => state.auth)
	const { chatList } = useSelector((state: RootState) => state.chat)

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [isLoadingRespond, setIsLoadingRespond] = useState<boolean>(false)

	const [openShowNumber, setOpenShowNumber] = useState<boolean>(false)
	const [openRespond, setOpenRespond] = useState<boolean>(false)

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

	const handleOpenShowNumber = (e: React.MouseEvent) => {
		e.stopPropagation()
		setOpenShowNumber(true)
	}

	const handleOpenDetail = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!user?.id) {
			return dispatch(openModal('authModal'))
		}
		setOpenRespond(true)
	}
	const handleOpenRespond = async (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!order.client.id || !user?.id) {
			return dispatch(openModal('authModal'))
		}

		const schema: ICreateChatSchema = {
			member_id: order.client.id,
			member_owner_id: user?.id,
			status: 'open',
			type_n: 'orders',
			type_number: 0
		}

		let chatId: number | null = null

		try {

			setIsLoadingRespond(true)
			const response = await chatService.createChat(schema)
			if (!response) return
			chatId = response.chat_id
		} catch (error: any) {
			if (error.message === 'Such personal chat is exist') {
				try {
					const chatIdResponse = await chatService.chatExist({ member_id: schema.member_id, member_owner_id: schema.member_owner_id })
					if (!chatIdResponse) return
					chatId = chatIdResponse.chat_id
					const chat = chatList.find(chat => chat.chat_id === chatId)
					if (!chat) {
						const chatResponse = await chatService.getChat(chatId)
						if (!chatResponse) return
						dispatch(addChatList([...chatList, chatResponse]))
					}
				} catch (error) {
					console.log('catchIdResponse', error)
				}
			}
			console.log(error)
		}
		finally {
			dispatch(openChat(true))
			dispatch(setSelectedChatId(chatId))
			setIsLoadingRespond(false)
		}

	}
	console.log(order)

	return (
		<>
			{openRespond &&
				<CardOrderRespond
					order={order}
					onClose={() => setOpenRespond(false)} />}
			{openShowNumber &&
				<CardNumberModal
					userProfile={
						<CardOrderUser
							userAvatar={order.client_data?.profile_photo}
							userName={clientUsername}
							lastVisit='Был недавно'
						/>}
					phone={order.contact_phone}
					onClose={() => setOpenShowNumber(false)} />}
			{isOpenConfirm &&
				<SignsCardDeleteConfirm
					isLoading={isLoading}
					onDelete={handleDelete}
					onClose={() => setIsOpenConfirm(false)}
					cardType='Заказ' />}
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
											onClick={handleOpenRespond}
											style={{ fontSize: 14, fontWeight: 400, width: 156 }}>
											{isLoadingRespond ? <Loader
												textStyle={{ fontSize: 14, fontWeight: 300, color: 'white' }} /> : 'Откликнуться'}
										</Button>
										<Button
											onClick={handleOpenDetail}
											style={{ backgroundColor: '#8E8E93', fontSize: 14, fontWeight: 400 }}>Уточнить детали</Button>
										<Button
											onClick={handleOpenShowNumber}
											style={{ fontSize: 14, fontWeight: 400, width: 156 }}>Показать телефон</Button>
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
