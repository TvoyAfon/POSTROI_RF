import React from 'react'
import { useNavigate } from 'react-router-dom'
import img_card from '../../../../../../assets/images/signs/img_signs.png'
import { useModal } from '../../../../../../hooks/useModal'
import { IOrderCardWorkers } from '../../../../../../interface/categoryCard.props'
import { ROUTES_CATEGORY } from '../../../../../../routes/routes'
import Button from '../../../../../ui/Button/Button'
import CloseButton from '../../../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../../../ui/Modal/ModalContainer'
import CardWorkersEdit from '../MyCardOrdersEdit'

const MyCardOrderWorkerDetail: React.FC<IOrderCardWorkers> = ({ address = 'Кемеровская область, СНТ Денисовский, участок 544', categoryType = 'Разнорабочие', date = '15августа', img = img_card, task = 'Lorem blanditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sit amet consecteturquas numquam illo aspernatur, provident possimus fugit acditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sditiis iure quas numquam illo aspernatur, provident possimus fugit acLorem ipsum dolor sditiis iure quas numquam illo aspernatur, provident possimus', taskName = 'Погрузка шкафа', paymethod = 'Наличными', onClose }) => {

	const { handleClose, handleOpen, isOpen } = useModal()
	const nav = useNavigate()
	const handleOpenDetail = () => {
		handleOpen()
		nav(ROUTES_CATEGORY.cardWorkersEditCard)

	}

	return (
		<>
			{isOpen && <CardWorkersEdit onClose={handleClose} />}
			<ModalContainer style={{ width: 1140 }} zIndex={11} isOnOverlay={true}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span style={{ fontWeight: 700, color: 'rgb(142, 142, 147)' }}>{categoryType}</span>
						<CloseButton onClick={onClose} />
					</div>
					<div className='flex-column gap-large'>
						< span className='textSizeL'>{taskName.toUpperCase()}</span>
						<div style={{ display: 'flex', flexWrap: "wrap", gap: 12 }}>
							<img style={{ width: 160, height: 160 }} src={img} alt="img" />
						</div>
						<span style={{ height: 100, overflowY: "scroll" }}>{task}</span>
						<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
							<div style={{ display: 'flex', gap: 8 }}>
								<span>Когда нужна услуга:</span>
								<span style={{ fontWeight: 800 }}>{date}</span>
							</div>
							<div style={{ display: 'flex', gap: 8 }}>
								<span>Где нужна услуга:</span>
								<span style={{ fontWeight: 800 }}>{address}</span>
							</div>
							<div style={{ display: 'flex', gap: 8, paddingBottom: 32 }}>
								<span>Способ оплаты:</span>
								<span style={{ fontWeight: 800 }}>{paymethod}</span>
							</div>
						</div>
					</div>
					<div style={{ display: "flex", justifyContent: 'space-between' }}>
						<Button style={{ fontSize: 14, fontWeight: 400 }} onClick={handleOpenDetail}>Редактировать</Button>
						<Button style={{ backgroundColor: '#8E8E93', fontSize: 14, fontWeight: 400 }}>Удалить</Button>
					</div>
				</div>
			</ModalContainer>
		</>
	)
}

export default MyCardOrderWorkerDetail
