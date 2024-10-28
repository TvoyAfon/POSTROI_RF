import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import empty_jpeg from '../../../assets/images/other/patterns 1.png'
import { useModal } from '../../../hooks/useModal'
import { ISignsCard } from '../../../interface/categoryCard.props'
import { RootState } from '../../../store/store'
import CardOrderUser from '../../SearchOrder/CardOrderInfo/CardOrderUser/CardOrderUser'
import Button from '../../ui/Button/Button'
import styles from '../Signs.module.scss'
import SignsCardDeleteConfirm from './modal/SignsCardDeleteConfirm'
import SignsCardDetail from './modal/SignsCardDetail'
import SignsCardNumber from './modal/SignsCardNumber'


const SignsCard: React.FC<ISignsCard> = ({
	onDelete,
	openMap,
	card,/* Данные карточки */
	isMycard = false,
	createDate
}) => {
	const [openCardDetail, setOpenCardDetail] = useState(false)
	const { handleClose, handleOpen, isOpen } = useModal()
	const [openCardNumber, setOpenCardNumber] = useState(false)
	const { user } = useSelector((state: RootState) => state.auth)
	const handleNumberCardOpen = () => {
		setOpenCardNumber(true)
	}
	const handleNumberCardClose = () => {
		setOpenCardNumber(false)
	}
	const handleCloseCardDetail = () => {
		setOpenCardDetail(false)
	}

	const renderCurrentImage = () => {
		if (card && card.data.filesSigns && card.data.filesSigns.length !== 0) {
			for (const file of card.data.filesSigns) {
				const mimeType = file.type // Получаем тип файла

				// Проверяем, является ли файл изображением.
				const isImage = mimeType.startsWith('image/')

				if (isImage) {
					return URL.createObjectURL(file) // Возвращаем изображение, если это картинка
				}
			}
		}
		return empty_jpeg // Возвращаем пустое изображение, если файл не изображение или отсутствует
	}
	const nav = useNavigate()
	return (
		<>

			{isOpen && <SignsCardDeleteConfirm cardType='Объявление' onDelete={onDelete} onClose={handleClose} />}
			{openCardDetail && <SignsCardDetail card={card} isMyCard={isMycard} stateValue={openMap} onClose={handleCloseCardDetail} />}
			<div style={openMap ?
				{ width: 240, height: 335, display: 'flex', flexDirection: 'column', overflowY: 'hidden', overflowX: 'hidden', padding: 16 } :
				{ position: 'relative', display: 'flex', gap: 32 }}
				className={styles.signsCard}>
				<img
					style={!openMap ? { width: 240, height: 240, objectFit: 'cover' } : { width: 208, height: 160, paddingBottom: 16, objectFit: 'cover' }}
					src={renderCurrentImage()}
					alt="img"
				/>
				<section style={{ display: 'flex', flexDirection: !openMap ? 'row' : 'column', gap: 12 }}>
					<div onClick={() => setOpenCardDetail(true)}
						style={{ display: 'flex', flexDirection: 'column', gap: !openMap ? 16 : 16, cursor: 'pointer' }}>
						<span className='textSizeL'>{card?.data.taskName.toUpperCase()}</span>
						<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
							<span style={{ fontSize: 16, fontWeight: 300 }}>От</span>
							<span style={{ fontSize: 16, fontWeight: 800 }}>{card?.data.price} ₽</span>
						</div>
						{!openMap &&
							<div style={{ overflowY: 'hidden', textOverflow: 'ellipsis', height: 100, width: 620, fontSize: 16, fontWeight: 300 }}>
								{card?.data.description}
							</div>}
						<span
							style={{ fontSize: 16, fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden' }}>
							{card?.data.address}
						</span>
						{!openMap &&
							<span style={{ color: '#8E8E93', fontSize: 16, fontWeight: 800 }}>{card?.data.categoryType}
							</span>}

					</div>
					{!openMap &&
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'absolute', right: 32 }}>
							{!isMycard ? <>
								<Button style={{ padding: 10, fontWeight: 400, fontSize: 14 }} >Написать
								</Button>
								<Button
									onClick={handleNumberCardOpen}
									style={{ backgroundColor: '#8E8E93', padding: 10, whiteSpace: 'nowrap', fontWeight: 400, fontSize: 14 }}>
									Показать телефон
								</Button>
								<span style={{ paddingTop: 50, fontSize: 14, color: '#8E8E93' }}>Дата создания:<br />{createDate}</span>
							</> : <>
								<Button
									onClick={() => nav(`/signs/edit-card/${card?.id}`)} style={{ fontWeight: 400, fontSize: 14 }}>
									Редактировать
								</Button>
								<Button
									onClick={handleOpen}
									style={{ backgroundColor: 'rgb(142, 142, 147)', fontWeight: 400, fontSize: 14 }}>
									Удалить
								</Button>
								<CardOrderUser
									userAvatar={user?.profile_photo as string}
									userName={user?.last_name + ' ' + user?.first_name?.substring(0, 1) + '.'} />
								<span style={{ paddingTop: 50, fontSize: 14, color: '#8E8E93' }}>Дата создания:<br />{createDate}</span>
							</>}
						</div>}
				</section>
				{openCardNumber && <SignsCardNumber onClose={handleNumberCardClose} />}
			</div>
		</>
	)
}

export default SignsCard
