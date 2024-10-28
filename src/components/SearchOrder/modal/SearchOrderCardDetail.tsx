import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loc_svg from '../../../assets/images/createOrder_img/location.svg'
import { useModal } from '../../../hooks/useModal'
import { PaymentMethod } from '../../../services/order/types/enums'
import { IOrderFullInfo } from '../../../services/order/types/types'
import { flexRow } from '../../CreateOrder/forms/styles/stylesCreateOrder'
import SignsCardComplaint from '../../Signs/SignsCard/modal/SignsCardComplaint'
import SignsCardDeleteConfirm from '../../Signs/SignsCard/modal/SignsCardDeleteConfirm'
import Button from '../../ui/Button/Button'
import CloseButton from '../../ui/CloseButton/CloseButton'
import ModalContainer from '../../ui/Modal/ModalContainer'


const SearchOrderCardDetail: React.FC<{
	onClose?: () => void,
	order: IOrderFullInfo,
	isMyOrder: boolean,
	onDelete: () => void
}> = ({ onClose, order, isMyOrder, onDelete }) => {

	const { handleClose, handleOpen, isOpen } = useModal()
	const [openDelete, setOpenDelete] = useState(false)

	const nav = useNavigate()

	return (
		<>
			{openDelete &&
				<SignsCardDeleteConfirm
					cardType='Заказ'
					isOverlay={false}
					onDelete={onDelete}
					onClose={() => setOpenDelete(false)} />}
			{isOpen && <SignsCardComplaint onClose={handleClose} />}
			<ModalContainer
				isOnOverlay={true}
				style={{ width: 1140, position: 'fixed' }}
				zIndex={12}>
				<div className='flex-column'>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span style={{ fontWeight: 700, color: '#8E8E93' }}>{''}</span>
						<CloseButton onClick={onClose} />
					</div>
					<span className='textSizeL'>{order.name}</span>
					<div
						style={{ overflowY: 'scroll', display: 'flex', flexDirection: 'column', gap: 24, height: 500 }}>
						<div
							style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
							{order?.files && order.files.length > 0 ? order.files.map((photo) => (
								<img
									src={photo.file}
									style={{ width: 140, height: 140, borderRadius: 14 }}
									key={photo.filename}
									alt={photo.filename} />
							)) : null}
						</div>
						<div style={flexRow}>
							<span>Адрес:</span>
							<span className='textSizeM'>{order.address}</span>
							<img src={loc_svg} alt="loc" />
						</div>
						<span className='textSizeL'>Подробности</span>
						<section style={{ ...flexRow, flexWrap: 'wrap' }}>
							<div style={flexRow}>
								<span>Контактный телефон:</span>
								<span className='textSizeM'>{order.contact_phone}</span>
							</div>
							<div style={flexRow}>
								<span>Работа по договору:</span>
								<span className='textSizeM'>{order.is_contract ? 'Да' : 'Нет'}</span>
							</div>
							<div style={flexRow}>
								<span>Способ оплаты:</span>
								<span className='textSizeM'>{order.payment_method === PaymentMethod.ORGANIZATION ? 'На расчетный счет' : order.payment_method === PaymentMethod.EXECUTOR && 'Наличными или переводом на карту исполнителю'}</span>
							</div>
							<div style={flexRow}>
								<span>Дата:</span>
								<span className='textSizeM'>{`${order.start_date} - ${order.end_date}`}</span>
							</div>

						</section>
						<section style={{ width: 1050, wordBreak: 'break-word' }}>
							{order?.description}
						</section>
					</div>
					{!isMyOrder ? <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr 1fr' }}>
						<Button style={{ width: 140 }}>Написать</Button>
						<Button style={{ width: 200, backgroundColor: "#8E8E93" }}>Показать телефон</Button>
						<Button onClick={handleOpen} style={{ width: 170, backgroundColor: '#F4F3F1', color: "#262626" }}>Пожаловаться</Button>
					</div> :
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button style={{ fontSize: 14, fontWeight: 400 }} onClick={() => nav(`/edit-order/${order.id}`)}>Редактировать</Button>
							<Button
								onClick={() => setOpenDelete(true)}
								style={{ backgroundColor: '#8E8E93', fontSize: 14, fontWeight: 400 }}>Удалить</Button>
						</div>
					}
				</div>
			</ModalContainer>
		</>
	)
}

export default SearchOrderCardDetail
