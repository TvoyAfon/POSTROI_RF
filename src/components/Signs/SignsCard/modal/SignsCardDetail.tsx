import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import address_svg from '../../../../assets/images/signs/address_icon.svg'
import { useModal } from '../../../../hooks/useModal'
import { ISignsCardDetail } from '../../../../interface/categoryCard.props'
import Button from '../../../ui/Button/Button'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import SignsCardDetailFiles from '../ui/SignsCardDetailFiles'
import SignsCardComplaint from './SignsCardComplaint'
import SignsCardDeleteConfirm from './SignsCardDeleteConfirm'
import SignsCardNumber from './SignsCardNumber'

const SignsCardDetail: React.FC<ISignsCardDetail> = ({ onClose,
	card, /* Данные карточки */
	isMyCard = false }) => {
	const { isOpen, handleOpen, handleClose } = useModal()
	const [isOpenComplaint, setIsOpenComplaint] = useState(false)
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const handleCloseComplaint = () => {
		setIsOpenComplaint(false)
	}
	const nav = useNavigate()

	return (
		<>
			{openDeleteModal && <SignsCardDeleteConfirm cardType='Объявление' onClose={() => setOpenDeleteModal(false)} />}
			<ModalContainer isOnOverlay={true} style={{ width: 1140, position: 'fixed', zIndex: 12 }}>
				{isOpenComplaint && <SignsCardComplaint onClose={handleCloseComplaint} />}
				{isOpen && <SignsCardNumber onClose={handleClose} />}
				<div style={{ display: 'flex', gap: 32, flexDirection: "column" }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span style={{ fontWeight: 800, color: '#8E8E93' }}>{card?.data.categoryType}</span>
						<CloseButton onClick={onClose} />
					</div>
					<span className='textSizeL'>{card?.data.taskName.toUpperCase()}</span>
					<div style={{ overflowY: 'scroll', height: 500, display: 'flex', flexDirection: 'column', gap: 32 }}>
						{card && <SignsCardDetailFiles card={card} />}
						<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
							<span>Адрес:</span>
							<span style={{ fontWeight: 800 }}>{card?.data.address}
							</span>
							<img src={address_svg} alt="address_svg" />
						</div>
						<span className='textSizeL'>Подробности</span>
						<div
							style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
							<span>Опыт: <span style={{ fontWeight: 800 }}>
								{card?.data.experience} лет
							</span>
							</span>
							<span>Гарантия на работу:
								<span style={{ fontWeight: 800 }}> {card?.data.additionally.warranty ? 'Да' : 'Нет'}
								</span>
							</span>
							<span>Работа по договору:
								<span style={{ fontWeight: 800 }}> {card?.data.additionally.contract ? 'Да' : 'Нет'}
								</span>
							</span>
							<span>Исполнитель покупает материалы:
								<span style={{ fontWeight: 800 }}>
									{card?.data.additionally.materials ? 'Да' : 'Нет'}</span>
							</span>
							<span>Минимальная сумма заказа :
								<span style={{ fontWeight: 800 }}> {card?.data.price} ₽
								</span>
							</span>
						</div>
						<div style={{ height: 200 }}>
							{card?.data.description}
						</div>
					</div>
					{!isMyCard ? <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr 1fr  ' }}>
						<Button style={{ width: 140 }}>Написать</Button>
						<Button onClick={handleOpen} style={{ backgroundColor: "#8E8E93", width: 200 }}>Показать телефон</Button>
						<Button onClick={() => setIsOpenComplaint(true)} style={{ backgroundColor: "#F4F3F1", color: '#262626', width: 170 }}>Пожаловаться</Button>
					</div> :
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button onClick={() => nav(`/signs/edit-card/${card?.id}`)}>Редактировать</Button>
							<Button onClick={() => setOpenDeleteModal(true)} style={{ backgroundColor: '#8E8E93' }}>Удалить</Button>
						</div>
					}
				</div>
			</ModalContainer>
		</>
	)
}

export default SignsCardDetail
